# PNPM 使用指南

## 简介

本项目使用 pnpm 作为包管理工具，而不是npm或yarn。pnpm具有以下优势：

- **磁盘空间效率**：pnpm使用硬链接和符号链接来共享依赖，节省大量磁盘空间
- **更快的安装速度**：得益于其独特的存储结构，安装速度通常比npm和yarn快
- **严格的依赖管理**：防止"幽灵依赖"问题，提高代码质量和可维护性
- **支持monorepo**：内置的工作空间(workspace)功能，无需额外工具

## 安装pnpm

如果你还没有安装pnpm，请使用以下命令进行安装：

```bash
# macOS / Linux
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Windows (使用PowerShell)
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

或者使用npm全局安装：

```bash
npm install -g pnpm
```

## 基本使用命令

以下是使用pnpm的常用命令，替代对应的npm命令：

| 操作 | pnpm命令 | 对应的npm命令 |
|------|---------|-------------|
| 安装所有依赖 | `pnpm install` | `npm install` |
| 添加新依赖 | `pnpm add [package]` | `npm install [package]` |
| 添加开发依赖 | `pnpm add -D [package]` | `npm install --save-dev [package]` |
| 全局安装包 | `pnpm add -g [package]` | `npm install -g [package]` |
| 卸载依赖 | `pnpm remove [package]` | `npm uninstall [package]` |
| 更新依赖 | `pnpm update` | `npm update` |
| 运行脚本 | `pnpm [script]` | `npm run [script]` |
| 运行开发服务器 | `pnpm dev` | `npm run dev` |
| 构建项目 | `pnpm build` | `npm run build` |

## 项目特定命令

本项目定义了以下npm脚本，可以通过pnpm运行：

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview

# 运行测试
pnpm test

# 运行lint检查
pnpm lint

# 格式化代码
pnpm format
```

## 迁移注意事项

1. 请勿使用npm或yarn命令，统一使用pnpm
2. 请勿手动编辑pnpm-lock.yaml文件
3. 如遇到依赖问题，尝试运行`pnpm install --force`

## 更多资源

- [pnpm官方文档](https://pnpm.io/zh/)
- [为什么要使用pnpm?](https://pnpm.io/zh/motivation)

## 版权声明

© domiyoung__ - 版权所有 