# API接口设计规范

本文档规定了CreativePro Studio项目中RESTful API的设计标准与最佳实践，确保后端API接口的一致性、可维护性和易用性。

## 1. API设计原则

### 1.1 RESTful设计风格

- 使用HTTP方法表达操作语义
  - GET：获取资源
  - POST：创建资源
  - PUT：更新资源（完全替换）
  - PATCH：部分更新资源
  - DELETE：删除资源

- 以资源为中心设计API
  - 使用名词复数形式表示资源集合
  - 使用ID标识特定资源

### 1.2 一致性原则

- 所有API遵循统一命名约定
- 错误处理方式一致
- 分页、排序、过滤参数格式统一
- 数据返回格式标准化

### 1.3 安全性原则

- 所有API通过HTTPS传输
- 实现适当的鉴权与授权机制
- 防范常见安全漏洞（SQL注入、XSS等）
- 敏感数据加密传输

### 1.4 版本化原则

- API使用明确的版本标识
- 支持多版本共存
- 版本更新遵循语义化版本控制

## 2. URL设计规范

### 2.1 基本格式

```
https://api.creativeprostudio.domiyoung.com/v1/resources/{resourceId}
```

- 使用HTTPS协议
- 独立API域名
- 包含API版本号
- 使用小写单词，以连字符(-)分隔
- 避免使用文件扩展名(.json/.xml)

### 2.2 资源命名

- 使用复数名词表示资源集合：`/projects`, `/users`
- 使用层级结构表示资源关系：`/projects/{projectId}/assets`
- 行为或操作使用特定端点：`/auth/login`, `/projects/{projectId}/export`

### 2.3 查询参数

- 分页：`?page=2&per_page=20`
- 排序：`?sort=created_at&order=desc`
- 过滤：`?status=published&category=design`
- 字段选择：`?fields=id,name,created_at`
- 搜索：`?search=keyword`

## 3. 请求与响应规范

### 3.1 请求头

- `Content-Type`: 指定请求体格式，一般为`application/json`
- `Authorization`: 身份验证信息，如`Bearer {token}`
- `Accept`: 指定客户端接受的响应格式
- `Accept-Language`: 指定语言首选项
- `X-Request-ID`: 请求唯一标识，便于追踪

### 3.2 请求体格式

使用JSON格式：

```json
{
  "name": "创意画布项目",
  "description": "Z世代品牌视觉设计",
  "settings": {
    "canvas_size": {
      "width": 1920,
      "height": 1080
    },
    "theme": "dark"
  },
  "tags": ["设计", "品牌", "Z世代"]
}
```

### 3.3 响应状态码

- 2xx：成功
  - 200 OK：请求成功
  - 201 Created：资源创建成功
  - 204 No Content：请求成功但无返回内容

- 4xx：客户端错误
  - 400 Bad Request：请求参数错误
  - 401 Unauthorized：未认证
  - 403 Forbidden：无权限
  - 404 Not Found：资源不存在
  - 422 Unprocessable Entity：请求格式正确但语义错误

- 5xx：服务器错误
  - 500 Internal Server Error：服务器内部错误
  - 503 Service Unavailable：服务不可用

### 3.4 响应体格式

标准成功响应：

```json
{
  "status": "success",
  "data": {
    "id": "proj_12345",
    "name": "创意画布项目",
    "created_at": "2023-10-25T08:15:30Z",
    "updated_at": "2023-10-25T10:20:15Z",
    "description": "Z世代品牌视觉设计"
  },
  "meta": {
    "copyright": "domiyoung__"
  }
}
```

错误响应格式：

```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "项目名称不能为空",
  "details": [
    {
      "field": "name",
      "error": "required",
      "message": "名称字段是必填项"
    }
  ],
  "meta": {
    "copyright": "domiyoung__"
  }
}
```

分页响应格式：

```json
{
  "status": "success",
  "data": [
    {
      "id": "proj_12345",
      "name": "创意画布项目"
    },
    {
      "id": "proj_12346",
      "name": "品牌推广方案"
    }
  ],
  "pagination": {
    "total_items": 42,
    "total_pages": 3,
    "current_page": 2,
    "per_page": 20
  },
  "meta": {
    "copyright": "domiyoung__"
  }
}
```

## 4. 认证与授权

### 4.1 认证方式

- OAuth 2.0 + JWT认证
- API密钥（非用户资源）
- 会话Cookie（仅网页端）

### 4.2 JWT格式

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

JWT Payload结构：

```json
{
  "sub": "user_12345",
  "name": "张三",
  "role": "designer",
  "permissions": ["read:projects", "write:projects"],
  "exp": 1697979210,
  "iat": 1697892810,
  "iss": "creativeprostudio"
}
```

### 4.3 权限控制

- 基于角色(RBAC)的权限控制
- 基于资源的访问控制
- 细粒度操作权限：`read:projects`, `write:assets`

## 5. 错误处理

### 5.1 错误码设计

使用具有描述性的错误码：

- `VALIDATION_ERROR`: 请求参数验证失败
- `RESOURCE_NOT_FOUND`: 请求的资源不存在
- `PERMISSION_DENIED`: 权限不足
- `RATE_LIMIT_EXCEEDED`: 超出API调用限制
- `SERVICE_UNAVAILABLE`: 服务暂时不可用

### 5.2 错误消息规范

- 错误消息应简明扼要
- 使用用户友好的语言
- 提供明确的问题描述
- 可能时提供解决方案

