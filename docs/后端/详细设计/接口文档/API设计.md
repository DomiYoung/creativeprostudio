# 批量设计处理系统 - API 设计规范

## 1. API 设计总览

批量设计处理系统采用RESTful风格API设计，结合WebSocket实时通信，为前端应用提供完整的数据交互能力。API设计遵循一致性、可预测性和自描述的原则，确保开发体验和系统集成的顺畅。

## 2. API 通用规范

### 2.1 基础URL结构

```
https://{host}/api/v{version}/{resource}[/{resourceId}][/{sub-resource}]
```

- **host**: 服务器地址（如 api.design-batch.example.com）
- **version**: API版本号（如 v1、v2）
- **resource**: 资源名称（如 assets、templates、batches）
- **resourceId**: 资源标识符（可选）
- **sub-resource**: 子资源名称（可选）

### 2.2 HTTP方法使用规范

| HTTP方法 | 用途 | 示例 |
|---------|------|------|
| GET | 获取资源 | `GET /api/v1/templates` |
| POST | 创建资源 | `POST /api/v1/templates` |
| PUT | 完全更新资源 | `PUT /api/v1/templates/1` |
| PATCH | 部分更新资源 | `PATCH /api/v1/templates/1` |
| DELETE | 删除资源 | `DELETE /api/v1/templates/1` |

### 2.3 状态码使用规范

| 状态码 | 含义 | 典型场景 |
|-------|------|---------|
| 200 OK | 请求成功 | GET请求成功返回数据 |
| 201 Created | 资源创建成功 | POST请求成功创建资源 |
| 204 No Content | 操作成功但无返回内容 | DELETE操作成功 |
| 400 Bad Request | 请求参数错误 | 提交的数据未通过验证 |
| 401 Unauthorized | 未认证 | 未提供有效的认证令牌 |
| 403 Forbidden | 权限不足 | 无权访问请求的资源 |
| 404 Not Found | 资源不存在 | 请求的资源不存在 |
| 409 Conflict | 资源冲突 | 尝试创建重复资源 |
| 422 Unprocessable Entity | 实体无法处理 | 数据格式正确但语义错误 |
| 429 Too Many Requests | 请求过于频繁 | 超过API调用限制 |
| 500 Internal Server Error | 服务器内部错误 | 服务器异常情况 |

### 2.4 统一响应格式

所有API返回JSON格式，结构如下：

```json
{
  "success": true,
  "data": {
    // 响应数据内容
  },
  "error": null,
  "meta": {
    "timestamp": "2023-06-15T08:30:45Z",
    "requestId": "req-123456"
    // 可能包含分页信息等
  }
}
```

错误响应格式：

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message description",
    "details": {
      // 错误的详细信息
    }
  },
  "meta": {
    "timestamp": "2023-06-15T08:30:45Z",
    "requestId": "req-123456"
  }
}
```

### 2.5 分页、过滤与排序

#### 分页参数

```
GET /api/v1/assets?page=2&pageSize=20
```

- **page**: 页码，从1开始
- **pageSize**: 每页记录数，默认20，最大100

分页响应元数据：

```json
{
  "meta": {
    "page": 2,
    "pageSize": 20,
    "totalItems": 243,
    "totalPages": 13
  }
}
```

#### 过滤参数

```
GET /api/v1/templates?category=poster&status=active
```

#### 排序参数

```
GET /api/v1/batches?sort=createdAt:desc,name:asc
```

### 2.6 字段选择

支持通过`fields`参数指定返回字段：

```
GET /api/v1/templates/123?fields=id,name,thumbnail,updatedAt
```

### 2.7 API版本控制

版本控制通过URL路径实现：

```
/api/v1/assets
/api/v2/assets
```

主要版本号（v1, v2）用于不兼容变更，次要更新通过响应头部指示。

## 3. 认证与安全

### 3.1 认证方式

系统使用JWT令牌认证：

```
Authorization: Bearer {token}
```

### 3.2 令牌管理

```
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
```

### 3.3 CORS配置

API支持跨域资源共享（CORS），配置合适的源策略。

### 3.4 速率限制

API实施速率限制，通过以下响应头部指示：

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1623760045
```

## 4. 核心资源API

### 4.1 资源库管理 API

#### 获取资源列表

```
GET /api/v1/assets
```

查询参数：
- `category`: 资源分类
- `tags`: 标签（逗号分隔）
- `format`: 资源格式
- `query`: 搜索关键词
- `page`, `pageSize`: 分页参数
- `sort`: 排序参数

