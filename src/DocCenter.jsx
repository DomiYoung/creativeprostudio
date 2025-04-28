import React, { useState, useEffect } from 'react';
import { Card, Button, ThemeProvider, useTheme } from './design-system';
import { motion, AnimatePresence } from 'framer-motion';

// 文档卡片组件
const DocCard = ({ title, description, icon, iconBg, iconColor, date, type, badgeType, onClick }) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] } 
      }}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        shadow={isDark ? "sm" : "md"}
        interactive
        padding="none"
        className={`overflow-hidden h-full border-none transition-all duration-300 ${
          isDark ? 'bg-gray-800/80 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl'
        } ${
          isDark ? 'hover:shadow-[0_12px_28px_-5px_rgba(124,58,237,0.35)]' : 
                  'hover:shadow-[0_12px_28px_-5px_rgba(201,168,211,0.3)]'
        }`}
        onClick={onClick}
      >
        {badgeType && (
          <div className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full text-white ${
            badgeType === 'new' ? 'bg-gradient-to-r from-red/90 to-pink/90' : 
                                'bg-gradient-to-r from-green/90 to-teal/90'
          } shadow-sm backdrop-blur-xl z-10`}
          >
            {badgeType === 'new' ? '新' : '更新'}
          </div>
        )}
        
        <div className="relative overflow-hidden group">
          <div className={`absolute inset-0 opacity-10 ${
            isDark ? 'bg-gradient-to-br from-purple/40 to-indigo/20' : 
                    'bg-gradient-to-br from-primary-light to-white'
          }`}></div>
          
          <motion.div 
            className="relative p-8 flex justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl 
              shadow-lg transform transition-all duration-500
              ${iconBg} ${isDark ? 'shadow-gray-900/40' : 'shadow-gray3/30'}`}
              style={{ color: iconColor }}
              animate={{ 
                scale: isHovered ? 1.05 : 1,
                boxShadow: isHovered ? 
                  isDark ? '0 15px 30px -8px rgba(0, 0, 0, 0.5)' : '0 15px 30px -8px rgba(0, 0, 0, 0.15)' : 
                  isDark ? '0 8px 20px -5px rgba(0, 0, 0, 0.4)' : '0 8px 20px -5px rgba(0, 0, 0, 0.1)'
              }}
            >
              <i className={`fas ${icon}`}></i>
            </motion.div>
          </motion.div>
          
          <div className="relative px-8 pb-8">
            <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {title}
            </h3>
            <p className={`text-sm mb-8 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray'}`}>
              {description}
            </p>
            <div className="flex justify-between items-center text-xs font-medium">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                isDark ? 'bg-gray-700/80' : 'bg-gray6/80'
              }`}>
                <i className={`fas fa-file-code ${isDark ? 'text-purple' : 'text-indigo'}`}></i>
                <span className={isDark ? 'text-gray-300' : 'text-gray'}>{type}</span>
              </div>
              <span className={`${isDark ? 'text-gray-400' : 'text-gray2'}`}>{date}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// 文档卡片数据
const systemDesignDocs = [
  {
    title: "系统蓝图",
    description: "包含AI赋能内容创作系统的整体架构、核心原则和实施路线图，为团队提供清晰的开发指南。",
    icon: "fa-sitemap",
    iconBg: "bg-indigo/20",
    iconColor: "var(--indigo)",
    date: "2025-04-27",
    type: "规划文档",
    badgeType: "new",
    path: "/pages/system-blueprint.html"
  },
  {
    title: "页面原型",
    description: "交互式页面原型与界面示例，包含完整的用户流程和视觉效果，便于设计评审和用户测试。",
    icon: "fa-desktop",
    iconBg: "bg-blue/20",
    iconColor: "var(--blue)",
    date: "2025-04-22",
    type: "交互原型",
    badgeType: "updated",
    path: "/pages/prototype-design.html"
  },
  {
    title: "UX 设计",
    description: "用户体验设计文档，包含用户旅程地图、信息架构和交互规范，确保产品易用性和一致性。",
    icon: "fa-user-circle",
    iconBg: "bg-purple/20",
    iconColor: "var(--purple)",
    date: "2025-04-25",
    type: "设计规范",
    badgeType: "new",
    path: "/pages/ux-document-browser.html"
  }
];

const techDocs = [
  {
    title: "后端架构设计",
    description: "后端架构与服务设计文档，详细说明微服务架构、数据流转和业务逻辑实现方案。",
    icon: "fa-server",
    iconBg: "bg-green/20",
    iconColor: "var(--green)",
    date: "2025-04-27",
    type: "服务架构",
    badgeType: "new",
    path: "/pages/backend-document-browser.html"
  },
  {
    title: "数据库设计",
    description: "数据库设计文档，包含表结构设计、索引策略和查询优化方案，确保系统高效稳定运行。",
    icon: "fa-database",
    iconBg: "bg-teal/20",
    iconColor: "var(--teal)",
    date: "2025-04-27",
    type: "数据结构",
    badgeType: "new",
    path: "/pages/database-document-browser.html"
  },
  {
    title: "API文档",
    description: "API接口文档，详细记录接口定义、参数规范、认证机制和错误处理，支持前后端协作开发。",
    icon: "fa-plug",
    iconBg: "bg-pink/20",
    iconColor: "var(--pink)",
    date: "2025-04-27",
    type: "接口规范",
    badgeType: "new",
    path: "/pages/api-document-browser.html"
  },
  {
    title: "前端架构设计",
    description: "前端组件库与实现文档，提供组件规范、技术选型和代码示例，帮助开发团队快速构建界面。",
    icon: "fa-code",
    iconBg: "bg-orange/20",
    iconColor: "var(--orange)",
    date: "2025-04-27",
    type: "组件库",
    badgeType: "new",
    path: "/pages/frontend-document-browser.html"
  },
  {
    title: "前端UI规范",
    description: "前端UI规范文档，提供UI规范、技术选型和代码示例，帮助开发团队快速构建界面。",
    icon: "fa-code",
    iconBg: "bg-orange/20",
    iconColor: "var(--orange)",
    date: "2025-04-28",
    type: "UI规范",
    badgeType: "new",
    path: "/pages/frontend-ui-document-browser.html"
  }
];

const projectDocs = [
  {
    title: "项目执行计划",
    description: "详细的项目计划文档，包含里程碑、任务分配、资源安排和风险管理策略，确保项目按期交付。",
    icon: "fa-project-diagram",
    iconBg: "bg-yellow/20",
    iconColor: "var(--yellow)",
    date: "2025-04-27",
    type: "项目管理",
    badgeType: "new",
    path: "/pages/project-plan.html"
  },
  {
    title: "开发资源",
    description: "集成开发所需的各类资源，包含设计资源、开发工具、SDK文档和环境配置指南，加速团队协作。",
    icon: "fa-toolbox",
    iconBg: "bg-purple/20",
    iconColor: "var(--purple)",
    date: "2025-04-27",
    type: "资源中心",
    badgeType: "new",
    path: "/pages/resources.html"
  }
];

// 主题切换按钮
const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useTheme();
  
  return (
    <motion.button 
      onClick={toggleColorMode}
      className={`fixed top-6 right-6 z-50 p-3.5 rounded-full shadow-xl ${
        colorMode === 'light' ? 'bg-white/90 text-indigo backdrop-blur-md' : 'bg-gray-800/90 text-purple backdrop-blur-md'
      }`}
      whileHover={{ scale: 1.1, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.18)" }}
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

// 背景图案组件
const BackgroundPattern = ({ isDark }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 背景渐变 */}
      <div className={`absolute inset-0 ${
        isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 
                'bg-gradient-to-br from-gray6/70 via-primary-light/60 to-gray5/70'
      }`}></div>
      
      {/* 装饰圆点 */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full opacity-30 
        bg-gradient-to-r from-purple/30 to-indigo/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20 
        bg-gradient-to-r from-teal/30 to-blue/20 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        w-[120vh] h-[120vh] rounded-full opacity-10 
        bg-gradient-to-r from-yellow/10 to-orange/10 blur-3xl"></div>
      
      {/* 网格线 */}
      <div className={`absolute inset-0 
        bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] 
        bg-[size:72px_72px]`}></div>
        
      {/* 苹果风格装饰斑点 */}
      <div className="absolute top-0 right-0 opacity-20 w-1/3 h-1/3 bg-gradient-to-b from-purple/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 opacity-20 w-1/3 h-1/3 bg-gradient-to-t from-indigo/20 to-transparent rounded-full blur-3xl"></div>
    </div>
  );
};

// 高端装饰性标题
const FancyTitle = ({ text, subtitle }) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  return (
    <div className="relative">
      <motion.div 
        className={`absolute -top-3 left-1/2 transform -translate-x-1/2 
                   text-7xl font-bold opacity-5 tracking-wider whitespace-nowrap
                   ${isDark ? 'text-white' : 'text-gray'}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.05, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        CREATIVEPRO
      </motion.div>
      
      <motion.h1 
        className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'} tracking-tight relative z-10`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {text}
        <motion.span 
          className={`ml-2 px-2 py-1 text-sm align-text-top font-medium rounded
          ${isDark ? 'bg-purple/30 text-purple-300' : 'bg-primary-light/80 text-indigo'}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          2025
        </motion.span>
      </motion.h1>
      
      <motion.div
        className="w-24 h-1 mx-auto mb-6 rounded-full"
        style={{ 
          background: isDark ? 
            'linear-gradient(90deg, var(--purple) 0%, var(--indigo) 100%)' : 
            'linear-gradient(90deg, var(--indigo) 0%, var(--blue) 100%)'
        }}
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      ></motion.div>
      
      <motion.p 
        className={`max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray'} text-lg leading-relaxed`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

// 高端小标题
const SectionTitle = ({ title, isDark }) => {
  return (
    <div className="relative mb-12">
      <h2 className={`text-2xl font-bold mb-3 pb-3 inline-block relative
        ${isDark ? 'text-white' : 'text-gray-800'}`}
      >
        {title}
        <div className="absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-gradient-to-r from-purple/80 to-transparent"></div>
      </h2>
    </div>
  );
};

// 文档中心主页
const DocCenter = () => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleCardClick = (path) => {
    // 实际环境中应该使用路由跳转，这里暂时使用window.location
    console.log(`跳转到: ${path}`);
    // window.location.href = path;
  };
  
  // 容器动画
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    }
  };
  
  return (
    <div className={`min-h-screen relative overflow-hidden ${
      isDark ? 'text-gray-100' : 'text-gray-800'
    }`}>
      <BackgroundPattern isDark={isDark} />
      <ThemeToggle />
      
      {/* 页面头部装饰浮动栏 */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-16 backdrop-blur-lg z-20 transition-all duration-500 ${
          scrolled ? (isDark ? 'bg-gray-900/70' : 'bg-white/70') : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: scrolled ? 0 : -100 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center 
              ${isDark ? 'bg-purple/20' : 'bg-indigo/20'}`}>
              <i className={`fas fa-book text-sm ${isDark ? 'text-purple-300' : 'text-indigo'}`}></i>
            </div>
            <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>CreativePro 文档中心</span>
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray'}`}>
            内容创作平台 · 2025版
          </div>
        </div>
      </motion.div>
      
      <div className="container mx-auto py-20 px-6 relative z-10">
        <header className="text-center mb-24">
          <FancyTitle 
            text="CreativePro Studio 文档中心"
            subtitle="集成设计、开发和文档资源，提供完整的产品设计解决方案"
          />
        </header>
        
        <motion.section
          className="mb-28"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SectionTitle title="系统规划与设计" isDark={isDark} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systemDesignDocs.map((doc, index) => (
              <motion.div key={index} variants={itemVariants}>
                <DocCard 
                  {...doc} 
                  onClick={() => handleCardClick(doc.path)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        <motion.section
          className="mb-28"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionTitle title="技术实现与文档" isDark={isDark} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techDocs.map((doc, index) => (
              <motion.div key={index} variants={itemVariants}>
                <DocCard 
                  {...doc} 
                  onClick={() => handleCardClick(doc.path)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        <motion.section
          className="mb-28"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionTitle title="项目管理与资源" isDark={isDark} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectDocs.map((doc, index) => (
              <motion.div key={index} variants={itemVariants}>
                <DocCard 
                  {...doc} 
                  onClick={() => handleCardClick(doc.path)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        <motion.footer 
          className={`text-center mt-28 pt-12 relative ${isDark ? 'text-gray-400' : 'text-gray'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-gray-300/40 to-transparent"></div>
          <p className="mb-2">© 2025 CreativePro Studio</p>
          <p className="text-sm opacity-70">AI赋能内容创作平台 | 版权所有: @domiyoung___</p>
        </motion.footer>
      </div>
    </div>
  );
};

const DocCenterWithTheme = () => (
  <ThemeProvider>
    <DocCenter />
  </ThemeProvider>
);

export default DocCenterWithTheme; 