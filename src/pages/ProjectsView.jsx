import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design-system';

// 导入统一组件
import PageLayout from '../design-system/components/PageLayout';
import ContentCard from '../design-system/components/ContentCard';
import GridLayout from '../design-system/components/GridLayout';
import FilterBar from '../design-system/components/FilterBar';
import CreateProjectModal from '../components/ui/CreateProjectModal';
import DeleteConfirmModal from '../components/ui/DeleteConfirmModal';

// 图标导入
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';

// 素材库样式
import styled from '@emotion/styled';

// 按钮和模态框组件
const ActionButton = styled(motion.button)`
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

// 快速开始区域
const QuickStartSection = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  text-align: left;
`;

const QuickStartTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #FF9190;
`;

const QuickStartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const QuickStartCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 145, 144, 0.2);
  }
`;

const QuickStartIcon = styled.div`
  font-size: 24px;
  margin-bottom: 12px;
  color: #FF9190;
`;

const QuickStartLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

// 模拟数据
const mockProjects = [
  {
    id: "1",
    title: '夏季美妆产品',
    thumbnail: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: '电商产品',
    updated: '2025-03-15',
    itemCount: 24,
    status: '已导出',
    isFavorite: true
  },
  {
    id: "2",
    title: '春节促销活动',
    thumbnail: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: '营销活动',
    updated: '2025-02-28',
    itemCount: 36,
    status: '完成',
    isFavorite: true
  },
  {
    id: "3",
    title: '口红色号展示',
    thumbnail: 'https://images.pexels.com/photos/4620843/pexels-photo-4620843.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: '产品展示',
    updated: '2025-02-20',
    itemCount: 16,
    status: '进行中',
    isFavorite: false
  },
  {
    id: "4",
    title: '护肤品成分解析',
    thumbnail: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: '教育内容',
    updated: '2025-02-15',
    itemCount: 12,
    status: '已导出',
    isFavorite: false
  },
  {
    id: "5",
    title: '母亲节特别系列',
    thumbnail: 'https://images.pexels.com/photos/3826678/pexels-photo-3826678.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: '营销活动',
    updated: '2025-02-10',
    itemCount: 28,
    status: '完成',
    isFavorite: false
  },
  {
    id: "6",
    title: '夏季防晒产品',
    thumbnail: 'https://images.pexels.com/photos/8128072/pexels-photo-8128072.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: '产品展示',
    updated: '2025-02-05',
    itemCount: 8,
    status: '已导出',
    isFavorite: true
  }
];

// 过滤选项
const statusFilters = [
  { id: 'all', label: '全部', icon: 'fa-border-all' },
  { id: 'inProgress', label: '进行中', icon: 'fa-spinner' },
  { id: 'completed', label: '已完成', icon: 'fa-check-circle' },
  { id: 'exported', label: '已导出', icon: 'fa-file-export' }
];

const typeFilters = [
  { id: 'all', label: '全部类型', icon: 'fa-layer-group' },
  { id: 'product', label: '产品展示', icon: 'fa-box-open' },
  { id: 'marketing', label: '营销活动', icon: 'fa-bullhorn' },
  { id: 'education', label: '教育内容', icon: 'fa-graduation-cap' }
];

const projectTags = [
  { id: 'favorites', label: '收藏', icon: 'fa-star' },
  { id: 'recent', label: '最近浏览', icon: 'fa-clock' },
  { id: 'shared', label: '已共享', icon: 'fa-share-alt' }
];