响应示例：

```json
{
  "success": true,
  "data": [
    {
      "id": "asset-001",
      "name": "产品图片A",
      "description": "产品正面高清照片",
      "category": "product",
      "format": "image/jpeg",
      "tags": ["产品", "电子产品", "高清"],
      "fileSize": 2048000,
      "dimensions": {
        "width": 1200,
        "height": 800
      },
      "thumbnailUrl": "https://assets.example.com/thumbs/asset-001.jpg",
      "downloadUrl": "https://assets.example.com/files/asset-001.jpg",
      "createdAt": "2023-05-20T14:30:00Z",
      "updatedAt": "2023-05-20T14:30:00Z",
      "createdBy": "user-123"
    },
    // 更多资源...
  ],
  "error": null,
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 156,
    "totalPages": 8
  }
}
```

#### 获取单个资源详情

```
GET /api/v1/assets/{assetId}
```

响应示例：

```json
{
  "success": true,
  "data": {
    "id": "asset-001",
    "name": "产品图片A",
    "description": "产品正面高清照片",
    "category": "product",
    "format": "image/jpeg",
    "tags": ["产品", "电子产品", "高清"],
    "fileSize": 2048000,
    "dimensions": {
      "width": 1200,
      "height": 800
    },
    "thumbnailUrl": "https://assets.example.com/thumbs/asset-001.jpg",
    "downloadUrl": "https://assets.example.com/files/asset-001.jpg",
    "createdAt": "2023-05-20T14:30:00Z",
    "updatedAt": "2023-05-20T14:30:00Z",
    "createdBy": "user-123",
    "metadata": {
      // 资源特定元数据
    },
    "versions": [
      {
        "id": "v1",
        "createdAt": "2023-05-20T14:30:00Z",
        "createdBy": "user-123"
      }
    ]
  },
  "error": null,
  "meta": {
    "timestamp": "2023-06-15T08:30:45Z"
  }
}
```

#### 上传新资源

```
POST /api/v1/assets
```

请求体（使用multipart/form-data格式）：

```
file: [二进制文件数据]
metadata: {
  "name": "产品图片B",
  "description": "产品侧面高清照片",
  "category": "product",
  "tags": ["产品", "电子产品", "高清"]
}
```

响应示例：

```json
{
  "success": true,
  "data": {
    "id": "asset-002",
    "name": "产品图片B",
    "uploadStatus": "processing",
    "uploadUrl": "https://assets.example.com/upload/session-xyz"
  },
  "error": null,
  "meta": {
    "timestamp": "2023-06-15T08:35:12Z"
  }
}
```

#### 更新资源元数据

```
PATCH /api/v1/assets/{assetId}
```

请求体：

```json
{
  "name": "更新后的名称",
  "description": "更新后的描述",
  "tags": ["新标签1", "新标签2"]
}
```

#### 删除资源

```
DELETE /api/v1/assets/{assetId}
```

### 4.2 模板管理 API

#### 获取模板列表

```
GET /api/v1/templates
```

查询参数：
- `category`: 模板分类
- `tags`: 标签（逗号分隔）
- `format`: 输出格式
- `query`: 搜索关键词
- `page`, `pageSize`: 分页参数
- `sort`: 排序参数

响应示例：

```json
{
  "success": true,
  "data": [
    {
      "id": "tmpl-001",
      "name": "产品海报模板A",
      "description": "标准产品展示海报",
      "category": "poster",
      "format": "image/jpeg",
      "tags": ["海报", "产品展示", "电商"],
      "thumbnailUrl": "https://templates.example.com/thumbs/tmpl-001.jpg",
      "previewUrl": "https://templates.example.com/previews/tmpl-001.jpg",
      "variables": [
        {
          "name": "productImage",
          "type": "image",
          "required": true
        },
        {
          "name": "productName",
          "type": "text",
          "required": true,
          "maxLength": 50
        },
        {
          "name": "price",
          "type": "text",
          "required": true
        }
      ],
      "createdAt": "2023-04-10T09:15:00Z",
      "updatedAt": "2023-04-15T11:20:00Z",
      "createdBy": "user-456"
    },
    // 更多模板...
  ],
  "error": null,
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 87,
    "totalPages": 5
  }
}
```

#### 获取单个模板详情

```
GET /api/v1/templates/{templateId}
```

