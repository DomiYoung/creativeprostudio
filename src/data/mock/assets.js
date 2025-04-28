// 资产库相关数据
export const folderTypes = [
  { id: 'all', name: '全部素材', icon: 'fa-photo-film', count: 345 },
  { id: 'recent', name: '最近使用', icon: 'fa-clock', count: 28 },
  { id: 'favorite', name: '已标记收藏', icon: 'fa-star', count: 42 },
  { id: 'my-uploads', name: '我的上传', icon: 'fa-cloud-upload-alt', count: 68 }
];

export const brandFolders = [
  { id: 'brand-1', name: '欧莱雅', icon: 'fa-folder', count: 87 },
  { id: 'brand-2', name: '雅诗兰黛', icon: 'fa-folder', count: 64 },
  { id: 'brand-3', name: '兰蔻', icon: 'fa-folder', count: 59 },
  { id: 'brand-4', name: '香奈儿', icon: 'fa-folder', count: 72 },
  { id: 'brand-5', name: '迪奥', icon: 'fa-folder', count: 63 }
];

export const categories = [
  { id: 'all', name: '所有类别' },
  { id: 'face', name: '面部产品' },
  { id: 'eyes', name: '眼部彩妆' },
  { id: 'lips', name: '唇部彩妆' },
  { id: 'skincare', name: '护肤产品' },
  { id: 'packaging', name: '包装素材' },
  { id: 'background', name: '背景图片' }
];

export const tags = [
  { id: 'spring2025', name: '2025春季' },
  { id: 'summer', name: '夏季系列' },
  { id: 'newArrival', name: '新品上市' },
  { id: 'bestseller', name: '畅销产品' },
  { id: 'limited', name: '限量版' },
  { id: 'promotion', name: '促销活动' }
];

export const assetItems = [
  {
    id: 1,
    title: '春日粉底液展示',
    thumbnail: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    fileType: 'jpg',
    dimensions: '2400 x 1600',
    size: '2.4 MB',
    categories: ['face', 'skincare'],
    tags: ['spring2025', 'newArrival'],
    dateAdded: '2025-02-15',
    brand: 'brand-1',
    folder: 'all'
  },
  {
    id: 2,
    title: '精华液产品特写',
    thumbnail: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    fileType: 'jpg',
    dimensions: '2000 x 1333',
    size: '1.8 MB',
    categories: ['skincare'],
    tags: ['bestseller', 'promotion'],
    dateAdded: '2025-02-10',
    brand: 'brand-2',
    folder: 'all'
  },
  {
    id: 3,
    title: '彩妆刷套装展示',
    thumbnail: 'https://images.pexels.com/photos/1749452/pexels-photo-1749452.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    fileType: 'jpg',
    dimensions: '2200 x 1467',
    size: '2.1 MB',
    categories: ['face', 'eyes'],
    tags: ['limited', 'newArrival'],
    dateAdded: '2025-02-08',
    brand: 'brand-3',
    folder: 'recent'
  },
  {
    id: 4,
    title: '口红产品系列',
    thumbnail: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    fileType: 'jpg',
    dimensions: '2400 x 1600',
    size: '2.2 MB',
    categories: ['lips'],
    tags: ['summer', 'promotion'],
    dateAdded: '2025-02-05',
    brand: 'brand-4',
    folder: 'favorite'
  },
  {
    id: 5,
    title: '眼影盘细节展示',
    thumbnail: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    fileType: 'jpg',
    dimensions: '2000 x 1333',
    size: '1.9 MB',
    categories: ['eyes'],
    tags: ['spring2025', 'limited'],
    dateAdded: '2025-01-28',
    brand: 'brand-5',
    folder: 'recent'
  },
  {
    id: 6,
    title: '护肤品包装设计',
    thumbnail: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    fileType: 'jpg',
    dimensions: '2200 x 1467',
    size: '2.0 MB',
    categories: ['packaging', 'skincare'],
    tags: ['newArrival', 'bestseller'],
    dateAdded: '2025-01-25',
    brand: 'brand-1',
    folder: 'my-uploads'
  },
  {
    id: 7,
    title: '粉色化妆品背景',
    thumbnail: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    fileType: 'jpg',
    dimensions: '2400 x 1600',
    size: '2.3 MB',
    categories: ['background'],
    tags: ['spring2025'],
    dateAdded: '2025-01-20',
    brand: 'brand-2',
    folder: 'favorite'
  },
  {
    id: 8,
    title: '睫毛膏产品展示',
    thumbnail: 'https://images.pexels.com/photos/3059609/pexels-photo-3059609.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    fileType: 'jpg',
    dimensions: '2000 x 1333',
    size: '1.7 MB',
    categories: ['eyes'],
    tags: ['summer', 'bestseller'],
    dateAdded: '2025-01-18',
    brand: 'brand-3',
    folder: 'all'
  },
  {
    id: 9,
    title: '保湿面霜特写',
    thumbnail: 'https://images.pexels.com/photos/5217956/pexels-photo-5217956.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    fileType: 'jpg',
    dimensions: '2200 x 1467',
    size: '2.1 MB',
    categories: ['skincare', 'face'],
    tags: ['promotion', 'bestseller'],
    dateAdded: '2025-01-15',
    brand: 'brand-4',
    folder: 'my-uploads'
  },
  {
    id: 10,
    title: '包装盒设计模板',
    thumbnail: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    fileType: 'jpg',
    dimensions: '2400 x 1600',
    size: '2.0 MB',
    categories: ['packaging'],
    tags: ['limited', 'newArrival'],
    dateAdded: '2025-01-10',
    brand: 'brand-5',
    folder: 'recent'
  },
  {
    id: 11,
    title: '彩妆调色板俯视图',
    thumbnail: 'https://images.pexels.com/photos/2417264/pexels-photo-2417264.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    fileType: 'jpg',
    dimensions: '2000 x 1333',
    size: '1.9 MB',
    categories: ['face', 'eyes'],
    tags: ['spring2025', 'promotion'],
    dateAdded: '2025-01-05',
    brand: 'brand-1',
    folder: 'favorite'
  },
  {
    id: 12,
    title: '粉底刷工具特写',
    thumbnail: 'https://images.pexels.com/photos/1749452/pexels-photo-1749452.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    fileType: 'jpg',
    dimensions: '2200 x 1467',
    size: '2.2 MB',
    categories: ['face'],
    tags: ['bestseller'],
    dateAdded: '2025-01-02',
    brand: 'brand-2',
    folder: 'my-uploads'
  }
]; 