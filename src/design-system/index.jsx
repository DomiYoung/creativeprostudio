// 设计系统组件导出
import Button from './components/Button';
import { Card } from './components/Card';
import PageLayout from './components/PageLayout';
import ContentCard from './components/ContentCard';
import { GridLayout } from './components/GridLayout';
import FilterBar from './components/FilterBar';
import { Link } from 'react-router-dom';

// 创意组件导出
import WaveAnimation from '../components/ui/WaveAnimation';
import AnimatedText from '../components/ui/AnimatedText';
import InteractiveCard from '../components/ui/InteractiveCard';

// 主题相关导出
import { ThemeProvider, useTheme } from './ThemeContext';

// 导出所有组件
export {
  // 主题相关
  ThemeProvider,
  useTheme,
  
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