# CreativePro Studio - 本地服务器部署指南 (1688端口)
> © domiyoung__

本文档提供了在本地服务器 (10.10.23.33) 的 1688 端口上部署 CreativePro Studio 的详细步骤，并确保更新后内容不会被缓存。

## 步骤概览

1. 初始设置：配置脚本和服务器
2. 首次部署：使用 `deploy-local.sh` 脚本
3. 代码更新：使用 `update-local.sh` 脚本
4. 故障排查

## 1. 初始设置

### SSH 密钥配置

确保您可以通过 SSH 密钥无密码登录到目标服务器：

```bash
# 检查现有 SSH 密钥
ls -la ~/.ssh

# 如果没有，创建新密钥
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 复制公钥到服务器
ssh-copy-id your-username@10.10.23.33
```

### 修改部署脚本

编辑 `deploy-local.sh` 和 `update-local.sh`，更新以下参数：

```bash
SERVER_USER="your-username"    # 您的服务器用户名
SERVER_IP="10.10.23.33"        # 已设置为目标IP
SERVER_PATH="/var/www/creativeprostudio"  # 服务器上的部署路径
SERVER_PORT="1688"             # 已设置为目标端口
```

### 在服务器上创建目录

通过 SSH 连接到您的服务器并创建目录：

```bash
ssh your-username@10.10.23.33
sudo mkdir -p /var/www/creativeprostudio
sudo chown -R your-username:your-username /var/www/creativeprostudio
```

### 确认 Nginx 已安装

```bash
ssh your-username@10.10.23.33 "nginx -v"
```

如果未安装：

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

## 2. 首次部署

首次部署使用 `deploy-local.sh` 脚本，它会执行以下操作：

1. 检查依赖工具
2. 构建项目
3. 上传文件到服务器
4. 设置文件权限
5. 创建针对 1688 端口的 Nginx 配置（包含禁用缓存的设置）
6. 重启 Nginx

```bash
# 在项目根目录执行
./deploy-local.sh
```

### 关于 Nginx 配置

该脚本会自动创建一个专用的 Nginx 配置，包含以下特点：

- 监听 1688 端口
- 指向 `/var/www/creativeprostudio` 目录
- 添加禁用缓存的头信息，确保内容始终为最新版本
- 配置单页应用路由处理
- 启用 gzip 压缩

## 3. 代码更新

当您修改代码后，使用 `update-local.sh` 脚本进行快速更新：

```bash
# 在项目根目录执行
./update-local.sh
```

该脚本会：

1. 重新构建项目
2. 上传更新的文件到服务器
3. 设置文件权限
4. 重启 Nginx 以应用更改

## 4. 故障排查

### 端口问题

如果 1688 端口无法访问：

```bash
# 检查端口是否被占用
ssh your-username@10.10.23.33 "sudo netstat -tulpn | grep 1688"

# 检查防火墙是否允许该端口
ssh your-username@10.10.23.33 "sudo ufw status"

# 如需开放端口
ssh your-username@10.10.23.33 "sudo ufw allow 1688/tcp"
```

### Nginx 配置问题

```bash
# 检查 Nginx 配置语法
ssh your-username@10.10.23.33 "sudo nginx -t"

# 查看 Nginx 错误日志
ssh your-username@10.10.23.33 "sudo tail -f /var/log/nginx/error.log"
```

### 缓存问题

如果更新后仍然显示旧内容：

1. 在浏览器中按 Ctrl+F5 或 Cmd+Shift+R 强制刷新
2. 检查 Nginx 配置中的缓存控制头是否正确设置
3. 检查开发者工具中的网络请求，确认响应头含有正确的缓存控制信息

## 5. 手动配置（如脚本失败）

如果自动脚本遇到问题，您可以手动执行以下步骤：

### 构建项目

```bash
pnpm install
pnpm build
```

### 创建 Nginx 配置文件

在本地创建配置文件：

```bash
cat > creativeprostudio-1688.conf << EOF
server {
    listen 1688;
    server_name 10.10.23.33;
    
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
    
    # 禁用缓存 - 确保每次访问都获取最新内容
    add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
    add_header Pragma "no-cache";
    add_header Expires "0";
    
    # 静态资源也禁用缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        add_header Pragma "no-cache";
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
```

上传并应用配置：

```bash
# 上传配置文件
scp creativeprostudio-1688.conf your-username@10.10.23.33:/tmp/

# 在服务器上设置配置文件
ssh your-username@10.10.23.33 "sudo mv /tmp/creativeprostudio-1688.conf /etc/nginx/sites-available/creativeprostudio-1688 && sudo ln -s /etc/nginx/sites-available/creativeprostudio-1688 /etc/nginx/sites-enabled/"

# 测试并重启Nginx
ssh your-username@10.10.23.33 "sudo nginx -t && sudo systemctl restart nginx"
```

### 上传文件

```bash
rsync -avz --delete dist/ your-username@10.10.23.33:/var/www/creativeprostudio/
ssh your-username@10.10.23.33 "sudo chown -R www-data:www-data /var/www/creativeprostudio && sudo chmod -R 755 /var/www/creativeprostudio"
```

## 6. 附加信息

### 验证部署是否成功

完成部署后，打开浏览器访问：
```
http://10.10.23.33:1688
```

### 检查缓存控制

使用以下命令检查响应头中的缓存控制信息：

```bash
curl -I http://10.10.23.33:1688/
```

应看到类似以下的缓存控制头：
```
Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0
Pragma: no-cache
Expires: 0
```

---

© domiyoung__ - 保留所有权利 