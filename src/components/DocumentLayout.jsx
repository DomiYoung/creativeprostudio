import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../design-system';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * 通用文档布局组件 - 为所有JSX文档页面提供统一布局
 */
const DocumentLayout = ({ title, children, copyright = "© domiyoung__ 版权所有" }) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const navigate = useNavigate();
  const location = useLocation();

  // 返回按钮处理
  const handleBack = () => {
    // 分析当前路径，确定返回到哪个项目的文档中心
    const path = location.pathname;
    if (path.includes('/creativeprostudio/')) {
      navigate('/creativeprostudio');
    } else {
      // 如果将来添加其他项目，可以在这里添加条件
      // 默认返回项目列表
      navigate('/');
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray6'}`}>
      {/* 顶部导航 */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-16 backdrop-blur-lg z-20 
                    shadow-sm ${isDark ? 'bg-gray-900/70' : 'bg-white/70'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center">
            <motion.button
              className={`mr-4 p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray6'}`}
              onClick={handleBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={`fas fa-arrow-left ${isDark ? 'text-white' : 'text-gray-800'}`}></i>
            </motion.button>
            <div className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center 
              ${isDark ? 'bg-purple/20' : 'bg-indigo/20'}`}>
              <i className={`fas fa-book text-sm ${isDark ? 'text-purple-300' : 'text-indigo'}`}></i>
            </div>
            <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {title}
            </span>
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray'}`}>
            CreativePro Studio · 文档中心
          </div>
        </div>
      </motion.div>

      {/* 文档内容区域 */}
      <div className="pt-20 pb-6 px-6 container mx-auto">
        <div className={`rounded-xl p-8 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h1 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {title}
          </h1>
          
          <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
            {children}
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100 dark:bg-blue-900/30 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                {copyright}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentLayout; 