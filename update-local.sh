#!/bin/bash
# CreativePro Studio - 本地服务器快速更新脚本 (1688端口)
# © domiyoung__

# 配置参数 - 本地服务器配置
SERVER_USER="your-username"
SERVER_IP="10.10.23.33"
SERVER_PATH="/var/www/creativeprostudio"
LOCAL_DIST="./dist"
SERVER_PORT="1688"

echo "=== CreativePro Studio 本地更新部署 (1688端口) ==="
echo "© domiyoung__"
echo ""

# 1. 构建项目
echo "[1/4] 构建项目..."
pnpm build

if [ $? -ne 0 ]; then
  echo "❌ 构建失败！请检查错误并重试。"
  exit 1
fi

# 2. 上传文件
echo "[2/4] 上传文件到服务器..."
rsync -avz --delete $LOCAL_DIST/ $SERVER_USER@$SERVER_IP:$SERVER_PATH/

if [ $? -ne 0 ]; then
  echo "❌ 文件上传失败！请检查网络连接和服务器状态。"
  exit 1
fi

# 3. 设置权限
echo "[3/4] 设置文件权限..."
ssh $SERVER_USER@$SERVER_IP "sudo chown -R www-data:www-data $SERVER_PATH && sudo chmod -R 755 $SERVER_PATH"

if [ $? -ne 0 ]; then
  echo "❌ 权限设置失败！请检查服务器权限。"
  exit 1
fi

# 4. 清除缓存并重启Nginx
echo "[4/4] 清除缓存并重启Nginx..."
ssh $SERVER_USER@$SERVER_IP "sudo systemctl restart nginx"

if [ $? -ne 0 ]; then
  echo "❌ Nginx重启失败！请手动检查Nginx状态。"
  exit 1
fi

echo ""
echo "✅ 更新部署完成！"
echo "访问 http://$SERVER_IP:$SERVER_PORT 查看最新版本。"
echo "注意：已配置禁用浏览器缓存，内容将始终显示最新版本。" 