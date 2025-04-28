// 母版库相关数据
export const masterCategories = [
  { id: 'all', name: '所有模板' },
  { id: 'product', name: '产品详情' },
  { id: 'promotion', name: '促销活动' },
  { id: 'social', name: '社交媒体' },
  { id: 'banner', name: '海报横幅' },
  { id: 'packaging', name: '包装设计' },
  { id: 'new', name: '新品发布' }
];

export const masterTags = [
  '春季',
  '夏季',
  '热销',
  '限量版',
  '护肤',
  '彩妆',
  '口红',
  '香水',
  '活动',
  '促销'
];

export const masterTemplates = [
  {
    id: 1,
    name: '产品详情展示',
    description: '适合各类美妆产品细节展示',
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dimensions: '1080 × 1920',
    categories: ['product'],
    tags: ['护肤', '彩妆'],
    dateAdded: '2025-01-15',
    variables: ['产品名称', '产品描述', '价格', '功效']
  },
  {
    id: 2,
    name: '限时促销模板',
    description: '突出折扣和限时信息的促销模板',
    thumbnail: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dimensions: '1200 × 1200',
    categories: ['promotion'],
    tags: ['促销', '活动', '限量版'],
    dateAdded: '2025-02-10',
    variables: ['折扣比例', '活动名称', '截止日期', '促销代码']
  },
  {
    id: 3,
    name: '护肤品系列展示',
    description: '展示产品系列组合使用效果',
    thumbnail: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dimensions: '1080 × 1350',
    categories: ['product', 'social'],
    tags: ['护肤', '春季'],
    dateAdded: '2025-02-05',
    variables: ['系列名称', '产品1', '产品2', '产品3', '使用效果']
  },
  {
    id: 4,
    name: '新品发布海报',
    description: '适用于各类新产品发布和推广',
    thumbnail: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dimensions: '1080 × 1920',
    categories: ['new', 'banner'],
    tags: ['新品', '彩妆', '春季'],
    dateAdded: '2025-01-28',
    variables: ['产品名称', '发布日期', '亮点']
  },
  {
    id: 5,
    name: '社交媒体每日一图',
    description: '适合日常社交媒体内容更新',
    thumbnail: 'https://images.unsplash.com/photo-1596203721435-99e8fbdd8184?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dimensions: '1080 × 1080',
    categories: ['social'],
    tags: ['彩妆', '护肤', '夏季'],
    dateAdded: '2025-01-20',
    variables: ['标题', '描述', '标签']
  },
  {
    id: 6,
    name: '口红色号展示',
    description: '展示口红产品不同色号效果',
    thumbnail: 'https://images.unsplash.com/photo-1599733589046-d8a6257e4737?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dimensions: '1080 × 1350',
    categories: ['product'],
    tags: ['口红', '彩妆'],
    dateAdded: '2025-02-12',
    variables: ['产品名称', '色号名称', '色号编码', '试色图']
  },
  {
    id: 7,
    name: '节日特别版包装',
    description: '适合节日限定版产品包装设计',
    thumbnail: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dimensions: '2000 × 2000',
    categories: ['packaging'],
    tags: ['包装', '限量版'],
    dateAdded: '2025-02-01',
    variables: ['产品名称', '节日名称', '限定说明']
  },
  {
    id: 8,
    name: '香水产品展示',
    description: '突出香水产品特点和气味描述',
    thumbnail: 'https://images.unsplash.com/photo-1606473164420-8f900bbb5f4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dimensions: '1080 × 1920',
    categories: ['product'],
    tags: ['香水', '夏季'],
    dateAdded: '2025-01-25',
    variables: ['产品名称', '香调', '前调', '中调', '后调']
  },
  {
    id: 9,
    name: '促销活动主视觉',
    description: '大型促销活动主视觉设计',
    thumbnail: 'https://images.unsplash.com/photo-1596513808558-d8992f272d6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dimensions: '1920 × 1080',
    categories: ['promotion', 'banner'],
    tags: ['促销', '活动', '热销'],
    dateAdded: '2025-02-18',
    variables: ['活动名称', '时间', '主推产品', '折扣信息']
  },
  {
    id: 10,
    name: '护肤成分解析',
    description: '详细分析产品成分和功效',
    thumbnail: 'https://images.unsplash.com/photo-1616395405352-a13937bf000e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dimensions: '1080 × 1920',
    categories: ['product', 'social'],
    tags: ['护肤', '成分'],
    dateAdded: '2025-01-18',
    variables: ['产品名称', '成分1', '成分2', '成分3', '功效描述']
  },
  {
    id: 11,
    name: '新品上市倒计时',
    description: '产品发布前的预热倒计时',
    thumbnail: 'https://images.unsplash.com/photo-1596384607968-f702bdbd3cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dimensions: '1080 × 1080',
    categories: ['new', 'social'],
    tags: ['新品', '彩妆', '限量版'],
    dateAdded: '2025-02-15',
    variables: ['产品名称', '发布日期', '倒计时', '预约信息']
  },
  {
    id: 12,
    name: '产品使用步骤',
    description: '展示产品正确使用方法和步骤',
    thumbnail: 'https://images.unsplash.com/photo-1637226280874-c73a5941865d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dimensions: '1080 × 1920',
    categories: ['product', 'social'],
    tags: ['护肤', '教程'],
    dateAdded: '2025-01-10',
    variables: ['产品名称', '步骤1', '步骤2', '步骤3', '使用提示']
  }
];

export const masterCollections = [
  {
    id: 'collection1',
    name: '我的收藏',
    templates: [1, 4, 6, 11]
  },
  {
    id: 'collection2',
    name: '热门模板',
    templates: [2, 5, 9]
  },
  {
    id: 'collection3',
    name: '最近使用',
    templates: [3, 7, 10]
  }
]; 