import React from 'react';
import DocumentLayout from '../components/DocumentLayout';

const FrontendArchitecture = () => {
  return (
    <DocumentLayout 
      title="前端架构设计"
      copyright="© domiyoung__ 版权所有 | 本前端架构设计文档仅供授权用户参考"
    >
      <p className="lead">
        本文档详细说明CreativePro Studio的前端架构设计，包括组件设计、状态管理、构建流程等核心内容。
      </p>
      
      <h2>技术栈</h2>
      <ul>
        <li><strong>框架</strong> - React 18 (使用函数组件和Hooks)</li>
        <li><strong>构建工具</strong> - Vite</li>
        <li><strong>路由</strong> - React Router v6</li>
        <li><strong>状态管理</strong> - Redux Toolkit + React Query</li>
        <li><strong>样式</strong> - TailwindCSS + Emotion</li>
        <li><strong>动效</strong> - Framer Motion</li>
        <li><strong>类型检查</strong> - TypeScript</li>
        <li><strong>测试</strong> - Vitest + React Testing Library</li>
      </ul>
      
      <h2>架构设计</h2>
      <p>
        采用特性驱动的分层架构，将前端代码按照职责和功能模块划分，提高代码可维护性和开发效率：
      </p>
      <ul>
        <li><strong>设计系统层</strong> - 包含基础UI组件和样式系统</li>
        <li><strong>特性模块层</strong> - 按业务功能划分的功能模块</li>
        <li><strong>数据管理层</strong> - API集成和状态管理</li>
        <li><strong>工具服务层</strong> - 工具函数和通用服务</li>
      </ul>
      
      <h2>组件设计原则</h2>
      <ol>
        <li><strong>原子设计</strong> - 遵循原子设计理念，从原子组件构建复杂界面</li>
        <li><strong>单一职责</strong> - 每个组件只负责单一功能或UI元素</li>
        <li><strong>容器/展示分离</strong> - 逻辑与UI分离，提高组件复用性</li>
        <li><strong>自包含状态</strong> - 组件内部状态与外部解耦，减少副作用</li>
        <li><strong>接口明确</strong> - 使用PropTypes和TypeScript定义清晰的组件接口</li>
      </ol>
      
      <h2>状态管理</h2>
      <p>
        采用分层状态管理策略，根据状态的特性和作用范围选择适当的管理方式：
      </p>
      <ul>
        <li><strong>组件状态</strong> - 使用React Hooks (useState, useReducer)</li>
        <li><strong>全局UI状态</strong> - 使用Context API</li>
        <li><strong>业务状态</strong> - 使用Redux Toolkit</li>
        <li><strong>服务器状态</strong> - 使用React Query</li>
      </ul>
      
      <h2>性能优化</h2>
      <p>
        通过以下策略确保应用在各种设备上保持流畅体验：
      </p>
      <ul>
        <li>代码分割和懒加载 (React.lazy和Suspense)</li>
        <li>虚拟列表渲染</li>
        <li>组件记忆化 (React.memo, useMemo, useCallback)</li>
        <li>资源预加载和缓存策略</li>
        <li>WebWorker处理复杂计算</li>
      </ul>
      
      <h2>构建与部署</h2>
      <p>
        使用现代化的构建流程，确保开发效率和产品质量：
      </p>
      <ul>
        <li>模块化打包和Tree-shaking</li>
        <li>持续集成/部署 (CI/CD)</li>
        <li>构建产物分析与优化</li>
        <li>CDN分发与缓存策略</li>
      </ul>
    </DocumentLayout>
  );
};

export default FrontendArchitecture; 