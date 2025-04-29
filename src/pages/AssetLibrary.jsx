import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design-system';
import styled from '@emotion/styled';

// 导入资产库mock数据
import { 
  folderTypes, 
  brandFolders, 
  categories, 
  tags, 
  assetItems 
} from '../data/mock/assets';

// App container
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.isDark ? 'var(--gray-900)' : 'var(--gray6)'};
  color: ${props => props.isDark ? 'var(--gray-100)' : 'var(--gray-900)'};
`;

// Header
const AppHeader = styled.header`
  height: 64px;
  background-color: ${props => props.isDark ? 'var(--gray-800)' : 'white'};
  border-bottom: 1px solid ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray-200)'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 16px;
  
  img {
    height: 32px;
    width: auto;
  }
  
  span {
    color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
  }
`;

const HeaderNav = styled.nav`
  display: flex;
  gap: 24px;
`;

const NavLink = styled.a`
  color: ${props => props.isDark ? 'var(--gray-300)' : 'var(--gray-600)'};
  text-decoration: none;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s;
  
  &:hover {
    color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
    background-color: ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray-100)'};
  }
  
  &.active {
    color: ${props => props.isDark ? 'var(--dopamine-orange)' : 'var(--dopamine-orange)'};
    background-color: ${props => props.isDark ? 'rgba(245, 225, 217, 0.1)' : 'var(--dopamine-orange-light)'};
    font-weight: 500;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${props => props.isDark ? 'var(--gray-300)' : 'var(--gray-600)'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
    background-color: ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray-100)'};
  }
`;

const UserProfile = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Page Layout
const PageContainer = styled.div`
  display: flex;
  flex: 1;
`;

// Sidebar
const Sidebar = styled.aside`
  width: 240px;
  background-color: ${props => props.isDark ? 'var(--gray-800)' : 'white'};
  border-right: 1px solid ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray-200)'};
  padding: 24px 0;
  overflow-y: auto;
`;

const SidebarSection = styled.div`
  margin-bottom: 24px;
`;

const SidebarTitle = styled.div`
  color: ${props => props.isDark ? 'var(--gray-300)' : 'var(--gray-500)'};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 24px;
  margin-bottom: 8px;
`;

const SidebarItem = styled.div`
  margin-bottom: 2px;
`;

const SidebarLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 24px;
  color: ${props => props.isDark ? 'var(--gray-300)' : 'var(--gray-600)'};
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
  cursor: pointer;
  
  i {
    width: 20px;
    text-align: center;
    opacity: 0.8;
  }
  
  &:hover {
    color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
  }
  
  &.active {
    color: ${props => props.isDark ? 'var(--dopamine-orange)' : 'var(--dopamine-orange)'};
    background-color: ${props => props.isDark ? 'rgba(245, 225, 217, 0.1)' : 'var(--dopamine-orange-light)'};
    font-weight: 500;
  }
  
  &.add-folder {
    color: ${props => props.isDark ? 'var(--gray-400)' : 'var(--gray-500)'};
    
    &:hover {
      color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
    }
  }
`;

// Main content area
const MaterialsContent = styled.main`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

const ContentArea = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// Materials header
const MaterialsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const MaterialsTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
`;

const MaterialsSubtitle = styled.p`
  font-size: 14px;
  color: ${props => props.isDark ? 'var(--gray-400)' : 'var(--gray-500)'};
  margin: 4px 0 0 0;
`;

const MaterialsActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray-100)'};
  border-radius: 8px;
  padding: 0 12px;
  width: 240px;
  height: 36px;
  
  i {
    color: ${props => props.isDark ? 'var(--gray-400)' : 'var(--gray-500)'};
    margin-right: 8px;
  }
  
  input {
    border: none;
    background: none;
    outline: none;
    width: 100%;
    color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
    font-size: 14px;
    
    &::placeholder {
      color: ${props => props.isDark ? 'var(--gray-400)' : 'var(--gray-500)'};
    }
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${props => props.size === 'sm' ? '6px 12px' : '8px 16px'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${props => {
    if (props.variant === 'primary') {
      return `
        background-color: ${props.isDark ? 'var(--dopamine-orange)' : 'var(--dopamine-orange)'};
        color: ${props.isDark ? 'var(--gray-900)' : 'var(--gray-900)'};
        &:hover {
          background-color: ${props.isDark ? '#F0D2CA' : '#F0D2CA'};
        }
      `;
    } else if (props.variant === 'outline') {
      return `
        background-color: transparent;
        border: 1px solid ${props.isDark ? 'var(--gray-600)' : 'var(--gray-300)'};
        color: ${props.isDark ? 'var(--gray-300)' : 'var(--gray-700)'};
        &:hover {
          border-color: ${props.isDark ? 'var(--gray-500)' : 'var(--gray-400)'};
          background-color: ${props.isDark ? 'var(--gray-700)' : 'var(--gray-100)'};
        }
      `;
    } else {
      return `
        background-color: ${props.isDark ? 'var(--gray-700)' : 'var(--gray-100)'};
        color: ${props.isDark ? 'var(--gray-300)' : 'var(--gray-700)'};
        &:hover {
          background-color: ${props.isDark ? 'var(--gray-600)' : 'var(--gray-200)'};
        }
      `;
    }
  }}
`;

// Category tabs
const CategoryTabs = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const CategoryTab = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  background-color: ${props => props.isActive 
    ? (props.isDark ? 'var(--gray-700)' : 'white') 
    : 'transparent'
  };
  color: ${props => props.isActive
    ? (props.isDark ? 'white' : 'var(--gray-900)')
    : (props.isDark ? 'var(--gray-400)' : 'var(--gray-500)')
  };
  border: 1px solid ${props => props.isActive
    ? (props.isDark ? 'var(--gray-600)' : 'var(--gray-300)')
    : 'transparent'
  };
  box-shadow: ${props => props.isActive
    ? (props.isDark ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.05)')
    : 'none'
  };
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray-100)'};
    color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
  }
`;

// Tag filters
const TagFilters = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const TagFilter = styled.span`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  background-color: ${props => props.isActive
    ? (props.isDark ? 'var(--dopamine-orange)' : 'var(--dopamine-orange)')
    : (props.isDark ? 'var(--gray-700)' : 'var(--gray-100)')
  };
  color: ${props => props.isActive
    ? (props.isDark ? 'var(--gray-900)' : 'var(--gray-900)')
    : (props.isDark ? 'var(--gray-300)' : 'var(--gray-500)')
  };
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isActive
      ? (props.isDark ? '#F0D2CA' : '#F0D2CA')
      : (props.isDark ? 'var(--gray-600)' : 'var(--gray-200)')
    };
  }
`;

// Grid and List View Components
const ViewToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
`;

const ViewButton = styled.button`
  background: ${({ active, isDark }) => active 
    ? isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' 
    : 'transparent'};
  border: none;
  border-radius: 6px;
  padding: 6px;
  color: ${({ active, isDark }) => active 
    ? isDark ? 'var(--color-primary-light)' : 'var(--color-primary)' 
    : isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const MaterialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  padding: 24px 0;
`;

const MaterialsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 0;
`;

const MaterialCard = styled.div`
  background: ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px ${({ isDark }) => isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px ${({ isDark }) => isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const MaterialCardImage = styled.div`
  height: 140px;
  background-size: cover;
  background-position: center;
  background-color: ${({ isDark }) => isDark ? '#2a2a2a' : '#f5f5f5'};
`;

const MaterialCardContent = styled.div`
  padding: 12px 16px;
`;

const MaterialCardTitle = styled.h3`
  margin: 0 0 4px 0;
  font-size: 15px;
  font-weight: 500;
  color: ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'};
`;

const MaterialCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 12px;
  color: ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
`;

const MaterialCardTag = styled.span`
  background: ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
`;

const MaterialCardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`;

const MaterialListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.02)'};
  }
`;

const MaterialListImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  background-color: ${({ isDark }) => isDark ? '#2a2a2a' : '#f5f5f5'};
`;

const MaterialListContent = styled.div`
  margin-left: 16px;
  flex-grow: 1;
`;

const MaterialListTitle = styled.h3`
  margin: 0 0 4px 0;
  font-size: 15px;
  font-weight: 500;
  color: ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'};
`;

const MaterialListMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
`;

const MaterialListActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionIcon = styled.button`
  background: transparent;
  border: none;
  color: ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)'};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
`;

const PaginationButton = styled.button`
  background: ${({ active, isDark }) => active 
    ? isDark ? 'var(--color-primary-dark)' : 'var(--color-primary)' 
    : isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ active, isDark }) => active 
    ? 'white' 
    : isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ active, isDark }) => active 
      ? isDark ? 'var(--color-primary-dark)' : 'var(--color-primary)' 
      : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  color: ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'};
  text-align: center;
  
  svg {
    width: 60px;
    height: 60px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
`;

const BackToPrototypeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray-100)'};
  color: ${props => props.isDark ? 'var(--gray-200)' : 'var(--gray-800)'};
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isDark ? 'var(--gray-600)' : 'var(--gray-200)'};
    color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
  }
  
  i {
    font-size: 12px;
  }
