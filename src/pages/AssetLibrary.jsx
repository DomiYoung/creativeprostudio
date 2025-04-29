import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design-system';

// 导入统一组件
import PageLayout from '../design-system/components/PageLayout';
import ContentCard from '../design-system/components/ContentCard';
import GridLayout from '../design-system/components/GridLayout';
import FilterBar from '../design-system/components/FilterBar';

// 素材库样式
import styled from '@emotion/styled';

// 模拟数据
const assetCategories = ['所有素材', '产品图', '模特图', '背景', '装饰元素', '图标'];

const assetTags = [
  { id: 'new', label: '最新上传' },
  { id: 'popular', label: '热门素材' },
  { id: 'favorites', label: '收藏' }
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

// 主组件
const AssetLibrary = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 状态管理
  const [activeCategory, setActiveCategory] = useState('所有素材');
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState('最新');
  const [selectedAsset, setSelectedAsset] = useState(null);
  
  // 面包屑导航
  const breadcrumbs = [
    { label: '首页', path: '/creativeprostudio/prototype' },
    { label: '素材库', path: '/creativeprostudio/asset-library' }
  ];
  
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
  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
  };
  
  // 关闭素材详情
  const handleCloseModal = () => {
    setSelectedAsset(null);
  };
  
  // 上传按钮点击
  const handleUploadClick = () => {
    // 上传功能实现
    console.log('Upload clicked');
  };
  
  // 过滤数据
  const filteredAssets = mockAssets;
  
  return (
    <PageLayout
      title="素材库"
      description="查找高质量素材，打造精美设计。所有素材均可直接用于商业项目。"
      breadcrumbs={breadcrumbs}
      activeNav="asset-library"
    >
      {/* 筛选栏 */}
      <FilterBar
        segments={assetCategories}
        activeSegment={activeCategory}
        onSegmentChange={setActiveCategory}
        filters={assetFilters}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        tags={assetTags}
        activeTags={activeTags}
        onTagChange={handleTagChange}
        showSearch={true}
        searchPlaceholder="搜索素材..."
        onSearch={handleSearch}
        showSortFilter={true}
        sortOptions={['最新', '最早', '名称', '热门']}
        activeSort={activeSort}
        onSortChange={setActiveSort}
        actions={[
          <UploadButton 
            whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(255, 145, 144, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUploadClick}
          >
            <i className="fas fa-upload"></i> 上传素材
          </UploadButton>
        ]}
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
        {filteredAssets.map(asset => (
          <ContentCard
            key={asset.id}
            image={asset.image}
            title={asset.title}
            status={asset.status}
            statusText={asset.statusText}
            isFavorite={asset.isFavorite}
            metaItems={[
              { icon: 'fa-calendar', text: asset.updated },
              { icon: 'fa-expand-arrows-alt', text: asset.resolution }
            ]}
            tags={asset.tags}
            aspectRatio="4/3"
            onClick={() => handleAssetClick(asset)}
          />
        ))}
      </GridLayout>
      
      {/* 素材详情模态框 */}
      <AnimatePresence>
        {selectedAsset && (
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
    </PageLayout>
  );
};

export default AssetLibrary; 