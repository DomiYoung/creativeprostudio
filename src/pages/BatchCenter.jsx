import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

// 导入批量处理中心相关数据
import { 
  batchStatus, 
  batchTypes, 
  batchProjects,
  batchVersionHistory
} from '../data/mock/batches';

// App容器
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f7;
  color: #1d1d1f;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

// 头部
const Header = styled.header`
  height: 64px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e8e8ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${props => props.size === 'sm' ? '8px 16px' : '10px 20px'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background-color: ${props => props.variant === 'primary' ? '#0066cc' : '#ffffff'};
  color: ${props => props.variant === 'primary' ? '#ffffff' : '#1d1d1f'};
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid #e8e8ed'};
  box-shadow: ${props => props.variant === 'primary' ? '0 2px 5px rgba(0, 102, 204, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    background-color: ${props => props.variant === 'primary' ? '#004c99' : '#f5f5f7'};
    transform: translateY(-1px);
    box-shadow: ${props => props.variant === 'primary' ? '0 4px 8px rgba(0, 102, 204, 0.3)' : '0 2px 5px rgba(0, 0, 0, 0.08)'};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: ${props => props.variant === 'primary' ? '0 1px 3px rgba(0, 102, 204, 0.2)' : '0 1px 2px rgba(0, 0, 0, 0.05)'};
  }
`;

// 主内容区
const Content = styled.main`
  flex: 1;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

// 过滤器工具栏
const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? '#0066cc' : 'white'};
  color: ${props => props.active ? 'white' : '#1d1d1f'};
  border: 1px solid ${props => props.active ? '#0066cc' : '#e8e8ed'};
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#004c99' : '#f5f5f7'};
  }
`;

const SearchBar = styled.div`
  position: relative;
  width: 260px;
  
  input {
    width: 100%;
    padding: 8px 16px 8px 40px;
    border-radius: 8px;
    border: 1px solid #e8e8ed;
    background-color: white;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;
    
    &:focus {
      border-color: #0066cc;
      box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    }
  }
  
  i {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #86868b;
    font-size: 14px;
  }
`;

// 视图切换
const ViewToggle = styled.div`
  display: flex;
  background-color: #f5f5f7;
  border-radius: 8px;
  padding: 2px;
`;

const ViewButton = styled.button`
  border: none;
  background-color: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#0066cc' : '#86868b'};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.active ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.2s;
  
  i {
    font-size: 16px;
  }
  
  &:hover {
    color: ${props => props.active ? '#0066cc' : '#1d1d1f'};
  }
`;

// 项目网格和列表视图
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

// 项目卡片
const ProjectCard = styled(motion.div)`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: ${props => {
      const statusItem = batchStatus.find(s => s.id === props.status);
      return statusItem ? statusItem.color : '#e8e8ed';
    }};
  }
`;

const ProjectThumbnail = styled.div`
  height: 160px;
  background-color: #f5f5f7;
  background-image: ${props => props.thumbnail ? `url(${props.thumbnail})` : 'none'};
  background-size: cover;
  background-position: center;
  position: relative;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: ${props => {
    const statusItem = batchStatus.find(s => s.id === props.status);
    return statusItem ? statusItem.color : '#e8e8ed';
  }};
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BookmarkButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: white;
    transform: scale(1.05);
  }
  
  i {
    color: ${props => props.bookmarked ? '#ff9500' : '#86868b'};
    font-size: 16px;
  }
`;

const ProjectProgress = styled.div`
  height: 4px;
  background-color: #f5f5f7;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background-color: ${props => {
      const statusItem = batchStatus.find(s => s.id === props.status);
      return statusItem ? statusItem.color : '#0066cc';
    }};
    transition: width 0.3s ease-in-out;
  }
`;

const ProjectContent = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
`;

const ProjectDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: #86868b;
  line-height: 1.4;
`;

const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f5f5f7;
`;

const ProjectStats = styled.div`
  display: flex;
  gap: 12px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #86868b;
`;

const ProjectType = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  background-color: #f5f5f7;
  border-radius: 4px;
  font-size: 12px;
  color: #86868b;
  
  i {
    font-size: 12px;
  }
`;

// 项目列表项
const ProjectListItem = styled(motion.div)`
  display: flex;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: ${props => {
      const statusItem = batchStatus.find(s => s.id === props.status);
      return statusItem ? statusItem.color : '#e8e8ed';
    }};
  }
`;

const ProjectListImage = styled.div`
  width: 120px;
  height: 80px;
  background-color: #f5f5f7;
  background-image: ${props => props.thumbnail ? `url(${props.thumbnail})` : 'none'};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-right: 16px;
  flex-shrink: 0;
  position: relative;
`;

const ProjectListContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ProjectListTitle = styled.div`
  flex: 1;
  
  h3 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
    color: #1d1d1f;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #86868b;
  }
`;

const ProjectListInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const ProjectListStats = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #86868b;
  
  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  strong {
    color: #1d1d1f;
  }