#### 创建新模板

```
POST /api/v1/templates
```

请求体示例：

```json
{
  "name": "新产品展示模板",
  "description": "适用于新品上市的产品展示",
  "category": "product",
  "tags": ["产品", "新品", "展示"],
  "format": "image/jpeg",
  "width": 1200,
  "height": 800,
  "design": {
    // 模板设计数据，包含元素位置、样式等
  },
  "variables": [
    {
      "name": "productImage",
      "type": "image",
      "required": true,
      "description": "产品主图"
    },
    {
      "name": "productName",
      "type": "text",
      "required": true,
      "maxLength": 50,
      "description": "产品名称"
    }
  ]
}
```

#### 更新模板

```
PUT /api/v1/templates/{templateId}
```

#### 删除模板

```
DELETE /api/v1/templates/{templateId}
```

### 4.3 批处理管理 API

#### 获取批处理任务列表

```
GET /api/v1/batches
```

查询参数：
- `status`: 任务状态
- `templateId`: 模板ID
- `createdBy`: 创建者ID
- `dateFrom`, `dateTo`: 创建日期范围
- `page`, `pageSize`: 分页参数
- `sort`: 排序参数

响应示例：

```json
{
  "success": true,
  "data": [
    {
      "id": "batch-001",
      "name": "6月促销海报批处理",
      "description": "6月促销活动全品类海报生成",
      "status": "completed",
      "progress": 100,
      "template": {
        "id": "tmpl-001",
        "name": "产品海报模板A"
      },
      "itemsCount": 120,
      "successCount": 120,
      "failedCount": 0,
      "createdAt": "2023-05-28T10:00:00Z",
      "completedAt": "2023-05-28T10:15:30Z",
      "createdBy": "user-789"
    },
    // 更多批处理任务...
  ],
  "error": null,
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 45,
    "totalPages": 3
  }
}
```

#### 获取批处理任务详情

```
GET /api/v1/batches/{batchId}
```

响应示例：

```json
{
  "success": true,
  "data": {
    "id": "batch-001",
    "name": "6月促销海报批处理",
    "description": "6月促销活动全品类海报生成",
    "status": "completed",
    "progress": 100,
    "template": {
      "id": "tmpl-001",
      "name": "产品海报模板A"
    },
    "itemsCount": 120,
    "successCount": 120,
    "failedCount": 0,
    "createdAt": "2023-05-28T10:00:00Z",
    "startedAt": "2023-05-28T10:00:05Z",
    "completedAt": "2023-05-28T10:15:30Z",
    "createdBy": "user-789",
    "auditStatus": "approved",
    "auditBy": "user-123",
    "auditAt": "2023-05-28T11:00:00Z",
    "settings": {
      "outputFormat": "jpeg",
      "quality": 90,
      "namingPattern": "{productId}-promo"
    }
  },
  "error": null,
  "meta": {
    "timestamp": "2023-06-15T08:45:22Z"
  }
}
```

#### 创建批处理任务

```
POST /api/v1/batches
```

请求体示例：

```json
{
  "name": "7月新品海报批处理",
  "description": "7月新品上市宣传海报",
  "templateId": "tmpl-001",
  "dataSource": {
    "type": "file",
    "fileId": "data-file-001"
  },
  "settings": {
    "outputFormat": "jpeg",
    "quality": 90,
    "namingPattern": "{productId}-newproduct"
  },
  "variableMapping": {
    "productImage": "$.product.imageUrl",
    "productName": "$.product.name",
    "price": "$.product.price"
  }
}
```

#### 获取批处理任务项目列表

```
GET /api/v1/batches/{batchId}/items
```

查询参数：
- `status`: 状态过滤
- `page`, `pageSize`: 分页参数

响应示例：

```json
{
  "success": true,
  "data": [
    {
      "id": "item-00001",
      "batchId": "batch-001",
      "status": "completed",
      "sourceData": {
        "product": {
          "id": "P001",
          "name": "智能手表X1",
          "imageUrl": "https://assets.example.com/files/p001.jpg",
          "price": "¥1299"
        }
      },
      "outputUrl": "https://output.example.com/batch-001/P001-promo.jpg",
      "thumbnailUrl": "https://output.example.com/batch-001/thumbs/P001-promo.jpg",
      "processedAt": "2023-05-28T10:02:15Z"
    },
    // 更多项目...
  ],
  "error": null,
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 120,
    "totalPages": 6
  }
}
```

