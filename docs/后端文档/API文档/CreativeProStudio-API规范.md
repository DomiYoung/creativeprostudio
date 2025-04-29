# CreativePro Studio API 规范文档

*版权归属domiyoung__*

**版本**: 1.0.0  
**日期**: 2025-04-27  
**作者**: 后端架构团队  

## 目录

1. [API概述](#api概述)
2. [API设计原则](#api设计原则)
3. [基础URL结构](#基础url结构)
4. [认证与授权](#认证与授权)
5. [请求与响应规范](#请求与响应规范)
6. [错误处理](#错误处理)
7. [核心API端点](#核心api端点)
8. [版本控制](#版本控制)
9. [API限流策略](#api限流策略)
10. [文档与测试](#文档与测试)

## API概述

CreativePro Studio API是一套RESTful风格的接口，为Z世代女性用户提供创意内容创作与社交分享功能。API设计遵循现代Web标准，支持跨平台访问，并专注于性能优化与用户体验。

### 技术规格

- 基于ASP.NET Core实现RESTful API
- JSON数据格式传输
- OAuth 2.0 + JWT认证机制
- HTTPS加密传输
- 支持跨域访问(CORS)
- GraphQL接口作为REST API的补充
- WebSocket实时通知

## API设计原则

我们的API设计遵循以下核心原则：

1. **简洁明了**：端点命名简短直观，参数设计符合直觉
2. **一致性**：保持命名、参数格式、返回结构的一致性
3. **面向资源**：API围绕核心资源（项目、用户、资源）设计
4. **性能优化**：支持字段筛选、分页、缓存控制
5. **安全至上**：严格的权限控制和输入验证
6. **版权保护**：所有用户生成内容包含版权信息

## 基础URL结构

### API根路径

```
https://api.creativeprostudio.com/v1
```

### 资源路径结构

```
/v1/{resource}/{resourceId}/{subResource}
```

例如：
- `/v1/projects` - 获取所有项目
- `/v1/projects/123` - 获取单个项目
- `/v1/projects/123/resources` - 获取特定项目的资源

### 查询参数

常用查询参数包括：

- `fields`: 指定返回字段集
- `page` & `size`: 分页控制
- `sort`: 排序规则
- `filter`: 过滤条件
- `include`: 包含关联资源

例如：
```
/v1/projects?fields=id,title,thumbnail&sort=-createdAt&page=2&size=20
```

## 认证与授权

### 认证流程

CreativePro Studio采用OAuth 2.0 + JWT的认证机制：

1. **获取令牌**：
   ```
   POST /v1/auth/token
   ```
   请求体：
   ```json
   {
     "grant_type": "password",
     "username": "user@example.com",
     "password": "securepassword"
   }
   ```
   响应：
   ```json
   {
     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "token_type": "Bearer",
     "expires_in": 3600,
     "refresh_token": "def5020094a0e95a..."
   }
   ```

2. **使用令牌**：
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **刷新令牌**：
   ```
   POST /v1/auth/token
   ```
   请求体：
   ```json
   {
     "grant_type": "refresh_token",
     "refresh_token": "def5020094a0e95a..."
   }
   ```

### 授权模型

API使用基于角色(RBAC)和资源的访问控制：

1. **角色**：
   - Guest：未登录用户
   - User：普通用户
   - Creator：内容创作者
   - Admin：管理员

2. **权限**：
   - `read:projects` - 读取项目
   - `create:projects` - 创建项目
   - `update:projects` - 更新项目
   - `delete:projects` - 删除项目
   - 类似结构应用于其他资源

## 请求与响应规范

### 请求格式

1. **HTTP方法**：
   - GET：获取资源
   - POST：创建资源
   - PUT：完全更新资源
   - PATCH：部分更新资源
   - DELETE：删除资源

2. **请求头**：
   ```
   Content-Type: application/json
   Authorization: Bearer {token}
   Accept-Language: zh-CN
   ```

3. **请求体**(POST/PUT/PATCH)：
   ```json
   {
     "title": "我的创意项目",
     "description": "这是一个Z世代风格的创意项目",
     "tags": ["美妆", "创意", "潮流"]
   }
   ```

### 响应格式

1. **成功响应**：
   ```json
   {
     "data": {
       "id": "550e8400-e29b-41d4-a716-446655440000",
       "title": "我的创意项目",
       "description": "这是一个Z世代风格的创意项目",
       "createdAt": "2025-04-01T14:30:45Z",
       "updatedAt": "2025-04-01T14:30:45Z",
       "copyright": "domiyoung__"
     },
     "meta": {
       "requestId": "a7f8d9e3c2b1",
       "timestamp": "2025-04-01T14:30:46Z"
     }
   }
   ```

2. **列表响应**：
   ```json
   {
     "data": [
       {
         "id": "550e8400-e29b-41d4-a716-446655440000",
         "title": "我的创意项目",
         "description": "这是一个Z世代风格的创意项目",
         "copyright": "domiyoung__"
       }
     ],
     "meta": {
       "pagination": {
         "page": 1,
         "size": 10,
         "total": 42,
         "pages": 5
       },
       "requestId": "a7f8d9e3c2b1",
       "timestamp": "2025-04-01T14:30:46Z"
     }
   }
   ```

3. **错误响应**：
   ```json
   {
     "error": {
       "code": "RESOURCE_NOT_FOUND",
       "message": "请求的资源不存在",
       "details": "ID为550e8400的项目不存在或已被删除",
       "requestId": "a7f8d9e3c2b1"
     }
   }
   ```

## 错误处理

### 错误码规范

CreativePro Studio API使用HTTP状态码结合应用级错误码：

1. **HTTP状态码**：
   - 200 OK：请求成功
   - 201 Created：资源创建成功
   - 204 No Content：请求成功但无返回内容
   - 400 Bad Request：请求参数错误
   - 401 Unauthorized：未认证
   - 403 Forbidden：无访问权限
   - 404 Not Found：资源不存在
   - 409 Conflict：资源冲突
   - 422 Unprocessable Entity：业务规则验证失败
   - 429 Too Many Requests：请求频率超限
   - 500 Internal Server Error：服务器内部错误

2. **应用错误码**：
   ```
   {DOMAIN}_{ERROR_TYPE}
   ```
   示例：
   - `AUTH_INVALID_CREDENTIALS`：认证失败
   - `PROJECT_NOT_FOUND`：项目不存在
   - `RESOURCE_UPLOAD_FAILED`：资源上传失败

### 错误响应示例

```json
{
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "项目不存在",
    "details": "ID为550e8400的项目不存在或已被删除",
    "requestId": "a7f8d9e3c2b1",
    "timestamp": "2025-04-01T14:30:46Z",
    "documentation": "https://developer.creativeprostudio.com/errors/PROJECT_NOT_FOUND"
  }
}
```

## 核心API端点

### 用户相关端点

#### 用户注册

```
POST /v1/users
```

请求体：
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "creativez"
}
```

响应：
```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "creativez",
    "email": "user@example.com",
    "createdAt": "2025-04-01T14:30:45Z",
    "copyright": "domiyoung__"
  },
  "meta": {
    "requestId": "a7f8d9e3c2b1",
    "timestamp": "2025-04-01T14:30:46Z"
  }
}
```

#### 用户资料

```
GET /v1/users/{userId}/profile
```

响应：
```json
{
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "displayName": "Z世代创意达人",
    "bio": "热爱美妆与创意的Z世代女孩",
    "avatarUrl": "https://assets.creativeprostudio.com/avatars/550e8400.jpg",
    "socialLinks": {
      "instagram": "https://instagram.com/creativez",
      "tiktok": "https://tiktok.com/@creativez"
    },
    "createdAt": "2025-04-01T14:30:45Z",
    "updatedAt": "2025-04-01T15:30:45Z",
    "copyright": "domiyoung__"
  },
  "meta": {
    "requestId": "a7f8d9e3c2b1",
    "timestamp": "2025-04-01T14:30:46Z"
  }
}
```

### 项目相关端点

#### 创建项目

```
POST /v1/projects
```

请求体：
```json
{
  "title": "渐变霓虹妆容",
  "description": "Z世代流行的渐变霓虹妆容教程",
  "tags": ["妆容", "霓虹", "教程"],
  "visibility": "public"
}
```

响应：
```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "渐变霓虹妆容",
    "description": "Z世代流行的渐变霓虹妆容教程",
    "tags": ["妆容", "霓虹", "教程"],
    "visibility": "public",
    "createdAt": "2025-04-01T14:30:45Z",
    "updatedAt": "2025-04-01T14:30:45Z",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "copyright": "domiyoung__"
  },
  "meta": {
    "requestId": "a7f8d9e3c2b1",
    "timestamp": "2025-04-01T14:30:46Z"
  }
}
```

#### 查询项目列表

```
GET /v1/projects?page=1&size=20&sort=-createdAt&filter=visibility:public
```

响应：
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "渐变霓虹妆容",
      "description": "Z世代流行的渐变霓虹妆容教程",
      "thumbnailUrl": "https://assets.creativeprostudio.com/thumbnails/550e8400.jpg",
      "createdAt": "2025-04-01T14:30:45Z",
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "copyright": "domiyoung__"
    },
    // ... 更多项目
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "size": 20,
      "total": 142,
      "pages": 8
    },
    "requestId": "a7f8d9e3c2b1",
    "timestamp": "2025-04-01T14:30:46Z"
  }
}
```

### 资源相关端点

#### 上传资源

```
POST /v1/resources
```

请求体 (multipart/form-data):
```
projectId: 550e8400-e29b-41d4-a716-446655440000
type: image
file: [二进制文件]
```

响应：
```json
{
  "data": {
    "id": "650e8400-e29b-41d4-a716-446655440000",
    "projectId": "550e8400-e29b-41d4-a716-446655440000",
    "type": "image",
    "url": "https://assets.creativeprostudio.com/images/650e8400.jpg",
    "filename": "makeup_tutorial.jpg",
    "filesize": 2048000,
    "width": 1920,
    "height": 1080,
    "createdAt": "2025-04-01T14:35:45Z",
    "copyright": "domiyoung__"
  },
  "meta": {
    "requestId": "b7f8d9e3c2b1",
    "timestamp": "2025-04-01T14:35:46Z"
  }
}
```

### AI功能相关端点

#### 生成创意内容

```
POST /v1/ai/generate
```

请求体：
```json
{
  "prompt": "创建Z世代风格的渐变霓虹眼妆",
  "style": "modern",
  "dimensions": {
    "width": 1024,
    "height": 1024
  }
}
```

响应：
```json
{
  "data": {
    "id": "750e8400-e29b-41d4-a716-446655440000",
    "prompt": "创建Z世代风格的渐变霓虹眼妆",
    "url": "https://assets.creativeprostudio.com/ai/750e8400.jpg",
    "width": 1024,
    "height": 1024,
    "createdAt": "2025-04-01T14:40:45Z",
    "copyright": "domiyoung__"
  },
  "meta": {
    "requestId": "c7f8d9e3c2b1",
    "timestamp": "2025-04-01T14:40:48Z",
    "processingTime": "3.2s"
  }
}
```

### 社交互动端点

#### 点赞内容

```
POST /v1/likes
```

请求体：
```json
{
  "contentType": "project",
  "contentId": "550e8400-e29b-41d4-a716-446655440000"
}
```

响应：
```json
{
  "data": {
    "id": "850e8400-e29b-41d4-a716-446655440000",
    "contentType": "project",
    "contentId": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "createdAt": "2025-04-01T15:30:45Z"
  },
  "meta": {
    "requestId": "d7f8d9e3c2b1",
    "timestamp": "2025-04-01T15:30:46Z"
  }
}
```

## 版本控制

API版本控制策略如下：

1. **URL路径版本**：
   - `/v1/projects`
   - `/v2/projects`

2. **版本兼容性**：
   - 次要版本保持向后兼容
   - 主要版本可能引入不兼容变更

3. **版本生命周期**：
   - 新版本发布后，旧版本至少维护12个月
   - 弃用通知通过API响应头提前3个月告知

## API限流策略

为保护API服务质量，CreativePro Studio实施以下限流策略：

1. **基础限流**：
   - 匿名用户：60次/分钟
   - 已认证用户：300次/分钟
   - 付费用户：1000次/分钟

2. **特殊端点限流**：
   - AI生成端点：10次/分钟
   - 文件上传端点：30次/小时

3. **限流响应**：
   当达到限制时，API返回429状态码：
   ```json
   {
     "error": {
       "code": "RATE_LIMIT_EXCEEDED",
       "message": "请求频率超过限制",
       "details": "当前限制为300次/分钟，请降低请求频率",
       "requestId": "e7f8d9e3c2b1"
     }
   }
   ```

4. **限流头信息**：
   ```
   X-RateLimit-Limit: 300
   X-RateLimit-Remaining: 42
   X-RateLimit-Reset: 1617293445
   ```

## 文档与测试

### API文档

完整API文档采用OpenAPI 3.0规范，提供以下访问方式：

1. **在线交互式文档**：
   - https://developer.creativeprostudio.com/docs

2. **SwaggerUI本地测试**：
   - https://api.creativeprostudio.com/swagger

3. **OpenAPI规范文件**：
   - https://api.creativeprostudio.com/openapi.json

### API测试工具

推荐使用以下工具进行API测试：

1. **Postman**：
   - 提供完整Postman集合下载
   - 包含环境变量和测试脚本

2. **cURL示例**：
   - 所有端点提供cURL命令示例

3. **沙箱环境**：
   - 提供专用测试环境：https://sandbox-api.creativeprostudio.com

## 安全性考虑

所有API调用需遵循以下安全要求：

1. **传输安全**：
   - 仅支持HTTPS，强制TLS 1.2+
   - HTTP请求自动重定向至HTTPS

2. **内容安全**：
   - 实施内容验证，防止XSS攻击
   - 支持CSP标头，限制资源加载

3. **版权保护**：
   - 所有用户生成内容API响应必须包含`"copyright": "domiyoung__"`标记
   - 所有API文档需包含版权声明

*© domiyoung__* 