import React, { useState, useEffect } from 'react';
import { Card, Button, ThemeProvider, useTheme } from './design-system';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// 文档卡片组件 - 基于Apple Human Interface Guidelines原则改进
const DocCard = ({ title, description, icon, iconBg, iconColor, date, type, badgeType, onClick }) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.3, ease: [0.2, 0.65, 0.3, 0.9] } 
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
        {badgeType && (
          <div className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full text-white ${
            badgeType === 'new' 
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600' 
              : 'bg-gradient-to-r from-emerald-600 to-teal-600'
          } shadow-sm backdrop-blur-xl z-10`}
          >
            {badgeType === 'new' ? '新' : '更新'}
          </div>
        )}
        
        <div className="relative overflow-hidden group">
          <div className={`absolute inset-0 opacity-10 ${
            isDark ? 'bg-gradient-to-br from-indigo-900/40 to-slate-900/20' : 
                    'bg-gradient-to-br from-indigo-50 to-white'
          }`}></div>
          
          <motion.div 
            className="relative p-8 flex justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl 
              shadow-lg transform transition-all duration-500
              ${iconBg} ${isDark ? 'shadow-gray-900/40' : 'shadow-gray-200/80'}`}
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
            <p className={`text-sm mb-8 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {description}
            </p>
            <div className="flex justify-between items-center text-xs font-medium">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                isDark ? 'bg-gray-700/80' : 'bg-gray-100/80'
              }`}>
                <i className={`fas fa-file-code ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}></i>
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{type}</span>
              </div>
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{date}</span>
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
    path: "/creativeprostudio/system-blueprint"
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
    path: "/creativeprostudio/prototype"
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
    path: "/creativeprostudio/ux-guidelines"
  },
  {
    title: "设计系统",
    description: "CreativePro Studio的完整设计系统，包含组件规范、色彩系统、排版规则和交互模式。",
    icon: "fa-palette",
    iconBg: "bg-pink/20",
    iconColor: "var(--pink)",
    date: "2025-04-29",
    type: "设计资源",
    badgeType: "new",
    path: "/creativeprostudio/showcase"
  },
  {
    title: "文档中心",
    description: "项目所有文档的汇总浏览与查看，包含系统设计、前后端实现、用户界面等各方面的详细文档。",
    icon: "fa-book",
    iconBg: "bg-teal/20",
    iconColor: "var(--teal)",
    date: "2025-04-30",
    type: "文档汇总",
    badgeType: "new",
    path: "/creativeprostudio/documentation"
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
    path: "/creativeprostudio/backend-architecture"
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
    path: "/creativeprostudio/database-design"
  },
  {
    title: "API规范",
    description: "API接口文档，详细记录接口定义、参数规范、认证机制和错误处理，支持前后端协作开发。",
    icon: "fa-plug",
    iconBg: "bg-pink/20",
    iconColor: "var(--pink)",
    date: "2025-04-27",
    type: "接口规范",
    badgeType: "new",
    path: "/creativeprostudio/api-specification"
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
    path: "/creativeprostudio/frontend-architecture"
  },
  {
    title: "前端UI规范",
    description: "前端UI规范文档，提供UI规范、技术选型和代码示例，帮助开发团队快速构建界面。",
    icon: "fa-paint-brush",
    iconBg: "bg-purple/20",
    iconColor: "var(--purple)",
    date: "2025-04-28",
    type: "UI规范",
    badgeType: "new",
    path: "/creativeprostudio/ui-guidelines"
  },
  {
    title: "UX Markdown文档",
    description: "直接访问设计系统UX相关的Markdown源文件，包含系统蓝图、可用性指南、信息架构等设计文档。",
    icon: "fa-file-alt",
    iconBg: "bg-indigo/20",
    iconColor: "var(--indigo)",
    date: "2025-05-01",
    type: "源文件",
    badgeType: "new",
    path: "/creativeprostudio/ux-guidelines"
  }
];

const projectDocs = [
  {
    title: "项目进展汇报",
    description: "CreativePro Studio项目第一季度进展汇报，包含完成情况、挑战与计划",
    icon: "fa-chart-line",
    iconBg: "bg-teal/20",
    iconColor: "var(--teal)",
    date: "2025-06-20",
    type: "汇报文档",
    badgeType: "new",
    path: "/creativeprostudio/project-report"
  },
  {
    title: "项目执行计划",
    description: "详细的项目计划文档，包含里程碑、任务分配、资源安排和风险管理策略，确保项目按期交付。",
    icon: "fa-project-diagram",
    iconBg: "bg-yellow/20",
    iconColor: "var(--yellow)",
    date: "2025-04-27",
    type: "项目管理",
    badgeType: "new",
    path: "/creativeprostudio/document/project-plan.html"
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
    path: "/creativeprostudio/document/resources.html"
  }
];

// 直接访问产品功能
const productEntries = [
  {
    title: "画布编辑器",
    description: "功能强大的可视化编辑工具，支持精确像素控制、图层管理和实时预览，让创意无限展现。",
    icon: "fa-crop-alt",
    iconBg: "bg-teal/20",
    iconColor: "var(--teal)",
    date: "2025-04-30",
    type: "核心功能",
    badgeType: "new",
    path: "/creativeprostudio/canvas-editor"
  },
  {
    title: "母版库",
    description: "管理和使用设计母版，实现一次设计多处应用，保持品牌设计一致性和高效内容生产。",
    icon: "fa-layer-group",
    iconBg: "bg-green/20",
    iconColor: "var(--green)",
    date: "2025-04-30",
    type: "设计资源",
    badgeType: "new",
    path: "/creativeprostudio/master-library"
  },
  {
    title: "批量处理中心",
    description: "一次性处理多个设计项目，批量应用样式、替换元素和导出资源，显著提升工作效率。",
    icon: "fa-th-large",
    iconBg: "bg-blue/20",
    iconColor: "var(--blue)",
    date: "2025-04-30",
    type: "效率工具",
    badgeType: "new",
    path: "/creativeprostudio/batch-center"
  },
  {
    title: "素材库",
    description: "集中管理所有设计素材，包括产品图片、品牌元素、背景和装饰元素，便于快速查找和使用。",
    icon: "fa-images",
    iconBg: "bg-purple/20",
    iconColor: "var(--purple)",
    date: "2025-04-30",
    type: "资源中心",
    badgeType: "new",
    path: "/creativeprostudio/asset-library"
  },
  {
    title: "材质库",
    description: "专业材质资源管理，包含质感纹理、产品肌理、特效材质等，为Z世代美妆产品提供独特视觉效果。",
    icon: "fa-brush",
    iconBg: "bg-pink/20",
    iconColor: "var(--pink)",
    date: "2025-04-30",
    type: "设计资源",
    badgeType: "new",
    path: "/creativeprostudio/material-library"
  },
  {
    title: "项目管理",
    description: "管理所有创意项目，跟踪进度、分配任务和审核设计，提供完整的项目生命周期管理。",
    icon: "fa-tasks",
    iconBg: "bg-orange/20",
    iconColor: "var(--orange)",
    date: "2025-04-30",
    type: "项目工具",
    badgeType: "new",
    path: "/creativeprostudio/projects"
  },
  {
    title: "创建批量任务",
    description: "快速创建新的批量处理任务，设置母版和变量，一次性生成多个设计变体。",
    icon: "fa-plus-circle",
    iconBg: "bg-indigo/20",
    iconColor: "var(--indigo)",
    date: "2025-04-30",
    type: "快捷操作",
    badgeType: "new",
    path: "/creativeprostudio/batch-create"
  }
];

// 系统设计文档
const systemDocs = [
  {
    title: "UI设计规范",
    description: "前端UI设计原则与组件规范",
    icon: "fas fa-palette",
    iconClass: "ui-icon",
    date: "2025-04-30",
    isNew: false,
    meta: { icon: "fas fa-book", text: "设计系统" },
    link: "/creativeprostudio/ui-guidelines"
  },
  {
    title: "交互设计规范",
    description: "用户交互体验与反馈机制指南",
    icon: "fas fa-hand-pointer",
    iconClass: "interaction-icon",
    date: "2025-05-28",
    isNew: true,
    meta: { icon: "fas fa-book", text: "设计系统" },
    link: "/creativeprostudio/interaction-guidelines"
  },
];

// 添加产品经理专用文档
const pmDocs = [
  {
    title: "项目蓝图",
    description: "CreativePro Studio的整体产品愿景、目标和路线图，为团队提供明确的方向指导",
    icon: "fa-map",
    iconBg: "bg-blue/20",
    iconColor: "var(--blue)",
    date: "2025-04-15",
    type: "战略文档",
    badgeType: "new",
    path: "/creativeprostudio/project-blueprint"
  },
  {
    title: "项目进度监控",
    description: "实时项目进度跟踪、里程碑完成情况及团队成员工作分配状态",
    icon: "fa-tasks",
    iconBg: "bg-pink/20",
    iconColor: "var(--pink)",
    date: "2025-05-10",
    type: "监控面板",
    badgeType: "updated",
    path: "/creativeprostudio/project-report"
  },
  {
    title: "产品生命周期",
    description: "从规划构想到迭代优化的完整产品开发流程与各阶段管理策略",
    icon: "fa-sync-alt",
    iconBg: "bg-purple/20",
    iconColor: "var(--purple)",
    date: "2025-04-20",
    type: "流程文档",
    badgeType: "new",
    path: "/creativeprostudio/product-lifecycle"
  },
  {
    title: "风险管理",
    description: "项目潜在风险识别、评估和应对策略，确保项目顺利推进",
    icon: "fa-shield-alt",
    iconBg: "bg-red/20",
    iconColor: "var(--red)",
    date: "2025-05-05",
    type: "风险评估",
    badgeType: "new",
    path: "/creativeprostudio/project-risks"
  },
  {
    title: "团队绩效",
    description: "团队成员工作成果与绩效评估，包括关键指标与改进建议",
    icon: "fa-users",
    iconBg: "bg-green/20",
    iconColor: "var(--green)",
    date: "2025-05-15",
    type: "绩效报告",
    badgeType: "new",
    path: "/creativeprostudio/team-performance"
  }
];

// 主题切换按钮 - 基于Apple Human Interface Guidelines改进
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

// 背景图案组件 - 优化视觉层次感
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

// 改进的标题组件 - 基于SF Pro Display设计风格
const FancyTitle = ({ text, subtitle }) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const navigate = useNavigate();
  
  return (
    <div className="text-center mb-16 relative z-10">
      <motion.div
        className="absolute top-0 left-0 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.button
          onClick={() => navigate('/')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700/30' : 
                    'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-arrow-left text-sm"></i>
          <span>返回项目列表</span>
        </motion.button>
      </motion.div>
      
      <motion.h1 
        className={`text-4xl sm:text-5xl font-bold tracking-tight mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="inline-block">CreativePro Studio</span>{" "}
        <span className={`inline-block ${
          isDark ? 'text-indigo-400' : 'text-indigo-600'
        }`}>文档中心</span>
      </motion.h1>
      
      <motion.p 
        className={`max-w-2xl mx-auto text-md md:text-lg ${
          isDark ? 'text-gray-300/90' : 'text-gray-600'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

// 改进的分区标题组件 - 更符合Apple设计的排版规则
const SectionTitle = ({ title, isDark }) => {
  return (
    <motion.h2 
      className={`text-lg sm:text-xl font-semibold pb-3 mb-6 border-b ${
        isDark ? 'text-gray-100 border-gray-800' : 'text-gray-800 border-gray-200'
      }`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {title}
    </motion.h2>
  );
};

// 滚动提示组件 - 符合Apple HIG的微交互设计
const ScrollIndicator = ({ isDark }) => {
  return (
    <motion.div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: [0.4, 0.8, 0.4], y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    >
      <div className={`w-8 h-12 rounded-full border-2 flex items-start justify-center p-2 backdrop-blur-lg ${
        isDark ? 'border-gray-700 bg-gray-800/30' : 
                'border-gray-200 bg-white/30'
      }`}>
        <motion.div 
          className={`w-1 h-2 rounded-full ${
            isDark ? 'bg-gray-400' : 'bg-gray-500'
          }`}
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

// 文件浏览器组件
const UxFileBrowser = ({ isDark }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  // 动态获取目录文件列表
  useEffect(() => {
    const fetchDirectoryContents = async () => {
      setIsLoadingFiles(true);
      setErrorMessage('');
      
      try {
        // 方法1：使用后端API获取目录内容（需要后端支持）
        const response = await fetch('/api/directory?path=src/design-system/ux');
        
        if (response.ok) {
          const data = await response.json();
          
          // 将文件数据转换为我们需要的格式
          const fileData = data.files.map(file => {
            // 根据文件扩展名设置图标和描述
            let icon = 'fa-file';
            let description = '未知文件类型';
            
            if (file.name.endsWith('.md')) {
              icon = 'fa-file-alt';
              // 根据文件名推断描述
              if (file.name.includes('Design')) description = '系统蓝图';
              else if (file.name.includes('Usability')) description = '可用性指南';
              else if (file.name.includes('Information')) description = '信息架构';
              else if (file.name.includes('Interaction')) description = '交互模式';
              else if (file.name.includes('Visual')) description = '视觉设计';
              else if (file.name.includes('Material')) description = '素材库';
              else description = 'Markdown文档';
            } else if (file.name.endsWith('.jsx') || file.name.endsWith('.js')) {
              icon = 'fa-file-code';
              description = 'React组件';
            } else if (file.name.endsWith('.css')) {
              icon = 'fa-file-code';
              description = '样式文件';
            } else if (file.name.endsWith('.json')) {
              icon = 'fa-file-code';
              description = 'JSON数据';
            }
            
            return {
              name: file.name,
              icon,
              description,
              type: file.type,
              size: file.size
            };
          });
          
          setFiles(fileData);
        } else {
          // 如果API请求失败，回退到硬编码文件列表
          console.warn('无法获取目录内容，使用备用文件列表');
          setFiles([
            { name: "DesignSystemOverview.md", icon: "fa-file-alt", description: "系统蓝图" },
            { name: "UsabilityGuidelines.md", icon: "fa-file-alt", description: "可用性指南" },
            { name: "InformationArchitecture.md", icon: "fa-file-alt", description: "信息架构" },
            { name: "InteractionPatterns.md", icon: "fa-file-alt", description: "交互模式" },
            { name: "VisualDesignGuidelines.md", icon: "fa-file-alt", description: "视觉设计" },
            { name: "MaterialLibraryUX.md", icon: "fa-file-alt", description: "素材库" },
            { name: "index.jsx", icon: "fa-file-code", description: "UX组件实现" }
          ]);
          setErrorMessage('目录内容加载失败，显示备用文件列表');
        }
      } catch (error) {
        console.error('获取目录内容时出错:', error);
        // 回退到硬编码文件列表
        setFiles([
          { name: "DesignSystemOverview.md", icon: "fa-file-alt", description: "系统蓝图" },
          { name: "UsabilityGuidelines.md", icon: "fa-file-alt", description: "可用性指南" },
          { name: "InformationArchitecture.md", icon: "fa-file-alt", description: "信息架构" },
          { name: "InteractionPatterns.md", icon: "fa-file-alt", description: "交互模式" },
          { name: "VisualDesignGuidelines.md", icon: "fa-file-alt", description: "视觉设计" },
          { name: "MaterialLibraryUX.md", icon: "fa-file-alt", description: "素材库" },
          { name: "index.jsx", icon: "fa-file-code", description: "UX组件实现" }
        ]);
        setErrorMessage('目录内容加载失败，显示备用文件列表');
      } finally {
        setIsLoadingFiles(false);
      }
    };
    
    fetchDirectoryContents();
  }, []);
  
  // 加载文件内容
  const loadFileContent = async (fileName) => {
    if (!fileName) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/src/design-system/ux/${fileName}`);
      if (response.ok) {
        const text = await response.text();
        setFileContent(text);
      } else {
        setFileContent('文件加载失败，请稍后再试');
      }
    } catch (error) {
      console.error('加载文件失败:', error);
      setFileContent('文件加载失败，请稍后再试');
    } finally {
      setIsLoading(false);
    }
  };

  // 选择文件时触发
  const handleFileSelect = (fileName) => {
    setSelectedFile(fileName);
    loadFileContent(fileName);
  };
  
  // 渲染文件内容
  const renderFileContent = () => {
    if (!selectedFile) {
      return (
        <div className={`text-center p-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <i className="fas fa-folder-open text-3xl mb-2"></i>
          <p>请从左侧选择文件查看内容</p>
        </div>
      );
    }
    
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className={`animate-spin h-8 w-8 border-2 rounded-full ${
            isDark ? 'border-indigo-500 border-t-transparent' : 'border-indigo-600 border-t-transparent'
          }`}></div>
        </div>
      );
    }
    
    const isMarkdown = selectedFile.endsWith('.md');
    
    return (
      <div className={`overflow-auto h-full p-4 ${
        isDark ? 'bg-gray-800/60 text-gray-200' : 'bg-white text-gray-800'
      } rounded-lg`}>
        {isMarkdown ? (
          // 如果是Markdown，使用样式显示
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <pre className="whitespace-pre-wrap">{fileContent}</pre>
          </div>
        ) : (
          // 如果是代码，使用代码块显示
          <pre className={`text-sm font-mono p-4 rounded-md overflow-x-auto ${
            isDark ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            {fileContent}
          </pre>
        )}
      </div>
    );
  };
  
  return (
    <div className="mt-8">
      <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
        UX设计系统文件浏览器
      </h3>
      
      <div className={`border rounded-lg overflow-hidden ${
        isDark ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className={`flex items-center p-3 border-b ${
          isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'
        }`}>
          <i className="fas fa-folder-open mr-2"></i>
          <span className="font-medium">src/design-system/ux/</span>
          
          {/* 刷新按钮 */}
          <button 
            onClick={() => {
              setFiles([]);
              setIsLoadingFiles(true);
              // 重新触发useEffect中的fetchDirectoryContents
              setIsLoadingFiles(false);
            }}
            className={`ml-auto p-1 rounded-full ${
              isDark ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' : 
                      'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
            }`}
            title="刷新目录"
          >
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>
        
        <div className="flex h-96">
          {/* 文件列表 */}
          <div className={`w-1/3 border-r overflow-y-auto ${
            isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white'
          }`}>
            {isLoadingFiles ? (
              <div className="flex justify-center items-center h-full">
                <div className={`animate-spin h-6 w-6 border-2 rounded-full ${
                  isDark ? 'border-blue-500 border-t-transparent' : 
                          'border-blue-600 border-t-transparent'
                }`}></div>
              </div>
            ) : files.length === 0 ? (
              <div className={`text-center p-4 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <i className="fas fa-folder-open text-2xl mb-2"></i>
                <p>目录为空</p>
              </div>
            ) : (
              <>
                {errorMessage && (
                  <div className={`p-2 text-xs ${
                    isDark ? 'bg-red-900/20 text-red-300 border-b border-red-900/30' : 
                            'bg-red-50 text-red-600 border-b border-red-100'
                  }`}>
                    <i className="fas fa-exclamation-circle mr-1"></i>
                    {errorMessage}
                  </div>
                )}
                
                {files.map((file, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ backgroundColor: isDark ? 'rgba(79, 70, 229, 0.1)' : 'rgba(79, 70, 229, 0.05)' }}
                    className={`flex items-center p-3 cursor-pointer border-b ${
                      selectedFile === file.name 
                        ? (isDark ? 'bg-indigo-900/30 border-indigo-700/50' : 'bg-indigo-50 border-indigo-100')
                        : (isDark ? 'border-gray-700/50' : 'border-gray-100')
                    }`}
                    onClick={() => handleFileSelect(file.name)}
                  >
                    <i className={`fas ${file.icon} mr-3 ${
                      file.name.endsWith('.md')
                        ? (isDark ? 'text-teal-400' : 'text-teal-600')
                        : (isDark ? 'text-blue-400' : 'text-blue-600')
                    }`}></i>
                    <div>
                      <div className={isDark ? 'text-gray-200' : 'text-gray-800'}>
                        {file.name}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {file.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </div>
          
          {/* 文件内容 */}
          <div className="w-2/3 overflow-hidden p-3">
            {renderFileContent()}
          </div>
        </div>
        
        <div className={`p-2 text-xs ${
          isDark ? 'bg-gray-800 text-gray-400 border-t border-gray-700' : 
                  'bg-gray-100 text-gray-500 border-t border-gray-200'
        }`}>
          © domiyoung__ | 所有文件版权所有
        </div>
      </div>
    </div>
  );
};

// 主文档中心组件 - 架构优化
const DocCenter = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [activeTab, setActiveTab] = useState('ux'); // 'ux' 或 'dev' 或 'pm'
  
  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 卡片点击处理
  const handleCardClick = (path) => {
    navigate(path);
  };
  
  // 渲染卡片网格
  const renderDocGrid = (docArray) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {docArray.map((doc, index) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <DocCard 
                {...doc}
                onClick={() => handleCardClick(doc.path)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  };

  // 分类文档数据
  const uxDesignDocs = [
    ...systemDesignDocs.filter(doc => 
      doc.title.includes('UX') || 
      doc.title.includes('UI') || 
      doc.title.includes('设计') || 
      doc.title.includes('原型') ||
      doc.title.includes('可用性')
    ),
    // ...systemDocs
  ];

  const devDocs = [
    ...techDocs,
    ...systemDesignDocs.filter(doc => 
      doc.title.includes('架构') || 
      doc.title.includes('API') || 
      doc.title.includes('数据') ||
      doc.title.includes('前端') ||
      doc.title.includes('后端')
    )
  ];

  // 选项卡切换组件
  const TabSwitcher = () => (
    <div className="flex justify-center mb-12">
      <motion.div 
        className={`rounded-xl p-1 flex ${
          isDark ? 'bg-gray-800/80' : 'bg-gray-100/80'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.button
          onClick={() => setActiveTab('ux')}
          className={`px-6 py-3 rounded-lg font-medium transition ${
            activeTab === 'ux' 
              ? (isDark ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white') 
              : (isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
          }`}
          whileHover={{ scale: activeTab !== 'ux' ? 1.03 : 1 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-2">
            <i className="fas fa-paint-brush"></i>
            <span>UX/UI设计师</span>
          </div>
        </motion.button>
        
        <motion.button
          onClick={() => setActiveTab('dev')}
          className={`px-6 py-3 rounded-lg font-medium transition ${
            activeTab === 'dev' 
              ? (isDark ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white') 
              : (isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
          }`}
          whileHover={{ scale: activeTab !== 'dev' ? 1.03 : 1 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-2">
            <i className="fas fa-code"></i>
            <span>开发工程师</span>
          </div>
        </motion.button>
        
        <motion.button
          onClick={() => setActiveTab('pm')}
          className={`px-6 py-3 rounded-lg font-medium transition ${
            activeTab === 'pm' 
              ? (isDark ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white') 
              : (isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
          }`}
          whileHover={{ scale: activeTab !== 'pm' ? 1.03 : 1 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-2">
            <i className="fas fa-chart-pie"></i>
            <span>产品经理</span>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
  
  // 添加Markdown文档资源部分 - 移到组件内部
  const renderMarkdownSection = () => {
    const mdFiles = [
      { name: "系统蓝图", path: "DesignSystemOverview.md" },
      { name: "可用性指南", path: "UsabilityGuidelines.md" },
      { name: "信息架构", path: "InformationArchitecture.md" },
      { name: "交互模式", path: "InteractionPatterns.md" },
      { name: "视觉设计", path: "VisualDesignGuidelines.md" },
      { name: "素材库", path: "MaterialLibraryUX.md" }
    ];

    return (
      <div className="mt-6">
        <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Markdown源文件</h3>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <p className={`mb-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>直接访问src/design-system/ux目录下的Markdown源文件:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {mdFiles.map((file, index) => (
              <a 
                key={index}
                href={`/src/design-system/ux/${file.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-2 rounded text-sm font-medium transition ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-indigo-700 text-gray-200' 
                    : 'bg-white hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 border border-gray-200'
                } flex items-center gap-2`}
              >
                <i className="fas fa-file-alt"></i>
                <span>{file.name}</span>
              </a>
            ))}
          </div>
          <div className="mt-3">
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              所有Markdown文件版权归属 © domiyoung__
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`min-h-screen relative pb-16 pt-12 ${
      isDark ? 'text-gray-100' : 'text-gray-900'
    }`}>
      <BackgroundPattern isDark={isDark} />
      <ThemeToggle />
      
      <div className="container mx-auto px-4 sm:px-6 lg:max-w-6xl relative z-10">
        <FancyTitle 
          text="CreativePro Studio 文档中心" 
          subtitle="美妆与潮流创意设计平台，面向Z世代女性用户的一站式创意内容创作工具" 
        />
        
        <TabSwitcher />

        <AnimatePresence mode="wait">
          {activeTab === 'ux' ? (
            <motion.div
              key="ux-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <section className="mb-16">
                <SectionTitle title="UX/UI设计规范" isDark={isDark} />
                {renderDocGrid(uxDesignDocs)}
              </section>
              
              <section className="mb-16">
                <SectionTitle title="产品与创意资源" isDark={isDark} />
                {renderDocGrid(productEntries)}
              </section>
            </motion.div>
          ) : activeTab === 'dev' ? (
            <motion.div
              key="dev-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <section className="mb-16">
                <SectionTitle title="技术架构与API" isDark={isDark} />
                {renderDocGrid(devDocs)}
              </section>
              
              <section className="mb-16">
                <SectionTitle title="开发资源与管理" isDark={isDark} />
                {renderDocGrid(projectDocs)}
              </section>
              
              <UxFileBrowser isDark={isDark} />
              
              {renderMarkdownSection()}
            </motion.div>
          ) : (
            <motion.div
              key="pm-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <section className="mb-16">
                <SectionTitle title="项目管理与规划" isDark={isDark} />
                {renderDocGrid(pmDocs)}
              </section>
              
              <section className="mb-16">
                <SectionTitle title="产品生命周期" isDark={isDark} />
                {renderDocGrid([
                  {
                    title: "产品生命周期流程",
                    description: "从规划构想到迭代优化的完整产品开发流程图，包含七个关键阶段",
                    icon: "fa-sync-alt",
                    iconBg: "bg-indigo/20",
                    iconColor: "var(--indigo)",
                    date: "2025-04-30",
                    type: "流程文档",
                    badgeType: "new",
                    path: "/creativeprostudio/product-lifecycle"
                  }
                ])}
              </section>
            </motion.div>
          )}
        </AnimatePresence>
        
        <footer className={`text-center mt-20 py-8 border-t ${
          isDark ? 'border-gray-700/50 text-gray-400' : 'border-gray5 text-gray2'
        }`}>
          <p>© 2025 domiyoung__ | CreativePro Studio - AI赋能内容创作平台 | 版权所有</p>
        </footer>
      </div>
      
      {showScrollIndicator && <ScrollIndicator isDark={isDark} />}
    </div>
  );
};

// 移除嵌套ThemeProvider
export default DocCenter; 