import React, { createContext, useContext, useState, useEffect } from 'react';

// 创建主题上下文
const ThemeContext = createContext();

// 主题提供者组件
export const ThemeProvider = ({ children }) => {
  // 检测系统是否处于暗黑模式
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // 检查用户之前的设置
  const savedMode = localStorage.getItem('colorMode');
  const initialMode = savedMode || (prefersDarkMode ? 'dark' : 'light');
  
  const [colorMode, setColorMode] = useState(initialMode);
  
  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('colorMode')) {
        setColorMode(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // 保存主题设置到本地存储
  useEffect(() => {
    localStorage.setItem('colorMode', colorMode);
    
    // 设置HTML元素的data-theme属性用于全局CSS变量
    document.documentElement.setAttribute('data-theme', colorMode);
    
    // 设置meta主题色
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        colorMode === 'dark' ? '#121212' : '#ffffff'
      );
    }
  }, [colorMode]);
  
  // 切换主题
  const toggleColorMode = () => {
    setColorMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };
  
  // 设置特定主题
  const setSpecificColorMode = (mode) => {
    if (mode === 'light' || mode === 'dark') {
      setColorMode(mode);
    }
  };
  
  return (
    <ThemeContext.Provider value={{ 
      colorMode, 
      toggleColorMode,
      setColorMode: setSpecificColorMode,
      isDark: colorMode === 'dark'
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 使用主题的钩子
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext; 