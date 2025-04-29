# 页面转换指南

本目录包含从静态HTML页面转换为React组件的文件。转换工作遵循以下原则：

## 转换原则

1. **组件化设计**：将页面UI拆分为可复用的组件
2. **使用Styled Components**：使用`@emotion/styled`替代传统CSS
3. **动画增强**：使用`framer-motion`增强交互体验
4. **状态管理**：使用React hooks管理组件状态
5. **路由集成**：与React Router集成，支持SPA导航

## 转换步骤

将HTML页面转换为React组件的一般步骤：

1. **分析HTML结构**：
   - 理解页面结构和布局
   - 确定可重用组件
   - 标识样式和交互逻辑

2. **创建样式组件**：
   - 将CSS选择器转换为styled-components
   - 提取可复用的样式变量
   - 添加动态样式属性

3. **构建React组件**：
   - 创建有状态组件
   - 实现交互逻辑
   - 添加动画效果

4. **路由集成**：
   - 更新路由配置
   - 实现页面间导航

## 已转换页面

目前已转换的页面：

- `PrototypeDesign.jsx` - 从 `pages/prototype-design.html` 转换

## 转换模板

新页面转换可以参考以下模板：

```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../design-system';
import styled from '@emotion/styled';

// 样式组件声明

// 主组件
const ComponentName = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 状态和逻辑
  
  return (
    <Container>
      {/* 组件内容 */}
    </Container>
  );
};

export default ComponentName;
``` 