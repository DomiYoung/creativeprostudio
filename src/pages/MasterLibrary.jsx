import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design-system';
import styled from '@emotion/styled';

// 导入统一组件
import PageLayout from '../design-system/components/PageLayout';
import ContentCard from '../design-system/components/ContentCard';
import GridLayout from '../design-system/components/GridLayout';
import FilterBar from '../design-system/components/FilterBar';

// 导入上传和模板管理模态框组件
import DeleteConfirmModal from '../components/ui/DeleteConfirmModal';
import TemplateDetailModal from '../components/ui/TemplateDetailModal'; // 需要创建此组件
import TemplateManagerModal from '../components/ui/TemplateManagerModal'; // 需要创建此组件

// 图标
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FolderIcon from '@mui/icons-material/Folder';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// 上传按钮
const CreateButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
  color: white;
  border: none;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 145, 144, 0.25);
  
  i {
    margin-right: 8px;
  }
`;

// 选择模式按钮
const SelectModeButton = styled(motion.button)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  background: ${props => props.isActive 
    ? (props.isDark ? 'rgba(255, 145, 144, 0.2)' : 'rgba(255, 145, 144, 0.1)')
    : (props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)')
  };
  color: ${props => props.isActive 
    ? '#FF9190' 
    : (props.isDark ? '#f5f5f5' : '#1d1d1f')
  };
  border: 1px solid ${props => props.isActive 
    ? 'rgba(255, 145, 144, 0.3)'
    : (props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
  };
  margin-right: 12px;
  
  i {
    margin-right: 8px;
  }
`;

// 文件夹选择下拉菜单
const CollectionSelect = styled.div`
  position: relative;
  display: inline-block;
`;

const CollectionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  margin-right: 8px;
  
  i {
    margin-right: 8px;
  }
`;

const CollectionDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background: ${props => props.isDark ? '#1a1a1a' : 'white'};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 100;
  min-width: 200px;
  overflow: hidden;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const CollectionMenuItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'};
  }
  
  &.active {
    background: ${props => props.isDark ? 'rgba(255, 145, 144, 0.2)' : 'rgba(255, 145, 144, 0.1)'};
    color: #FF9190;
  }
  
  i {
    margin-right: 8px;
  }
`;

// 模板详情模态框
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
`;

const ModalContent = styled(motion.div)`
  background-color: ${props => props.isDark ? '#1a1a1a' : 'white'};
  border-radius: 20px;
  width: 100%;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
  display: flex;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 992px) {
    flex-direction: column;
    max-width: 95%;
    max-height: 95%;
    overflow-y: auto;
  }
