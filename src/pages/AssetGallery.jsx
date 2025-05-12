import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme, Button } from '../design-system';

// 图标导入
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddIcon from '@mui/icons-material/Add';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SortIcon from '@mui/icons-material/Sort';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// 样式组件
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.isDark ? '#121212' : '#f5f5f7'};
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', Helvetica, Arial, sans-serif;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
`;

const Header = styled.header`
  height: 60px;
  background-color: ${props => props.isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.isDark ? '#333' : '#e0e0e0'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  color: #0066cc;
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 102, 204, 0.05);
  }

  svg {
    font-size: 18px;
    margin-right: 4px;
  }
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const SearchBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: ${props => props.isDark ? '#2d2d2d' : 'white'};
  border: 1px solid ${props => props.isDark ? '#444' : '#e0e0e0'};
  border-radius: 8px;
  padding: 0 12px;
  transition: all 0.2s;

  &:focus-within {
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
  }

  svg {
    color: ${props => props.isDark ? '#888' : '#86868b'};
    margin-right: 8px;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 12px 0;
    font-size: 14px;
    background-color: transparent;
    color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};

    &::placeholder {
      color: ${props => props.isDark ? '#777' : '#aaa'};
    }
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  background-color: ${props => props.active ? (props.isDark ? '#333' : '#f0f0f0') : (props.isDark ? '#2d2d2d' : 'white')};
  border: 1px solid ${props => props.isDark ? '#444' : '#e0e0e0'};
  border-radius: 8px;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.isDark ? '#333' : '#f0f0f0'};
  }

  svg {
    margin-right: 6px;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.isDark ? '#2d2d2d' : 'white'};
  border: 1px solid ${props => props.isDark ? '#444' : '#e0e0e0'};
  border-radius: 8px;
  overflow: hidden;
`;

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background-color: ${props => props.active ? (props.isDark ? '#444' : '#f0f0f0') : 'transparent'};
  border: none;
  color: ${props => props.active ? (props.isDark ? '#f5f5f7' : '#1d1d1f') : (props.isDark ? '#888' : '#86868b')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.isDark ? '#333' : '#f5f5f7'};
  }

  svg {
    font-size: 20px;
  }
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
`;

const FilterChip = styled.button`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background-color: ${props => props.active ? (props.isDark ? '#60a5fa' : '#0066cc') : (props.isDark ? '#2d2d2d' : 'white')};
  border: 1px solid ${props => props.active ? (props.isDark ? '#60a5fa' : '#0066cc') : (props.isDark ? '#444' : '#e0e0e0')};
  border-radius: 100px;
  color: ${props => props.active ? 'white' : (props.isDark ? '#f5f5f7' : '#1d1d1f')};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? (props.isDark ? '#4d8eeb' : '#0055aa') : (props.isDark ? '#333' : '#f5f5f7')};
  }
`;

const AiRecommendations = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    color: ${props => props.accent ? (props.isDark ? '#60a5fa' : '#0066cc') : 'inherit'};
  }
`;

const RecommendationScroll = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 8px 0 16px;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.isDark ? '#2d2d2d' : '#f0f0f0'};
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.isDark ? '#444' : '#c0c0c0'};
    border-radius: 6px;
  }
`;

const AssetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const AssetList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AssetCard = styled(motion.div)`
  border-radius: 12px;
  overflow: hidden;
  background-color: ${props => props.isDark ? '#2d2d2d' : 'white'};
  box-shadow: 0 2px 6px rgba(0, 0, 0, ${props => props.isDark ? '0.3' : '0.1'});
  transition: transform 0.2s;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-4px);
  }
`;

const AssetImage = styled.div`
  height: 180px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const AssetOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 12px;
  opacity: 0;
  transition: opacity 0.2s;

  ${AssetCard}:hover & {
    opacity: 1;
  }
`;

const AssetInfo = styled.div`
  padding: 12px;
`;

const AssetName = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  margin: 0 0 4px 0;
`;

const AssetMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const AssetCategory = styled.span`
  font-size: 12px;
  color: ${props => props.isDark ? '#888' : '#86868b'};
`;

const AssetDate = styled.span`
  font-size: 12px;
  color: ${props => props.isDark ? '#888' : '#86868b'};
  display: flex;
  align-items: center;
  
  svg {
    font-size: 14px;
    margin-right: 4px;
  }