## 6. 性能与缓存

### 6.1 缓存策略

使用HTTP缓存头：

- `Cache-Control`: 控制缓存行为
- `ETag`: 资源版本标识
- `Last-Modified`: 资源最后修改时间

示例：

```
Cache-Control: max-age=3600, must-revalidate
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Last-Modified: Wed, 25 Oct 2023 10:20:15 GMT
```

### 6.2 条件请求

客户端可使用条件请求头：

- `If-None-Match`: 与ETag匹配检查
- `If-Modified-Since`: 检查资源是否已修改

## 7. API文档规范

### 7.1 OpenAPI规范

使用OpenAPI 3.0规范编写API文档：

```yaml
openapi: 3.0.0
info:
  title: CreativePro Studio API
  version: 1.0.0
  description: 面向Z世代的创意设计工具API
paths:
  /projects:
    get:
      summary: 获取项目列表
      parameters:
        - name: page
          in: query
          schema:
            type: integer
        - name: per_page
          in: query
          schema:
            type: integer
      responses:
        '200':
          description: 成功返回项目列表
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProjectList'
```

### 7.2 API文档必备内容

- 端点描述与URL
- 请求方法
- 请求参数说明
- 请求体示例
- 响应体示例
- 可能的错误响应
- 权限要求

## 8. 版本控制

### 8.1 版本号位置

- URL路径版本：`/v1/projects`（推荐）
- 请求头版本：`Accept: application/vnd.creativepro.v1+json`
- 查询参数版本：`/projects?version=1`

### 8.2 版本升级策略

- 非破坏性更新：同一版本号内添加字段，不影响现有客户端
- 破坏性更新：创建新版本号，保持旧版本一段时间
- 明确的API废弃政策与时间表

## 9. 安全最佳实践

### 9.1 输入验证

- 所有用户输入严格验证
- 使用白名单验证方式
- 防止SQL注入、XSS、CSRF等攻击

### 9.2 限流保护

- 基于IP或API密钥的速率限制
- 使用响应头指示限制状态：
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 75
  X-RateLimit-Reset: 1697979210
  ```

### 9.3 敏感数据处理

- 传输中加密（HTTPS）
- 不返回敏感信息（密码、完整信用卡等）
- 身份验证信息仅加密传输

## 10. API端点示例

### 10.1 用户认证

**登录**

```
POST /auth/login
```

请求体：
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

响应体：
```json
{
  "status": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600
  },
  "meta": {
    "copyright": "domiyoung__"
  }
}
```

### 10.2 项目管理

**创建项目**

```
POST /projects
```

请求体：
```json
{
  "name": "Z世代品牌形象设计",
  "description": "为年轻品牌打造吸引Z世代的视觉设计",
  "template_id": "tpl_basic_branding",
  "settings": {
    "color_theme": "vibrant",
    "brand_colors": ["#FF5A5F", "#00A699"]
  }
}
```

响应体：
```json
{
  "status": "success",
  "data": {
    "id": "proj_12345",
    "name": "Z世代品牌形象设计",
    "description": "为年轻品牌打造吸引Z世代的视觉设计",
    "created_at": "2023-10-25T08:15:30Z",
    "created_by": {
      "id": "user_5678",
      "name": "张三"
    },
    "template_id": "tpl_basic_branding",
    "settings": {
      "color_theme": "vibrant",
      "brand_colors": ["#FF5A5F", "#00A699"]
    },
    "status": "draft"
  },
  "meta": {
    "copyright": "domiyoung__"
  }
}
```

**获取项目资产**

```
GET /projects/{projectId}/assets?type=image&page=1&per_page=20
```

响应体：
```json
{
  "status": "success",
  "data": [
    {
      "id": "asset_1",
      "name": "品牌Logo.png",
      "type": "image",
      "url": "https://assets.creativeprostudio.domiyoung.com/projects/proj_12345/logo.png",
      "created_at": "2023-10-25T09:10:30Z",
      "size": 24500,
      "dimensions": {
        "width": 512,
        "height": 512
      },
      "tags": ["logo", "品牌"]
    },
    {
      "id": "asset_2",
      "name": "社交媒体Banner.jpg",
      "type": "image",
      "url": "https://assets.creativeprostudio.domiyoung.com/projects/proj_12345/banner.jpg",
      "created_at": "2023-10-25T09:15:45Z",
      "size": 156000,
      "dimensions": {
        "width": 1200,
        "height": 630
      },
      "tags": ["社交媒体", "banner"]
    }
  ],
  "pagination": {
    "total_items": 24,
    "total_pages": 2,
    "current_page": 1,
    "per_page": 20
  },
  "meta": {
    "copyright": "domiyoung__"
  }
}
```

## 11. 监控与日志

### 11.1 日志记录

- 记录所有API请求与响应
- 包含时间戳、请求ID、用户ID、IP地址
- 敏感数据脱敏处理
- 性能指标记录（响应时间等）

### 11.2 监控指标

- 接口调用量与成功率
- 响应时间分布
- 错误率与类型分布
- 服务可用性

## 12. 客户端SDK

提供多语言SDK，简化API调用：

- JavaScript（浏览器与Node.js）
- .NET
- Python
- Swift/Objective-C（iOS）
- Kotlin/Java（Android）

SDK应包含:
- 认证处理
- 请求重试逻辑
- 错误处理
- 类型化接口

[返回系统架构](README.md) 