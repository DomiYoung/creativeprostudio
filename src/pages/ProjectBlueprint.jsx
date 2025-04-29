import React from 'react';
import DocumentLayout from '../components/DocumentLayout';

const ProjectBlueprint = () => {
  return (
    <DocumentLayout 
      title="系统蓝图"
      copyright="© domiyoung__ 版权所有 | 本系统蓝图仅供授权用户参考，未经许可不得分享或转载"
    >
      <p className="lead">
        本文档概述了CreativePro Studio的系统架构、核心组件及其交互方式，为开发团队提供了系统级视图。
      </p>
      
      <h2>系统概述</h2>
      <p>
        CreativePro Studio是一套专为创意设计师和前端开发者打造的协作平台，采用现代前端技术栈，
        结合云原生后端服务，提供从设计到实现的全流程支持。
      </p>
      
      <h2>核心组件</h2>
      <ul>
        <li><strong>设计系统引擎</strong> - 统一管理设计语言和组件</li>
        <li><strong>资产库管理器</strong> - 组织和版本控制设计资产</li>
        <li><strong>批次处理中心</strong> - 批量处理设计任务</li>
        <li><strong>画布编辑器</strong> - 可视化设计与代码生成</li>
        <li><strong>API集成层</strong> - 连接第三方设计和开发工具</li>
      </ul>
      
      <h2>技术架构</h2>
      <p>
        前端采用React生态系统，包括React Router用于路由管理，Framer Motion用于动效处理，
        TailwindCSS用于样式管理。后端采用微服务架构，使用.NET Core构建API服务。
      </p>
      
      <h2>数据流</h2>
      <p>
        系统遵循单向数据流原则，状态管理采用Redux模式，确保应用状态的可预测性和可调试性。
        核心业务逻辑集中在服务层，UI组件专注于渲染和用户交互。
      </p>
      
      <h2>安全模型</h2>
      <p>
        采用基于JWT的身份验证，结合细粒度的RBAC权限控制，确保系统资源的安全访问。
        所有API通信采用HTTPS加密，敏感数据存储前进行加密处理。
      </p>
      
      <h2>部署架构</h2>
      <p>
        前端应用通过CDN分发，实现全球加速；后端服务采用容器化部署，支持水平扩展，
        关键服务实现多区域冗余部署，确保系统高可用性。
      </p>
    </DocumentLayout>
  );
};

export default ProjectBlueprint; 