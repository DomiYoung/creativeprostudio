// 批量处理中心相关数据

// 批量处理项目状态
export const batchStatus = [
  { id: 'all', name: '全部状态' },
  { id: 'pending', name: '待处理', color: '#FFB800' },
  { id: 'processing', name: '处理中', color: '#1E88E5' },
  { id: 'completed', name: '已完成', color: '#4CAF50' },
  { id: 'failed', name: '处理失败', color: '#FF5252' },
  { id: 'paused', name: '已暂停', color: '#757575' }
];

// 批量处理类型
export const batchTypes = [
  { id: 'image', name: '图片处理', icon: 'fa-image' },
  { id: 'export', name: '批量导出', icon: 'fa-file-export' },
  { id: 'dataFill', name: '数据填充', icon: 'fa-table' },
  { id: 'template', name: '模板应用', icon: 'fa-object-group' }
];

// 批量处理项目数据
export const batchProjects = [
  {
    id: 1,
    name: '六月促销海报生成',
    description: '6月电商大促海报批量生成',
    status: 'completed',
    progress: 100,
    type: 'template',
    templateId: 2,
    templateName: '限时促销模板',
    itemCount: 42,
    successCount: 42,
    failedCount: 0,
    createdAt: '2025-04-15T10:30:00',
    completedAt: '2025-04-15T10:45:30',
    createdBy: 'user1',
    thumbnail: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bookmarked: true
  },
  {
    id: 2,
    name: '新品上市宣传图',
    description: '夏季新品上市宣传图批量创建',
    status: 'processing',
    progress: 65,
    type: 'template',
    templateId: 4,
    templateName: '新品发布海报',
    itemCount: 38,
    successCount: 25,
    failedCount: 0,
    createdAt: '2025-04-20T14:20:00',
    createdBy: 'user2',
    thumbnail: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bookmarked: false
  },
  {
    id: 3,
    name: '产品详情页更新',
    description: '美妆产品详情页图片批量更新',
    status: 'pending',
    progress: 0,
    type: 'dataFill',
    templateId: 1,
    templateName: '产品详情展示',
    itemCount: 56,
    successCount: 0,
    failedCount: 0,
    createdAt: '2025-04-22T09:15:00',
    createdBy: 'user1',
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bookmarked: false
  },
  {
    id: 4,
    name: '社交媒体内容计划',
    description: '每周社交媒体图文生成',
    status: 'failed',
    progress: 85,
    type: 'template',
    templateId: 5,
    templateName: '社交媒体每日一图',
    itemCount: 28,
    successCount: 24,
    failedCount: 4,
    createdAt: '2025-04-18T16:45:00',
    completedAt: '2025-04-18T17:15:22',
    createdBy: 'user3',
    thumbnail: 'https://images.unsplash.com/photo-1596203721435-99e8fbdd8184?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bookmarked: true
  },
  {
    id: 5,
    name: '节日限定包装设计',
    description: '端午节限定产品包装设计批量生成',
    status: 'paused',
    progress: 42,
    type: 'template',
    templateId: 7,
    templateName: '节日特别版包装',
    itemCount: 12,
    successCount: 5,
    failedCount: 0,
    createdAt: '2025-04-25T11:30:00',
    createdBy: 'user2',
    thumbnail: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bookmarked: false
  },
  {
    id: 6,
    name: '口红色号展示图',
    description: '新季口红色号展示图批量生成',
    status: 'completed',
    progress: 100,
    type: 'dataFill',
    templateId: 6,
    templateName: '口红色号展示',
    itemCount: 18,
    successCount: 18,
    failedCount: 0,
    createdAt: '2025-04-10T13:20:00',
    completedAt: '2025-04-10T13:35:45',
    createdBy: 'user1',
    thumbnail: 'https://images.unsplash.com/photo-1599733589046-d8a6257e4737?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bookmarked: true
  },
  {
    id: 7,
    name: '香水产品详情页',
    description: '夏季香水系列详情页批量生成',
    status: 'completed',
    progress: 100,
    type: 'template',
    templateId: 8,
    templateName: '香水产品展示',
    itemCount: 8,
    successCount: 8,
    failedCount: 0,
    createdAt: '2025-04-05T15:10:00',
    completedAt: '2025-04-05T15:20:12',
    createdBy: 'user3',
    thumbnail: 'https://images.unsplash.com/photo-1606473164420-8f900bbb5f4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bookmarked: false
  },
  {
    id: 8,
    name: '护肤成分宣传',
    description: '护肤品成分功效解析图批量生成',
    status: 'processing',
    progress: 25,
    type: 'dataFill',
    templateId: 10,
    templateName: '护肤成分解析',
    itemCount: 24,
    successCount: 6,
    failedCount: 0,
    createdAt: '2025-04-28T09:30:00',
    createdBy: 'user2',
    thumbnail: 'https://images.unsplash.com/photo-1616395405352-a13937bf000e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bookmarked: false
  }
];

