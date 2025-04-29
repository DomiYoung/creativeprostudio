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

export default typography;