#### 批处理操作

##### 启动批处理任务

```
POST /api/v1/batches/{batchId}/start
```

##### 暂停批处理任务

```
POST /api/v1/batches/{batchId}/pause
```

##### 取消批处理任务

```
POST /api/v1/batches/{batchId}/cancel
```

##### 导出批处理结果

```
POST /api/v1/batches/{batchId}/export
```

请求体示例：

```json
{
  "format": "zip",
  "includeMetadata": true,
  "itemStatus": ["completed"]
}
```

响应示例：

```json
{
  "success": true,
  "data": {
    "exportId": "export-001",
    "status": "processing",
    "estimatedTimeRemaining": 30,
    "statusCheckUrl": "/api/v1/exports/export-001"
  },
  "error": null,
  "meta": {
    "timestamp": "2023-06-15T08:50:30Z"
  }
}
```

### 4.4 审核管理 API

#### 获取待审核任务列表

```
GET /api/v1/audits
```

查询参数：
- `status`: 审核状态
- `type`: 审核类型
- `assignedTo`: 审核人员ID
- `page`, `pageSize`: 分页参数
- `sort`: 排序参数

响应示例：

```json
{
  "success": true,
  "data": [
    {
      "id": "audit-001",
      "type": "batch",
      "resourceId": "batch-001",
      "resourceName": "6月促销海报批处理",
      "status": "pending",
      "submittedBy": "user-789",
      "submittedAt": "2023-05-28T10:20:00Z",
      "assignedTo": "user-123",
      "dueAt": "2023-05-29T10:20:00Z"
    },
    // 更多审核任务...
  ],
  "error": null,
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 12,
    "totalPages": 1
  }
}
```

#### 获取审核详情

```
GET /api/v1/audits/{auditId}
```

响应示例：

```json
{
  "success": true,
  "data": {
    "id": "audit-001",
    "type": "batch",
    "resourceId": "batch-001",
    "resourceName": "6月促销海报批处理",
    "status": "pending",
    "submittedBy": "user-789",
    "submittedAt": "2023-05-28T10:20:00Z",
    "assignedTo": "user-123",
    "dueAt": "2023-05-29T10:20:00Z",
    "resource": {
      // 相关资源的快照
    },
    "samples": [
      {
        "id": "item-00001",
        "thumbnailUrl": "https://output.example.com/batch-001/thumbs/P001-promo.jpg",
        "outputUrl": "https://output.example.com/batch-001/P001-promo.jpg"
      },
      // 更多样本...
    ],
    "history": [
      {
        "action": "create",
        "timestamp": "2023-05-28T10:20:00Z",
        "user": "user-789"
      },
      {
        "action": "assign",
        "timestamp": "2023-05-28T10:25:00Z",
        "user": "system",
        "details": {
          "assignedTo": "user-123"
        }
      }
    ]
  },
  "error": null,
  "meta": {
    "timestamp": "2023-06-15T08:55:10Z"
  }
}
```

#### 提交审核结果

```
POST /api/v1/audits/{auditId}/review
```

请求体示例：

```json
{
  "decision": "approve",
  "comments": "批处理结果符合要求，准许发布。",
  "feedback": []
}
```

或拒绝时的请求体：

```json
{
  "decision": "reject",
  "comments": "部分图片质量不符合标准，需要调整。",
  "feedback": [
    {
      "itemId": "item-00001",
      "issue": "图片质量太低",
      "suggestion": "使用更高分辨率的产品图片"
    },
    {
      "itemId": "item-00015",
      "issue": "产品名称被裁剪",
      "suggestion": "缩短产品名称或调整文本框大小"
    }
  ]
}
```

#### 分配审核任务

```
POST /api/v1/audits/{auditId}/assign
```

请求体示例：

```json
{
  "assignTo": "user-123",
  "message": "请尽快审核此批次任务"
}
```

### 4.5 数据导入管理 API

#### 创建数据导入任务

```
POST /api/v1/imports
```

请求体（使用multipart/form-data格式）：

```
file: [二进制文件数据]
metadata: {
  "name": "7月产品数据",
  "description": "用于7月海报批处理的产品数据",
  "type": "batch-data",
  "format": "csv"
}
```

#### 获取导入任务状态

```
GET /api/v1/imports/{importId}
```

响应示例：

