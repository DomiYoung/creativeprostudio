import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../design-system';

// 导入样式组件
import * as S from '../design-system/styles/PrototypeDesignStyles';

// 导入mock数据
import { projects, contributorColors } from '../data/mock/projects';
import { workflows } from '../data/mock/workflows';

// Main component
const PrototypeDesign = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [activeSegment, setActiveSegment] = useState('我的项目');
  
  // 处理工作流步骤点击事件
  const handleWorkflowStepClick = (path) => {
    navigate(path);
  };
  
  return (
    <S.Container>
      {/* 导航栏 */}
      <S.Header>
        <S.NavGroup>
          <S.LogoContainer>
            <S.Logo>
              <S.LogoText>CreativePro </S.LogoText><S.LogoHighlight>Studio</S.LogoHighlight>
            </S.Logo>
          </S.LogoContainer>
          <S.NavItem onClick={() => navigate('/')} className="active">
            <i className="fas fa-home"></i> 首页
          </S.NavItem>
          <S.NavItem onClick={() => navigate('/canvas-editor')}>
            <i className="fas fa-edit"></i> 画布编辑器
          </S.NavItem>
          <S.NavItem onClick={() => navigate('/batch-center')}>
            <i className="fas fa-th-large"></i> 批量处理中心
          </S.NavItem>
        </S.NavGroup>
        <S.NavGroup>
          <S.UserAvatar>
            D
          </S.UserAvatar>
        </S.NavGroup>
      </S.Header>

      {/* 主要内容 */}
      <S.MainContent>
        {/* 欢迎区域 */}
        <S.WelcomeHero>
          <h1>CreativePro Studio</h1>
          <p>专为美妆电商设计的高效创意工具，简化设计流程，提升团队协作</p>
        </S.WelcomeHero>

        {/* 工作流卡片 */}
        <S.WorkflowCard>
          <S.WorkflowSteps>
            {workflows.map((workflow, index) => (
              <S.WorkflowStep 
                key={workflow.step}
                onClick={() => handleWorkflowStepClick(workflow.path)}
              >
                <S.StepIconContainer className="step-icon-container">
                  <S.StepIcon color={workflow.color}>
                    <i className={`fas ${workflow.icon}`}></i>
                  </S.StepIcon>
                </S.StepIconContainer>
                <S.StepTitle>{workflow.step}. {workflow.title}</S.StepTitle>
                <S.StepDescription>{workflow.description}</S.StepDescription>
              </S.WorkflowStep>
            ))}
          </S.WorkflowSteps>
        </S.WorkflowCard>

        {/* 项目管理区域 */}
        <S.SegmentedControl>
          {['我的项目', '共享项目', '已归档'].map(segment => (
            <S.Segment 
              key={segment}
              className={activeSegment === segment ? 'active' : ''}
              onClick={() => setActiveSegment(segment)}
            >
              {segment}
            </S.Segment>
          ))}
        </S.SegmentedControl>

        {/* 项目卡片网格 */}
        <S.ProjectsGrid>
          {projects.map(project => (
            <S.ProjectCard 
              key={project.id}
              whileHover={{ 
                y: -6, 
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.06)',
                borderColor: '#E4E4E4'
              }}
              onClick={() => navigate('/projects')}
            >
              <S.ProjectPreview>
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  whileHover={{ scale: 1.05 }}
                />
                <S.ProjectStatus status={project.status}>
                  {project.statusText}
                </S.ProjectStatus>
              </S.ProjectPreview>
              <S.ProjectInfo>
                <S.ProjectTitle>
                  <span>{project.title}</span>
                  {project.starred && (
                    <i className="fas fa-star" style={{ color: '#FFE599' }}></i>
                  )}
                </S.ProjectTitle>
                <S.ProjectMeta>
                  <S.MetaItem>
                    <i className="far fa-calendar"></i> 更新于 {project.updated}
                  </S.MetaItem>
                  <S.MetaItem>
                    <i className="far fa-image"></i> {project.count}
                  </S.MetaItem>
                </S.ProjectMeta>
                <S.ProgressBar>
                  <S.ProgressFill progress={project.progress} />
                </S.ProgressBar>
                <S.ProjectContributors>
                  {project.contributors.map((contributor, i) => (
                    <S.Contributor 
                      key={`${project.id}-contributor-${i}`}
                      color={contributorColors[contributor]}
                      index={5 - i}
                    >
                      {contributor}
                    </S.Contributor>
                  ))}
                  <S.Contributor isAdd index={1}>+</S.Contributor>
                </S.ProjectContributors>
              </S.ProjectInfo>
            </S.ProjectCard>
          ))}
        </S.ProjectsGrid>

        {/* 创建新项目按钮 */}
        <S.CreateProjectButton
          onClick={() => navigate('/batch-create')}
          whileHover={{ 
            y: -6, 
            boxShadow: '0 12px 30px rgba(245, 166, 128, 0.3)', 
            backgroundColor: '#FF9267' 
          }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-plus"></i>
        </S.CreateProjectButton>
      </S.MainContent>

      {/* 页脚 */}
      <S.Footer>
        <S.FooterLogo>
          <span>CreativePro</span> <span>Studio</span>
        </S.FooterLogo>
        <S.FooterText>专为美妆电商设计的高效创意工具</S.FooterText>
        <S.FooterLinks>
          <S.FooterLink onClick={() => navigate('/')}>关于我们</S.FooterLink>
          <S.FooterLink onClick={() => navigate('/help')}>帮助中心</S.FooterLink>
          <S.FooterLink onClick={() => navigate('/privacy')}>隐私政策</S.FooterLink>
          <S.FooterLink onClick={() => navigate('/terms')}>用户协议</S.FooterLink>
        </S.FooterLinks>
        <S.Copyright>© 2025 CreativePro Studio. All rights reserved.</S.Copyright>
      </S.Footer>
    </S.Container>
  );
};

export default PrototypeDesign; 