// 批量任务版本历史
export const batchVersionHistory = {
  "1": [
    {
      id: "v1.3",
      timestamp: "2025-04-15T14:30:00",
      status: "exported",
      statusText: "已导出",
      isCurrent: true,
      changes: [
        { type: "导出时间", value: "2025-04-15 14:30" },
        { type: "导出格式", value: "JPG" },
        { type: "图片质量", value: "90%" },
        { type: "图片数量", value: "42" }
      ],
      changedFiles: [
        { name: "product_01.jpg", status: "unchanged" },
        { name: "product_02.jpg", status: "unchanged" },
        { name: "product_03.jpg", status: "unchanged" }
      ]
    },
    {
      id: "v1.2",
      timestamp: "2025-04-14T16:45:00",
      status: "modified",
      statusText: "已修改",
      isCurrent: false,
      changes: [
        { type: "修改人", value: "设计团队" },
        { type: "修改内容", value: "调整图片尺寸和质量参数" },
        { type: "图片数量", value: "42" }
      ],
      changedFiles: [
        { name: "product_01.jpg", status: "changed", details: "尺寸调整为1920x1080" },
        { name: "product_02.jpg", status: "changed", details: "质量提升至90%" },
        { name: "product_03.jpg", status: "unchanged" }
      ]
    },
    {
      id: "v1.1", 
      timestamp: "2025-04-13T10:15:00",
      status: "modified",
      statusText: "已修改",
      isCurrent: false,
      changes: [
        { type: "修改人", value: "运营团队" },
        { type: "修改内容", value: "添加水印和产品标签" },
        { type: "图片数量", value: "42" }
      ],
      changedFiles: [
        { name: "product_01.jpg", status: "changed", details: "添加水印" },
        { name: "product_02.jpg", status: "changed", details: "添加水印" },
        { name: "product_03.jpg", status: "changed", details: "添加水印" }
      ]
    },
    {
      id: "v1.0",
      timestamp: "2025-04-12T09:30:00",
      status: "created",
      statusText: "已创建",
      isCurrent: false,
      changes: [
        { type: "创建人", value: "设计团队" },
        { type: "创建内容", value: "初始批量项目创建" },
        { type: "图片数量", value: "42" }
      ],
      changedFiles: [
        { name: "product_01.jpg", status: "added" },
        { name: "product_02.jpg", status: "added" },
        { name: "product_03.jpg", status: "added" }
      ]
    }
  ]
};

// 批量项目详情配置
export const batchDetailConfig = {
  "1": {
    settings: {
      outputFormat: "JPG",
      quality: 90,
      resolution: "1920x1080",
      namingPattern: "{productId}_promo_{date}",
      watermark: true,
      compression: "high"
    },
    stats: {
      totalTime: "15分30秒",
      avgProcessingTime: "22秒/项",
      totalSize: "156.4 MB",
      avgSize: "3.7 MB/项"
    },
    audits: [
      {
        id: 1,
        user: "质检团队",
        date: "2025-04-15T11:30:00",
        status: "approved",
        comments: "所有图片符合品牌规范，可以用于6月促销活动"
      }
    ]
  },
  "2": {
    settings: {
      outputFormat: "PNG",
      quality: 95,
      resolution: "2048x1080",
      namingPattern: "{productName}_new_{date}",
      watermark: false,
      compression: "low"
    },
    stats: {
      totalTime: "进行中",
      avgProcessingTime: "35秒/项",
      totalSize: "98.2 MB (已处理部分)",
      avgSize: "3.9 MB/项"
    },
    audits: []
  }
};

