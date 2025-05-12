import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design-system';

// 导入统一组件
import PageLayout from '../design-system/components/PageLayout';
import ContentCard from '../design-system/components/ContentCard';
import GridLayout from '../design-system/components/GridLayout';
import FilterBar from '../design-system/components/FilterBar';
import DeleteConfirmModal from '../components/ui/DeleteConfirmModal';
import CreateProjectModal from '../components/ui/CreateProjectModal';

// 项目列表页面样式
import styled from '@emotion/styled';

// 模拟数据
const projectCategories = ['所有项目', '进行中', '已完成', '已归档'];

// 项目标签
const projectTags = [
  { id: 'new', label: '最新创建' },
  { id: 'active', label: '活跃项目' },
  { id: 'upcoming', label: '即将截止' },
  { id: 'archived', label: '已归档' }
];

// 项目类型筛选
const projectTypeFilters = [
  { id: 'campaign', label: '营销活动', icon: 'fa-bullhorn' },
  { id: 'product', label: '产品设计', icon: 'fa-box-open' },
  { id: 'social', label: '社交媒体', icon: 'fa-share-alt' },
  { id: 'other', label: '其他项目', icon: 'fa-folder' }
];

// 项目状态筛选
const projectStatusFilters = [
  { id: 'inprogress', label: '进行中', icon: 'fa-spinner' },
  { id: 'review', label: '审核中', icon: 'fa-search' }, 
  { id: 'completed', label: '已完成', icon: 'fa-check-circle' },
  { id: 'archived', label: '已归档', icon: 'fa-archive' }
];

// 模拟项目数据
const mockProjects = [
  {
    id: "1",
    title: '2025春季产品发布',
    coverImage: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'campaign',
    status: 'inprogress',
    tags: ['春季', '产品发布', '重点'],
    progress: 75,
    updated: '2天前',
    deadline: '2025-06-15',
    team: [
      { id: 1, name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 2, name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=2' }
    ],
    statusText: '进行中'
  },
  {
    id: '2',
    title: '美妆新品社交媒体宣传',
    coverImage: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'social',
    status: 'review',
    tags: ['社交媒体', '美妆', '宣传'],
    progress: 85,
    updated: '昨天',
    deadline: '2025-06-20',
    team: [
      { id: 3, name: 'Lisa Wong', avatar: 'https://i.pravatar.cc/150?img=5' }
    ],
    statusText: '审核中',
    isFeatured: true
  },
  {
    id: '3',
    title: '护肤系列包装设计',
    coverImage: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'product',
    status: 'inprogress',
    tags: ['包装', '护肤', '设计'],
    progress: 60,
    updated: '3天前',
    deadline: '2025-07-10',
    team: [
      { id: 1, name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 4, name: 'Mike Chen', avatar: 'https://i.pravatar.cc/150?img=4' }
    ],
    statusText: '进行中'
  },
  {
    id: '4',
    title: '夏季促销活动',
    coverImage: 'https://images.pexels.com/photos/3826678/pexels-photo-3826678.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'campaign',
    status: 'completed',
    tags: ['促销', '夏季', '活动'],
    progress: 100,
    updated: '1周前',
    deadline: '2025-06-01',
    team: [
      { id: 1, name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 2, name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 3, name: 'Lisa Wong', avatar: 'https://i.pravatar.cc/150?img=5' }
    ],
    statusText: '已完成'
  },
  {
    id: '5',
    title: '年度品牌重塑计划',
    coverImage: 'https://images.pexels.com/photos/4620843/pexels-photo-4620843.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'other',
    status: 'inprogress',
    tags: ['品牌', '重塑', '年度'],
    progress: 45,
    updated: '今天',
    deadline: '2025-12-31',
    team: [
      { id: 5, name: 'Emma Johnson', avatar: 'https://i.pravatar.cc/150?img=9' },
      { id: 6, name: 'David Park', avatar: 'https://i.pravatar.cc/150?img=3' }
    ],
    statusText: '进行中',
    isFeatured: true
  },
  {
    id: '6',
    title: '彩妆系列广告拍摄',
    coverImage: 'https://images.pexels.com/photos/8128072/pexels-photo-8128072.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'campaign',
    status: 'archived',
    tags: ['广告', '拍摄', '彩妆'],
    progress: 100,
    updated: '1个月前',
    deadline: '2025-03-15',
    team: [
      { id: 7, name: 'Alex Turner', avatar: 'https://i.pravatar.cc/150?img=7' }
    ],
    statusText: '已归档'
  }
];

// 创建项目按钮
const CreateButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  background: linear-gradient(135deg, #7C65FF 0%, #9180FF 100%);
  color: white;
  border: none;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(124, 101, 255, 0.25);
  
  i {
    margin-right: 8px;
  }
`;

// 项目卡片
const ProjectCard = styled(motion.div)`
  border-radius: 16px;
  overflow: hidden;
  background: ${props => props.isDark ? '#1e1e1e' : 'white'};
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.isDark ? '0.25' : '0.08'});
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, ${props => props.isDark ? '0.35' : '0.12'});
  }
