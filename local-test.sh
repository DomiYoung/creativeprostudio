#!/bin/bash

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}开始本地测试CreativePro Studio应用...${NC}"

# 1. 确保我们有最新的构建
echo -e "${GREEN}1. 构建最新版本${NC}"
npm run build

# 检查构建是否成功
if [ $? -ne 0 ]; then
    echo -e "${RED}构建失败，请检查错误后重试${NC}"
    exit 1
fi

# 2. 生成版本标识，避免缓存问题
VERSION=$(date +"%Y%m%d%H%M%S")
echo -e "${GREEN}2. 创建版本标记: ${VERSION}${NC}"
echo "${VERSION}" > dist/version.txt

# 3. 使用Vite预览构建
echo -e "${GREEN}3. 本地预览构建结果${NC}"
echo -e "${YELLOW}请访问: http://localhost:4173 查看最新版本${NC}"
npm run preview 