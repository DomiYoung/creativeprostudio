import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// 图标导入
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import FolderIcon from '@mui/icons-material/Folder';
import ImageIcon from '@mui/icons-material/Image';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

// 样式组件
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
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
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

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? '#f0f0f0' : 'transparent'};
  border: none;
  color: #1d1d1f;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
  
  svg {
    font-size: 20px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const SearchFilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
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
  border: 1px solid #e0e0e0;
  font-size: 14px;
  outline: none;
  background-color: white;
  transition: all 0.2s;
  
  &:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
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
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  background-color: white;
  font-size: 14px;
  color: #1d1d1f;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f7;
  }
  
  svg {
    margin-right: 8px;
    font-size: 18px;
  }
`;

const ViewToggleContainer = styled.div`
  display: flex;
  background-color: #f0f0f0;
  border-radius: 6px;
  padding: 4px;
`;

const ViewToggleButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? 'white' : 'transparent'};
  border: none;
  color: #1d1d1f;
  cursor: pointer;
  box-shadow: ${props => props.active ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'};
  
  svg {
    font-size: 20px;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProjectCard = styled(motion.div)`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
`;

const ProjectThumbnail = styled.div`
  height: 160px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const ProjectInfo = styled.div`
  padding: 16px;
`;

const ProjectTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #86868b;
  margin-bottom: 12px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 4px;
    font-size: 16px;
  }
`;

const ProjectListItem = styled(motion.div)`
  display: flex;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  color: #1d1d1f;
  margin: 0 0 8px 0;
`;

const ListItemMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #86868b;
`;

const ListItemActions = styled.div`
  display: flex;
  gap: 8px;
`;

const StarButton = styled(IconButton)`
  color: ${props => props.starred ? '#FFB800' : '#86868b'};
  
  &:hover {
    color: ${props => props.starred ? '#FFB800' : '#1d1d1f'};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  text-align: center;
  
  svg {
    font-size: 64px;
    color: #86868b;
    margin-bottom: 24px;
  }
  
  h3 {
    font-size: 20px;
    font-weight: 500;
    margin: 0 0 8px 0;
    color: #1d1d1f;
  }
  
  p {
    font-size: 16px;
    color: #86868b;
    margin: 0 0 24px 0;
    max-width: 400px;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  overflow: hidden;
  width: 180px;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background-color: transparent;
  font-size: 14px;
  text-align: left;
  color: ${props => props.danger ? '#ff3b30' : '#1d1d1f'};
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f7;
  }
  
  svg {
    margin-right: 12px;
    font-size: 18px;
  }
`;

// 模拟数据
const mockProjects = [
  {
    id: 1,
    title: "夏季美妆产品",
    type: "电商产品",
    createdAt: "2025-03-15",
    itemCount: 24,
    status: "已导出",
    starred: true,
    thumbnail: "https://source.unsplash.com/random/300x200?cosmetics"
  },
  {
    id: 2,
    title: "春节促销活动",
    type: "营销活动",
    createdAt: "2025-02-28",
    itemCount: 36,
    status: "完成",
    starred: true,
    thumbnail: "https://source.unsplash.com/random/300x200?newyear"
  },
  {
    id: 3,
    title: "口红色号展示",
    type: "产品展示",
    createdAt: "2025-02-20",
    itemCount: 16,
    status: "进行中",
    starred: false,
    thumbnail: "https://source.unsplash.com/random/300x200?lipstick"
  },
  {
    id: 4,
    title: "护肤品成分解析",
    type: "教育内容",
    createdAt: "2025-02-15",
    itemCount: 12,
    status: "已导出",
    starred: false,
    thumbnail: "https://source.unsplash.com/random/300x200?skincare"
  },
  {
    id: 5,
    title: "母亲节特别系列",
    type: "营销活动",
    createdAt: "2025-02-10",
    itemCount: 28,
    status: "完成",
    starred: false,
    thumbnail: "https://source.unsplash.com/random/300x200?mothersday"
  },
  {
    id: 6,
    title: "夏季防晒产品",
    type: "产品展示",
    createdAt: "2025-02-05",
    itemCount: 8,
    status: "已导出",
    starred: true,
    thumbnail: "https://source.unsplash.com/random/300x200?sunscreen"
  }
];

