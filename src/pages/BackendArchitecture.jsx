import React from 'react';
import DocumentLayout from '../components/DocumentLayout';

const BackendArchitecture = () => {
  return (
    <DocumentLayout 
      title="后端架构设计"
      copyright="© domiyoung__ 版权所有 | 本后端架构设计文档仅供授权用户参考"
    >
      <p className="lead">
        本文档详细说明CreativePro Studio的后端架构设计，包括微服务架构、数据流转与业务逻辑实现方案。
      </p>
      
      <h2>架构概览</h2>
      <p>
        CreativePro Studio采用微服务架构，将系统功能拆分为独立部署的微服务，提高系统弹性和可扩展性。
        通过API网关统一管理请求路由和安全控制，确保系统安全性和可维护性。
      </p>
      
      <h2>核心服务</h2>
      <ul>
        <li><strong>用户认证服务</strong> - 处理用户注册、登录和权限管理</li>
        <li><strong>资产管理服务</strong> - 负责素材和设计资产的存储和检索</li>
        <li><strong>编辑器服务</strong> - 提供画布编辑核心功能支持</li>
        <li><strong>协作服务</strong> - 实现实时协作和版本控制</li>
        <li><strong>渲染服务</strong> - 处理复杂渲染和导出任务</li>
        <li><strong>分析服务</strong> - 收集和处理用户行为和系统性能数据</li>
      </ul>
      
      <h2>技术选型</h2>
      <ul>
        <li><strong>API层</strong> - .NET Core 7.0 WebAPI</li>
        <li><strong>服务通信</strong> - gRPC和MessageBus (RabbitMQ)</li>
        <li><strong>数据存储</strong> - PostgreSQL (关系数据)，MongoDB (文档数据)，Redis (缓存)</li>
        <li><strong>文件存储</strong> - Azure Blob Storage / AWS S3</li>
        <li><strong>实时通信</strong> - SignalR</li>
        <li><strong>身份验证</strong> - JWT, OpenID Connect, OAuth 2.0</li>
      </ul>
      
      <h2>数据流设计</h2>
      <p>
        系统采用CQRS (命令查询责任分离)模式，将读操作和写操作分离处理，提高系统性能和扩展性。
        查询操作通过只读副本和缓存优化响应时间，写操作通过事件溯源确保数据一致性。
      </p>
      
      <h2>安全设计</h2>
      <p>
        安全设计遵循"深度防御"原则，实现多层次安全保障：
      </p>
      <ul>
        <li>网络层 - TLS加密，WAF防护</li>
        <li>应用层 - 输入验证，参数化查询，CSRF防护</li>
        <li>数据层 - 加密存储，最小权限原则</li>
        <li>鉴权层 - 基于角色(RBAC)和属性(ABAC)的访问控制</li>
      </ul>
      
      <h2>监控与运维</h2>
      <p>
        系统集成全面监控和日志收集机制，确保系统稳定性和问题快速定位：
      </p>
      <ul>
        <li>应用性能监控 (APM) - 使用Application Insights</li>
        <li>日志管理 - ELK Stack (Elasticsearch, Logstash, Kibana)</li>
        <li>指标监控 - Grafana + Prometheus</li>
        <li>告警系统 - 集成PagerDuty实现多渠道告警</li>
      </ul>
    </DocumentLayout>
  );
};

export default BackendArchitecture; 