`;

const AssetAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-top: 1px solid ${props => props.isDark ? '#444' : '#f0f0f0'};
`;

const FavoriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${props => props.favorite ? '#ff4d4f' : (props.isDark ? '#888' : '#86868b')};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 77, 79, 0.1);
    color: #ff4d4f;
  }

  svg {
    font-size: 20px;
  }
`;

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${props => props.isDark ? '#888' : '#86868b'};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.isDark ? '#444' : '#f0f0f0'};
  }

  svg {
    font-size: 20px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  text-align: center;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
    margin: 16px 0 8px;
  }

  p {
    font-size: 14px;
    color: ${props => props.isDark ? '#888' : '#86868b'};
    max-width: 400px;
    margin: 0 auto 24px;
  }

  img {
    width: 120px;
    margin-bottom: 16px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 8px;
`;

const PageButton = styled.button`
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid ${props => props.active ? (props.isDark ? '#60a5fa' : '#0066cc') : (props.isDark ? '#444' : '#e0e0e0')};
  background-color: ${props => props.active ? (props.isDark ? '#60a5fa' : '#0066cc') : 'transparent'};
  color: ${props => props.active ? 'white' : (props.isDark ? '#f5f5f7' : '#1d1d1f')};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${props => props.active ? (props.isDark ? '#4d8eeb' : '#0055aa') : (props.isDark ? '#333' : '#f0f0f0')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 模拟数据 - 资产列表
const mockAssets = [
  { 
    id: 1, 
    name: "夏季彩妆图库", 
    category: "美妆", 
    image: "https://source.unsplash.com/random/400x300?makeup",
    date: "2023-05-15",
    favorite: true,
    tags: ["夏季", "彩妆", "图片"]
  },
  { 
    id: 2, 
    name: "新品发布模板", 
    category: "模板", 
    image: "https://source.unsplash.com/random/400x300?product",
    date: "2023-05-12",
    favorite: false,
    tags: ["新品", "发布", "模板"]
  },
  { 
    id: 3, 
    name: "护肤品展示视频", 
    category: "视频", 
    image: "https://source.unsplash.com/random/400x300?skincare",
    date: "2023-05-10",
    favorite: false,
    tags: ["护肤", "视频", "展示"]
  },
  { 
    id: 4, 
    name: "社交媒体图文套装", 
    category: "套装", 
    image: "https://source.unsplash.com/random/400x300?social",
    date: "2023-05-08",
    favorite: true,
    tags: ["社交", "图文", "套装"]
  },
  { 
    id: 5, 
    name: "香水产品背景", 
    category: "背景", 
    image: "https://source.unsplash.com/random/400x300?perfume",
    date: "2023-05-05",
    favorite: false,
    tags: ["香水", "背景", "产品"]
  },
  { 
    id: 6, 
    name: "粉色渐变UI套件", 
    category: "UI", 
    image: "https://source.unsplash.com/random/400x300?pink",
    date: "2023-05-03",
    favorite: true,
    tags: ["粉色", "渐变", "UI"]
  },
  { 
    id: 7, 
    name: "口红产品展示", 
    category: "展示", 
    image: "https://source.unsplash.com/random/400x300?lipstick",
    date: "2023-04-28",
    favorite: false,
    tags: ["口红", "展示", "产品"]
  },
  { 
    id: 8, 
    name: "时尚杂志封面", 
    category: "封面", 
    image: "https://source.unsplash.com/random/400x300?fashion",
    date: "2023-04-25",
    favorite: true,
    tags: ["时尚", "杂志", "封面"]
  },
];

// 模拟数据 - AI推荐
const mockRecommendations = [
  { 
    id: 101, 
    name: "夏日美妆趋势", 
    category: "推荐集", 
    image: "https://source.unsplash.com/random/400x300?summer"
  },
  { 
    id: 102, 
    name: "Z世代色彩学", 
    category: "灵感", 
    image: "https://source.unsplash.com/random/400x300?colors"
  },
  { 
    id: 103, 
    name: "极简风产品展示", 
    category: "模板", 
    image: "https://source.unsplash.com/random/400x300?minimal"
  },
  { 
    id: 104, 
    name: "渐变霓虹效果", 
    category: "特效", 
    image: "https://source.unsplash.com/random/400x300?neon"
  },
  { 
    id: 105, 
    name: "潮流文字排版", 
    category: "字体", 
    image: "https://source.unsplash.com/random/400x300?typography"
  },
];

// 过滤类别
const filterCategories = [
  "全部", "美妆", "模板", "视频", "套装", "背景", "UI", "展示", "封面"
];

const AssetGallery = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 状态管理
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('全部');
  const [viewMode, setViewMode] = useState('grid');
  const [assets, setAssets] = useState(mockAssets);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  // 处理返回
  const handleBack = () => {
    navigate(-1);
  };

  // 处理搜索
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // 处理过滤器切换
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // 处理标签选择
  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 处理收藏切换
  const handleFavoriteToggle = (id) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, favorite: !asset.favorite } : asset
    ));
  };

  // 处理资产点击
  const handleAssetClick = (id) => {
    navigate(`/asset/${id}`);
  };

  // 处理资产创建
  const handleCreateAsset = () => {
    navigate('/canvas-editor');
  };

  // 过滤资产
  const filteredAssets = assets.filter(asset => {
    // 搜索过滤
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          asset.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 类别过滤
    const matchesCategory = activeFilter === '全部' || asset.category === activeFilter;
    
    // 标签过滤
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.every(tag => asset.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  // 获取所有可用标签
  const allTags = [...new Set(assets.flatMap(asset => asset.tags))];
  
  // 动画变体
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <Container isDark={isDark}>
      <Header isDark={isDark}>
        <HeaderLeft>
          <BackButton onClick={handleBack} style={{color: isDark ? '#60a5fa' : '#0066cc'}}>
            <ArrowBackIosNewIcon fontSize="small" />
            返回
          </BackButton>
          <Title isDark={isDark}>资产库</Title>
        </HeaderLeft>
        
        <HeaderRight>
          <Button
            variant="primary"
            size="md"
            leftIcon={<AddIcon fontSize="small" />}
            onClick={handleCreateAsset}
          >
            创建资产
          </Button>
        </HeaderRight>
      </Header>
      
      <MainContent>
        <SearchContainer>
          <SearchBar isDark={isDark}>
            <SearchIcon />
            <input 
              type="text" 
              placeholder="搜索资产..." 
              value={searchQuery}
              onChange={handleSearch}
            />
          </SearchBar>
          
          <FilterButton 
            active={showFilters}
            isDark={isDark}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterListIcon />
            筛选
          </FilterButton>
          
          <FilterButton isDark={isDark}>
            <SortIcon />
            排序
          </FilterButton>
          
          <ViewToggle isDark={isDark}>
            <ViewButton 
              active={viewMode === 'grid'}
              isDark={isDark}
              onClick={() => setViewMode('grid')}
            >
              <GridViewIcon />
            </ViewButton>
            <ViewButton 
              active={viewMode === 'list'}
              isDark={isDark}
              onClick={() => setViewMode('list')}
            >
              <ViewListIcon />
            </ViewButton>
          </ViewToggle>
        </SearchContainer>
        
        {showFilters && (
          <Filters>
            {filterCategories.map(filter => (
              <FilterChip 
                key={filter} 
                active={activeFilter === filter}
                isDark={isDark}
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </FilterChip>
            ))}
            
            <div style={{ width: '100%', height: '1px', backgroundColor: isDark ? '#333' : '#e0e0e0', margin: '8px 0' }} />
            
            {allTags.map(tag => (
              <FilterChip 
                key={tag} 
                active={selectedTags.includes(tag)}
                isDark={isDark}
                onClick={() => handleTagSelect(tag)}
              >
                #{tag}
              </FilterChip>
            ))}
          </Filters>
        )}
        
        <AiRecommendations>
          <SectionTitle isDark={isDark} accent>
            <AutoFixHighIcon />
            为您推荐
          </SectionTitle>
          <RecommendationScroll isDark={isDark}>
            {mockRecommendations.map((rec) => (
              <AssetCard 
                key={rec.id} 
                isDark={isDark}
                style={{ minWidth: '220px' }}
                onClick={() => navigate(`/asset/${rec.id}`)}
                whileHover={{ y: -5 }}
              >
                <AssetImage src={rec.image} />
                <AssetInfo>
                  <AssetName isDark={isDark}>{rec.name}</AssetName>
                  <AssetCategory isDark={isDark}>{rec.category}</AssetCategory>
                </AssetInfo>
              </AssetCard>
            ))}
          </RecommendationScroll>
        </AiRecommendations>
        
        <SectionTitle isDark={isDark}>
          <CollectionsBookmarkIcon />
          全部资产
        </SectionTitle>
        
        {filteredAssets.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              <AssetGrid>
                {filteredAssets.map((asset, index) => (
                  <AssetCard 
                    key={asset.id} 
                    isDark={isDark}
                    onClick={() => handleAssetClick(asset.id)}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <AssetImage src={asset.image}>
                      <AssetOverlay>
                        <Button
                          variant="primary"
                          size="sm"
                          fullWidth
                        >
                          查看详情
                        </Button>
                      </AssetOverlay>
                    </AssetImage>
                    <AssetInfo>
                      <AssetName isDark={isDark}>{asset.name}</AssetName>
                      <AssetMeta>
                        <AssetCategory isDark={isDark}>{asset.category}</AssetCategory>
                        <AssetDate isDark={isDark}>
                          <AccessTimeIcon fontSize="small" />
                          {asset.date}
                        </AssetDate>
                      </AssetMeta>
                    </AssetInfo>
                    <AssetAction isDark={isDark}>
                      <FavoriteButton 
                        favorite={asset.favorite}
                        isDark={isDark}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavoriteToggle(asset.id);
                        }}
                      >
                        {asset.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </FavoriteButton>
                      <MoreButton 
                        isDark={isDark}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <MoreVertIcon />
                      </MoreButton>
                    </AssetAction>
                  </AssetCard>
                ))}
              </AssetGrid>
            ) : (
              <AssetList>
                {filteredAssets.map((asset, index) => (
                  <motion.div
                    key={asset.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <div 
                      style={{
                        display: 'flex',
                        backgroundColor: isDark ? '#2d2d2d' : 'white',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleAssetClick(asset.id)}
                    >
                      <div style={{ width: '120px', height: '120px', flexShrink: 0 }}>
                        <AssetImage src={asset.image} style={{ height: '100%' }} />
                      </div>
                      <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
                        <AssetName isDark={isDark}>{asset.name}</AssetName>
                        <AssetCategory isDark={isDark}>{asset.category}</AssetCategory>
                        <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                          {asset.tags.map(tag => (
                            <span 
                              key={tag}
                              style={{
                                fontSize: '12px',
                                padding: '2px 8px',
                                backgroundColor: isDark ? '#444' : '#f0f0f0',
                                borderRadius: '100px',
                                color: isDark ? '#f5f5f7' : '#1d1d1f'
                              }}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div style={{ 
                        width: '100px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        borderLeft: `1px solid ${isDark ? '#444' : '#f0f0f0'}`
                      }}>
                        <AssetDate isDark={isDark} style={{ marginBottom: '8px' }}>
                          <AccessTimeIcon fontSize="small" />
                          {asset.date}
                        </AssetDate>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <FavoriteButton 
                            favorite={asset.favorite}
                            isDark={isDark}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFavoriteToggle(asset.id);
                            }}
                          >
                            {asset.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                          </FavoriteButton>
                          <MoreButton
                            isDark={isDark}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <MoreVertIcon />
                          </MoreButton>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AssetList>
            )}
            
            <Pagination>
              <PageButton 
                disabled={currentPage === 1}
                isDark={isDark}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                上一页
              </PageButton>
              {[1, 2, 3].map(page => (
                <PageButton 
                  key={page}
                  active={currentPage === page}
                  isDark={isDark}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PageButton>
              ))}
              <PageButton 
                disabled={currentPage === 3}
                isDark={isDark}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                下一页
              </PageButton>
            </Pagination>
          </>
        ) : (
          <EmptyState isDark={isDark}>
            <img src="https://source.unsplash.com/random/120x120?empty" alt="No results" />
            <h3>未找到匹配的资产</h3>
            <p>尝试使用不同的搜索词或过滤条件，或者创建一个新资产</p>
            <Button
              variant="primary"
              size="md"
              leftIcon={<AddIcon fontSize="small" />}
              onClick={handleCreateAsset}
            >
              创建新资产
            </Button>
          </EmptyState>
        )}
      </MainContent>
    </Container>
  );
};

export default AssetGallery; 