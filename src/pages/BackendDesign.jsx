import React from 'react';
import { Calendar, User, GitBranch, Database, Server, Lock } from 'react-feather';
import DocumentLayout from '../components/DocumentLayout';
import '../styles/DocumentPage.css';

/**
 * 后端设计文档页面
 */
function BackendDesign() {
  // 文档元数据
  const metadata = [
    { label: '最后更新', value: '2025-06-10', type: 'date' },
    { label: '作者', value: '后端架构团队', type: 'author' },
    { label: '版本', value: '1.5.0', icon: <GitBranch size={16} /> }
  ];

  // 目录
  const tableOfContents = [
    { id: 'architecture', title: '1. 架构设计' },
    { id: 'api-design', title: '2. API设计规范' },
    { id: 'data-models', title: '3. 数据模型' },
    { id: 'security', title: '4. 安全策略' },
    { id: 'performance', title: '5. 性能优化' },
    { id: 'caching', title: '6. 缓存策略' },
    { id: 'deployment', title: '7. 部署架构' },
    { id: 'monitoring', title: '8. 监控与运维' }
  ];

  return (
    <DocumentLayout
      title="后端概要设计"
      subtitle="CreativePro Studio 后端系统架构与实现规范"
      metadata={metadata}
      tableOfContents={tableOfContents}
    >
      {/* 1. 架构设计 */}
      <section id="architecture" className="section">
        <h2 className="section-title">1. 架构设计</h2>
        <p>CreativePro Studio采用微服务架构，将系统拆分为多个独立部署的服务，通过API网关统一对外提供服务。</p>
        
        <div className="diagram">
          <img src="/images/backend-architecture.png" alt="后端架构图" />
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">1.1 架构层次</h3>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>架构层</th>
                  <th>描述</th>
                  <th>技术选型</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>接入层</td>
                  <td>负责请求路由、负载均衡、限流、认证</td>
                  <td>Nginx, Kong API Gateway</td>
                </tr>
                <tr>
                  <td>应用服务层</td>
                  <td>实现业务逻辑，对外提供API服务</td>
                  <td>Node.js, Express, NestJS</td>
                </tr>
                <tr>
                  <td>数据服务层</td>
                  <td>封装数据访问逻辑，实现数据持久化</td>
                  <td>MongoDB, Redis, Elasticsearch</td>
                </tr>
                <tr>
                  <td>基础设施层</td>
                  <td>提供底层支持服务</td>
                  <td>Docker, Kubernetes, AWS S3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">1.2 微服务划分</h3>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>服务名称</th>
                  <th>功能职责</th>
                  <th>依赖服务</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>用户服务</td>
                  <td>用户账户管理、权限控制</td>
                  <td>无</td>
                </tr>
                <tr>
                  <td>资产服务</td>
                  <td>素材、模板等资源管理</td>
                  <td>用户服务、存储服务</td>
                </tr>
                <tr>
                  <td>设计服务</td>
                  <td>设计项目创建与管理</td>
                  <td>用户服务、资产服务</td>
                </tr>
                <tr>
                  <td>协作服务</td>
                  <td>实时协作、评论功能</td>
                  <td>用户服务、设计服务</td>
                </tr>
                <tr>
                  <td>转换服务</td>
                  <td>设计转生产文件转换</td>
                  <td>设计服务、资产服务</td>
                </tr>
                <tr>
                  <td>分析服务</td>
                  <td>数据统计与分析</td>
                  <td>全部服务</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 2. API设计规范 */}
      <section id="api-design" className="section">
        <h2 className="section-title">2. API设计规范</h2>
        <p>系统API采用RESTful风格设计，统一使用JSON格式进行数据交换，遵循以下规范：</p>
        
        <div className="subsection">
          <h3 className="subsection-title">2.1 API命名规范</h3>
          
          <div className="code-block">
            <pre>{`// API路径格式
/api/v{version}/{resource}/{resourceId}/{subResource}

// 示例
GET /api/v1/projects                // 获取项目列表
GET /api/v1/projects/123            // 获取单个项目
POST /api/v1/projects               // 创建项目
PUT /api/v1/projects/123            // 更新项目
DELETE /api/v1/projects/123         // 删除项目
GET /api/v1/projects/123/assets     // 获取项目资产列表`}</pre>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">2.2 请求与响应格式</h3>
          
          <div className="code-block">
            <pre>{`// 标准响应格式
{
  "success": true|false,
  "data": {}, // 成功时返回的数据
  "error": {  // 失败时返回的错误信息
    "code": "ERROR_CODE",
    "message": "错误描述",
    "details": {} // 详细错误信息
  },
  "meta": {   // 元数据，如分页信息
    "page": 1,
    "pageSize": 20,
    "total": 100
  }
}`}</pre>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">2.3 状态码使用</h3>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>状态码</th>
                  <th>说明</th>
                  <th>使用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>200 OK</td>
                  <td>请求成功</td>
                  <td>GET、PUT、PATCH 操作成功</td>
                </tr>
                <tr>
                  <td>201 Created</td>
                  <td>资源创建成功</td>
                  <td>POST 操作成功创建资源</td>
                </tr>
                <tr>
                  <td>204 No Content</td>
                  <td>操作成功但无内容返回</td>
                  <td>DELETE 操作成功</td>
                </tr>
                <tr>
                  <td>400 Bad Request</td>
                  <td>请求参数错误</td>
                  <td>请求数据格式错误或验证失败</td>
                </tr>
                <tr>
                  <td>401 Unauthorized</td>
                  <td>未认证</td>
                  <td>未提供认证信息或认证失败</td>
                </tr>
                <tr>
                  <td>403 Forbidden</td>
                  <td>权限不足</td>
                  <td>认证成功但无权限访问资源</td>
                </tr>
                <tr>
                  <td>404 Not Found</td>
                  <td>资源不存在</td>
                  <td>请求的资源不存在</td>
                </tr>
                <tr>
                  <td>500 Internal Server Error</td>
                  <td>服务器内部错误</td>
                  <td>服务端出现未预期的错误</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. 数据模型 */}
      <section id="data-models" className="section">
        <h2 className="section-title">3. 数据模型</h2>
        <p>系统采用MongoDB作为主要数据存储，基于文档模型设计数据结构。以下是主要数据集合的结构设计：</p>
        
        <div className="subsection">
          <h3 className="subsection-title">3.1 用户模型</h3>
          
          <div className="code-block">
            <pre>{`// users集合
{
  "_id": ObjectId("5f8d0e0b0b0b0b0b0b0b0b0b"),
  "email": "user@example.com",
  "passwordHash": "...",
  "profile": {
    "name": "用户名",
    "avatar": "https://...",
    "role": "designer|manager|admin",
    "company": "公司名称",
    "title": "职位"
  },
  "settings": {
    "theme": "light|dark",
    "notifications": {
      "email": true,
      "browser": true
    }
  },
  "status": "active|inactive|suspended",
  "createdAt": ISODate("2025-01-01T00:00:00Z"),
  "updatedAt": ISODate("2025-01-01T00:00:00Z")
}`}</pre>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">3.2 项目模型</h3>
          
          <div className="code-block">
            <pre>{`// projects集合
{
  "_id": ObjectId("5f8d0e0b0b0b0b0b0b0b0b0b"),
  "name": "项目名称",
  "description": "项目描述",
  "type": "design|template|batch",
  "thumbnail": "https://...",
  "owner": ObjectId("5f8d0e0b0b0b0b0b0b0b0b0b"), // 用户ID
  "team": [
    {
      "userId": ObjectId("5f8d0e0b0b0b0b0b0b0b0b0b"),
      "role": "editor|viewer|admin"
    }
  ],
  "settings": {
    "width": 800,
    "height": 600,
    "unit": "px|mm|cm",
    "colorSpace": "RGB|CMYK"
  },
  "status": "draft|active|archived",
  "versions": [
    {
      "number": 1,
      "createdBy": ObjectId("5f8d0e0b0b0b0b0b0b0b0b0b"),
      "createdAt": ISODate("2025-01-01T00:00:00Z"),
      "snapshot": "https://...",
      "comment": "版本说明"
    }
  ],
  "createdAt": ISODate("2025-01-01T00:00:00Z"),
  "updatedAt": ISODate("2025-01-01T00:00:00Z")
}`}</pre>
          </div>
        </div>
      </section>
    </DocumentLayout>
  );
}

export default BackendDesign; 