`;

const ProjectCover = styled.div`
  width: 100%;
  height: 160px;
  background-size: cover;
  background-position: center;
  position: relative;
`;

const ProjectStatus = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  background: ${props => {
    switch(props.status) {
      case 'inprogress': return 'rgba(124, 101, 255, 0.9)';
      case 'review': return 'rgba(255, 170, 80, 0.9)';
      case 'completed': return 'rgba(52, 199, 89, 0.9)';
      case 'archived': return 'rgba(120, 120, 128, 0.9)';
      default: return 'rgba(124, 101, 255, 0.9)';
    }
  }};
  color: white;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const ProjectFeatured = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  background: rgba(255, 59, 48, 0.9);
  color: white;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const ProjectContent = styled.div`
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
`;

const ProjectTag = styled.span`
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.isDark ? '#bbb' : '#666'};
`;

const ProjectProgress = styled.div`
  margin-top: auto;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  border-radius: 3px;
  margin-top: 4px;
  overflow: hidden;
  
  &::before {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background: linear-gradient(to right, ${props => {
      if (props.status === 'completed') return '#34c759, #32d74b';
      if (props.status === 'review') return '#ff9500, #ffaa00';
      return '#7c65ff, #9180ff';
    }});
    border-radius: 3px;
    transition: width 0.3s ease;
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 12px;
  color: ${props => props.isDark ? '#888' : '#666'};
`;

const ProjectDeadline = styled.div`
  display: flex;
  align-items: center;
  
  i {
    margin-right: 4px;
  }
`;

const ProjectTeam = styled.div`
  display: flex;
`;

const TeamAvatar = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 2px solid ${props => props.isDark ? '#1e1e1e' : 'white'};
  margin-left: -8px;
  
  &:first-of-type {
    margin-left: 0;
  }
`;

const ProjectActions = styled.div`
  display: flex;
  padding: 12px 16px;
  border-top: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  justify-content: space-between;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.isDark ? '#bbb' : '#666'};
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
  display: flex;
  align-items: center;
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${props => props.isDark ? '#fff' : '#000'};
  }
  
  i {
    margin-right: 4px;
  }
`;

const Projects = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 状态管理
  const [activeCategory, setActiveCategory] = useState('所有项目');
  const [activeTypeFilter, setActiveTypeFilter] = useState(null);
  const [activeStatusFilter, setActiveStatusFilter] = useState(null);
  const [activeTag, setActiveTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projects, setProjects] = useState(mockProjects);
  
  // 处理项目点击，导航到项目详情页
  const handleProjectClick = (projectId) => {
    navigate(`/creativeprostudio/projects/${projectId}`);
  };
  
  // 处理分类变更
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  // 处理项目类型筛选
  const handleTypeFilterChange = (typeId) => {
    setActiveTypeFilter(activeTypeFilter === typeId ? null : typeId);
  };
  
  // 处理项目状态筛选
  const handleStatusFilterChange = (statusId) => {
    setActiveStatusFilter(activeStatusFilter === statusId ? null : statusId);
  };
  
  // 处理标签筛选
  const handleTagChange = (tagId) => {
    setActiveTag(activeTag === tagId ? null : tagId);
  };
  
  // 处理搜索
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  // 打开创建项目模态框
  const handleCreateProject = () => {
    setShowCreateModal(true);
  };
  
  // 关闭创建项目模态框
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };
  
  // 处理删除项目
  const handleDeleteProject = (e, project) => {
    e.stopPropagation(); // 阻止点击事件冒泡到卡片
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };
  
  // 确认删除
  const confirmDelete = () => {
    if (projectToDelete) {
      setProjects(projects.filter(project => project.id !== projectToDelete.id));
      setProjectToDelete(null);
      setShowDeleteModal(false);
    }
  };
  
  // 关闭删除确认弹窗
  const closeDeleteModal = () => {
    setProjectToDelete(null);
    setShowDeleteModal(false);
  };
  
  // 获取删除确认信息
  const getDeleteConfirmInfo = () => {
    if (!projectToDelete) return { title: '', message: '' };
    
    return {
      title: `删除项目：${projectToDelete.title}`,
      message: '确定要删除这个项目吗？此操作无法撤销，所有与该项目相关的设计和内容都将被移除。'
    };
  };
  
  // 过滤项目列表
  const filteredProjects = projects.filter(project => {
    // 根据分类筛选
    if (activeCategory === '进行中' && project.status !== 'inprogress') return false;
    if (activeCategory === '已完成' && project.status !== 'completed') return false;
    if (activeCategory === '已归档' && project.status !== 'archived') return false;
    
    // 根据项目类型筛选
    if (activeTypeFilter && project.type !== activeTypeFilter) return false;
    
    // 根据项目状态筛选
    if (activeStatusFilter && project.status !== activeStatusFilter) return false;
    
    // 根据标签筛选
    if (activeTag === 'new' && !project.updated.includes('天') && !project.updated.includes('昨天') && !project.updated.includes('今天')) return false;
    if (activeTag === 'active' && (project.status === 'archived' || project.status === 'completed')) return false;
    if (activeTag === 'upcoming') {
      const deadline = new Date(project.deadline);
      const now = new Date();
      const diffTime = deadline - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 14) return false;
    }
    if (activeTag === 'archived' && project.status !== 'archived') return false;
    
    // 根据搜索关键词筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  return (
    <PageLayout
      title="项目管理"
      subtitle="创建和管理您的设计项目，追踪进度和任务"
      icon="fa-project-diagram"
      iconColor="#9180FF"
    >
      {/* 顶部操作栏 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <CreateButton
            onClick={handleCreateProject}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <i className="fas fa-plus"></i>
            创建新项目
          </CreateButton>
        </div>
        
        <div className="flex space-x-2">
          <ActionButton isDark={isDark}>
            <i className="fas fa-sort-amount-down"></i>
            最新创建
          </ActionButton>
        </div>
      </div>
      
      {/* 筛选栏 */}
      <FilterBar 
        categories={projectCategories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        typeFilters={projectTypeFilters}
        activeTypeFilter={activeTypeFilter}
        onTypeFilterChange={handleTypeFilterChange}
        statusFilters={projectStatusFilters}
        activeStatusFilter={activeStatusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        tags={projectTags}
        activeTag={activeTag}
        onTagChange={handleTagChange}
        onSearch={handleSearch}
        searchPlaceholder="搜索项目名称或标签..."
      />
      
      {/* 项目网格 */}
      <GridLayout>
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              isDark={isDark}
              onClick={() => handleProjectClick(project.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ProjectCover style={{ backgroundImage: `url(${project.coverImage})` }}>
                <ProjectStatus status={project.status}>{project.statusText}</ProjectStatus>
                {project.isFeatured && <ProjectFeatured>重点项目</ProjectFeatured>}
              </ProjectCover>
              
              <ProjectContent>
                <ProjectTitle isDark={isDark}>{project.title}</ProjectTitle>
                
                <ProjectTags>
                  {project.tags.map((tag, index) => (
                    <ProjectTag key={index} isDark={isDark}>{tag}</ProjectTag>
                  ))}
                </ProjectTags>
                
                <ProjectProgress>
                  <div className="flex justify-between items-center text-xs" style={{ color: isDark ? '#aaa' : '#777' }}>
                    <span>进度</span>
                    <span>{project.progress}%</span>
                  </div>
                  <ProgressBar progress={project.progress} status={project.status} isDark={isDark} />
                </ProjectProgress>
                
                <ProjectMeta isDark={isDark}>
                  <ProjectDeadline>
                    <i className="far fa-calendar-alt"></i>
                    <span style={{ marginLeft: 4 }}>截止: {project.deadline}</span>
                  </ProjectDeadline>
                  
                  <ProjectTeam>
                    {project.team.slice(0, 3).map((member, index) => (
                      <TeamAvatar 
                        key={index} 
                        style={{ backgroundImage: `url(${member.avatar})` }}
                        isDark={isDark}
                        title={member.name}
                      />
                    ))}
                    {project.team.length > 3 && (
                      <TeamAvatar
                        isDark={isDark}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontSize: '10px',
                          backgroundColor: isDark ? '#333' : '#eee',
                          color: isDark ? '#ddd' : '#666'
                        }}
                      >
                        +{project.team.length - 3}
                      </TeamAvatar>
                    )}
                  </ProjectTeam>
                </ProjectMeta>
              </ProjectContent>
              
              <ProjectActions isDark={isDark}>
                <ActionButton isDark={isDark}>
                  <i className="far fa-edit"></i>
                  编辑
                </ActionButton>
                
                <ActionButton 
                  isDark={isDark}
                  onClick={(e) => handleDeleteProject(e, project)}
                  style={{ color: isDark ? '#ff6b6b' : '#ff3b30' }}
                >
                  <i className="far fa-trash-alt"></i>
                  删除
                </ActionButton>
              </ProjectActions>
            </ProjectCard>
          ))
        ) : (
          <div className="col-span-3 py-12 text-center" style={{ color: isDark ? '#aaa' : '#666' }}>
            <i className="fas fa-search text-4xl mb-3 opacity-30"></i>
            <p>没有找到符合条件的项目</p>
          </div>
        )}
      </GridLayout>
      
      {/* 创建项目模态框 */}
      {showCreateModal && (
        <CreateProjectModal
          onClose={handleCloseCreateModal}
          isDark={isDark}
        />
      )}
      
      {/* 删除确认模态框 */}
      {showDeleteModal && (
        <DeleteConfirmModal
          title={getDeleteConfirmInfo().title}
          message={getDeleteConfirmInfo().message}
          onConfirm={confirmDelete}
          onCancel={closeDeleteModal}
          isDark={isDark}
        />
      )}
    </PageLayout>
  );
};

export default Projects; 