#!/bin/bash
# CreativePro Studio - 部署脚本
# © domiyoung__

# 颜色输出配置
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 配置参数 - 请修改为您的服务器信息
SERVER_USER="your-username"
SERVER_IP="your-server-ip"
SERVER_PATH="/var/www/creativeprostudio"
LOCAL_DIST="./dist"
DOMAIN="your-domain.com"  # 您的域名

# 函数定义
print_header() {
  echo -e "${YELLOW}=======================================${NC}"
  echo -e "${YELLOW}$1${NC}"
  echo -e "${YELLOW}=======================================${NC}"
}

print_step() {
  echo -e "${GREEN}[+] $1${NC}"
}

print_error() {
  echo -e "${RED}[ERROR] $1${NC}"
}

# 检查必要工具
check_dependencies() {
  print_step "检查依赖..."
  
  if ! command -v rsync &> /dev/null; then
    print_error "rsync 未安装。请安装后再试。"
    exit 1
  fi
  
  if ! command -v ssh &> /dev/null; then
    print_error "ssh 未安装。请安装后再试。"
    exit 1
  fi
  
  if ! command -v pnpm &> /dev/null; then
    print_error "pnpm 未安装。请安装后再试。"
    exit 1
  fi
}

# 构建项目
build_project() {
  print_header "构建项目"
  
  print_step "安装依赖..."
  pnpm install
  
  if [ $? -ne 0 ]; then
    print_error "依赖安装失败！"
    exit 1
  fi
  
  print_step "开始构建..."
  pnpm build
  
  if [ $? -ne 0 ]; then
    print_error "构建失败！"
    exit 1
  fi
  
  print_step "构建完成！"
}

# 上传文件到服务器
upload_files() {
  print_header "上传文件到服务器"
  
  print_step "创建远程目录（如果不存在）..."
  ssh $SERVER_USER@$SERVER_IP "mkdir -p $SERVER_PATH"
  
  print_step "上传文件中，请稍候..."
  rsync -avz --delete $LOCAL_DIST/ $SERVER_USER@$SERVER_IP:$SERVER_PATH/
  
  if [ $? -ne 0 ]; then
    print_error "文件上传失败！"
    exit 1
  fi
  
  print_step "文件上传完成！"
}

# 设置服务器权限
set_permissions() {
  print_header "设置文件权限"
  
  print_step "设置权限中..."
  ssh $SERVER_USER@$SERVER_IP "sudo chown -R www-data:www-data $SERVER_PATH && sudo chmod -R 755 $SERVER_PATH"
  
  if [ $? -ne 0 ]; then
    print_error "权限设置失败！"
    exit 1
  fi
  
  print_step "权限设置完成！"
}

# 检查Nginx配置
check_nginx() {
  print_header "检查Nginx配置"
  
  print_step "检查Nginx配置文件..."
  SSH_RESULT=$(ssh $SERVER_USER@$SERVER_IP "[ -f /etc/nginx/sites-enabled/creativeprostudio ] && echo 'exists' || echo 'not_exists'")
  
  if [[ "$SSH_RESULT" == "not_exists" ]]; then
    print_step "未找到Nginx配置，需要创建配置文件..."
    
    # 创建配置文件
    echo "创建Nginx配置文件模板..."
    cat > creativeprostudio.conf << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    root $SERVER_PATH;
    index index.html;
    
    # 启用gzip压缩
    gzip on;
    gzip_comp_level 5;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_vary on;
    gzip_types
        application/javascript
        application/json
        application/x-javascript
        application/xml
        text/css
        text/javascript
        text/plain
        text/xml
        image/svg+xml;
    
    # 缓存控制
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
    
    # 处理React Router的单页应用路由
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # 安全相关配置
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
}
EOF
    
    # 上传配置文件
    print_step "上传Nginx配置..."
    scp creativeprostudio.conf $SERVER_USER@$SERVER_IP:/tmp/
    ssh $SERVER_USER@$SERVER_IP "sudo mv /tmp/creativeprostudio.conf /etc/nginx/sites-available/creativeprostudio && sudo ln -s /etc/nginx/sites-available/creativeprostudio /etc/nginx/sites-enabled/"
    
    # 检查配置
    print_step "检查Nginx配置语法..."
    SSH_NGINX_TEST=$(ssh $SERVER_USER@$SERVER_IP "sudo nginx -t 2>&1")
    
    if [[ "$SSH_NGINX_TEST" == *"successful"* ]]; then
      print_step "Nginx配置有效！重启Nginx..."
      ssh $SERVER_USER@$SERVER_IP "sudo systemctl restart nginx"
    else
      print_error "Nginx配置无效！请手动检查配置文件。"
      print_error "$SSH_NGINX_TEST"
    fi
    
    # 清理临时文件
    rm creativeprostudio.conf
  else
    print_step "找到现有Nginx配置，重启Nginx..."
    ssh $SERVER_USER@$SERVER_IP "sudo systemctl restart nginx"
  fi
}

# 完成部署
finish_deployment() {
  print_header "部署完成"
  echo -e "${GREEN}CreativePro Studio已成功部署！${NC}"
  echo -e "网站地址: ${YELLOW}http://$DOMAIN${NC}"
  echo -e "${GREEN}© domiyoung__${NC}"
}

# 主函数
main() {
  print_header "CreativePro Studio - 部署流程"
  
  # 运行各个步骤
  check_dependencies
  build_project
  upload_files
  set_permissions
  check_nginx
  finish_deployment
}

# 执行主函数
main "$@" 