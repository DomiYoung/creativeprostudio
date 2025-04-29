// 设计系统组件导出
import Button from './components/Button';
import Card from './components/Card';
import PageLayout from './components/PageLayout';
import ContentCard from './components/ContentCard';
import GridLayout from './components/GridLayout';
import FilterBar from './components/FilterBar';
import { Link } from 'react-router-dom';

// 创意组件导出
import WaveAnimation from '../components/ui/WaveAnimation';
import AnimatedText from '../components/ui/AnimatedText';
import InteractiveCard from '../components/ui/InteractiveCard';

// 创建一个ThemeProvider组件来提供全局主题
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

// 导出所有组件
export {
  // 基础UI组件
  Button,
  Card,
  PageLayout,
  ContentCard,
  GridLayout,
  FilterBar,
  
  // 创意组件
  WaveAnimation,
  AnimatedText,
  InteractiveCard
};

// 添加版权信息
export const COPYRIGHT_INFO = "© 版权归属domiyoung__ 2025 CreativePro Studio. All rights reserved.";

// 默认导出
export default {
  ThemeProvider,
  useTheme,
  Button,
  Card,
  PageLayout,
  ContentCard,
  GridLayout,
  FilterBar,
  COPYRIGHT_INFO
};

// 在导航或者相关组件中添加UX设计系统链接
<Link to="/creativeprostudio/ux-guidelines" className="...">
  UX设计文档
</Link>

// 设计系统导航组件
export const DesignSystemNav = () => {
  return (
    <div className="flex space-x-4 my-4">
      <Link to="/design-system" className="px-4 py-2 bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200">
        组件库
      </Link>
      <Link to="/creativeprostudio/ux-guidelines" className="px-4 py-2 bg-pink-100 text-pink-800 rounded-md hover:bg-pink-200">
        UX设计文档
      </Link>
      <Link to="/creativeprostudio/system-blueprint" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200">
        系统蓝图
      </Link>
    </div>
  );
}; 