`;

// 模拟数据
const templateCategories = [
  '所有模板', '电商模板', '品牌模板', '社交媒体', '产品介绍', '促销活动'
];

// 品牌列表
const brandFilters = [
  { id: 'qc', label: '且初', icon: 'fa-tag' },
  { id: 'ddg', label: 'ddg', icon: 'fa-tag' }, 
  { id: 'asz', label: '安修泽', icon: 'fa-tag' },
  { id: 'oz', label: '奥札', icon: 'fa-tag' },
  { id: 'abl', label: '艾蓓拉', icon: 'fa-tag' },
  { id: 'sts', label: '三蒂丝', icon: 'fa-tag' }
];

// 模板类型
const templateTypeFilters = [
  { id: 'website', label: '网站', icon: 'fa-globe' },
  { id: 'mobile', label: '移动端', icon: 'fa-mobile-alt' },
  { id: 'social', label: '社交媒体', icon: 'fa-share-alt' },
  { id: 'print', label: '印刷', icon: 'fa-print' }
];

const templateTags = [
  { id: 'bookmarked', label: '已收藏', icon: 'fa-bookmark' },
  { id: 'recent', label: '最近使用', icon: 'fa-clock' },
  { id: 'featured', label: '精选', icon: 'fa-star' }
];

const templateFilters = [
  { id: 'horizontal', label: '横版', icon: 'fa-compress-alt' },
  { id: 'vertical', label: '竖版', icon: 'fa-expand-alt' },
  { id: 'square', label: '方形', icon: 'fa-square' }
];

// 集合/分类列表
const templateCollections = [
  { id: 'all', name: '所有集合', icon: 'fa-images', count: 36 },
  { id: 'promotion', name: '促销活动', icon: 'fa-folder', color: '#FF9190', count: 12 },
  { id: 'introduction', name: '产品介绍', icon: 'fa-folder', color: '#00B8D9', count: 8 },
  { id: 'content', name: '内容营销', icon: 'fa-folder', color: '#00C781', count: 5 },
  { id: 'branding', name: '品牌设计', icon: 'fa-folder', color: '#FFB900', count: 6 },
  { id: 'newproduct', name: '新品发布', icon: 'fa-folder', color: '#9B51E0', count: 5 }
];

const mockTemplates = [
  {
    id: 1,
    title: '夏季新品发布模板',
    category: '电商模板',
    collection: '新品发布',
    thumbnail: 'https://images.unsplash.com/photo-1590330297626-d7aff25a0431?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bookmarked: true,
    tags: ['电商', '夏季', '推广'],
    type: 'horizontal',
    updated: '2天前',
    resolution: '1920 x 1080',
    isFavorite: true,
    status: 'featured',
    statusText: '精选'
  },
  {
    id: 2,
    title: '简约品牌介绍页',
    category: '品牌模板',
    collection: '品牌设计',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bookmarked: false,
    tags: ['品牌', '简约', '介绍'],
    type: 'vertical',
    updated: '1周前', 
    resolution: '1080 x 1920',
    isFavorite: false
  },
  {
    id: 3,
    title: '社交媒体图片合集',
    category: '社交媒体',
    collection: '内容营销',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bookmarked: true,
    tags: ['社交', '营销', '图片'],
    type: 'square',
    updated: '3天前',
    resolution: '1080 x 1080',
    isFavorite: true,
    status: 'new',
    statusText: '新上传'
  },
  {
    id: 4,
    title: '产品功能展示页',
    category: '产品介绍',
    collection: '产品介绍',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bookmarked: false,
    tags: ['产品', '功能', '展示'],
    type: 'horizontal',
    updated: '5天前',
    resolution: '2560 x 1440',
    isFavorite: false
  },
  {
    id: 5,
    title: '促销活动着陆页',
    category: '电商模板',
    collection: '促销活动',
    thumbnail: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bookmarked: true,
    tags: ['电商', '促销', '活动'],
    type: 'vertical',
    updated: '今天',
    resolution: '1080 x 1920',
    isFavorite: true,
    status: 'featured',
    statusText: '精选'
  },
  {
    id: 6,
    title: '公司简介页面',
    category: '品牌模板',
    collection: '品牌设计',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bookmarked: false,
    tags: ['品牌', '公司', '简介'],
    type: 'horizontal',
    updated: '1周前',
    resolution: '1920 x 1080',
    isFavorite: false
  }
];

// 母版库组件
const MasterLibrary = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 状态管理
  const [activeCategory, setActiveCategory] = useState('所有模板');
  const [activeBrands, setActiveBrands] = useState([]);
  const [activeTemplateTypes, setActiveTemplateTypes] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState('最新');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);
  const [activeCollection, setActiveCollection] = useState(null);
  const [isCollectionManagerOpen, setIsCollectionManagerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [mockTemplatesState, setMockTemplatesState] = useState(mockTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState(mockTemplates);
  
  // 导航路径
  const breadcrumbs = [
    { label: '首页', path: '/creativeprostudio/prototype' },
    { label: '母版库', path: '/creativeprostudio/master-library' }
  ];
  
  // 处理品牌筛选变化
  const handleBrandChange = (brandId) => {
    setActiveBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };
  
  // 处理模板类型筛选变化
  const handleTemplateTypeChange = (typeId) => {
    setActiveTemplateTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };
  
  // 处理筛选变化
  const handleFilterChange = (filterId) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };
  
  // 处理标签变化
  const handleTagChange = (tagId) => {
    setActiveTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };
  
  // 搜索处理
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  // 点击模板
  const handleTemplateSelect = (template) => {
    if (isSelectMode) {
      if (selectedTemplates.some(t => t.id === template.id)) {
        setSelectedTemplates(prev => prev.filter(t => t.id !== template.id));
      } else {
        setSelectedTemplates(prev => [...prev, template]);
      }
    } else {
      setSelectedTemplate(template);
    }
  };
  
  // 关闭模板详情
  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };
  
  // 创建按钮点击
  const handleCreateClick = () => {
    navigate('/creativeprostudio/canvas-editor?create=template');
  };
  
  // 选择集合
  const handleCollectionSelect = (collectionId) => {
    setActiveCollection(collectionId);
    setShowCollectionDropdown(false);
    
    // 如果选择了特定项目集合，自动添加相关标签
    if (collectionId !== 'all') {
      // 根据选择的集合添加相关筛选条件
      const collection = templateCollections.find(c => c.id === collectionId);
      if (collection) {
        if (collection.id === 'promotion') {
          setActiveCategory('电商模板');
        } else if (collection.id === 'branding') {
          setActiveCategory('品牌模板');
        }
      }
    }
  };
  
  // 通过筛选器选择集合
  const handleCollectionFilterChange = (collectionId) => {
    handleCollectionSelect(collectionId);
  };
  
  // 切换选择模式
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    if (isSelectMode) {
      setSelectedTemplates([]);
    }
  };
  
  // 打开集合管理
  const handleOpenCollectionManager = () => {
    setIsCollectionManagerOpen(true);
  };
  
  // 删除单个模板
  const handleDeleteTemplate = (template) => {
    setTemplateToDelete(template);
    setIsDeleteModalOpen(true);
  };
  
  // 删除多个模板
  const handleBatchDelete = () => {
    if (selectedTemplates.length > 0) {
      setTemplateToDelete(selectedTemplates);
      setIsDeleteModalOpen(true);
    }
  };
  
  // 确认删除模板
  const confirmDelete = () => {
    if (Array.isArray(templateToDelete)) {
      // 批量删除
      const templateIds = templateToDelete.map(template => template.id);
      setMockTemplatesState(prev => prev.filter(template => !templateIds.includes(template.id)));
      setSelectedTemplates([]);
    } else if (templateToDelete) {
      // 单个删除
      setMockTemplatesState(prev => prev.filter(template => template.id !== templateToDelete.id));
      if (selectedTemplate && selectedTemplate.id === templateToDelete.id) {
        setSelectedTemplate(null);
      }
    }
    
    setIsDeleteModalOpen(false);
    setTemplateToDelete(null);
  };
  
  // 关闭删除确认对话框
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTemplateToDelete(null);
  };
  
  // 获取删除确认信息
  const getDeleteConfirmInfo = () => {
    if (Array.isArray(templateToDelete)) {
      const count = templateToDelete.length;
      return {
        title: `删除 ${count} 个模板`,
        message: `您确定要删除所选的 ${count} 个模板吗？此操作无法撤销。`
      };
    } else {
      return {
        title: "删除模板",
        message: `您确定要删除"${templateToDelete?.title || '此模板'}"吗？此操作无法撤销。`
      };
    }
  };
  
  // Effect for filtering templates
  useEffect(() => {
    let result = [...mockTemplatesState];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(template => 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (activeCategory !== '所有模板') {
      result = result.filter(template => template.category === activeCategory);
    }
    
    // Apply brand filters
    if (activeBrands.length > 0) {
      // 假设模板有品牌字段的情况
      result = result.filter(template => 
        activeBrands.some(brandId => template.tags.includes(brandFilters.find(b => b.id === brandId)?.label))
      );
    }
    
    // Apply template type filters
    if (activeTemplateTypes.length > 0) {
      result = result.filter(template => 
        activeTemplateTypes.includes(template.type)
      );
    }
    
    // Apply format filters (horizontal, vertical, etc.)
    if (activeFilters.length > 0) {
      result = result.filter(template => 
        activeFilters.includes(template.type)
      );
    }
    
    // Apply tag filters (bookmarked, etc.)
    if (activeTags.includes('bookmarked')) {
      result = result.filter(template => template.bookmarked);
    }
    
    if (activeTags.includes('featured')) {
      result = result.filter(template => template.status === 'featured');
    }
    
    if (activeTags.includes('recent')) {
      result = result.filter(template => 
        template.updated === '今天' || template.updated === '昨天' || template.updated === '2天前'
      );
    }
    
    // Apply collection filter
    if (activeCollection && activeCollection !== 'all') {
      const collection = templateCollections.find(c => c.id === activeCollection);
      if (collection) {
        result = result.filter(template => template.collection === collection.name);
      }
    }
    
    // Apply sorting
    if (activeSort) {
      switch (activeSort) {
        case '最新':
          // Simple sort by 'updated' field (would be better with actual dates)
          result = [...result].sort((a, b) => {
            if (a.updated === '今天') return -1;
            if (b.updated === '今天') return 1;
            if (a.updated === '昨天') return -1;
            if (b.updated === '昨天') return 1;
            return 0;
          });
          break;
        case '名称':
          result = [...result].sort((a, b) => a.title.localeCompare(b.title));
          break;
        case '热门':
          // Sort by 'featured' status
          result = [...result].sort((a, b) => {
            if (a.status === 'featured' && b.status !== 'featured') return -1;
            if (a.status !== 'featured' && b.status === 'featured') return 1;
            return 0;
          });
          break;
        default:
          break;
      }
    }
    
    setFilteredTemplates(result);
  }, [mockTemplatesState, searchQuery, activeCategory, activeBrands, activeTemplateTypes, activeFilters, activeTags, activeCollection, activeSort]);

  // Toggle bookmark status
  const toggleBookmark = (id) => {
    setMockTemplatesState(mockTemplatesState.map(template => 
      template.id === id 
        ? { ...template, bookmarked: !template.bookmarked, isFavorite: !template.isFavorite }
        : template
    ));
  };

  // 是否显示批量操作工具栏
  const showBatchActions = isSelectMode && selectedTemplates.length > 0;
  
  return (
    <PageLayout
      title="母版库"
      description="浏览和管理设计模板，快速创建符合品牌标准的设计"
      breadcrumbs={breadcrumbs}
      activeNav="master-library"
    >
      {/* 顶部操作区 */}
      <div style={{ display: 'flex', marginBottom: '16px', alignItems: 'center' }}>
        <SelectModeButton
          isDark={isDark}
          isActive={isSelectMode}
          onClick={toggleSelectMode}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className={`fas ${isSelectMode ? 'fa-check-square' : 'fa-square'}`}></i>
          {isSelectMode ? '取消选择' : '批量选择'}
        </SelectModeButton>
        
        {/* 集合选择下拉菜单 */}
        <CollectionSelect>
          <CollectionButton 
            isDark={isDark}
            onClick={() => setShowCollectionDropdown(!showCollectionDropdown)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className={`fas ${activeCollection && activeCollection !== 'all' ? 'fa-folder-open' : 'fa-folder'}`}></i>
            {activeCollection 
              ? templateCollections.find(f => f.id === activeCollection)?.name 
              : '选择设计集合'}
          </CollectionButton>
          
          <AnimatePresence>
            {showCollectionDropdown && (
              <CollectionDropdown
                isDark={isDark}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {templateCollections.map(collection => (
                  <CollectionMenuItem 
                    key={collection.id}
                    isDark={isDark}
                    className={activeCollection === collection.id ? 'active' : ''}
                    onClick={() => handleCollectionSelect(collection.id)}
                  >
                    <i className={`fas ${collection.icon}`} style={collection.color ? {color: collection.color} : {}}></i>
                    {collection.name}
                    <span style={{ marginLeft: 'auto', fontSize: '12px', opacity: 0.7 }}>{collection.count}</span>
                  </CollectionMenuItem>
                ))}
                <div style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, margin: '8px 0' }}></div>
                <CollectionMenuItem 
                  isDark={isDark}
                  onClick={handleOpenCollectionManager}
                >
                  <i className="fas fa-cog"></i>
                  管理集合
                </CollectionMenuItem>
              </CollectionDropdown>
            )}
          </AnimatePresence>
        </CollectionSelect>
        
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          {showBatchActions && (
            <>
              <motion.button
                className="action-button danger"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBatchDelete}
                style={{
                  padding: '8px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#FF5252',
                  color: 'white',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <i className="fas fa-trash-alt"></i>
                删除所选 ({selectedTemplates.length})
              </motion.button>
            </>
          )}
          
          <CreateButton
            whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(255, 145, 144, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateClick}
          >
            <i className="fas fa-plus"></i>
            创建新模板
          </CreateButton>
        </div>
      </div>
      
      {/* 筛选栏 */}
      <FilterBar
        segments={templateCategories}
        activeSegment={activeCategory}
        onSegmentChange={setActiveCategory}
        filters={templateFilters}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        tags={templateTags}
        activeTags={activeTags}
        onTagChange={handleTagChange}
        showSearch={true}
        searchPlaceholder="搜索模板..."
        searchValue={searchQuery}
        onSearch={handleSearch}
        showSortFilter={true}
        sortOptions={['最新', '名称', '热门']}
        activeSort={activeSort}
        onSortChange={setActiveSort}
        isDark={isDark}
        dropdownFilters={[
          {
            title: '品牌筛选',
            items: brandFilters,
            activeItems: activeBrands,
            onChange: handleBrandChange
          },
          {
            title: '模板类型',
            items: templateTypeFilters,
            activeItems: activeTemplateTypes,
            onChange: handleTemplateTypeChange
          }
        ]}
      />
      
      {/* 模板网格 */}
      <GridLayout
        columns="auto-fill"
        minItemWidth="280px"
        gap="24px"
        isLoading={false}
        isEmpty={filteredTemplates.length === 0}
        emptyIcon="fas fa-layer-group"
        emptyTitle="未找到模板"
        emptyDescription="尝试修改筛选条件或创建新模板"
        emptyAction={{
          label: "创建新模板",
          onClick: handleCreateClick
        }}
      >
        {filteredTemplates.map(template => (
          <ContentCard
            key={template.id}
            title={template.title}
            image={template.thumbnail}
            status={template.status}
            statusText={template.statusText}
            isFavorite={template.isFavorite}
            onFavoriteToggle={() => toggleBookmark(template.id)}
            metaItems={[
              { icon: 'fa-layer-group', text: template.collection },
              { icon: 'fa-ruler-combined', text: template.resolution }
            ]}
            tags={template.tags}
            onClick={() => handleTemplateSelect(template)}
            isSelected={isSelectMode && selectedTemplates.some(t => t.id === template.id)}
            selectionMode={isSelectMode}
            contextMenuItems={[
              {
                icon: template.isFavorite ? 'fa-bookmark' : 'fa-bookmark',
                label: template.isFavorite ? '取消收藏' : '收藏',
                onClick: () => toggleBookmark(template.id)
              },
              { 
                icon: 'fa-edit', 
                label: '编辑', 
                onClick: () => navigate(`/creativeprostudio/canvas-editor?template=${template.id}`) 
              },
              { 
                icon: 'fa-trash-alt', 
                label: '删除', 
                variant: 'danger',
                onClick: () => handleDeleteTemplate(template) 
              }
            ]}
          />
        ))}
      </GridLayout>
      
      {/* 模板详情模态框 */}
      <AnimatePresence>
        {selectedTemplate && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <ModalContent
              isDark={isDark}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <TemplateDetailModal 
                template={selectedTemplate}
                onClose={handleCloseModal}
                onToggleFavorite={toggleBookmark}
                onEdit={() => navigate(`/creativeprostudio/canvas-editor?template=${selectedTemplate.id}`)}
                relatedTemplates={mockTemplatesState.filter(t => 
                  t.id !== selectedTemplate.id && 
                  (t.category === selectedTemplate.category || t.tags.some(tag => selectedTemplate.tags.includes(tag)))
                ).slice(0, 4)}
                isDark={isDark}
              />
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
      
      {/* 删除确认对话框 */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title={templateToDelete ? getDeleteConfirmInfo().title : ''}
        message={templateToDelete ? getDeleteConfirmInfo().message : ''}
        isDark={isDark}
      />
      
      {/* 集合管理模态框 */}
      <TemplateManagerModal
        isOpen={isCollectionManagerOpen}
        onClose={() => setIsCollectionManagerOpen(false)}
        collections={templateCollections}
        onAdd={(newCollection) => {
          console.log('添加新集合', newCollection);
          // 实际应用中这里会调用API创建新集合
        }}
        onEdit={(updatedCollection) => {
          console.log('更新集合', updatedCollection);
          // 实际应用中这里会调用API更新集合
        }}
        onDelete={(collectionId) => {
          console.log('删除集合', collectionId);
          // 实际应用中这里会调用API删除集合
        }}
        isDark={isDark}
      />
    </PageLayout>
  );
};

export default MasterLibrary; 