// 主组件
const ProjectsView = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  
  // 状态管理
  const [projects, setProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [activeStatus, setActiveStatus] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [activeTags, setActiveTags] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  
  // 模态框状态
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectsToDelete, setProjectsToDelete] = useState([]);
  
  // 处理收藏/取消收藏
  const toggleStar = (id, e) => {
    e.stopPropagation();
    setProjects(projects.map(project => 
      project.id === id ? {...project, isFavorite: !project.isFavorite} : project
    ));
  };

  // 处理项目点击
  const handleProjectClick = (id) => {
    navigate(`/creativeprostudio/projects/${id}`);
  };

  // 处理下拉菜单
  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // 处理操作
  const handleAction = (action, id, e) => {
    e.stopPropagation();
    setDropdownOpen(null);
    
    switch(action) {
      case 'edit':
        navigate(`/creativeprostudio/canvas-editor?project=${id}`);
        break;
      case 'share':
        // 共享逻辑
        break;
      case 'delete':
        // 打开删除确认模态框
        setProjectToDelete(projects.find(p => p.id === id));
        setIsDeleteModalOpen(true);
        break;
      case 'download':
        // 下载逻辑
        break;
      default:
        break;
    }
  };

  // 处理状态过滤
  const handleStatusChange = (statusId) => {
    setActiveStatus(statusId);
  };

  // 处理类型过滤
  const handleTypeChange = (typeId) => {
    setActiveType(typeId);
  };

  // 处理标签过滤
  const handleTagChange = (tagId) => {
    setActiveTags(
      activeTags.includes(tagId)
        ? activeTags.filter(id => id !== tagId)
        : [...activeTags, tagId]
    );
  };

  // 处理搜索
  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  // 处理新建项目
  const handleCreateProject = () => {
    setIsCreateModalOpen(true);
  };
  
  // 关闭新建项目模态框
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  
  // 处理新项目创建
  const handleProjectCreated = (newProject) => {
    setProjects([newProject, ...projects]);
    
    // 显示成功通知
    showNotification('项目创建成功');
  };
  
  // 批量删除选中项目
  const handleBatchDelete = () => {
    if (selectedProjects.length > 0) {
      setProjectsToDelete(selectedProjects);
      setIsDeleteModalOpen(true);
    }
  };
  
  // 确认删除项目
  const confirmDelete = () => {
    if (projectToDelete) {
      // 单个删除
      setProjects(projects.filter(p => p.id !== projectToDelete.id));
      showNotification(`项目"${projectToDelete.title}"已删除`);
      setProjectToDelete(null);
    } else if (projectsToDelete.length > 0) {
      // 批量删除
      setProjects(projects.filter(p => !projectsToDelete.includes(p.id)));
      showNotification(`已删除${projectsToDelete.length}个项目`);
      setSelectedProjects([]);
      setProjectsToDelete([]);
      setIsSelectMode(false);
    }
    setIsDeleteModalOpen(false);
  };
  
  // 取消删除
  const cancelDelete = () => {
    setProjectToDelete(null);
    setProjectsToDelete([]);
    setIsDeleteModalOpen(false);
  };
  
  // 辅助函数：显示通知
  const showNotification = (message) => {
    // 这里可以接入通知系统，例如 toast 通知
    console.log('通知:', message);
  };

  // 切换选择模式
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    if (isSelectMode) {
      setSelectedProjects([]);
    }
  };
  
  // 获取删除确认信息
  const getDeleteConfirmInfo = () => {
    if (projectToDelete) {
      return {
        title: '删除项目',
        message: `确定要删除项目"${projectToDelete.title}"吗？此操作不可撤销。`,
        confirmText: '删除',
        cancelText: '取消'
      };
    } else if (projectsToDelete.length > 0) {
      return {
        title: '批量删除项目',
        message: `确定要删除选中的${projectsToDelete.length}个项目吗？此操作不可撤销。`,
        confirmText: '全部删除',
        cancelText: '取消'
      };
    }
    return {};
  };

  // 过滤项目
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = activeStatus === 'all' || 
      (activeStatus === 'inProgress' && project.status === '进行中') ||
      (activeStatus === 'completed' && project.status === '完成') ||
      (activeStatus === 'exported' && project.status === '已导出');
    const matchesType = activeType === 'all' || 
      (activeType === 'product' && project.type === '产品展示') ||
      (activeType === 'marketing' && project.type === '营销活动') ||
      (activeType === 'education' && project.type === '教育内容');
    const matchesTags = activeTags.length === 0 || 
      (activeTags.includes('favorites') && project.isFavorite) ||
      (activeTags.includes('recent')) || // 这里可以添加最近浏览逻辑
      (activeTags.includes('shared')); // 这里可以添加已共享逻辑
    
    return matchesSearch && matchesStatus && matchesType && matchesTags;
  });
  
  // 构建页面操作按钮
  const renderPageActions = () => {
    return isSelectMode ? [
      <ActionButton 
        key="batch-delete"
        onClick={handleBatchDelete}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={selectedProjects.length === 0}
        style={{ 
          opacity: selectedProjects.length === 0 ? 0.6 : 1,
          cursor: selectedProjects.length === 0 ? 'not-allowed' : 'pointer' 
        }}
      >
        <i className="fas fa-trash-alt"></i>
        删除所选 ({selectedProjects.length})
      </ActionButton>
    ] : [
      <ActionButton 
        key="create-project"
        onClick={handleCreateProject}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <i className="fas fa-plus"></i>
        创建项目
      </ActionButton>
    ];
  };

  // 处理卡片点击导航到项目详情
  const handleCardClick = (id) => {
    console.log(`导航到项目详情，项目ID: ${id}，类型: ${typeof id}`);
    navigate(`/creativeprostudio/projects/${id}`);
  };

  // 处理编辑设计按钮点击
  const handleEditDesign = (e, id) => {
    e.stopPropagation();
    console.log(`导航到画布编辑器，项目ID: ${id}，类型: ${typeof id}`);
    navigate(`/creativeprostudio/canvas-editor?project=${id}`);
  };

  return (
    <PageLayout 
      title="项目管理"
      breadcrumbs={[
        { label: '首页', path: '/creativeprostudio' },
        { label: '项目管理', path: '/creativeprostudio/projects' }
      ]}
      actions={renderPageActions()}
    >
      {/* 过滤栏 */}
      <FilterBar
        searchPlaceholder="搜索项目..."
        onSearch={handleSearch}
        filterGroups={[
          {
            title: '项目状态',
            items: statusFilters,
            activeItem: activeStatus,
            onChange: handleStatusChange
          },
          {
            title: '项目类型',
            items: typeFilters,
            activeItem: activeType,
            onChange: handleTypeChange
          },
          {
            title: '标签',
            items: projectTags,
            activeItems: activeTags,
            onChange: handleTagChange,
            multiSelect: true
          }
        ]}
        viewOptions={true}
        currentView={viewMode}
        onViewChange={setViewMode}
        selectionMode={{
          enabled: isSelectMode,
          onToggle: toggleSelectMode,
          selectedItems: selectedProjects,
          onSelectionChange: setSelectedProjects
        }}
      />

      {/* 项目网格 */}
      <GridLayout>
        {filteredProjects.map(project => (
          <ContentCard
            key={project.id}
            title={project.title}
            image={project.thumbnail || "https://source.unsplash.com/random/300x200?fashion"}
            metaItems={[
              { text: project.type, icon: 'fa-tag' },
              { text: `${project.itemCount || 0}项`, icon: 'fa-layer-group' },
              { text: project.updated, icon: 'fa-clock' }
            ]}
            status={project.status === '进行中' ? 'in-progress' : project.status === '完成' ? 'completed' : 'review'}
            statusText={project.status}
            progress={project.progress || 0}
            isFavorite={project.isFavorite}
            tags={project.tags || []}
            contributors={project.team || []}
            onClick={() => handleCardClick(project.id)}
            onDelete={(e) => {
              e.stopPropagation();
              setProjectToDelete(project);
              setIsDeleteModalOpen(true);
            }}
            selectable={isSelectMode}
            selected={selectedProjects.includes(project.id)}
            onSelect={() => {
              if (isSelectMode) {
                setSelectedProjects(
                  selectedProjects.includes(project.id)
                    ? selectedProjects.filter(id => id !== project.id)
                    : [...selectedProjects, project.id]
                );
              } else {
                handleCardClick(project.id);
              }
            }}
          />
        ))}
      </GridLayout>
      
      {/* 空状态提示 */}
      {filteredProjects.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: isDark ? '#bbb' : '#666'
        }}>
          <div style={{ 
            fontSize: '72px', 
            marginBottom: '20px',
            opacity: 0.6 
          }}>
            <i className="fas fa-folder-open"></i>
          </div>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: '600',
            marginBottom: '8px',
            color: isDark ? '#f5f5f5' : '#1d1d1f'
          }}>
            没有找到项目
          </h3>
          <p style={{ 
            fontSize: '16px', 
            maxWidth: '400px',
            margin: '0 auto 24px'
          }}>
            {searchTerm 
              ? `没有找到与"${searchTerm}"相关的项目，请尝试其他搜索条件。` 
              : '创建新项目开始您的创意之旅。'}
          </p>
          
          {!isSelectMode && (
            <div>
              <ActionButton 
                onClick={handleCreateProject}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ display: 'inline-flex', marginBottom: '24px' }}
              >
                <i className="fas fa-plus"></i>
                创建项目
              </ActionButton>
              
              <QuickStartSection>
                <QuickStartTitle>快速开始</QuickStartTitle>
                <QuickStartGrid>
                  <QuickStartCard
                    onClick={() => {
                      setIsCreateModalOpen(true);
                      // 可以预设模板ID
                    }}
                  >
                    <QuickStartIcon>
                      <i className="fas fa-shopping-bag"></i>
                    </QuickStartIcon>
                    <QuickStartLabel>电商营销</QuickStartLabel>
                  </QuickStartCard>
                  
                  <QuickStartCard
                    onClick={() => {
                      setIsCreateModalOpen(true);
                      // 可以预设模板ID
                    }}
                  >
                    <QuickStartIcon>
                      <i className="fas fa-images"></i>
                    </QuickStartIcon>
                    <QuickStartLabel>社交媒体</QuickStartLabel>
                  </QuickStartCard>
                  
                  <QuickStartCard
                    onClick={() => {
                      setIsCreateModalOpen(true);
                      // 可以预设模板ID
                    }}
                  >
                    <QuickStartIcon>
                      <i className="fas fa-magic"></i>
                    </QuickStartIcon>
                    <QuickStartLabel>内容创作</QuickStartLabel>
                  </QuickStartCard>
                </QuickStartGrid>
              </QuickStartSection>
            </div>
          )}
        </div>
      )}
      
      {/* 新建项目模态框 */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreateProject={handleProjectCreated}
      />
      
      {/* 删除确认模态框 */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        {...getDeleteConfirmInfo()}
      />
    </PageLayout>
  );
};

export default ProjectsView; 