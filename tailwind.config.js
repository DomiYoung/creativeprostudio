/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色调系统
        'primary': '#F5E1D9',
        'primary-light': 'rgba(245, 225, 217, 0.2)',
        'primary-dark': '#E8D5C8',
        'secondary': '#EADCD3',
        
        // Apple 设计色彩系统（柔和色调）
        'blue': '#94B6D2',
        'indigo': '#A9A8D9',
        'purple': '#C9A8D3',
        'pink': '#E3A8B7',
        'red': '#D98E8E',
        'orange': '#E8C3A5',
        'yellow': '#E8D5A5',
        'green': '#A5C9BB',
        'mint': '#A5C9C6',
        'teal': '#A5C3C9',
        'cyan': '#A8C9E3',
        'gray': '#968D87',
        'gray2': '#B5ADA8',
        'gray3': '#C7C0BD',
        'gray4': '#D6D0CC',
        'gray5': '#E6DED9',
        'gray6': '#F5F0EC',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.03)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.03)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.02)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '32px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      }
    },
  },
  // 在Tailwind CSS 4中，需要显式配置核心插件
  corePlugins: {
    fontFamily: true,
  },
  plugins: [],
} 