`;

const EmptyStateButton = styled.button`
  background-color: ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray-100)'};
  color: ${props => props.isDark ? 'var(--gray-200)' : 'var(--gray-800)'};
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isDark ? 'var(--gray-600)' : 'var(--gray-200)'};
    color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
  }
`;

// 定义PrimaryButton和SecondaryButton
const PrimaryButton = styled(Button)`
  background-color: ${props => props.isDark ? 'var(--dopamine-orange)' : 'var(--dopamine-orange)'};
  color: ${props => props.isDark ? 'var(--gray-900)' : 'var(--gray-900)'};
  &:hover {
    background-color: ${props => props.isDark ? '#F0D2CA' : '#F0D2CA'};
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${props => props.isDark ? 'var(--gray-600)' : 'var(--gray-300)'};
  color: ${props => props.isDark ? 'var(--gray-300)' : 'var(--gray-700)'};
  &:hover {
    border-color: ${props => props.isDark ? 'var(--gray-500)' : 'var(--gray-400)'};
    background-color: ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray-100)'};
  }
`;

const AssetLibrary = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  const [selectedSection, setSelectedSection] = useState('folder');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  
  const [materials, setMaterials] = useState([]);
  
  useEffect(() => {
    // 根据筛选条件过滤素材
    let filtered = [...assetItems];
    
    // 根据文件夹/品牌筛选
    if (selectedSection === 'folder' && selectedFolder) {
      filtered = filtered.filter(item => item.folder === selectedFolder || selectedFolder === 'all');
    } else if (selectedSection === 'brand' && selectedBrand) {
      filtered = filtered.filter(item => item.brand === selectedBrand);
    }
    
    // 根据分类筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.categories.includes(selectedCategory));
    }
    
    // 根据标签筛选
    if (selectedTags.length > 0) {
      filtered = filtered.filter(item => 
        selectedTags.some(tag => item.tags.includes(tag))
      );
    }
    
    // 根据搜索查询筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query)
      );
    }
    
    setMaterials(filtered);
  }, [selectedSection, selectedFolder, selectedBrand, selectedCategory, selectedTags, searchQuery]);

  const handleSidebarItemClick = (section, data = null) => {
    setSelectedSection(section);
    if (section === 'folder') {
      setSelectedFolder(data);
      setSelectedBrand(null);
    } else if (section === 'brand') {
      setSelectedBrand(data);
      setSelectedFolder(null);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleTagClick = (tag) => {
    setSelectedTags(prevTags => {
      if (prevTags.includes(tag)) {
        return prevTags.filter(t => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const formatTitle = () => {
    if (selectedSection === 'folder') {
      const folder = folderTypes.find(f => f.id === selectedFolder);
      return folder ? folder.name : '全部素材';
    } else if (selectedSection === 'brand') {
      const brand = brandFolders.find(b => b.id === selectedBrand);
      return brand ? brand.name : '品牌素材';
    }
    return '素材库';
  };

  const formatSubtitle = () => {
    let subTitle = `${materials.length} 个素材`;
    if (selectedCategory && selectedCategory !== 'all') {
      const category = categories.find(c => c.id === selectedCategory);
      if (category) {
        subTitle += ` · ${category.name}`;
      }
    }
    return subTitle;
  };

  const getSelectedFolderName = (folderId) => {
    const folder = folderTypes.find(f => f.id === folderId);
    return folder ? folder.name : '';
  };

  const getSelectedBrandName = (brandId) => {
    const brand = brandFolders.find(b => b.id === brandId);
    return brand ? brand.name : '';
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  };

  const getTagName = (tagId) => {
    const tag = tags.find(t => t.id === tagId);
    return tag ? tag.name : '';
  };

  // 渲染素材卡片
  const renderMaterialCard = (material) => (
    <MaterialCard 
      key={material.id} 
      isDark={isDark} 
      onClick={() => window.open(material.thumbnail, '_blank')}
    >
      <MaterialCardImage 
        isDark={isDark}
        style={{ backgroundImage: `url(${material.thumbnail})` }} 
      />
      <MaterialCardContent>
        <MaterialCardTitle isDark={isDark}>{material.title}</MaterialCardTitle>
        <MaterialCardMeta>
          <div>
            {material.fileType.toUpperCase()} · {material.dimensions}
          </div>
          <div>{material.size}</div>
        </MaterialCardMeta>
        <MaterialCardTags>
          {material.tags.slice(0, 2).map(tag => (
            <MaterialCardTag key={tag} isDark={isDark}>
              {getTagName(tag)}
            </MaterialCardTag>
          ))}
        </MaterialCardTags>
      </MaterialCardContent>
    </MaterialCard>
  );

  // 渲染素材列表项
  const renderMaterialListItem = (material) => (
    <MaterialListItem 
      key={material.id} 
      isDark={isDark}
      onClick={() => window.open(material.thumbnail, '_blank')}
    >
      <MaterialListImage style={{ backgroundImage: `url(${material.thumbnail})` }} />
      <MaterialListContent>
        <MaterialListTitle isDark={isDark}>{material.title}</MaterialListTitle>
        <MaterialListMeta>
          <div>{material.fileType.toUpperCase()} · {material.dimensions} · {material.size}</div>
          <div>
            {material.categories.slice(0, 2).map(category => getCategoryName(category)).join(', ')}
          </div>
        </MaterialListMeta>
      </MaterialListContent>
      <MaterialListActions>
        <ActionIcon isDark={isDark} title="下载">
          <i className="fas fa-download"></i>
        </ActionIcon>
        <ActionIcon isDark={isDark} title="收藏">
          <i className="far fa-star"></i>
        </ActionIcon>
        <ActionIcon isDark={isDark} title="更多">
          <i className="fas fa-ellipsis-h"></i>
        </ActionIcon>
      </MaterialListActions>
    </MaterialListItem>
  );

  return (
    <AppContainer isDark={isDark}>
      <AppHeader isDark={isDark}>
        <HeaderLogo isDark={isDark}>
          <img src="/logo.svg" alt="CreativePro Studio Logo" />
          <span>CreativePro Studio</span>
        </HeaderLogo>
        <HeaderNav>
          <NavLink 
            isDark={isDark} 
            href="#" 
            className="active"
            onClick={() => navigate('/')}
          >素材库</NavLink>
          <NavLink 
            isDark={isDark} 
            href="#"
            onClick={() => navigate('/master-library')}
          >母版库</NavLink>
          <NavLink 
            isDark={isDark} 
            href="#"
            onClick={() => navigate('/batch-center')}
          >批量处理</NavLink>
          <NavLink 
            isDark={isDark} 
            href="#"
            onClick={() => navigate('/projects')}
          >项目管理</NavLink>
        </HeaderNav>
        <HeaderActions>
          <ActionButton isDark={isDark}>
            <i className="fas fa-bell"></i>
          </ActionButton>
          <ActionButton isDark={isDark}>
            <i className="fas fa-cog"></i>
          </ActionButton>
          <UserProfile>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User Avatar" />
          </UserProfile>
        </HeaderActions>
      </AppHeader>
      
      <PageContainer>
        <Sidebar isDark={isDark}>
          <SidebarSection>
            <SidebarTitle isDark={isDark}>资源管理</SidebarTitle>
            {folderTypes.map(folder => (
              <SidebarItem key={folder.id}>
                <SidebarLink 
                  isDark={isDark}
                  className={selectedSection === 'folder' && selectedFolder === folder.id ? 'active' : ''}
                  onClick={() => handleSidebarItemClick('folder', folder.id)}
                >
                  <i className={`fas ${folder.icon}`}></i>
                  {folder.name}
                  <span style={{ marginLeft: 'auto' }}>{folder.count}</span>
                </SidebarLink>
              </SidebarItem>
            ))}
            <SidebarItem>
              <SidebarLink isDark={isDark} className="add-folder">
                <i className="fas fa-plus"></i>
                创建新文件夹
              </SidebarLink>
            </SidebarItem>
          </SidebarSection>
          
          <SidebarSection>
            <SidebarTitle isDark={isDark}>品牌文件夹</SidebarTitle>
            {brandFolders.map(brand => (
              <SidebarItem key={brand.id}>
                <SidebarLink 
                  isDark={isDark}
                  className={selectedSection === 'brand' && selectedBrand === brand.id ? 'active' : ''}
                  onClick={() => handleSidebarItemClick('brand', brand.id)}
                >
                  <i className={`fas ${brand.icon}`}></i>
                  {brand.name}
                  <span style={{ marginLeft: 'auto' }}>{brand.count}</span>
                </SidebarLink>
              </SidebarItem>
            ))}
          </SidebarSection>
        </Sidebar>
        
        <MaterialsContent>
          <ContentArea>
            <MaterialsHeader>
              <div>
                <MaterialsTitle isDark={isDark}>{formatTitle()}</MaterialsTitle>
                <MaterialsSubtitle isDark={isDark}>{formatSubtitle()}</MaterialsSubtitle>
              </div>
              
              <MaterialsActions>
                <SearchBar isDark={isDark}>
                  <i className="fas fa-search"></i>
                  <input 
                    type="text" 
                    placeholder="搜索素材..." 
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </SearchBar>
                
                <PrimaryButton isDark={isDark}>
                  <i className="fas fa-upload"></i>
                  上传素材
                </PrimaryButton>
                
                <SecondaryButton isDark={isDark}>
                  <i className="fas fa-filter"></i>
                  筛选
                </SecondaryButton>
                
                <ViewToggle>
                  <ActionButton 
                    isDark={isDark}
                    className={isGridView ? 'active' : ''}
                    onClick={toggleView}
                  >
                    <i className="fas fa-th"></i>
                  </ActionButton>
                  <ActionButton 
                    isDark={isDark}
                    className={!isGridView ? 'active' : ''}
                    onClick={toggleView}
                  >
                    <i className="fas fa-list"></i>
                  </ActionButton>
                </ViewToggle>
              </MaterialsActions>
            </MaterialsHeader>
            
            <CategoryTabs>
              {categories.map(category => (
                <CategoryTab 
                  key={category.id}
                  isDark={isDark}
                  isActive={selectedCategory === category.id}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </CategoryTab>
              ))}
            </CategoryTabs>
            
            <TagFilters>
              {tags.map(tag => (
                <TagFilter 
                  key={tag.id}
                  isDark={isDark}
                  isActive={selectedTags.includes(tag.id)}
                  onClick={() => handleTagClick(tag.id)}
                >
                  {tag.name}
                </TagFilter>
              ))}
            </TagFilters>
            
            {/* 返回原型设计按钮 */}
            <BackToPrototypeButton 
              isDark={isDark}
              onClick={() => navigate('/prototype')}
            >
              <i className="fas fa-arrow-left"></i>
              返回原型设计
            </BackToPrototypeButton>
            
            {materials.length === 0 ? (
              <EmptyState isDark={isDark}>
                <i className="fas fa-search"></i>
                <p>没有找到匹配的素材</p>
                <EmptyStateButton isDark={isDark} onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTags([]);
                  setSearchQuery('');
                }}>
                  清除筛选条件
                </EmptyStateButton>
              </EmptyState>
            ) : (
              <>
                {isGridView ? (
                  <MaterialsGrid>
                    {materials.map(material => renderMaterialCard(material))}
                  </MaterialsGrid>
                ) : (
                  <MaterialsList>
                    {materials.map(material => renderMaterialListItem(material))}
                  </MaterialsList>
                )}
              </>
            )}
            
            {materials.length > 0 && (
              <Pagination>
                <PaginationButton isDark={isDark}>
                  <i className="fas fa-chevron-left"></i>
                </PaginationButton>
                <PaginationButton isDark={isDark} active>1</PaginationButton>
                <PaginationButton isDark={isDark}>2</PaginationButton>
                <PaginationButton isDark={isDark}>3</PaginationButton>
                <PaginationButton isDark={isDark}>...</PaginationButton>
                <PaginationButton isDark={isDark}>12</PaginationButton>
                <PaginationButton isDark={isDark}>
                  <i className="fas fa-chevron-right"></i>
                </PaginationButton>
              </Pagination>
            )}
          </ContentArea>
        </MaterialsContent>
      </PageContainer>
    </AppContainer>
  );
};

export default AssetLibrary; 