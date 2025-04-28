// 符合Apple Human Interface Guidelines的排版系统
export const typography = {
  // 字体家族
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
    display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    mono: '"SF Mono", SFMono-Regular, ui-monospace, monospace',
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
    xs: '11px',     // Caption 2
    sm: '12px',     // Caption 1
    base: '14px',   // Footnote
    md: '15px',     // Subheadline
    lg: '17px',     // Body
    xl: '20px',     // Title 3
    '2xl': '22px',  // Title 2
    '3xl': '28px',  // Title 1
    '4xl': '34px',  // Large Title
  },
  
  // 行高
  lineHeight: {
    tight: 1.2,
    base: 1.4,
    relaxed: 1.6,
  },
  
  // 字母间距
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0',
    wide: '0.01em',
    wider: '0.02em',
  },
};