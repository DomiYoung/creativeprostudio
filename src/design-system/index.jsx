// 设计系统组件导出
import Button from './components/Button';
import Card from './components/Card';

// 创意组件导出
import WaveAnimation from '../components/ui/WaveAnimation';
import AnimatedText from '../components/ui/AnimatedText';
import InteractiveCard from '../components/ui/InteractiveCard';

// 创建一个ThemeProvider组件来提供全局主题
import React, { createContext, useContext, useState } from 'react';

// 创建主题上下文
const ThemeContext = createContext({
  colorMode: 'light',
  toggleColorMode: () => {},
});

// 主题提供者组件
export const ThemeProvider = ({ children, defaultColorMode = 'light' }) => {
  const [colorMode, setColorMode] = useState(defaultColorMode);

  const toggleColorMode = () => {
    setColorMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    
    // 如果是深色模式，添加dark类到html标签
    if (colorMode === 'light') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 使用主题的hook
export const useTheme = () => useContext(ThemeContext);

// 导出所有组件
export {
  // 基础UI组件
  Button,
  Card,
  
  // 创意组件
  WaveAnimation,
  AnimatedText,
  InteractiveCard
}; 