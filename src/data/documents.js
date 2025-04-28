const documents = {
  design: [
    {
      id: 'system-blueprint',
      icon: 'fas fa-sitemap',
      iconClass: 'system-blueprint-icon',
      title: '系统蓝图',
      description: '包含AI赋能内容创作系统的整体架构、核心原则和实施路线图，为团队提供清晰的开发指南。',
      meta: {
        icon: 'fas fa-file-code',
        text: '规划文档'
      },
      date: '2025-04-27',
      isNew: true,
      isUpdated: false,
      link: 'pages/system-blueprint.html'
    },
    {
      id: 'prototype-design',
      icon: 'fas fa-desktop',
      iconClass: 'prototype-icon',
      title: '页面原型',
      description: '交互式页面原型与界面示例，包含完整的用户流程和视觉效果，便于设计评审和用户测试。',
      meta: {
        icon: 'fas fa-file',
        text: '交互原型'
      },
      date: '2025-04-22',
      isNew: false,
      isUpdated: true,
      link: 'pages/prototype-design.html'
    },
    {
      id: 'ux-design',
      icon: 'fas fa-user-circle',
      iconClass: 'ux-icon',
      title: 'UX 设计',
      description: '用户体验设计文档，包含用户旅程地图、信息架构和交互规范，确保产品易用性和一致性。',
      meta: {
        icon: 'fas fa-file-alt',
        text: '设计规范'
      },
      date: '2025-04-25',
      isNew: true,
      isUpdated: false,
      link: 'pages/ux-document-browser.html'
    }
  ],
  technical: [
    {
      id: 'backend-architecture',
      icon: 'fas fa-server',
      iconClass: 'backend-icon',
      title: '后端架构设计',
      description: '后端架构与服务设计文档，详细说明微服务架构、数据流转和业务逻辑实现方案。',
      meta: {
        icon: 'fas fa-cogs',
        text: '服务架构'
      },
      date: '2025-04-27',
      isNew: true,
      isUpdated: false,
      link: 'pages/backend-document-browser.html'
    },
    {
      id: 'database-design',
      icon: 'fas fa-database',
      iconClass: 'database-icon',
      title: '数据库设计',
      description: '数据库设计文档，包含表结构设计、索引策略和查询优化方案，确保系统高效稳定运行。',
      meta: {
        icon: 'fas fa-database',
        text: '数据结构'
      },
      date: '2025-04-27',
      isNew: true,
      isUpdated: false,
      link: 'pages/database-document-browser.html'
    },
    {
      id: 'api-docs',
      icon: 'fas fa-plug',
      iconClass: 'api-icon',
      title: 'API文档',
      description: 'API接口文档，详细记录接口定义、参数规范、认证机制和错误处理，支持前后端协作开发。',
      meta: {
        icon: 'fas fa-file-alt',
        text: '接口规范'
      },
      date: '2025-04-27',
      isNew: true,
      isUpdated: false,
      link: 'pages/api-document-browser.html'
    },
    {
      id: 'frontend-architecture',
      icon: 'fas fa-code',
      iconClass: 'frontend-icon',
      title: '前端架构设计',
      description: '前端组件库与实现文档，提供组件规范、技术选型和代码示例，帮助开发团队快速构建界面。',
      meta: {
        icon: 'fas fa-file-code',
        text: '组件库'
      },
      date: '2025-04-27',
      isNew: true,
      isUpdated: false,
      link: 'pages/frontend-document-browser.html'
    },
    {
      id: 'frontend-ui-specs',
      icon: 'fas fa-code',
      iconClass: 'frontend-icon',
      title: '前端ui规范',
      description: '前端ui规范文档，提供ui规范、技术选型和代码示例，帮助开发团队快速构建界面。',
      meta: {
        icon: 'fas fa-file-code',
        text: 'ui规范'
      },
      date: '2025-04-28',
      isNew: true,
      isUpdated: false,
      link: 'pages/frontend-ui-document-browser.html'
    }
  ],
  project: [
    {
      id: 'project-plan',
      icon: 'fas fa-project-diagram',
      iconClass: 'project-icon',
      title: '项目执行计划',
      description: '详细的项目计划文档，包含里程碑、任务分配、资源安排和风险管理策略，确保项目按期交付。',
      meta: {
        icon: 'fas fa-tasks',
        text: '项目管理'
      },
      date: '2025-04-27',
      isNew: true,
      isUpdated: false,
      link: 'pages/project-plan.html'
    },
    {
      id: 'dev-resources',
      icon: 'fas fa-toolbox',
      iconClass: 'ux-icon',
      title: '开发资源',
      description: '集成开发所需的各类资源，包含设计资源、开发工具、SDK文档和环境配置指南，加速团队协作。',
      meta: {
        icon: 'fas fa-archive',
        text: '资源中心'
      },
      date: '2025-04-27',
      isNew: true,
      isUpdated: false,
      link: 'pages/resources.html'
    }
  ]
};

export default documents; 