const ProjectsView = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // 搜索和过滤项目
  useEffect(() => {
    if (searchTerm) {
      const results = projects.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(results);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchTerm, projects]);
  
  // 处理返回按钮
  const handleBack = () => {
    navigate(-1);
  };
  
  // 处理收藏切换
  const toggleStar = (id, e) => {
    e.stopPropagation();
    setProjects(projects.map(project => 
      project.id === id ? { ...project, starred: !project.starred } : project
    ));
  };
  
  // 处理项目点击
  const handleProjectClick = (id) => {
    navigate(`/canvas-editor`);
  };
  
  // 处理更多菜单
  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  
  // 处理操作菜单项
  const handleAction = (action, id, e) => {
    e.stopPropagation();
    setActiveDropdown(null);
    console.log(`执行操作: ${action} 项目ID: ${id}`);
    
    if (action === 'edit') {
      navigate(`/canvas-editor`);
    } else if (action === 'delete') {
      setProjects(projects.filter(project => project.id !== id));
    }
  };
  
  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <ArrowBackIosNewIcon fontSize="small" />
          返回
        </BackButton>
        <Title>项目管理</Title>
        <ActionButtons>
          <ActionButton primary onClick={() => navigate('/batch-create')}>
            创建项目
          </ActionButton>
        </ActionButtons>
      </Header>
      
      <MainContent>
        <SearchFilterBar>
          <SearchContainer>
            <SearchIcon />
            <SearchInput 
              placeholder="搜索项目..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          
          <FilterContainer>
            <FilterButton>
              <FilterListIcon />
              筛选
            </FilterButton>
            <FilterButton>
              <SortIcon />
              排序
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
        
        {filteredProjects.length === 0 ? (
          <EmptyState>
            <FolderIcon fontSize="large" />
            <h3>没有找到项目</h3>
            <p>尝试使用不同的搜索条件或创建一个新项目</p>
            <ActionButton primary onClick={() => navigate('/batch-create')}>
              创建项目
            </ActionButton>
          </EmptyState>
        ) : viewMode === 'grid' ? (
          <ProjectsGrid>
            {filteredProjects.map(project => (
              <ProjectCard 
                key={project.id}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => handleProjectClick(project.id)}
              >
                <ProjectThumbnail image={project.thumbnail}>
                  <div style={{ 
                    position: 'absolute', 
                    top: 12, 
                    right: 12,
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <StarButton 
                      starred={project.starred}
                      onClick={(e) => toggleStar(project.id, e)}
                    >
                      {project.starred ? <StarIcon /> : <StarBorderIcon />}
                    </StarButton>
                    <IconButton onClick={(e) => toggleDropdown(project.id, e)}>
                      <MoreVertIcon />
                    </IconButton>
                    {activeDropdown === project.id && (
                      <Dropdown>
                        <DropdownItem onClick={(e) => handleAction('edit', project.id, e)}>
                          <EditIcon />
                          编辑
                        </DropdownItem>
                        <DropdownItem onClick={(e) => handleAction('download', project.id, e)}>
                          <DownloadIcon />
                          下载
                        </DropdownItem>
                        <DropdownItem onClick={(e) => handleAction('share', project.id, e)}>
                          <ShareIcon />
                          分享
                        </DropdownItem>
                        <DropdownItem danger onClick={(e) => handleAction('delete', project.id, e)}>
                          <DeleteIcon />
                          删除
                        </DropdownItem>
                      </Dropdown>
                    )}
                  </div>
                </ProjectThumbnail>
                <ProjectInfo>
                  <ProjectTitle>
                    {project.title}
                  </ProjectTitle>
                  <ProjectMeta>
                    <MetaItem>
                      <ImageIcon fontSize="small" />
                      {project.itemCount}项
                    </MetaItem>
                    <MetaItem>{project.type}</MetaItem>
                  </ProjectMeta>
                  <div style={{ 
                    fontSize: '13px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>{project.createdAt}</span>
                    <span style={{ 
                      display: 'inline-block', 
                      padding: '2px 8px', 
                      borderRadius: '4px',
                      backgroundColor: project.status === '已导出' ? '#e7f8ed' : 
                                      project.status === '完成' ? '#e6f1ff' : 
                                      '#fff4e5',
                      color: project.status === '已导出' ? '#34c759' : 
                             project.status === '完成' ? '#0066cc' : 
                             '#ff9500',
                      fontWeight: 500
                    }}>
                      {project.status}
                    </span>
                  </div>
                </ProjectInfo>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        ) : (
          <ProjectsList>
            {filteredProjects.map(project => (
              <ProjectListItem 
                key={project.id}
                whileHover={{ 
                  y: -2,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => handleProjectClick(project.id)}
              >
                <ListItemThumbnail image={project.thumbnail} />
                <ListItemContent>
                  <ListItemInfo>
                    <ListItemTitle>{project.title}</ListItemTitle>
                    <ListItemMeta>
                      <MetaItem>
                        <ImageIcon fontSize="small" />
                        {project.itemCount}项
                      </MetaItem>
                      <MetaItem>{project.type}</MetaItem>
                      <MetaItem>{project.createdAt}</MetaItem>
                      <div style={{ 
                        display: 'inline-block', 
                        padding: '2px 8px', 
                        borderRadius: '4px',
                        backgroundColor: project.status === '已导出' ? '#e7f8ed' : 
                                        project.status === '完成' ? '#e6f1ff' : 
                                        '#fff4e5',
                        color: project.status === '已导出' ? '#34c759' : 
                              project.status === '完成' ? '#0066cc' : 
                              '#ff9500',
                        fontWeight: 500
                      }}>
                        {project.status}
                      </div>
                    </ListItemMeta>
                  </ListItemInfo>
                  <ListItemActions>
                    <StarButton 
                      starred={project.starred}
                      onClick={(e) => toggleStar(project.id, e)}
                    >
                      {project.starred ? <StarIcon /> : <StarBorderIcon />}
                    </StarButton>
                    <IconButton onClick={(e) => toggleDropdown(project.id, e)}>
                      <MoreVertIcon />
                    </IconButton>
                    {activeDropdown === project.id && (
                      <Dropdown>
                        <DropdownItem onClick={(e) => handleAction('edit', project.id, e)}>
                          <EditIcon />
                          编辑
                        </DropdownItem>
                        <DropdownItem onClick={(e) => handleAction('download', project.id, e)}>
                          <DownloadIcon />
                          下载
                        </DropdownItem>
                        <DropdownItem onClick={(e) => handleAction('share', project.id, e)}>
                          <ShareIcon />
                          分享
                        </DropdownItem>
                        <DropdownItem danger onClick={(e) => handleAction('delete', project.id, e)}>
                          <DeleteIcon />
                          删除
                        </DropdownItem>
                      </Dropdown>
                    )}
                  </ListItemActions>
                </ListItemContent>
              </ProjectListItem>
            ))}
          </ProjectsList>
        )}
      </MainContent>
    </Container>
  );
};

export default ProjectsView; 