import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Material UI icons
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import FolderIcon from '@mui/icons-material/Folder';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';

// Mock data for master templates
const masterTemplates = [
  {
    id: 1,
    title: "产品详情页面模板",
    category: "产品",
    collection: "电商设计",
    tags: ["产品展示", "详情页"],
    thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    bookmarked: true
  },
  {
    id: 2,
    title: "促销活动Banner",
    category: "营销",
    collection: "活动设计",
    tags: ["Banner", "促销"],
    thumbnail: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    bookmarked: false
  },
  {
    id: 3,
    title: "社交媒体图片模板",
    category: "社交媒体",
    collection: "内容营销",
    tags: ["社交", "图片"],
    thumbnail: "https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    bookmarked: false
  },
  {
    id: 4,
    title: "新品发布页面",
    category: "产品",
    collection: "新品发布",
    tags: ["新品", "发布页"],
    thumbnail: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    bookmarked: true
  },
  {
    id: 5,
    title: "品牌故事页面",
    category: "品牌",
    collection: "品牌设计",
    tags: ["品牌", "故事"],
    thumbnail: "https://images.unsplash.com/photo-1596203721435-99e8fbdd8184?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    bookmarked: false
  },
  {
    id: 6,
    title: "产品系列展示模板",
    category: "产品",
    collection: "电商设计",
    tags: ["产品", "系列"],
    thumbnail: "https://images.unsplash.com/photo-1599733589046-d8a6257e4737?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    bookmarked: false
  }
];

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f7;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', Helvetica, Arial, sans-serif;
`;

const Header = styled.header`
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 100;
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
  font-size: 18px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.primary ? '#0066cc' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#0066cc'};
  border: ${props => props.primary ? 'none' : '1px solid #0066cc'};
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.primary ? '#004d99' : 'rgba(0, 102, 204, 0.05)'};
  }

  svg {
    margin-right: ${props => props.iconOnly ? '0' : '8px'};
  }
