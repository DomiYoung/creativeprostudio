import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design-system';

// 导入统一组件
import PageLayout from '../design-system/components/PageLayout';
import ContentCard from '../design-system/components/ContentCard';
import { GridLayout } from '../design-system/components/GridLayout';
import FilterBar from '../design-system/components/FilterBar';

// 导入批量处理中心相关数据
import { 
  batchStatus, 
  batchTypes, 
  batchProjects,
  batchVersionHistory
} from '../data/mock/batches';

// 素材库样式
import styled from '@emotion/styled';

// 上传按钮
const CreateButton = styled(motion.button)`
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

const ImportButton = styled(motion.button)`
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

// 选择模式按钮
const SelectModeButton = styled(motion.button)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  background: ${props => props.isActive 
    ? props.isDark ? 'rgba(0, 102, 204, 0.2)' : 'rgba(0, 102, 204, 0.1)' 
    : props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'
  };
  color: ${props => props.isActive 
    ? '#0066cc' 
    : props.isDark ? '#f5f5f5' : '#1d1d1f'
  };
  border: 1px solid ${props => props.isActive 
    ? '#0066cc' 
    : props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  };
  margin-right: 12px;
  
  i {
    margin-right: 8px;
  }
`;

// 主组件
const BatchCenter = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 状态管理
  const [projects, setProjects] = useState(batchProjects);
  const [filteredProjects, setFilteredProjects] = useState(batchProjects);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);

  // 面包屑导航
  const breadcrumbs = [
    { label: '首页', path: '/creativeprostudio/prototype' },
    { label: '批量处理中心', path: '/creativeprostudio/batch-center' }
  ];
  
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
  
  // 项目点击
  const handleProjectClick = (project) => {
    if (isSelectMode) {
      if (selectedProjects.some(p => p.id === project.id)) {
        setSelectedProjects(prev => prev.filter(p => p.id !== project.id));
      } else {
        setSelectedProjects(prev => [...prev, project]);
      }
    } else {
      navigate(`/creativeprostudio/batch-center/${project.id}`);
    }
  };

  // 切换选择模式
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    if (isSelectMode) {
      setSelectedProjects([]);
    }
  };

  // 处理搜索
  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  // 获取类型标签
  const getProjectTags = (project) => {
    const tags = [];
    
    // 添加类型标签
    const typeInfo = batchTypes.find(t => t.id === project.type);
    if (typeInfo) {
      tags.push(typeInfo.name);
    }
    
    // 根据状态添加标签
    if (project.status === 'completed') {
      tags.push('已完成');
    } else if (project.status === 'processing') {
      tags.push('进行中');
    } else if (project.status === 'paused') {
      tags.push('已暂停');
    } else if (project.status === 'error') {
      tags.push('出错');
    }
    
    return tags;
  };

  return (
    <PageLayout
      title="批量处理中心"
      breadcrumbs={breadcrumbs}
      activeNav="batch-center"
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
        
        <ImportButton 
          isDark={isDark}
          onClick={() => console.log('导入项目')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fas fa-file-import"></i>
          导入项目
        </ImportButton>
        
        <div style={{ flex: 1 }}></div>
        
        <CreateButton 
          whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(255, 145, 144, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewProjectModal(true)}
        >
          <i className="fas fa-plus"></i> 新建批量项目
        </CreateButton>
      </div>
      
      {/* 筛选栏 */}
      <FilterBar
        segments={batchStatus.map(status => status.name)}
        activeSegment={batchStatus.find(status => status.id === selectedStatus)?.name || '全部项目'}
        onSegmentChange={(segment) => {
          const statusObj = batchStatus.find(status => status.name === segment);
          setSelectedStatus(statusObj ? statusObj.id : 'all');
        }}
        showSearch={true}
        searchPlaceholder="搜索项目..."
        onSearch={handleSearch}
      />
      
      {/* 项目网格 */}
      <GridLayout
        columns="auto-fill"
        minItemWidth="280px"
        isDark={isDark}
        isLoading={false}
        isEmpty={filteredProjects.length === 0}
        emptyIcon="fas fa-tasks"
        emptyTitle="未找到批量项目"
        emptyDescription="调整筛选条件或创建一个新的批量处理项目"
      >
        {filteredProjects.map(project => (
          <ContentCard
            key={project.id}
            image={project.thumbnail}
            title={project.name}
            description={project.description}
            status={project.status === 'processing' ? 'active' : project.status === 'completed' ? 'completed' : project.status}
            statusText={batchStatus.find(s => s.id === project.status)?.name}
            isFavorite={project.bookmarked}
            isSelected={selectedProjects.some(p => p.id === project.id)}
            showSelectIndicator={isSelectMode}
            onFavoriteToggle={() => toggleBookmark(project.id)}
            metaItems={[
              { icon: 'fa-tasks', text: `${project.itemCount} 项目` },
              { icon: 'fa-check-circle', text: `${project.successCount} 已完成` }
            ]}
            tags={getProjectTags(project)}
            progress={project.status === 'processing' || project.status === 'paused' ? project.progress : null}
            onClick={() => handleProjectClick(project)}
            aspectRatio="16/9"
          />
        ))}
      </GridLayout>
    </PageLayout>
  );
};

export default BatchCenter; 