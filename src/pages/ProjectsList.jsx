import React from 'react';
import { motion } from 'framer-motion';
import { Card, useTheme } from '../design-system';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ title, description, date, status, onClick }) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  return (
    <motion.div
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.3, ease: [0.2, 0.65, 0.3, 0.9] } 
      }}
      className="h-full"
    >
      <Card
        shadow={isDark ? "sm" : "md"}
        interactive
        className={`h-full border-none transition-all duration-300 ${
          isDark 
            ? 'bg-gray-800/80 backdrop-blur-xl border border-gray-700/30' 
            : 'bg-white/90 backdrop-blur-xl border border-gray-100'
        } ${
          isDark 
            ? 'hover:shadow-[0_12px_28px_-5px_rgba(76,29,149,0.25)]' 
            : 'hover:shadow-[0_12px_28px_-5px_rgba(79,70,229,0.15)]'
        }`}
        onClick={onClick}
      >
        <div className={`flex justify-between items-start mb-4`}>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {title}
          </h2>
          <div className={`px-3 py-1 text-xs font-medium rounded-full ${
            status === 'active' 
              ? `${isDark ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}` 
              : status === 'development'
                ? `${isDark ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-100 text-amber-700'}`
                : `${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
          }`}>
            {status === 'active' ? '活跃' : status === 'development' ? '开发中' : '存档'}
          </div>
        </div>
        
        <p className={`text-sm mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
        
        <div className={`flex justify-between items-center mt-auto text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>最后更新: {date}</span>
          <div className={`flex items-center gap-1 ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>
            <span>查看项目</span>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const BackgroundPattern = ({ isDark }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 主背景 */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-b from-gray-950 to-gray-900' 
          : 'bg-gradient-to-b from-stone-50 to-neutral-50'
      }`}></div>
      
      {/* 顶部渐变光效 */}
      <div className={`absolute top-0 left-0 right-0 h-[30vh] ${
        isDark 
          ? 'bg-gradient-to-b from-indigo-950/30 to-transparent' 
          : 'bg-gradient-to-b from-blue-50/60 to-transparent'
      } opacity-80`}></div>
      
      {/* 右侧渐变球体 */}
      <div className={`absolute top-[15%] right-[5%] w-[40vw] h-[40vw] rounded-full ${
        isDark
          ? 'bg-gradient-to-tr from-purple-900/10 to-blue-900/10'
          : 'bg-gradient-to-tr from-indigo-100/30 to-blue-100/30'
      } blur-3xl opacity-50 transform -rotate-12`}></div>
      
      {/* 左侧渐变球体 */}
      <div className={`absolute bottom-[15%] left-[5%] w-[35vw] h-[35vw] rounded-full ${
        isDark
          ? 'bg-gradient-to-br from-slate-900/30 to-slate-800/20'
          : 'bg-gradient-to-br from-slate-100/50 to-slate-200/30'
      } blur-3xl opacity-40 transform rotate-12`}></div>
      
      {/* 微妙的网格图案 */}
      <div className={`absolute inset-0 ${
        isDark ? 'opacity-[0.03]' : 'opacity-[0.04]'
      }`} style={{ 
        backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), 
                          linear-gradient(to right, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        backgroundPosition: '-1px -1px'
      }}></div>
      
      {/* 顶部装饰线条 */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        isDark 
          ? 'bg-gradient-to-r from-indigo-500/0 via-indigo-500/40 to-indigo-500/0'
          : 'bg-gradient-to-r from-indigo-200/0 via-indigo-300/30 to-indigo-200/0'
      }`}></div>
    </div>
  );
};

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useTheme();
  
  return (
    <motion.button 
      onClick={toggleColorMode}
      className={`fixed top-6 right-6 z-50 p-3.5 rounded-full shadow-lg backdrop-blur-lg ${
        colorMode === 'light' 
          ? 'bg-white/80 text-indigo-600 border border-gray-100' 
          : 'bg-gray-800/80 text-indigo-300 border border-gray-700/30'
      }`}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)" }}
      whileTap={{ scale: 0.95 }}
      aria-label="切换主题模式"
    >
      {colorMode === 'light' ? 
        <i className="fas fa-moon text-lg"></i> : 
        <i className="fas fa-sun text-lg"></i>
      }
    </motion.button>
  );
};

// 项目数据
const projects = [
  {
    id: 'creativeprostudio',
    title: 'CreativePro Studio',
    description: '美妆与潮流创意设计平台，面向Z世代女性用户的一站式创意内容创作工具。',
    date: '2025-04-30',
    status: 'active'
  },
  {
    id: 'zephyrdashboard',
    title: 'Zephyr Dashboard',
    description: '智能数据可视化仪表盘项目，整合多种数据源，提供实时数据分析与决策支持。',
    date: '2025-04-25',
    status: 'development'
  },
  {
    id: 'lunarconnect',
    title: 'Lunar Connect',
    description: '社交媒体内容管理平台，自动化内容分发与用户互动分析，提升社媒运营效率。',
    date: '2025-04-15',
    status: 'archived'
  },
  {
    id: 'pixelesence',
    title: 'Pixel Essence',
    description: 'AI驱动的图像增强与智能编辑工具，为摄影师与设计师提供专业级图像处理解决方案。',
    date: '2025-04-20',
    status: 'development'
  }
];

const ProjectsList = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  const handleProjectClick = (projectId) => {
    if (projectId === 'creativeprostudio') {
      navigate('/creativeprostudio');
    } else {
      // 其他项目暂不可访问
      alert('该项目正在建设中，敬请期待！');
    }
  };
  
  return (
    <div className={`min-h-screen relative pb-16 pt-12 ${
      isDark ? 'text-gray-100' : 'text-gray-900'
    }`}>
      <BackgroundPattern isDark={isDark} />
      <ThemeToggle />
      
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            项目中心
          </h1>
          <p className={`max-w-2xl mx-auto text-md md:text-lg ${
            isDark ? 'text-gray-300/90' : 'text-gray-600'
          }`}>
            从这里访问您的所有创意项目，查看文档、管理资源和跟踪开发进度
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard 
                {...project}
                onClick={() => handleProjectClick(project.id)}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto ${
              isDark 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            } shadow-md`}
            onClick={() => alert('新项目创建功能即将上线!')}
          >
            <i className="fas fa-plus"></i>
            <span>创建新项目</span>
          </button>
        </motion.div>
        
        <footer className={`text-center mt-20 py-8 border-t ${
          isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-500'
        }`}>
          <p>© 2025 domiyoung__ | 创意项目管理平台 | 版权所有</p>
        </footer>
      </div>
    </div>
  );
};

export default ProjectsList; 