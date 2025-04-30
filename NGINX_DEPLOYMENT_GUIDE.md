# CreativePro Studio - Nginx部署指南
> © domiyoung__

## 项目分析

CreativePro Studio是一个使用React和Vite构建的现代Web应用，面向Z世代女性用户的创意平台。项目特点：

- **前端框架**：React 18
- **构建工具**：Vite 5
- **UI组件**：Chakra UI、Material UI、Tailwind CSS
- **状态管理**：React Context API
- **路由**：React Router 6
- **动效**：Framer Motion、GSAP
- **3D渲染**：Three.js

## 部署准备

### 环境需求

- Nginx 1.18+
- Node.js 16+ (仅用于构建)
- 服务器：推荐2核4G以上Linux服务器

## 部署流程

### 1. 构建项目

在本地开发环境中构建项目：

```bash
# 安装依赖
pnpm install

# 构建项目
pnpm build
```

构建完成后，`dist` 目录包含所有需要部署的静态文件。

### 2. 安装配置Nginx

#### 安装Nginx

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

#### 配置Nginx

创建Nginx配置文件：

```bash
sudo nano /etc/nginx/sites-available/creativeprostudio
```

添加以下配置（根据实际情况修改）：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # 替换为您的域名

    root /var/www/creativeprostudio;  # 静态文件存放路径
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
        try_files $uri $uri/ /index.html;
    }

    # 若有后端API请求，配置代理
    # location /api/ {
    #     proxy_pass http://localhost:3000/;
    #     proxy_http_version 1.1;
    #     proxy_set_header Upgrade $http_upgrade;
    #     proxy_set_header Connection 'upgrade';
    #     proxy_set_header Host $host;
    #     proxy_cache_bypass $http_upgrade;
    # }

    # 安全相关配置
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
}
```

创建符号链接并测试配置：

```bash
sudo ln -s /etc/nginx/sites-available/creativeprostudio /etc/nginx/sites-enabled/
sudo nginx -t
```

如果测试通过，重启Nginx：

```bash
sudo systemctl restart nginx
```

### 3. 上传项目文件

将`dist`目录中的文件上传到服务器指定目录：

```bash
# 在本地执行
rsync -avz --delete dist/ user@your-server-ip:/var/www/creativeprostudio/
```

或使用其他文件传输工具（如SFTP）将`dist`目录内容上传至`/var/www/creativeprostudio/`。

### 4. 设置权限

确保Nginx可以访问文件：

```bash
sudo chown -R www-data:www-data /var/www/creativeprostudio
sudo chmod -R 755 /var/www/creativeprostudio
```

## 自动化部署脚本

创建部署脚本简化流程：

```bash
#!/bin/bash
# deploy.sh - CreativePro Studio部署脚本
# © domiyoung__

# 配置参数
SERVER_USER="your-username"
SERVER_IP="your-server-ip"
SERVER_PATH="/var/www/creativeprostudio"
LOCAL_DIST="./dist"

# 构建项目
echo "正在构建项目..."
pnpm build

# 上传文件到服务器
echo "正在上传文件到服务器..."
rsync -avz --delete $LOCAL_DIST/ $SERVER_USER@$SERVER_IP:$SERVER_PATH/

# 设置权限
echo "正在设置文件权限..."
ssh $SERVER_USER@$SERVER_IP "sudo chown -R www-data:www-data $SERVER_PATH && sudo chmod -R 755 $SERVER_PATH"

echo "部署完成！访问 http://your-domain.com 查看网站。"
```

将脚本保存为`deploy.sh`，赋予执行权限：

```bash
chmod +x deploy.sh
```

## 代码更新流程

当代码更新后，按照以下步骤更新部署：

1. **本地更新**：拉取最新代码并确保开发环境正常运行
   ```bash
   git pull
   pnpm install  # 如有依赖更新
   pnpm dev      # 测试开发环境
   ```

2. **重新构建并部署**：
   ```bash
   pnpm build
   ./deploy.sh   # 使用部署脚本
   ```

3. **手动部署**（如不使用脚本）：
   ```bash
   # 构建项目
   pnpm build
   
   # 上传文件
   rsync -avz --delete dist/ user@your-server-ip:/var/www/creativeprostudio/
   
   # 设置权限
   ssh user@your-server-ip "sudo chown -R www-data:www-data /var/www/creativeprostudio && sudo chmod -R 755 /var/www/creativeprostudio"
   ```

## 故障排除

1. **页面加载404错误**：确认Nginx配置中的`try_files`指令正确设置，使所有路由重定向到`index.html`

2. **静态资源无法加载**：检查文件权限和路径，确保Nginx可以访问这些文件

3. **Nginx配置错误**：运行`sudo nginx -t`检查配置语法

4. **性能问题**：启用gzip压缩，设置适当的缓存策略，考虑使用CDN

## 优化建议

1. **启用HTTPS**：使用Let's Encrypt配置SSL证书
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

2. **配置CDN**：考虑使用Cloudflare或其他CDN服务加速静态资源

3. **监控**：设置服务器监控以跟踪性能和可用性

4. **自动化部署**：考虑使用CI/CD工具（如GitHub Actions、Jenkins）实现完全自动化部署

---

© domiyoung__ - 保留所有权利 