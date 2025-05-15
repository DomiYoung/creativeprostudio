# CreativePro Studio - React to Figma 设计系统转换指南
**© 设计版权归domiyoung__所有**

## 目录
1. [项目概述](#项目概述)
2. [设计令牌转换](#设计令牌转换)
   - [颜色系统](#颜色系统)
   - [字体系统](#字体系统)
   - [间距系统](#间距系统)
3. [组件库转换](#组件库转换)
   - [按钮组件](#按钮组件)
   - [卡片组件](#卡片组件)
   - [导航组件](#导航组件)
   - [表单组件](#表单组件)
4. [页面模板](#页面模板)
5. [React与Figma协作流程](#React与Figma协作流程)

## 项目概述

本文档详细记录了CreativePro Studio项目从React代码到Figma设计系统的转换过程。转换的目标是建立一个统一的设计语言，确保开发和设计保持一致，并为后续的开发和设计工作提供参考。

项目采用以下技术栈：
- **前端框架**：React.js
- **设计系统工具**：Figma
- **样式解决方案**：Styled Components + Emotion
- **动效库**：Framer Motion

## 设计令牌转换

### 颜色系统

从`src/design-system/tokens/colors.js`提取的颜色令牌如下：

```javascript
// 颜色令牌 - 基于Apple Human Interface Guidelines
const colors = {
  // 主色 - 基于SF蓝
  primary: {
    light: '#007AFF', // iOS浅色模式蓝色
    dark: '#0A84FF',  // iOS深色模式蓝色
  },
  
  // 辅助色彩
  accent: {
    orange: '#FF9500',    // iOS橙色
    green: '#34C759',     // iOS绿色
    indigo: '#5856D6',    // iOS靛蓝色
    teal: '#5AC8FA',      // iOS浅蓝色
    red: '#FF3B30',       // iOS红色 - 用于错误状态
    yellow: '#FFCC00',    // iOS黄色 - 用于警告状态
  },
  
  // 灰阶
  gray: {
    50: '#F5F5F7',   // 最浅灰色 - 背景色
    100: '#E5E5EA',
    200: '#D1D1D6',
    300: '#C7C7CC',
    400: '#AEAEB2',
    500: '#8E8E93',
    600: '#636366',
    700: '#48484A',
    800: '#3A3A3C',
    900: '#2C2C2E',
    950: '#1D1D1F',  // 最深灰色
  },
  
  // 语义色
  semantic: {
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#007AFF',
  },
  
  // 前景/背景色
  ui: {
    background: {
      light: '#F5F5F7',    // 浅色模式背景色
      dark: '#1D1D1F',     // 深色模式背景色
    },
    card: {
      light: '#FFFFFF',    // 浅色模式卡片背景
      dark: '#2C2C2E',     // 深色模式卡片背景
    },
    text: {
      primary: {
        light: '#1D1D1F',  // 浅色模式主文本色
        dark: '#FFFFFF',   // 深色模式主文本色
      },
      secondary: {
        light: '#8E8E93',  // 浅色模式次要文本色
        dark: '#AEAEB2',   // 深色模式次要文本色
      },
      tertiary: {
        light: '#AEAEB2',  // 浅色模式第三级文本色
        dark: '#8E8E93',   // 深色模式第三级文本色
      },
    },
    border: {
      light: '#E5E5EA',    // 浅色模式边框色
      dark: '#48484A',     // 深色模式边框色
    },
  },
};
```

**注意：项目中存在颜色定义不一致的情况**

检查按钮组件`Button.jsx`的源代码，发现实际使用的默认主色与`colors.js`中定义的不同：

```javascript
// Button.jsx中的PRIMARY变体定义
case VARIANTS.PRIMARY:
  bgColor = props.$color || '#FF9190'; // 默认使用粉红色而非iOS蓝色
  textColor = '#FFF';
  // ...
```

同样，渐变按钮也使用了不同的默认颜色：

```javascript
// GRADIENT变体定义
case VARIANTS.GRADIENT:
  const gradientFrom = props.$gradientFrom || '#FF9190';
  const gradientTo = props.$gradientTo || '#6DC9FF';
  // ...
```

**颜色系统规范化建议**：
1. 统一使用`colors.js`中定义的颜色系统
2. 修改`Button.jsx`组件，使用`primary.light`作为默认主色
3. 在Figma设计系统中使用标准化的颜色定义

**Figma实现方法**：
1. 在Figma中创建颜色样式集合
2. 为每个颜色创建样式，按照分类组织
3. 使用命名约定：`category/name-variant`，例如：`primary/light`, `accent/orange`
4. 创建颜色变量以支持亮色/暗色主题切换

### 字体系统

从`src/design-system/tokens/typography.js`提取的字体令牌如下：

```javascript
// 符合Apple Human Interface Guidelines的排版系统
const typography = {
  // 字体家族
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
    display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    mono: '"SF Mono", SFMono-Regular, ui-monospace, monospace',
    rounded: '"SF Pro Rounded", -apple-system, BlinkMacSystemFont, sans-serif', // 圆角变体
  },
  
  // 字体粗细
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // 字体大小
  fontSize: {
    caption2: '11px',    // Caption 2
    caption1: '12px',    // Caption 1
    footnote: '13px',    // Footnote
    subhead: '15px',     // Subheadline
    body: '17px',        // Body (iOS标准正文大小)
    callout: '16px',     // Callout
    title3: '20px',      // Title 3
    title2: '22px',      // Title 2
    title1: '28px',      // Title 1
    largeTitle: '34px',  // Large Title
  },
  
  // 行高
  lineHeight: {
    tight: 1.2,    // 用于大标题
    snug: 1.3,     // 用于标题
    normal: 1.4,   // 用于副标题
    relaxed: 1.5,  // 用于正文
    loose: 1.6,    // 用于长文本
  },
  
  // 字母间距
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0',
    wide: '0.01em',
    wider: '0.02em',
  },
  
  // 预设文本样式
  presets: {
    largeTitle: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
      fontSize: '34px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    title1: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    title2: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    title3: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
      fontSize: '17px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    footnote: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.3,
    },
  },
};
```

**Figma实现方法**：
1. 在Figma中创建文本样式集合
2. 为每个预设文本样式创建对应的文本样式
3. 使用命名约定：`textStyle/variant`，例如：`textStyle/largeTitle`, `textStyle/body`
4. 确保字体设置匹配（字体族、大小、粗细、行高、字母间距）

### 间距系统

Figma中间距系统的实现：
1. 创建一个间距的Frame，展示所有间距值
2. 使用Auto Layout创建一致的间距系统
3. 使用Figma变量存储间距值
4. 将间距值应用于组件的内边距和外边距

## 组件库转换

### 按钮组件

从`src/design-system/components/Button.jsx`转换到Figma:

```jsx
// Button variants
const VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  TEXT: 'text',
  GRADIENT: 'gradient',
  OUTLINE: 'outline',
  GHOST: 'ghost',
};

// Button sizes
const SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};
```

**Figma实现方法**：
1. 创建一个主Button组件
2. 使用Figma变体创建不同的Button变体：
   - 属性1：variant (primary, secondary, tertiary, text, gradient, outline, ghost)
   - 属性2：size (xs, sm, md, lg, xl)
   - 属性3：state (default, hover, active, disabled)
3. 为每个变体设置正确的样式（颜色、尺寸、填充等）
4. 使用Auto Layout实现按钮内容布局
5. 添加交互状态

### 卡片组件

从`src/design-system/components/Card.jsx`转换到Figma:

```jsx
// Card component with multiple variants
const Card = ({ 
  children,
  title,
  subtitle,
  headerAction,
  media,
  mediaHeight,
  mediaOverlay,
  mediaTitle,
  mediaSubtitle,
  mediaZoomOnHover = true,
  footer,
  footerAlign = 'flex-end',
  variant = 'default',
  isElevated = false,
  fullWidth = false,
  maxWidth,
  hasHoverEffect = false,
  is3D = false,
  interactive = false,
  headerDivider = false,
  footerDivider = false,
  noPadding = false,
  badge,
  badgeColor,
  gradient = false,
  gradientFrom,
  gradientTo,
  background,
  backgroundOpacity,
  onClick,
  whileHover,
  whileTap,
  initial,
  animate,
  transition,
  ...props
}) => {
  //...component implementation
};
```

**Figma实现方法**：
1. 创建一个主Card组件
2. 使用Figma变体创建不同的Card变体：
   - 属性1：variant (default, elevated, 3d)
   - 属性2：hasMedia (true, false)
   - 属性3：hasHeader (true, false)
   - 属性4：hasFooter (true, false)
   - 属性5：hasGradient (true, false)
3. 使用Auto Layout实现卡片内容布局
4. 为每个变体设置正确的样式
5. 添加交互状态和悬浮效果

## React与Figma协作流程

为了保持React代码和Figma设计的一致性，建议采用以下协作流程：

1. **设计令牌同步**
   - 使用Tokens Studio for Figma插件导入/导出设计令牌
   - 确保React代码中的设计令牌与Figma中的保持一致

2. **组件一致性检查**
   - 定期审查React组件和Figma组件库，确保视觉一致性
   - 使用标准化的组件文档，记录组件的使用方法和变体

3. **版本控制**
   - 使用Figma的版本历史记录设计变更
   - 与代码仓库的版本保持同步

4. **协作工具**
   - 使用Figma的注释功能进行设计讨论
   - 使用Figma的共享功能与团队成员共享设计

## 版权说明

本设计系统及其所有组件的设计版权归domiyoung__所有。在Figma文件的每个页面和关键组件上都应标注版权信息。

---

*文档更新日期：2025-05-11*  
*© 设计版权归domiyoung__所有* 