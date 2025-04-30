import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design-system';

// 导入样式组件
import * as S from '../design-system/styles/PrototypeDesignStyles';

// 导入mock数据
import { projects, contributorColors } from '../data/mock/projects';
import { workflows } from '../data/mock/workflows';

// 动画变体
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const springItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

// Main component
const PrototypeDesign = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [activeSegment, setActiveSegment] = useState('我的项目');
  const [hoveredWorkflow, setHoveredWorkflow] = useState(null);
  
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
          <S.NavItem onClick={() => navigate('/creativeprostudio/batch-center')}>
            <i className="fas fa-th-large"></i> 批量处理中心
          </S.NavItem>
        </S.NavGroup>
        <S.NavGroup>
          <motion.div whileTap={{ scale: 0.95 }}>
            <S.UserAvatar>
              D
            </S.UserAvatar>
          </motion.div>
        </S.NavGroup>
      </S.Header>

      {/* 主要内容 */}
      <S.MainContent>
        {/* 欢迎区域 */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <S.WelcomeHero>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              CreativePro Studio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              专为美妆电商设计的高效创意工具，简化设计流程，提升团队协作
            </motion.p>
          </S.WelcomeHero>
        </motion.div>

        {/* 工作流卡片 */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <S.WorkflowCard>
            <S.WorkflowSteps>
              {workflows.map((workflow, index) => (
                <S.WorkflowStep 
                  key={workflow.step}
                  onClick={() => handleWorkflowStepClick(workflow.path)}
                  onMouseEnter={() => setHoveredWorkflow(workflow.step)}
                  onMouseLeave={() => setHoveredWorkflow(null)}
                >
                  <S.StepIconContainer className="step-icon-container">
                    <motion.div
                      animate={{ 
                        scale: hoveredWorkflow === workflow.step ? 1.1 : 1,
                        rotate: hoveredWorkflow === workflow.step ? 10 : 0
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <S.StepIcon color={workflow.color}>
                        <i className={`fas ${workflow.icon}`}></i>
                      </S.StepIcon>
                    </motion.div>
                  </S.StepIconContainer>
                  <S.StepTitle>{workflow.step}. {workflow.title}</S.StepTitle>
                  <S.StepDescription>{workflow.description}</S.StepDescription>
                </S.WorkflowStep>
              ))}
            </S.WorkflowSteps>
          </S.WorkflowCard>
        </motion.div>

        {/* 项目管理区域 */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
        >
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
        </motion.div>

        {/* 项目卡片网格 */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <S.ProjectsGrid>
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={springItem}
                  layout
                  transition={{ delay: index * 0.05 }}
                >
                  <S.ProjectCard 
                    whileHover={{ 
                      y: -10, 
                      boxShadow: '0 16px 30px rgba(0, 0, 0, 0.08)',
                      borderColor: 'rgba(0, 0, 0, 0.08)'
                    }}
                    onClick={() => navigate('/creativeprostudio/projects/1')}
                  >
                    <S.ProjectPreview>
                      <motion.img 
                        src={project.image} 
                        alt={project.title}
                        whileHover={{ scale: 1.08, rotate: -1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <S.ProjectStatus status={project.status}>
                        {project.statusText}
                      </S.ProjectStatus>
                    </S.ProjectPreview>
                    <S.ProjectInfo>
                      <S.ProjectTitle>
                        <span>{project.title}</span>
                        {project.starred && (
                          <motion.i 
                            className="fas fa-star" 
                            style={{ color: '#FFE599' }}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                          ></motion.i>
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
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: project.progress }}
                          transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                        >
                          <S.ProgressFill progress={project.progress} />
                        </motion.div>
                      </S.ProgressBar>
                      <S.ProjectContributors>
                        {project.contributors.map((contributor, i) => (
                          <motion.div
                            key={`${project.id}-contributor-${i}`}
                            whileHover={{ y: -4, scale: 1.1, zIndex: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <S.Contributor 
                              color={contributorColors[contributor]}
                              index={5 - i}
                            >
                              {contributor}
                            </S.Contributor>
                          </motion.div>
                        ))}
                        <motion.div
                          whileHover={{ y: -4, scale: 1.1, zIndex: 10 }}
                        >
                          <S.Contributor isAdd index={1}>+</S.Contributor>
                        </motion.div>
                      </S.ProjectContributors>
                    </S.ProjectInfo>
                  </S.ProjectCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </S.ProjectsGrid>
        </motion.div>

        {/* 创建新项目按钮 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
        >
          <S.CreateProjectButton
            onClick={() => navigate('/batch-create')}
            whileHover={{ 
              y: -8, 
              boxShadow: '0 16px 40px rgba(255, 145, 144, 0.4)'
            }}
            whileTap={{ scale: 0.94 }}
          >
            <i className="fas fa-plus"></i>
          </S.CreateProjectButton>
        </motion.div>
      </S.MainContent>

      {/* 页脚 */}
      <S.Footer>
        <S.FooterLogo>
          <span>CreativePro</span> <span>Studio</span>
        </S.FooterLogo>
        <S.FooterText>专为美妆电商设计的高效创意工具</S.FooterText>
        <S.FooterLinks>
          <motion.div whileHover={{ y: -2 }}>
            <S.FooterLink onClick={() => navigate('/')}>关于我们</S.FooterLink>
          </motion.div>
          <motion.div whileHover={{ y: -2 }}>
            <S.FooterLink onClick={() => navigate('/help')}>帮助中心</S.FooterLink>
          </motion.div>
          <motion.div whileHover={{ y: -2 }}>
            <S.FooterLink onClick={() => navigate('/privacy')}>隐私政策</S.FooterLink>
          </motion.div>
          <motion.div whileHover={{ y: -2 }}>
            <S.FooterLink onClick={() => navigate('/terms')}>用户协议</S.FooterLink>
          </motion.div>
        </S.FooterLinks>
        <S.Copyright>© 版权归属domiyoung__ 2025 CreativePro Studio. All rights reserved.</S.Copyright>
      </S.Footer>
    </S.Container>
  );
};

export default PrototypeDesign; 