`;

const Layout = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Sidebar = styled.aside`
  width: 260px;
  background-color: rgba(255, 255, 255, 0.5);
  border-right: 1px solid #e0e0e0;
  padding: 24px 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SidebarHeader = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: #86868b;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SidebarItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  background: ${props => props.selected ? 'rgba(0, 102, 204, 0.1)' : 'transparent'};
  border: none;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  color: ${props => props.selected ? '#0066cc' : '#1d1d1f'};
  font-weight: ${props => props.selected ? '500' : 'normal'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.selected ? 'rgba(0, 102, 204, 0.15)' : 'rgba(0, 0, 0, 0.05)'};
  }

  svg {
    margin-right: 8px;
    font-size: 18px;
    color: ${props => props.selected ? '#0066cc' : '#86868b'};
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

const SearchFilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 16px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 320px;
  
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #86868b;
    font-size: 20px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px 10px 40px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  outline: none;
  background-color: rgba(142, 142, 147, 0.12);
  transition: all 0.2s;
  
  &:focus {
    background-color: white;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 18px;
  border: 1px solid ${props => props.active ? '#0066cc' : '#e0e0e0'};
  background-color: ${props => props.active ? 'rgba(0, 102, 204, 0.1)' : 'white'};
  font-size: 14px;
  color: ${props => props.active ? '#0066cc' : '#1d1d1f'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? 'rgba(0, 102, 204, 0.15)' : '#f5f5f7'};
  }
  
  svg {
    margin-right: ${props => props.iconOnly ? '0' : '8px'};
    font-size: 18px;
  }
`;

const ViewToggleContainer = styled.div`
  display: flex;
  background-color: rgba(142, 142, 147, 0.12);
  border-radius: 8px;
  padding: 4px;
`;

const ViewToggleButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? 'white' : 'transparent'};
  border: none;
  color: ${props => props.active ? '#0066cc' : '#86868b'};
  cursor: pointer;
  box-shadow: ${props => props.active ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'};
  
  svg {
    font-size: 20px;
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const TemplateCard = styled(motion.div)`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardThumbnail = styled.div`
  height: 180px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const BookmarkButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  
  &:hover {
    background-color: white;
    transform: scale(1.05);
  }

  svg {
    color: ${props => props.active ? '#ff9f0a' : '#8e8e93'};
    font-size: 18px;
  }
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 8px 0;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardCategory = styled.span`
  font-size: 13px;
  color: #86868b;
`;

const CardCollection = styled.span`
  font-size: 13px;
  color: #0066cc;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: #8e8e93;
`;

const EmptyStateTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 8px 0;
`;

const EmptyStateMessage = styled.p`
  font-size: 15px;
  color: #86868b;
  max-width: 400px;
  margin: 0 auto;
`;

const MasterLibrary = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(masterTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState(masterTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Categories
  const categories = [
    { id: 'all', name: '所有模板' },
    { id: 'product', name: '产品' },
    { id: 'marketing', name: '营销' },
    { id: 'social', name: '社交媒体' },
    { id: 'brand', name: '品牌' }
  ];

  // Collections
  const collections = [
    { id: 'all', name: '所有集合' },
    { id: 'ecommerce', name: '电商设计' },
    { id: 'promotion', name: '活动设计' },
    { id: 'content', name: '内容营销' },
    { id: 'branding', name: '品牌设计' },
    { id: 'newproduct', name: '新品发布' }
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
    if (selectedCategory !== 'all') {
      result = result.filter(template => 
        template.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Apply collection filter
    if (selectedCollection !== 'all') {
      result = result.filter(template => 
        template.collection.toLowerCase().includes(selectedCollection.toLowerCase())
      );
    }
    
    // Apply bookmarks filter
    if (bookmarksOnly) {
      result = result.filter(template => template.bookmarked);
    }
    
    setFilteredTemplates(result);
  }, [templates, searchTerm, selectedCategory, selectedCollection, bookmarksOnly]);

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

  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BackButton onClick={handleBack}>
            <ArrowBackIosNewIcon />
            返回
          </BackButton>
          <Title>母版库</Title>
        </div>
        <ActionButtons>
          <ActionButton primary>
            创建新模板
          </ActionButton>
        </ActionButtons>
      </Header>
      
      <Layout>
        <Sidebar>
          <SidebarSection>
            <SidebarHeader>分类</SidebarHeader>
            {categories.map(category => (
              <SidebarItem 
                key={category.id}
                selected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                <FolderIcon />
                {category.name}
              </SidebarItem>
            ))}
          </SidebarSection>
          
          <SidebarSection>
            <SidebarHeader>集合</SidebarHeader>
            {collections.map(collection => (
              <SidebarItem 
                key={collection.id}
                selected={selectedCollection === collection.id}
                onClick={() => setSelectedCollection(collection.id)}
              >
                <FolderIcon />
                {collection.name}
              </SidebarItem>
            ))}
          </SidebarSection>
        </Sidebar>
        
        <MainContent>
          <SearchFilterBar>
            <SearchContainer>
              <SearchIcon />
              <SearchInput 
                placeholder="搜索模板..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
            
            <FilterContainer>
              <FilterButton 
                active={bookmarksOnly}
                onClick={() => setBookmarksOnly(!bookmarksOnly)}
              >
                {bookmarksOnly ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                收藏
              </FilterButton>
              
              <ViewToggleContainer>
                <ViewToggleButton 
                  active={viewMode === 'grid'} 
                  onClick={() => setViewMode('grid')}
                >
                  <GridViewIcon />
                </ViewToggleButton>
                <ViewToggleButton 
                  active={viewMode === 'list'} 
                  onClick={() => setViewMode('list')}
                >
                  <ViewListIcon />
                </ViewToggleButton>
              </ViewToggleContainer>
            </FilterContainer>
          </SearchFilterBar>
          
          {filteredTemplates.length > 0 ? (
            <TemplatesGrid>
              <AnimatePresence>
                {filteredTemplates.map(template => (
                  <TemplateCard
                    key={template.id}
                    layoutId={`template-${template.id}`}
                    onClick={() => handleTemplateSelect(template.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardThumbnail image={template.thumbnail}>
                      <BookmarkButton 
                        active={template.bookmarked}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(template.id);
                        }}
                      >
                        {template.bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                      </BookmarkButton>
                    </CardThumbnail>
                    <CardContent>
                      <CardTitle>{template.title}</CardTitle>
                      <CardMeta>
                        <CardCategory>{template.category}</CardCategory>
                        <CardCollection>{template.collection}</CardCollection>
                      </CardMeta>
                    </CardContent>
                  </TemplateCard>
                ))}
              </AnimatePresence>
            </TemplatesGrid>
          ) : (
            <EmptyState>
              <EmptyStateIcon>
                <SearchIcon style={{ fontSize: 48 }} />
              </EmptyStateIcon>
              <EmptyStateTitle>没有找到匹配的模板</EmptyStateTitle>
              <EmptyStateMessage>
                尝试使用不同的搜索词或筛选条件，或者浏览所有可用模板。
              </EmptyStateMessage>
            </EmptyState>
          )}
        </MainContent>
      </Layout>
    </Container>
  );
};

export default MasterLibrary; 