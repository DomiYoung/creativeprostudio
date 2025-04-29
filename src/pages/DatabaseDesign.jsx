import React from 'react';
import { Calendar, User, GitBranch } from 'react-feather';
import DocumentLayout from '../components/DocumentLayout';
import '../styles/DocumentPage.css';

/**
 * 数据库设计文档页面
 */
function DatabaseDesign() {
  // 文档元数据
  const metadata = [
    { label: '最后更新', value: '2025-04-27', type: 'date' },
    { label: '作者', value: '后端开发团队', type: 'author' },
    { label: '版本', value: '1.0.0', icon: <GitBranch size={16} /> }
  ];

  // 目录
  const tableOfContents = [
    { id: 'overview', title: '1. 数据库总体设计' },
    { id: 'tables', title: '2. 核心表结构设计' },
    { id: 'relationships', title: '3. 实体关系模型' },
    { id: 'optimization', title: '4. 性能优化策略' },
    { id: 'migration', title: '5. 数据迁移与演进' }
  ];

  return (
    <DocumentLayout
      title="数据库设计"
      subtitle="CreativePro Studio 数据库架构与表结构设计"
      metadata={metadata}
      tableOfContents={tableOfContents}
    >
      {/* 1. 数据库总体设计 */}
      <section id="overview" className="section">
        <h2 className="section-title">1. 数据库总体设计</h2>
        <p>CreativePro Studio 采用多模式数据存储架构，基于不同业务场景选择合适的数据库类型和存储策略。主要数据分类如下：</p>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>数据类型</th>
                <th>数据库选型</th>
                <th>主要用途</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>核心业务数据</td>
                <td>PostgreSQL</td>
                <td>用户管理、项目管理、权限控制</td>
                <td>强一致性、事务支持</td>
              </tr>
              <tr>
                <td>媒体资源元数据</td>
                <td>PostgreSQL + MongoDB</td>
                <td>素材库管理、资源索引</td>
                <td>结构化+半结构化混合存储</td>
              </tr>
              <tr>
                <td>全文检索数据</td>
                <td>Elasticsearch</td>
                <td>内容搜索、相似资源匹配</td>
                <td>多维度索引、高性能查询</td>
              </tr>
              <tr>
                <td>缓存数据</td>
                <td>Redis</td>
                <td>热点数据缓存、会话存储</td>
                <td>高性能、低延迟</td>
              </tr>
              <tr>
                <td>时序数据</td>
                <td>InfluxDB</td>
                <td>指标监控、操作日志</td>
                <td>高写入、时间序列优化</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p>数据库架构遵循以下设计原则：</p>
        <ul>
          <li><strong>服务边界隔离</strong>：每个微服务拥有独立的数据存储，避免跨服务直接访问数据库</li>
          <li><strong>读写分离</strong>：高负载场景下实现读写分离，提升性能和可用性</li>
          <li><strong>多级缓存</strong>：应用层、服务层、数据库层多级缓存策略</li>
          <li><strong>数据分片</strong>：大规模数据采用水平分片策略，支持业务规模扩展</li>
          <li><strong>高可用架构</strong>：关键数据库集群部署，支持自动故障转移</li>
        </ul>
        
        <div className="note">
          <div className="note-title">
            <span>设计说明</span>
          </div>
          <p>系统采用"一个微服务一个数据库"的松耦合架构，但在特定场景下允许服务间通过事件驱动和数据同步机制共享数据，确保数据一致性和性能平衡。</p>
        </div>
      </section>
      
      {/* 2. 核心表结构设计 */}
      <section id="tables" className="section">
        <h2 className="section-title">2. 核心表结构设计</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">2.1 用户与权限相关表</h3>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>表名</th>
                  <th>主要字段</th>
                  <th>索引</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>users</td>
                  <td>id, username, email, password_hash, status, created_at, updated_at</td>
                  <td>主键(id), 唯一索引(email, username)</td>
                  <td>用户基本信息</td>
                </tr>
                <tr>
                  <td>roles</td>
                  <td>id, name, description</td>
                  <td>主键(id), 唯一索引(name)</td>
                  <td>角色定义</td>
                </tr>
                <tr>
                  <td>permissions</td>
                  <td>id, name, resource, action, description</td>
                  <td>主键(id), 复合索引(resource, action)</td>
                  <td>权限定义</td>
                </tr>
                <tr>
                  <td>user_roles</td>
                  <td>user_id, role_id</td>
                  <td>主键(user_id, role_id), 外键索引</td>
                  <td>用户-角色关联</td>
                </tr>
                <tr>
                  <td>role_permissions</td>
                  <td>role_id, permission_id</td>
                  <td>主键(role_id, permission_id), 外键索引</td>
                  <td>角色-权限关联</td>
                </tr>
                <tr>
                  <td>user_profiles</td>
                  <td>user_id, full_name, avatar_url, preferences, settings</td>
                  <td>主键(user_id), 外键索引</td>
                  <td>用户扩展信息</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="code-block">
            <pre>{`-- 用户表 DDL 示例
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_email_unique UNIQUE (email),
    CONSTRAINT users_username_unique UNIQUE (username)
);

-- 创建索引
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at);`}</pre>
          </div>
        </div>
        
        {/* 更多子章节可以继续添加... */}
      </section>
      
      {/* 3. 实体关系模型 */}
      <section id="relationships" className="section">
        <h2 className="section-title">3. 实体关系模型</h2>
        <p>主要实体间的关系如下图所示：</p>
        
        <img src="https://via.placeholder.com/900x500" alt="实体关系图" className="diagram" />
        
        <div className="subsection">
          <h3 className="subsection-title">3.1 核心实体关系描述</h3>
          <ul>
            <li><strong>用户-项目</strong>：一对多关系，一个用户可以拥有多个项目</li>
            <li><strong>项目-成员</strong>：多对多关系，一个项目可以有多个成员，一个用户可以参与多个项目</li>
            <li><strong>项目-模板</strong>：一对多关系，一个项目可以包含多个模板</li>
            <li><strong>模板-变量</strong>：一对多关系，一个模板可以定义多个变量</li>
            <li><strong>模板-版本</strong>：一对多关系，一个模板可以有多个历史版本</li>
            <li><strong>项目-素材</strong>：多对多关系，一个项目可以使用多个素材，一个素材可以被多个项目使用</li>
            <li><strong>素材-标签</strong>：多对多关系，一个素材可以有多个标签，一个标签可以应用于多个素材</li>
          </ul>
        </div>
      </section>
      
      {/* 后续章节内容可以根据需要继续添加 */}
    </DocumentLayout>
  );
}

export default DatabaseDesign; 