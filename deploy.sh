#!/bin/bash

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}开始部署CreativePro Studio应用...${NC}"

# 1. 确保我们有最新的构建
echo -e "${GREEN}1. 构建最新版本${NC}"
npm run build

# 检查构建是否成功
if [ $? -ne 0 ]; then
    echo -e "${RED}构建失败，请检查错误后重试${NC}"
    exit 1
fi

# 变量设置 - 请根据您的实际配置修改
SERVER_USER="your_server_username"
SERVER_IP="your_server_ip"
REMOTE_PATH="/usr/share/nginx/html/creativeprostudio"
NGINX_CONF_PATH="/etc/nginx/conf.d"

# 2. 确保远程目录存在
echo -e "${GREEN}2. 创建远程目录${NC}"
ssh ${SERVER_USER}@${SERVER_IP} "mkdir -p ${REMOTE_PATH}"

# 3. 生成版本标识，避免缓存问题
VERSION=$(date +"%Y%m%d%H%M%S")
echo -e "${GREEN}3. 创建版本标记: ${VERSION}${NC}"
echo "${VERSION}" > dist/version.txt

# 4. 将构建文件复制到服务器
echo -e "${GREEN}4. 上传文件到服务器${NC}"
rsync -avz --delete dist/ ${SERVER_USER}@${SERVER_IP}:${REMOTE_PATH}/dist/

# 5. 复制Nginx配置文件
echo -e "${GREEN}5. 更新Nginx配置${NC}"
scp nginx.conf ${SERVER_USER}@${SERVER_IP}:${NGINX_CONF_PATH}/creativeprostudio.conf

# 6. 重启Nginx服务
echo -e "${GREEN}6. 重启Nginx服务${NC}"
ssh ${SERVER_USER}@${SERVER_IP} "sudo nginx -t && sudo systemctl restart nginx"

# 检查Nginx是否成功重启
if [ $? -ne 0 ]; then
    echo -e "${RED}Nginx重启失败，请检查配置是否正确${NC}"
    exit 1
fi

echo -e "${GREEN}部署完成！应用已更新至版本 ${VERSION}${NC}"
echo -e "${YELLOW}请访问: http://creativeprostudio.local 查看最新版本${NC}" 