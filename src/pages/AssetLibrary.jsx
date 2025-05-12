import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design-system';

// 导入统一组件
import PageLayout from '../design-system/components/PageLayout';
import ContentCard from '../design-system/components/ContentCard';
import GridLayout from '../design-system/components/GridLayout';
import FilterBar from '../design-system/components/FilterBar';

// 导入上传和文件夹管理模态框组件
import AssetUploadModal from '../components/ui/AssetUploadModal';
import AssetFolderManager from '../components/ui/AssetFolderManager';
import DeleteConfirmModal from '../components/ui/DeleteConfirmModal';

// 素材库样式
import styled from '@emotion/styled';

// 模拟数据
const assetCategories = ['所有素材', '产品图', '模特图', '背景', '装饰元素', '图标'];

// 品牌列表
const brandFilters = [
  { id: 'qc', label: '且初', icon: 'fa-tag' },
  { id: 'ddg', label: 'ddg', icon: 'fa-tag' }, 
  { id: 'asz', label: '安修泽', icon: 'fa-tag' },
  { id: 'oz', label: '奥札', icon: 'fa-tag' },
  { id: 'abl', label: '艾蓓拉', icon: 'fa-tag' },
  { id: 'sts', label: '三蒂丝', icon: 'fa-tag' }
];

// 素材类型
const materialTypeFilters = [
  { id: 'background', label: '背景图', icon: 'fa-image' },
  { id: 'product', label: '产品图', icon: 'fa-box-open' },
  { id: 'icon', label: 'icon', icon: 'fa-icons' },
  { id: 'other', label: '其他图片', icon: 'fa-file-image' }
];

const assetTags = [
  { id: 'new', label: '最新上传' },
  { id: 'popular', label: '热门素材' },
  { id: 'favorites', label: '收藏' },
  { id: 'project', label: '项目素材' }
];

const assetFilters = [
  { id: 'photo', label: '照片', icon: 'fa-image' },
  { id: 'vector', label: '矢量图', icon: 'fa-bezier-curve' },
  { id: 'texture', label: '纹理', icon: 'fa-paint-brush' }
];

const mockAssets = [
  {
    id: 1,
    title: '产品包装正面图',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'photo',
    tags: ['包装', '化妆品', '高清'],
    updated: '2天前',
    resolution: '4500 x 3000',
    isFavorite: true,
    status: 'new',
    statusText: '新上传'
  },
  {
    id: 2,
    title: '美妆模特特写',
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'photo',
    tags: ['模特', '特写', '彩妆'],
    updated: '1周前',
    resolution: '4200 x 2800',
    isFavorite: false
  },
  {
    id: 3,
    title: '简约几何背景',
    image: 'https://images.pexels.com/photos/1749452/pexels-photo-1749452.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'vector',
    tags: ['背景', '几何', '简约'],
    updated: '3天前',
    resolution: '5000 x 3500',
    isFavorite: true,
    status: 'featured',
    statusText: '精选'
  },
  {
    id: 4,
    title: '护肤产品组合',
    image: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'photo',
    tags: ['护肤', '组合图', '白色背景'],
    updated: '今天',
    resolution: '4800 x 3200',
    isFavorite: false
  },
  {
    id: 5,
    title: '渐变纹理背景',
    image: 'https://images.pexels.com/photos/3826678/pexels-photo-3826678.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'texture',
    tags: ['背景', '渐变', '粉色'],
    updated: '5天前',
    resolution: '5000 x 3000',
    isFavorite: false
  },
  {
    id: 6,
    title: '口红产品特写',
    image: 'https://images.pexels.com/photos/4620843/pexels-photo-4620843.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'photo',
    tags: ['口红', '特写', '彩妆'],
    updated: '1天前',
    resolution: '4500 x 3000',
    isFavorite: true
  },
  {
    id: 7,
    title: '化妆品装饰图案',
    image: 'https://images.pexels.com/photos/8128072/pexels-photo-8128072.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'vector',
    tags: ['装饰', '图案', '手绘'],
    updated: '1周前',
    resolution: '3600 x 3600',
    isFavorite: false
  },
  {
    id: 8,
    title: '自然光效果',
    image: 'https://images.pexels.com/photos/8128587/pexels-photo-8128587.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'texture',
    tags: ['光效', '自然', '背景'],
    updated: '4天前',
    resolution: '5000 x 3500',
    isFavorite: false,
    status: 'featured',
    statusText: '精选'
  }
];

