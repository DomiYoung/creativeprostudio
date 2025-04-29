import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design-system';

// 导入统一组件
import PageLayout from '../design-system/components/PageLayout';
import ContentCard from '../design-system/components/ContentCard';
import GridLayout from '../design-system/components/GridLayout';
import FilterBar from '../design-system/components/FilterBar';

// 图标
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FolderIcon from '@mui/icons-material/Folder';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// 模拟数据
const dummyTemplates = [
  {
    id: 1,
    title: '夏季新品发布模板',
    category: '电商',
    collection: '新品发布',
    thumbnail: 'https://images.unsplash.com/photo-1590330297626-d7aff25a0431?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bookmarked: true,
    tags: ['电商', '夏季', '推广']
  },
  {
    id: 2,
    title: '简约品牌介绍页',
    category: '品牌',
    collection: '品牌介绍',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bookmarked: false,
    tags: ['品牌', '简约', '介绍']
  },
  {
    id: 3,
    title: '社交媒体图片合集',
    category: '社交媒体',
    collection: '内容营销',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bookmarked: true,
    tags: ['社交', '营销', '图片']
  },
  {
    id: 4,
    title: '产品功能展示页',
    category: '产品',
    collection: '产品介绍',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bookmarked: false,
    tags: ['产品', '功能', '展示']
  },
  {
    id: 5,
    title: '促销活动着陆页',
    category: '电商',
    collection: '促销活动',
    thumbnail: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bookmarked: true,
    tags: ['电商', '促销', '活动']
  },
  {
    id: 6,
    title: '公司简介页面',
    category: '品牌',
    collection: '品牌介绍',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    bookmarked: false,
    tags: ['品牌', '公司', '简介']
  }
];

// 母版库组件
const MasterLibrary = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 状态
  const [templates, setTemplates] = useState(dummyTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState(dummyTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [activeSort, setActiveSort] = useState('最新');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  
  // 导航路径
  const breadcrumbs = [
    { label: '首页', path: '/' },
    { label: '母版库', path: '/master-library' }
  ];
  
  // 分类
  const categories = [
    { id: 'all', name: '所有模板' },
    { id: 'ecommerce', name: '电商模板' },
    { id: 'brand', name: '品牌模板' },
    { id: 'social', name: '社交媒体' },
    { id: 'product', name: '产品介绍' }
  ];
  
  // 集合
  const collections = [
    { id: 'all', name: '所有集合' },
    { id: 'promotion', name: '促销活动' },
    { id: 'introduction', name: '产品介绍' },
    { id: 'content', name: '内容营销' },
    { id: 'branding', name: '品牌设计' },
    { id: 'newproduct', name: '新品发布' }
  ];

  // 筛选标签
  const templateTags = [
    { id: 'bookmarked', label: '已收藏', icon: 'fa-bookmark' }
  ];

  // 筛选选项
  const templateFilters = [
    { id: 'website', label: '网站', icon: 'fa-globe' },
    { id: 'mobile', label: '移动端', icon: 'fa-mobile-alt' },
    { id: 'social', label: '社交媒体', icon: 'fa-share-alt' }
  ];

  // Effect for filtering templates
  useEffect(() => {
    let result = [...templates];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(template => 
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.collection.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (activeCategory !== 'all') {
      result = result.filter(template => 
        template.category.toLowerCase() === categories.find(cat => cat.id === activeCategory)?.name.toLowerCase()
      );
    }
    
    // Apply collection filter if in active filters
    if (activeFilters.length > 0) {
      const collectionIds = activeFilters.filter(id => 
        collections.some(collection => collection.id === id)
      );
      
      if (collectionIds.length > 0) {
        result = result.filter(template => 
          collectionIds.some(id => 
            template.collection.toLowerCase().includes(
              collections.find(collection => collection.id === id)?.name.toLowerCase() || ''
            )
          )
        );
      }
    }
    
    // Apply bookmarks filter
    if (activeTags.includes('bookmarked')) {
      result = result.filter(template => template.bookmarked);
    }
    
    setFilteredTemplates(result);
  }, [templates, searchTerm, activeCategory, activeFilters, activeTags]);

  // Toggle bookmark status
  const toggleBookmark = (id) => {
    setTemplates(templates.map(template => 
      template.id === id 
        ? { ...template, bookmarked: !template.bookmarked }
        : template
    ));
  };

  // Handle template selection
  const handleTemplateSelect = (id) => {
    // Navigate to template details or editor
    console.log(`Selected template: ${id}`);
    // navigate(`/template-editor/${id}`);
  };

  // 处理筛选变化
  const handleFilterChange = (filterIds) => {
    setActiveFilters(filterIds);
  };

  // 处理标签变化
  const handleTagChange = (tagIds) => {
    setActiveTags(tagIds);
  };

  // 处理搜索
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // 处理创建新模板
  const handleCreateTemplate = () => {
    console.log('Creating new template');
    // navigate('/create-template');
  };

  return (
    <PageLayout
      title="母版库"
      description="浏览和管理设计模板，快速创建符合品牌标准的设计。"
      breadcrumbs={breadcrumbs}
      activeNav="master-library"
    >
      {/* 筛选栏 */}
      <FilterBar
        segments={categories.map(cat => cat.name)}
        activeSegment={categories.find(cat => cat.id === activeCategory)?.name || '所有模板'}
        onSegmentChange={(segment) => {
          const category = categories.find(cat => cat.name === segment);
          setActiveCategory(category ? category.id : 'all');
        }}
        filters={templateFilters}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        tags={templateTags}
        activeTags={activeTags}
        onTagChange={handleTagChange}
        showSearch={true}
        searchPlaceholder="搜索模板..."
        onSearch={handleSearch}
        showSortFilter={true}
        sortOptions={['最新', '最早', '名称', '热门']}
        activeSort={activeSort}
        onSortChange={setActiveSort}
        actions={[
          <motion.button 
            key="create-button"
            className="action-button primary"
            whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(255, 145, 144, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateTemplate}
          >
            <i className="fas fa-plus"></i> 创建新模板
          </motion.button>
        ]}
      />
      
      {/* 模板网格 */}
      <GridLayout
        columns="auto-fill"
        minItemWidth="280px"
        isDark={isDark}
        isLoading={false}
        isEmpty={filteredTemplates.length === 0}
        emptyIcon="fas fa-layer-group"
        emptyTitle="未找到模板"
        emptyDescription="尝试修改筛选条件或创建新模板"
      >
        <AnimatePresence>
          {filteredTemplates.map(template => (
            <ContentCard
              key={template.id}
              image={template.thumbnail}
              title={template.title}
              status={template.bookmarked ? 'featured' : undefined}
              statusText={template.bookmarked ? '收藏' : undefined}
              isFavorite={template.bookmarked}
              metaItems={[
                { icon: 'fa-folder', text: template.category },
                { icon: 'fa-layer-group', text: template.collection }
              ]}
              tags={template.tags}
              onClick={() => handleTemplateSelect(template.id)}
            />
          ))}
        </AnimatePresence>
      </GridLayout>
    </PageLayout>
  );
};

export default MasterLibrary; 