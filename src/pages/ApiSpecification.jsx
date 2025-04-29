import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, faUser, faCodeBranch, faGlobe, 
  faLock, faServer, faExchangeAlt, faCodeBranch as faVersionControl 
} from '@fortawesome/free-solid-svg-icons';
import DocumentLayout from '../components/DocumentLayout';
import '../styles/DocumentPage.css';

const ApiSpecification = () => {
  // 准备元数据组件
  const metadataContent = (
    <>
      <div className="metadata-item">
        <FontAwesomeIcon icon={faCalendarAlt} />
        <span>最后更新：2025-05-10</span>
      </div>
      <div className="metadata-item">
        <FontAwesomeIcon icon={faUser} />
        <span>作者：后端API团队</span>
      </div>
      <div className="metadata-item">
        <FontAwesomeIcon icon={faCodeBranch} />
        <span>版本：2.3.1</span>
      </div>
      <div className="metadata-item">
        <FontAwesomeIcon icon={faGlobe} />
        <span>状态：已发布</span>
      </div>
    </>
  );

  return (
    <DocumentLayout 
      title="API规范" 
      subtitle="CreativePro Studio REST API设计规范与接口文档" 
      metadata={metadataContent}
    >
      <nav className="toc">
        <h2 className="toc-title">目录</h2>
        <ul className="toc-list">
          <li className="toc-item">
            <a href="#overview" className="toc-link">
              <FontAwesomeIcon icon={faGlobe} />
              <span>1. API架构概述</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#authentication" className="toc-link">
              <FontAwesomeIcon icon={faLock} />
              <span>2. 认证与授权</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#conventions" className="toc-link">
              <FontAwesomeIcon icon={faExchangeAlt} />
              <span>3. API命名规范</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#endpoints" className="toc-link">
              <FontAwesomeIcon icon={faServer} />
              <span>4. 核心接口定义</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#errors" className="toc-link">
              <FontAwesomeIcon icon={faLock} />
              <span>5. 错误处理</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#versioning" className="toc-link">
              <FontAwesomeIcon icon={faVersionControl} />
              <span>6. API版本策略</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <section id="overview" className="section">
        <h2 className="section-title">1. API架构概述</h2>
        <p>CreativePro Studio API采用RESTful架构风格，以JSON作为数据交换格式，基于HTTPS协议提供安全的服务访问。</p>
        
        <div className="subsection">
          <h3 className="subsection-title">1.1 基础URL</h3>
          <div className="code-block">
            <pre>{`https://api.creativeprostudio.com/v2/`}</pre>
          </div>
          <p>所有API请求都应该使用HTTPS协议发送至上述基础URL加上具体的资源路径。</p>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">1.2 API架构设计原则</h3>
          <ul>
            <li><strong>资源导向</strong>：API围绕资源设计，而非操作</li>
            <li><strong>HTTP方法语义</strong>：严格遵循HTTP方法语义（GET、POST、PUT、DELETE等）</li>
            <li><strong>无状态</strong>：服务器不存储客户端状态，每个请求包含所有必要信息</li>
            <li><strong>缓存支持</strong>：合理利用HTTP缓存机制提升性能</li>
            <li><strong>分层系统</strong>：客户端无需了解后端实现细节</li>
            <li><strong>统一接口</strong>：统一的资源标识、资源表示和自描述消息</li>
          </ul>
        </div>
        
        <div className="note">
          <div className="note-title">
            <span>接口风格说明</span>
          </div>
          <p>本API设计遵循"宽进严出"原则，对客户端请求格式要求相对宽松，但服务端响应格式严格标准化，确保一致性和可预测性。</p>
        </div>
      </section>
      
      <section id="authentication" className="section">
        <h2 className="section-title">2. 认证与授权</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">2.1 认证方式</h3>
          <p>CreativePro Studio API支持以下认证方式：</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>认证类型</th>
                  <th>使用场景</th>
                  <th>有效期</th>
                  <th>实现方式</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>JWT令牌</td>
                  <td>用户会话认证</td>
                  <td>1小时</td>
                  <td>Bearer Token认证头</td>
                </tr>
                <tr>
                  <td>刷新令牌</td>
                  <td>无感刷新访问令牌</td>
                  <td>30天</td>
                  <td>HTTP-only Cookie</td>
                </tr>
                <tr>
                  <td>API密钥</td>
                  <td>服务间通信</td>
                  <td>长期有效</td>
                  <td>自定义请求头</td>
                </tr>
                <tr>
                  <td>OAuth 2.0</td>
                  <td>第三方应用授权</td>
                  <td>基于授权类型</td>
                  <td>标准OAuth流程</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">2.2 授权请求示例</h3>
          <p>使用Bearer令牌进行API认证：</p>
          
          <div className="code-block">
            <pre>{`curl -X GET \\
  https://api.creativeprostudio.com/v2/projects \\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \\
  -H 'Content-Type: application/json'`}</pre>
          </div>
        </div>
      </section>
      
      <section id="conventions" className="section">
        <h2 className="section-title">3. API命名规范</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">3.1 URI命名规则</h3>
          <ul>
            <li>使用名词复数形式表示资源集合：<code>/projects</code>, <code>/users</code>, <code>/templates</code></li>
            <li>使用资源ID标识特定资源：<code>/projects/{'{project_id}'}</code></li>
            <li>使用嵌套路径表示资源关系：<code>/projects/{'{project_id}'}/members</code></li>
            <li>操作通过HTTP方法表达，而非URL路径</li>
            <li>查询参数用于过滤、排序和分页：<code>/projects?status=active&sort=created_at</code></li>
            <li>避免使用动词，除非表示特殊操作：<code>/auth/login</code>, <code>/projects/{'{project_id}'}/export</code></li>
          </ul>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">3.2 HTTP方法使用规范</h3>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>HTTP方法</th>
                  <th>使用场景</th>
                  <th>是否幂等</th>
                  <th>示例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GET</td>
                  <td>获取资源</td>
                  <td>是</td>
                  <td><code>GET /projects</code> - 获取项目列表</td>
                </tr>
                <tr>
                  <td>POST</td>
                  <td>创建资源</td>
                  <td>否</td>
                  <td><code>POST /projects</code> - 创建新项目</td>
                </tr>
                <tr>
                  <td>PUT</td>
                  <td>全量更新资源</td>
                  <td>是</td>
                  <td><code>PUT /projects/123</code> - 更新整个项目</td>
                </tr>
                <tr>
                  <td>PATCH</td>
                  <td>部分更新资源</td>
                  <td>否</td>
                  <td><code>PATCH /projects/123</code> - 更新项目部分字段</td>
                </tr>
                <tr>
                  <td>DELETE</td>
                  <td>删除资源</td>
                  <td>是</td>
                  <td><code>DELETE /projects/123</code> - 删除项目</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <section id="endpoints" className="section">
        <h2 className="section-title">4. 核心接口定义</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">4.1 资源概览</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>资源</th>
                  <th>基础路径</th>
                  <th>描述</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>项目</td>
                  <td><code>/projects</code></td>
                  <td>管理创意项目、版本和元数据</td>
                </tr>
                <tr>
                  <td>资源</td>
                  <td><code>/assets</code></td>
                  <td>管理素材、模板和媒体文件</td>
                </tr>
                <tr>
                  <td>用户</td>
                  <td><code>/users</code></td>
                  <td>用户信息、偏好设置和权限</td>
                </tr>
                <tr>
                  <td>团队</td>
                  <td><code>/teams</code></td>
                  <td>团队成员、角色和协作设置</td>
                </tr>
                <tr>
                  <td>工作流</td>
                  <td><code>/workflows</code></td>
                  <td>自动化工作流和任务管理</td>
                </tr>
                <tr>
                  <td>分析</td>
                  <td><code>/analytics</code></td>
                  <td>使用数据和性能指标</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">4.2 项目 API</h3>
          <p>项目 API 允许创建、管理和组织创意项目。</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>端点</th>
                  <th>方法</th>
                  <th>描述</th>
                  <th>所需权限</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>/projects</code></td>
                  <td>GET</td>
                  <td>获取项目列表</td>
                  <td>projects:read</td>
                </tr>
                <tr>
                  <td><code>/projects</code></td>
                  <td>POST</td>
                  <td>创建新项目</td>
                  <td>projects:write</td>
                </tr>
                <tr>
                  <td><code>/projects/{id}</code></td>
                  <td>GET</td>
                  <td>获取项目详情</td>
                  <td>projects:read</td>
                </tr>
                <tr>
                  <td><code>/projects/{id}</code></td>
                  <td>PUT</td>
                  <td>更新项目</td>
                  <td>projects:write</td>
                </tr>
                <tr>
                  <td><code>/projects/{id}</code></td>
                  <td>DELETE</td>
                  <td>删除项目</td>
                  <td>projects:delete</td>
                </tr>
                <tr>
                  <td><code>/projects/{id}/members</code></td>
                  <td>GET</td>
                  <td>获取项目成员</td>
                  <td>projects:read</td>
                </tr>
                <tr>
                  <td><code>/projects/{id}/versions</code></td>
                  <td>GET</td>
                  <td>获取项目版本历史</td>
                  <td>projects:read</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p>示例响应：</p>
          <div className="code-block">
            <pre>
{`// GET /projects/123
{
  "id": "proj_123456",
  "name": "夏季营销活动",
  "description": "2025年夏季产品线推广活动素材",
  "created_at": "2025-03-15T08:30:00Z",
  "updated_at": "2025-04-10T14:22:33Z",
  "owner": {
    "id": "user_789",
    "name": "张明",
    "email": "zhang.ming@example.com"
  },
  "status": "active",
  "type": "campaign",
  "tags": ["夏季", "营销", "产品发布"],
  "metadata": {
    "client": "内部",
    "deadline": "2025-06-01",
    "priority": "高"
  },
  "stats": {
    "assets_count": 47,
    "members_count": 8,
    "comments_count": 152
  },
  "permissions": ["read", "write", "share"],
  "_links": {
    "self": "/v2/projects/proj_123456",
    "assets": "/v2/projects/proj_123456/assets",
    "members": "/v2/projects/proj_123456/members",
    "versions": "/v2/projects/proj_123456/versions"
  }
}`}
            </pre>
          </div>
        </div>
      </section>
      
      <section id="errors" className="section">
        <h2 className="section-title">5. 错误处理</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">5.1 错误响应格式</h3>
          <p>API 响应遵循以下约定：</p>
          <ul>
            <li>使用一致的 JSON 格式</li>
            <li>字段命名使用 camelCase</li>
            <li>时间戳使用 ISO 8601 格式</li>
            <li>集合资源包含分页元数据</li>
            <li>使用标准 HTTP 状态码表示请求结果</li>
            <li>错误响应包含错误代码和详细信息</li>
          </ul>
          
          <p>成功响应示例（集合）：</p>
          <div className="code-block">
            <pre>
{`// GET /v2/projects
{
  "data": [
    {
      "id": "proj_123456",
      "name": "夏季营销活动",
      // 其他字段...
    },
    {
      "id": "proj_123457",
      "name": "产品手册设计",
      // 其他字段...
    }
  ],
  "pagination": {
    "page": 2,
    "pageSize": 25,
    "totalItems": 183,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": true
  },
  "meta": {
    "requestId": "req_abcdef123456",
    "timestamp": "2025-04-28T12:34:56Z"
  }
}`}
            </pre>
          </div>
          
          <p>错误响应示例：</p>
          <div className="code-block">
            <pre>
{`// 400 Bad Request
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数验证失败",
    "details": [
      {
        "field": "name",
        "message": "项目名称是必填字段"
      },
      {
        "field": "metadata.deadline",
        "message": "截止日期必须是未来的日期"
      }
    ],
    "requestId": "req_abcdef123456",
    "timestamp": "2025-04-28T12:34:56Z"
  }
}`}
            </pre>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">5.2 HTTP 状态码</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>状态码范围</th>
                  <th>描述</th>
                  <th>常见情况</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2xx</td>
                  <td>成功</td>
                  <td>
                    <ul>
                      <li>200 OK：请求成功</li>
                      <li>201 Created：资源创建成功</li>
                      <li>204 No Content：成功处理但无返回内容</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>4xx</td>
                  <td>客户端错误</td>
                  <td>
                    <ul>
                      <li>400 Bad Request：请求格式错误</li>
                      <li>401 Unauthorized：认证失败</li>
                      <li>403 Forbidden：权限不足</li>
                      <li>404 Not Found：资源不存在</li>
                      <li>429 Too Many Requests：请求频率超限</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>5xx</td>
                  <td>服务器错误</td>
                  <td>
                    <ul>
                      <li>500 Internal Server Error：服务器内部错误</li>
                      <li>503 Service Unavailable：服务暂时不可用</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <section id="versioning" className="section">
        <h2 className="section-title">6. API版本策略</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">6.1 版本控制策略</h3>
          <p>CreativePro Studio API 使用以下版本控制策略确保 API 的平滑演进和向后兼容性：</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>版本类型</th>
                  <th>描述</th>
                  <th>示例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>主版本</td>
                  <td>URL 路径中包含主版本号，用于不兼容的API变更</td>
                  <td>/v2/projects</td>
                </tr>
                <tr>
                  <td>次版本</td>
                  <td>通过请求头指定，用于向后兼容的功能添加</td>
                  <td>X-API-Version: 2.3</td>
                </tr>
                <tr>
                  <td>日期版本</td>
                  <td>通过请求头指定特定日期的 API 行为</td>
                  <td>X-API-Date-Version: 2025-03-01</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">6.2 版本生命周期</h3>
          <ul>
            <li>每个主版本至少支持 24 个月</li>
            <li>弃用通知提前至少 6 个月发布</li>
            <li>紧急安全修复可能不遵循标准发布周期</li>
            <li>API 变更日志在开发者门户发布</li>
          </ul>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">6.3 版本迁移最佳实践</h3>
          <ol>
            <li>订阅 API 更新通知获取变更预告</li>
            <li>定期检查开发者门户获取新功能和弃用信息</li>
            <li>在非生产环境测试新 API 版本</li>
            <li>利用 API 沙箱环境测试集成</li>
            <li>为 API 客户端代码实施版本检查</li>
          </ol>
        </div>
      </section>
    </DocumentLayout>
  );
};

export default ApiSpecification; 