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

export default colors; 