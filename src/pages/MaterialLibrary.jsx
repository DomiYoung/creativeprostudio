import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design-system';
import styled from '@emotion/styled';

// Material UI Icons
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FolderIcon from '@mui/icons-material/Folder';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.isDark ? '#121212' : '#f5f5f7'};
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  background-color: ${props => props.isDark ? '#1c1c1e' : 'white'};
  border-bottom: 1px solid ${props => props.isDark ? '#2c2c2e' : '#e0e0e0'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, ${props => props.isDark ? 0.2 : 0.05});
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  
  ${props => props.primary ? `
    background-color: ${props.isDark ? '#0066cc' : '#0071e3'};
    color: white;
    border: none;
    
    &:hover {
      background-color: ${props.isDark ? '#0077e6' : '#0077ed'};
    }
  ` : `
    background-color: ${props.isDark ? '#2c2c2e' : '#f5f5f7'};
    color: ${props.isDark ? '#f5f5f7' : '#1d1d1f'};
    border: 1px solid ${props.isDark ? '#3c3c3e' : '#d2d2d7'};
    
    &:hover {
      background-color: ${props.isDark ? '#3c3c3e' : '#e5e5ea'};
    }
  `}
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const SearchFilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.isDark ? '#2c2c2e' : '#f5f5f7'};
  border: 1px solid ${props => props.isDark ? '#3c3c3e' : '#d2d2d7'};
  border-radius: 8px;
  padding: 0 16px;
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  padding: 12px;
  font-size: 14px;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.isDark ? '#8e8e93' : '#86868b'};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${props => props.isDark ? '#2c2c2e' : '#f5f5f7'};
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  border: 1px solid ${props => props.isDark ? '#3c3c3e' : '#d2d2d7'};
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.isDark ? '#3c3c3e' : '#e5e5ea'};
  }
`;

const ViewToggleContainer = styled.div`
  display: flex;
  border: 1px solid ${props => props.isDark ? '#3c3c3e' : '#d2d2d7'};
  border-radius: 8px;
  overflow: hidden;
`;

const ViewToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active 
    ? (props.isDark ? '#3c3c3e' : '#e5e5ea') 
    : (props.isDark ? '#2c2c2e' : '#f5f5f7')};
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => !props.active && (props.isDark ? '#3c3c3e' : '#e5e5ea')};
  }
`;

const MaterialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const MaterialsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 16px;
  text-align: center;
  color: ${props => props.isDark ? '#8e8e93' : '#86868b'};

  svg {
    margin-bottom: 16px;
    font-size: 48px;
    color: ${props => props.isDark ? '#3c3c3e' : '#d2d2d7'};
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 8px;
    color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  }

  p {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

// Material cards for grid view
const MaterialCard = styled(motion.div)`
  border-radius: 12px;
  overflow: hidden;
  background-color: ${props => props.isDark ? '#1c1c1e' : 'white'};
  border: 1px solid ${props => props.isDark ? '#2c2c2e' : '#e0e0e0'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, ${props => props.isDark ? 0.2 : 0.05});
  cursor: pointer;
  position: relative;
`;

const MaterialThumbnail = styled.div`
  height: 160px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const MaterialInfo = styled.div`
  padding: 16px;
`;

const MaterialTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MaterialMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: ${props => props.isDark ? '#8e8e93' : '#86868b'};
  margin-bottom: 12px;
`;

const MaterialTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
`;

const MaterialTag = styled.span`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
`;

const MaterialActions = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 8px;
`;

// Material list items
const MaterialListItem = styled(motion.div)`
  display: flex;
  background-color: ${props => props.isDark ? '#1c1c1e' : 'white'};
  border: 1px solid ${props => props.isDark ? '#2c2c2e' : '#e0e0e0'};
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, ${props => props.isDark ? 0.2 : 0.05});
  overflow: hidden;
  cursor: pointer;
`;

const ListItemThumbnail = styled.div`
  width: 120px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const ListItemContent = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListItemInfo = styled.div`
  flex: 1;
`;

const ListItemTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  margin: 0 0 8px 0;
`;

const ListItemMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: ${props => props.isDark ? '#8e8e93' : '#86868b'};
`;

const ListItemActions = styled.div`
  display: flex;
  gap: 8px;
`;

const StarButton = styled(IconButton)`
  color: ${props => props.starred ? '#FFB800' : (props.isDark ? '#8e8e93' : '#86868b')};
  
  &:hover {
    color: ${props => props.starred ? '#FFB800' : (props.isDark ? '#f5f5f7' : '#1d1d1f')};
  }
`;

// Material detail panel
const DetailPanel = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 360px;
  background-color: ${props => props.isDark ? '#1c1c1e' : 'white'};
  box-shadow: -2px 0 10px rgba(0, 0, 0, ${props => props.isDark ? 0.3 : 0.1});
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${props => props.isDark ? '#2c2c2e' : '#e0e0e0'};
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${props => props.isDark ? '#2c2c2e' : '#e0e0e0'};
`;

const DetailTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  margin: 0;
`;

const DetailCloseButton = styled(IconButton)`
  color: ${props => props.isDark ? '#8e8e93' : '#86868b'};
`;

const DetailContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const DetailImage = styled.div`
  width: 100%;
  height: 240px;
  background-image: url(${props => props.image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 24px;
  border-radius: 8px;
  background-color: ${props => props.isDark ? '#2c2c2e' : '#f5f5f7'};
`;

const DetailSection = styled.div`
  margin-bottom: 24px;
`;

const DetailSectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid ${props => props.isDark ? '#2c2c2e' : '#e0e0e0'};
`;

const PropertyList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;
`;

const Property = styled.div``;

const PropertyLabel = styled.div`
  font-size: 12px;
  color: ${props => props.isDark ? '#8e8e93' : '#86868b'};
  margin-bottom: 4px;
`;

const PropertyValue = styled.div`
  font-size: 14px;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  font-weight: 500;
`;

const DetailFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid ${props => props.isDark ? '#2c2c2e' : '#e0e0e0'};
`;

// Mock data for materials
const mockMaterials = [
  {
    id: '1',
    name: '素材A',
    type: '产品图',
    thumbnail: 'https://source.unsplash.com/random/300x300?makeup,1',
    uploadDate: '2025-04-15',
    fileSize: '1.2 MB',
    dimensions: '1200 x 800',
    starred: true,
    tags: ['产品', '美妆', '新品']
  },
  {
    id: '2',
    name: '素材B',
    type: '模特图',
    thumbnail: 'https://source.unsplash.com/random/300x300?model,2',
    uploadDate: '2025-04-14',
    fileSize: '1.8 MB',
    dimensions: '1500 x 1000',
    starred: false,
    tags: ['模特', '美妆', '时尚']
  },
  {
    id: '3',
    name: '素材C',
    type: '背景',
    thumbnail: 'https://source.unsplash.com/random/300x300?background,3',
    uploadDate: '2025-04-12',
    fileSize: '2.4 MB',
    dimensions: '1920 x 1080',
    starred: true,
    tags: ['背景', '纹理', '抽象']
  },
  {
    id: '4',
    name: '素材D',
    type: '装饰元素',
    thumbnail: 'https://source.unsplash.com/random/300x300?decoration,4',
    uploadDate: '2025-04-10',
    fileSize: '0.8 MB',
    dimensions: '800 x 800',
    starred: false,
    tags: ['装饰', '边框', '图案']
  },
  {
    id: '5',
    name: '素材E',
    type: '图标',
    thumbnail: 'https://source.unsplash.com/random/300x300?icon,5',
    uploadDate: '2025-04-08',
    fileSize: '0.5 MB',
    dimensions: '512 x 512',
    starred: false,
    tags: ['图标', '线性', '界面']
  },
  {
    id: '6',
    name: '素材F',
    type: '产品图',
    thumbnail: 'https://source.unsplash.com/random/300x300?product,6',
    uploadDate: '2025-04-05',
    fileSize: '1.5 MB',
    dimensions: '1200 x 900',
    starred: true,
    tags: ['产品', '包装', '展示']
  }
];

// Material categories and filters
const materialCategories = ['所有素材', '产品图', '模特图', '背景', '装饰元素', '图标'];

const MaterialLibrary = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // State management
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('所有素材');
  const [materials, setMaterials] = useState(mockMaterials);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  
  // Handle navigation back
  const handleBack = () => {
    navigate(-1);
  };
  
  // Handle material click
  const handleMaterialClick = (material) => {
    setSelectedMaterial(material);
    setShowDetailPanel(true);
  };
  
  // Toggle starred status
  const toggleStar = (id, e) => {
    e.stopPropagation(); // Prevent click from bubbling to the card
    setMaterials(materials.map(material => 
      material.id === id ? {...material, starred: !material.starred} : material
    ));
  };
  
  // Close detail panel
  const handleCloseDetail = () => {
    setShowDetailPanel(false);
  };
  
  // Filter materials based on search and category
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === '所有素材' || material.type === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Container isDark={isDark}>
      <Header isDark={isDark}>
        <BackButton onClick={handleBack} isDark={isDark}>
          <ArrowBackIosNewIcon fontSize="small" />
          返回
        </BackButton>
        <Title isDark={isDark}>素材库</Title>
        <ActionButtons>
          <ActionButton isDark={isDark}>
            <FileUploadIcon fontSize="small" />
            上传素材
          </ActionButton>
          <ActionButton primary isDark={isDark}>
            <AddIcon fontSize="small" />
            创建文件夹
          </ActionButton>
        </ActionButtons>
      </Header>
      
      <MainContent>
        {/* Search and filter bar */}
        <SearchFilterBar>
          <SearchContainer isDark={isDark}>
            <SearchIcon style={{ color: isDark ? '#8e8e93' : '#86868b' }} />
            <SearchInput 
              placeholder="搜索素材..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              isDark={isDark}
            />
          </SearchContainer>
          
          <FilterContainer>
            <FilterButton isDark={isDark}>
              <FilterListIcon />
              筛选
            </FilterButton>
            <FilterButton isDark={isDark}>
              <SortIcon />
              排序
            </FilterButton>
            <ViewToggleContainer isDark={isDark}>
              <ViewToggleButton 
                active={viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
                isDark={isDark}
              >
                <GridViewIcon />
              </ViewToggleButton>
              <ViewToggleButton 
                active={viewMode === 'list'}
                onClick={() => setViewMode('list')}
                isDark={isDark}
              >
                <ViewListIcon />
              </ViewToggleButton>
            </ViewToggleContainer>
          </FilterContainer>
        </SearchFilterBar>
        
        {/* Material categories */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '24px', 
          overflowX: 'auto', 
          paddingBottom: '8px'
        }}>
          {materialCategories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                border: isDark ? 
                  (activeCategory === category ? '1px solid #0066cc' : '1px solid #3c3c3e') : 
                  (activeCategory === category ? '1px solid #0071e3' : '1px solid #d2d2d7'),
                backgroundColor: activeCategory === category ? 
                  (isDark ? '#0066cc' : '#0071e3') : 
                  (isDark ? '#2c2c2e' : '#f5f5f7'),
                color: activeCategory === category ? '#ffffff' : (isDark ? '#f5f5f7' : '#1d1d1f'),
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Display empty state if no materials */}
        {filteredMaterials.length === 0 ? (
          <EmptyState isDark={isDark}>
            <FolderIcon fontSize="large" />
            <h3>没有找到素材</h3>
            <p>尝试使用不同的搜索条件或上传新素材</p>
            <ActionButton primary isDark={isDark}>
              上传素材
            </ActionButton>
          </EmptyState>
        ) : (
          // Display materials in grid or list view
          viewMode === 'grid' ? (
            <MaterialsGrid>
              {filteredMaterials.map(material => (
                <MaterialCard 
                  key={material.id}
                  isDark={isDark}
                  whileHover={{ 
                    y: -5,
                    boxShadow: isDark 
                      ? '0 8px 20px rgba(0, 0, 0, 0.3)' 
                      : '0 8px 16px rgba(0, 0, 0, 0.1)'
                  }}
                  onClick={() => handleMaterialClick(material)}
                >
                  <MaterialThumbnail image={material.thumbnail}>
                    <MaterialActions>
                      <StarButton 
                        isDark={isDark}
                        starred={material.starred}
                        onClick={(e) => toggleStar(material.id, e)}
                        aria-label={material.starred ? "取消收藏" : "收藏"}
                      >
                        {material.starred ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </StarButton>
                      <IconButton isDark={isDark} aria-label="更多选项">
                        <MoreVertIcon />
                      </IconButton>
                    </MaterialActions>
                  </MaterialThumbnail>
                  <MaterialInfo>
                    <MaterialTitle isDark={isDark}>
                      {material.name}
                    </MaterialTitle>
                    <MaterialMeta isDark={isDark}>
                      <div>{material.type}</div>
                      <div>{material.dimensions}</div>
                    </MaterialMeta>
                    <MaterialTags>
                      {material.tags.map(tag => (
                        <MaterialTag key={tag} isDark={isDark}>
                          {tag}
                        </MaterialTag>
                      ))}
                    </MaterialTags>
                  </MaterialInfo>
                </MaterialCard>
              ))}
            </MaterialsGrid>
          ) : (
            <MaterialsList>
              {filteredMaterials.map(material => (
                <MaterialListItem 
                  key={material.id}
                  isDark={isDark}
                  whileHover={{ 
                    y: -2,
                    boxShadow: isDark 
                      ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                      : '0 4px 10px rgba(0, 0, 0, 0.08)'
                  }}
                  onClick={() => handleMaterialClick(material)}
                >
                  <ListItemThumbnail image={material.thumbnail} />
                  <ListItemContent>
                    <ListItemInfo>
                      <ListItemTitle isDark={isDark}>
                        {material.name}
                      </ListItemTitle>
                      <ListItemMeta isDark={isDark}>
                        <div>{material.type}</div>
                        <div>{material.dimensions}</div>
                        <div>{material.fileSize}</div>
                      </ListItemMeta>
                    </ListItemInfo>
                    <ListItemActions>
                      <StarButton 
                        isDark={isDark}
                        starred={material.starred}
                        onClick={(e) => toggleStar(material.id, e)}
                        aria-label={material.starred ? "取消收藏" : "收藏"}
                      >
                        {material.starred ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </StarButton>
                      <IconButton isDark={isDark} aria-label="下载">
                        <FileDownloadIcon />
                      </IconButton>
                      <IconButton isDark={isDark} aria-label="更多选项">
                        <MoreVertIcon />
                      </IconButton>
                    </ListItemActions>
                  </ListItemContent>
                </MaterialListItem>
              ))}
            </MaterialsList>
          )
        )}
        
        {/* Material detail panel */}
        <AnimatePresence>
          {showDetailPanel && selectedMaterial && (
            <DetailPanel
              isDark={isDark}
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <DetailHeader isDark={isDark}>
                <DetailTitle isDark={isDark}>素材详情</DetailTitle>
                <DetailCloseButton 
                  isDark={isDark} 
                  onClick={handleCloseDetail}
                  aria-label="关闭详情"
                >
                  <CloseIcon />
                </DetailCloseButton>
              </DetailHeader>
              
              <DetailContent>
                <DetailImage 
                  image={selectedMaterial.thumbnail}
                  isDark={isDark}
                />
                
                <DetailSection>
                  <DetailSectionTitle isDark={isDark}>基本信息</DetailSectionTitle>
                  <PropertyList>
                    <Property>
                      <PropertyLabel isDark={isDark}>名称</PropertyLabel>
                      <PropertyValue isDark={isDark}>{selectedMaterial.name}</PropertyValue>
                    </Property>
                    <Property>
                      <PropertyLabel isDark={isDark}>类型</PropertyLabel>
                      <PropertyValue isDark={isDark}>{selectedMaterial.type}</PropertyValue>
                    </Property>
                    <Property>
                      <PropertyLabel isDark={isDark}>尺寸</PropertyLabel>
                      <PropertyValue isDark={isDark}>{selectedMaterial.dimensions}</PropertyValue>
                    </Property>
                    <Property>
                      <PropertyLabel isDark={isDark}>文件大小</PropertyLabel>
                      <PropertyValue isDark={isDark}>{selectedMaterial.fileSize}</PropertyValue>
                    </Property>
                    <Property>
                      <PropertyLabel isDark={isDark}>上传时间</PropertyLabel>
                      <PropertyValue isDark={isDark}>{selectedMaterial.uploadDate}</PropertyValue>
                    </Property>
                  </PropertyList>
                </DetailSection>
                
                <DetailSection>
                  <DetailSectionTitle isDark={isDark}>标签</DetailSectionTitle>
                  <MaterialTags>
                    {selectedMaterial.tags.map(tag => (
                      <MaterialTag key={tag} isDark={isDark}>
                        {tag}
                      </MaterialTag>
                    ))}
                  </MaterialTags>
                </DetailSection>
                
                <DetailSection>
                  <DetailSectionTitle isDark={isDark}>使用记录</DetailSectionTitle>
                  <div style={{ 
                    color: isDark ? '#8e8e93' : '#86868b',
                    fontSize: '14px',
                    fontStyle: 'italic'
                  }}>
                    暂无使用记录
                  </div>
                </DetailSection>
              </DetailContent>
              
              <DetailFooter isDark={isDark}>
                <ActionButton isDark={isDark}>
                  <EditIcon fontSize="small" />
                  编辑
                </ActionButton>
                <ActionButton isDark={isDark}>
                  <ShareIcon fontSize="small" />
                  分享
                </ActionButton>
                <ActionButton primary isDark={isDark}>
                  <FileDownloadIcon fontSize="small" />
                  下载
                </ActionButton>
              </DetailFooter>
            </DetailPanel>
          )}
        </AnimatePresence>
        
        {/* Copyright footer */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '40px', 
          fontSize: '12px', 
          color: isDark ? '#8e8e93' : '#86868b'
        }}>
          © 2025 domiyoung__ | All Rights Reserved
        </div>
      </MainContent>
    </Container>
  );
};

export default MaterialLibrary; 