#!/bin/bash
# CreativePro Studio - 快速更新脚本
# © domiyoung__

# 配置参数 - 请修改为您的服务器信息
SERVER_USER="your-username"
SERVER_IP="your-server-ip"
SERVER_PATH="/var/www/creativeprostudio"
LOCAL_DIST="./dist"

echo "=== CreativePro Studio 更新部署 ==="
echo "© domiyoung__"
echo ""

# 1. 构建项目
echo "[1/3] 构建项目..."
pnpm build

if [ $? -ne 0 ]; then
  echo "❌ 构建失败！请检查错误并重试。"
  exit 1
fi

# 2. 上传文件
echo "[2/3] 上传文件到服务器..."
rsync -avz --delete $LOCAL_DIST/ $SERVER_USER@$SERVER_IP:$SERVER_PATH/

if [ $? -ne 0 ]; then
  echo "❌ 文件上传失败！请检查网络连接和服务器状态。"
  exit 1
fi

# 3. 设置权限
echo "[3/3] 设置文件权限..."
ssh $SERVER_USER@$SERVER_IP "sudo chown -R www-data:www-data $SERVER_PATH && sudo chmod -R 755 $SERVER_PATH"

if [ $? -ne 0 ]; then
  echo "❌ 权限设置失败！请检查服务器权限。"
  exit 1
fi

echo ""
echo "✅ 更新部署完成！"
echo "访问网站查看最新版本。" 