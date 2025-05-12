# CreativePro Studio - MacOS部署步骤指南
> © domiyoung__

本文档提供了从MacOS部署CreativePro Studio到Nginx服务器的详细步骤。

## 前提条件

确保您的MacOS系统上已安装以下工具:

1. **Terminal**: MacOS自带
2. **Node.js**: 建议使用16+版本
3. **pnpm**: `npm install -g pnpm`
4. **rsync**: MacOS自带
5. **SSH**: MacOS自带

## 一次性设置步骤

### 1. SSH密钥设置（如未设置）

```bash
# 检查现有SSH密钥
ls -la ~/.ssh

# 如果没有，创建新密钥
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 复制公钥内容
cat ~/.ssh/id_rsa.pub
```

将公钥内容添加到您的服务器`~/.ssh/authorized_keys`文件中。

### 2. 修改部署脚本配置

编辑`deploy.sh`和`update.sh`文件，更新以下参数:

```bash
SERVER_USER="your-username"         # 您的服务器用户名
SERVER_IP="your-server-ip"          # 服务器IP地址或域名
SERVER_PATH="/var/www/creativeprostudio"  # 服务器上的部署路径
DOMAIN="your-domain.com"            # 您的网站域名(仅deploy.sh需要)
```

### 3. 服务器端Nginx安装（首次部署时）

通过SSH连接到您的服务器:

```bash
ssh your-username@your-server-ip
```

安装Nginx:

**Ubuntu/Debian**:
```bash
sudo apt update
sudo apt install nginx
```

**CentOS/RHEL**:
```bash
sudo yum install epel-release
sudo yum install nginx
```

创建部署目录:
```bash
sudo mkdir -p /var/www/creativeprostudio
sudo chown -R your-username:your-username /var/www/creativeprostudio
```

## 部署流程

### 首次完整部署

```bash
# 在项目根目录执行
./deploy.sh
```

这个脚本会执行以下操作:
- 检查依赖工具
- 构建项目
- 上传文件到服务器
- 设置适当的文件权限
- 检查并配置Nginx
- 重启Nginx服务

### 代码更新后的快速部署

当您只需要更新代码而不需要重新配置Nginx时:

```bash
# 在项目根目录执行
./update.sh
```

这个脚本会执行:
- 重新构建项目
- 上传更新的文件到服务器
- 设置文件权限

## 手动部署步骤

如果脚本遇到问题，您可以按以下步骤手动部署:

### 1. 构建项目

```bash
# 安装依赖
pnpm install

# 构建项目
pnpm build
```

### 2. 上传文件

```bash
# 创建远程目录(如果不存在)
ssh your-username@your-server-ip "mkdir -p /var/www/creativeprostudio"

# 上传文件
rsync -avz --delete dist/ your-username@your-server-ip:/var/www/creativeprostudio/
```

### 3. 设置权限

```bash
ssh your-username@your-server-ip "sudo chown -R www-data:www-data /var/www/creativeprostudio && sudo chmod -R 755 /var/www/creativeprostudio"
```

### 4. 配置Nginx（首次部署）

创建Nginx配置文件:

```bash
# 本地创建配置文件
cat > creativeprostudio.conf << EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    root /var/www/creativeprostudio;
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
scp creativeprostudio.conf your-username@your-server-ip:/tmp/

# 在服务器上设置配置文件
ssh your-username@your-server-ip "sudo mv /tmp/creativeprostudio.conf /etc/nginx/sites-available/creativeprostudio && sudo ln -s /etc/nginx/sites-available/creativeprostudio /etc/nginx/sites-enabled/"

# 测试Nginx配置
ssh your-username@your-server-ip "sudo nginx -t"

# 重启Nginx服务
ssh your-username@your-server-ip "sudo systemctl restart nginx"
```

## 常见问题排查

### 脚本权限问题

如果脚本无法执行:
```bash
chmod +x deploy.sh update.sh
```

### SSH连接问题

如果SSH连接失败:
- 确认服务器IP地址和用户名正确
- 检查SSH密钥是否正确设置
- 尝试使用密码方式连接进行测试

### 权限问题

如果遇到权限错误:
```bash
# 临时提升服务器上的权限
ssh your-username@your-server-ip "sudo chmod -R 777 /var/www/creativeprostudio"

# 上传后再设置正确的权限
ssh your-username@your-server-ip "sudo chown -R www-data:www-data /var/www/creativeprostudio && sudo chmod -R 755 /var/www/creativeprostudio"
```

### Nginx配置问题

如果网站无法访问:
- 检查Nginx是否正在运行: `sudo systemctl status nginx`
- 检查配置文件语法: `sudo nginx -t`
- 检查防火墙是否允许80端口: `sudo ufw status`

## HTTPS配置（可选）

使用Let's Encrypt配置SSL:

```bash
# 在服务器上执行
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

按照提示完成配置。

## 备份与回滚

### 创建备份

在部署新版本前备份当前版本:

```bash
ssh your-username@your-server-ip "cp -r /var/www/creativeprostudio /var/www/creativeprostudio_backup_$(date +%Y%m%d)"
```

### 回滚到备份版本

如果新版本有问题:

```bash
ssh your-username@your-server-ip "rm -rf /var/www/creativeprostudio && cp -r /var/www/creativeprostudio_backup_YYYYMMDD /var/www/creativeprostudio && sudo chown -R www-data:www-data /var/www/creativeprostudio && sudo chmod -R 755 /var/www/creativeprostudio"
```

## 附录：常用命令

### 查看Nginx日志

```bash
ssh your-username@your-server-ip "sudo tail -f /var/log/nginx/error.log"
ssh your-username@your-server-ip "sudo tail -f /var/log/nginx/access.log"
```

### 重启Nginx

```bash
ssh your-username@your-server-ip "sudo systemctl restart nginx"
```

### 查看服务器磁盘空间

```bash
ssh your-username@your-server-ip "df -h"
```

---

© domiyoung__ - 保留所有权利 