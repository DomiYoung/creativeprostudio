// 符合Apple Human Interface Guidelines的间距和圆角系统
const spacing = {
  // 基础间距系统 - 8点网格
  space: {
    '0': '0px',
    '0.5': '4px',    // 半个单位
    '1': '8px',      // 基础单位
    '2': '16px',     // 2x
    '3': '24px',     // 3x
    '4': '32px',     // 4x
    '5': '40px',     // 5x
    '6': '48px',     // 6x
    '8': '64px',     // 8x
    '10': '80px',    // 10x
    '12': '96px',    // 12x
    '16': '128px',   // 16x
  },
  
  // 组件内间距
  component: {
    card: '24px',        // 卡片内边距
    section: '32px',     // 区块内边距
    container: '48px',   // 容器外边距
    fieldset: '16px',    // 表单组内边距
  },
  
  // 圆角 - 符合iOS UI
  borderRadius: {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '12px',     // 标准iOS圆角
    lg: '16px',
    xl: '24px',
    pill: '9999px', // 胶囊形状
  },
  
  // 阴影 - 符合iOS风格的轻微阴影
  shadows: {
    sm: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    lg: '0px 4px 8px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.1)',
    xl: '0px 8px 16px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1)',
    // 深色模式阴影
    dark: {
      sm: '0px 1px 2px rgba(0, 0, 0, 0.2)',
      md: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      lg: '0px 4px 8px rgba(0, 0, 0, 0.3)',
      xl: '0px 8px 16px rgba(0, 0, 0, 0.4)',
    }
  },
  
  // 布局特定值
  layout: {
    maxWidth: '1200px',    // 内容最大宽度
    headerHeight: '60px',  // 标准头部高度
    sidebarWidth: '280px', // 侧边栏宽度
    bottomBarHeight: '50px', // 底部导航高度
    gutter: '24px',        // 栅格间隔
  }
};

export default spacing; 