// 批量项目中的子项目条目
export const batchItems = {
  "1": [
    {
      id: 101,
      status: "completed",
      productId: "P001",
      productName: "清新洁面乳",
      variables: {
        productName: "清新洁面乳",
        discount: "7.5折",
        originalPrice: "¥189",
        discountPrice: "¥142",
        endDate: "6月30日"
      },
      thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      outputUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      processedAt: "2025-04-15T10:32:15",
      size: "3.2 MB",
      dimensions: "1920x1080"
    },
    {
      id: 102,
      status: "completed",
      productId: "P002",
      productName: "滋润保湿面霜",
      variables: {
        productName: "滋润保湿面霜",
        discount: "6.8折",
        originalPrice: "¥259",
        discountPrice: "¥176",
        endDate: "6月30日"
      },
      thumbnail: "https://images.unsplash.com/photo-1578083881163-7a185a96b2b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      outputUrl: "https://images.unsplash.com/photo-1578083881163-7a185a96b2b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      processedAt: "2025-04-15T10:32:45",
      size: "3.5 MB",
      dimensions: "1920x1080"
    },
    {
      id: 103,
      status: "completed",
      productId: "P003",
      productName: "美白精华液",
      variables: {
        productName: "美白精华液",
        discount: "8折",
        originalPrice: "¥329",
        discountPrice: "¥263",
        endDate: "6月30日"
      },
      thumbnail: "https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      outputUrl: "https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      processedAt: "2025-04-15T10:33:10",
      size: "3.1 MB",
      dimensions: "1920x1080"
    },
    {
      id: 104,
      status: "completed",
      productId: "P004",
      productName: "修护眼霜",
      variables: {
        productName: "修护眼霜",
        discount: "7折",
        originalPrice: "¥299",
        discountPrice: "¥209",
        endDate: "6月30日"
      },
      thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      outputUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      processedAt: "2025-04-15T10:33:35",
      size: "3.4 MB",
      dimensions: "1920x1080"
    },
    {
      id: 105,
      status: "completed",
      productId: "P005",
      productName: "保湿喷雾",
      variables: {
        productName: "保湿喷雾",
        discount: "6.5折",
        originalPrice: "¥129",
        discountPrice: "¥84",
        endDate: "6月30日"
      },
      thumbnail: "https://images.unsplash.com/photo-1616087436240-eabc05983751?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      outputUrl: "https://images.unsplash.com/photo-1616087436240-eabc05983751?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      processedAt: "2025-04-15T10:34:00",
      size: "3.3 MB",
      dimensions: "1920x1080"
    }
  ],
  "2": [
    {
      id: 201,
      status: "completed",
      productId: "N001",
      productName: "云朵气垫粉底",
      variables: {
        productName: "云朵气垫粉底",
        launchDate: "2025年5月5日",
        price: "¥299",
        highlight: "24小时持久，水润不脱妆"
      },
      thumbnail: "https://images.unsplash.com/photo-1631214953530-079f3887937c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      outputUrl: "https://images.unsplash.com/photo-1631214953530-079f3887937c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      processedAt: "2025-04-20T14:25:15",
      size: "4.2 MB",
      dimensions: "2048x1080"
    },
    {
      id: 202,
      status: "completed",
      productId: "N002",
      productName: "丝绒哑光唇釉",
      variables: {
        productName: "丝绒哑光唇釉",
        launchDate: "2025年5月5日",
        price: "¥219",
        highlight: "轻薄持久，不拔干"
      },
      thumbnail: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      outputUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
      processedAt: "2025-04-20T14:25:50",
      size: "3.9 MB",
      dimensions: "2048x1080"
    },
    {
      id: 203,
      status: "completed",
      productId: "N003",
      productName: "多色眼影盘",
      variables: {
        productName: "多色眼影盘",
        launchDate: "2025年5月5日",
        price: "¥399",
        highlight: "16色夏日色彩，哑光珠光双质地"
      },
      thumbnail: "https://images.unsplash.com/photo-1599733589046-d8a6257e4737?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      outputUrl: "https://images.unsplash.com/photo-1599733589046-d8a6257e4737?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      processedAt: "2025-04-20T14:26:20",
      size: "4.1 MB",
      dimensions: "2048x1080"
    },
    {
      id: 204,
      status: "processing",
      productId: "N004",
      productName: "清透防晒霜",
      variables: {
        productName: "清透防晒霜",
        launchDate: "2025年5月5日",
        price: "¥249",
        highlight: "SPF50+ PA++++，清爽不泛白"
      },
      thumbnail: "",
      outputUrl: "",
      processedAt: "",
      size: "",
      dimensions: ""
    },
    {
      id: 205,
      status: "processing",
      productId: "N005",
      productName: "焕颜精华水",
      variables: {
        productName: "焕颜精华水",
        launchDate: "2025年5月15日",
        price: "¥359",
        highlight: "富含维C精华，提亮肤色"
      },
      thumbnail: "",
      outputUrl: "",
      processedAt: "",
      size: "",
      dimensions: ""
    }
  ]
}; 