# CreativePro Studio

创意内容制作平台，专为美妆电商设计的高效创意工具，简化设计流程，提升团队协作。

## 📋 项目概述

CreativePro Studio是一款面向Z世代女性用户的创新Web产品，提供美妆与潮流相关的创意设计工具。项目使用React.js作为前端框架，.NET Core作为后端框架。

## ⚙️ 开发环境设置

本项目使用pnpm作为依赖管理工具。关于pnpm的使用说明，请参考[PNPM使用指南](./PNPM_GUIDE.md)。

### 安装依赖

```bash
pnpm install
```

### 运行开发服务器

```bash
pnpm dev
```

应用将在开发模式下运行。\
在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看。

修改代码后页面将自动刷新。\
控制台中可能会显示lint错误。

### 运行测试

```bash
pnpm test
```

在交互式监视模式下启动测试运行器。

### 构建生产版本

```bash
pnpm build
```

将应用构建到`dist`文件夹，为生产环境进行优化。\
构建后的文件经过压缩，文件名包含哈希值。\
应用已准备好部署！

## 🚀 项目特点

- 📱 响应式设计，支持桌面与移动端
- 🎨 面向Z世代的现代UI设计
- 🧩 模块化组件架构
- 🔒 用户数据安全保护
- 🌐 多语言支持

## 📚 技术栈

- **前端**: React.js (Next.js)
- **后端**: .NET Core
- **数据库**: PostgreSQL
- **部署**: Docker, Kubernetes
- **监控**: New Relic/Datadog

## 📃 文档

- 产品设计文档
- API规范
- 数据库设计
- UI设计规范
- 交互设计规范

## 👥 贡献指南

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开Pull Request

## 📝 版权声明

© domiyoung__ - 版权所有

## Nginx部署指南

本指南详细说明如何将CreativePro Studio应用部署到Nginx服务器。

### 前置条件

- 已安装Nginx服务器
- Node.js环境(用于构建项目)
- 已克隆或下载本项目代码

### 部署步骤

#### 1. 构建项目

首先，在项目根目录下运行以下命令构建项目：

```bash
# 安装依赖
npm install

# 构建项目
npm run build
```

成功构建后，会在项目根目录生成一个`dist`文件夹，包含所有静态资源文件。

#### 2. 配置Nginx

将项目的`nginx.conf`文件复制到Nginx配置目录，或者将内容合并到现有配置中：

```bash
# 复制配置文件到Nginx配置目录
sudo cp nginx.conf /etc/nginx/sites-available/creativeprostudio.conf

# 创建软链接到sites-enabled目录(如果需要)
sudo ln -s /etc/nginx/sites-available/creativeprostudio.conf /etc/nginx/sites-enabled/

# 测试配置是否有语法错误
sudo nginx -t

# 重启Nginx应用新配置
sudo systemctl restart nginx
```

#### 3. 部署静态文件

将构建好的`dist`文件夹中的内容复制到Nginx配置的根目录：

```bash
# 创建部署目录(如果不存在)
sudo mkdir -p /usr/local/nginx/html/creativeprostudio

# 复制文件
sudo cp -r dist/* /usr/local/nginx/html/creativeprostudio/
```

#### 4. 验证部署

在浏览器中访问服务器地址，确认应用是否正常运行。

### 配置文件说明

项目提供的`nginx.conf`文件已包含以下优化：

- 自动适配服务器CPU核心数
- 静态资源缓存策略
- GZIP压缩
- 安全相关HTTP头
- React路由支持(确保直接访问任何路由都正常工作)

### 常见问题解决

#### 页面刷新出现404错误

确保配置文件中包含以下配置，处理React前端路由：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}

location ~* ^/(creativeprostudio|document|system-blueprint|projects|canvas-editor) {
    try_files $uri $uri/ /index.html;
}
```

#### 静态资源加载失败

检查路径配置是否正确，可能需要调整`root`指令的路径：

```nginx
root /path/to/your/creativeprostudio/dist;
```

#### 性能优化

1. 确保启用了GZIP压缩
2. 检查静态资源缓存设置
3. 考虑使用CDN加速静态资源

### 生产环境安全注意事项

1. 启用HTTPS
2. 配置适当的CSP(Content Security Policy)
3. 考虑使用WAF(Web Application Firewall)保护应用

## 版权信息

© domiyoung__ | CreativePro Studio | 版权所有