// 上传按钮
const UploadButton = styled(motion.button)`
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

// 文件夹选择下拉菜单
const FolderSelect = styled.div`
  position: relative;
  display: inline-block;
`;

const FolderButton = styled(motion.button)`
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

const FolderDropdown = styled(motion.div)`
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

const FolderMenuItem = styled.div`
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

// 素材详情模态框
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

const AssetPreview = styled.div`
  flex: 3;
  background-color: ${props => props.isDark ? '#111' : '#f5f5f5'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  overflow: hidden;
  max-height: 80vh;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 992px) {
    padding: 20px;
  }
`;

const AssetInfo = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  
  @media (max-width: 992px) {
    padding: 24px;
  }
`;

const AssetTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: ${props => props.isDark ? '#f5f5f5' : '#212121'};
`;

const InfoSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${props => props.isDark ? '#ccc' : '#333'};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
  color: ${props => props.isDark ? '#ccc' : '#666'};
`;

const MetaItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  
  &:last-child {
    border-bottom: none;
  }
`;

const MetaLabel = styled.span`
  color: ${props => props.isDark ? '#999' : '#777'};
  font-size: 14px;
`;

const MetaValue = styled.span`
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
  font-size: 14px;
  font-weight: 500;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 40px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-weight: 600;
  
  ${props => props.primary 
    ? `
      background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(255, 145, 144, 0.25);
      
      &:hover {
        box-shadow: 0 6px 16px rgba(255, 145, 144, 0.35);
        transform: translateY(-2px);
      }
    `
    : `
      background-color: ${props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'};
      color: ${props.isDark ? '#ccc' : '#666'};
      
      &:hover {
        background-color: ${props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'};
      }
    `
  }
  
  i {
    margin-right: 8px;
  }
`;

// 选择模式切换按钮
const SelectModeButton = styled(motion.button)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  background: ${props => props.isActive 
    ? 'linear-gradient(135deg, #FF9190 0%, #FFA194 100%)' 
    : props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'};
  color: ${props => props.isActive ? 'white' : props.isDark ? '#f5f5f5' : '#1d1d1f'};
  border: none;
  font-weight: 600;
  box-shadow: ${props => props.isActive ? '0 4px 12px rgba(255, 145, 144, 0.25)' : 'none'};
  margin-right: 12px;
  
  i {
    margin-right: 8px;
  }
`;

// 批量操作工具栏
const BatchActionBar = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: ${props => props.isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
`;

const BatchActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  background: ${props => props.primary 
    ? 'linear-gradient(135deg, #FF9190 0%, #FFA194 100%)' 
    : 'transparent'};
  color: ${props => props.primary 
    ? 'white' 
    : props.isDark ? '#f5f5f5' : '#1d1d1f'};
  border: ${props => props.primary 
    ? 'none' 
    : props.isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'};
  font-weight: 600;
  margin-right: 8px;
  
  i {
    margin-right: 8px;
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

const SelectedCount = styled.div`
  padding: 0 16px;
  color: ${props => props.isDark ? '#aaa' : '#666'};
  font-size: 14px;
  display: flex;
  align-items: center;
  
  span {
    font-weight: 600;
    color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
    margin: 0 4px;
  }
`;

// 主组件
const AssetLibrary = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 状态管理
  const [activeCategory, setActiveCategory] = useState('所有素材');
  const [activeBrands, setActiveBrands] = useState([]);
  const [activeMaterialTypes, setActiveMaterialTypes] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState('最新');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [showFolderDropdown, setShowFolderDropdown] = useState(false);
  const [activeFolder, setActiveFolder] = useState(null);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [isFolderManagerOpen, setIsFolderManagerOpen] = useState(false);
  const [mockAssetsState, setMockAssetsState] = useState(mockAssets);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);
  
  // 项目文件夹列表
  const projectFolders = [
    { id: 'all', name: '所有素材', icon: 'fa-images' },
    { id: 'project1', name: '项目A素材集', icon: 'fa-folder', color: '#FF9190' },
    { id: 'project2', name: '项目B素材集', icon: 'fa-folder', color: '#00B8D9' },
    { id: 'project3', name: '夏季主题', icon: 'fa-folder', color: '#00C781' },
    { id: 'project4', name: '产品详情页', icon: 'fa-folder', color: '#FFB900' }
  ];
  
  // 面包屑导航
  const breadcrumbs = [
    { label: '首页', path: '/creativeprostudio/prototype' },
    { label: '素材库', path: '/creativeprostudio/asset-library' }
  ];
  
  // 处理品牌筛选变化
  const handleBrandChange = (brandId) => {
    setActiveBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };
  
  // 处理素材类型筛选变化
  const handleMaterialTypeChange = (typeId) => {
    setActiveMaterialTypes(prev => 
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
  
  // 点击素材
  const handleAssetSelect = (asset) => {
    if (isSelectMode) {
      if (selectedAssets.some(a => a.id === asset.id)) {
        setSelectedAssets(prev => prev.filter(a => a.id !== asset.id));
      } else {
        setSelectedAssets(prev => [...prev, asset]);
      }
    } else {
      setSelectedAsset(asset);
    }
  };
  
  // 关闭素材详情
  const handleCloseModal = () => {
    setSelectedAsset(null);
  };
  
  // 上传按钮点击
  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };
  
  // 关闭上传模态框
  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };
  
  // 选择文件夹
  const handleFolderSelect = (folderId) => {
    setActiveFolder(folderId);
    setShowFolderDropdown(false);
    
    // 如果选择了特定项目文件夹，自动添加"项目素材"标签
    if (folderId !== 'all') {
      if (!activeTags.includes('project')) {
        setActiveTags(prev => [...prev, 'project']);
      }
    } else {
      // 如果选择了"所有素材"，移除"项目素材"标签
      setActiveTags(prev => prev.filter(tag => tag !== 'project'));
    }
  };
  
  // 通过筛选器选择文件夹
  const handleFolderFilterChange = (folderId) => {
    handleFolderSelect(folderId);
  };
  
  // 切换选择模式
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    if (isSelectMode) {
      setSelectedAssets([]);
    }
  };
  
  // 打开文件夹管理
  const handleOpenFolderManager = () => {
    setIsFolderManagerOpen(true);
  };
  
  // 删除单个素材
  const handleDeleteAsset = (asset) => {
    setAssetToDelete(asset);
    setIsDeleteModalOpen(true);
  };
  
  // 删除多个素材
  const handleBatchDelete = () => {
    if (selectedAssets.length > 0) {
      setAssetToDelete(selectedAssets);
      setIsDeleteModalOpen(true);
    }
  };
  
  // 确认删除素材
  const confirmDelete = () => {
    if (Array.isArray(assetToDelete)) {
      // 批量删除
      const assetIds = assetToDelete.map(asset => asset.id);
      setMockAssetsState(prev => prev.filter(asset => !assetIds.includes(asset.id)));
      setSelectedAssets([]);
    } else if (assetToDelete) {
      // 单个删除
      setMockAssetsState(prev => prev.filter(asset => asset.id !== assetToDelete.id));
      if (selectedAsset && selectedAsset.id === assetToDelete.id) {
        setSelectedAsset(null);
      }
    }
    
    setIsDeleteModalOpen(false);
    setAssetToDelete(null);
  };
  
  // 关闭删除确认对话框
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setAssetToDelete(null);
  };
  
  // 获取删除确认信息
  const getDeleteConfirmInfo = () => {
    if (Array.isArray(assetToDelete)) {
      const count = assetToDelete.length;
      return {
        title: `删除 ${count} 个素材`,
        message: `您确定要删除所选的 ${count} 个素材吗？此操作无法撤销。`
      };
    } else {
      return {
        title: "删除素材",
        message: `您确定要删除"${assetToDelete?.title || '此素材'}"吗？此操作无法撤销。`
      };
    }
  };
  
  // 过滤数据
  const filteredAssets = mockAssetsState;
  
  // 是否显示批量操作工具栏
  const showBatchActions = isSelectMode && selectedAssets.length > 0;
  
  return (
    <PageLayout
      title="素材库"
      breadcrumbs={breadcrumbs}
      activeNav="asset-library"
    >
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
        
        <FolderSelect>
          <FolderButton 
            isDark={isDark}
            onClick={() => setShowFolderDropdown(!showFolderDropdown)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className={`fas ${activeFolder && activeFolder !== 'all' ? 'fa-folder-open' : 'fa-folder'}`}></i>
            {activeFolder 
              ? projectFolders.find(f => f.id === activeFolder)?.name 
              : '选择项目文件夹'}
          </FolderButton>
          
          <AnimatePresence>
            {showFolderDropdown && (
              <FolderDropdown
                isDark={isDark}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {projectFolders.map(folder => (
                  <FolderMenuItem 
                    key={folder.id}
                    isDark={isDark}
                    className={activeFolder === folder.id ? 'active' : ''}
                    onClick={() => handleFolderSelect(folder.id)}
                  >
                    <i className={`fas ${folder.icon}`}></i>
                    {folder.name}
                  </FolderMenuItem>
                ))}
                <FolderMenuItem 
                  isDark={isDark}
                  onClick={handleOpenFolderManager}
                >
                  <i className="fas fa-cog"></i>
                  管理文件夹
                </FolderMenuItem>
              </FolderDropdown>
            )}
          </AnimatePresence>
        </FolderSelect>
        
        <div style={{ flex: 1 }}></div>
        
        <UploadButton 
          whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(255, 145, 144, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUploadClick}
        >
          <i className="fas fa-upload"></i> 上传素材
        </UploadButton>
      </div>
      
      {/* 筛选栏 */}
      <FilterBar
        segments={assetCategories}
        activeSegment={activeCategory}
        onSegmentChange={setActiveCategory}
        filters={[
          {
            title: '品牌',
            items: brandFilters,
            activeItems: activeBrands,
            onChange: handleBrandChange
          },
          {
            title: '素材类型',
            items: materialTypeFilters,
            activeItems: activeMaterialTypes,
            onChange: handleMaterialTypeChange
          },
          {
            title: '项目文件夹',
            items: projectFolders.filter(folder => folder.id !== 'all').map(folder => ({
              id: folder.id,
              label: folder.name,
              icon: folder.icon
            })),
            activeItems: activeFolder && activeFolder !== 'all' ? [activeFolder] : [],
            onChange: handleFolderFilterChange
          },
          {
            title: '其他筛选',
            items: assetFilters,
            activeItems: activeFilters,
            onChange: handleFilterChange
          }
        ]}
        tags={assetTags}
        activeTags={activeTags}
        onTagChange={handleTagChange}
        showSearch={true}
        searchPlaceholder="搜索素材..."
        onSearch={handleSearch}
        showSortFilter={false}
        activeSort={activeSort}
        onSortChange={setActiveSort}
      />
      
      {/* 素材网格 */}
      <GridLayout
        columns="auto-fill"
        minItemWidth="280px"
        isDark={isDark}
        isLoading={false}
        isEmpty={filteredAssets.length === 0}
        emptyIcon="fas fa-images"
        emptyTitle="未找到素材"
        emptyDescription="尝试修改筛选条件或上传新素材"
      >
        {filteredAssets.map(asset => {
          // 模拟获取素材所属的文件夹
          const assetFolders = projectFolders
            .filter(folder => 
              folder.id !== 'all' && 
              Math.random() > 0.7 // 这里只是模拟，实际应该根据asset.id检查是否属于文件夹
            )
            .map(folder => ({
              id: folder.id,
              name: folder.name,
              color: folder.color
            }));
            
          return (
            <ContentCard
              key={asset.id}
              image={asset.image}
              title={asset.title}
              status={asset.status}
              statusText={asset.statusText}
              isFavorite={asset.isFavorite}
              isSelected={selectedAssets.some(a => a.id === asset.id)}
              showSelectIndicator={isSelectMode}
              metaItems={[
                { icon: 'fa-calendar', text: asset.updated },
                { icon: 'fa-expand-arrows-alt', text: asset.resolution }
              ]}
              tags={asset.tags}
              aspectRatio="4/3"
              folders={assetFolders}
              onClick={() => handleAssetSelect(asset)}
              onDelete={() => handleDeleteAsset(asset)}
              showDeleteButton={!isSelectMode}
            />
          );
        })}
      </GridLayout>
      
      {/* 批量操作工具栏 */}
      <AnimatePresence>
        {showBatchActions && (
          <BatchActionBar
            isDark={isDark}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <SelectedCount isDark={isDark}>
              已选择 <span>{selectedAssets.length}</span> 个素材
            </SelectedCount>
            
            <BatchActionButton
              isDark={isDark}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenFolderManager}
            >
              <i className="fas fa-folder-plus"></i>
              移至文件夹
            </BatchActionButton>
            
            <BatchActionButton
              isDark={isDark}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => console.log('下载所选素材')}
            >
              <i className="fas fa-download"></i>
              下载
            </BatchActionButton>
            
            <BatchActionButton
              isDark={isDark}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBatchDelete}
              style={{ color: '#FF5757' }}
            >
              <i className="fas fa-trash-alt"></i>
              删除
            </BatchActionButton>
            
            <BatchActionButton
              primary
              isDark={isDark}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => console.log('使用所选素材')}
            >
              <i className="fas fa-check"></i>
              使用素材
            </BatchActionButton>
          </BatchActionBar>
        )}
      </AnimatePresence>
      
      {/* 素材详情模态框 */}
      <AnimatePresence>
        {selectedAsset && !isSelectMode && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <ModalContent
              isDark={isDark}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AssetPreview isDark={isDark}>
                <img src={selectedAsset.image} alt={selectedAsset.title} />
              </AssetPreview>
              
              <AssetInfo>
                <AssetTitle isDark={isDark}>{selectedAsset.title}</AssetTitle>
                
                <InfoSection>
                  <SectionTitle isDark={isDark}>标签</SectionTitle>
                  <TagsContainer>
                    {selectedAsset.tags.map((tag, index) => (
                      <Tag key={index} isDark={isDark}>{tag}</Tag>
                    ))}
                  </TagsContainer>
                </InfoSection>
                
                <InfoSection>
                  <SectionTitle isDark={isDark}>素材信息</SectionTitle>
                  <MetaItem isDark={isDark}>
                    <MetaLabel isDark={isDark}>类型</MetaLabel>
                    <MetaValue isDark={isDark}>
                      {selectedAsset.type === 'photo' ? '照片' : 
                       selectedAsset.type === 'vector' ? '矢量图' : '纹理'}
                    </MetaValue>
                  </MetaItem>
                  <MetaItem isDark={isDark}>
                    <MetaLabel isDark={isDark}>分辨率</MetaLabel>
                    <MetaValue isDark={isDark}>{selectedAsset.resolution}</MetaValue>
                  </MetaItem>
                  <MetaItem isDark={isDark}>
                    <MetaLabel isDark={isDark}>上传时间</MetaLabel>
                    <MetaValue isDark={isDark}>{selectedAsset.updated}</MetaValue>
                  </MetaItem>
                  <MetaItem isDark={isDark}>
                    <MetaLabel isDark={isDark}>使用限制</MetaLabel>
                    <MetaValue isDark={isDark}>商业可用</MetaValue>
                  </MetaItem>
                  <MetaItem isDark={isDark}>
                    <MetaLabel isDark={isDark}>版权</MetaLabel>
                    <MetaValue isDark={isDark}>© domiyoung__</MetaValue>
                  </MetaItem>
                </InfoSection>
                
                <InfoSection>
                  <SectionTitle isDark={isDark}>项目文件夹</SectionTitle>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                    <ActionButton 
                      isDark={isDark}
                      onClick={handleOpenFolderManager}
                    >
                      <i className="fas fa-folder-plus"></i> 添加到文件夹
                    </ActionButton>
                  </div>
                </InfoSection>
                
                <ButtonsContainer>
                  <ActionButton 
                    primary 
                    isDark={isDark}
                  >
                    <i className="fas fa-check"></i> 使用素材
                  </ActionButton>
                  <ActionButton isDark={isDark}>
                    <i className={`fas ${selectedAsset.isFavorite ? 'fa-star' : 'fa-star'}`}></i>
                    {selectedAsset.isFavorite ? '取消收藏' : '收藏'}
                  </ActionButton>
                </ButtonsContainer>
              </AssetInfo>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
      
      {/* 上传素材模态框 */}
      <AssetUploadModal 
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
      />
      
      {/* 文件夹管理模态框 */}
      <AssetFolderManager
        isOpen={isFolderManagerOpen}
        onClose={() => setIsFolderManagerOpen(false)}
        selectedAssets={selectedAssets}
      />
      
      {/* 删除确认对话框 */}
      {assetToDelete && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          {...getDeleteConfirmInfo()}
        />
      )}
    </PageLayout>
  );
};

export default AssetLibrary; 