`;

const ProjectListActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #86868b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f7;
    color: #1d1d1f;
  }
  
  i {
    font-size: 16px;
  }
`;

// 空状态组件
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  text-align: center;
  
  i {
    font-size: 48px;
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

// 分页组件
const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  gap: 8px;
`;

const PageButton = styled.button`
  min-width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: ${props => props.active ? '#0066cc' : 'white'};
  color: ${props => props.active ? 'white' : '#1d1d1f'};
  border: 1px solid ${props => props.active ? '#0066cc' : '#e8e8ed'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#0066cc' : '#f5f5f7'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 新建项目模态框
const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  z-index: 1;
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h2 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  color: #86868b;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f7;
    color: #1d1d1f;
  }
  
  i {
    font-size: 18px;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #1d1d1f;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #e8e8ed;
    font-size: 14px;
    transition: all 0.2s;
    
    &:focus {
      outline: none;
      border-color: #0066cc;
      box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    }
  }
  
  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #f5f5f7;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

// 主组件
const BatchCenter = () => {
  const [projects, setProjects] = useState(batchProjects);
  const [filteredProjects, setFilteredProjects] = useState(batchProjects);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  
  // 当筛选条件变化时，更新过滤后的项目列表
  useEffect(() => {
    let result = [...projects];
    
    // 按状态筛选
    if (selectedStatus !== 'all') {
      result = result.filter(project => project.status === selectedStatus);
    }
    
    // 按搜索词筛选
    if (searchTerm) {
      result = result.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProjects(result);
  }, [projects, selectedStatus, searchTerm]);
  
  // 切换收藏状态
  const toggleBookmark = (id) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, bookmarked: !project.bookmarked } : project
    ));
  };
  
  // 选择项目
  const selectProject = (id) => {
    console.log(`选择了项目ID: ${id}`);
    // 这里可以实现导航到项目详情页面
    navigate(`/creativeprostudio/batch-center/${id}`);
  };
  
  // 创建新项目
  const createNewProject = (projectData) => {
    // 创建新项目的逻辑
    console.log('创建新项目:', projectData);
    setShowNewProjectModal(false);
  };
  
  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // 项目进度条组件
  const ProjectProgressBar = ({ project }) => {
    return project.status === 'processing' || project.status === 'paused' ? (
      <ProjectProgress status={project.status} progress={project.progress} />
    ) : null;
  };
  
  const handleProjectClick = (project) => {
    navigate(`/creativeprostudio/batch-center/${project.id}`);
  };
  
  return (
    <AppContainer>
      <Header>
        <HeaderTitle>批量处理中心</HeaderTitle>
        <HeaderActions>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => console.log('导入项目')}
          >
            <i className="fas fa-file-import"></i>
            导入项目
          </Button>
          <Button 
            variant="primary"
            onClick={() => setShowNewProjectModal(true)}
          >
            <i className="fas fa-plus"></i>
            新建批量项目
          </Button>
        </HeaderActions>
      </Header>
      
      <Content>
        <FilterBar>
          <FilterGroup>
            {batchStatus.map(status => (
              <FilterButton 
                key={status.id}
                active={selectedStatus === status.id}
                onClick={() => setSelectedStatus(status.id)}
              >
                {status.name}
              </FilterButton>
            ))}
          </FilterGroup>
          
          <FilterGroup>
            <SearchBar>
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="搜索项目..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
            
            <ViewToggle>
              <ViewButton 
                active={viewMode === 'grid'} 
                onClick={() => setViewMode('grid')}
              >
                <i className="fas fa-th-large"></i>
              </ViewButton>
              <ViewButton 
                active={viewMode === 'list'} 
                onClick={() => setViewMode('list')}
              >
                <i className="fas fa-list"></i>
              </ViewButton>
            </ViewToggle>
          </FilterGroup>
        </FilterBar>
        
        {filteredProjects.length === 0 ? (
          <EmptyState>
            <i className="fas fa-inbox"></i>
            <h3>没有找到批量项目</h3>
            <p>调整筛选条件或创建一个新的批量处理项目</p>
            <Button 
              variant="primary"
              onClick={() => setShowNewProjectModal(true)}
            >
              <i className="fas fa-plus"></i>
              新建批量项目
            </Button>
          </EmptyState>
        ) : viewMode === 'grid' ? (
          <ProjectsGrid>
            {filteredProjects.map(project => (
              <ProjectCard 
                key={project.id}
                status={project.status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleProjectClick(project)}
              >
                <ProjectThumbnail thumbnail={project.thumbnail}>
                  <StatusBadge status={project.status}>
                    {batchStatus.find(s => s.id === project.status)?.name}
                  </StatusBadge>
                  <BookmarkButton 
                    bookmarked={project.bookmarked}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(project.id);
                    }}
                  >
                    {project.bookmarked ? 
                      <i className="fas fa-bookmark"></i> : 
                      <i className="far fa-bookmark"></i>
                    }
                  </BookmarkButton>
                  <ProjectProgressBar project={project} />
                </ProjectThumbnail>
                <ProjectContent>
                  <ProjectTitle>{project.name}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectMeta>
                    <ProjectStats>
                      <StatItem>
                        <StatValue>{project.itemCount}</StatValue>
                        <StatLabel>项目数</StatLabel>
                      </StatItem>
                      <StatItem>
                        <StatValue>{project.successCount}</StatValue>
                        <StatLabel>已完成</StatLabel>
                      </StatItem>
                    </ProjectStats>
                    <ProjectType>
                      <i className={`fas ${batchTypes.find(t => t.id === project.type)?.icon || 'fa-tasks'}`}></i>
                      {batchTypes.find(t => t.id === project.type)?.name || '批量任务'}
                    </ProjectType>
                  </ProjectMeta>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        ) : (
          <ProjectsList>
            {filteredProjects.map(project => (
              <ProjectListItem 
                key={project.id}
                status={project.status}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleProjectClick(project)}
              >
                <ProjectListImage thumbnail={project.thumbnail}>
                  {(project.status === 'processing' || project.status === 'paused') && (
                    <ProjectProgress status={project.status} progress={project.progress} />
                  )}
                </ProjectListImage>
                <ProjectListContent>
                  <ProjectListHeader>
                    <ProjectListTitle>
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                    </ProjectListTitle>
                    <StatusBadge status={project.status}>
                      {batchStatus.find(s => s.id === project.status)?.name}
                    </StatusBadge>
                  </ProjectListHeader>
                  <ProjectListInfo>
                    <ProjectListStats>
                      <span>
                        <i className="fas fa-layer-group"></i>
                        <strong>{project.itemCount}</strong> 项目
                      </span>
                      <span>
                        <i className="fas fa-check-circle"></i>
                        <strong>{project.successCount}</strong> 已完成
                      </span>
                      <span>
                        <i className="fas fa-calendar-alt"></i>
                        {formatDate(project.createdAt)}
                      </span>
                    </ProjectListStats>
                    <ProjectListActions>
                      <BookmarkButton 
                        bookmarked={project.bookmarked}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(project.id);
                        }}
                      >
                        {project.bookmarked ? 
                          <i className="fas fa-bookmark"></i> : 
                          <i className="far fa-bookmark"></i>
                        }
                      </BookmarkButton>
                      <ActionButton
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('导出项目', project.id);
                        }}
                      >
                        <i className="fas fa-file-export"></i>
                      </ActionButton>
                      <ActionButton
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('更多选项', project.id);
                        }}
                      >
                        <i className="fas fa-ellipsis-h"></i>
                      </ActionButton>
                    </ProjectListActions>
                  </ProjectListInfo>
                </ProjectListContent>
              </ProjectListItem>
            ))}
          </ProjectsList>
        )}
        
        {filteredProjects.length > 0 && (
          <Pagination>
            <PageButton disabled>
              <i className="fas fa-chevron-left"></i>
            </PageButton>
            <PageButton active>1</PageButton>
            <PageButton>2</PageButton>
            <PageButton>3</PageButton>
            <PageButton disabled>...</PageButton>
            <PageButton>
              <i className="fas fa-chevron-right"></i>
            </PageButton>
          </Pagination>
        )}
      </Content>
      
      {/* 新建项目模态框 */}
      <AnimatePresence>
        {showNewProjectModal && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalOverlay 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewProjectModal(false)}
            />
            <ModalContent
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <ModalHeader>
                <h2>新建批量项目</h2>
                <ModalCloseButton onClick={() => setShowNewProjectModal(false)}>
                  <i className="fas fa-times"></i>
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <label htmlFor="projectName">项目名称</label>
                  <input type="text" id="projectName" placeholder="输入项目名称..." />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="projectDescription">项目描述</label>
                  <textarea id="projectDescription" placeholder="输入项目描述..."></textarea>
                </FormGroup>
                <FormGroup>
                  <label htmlFor="projectType">项目类型</label>
                  <select id="projectType">
                    {batchTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </FormGroup>
                <FormGroup>
                  <label htmlFor="templateId">选择模板</label>
                  <select id="templateId">
                    <option value="">请选择模板...</option>
                    <option value="1">产品详情展示</option>
                    <option value="2">限时促销模板</option>
                    <option value="4">新品发布海报</option>
                    <option value="5">社交媒体每日一图</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>数据源</label>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      style={{ flex: 1 }}
                    >
                      <i className="fas fa-upload"></i>
                      上传Excel
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      style={{ flex: 1 }}
                    >
                      <i className="fas fa-table"></i>
                      手动输入
                    </Button>
                  </div>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="secondary"
                  onClick={() => setShowNewProjectModal(false)}
                >
                  取消
                </Button>
                <Button 
                  variant="primary"
                  onClick={() => createNewProject({
                    name: document.getElementById('projectName').value,
                    description: document.getElementById('projectDescription').value,
                    type: document.getElementById('projectType').value,
                    templateId: document.getElementById('templateId').value
                  })}
                >
                  创建项目
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </AppContainer>
  );
};

export default BatchCenter; 