```json
{
  "success": true,
  "data": {
    "id": "import-001",
    "name": "7月产品数据",
    "status": "completed",
    "progress": 100,
    "format": "csv",
    "rowsCount": 150,
    "successCount": 148,
    "failedCount": 2,
    "createdAt": "2023-06-01T09:00:00Z",
    "completedAt": "2023-06-01T09:02:30Z",
    "issues": [
      {
        "row": 24,
        "issue": "缺少必填字段 'productId'"
      },
      {
        "row": 78,
        "issue": "图片URL无效"
      }
    ],
    "dataFileId": "data-file-001"
  },
  "error": null,
  "meta": {
    "timestamp": "2023-06-15T09:00:15Z"
  }
}
```

## 5. 实时通信 API

系统使用WebSocket提供实时更新功能，连接端点为：

```
wss://{host}/api/v1/websocket
```

### 5.1 认证

WebSocket连接需要包含认证令牌：

```
wss://{host}/api/v1/websocket?token={jwt-token}
```

### 5.2 消息格式

所有WebSocket消息采用JSON格式：

```json
{
  "type": "event-type",
  "data": {
    // 事件相关数据
  },
  "timestamp": "2023-06-15T09:05:22Z"
}
```

### 5.3 主要事件类型

| 事件类型 | 说明 | 数据示例 |
|---------|------|---------|
| batch.progress | 批处理进度更新 | `{"batchId": "batch-001", "progress": 45, "status": "processing"}` |
| batch.completed | 批处理完成 | `{"batchId": "batch-001", "itemsCount": 120, "successCount": 118}` |
| audit.assigned | 审核任务分配 | `{"auditId": "audit-001", "assignedTo": "user-123"}` |
| audit.updated | 审核状态更新 | `{"auditId": "audit-001", "status": "approved"}` |
| notification | 系统通知 | `{"message": "您有新的审核任务", "level": "info"}` |

### 5.4 客户端订阅

连接后，客户端可以发送订阅消息：

```json
{
  "action": "subscribe",
  "channels": ["batch.progress", "audit.assigned"]
}
```

## 6. API 使用示例

### 6.1 创建并运行批处理任务

```javascript
// 1. 上传数据文件
const dataFileResponse = await fetch('/api/v1/imports', {
  method: 'POST',
  body: formData // 包含CSV文件和元数据
});
const dataFile = await dataFileResponse.json();

// 2. 创建批处理任务
const batchResponse = await fetch('/api/v1/batches', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: "7月新品海报批处理",
    templateId: "tmpl-001",
    dataSource: {
      type: "file",
      fileId: dataFile.data.dataFileId
    },
    variableMapping: {
      productImage: "$.product.imageUrl",
      productName: "$.product.name",
      price: "$.product.price"
    }
  })
});
const batch = await batchResponse.json();

// 3. 启动批处理任务
await fetch(`/api/v1/batches/${batch.data.id}/start`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// 4. 使用WebSocket监听进度
const ws = new WebSocket(`wss://api.example.com/api/v1/websocket?token=${token}`);
ws.onopen = () => {
  ws.send(JSON.stringify({
    action: 'subscribe',
    channels: [`batch.progress.${batch.data.id}`]
  }));
};
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.type === 'batch.progress') {
    updateProgressUI(message.data.progress);
  } else if (message.type === 'batch.completed') {
    showCompletionUI(message.data);
  }
};
```

### 6.2 审核流程示例

```javascript
// 1. 获取待审核任务
const auditsResponse = await fetch('/api/v1/audits?status=pending&assignedTo=me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const audits = await auditsResponse.json();

// 2. 获取审核详情
const auditId = audits.data[0].id;
const auditDetailResponse = await fetch(`/api/v1/audits/${auditId}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const auditDetail = await auditDetailResponse.json();

// 3. 提交审核结果
await fetch(`/api/v1/audits/${auditId}/review`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    decision: "approve",
    comments: "批处理结果符合要求，准许发布。"
  })
});
```

## 7. API 文档与工具

完整的API文档通过Swagger UI提供，访问地址：

```
https://{host}/swagger
```

开发者可以使用以下资源辅助API开发与测试：

1. **Postman集合**: 提供完整的API请求示例
2. **API SDK**: 提供.NET和JavaScript客户端库
3. **WebSocket客户端示例**: 提供实时通信示例代码

---

**注意**: 本文档描述了系统的API设计规范和主要端点，具体实现可能随系统迭代而调整。请参考最新的Swagger文档获取当前API的精确定义。 