import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../design-system';

// Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import CloseIcon from '@mui/icons-material/Close';

// Container for the entire page
const Container = styled.div`
  min-height: 100vh;
  padding: 40px;
  background: ${props => props.isDark 
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
    : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Header with title and description
const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.isDark ? '#f8f9fa' : '#212529'};
  margin-bottom: 16px;
  background: ${props => props.isDark 
    ? 'linear-gradient(90deg, #FF9190 0%, #FF4F80 100%)' 
    : 'linear-gradient(90deg, #FF4F80 0%, #A139FD 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${props => props.isDark ? '#a0a0a0' : '#495057'};
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Flow chart container
const FlowChartContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  position: relative;
  margin-top: 20px;
  
  &::after {
    content: "© domiyoung__";
    position: absolute;
    bottom: -60px;
    right: 20px;
    font-size: 14px;
    color: ${props => props.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
  }
`;

// Horizontal Flow Chart
const HorizontalFlow = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 100px;
  
  &::before {
    content: '';
    position: absolute;
    top: 60px;
    left: 80px;
    right: 80px;
    height: 4px;
    background: ${props => props.isDark 
      ? 'linear-gradient(90deg, #FF9190 0%, #FF4F80 50%, #A139FD 100%)' 
      : 'linear-gradient(90deg, #FF4F80 0%, #A139FD 50%, #4A9FFF 100%)'};
    border-radius: 2px;
    z-index: 0;
  }
  
  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    gap: 40px;
    
    &::before {
      display: none;
    }
  }
`;

// Stage node in the flow chart
const StageNode = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  @media (max-width: 1100px) {
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    gap: 20px;
  }
`;

const StageIcon = styled(motion.div)`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background: ${props => props.isDark 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(255, 255, 255, 0.8)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.isDark 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.05)'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  svg {
    font-size: 40px;
    color: ${props => props.color || (props.isDark ? '#ffffff' : '#000000')};
  }
  
  @media (max-width: 1100px) {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin-bottom: 0;
    
    svg {
      font-size: 30px;
    }
  }
`;

const StageName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.isDark ? '#f8f9fa' : '#212529'};
  text-align: center;
  max-width: 140px;
  
  @media (max-width: 1100px) {
    text-align: left;
    max-width: none;
  }
`;

// Modal for stage details
const StageDetailModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.isDark 
    ? 'rgba(0, 0, 0, 0.8)' 
    : 'rgba(0, 0, 0, 0.5)'};
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
`;

const ModalContent = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  background: ${props => props.isDark 
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
    : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'};
  border-radius: 20px;
  padding: 40px;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  max-height: 90vh;
  border: 1px solid ${props => props.isDark 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.05)'};
  
  &::after {
    content: "© domiyoung__";
    position: absolute;
    bottom: 15px;
    right: 20px;
    font-size: 12px;
    color: ${props => props.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
  }
  
  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${props => props.isDark ? '#a0a0a0' : '#495057'};
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
`;

const StageTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  background: ${props => props.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 15px;
  
  svg {
    font-size: 32px;
    color: ${props => props.iconColor};
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Section = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${props => props.isDark ? '#f8f9fa' : '#212529'};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const List = styled.ul`
  padding-left: 20px;
  margin-bottom: 20px;
`;

const ListItem = styled.li`
  color: ${props => props.isDark ? '#a0a0a0' : '#495057'};
  margin-bottom: 10px;
  line-height: 1.6;
  
  strong {
    color: ${props => props.isDark ? '#f8f9fa' : '#212529'};
  }
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.gradient};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  
  svg {
    font-size: 20px;
  }
`;

// Product Lifecycle Stage Data with domiyoung__ copyright
const lifecycleStages = [
  {
    id: 'planning',
    name: '规划构想',
    icon: <LightbulbOutlinedIcon />,
    color: '#FFD166',
    gradient: 'linear-gradient(90deg, #FFD166 0%, #FF9190 100%)',
    content: {
      objectives: [
        '确定美妆/时尚产品的目标受众与差异化特点',
        '明确创意方向与品牌调性',
        '初步规划关键功能与用户旅程'
      ],
      activities: [
        '开展Z世代用户调研（定性+定量）',
        '分析TikTok/Instagram美妆/时尚趋势',
        '竞品分析与差异化定位',
        '头脑风暴创新功能点'
      ],
      deliverables: [
        '产品愿景文档',
        '用户画像（Persona）',
        '初步功能列表',
        '创意方向板（Moodboard）'
      ],
      tools: [
        'Figma (用户画像与情绪板)',
        'Miro (远程协作头脑风暴)',
        'UXPin (用户旅程图)',
        'Survey Monkey (用户调研)'
      ],
      aiStrategies: [
        '使用GPT-4分析美妆社交媒体趋势',
        '利用AI生成多种产品概念，团队筛选最佳方案',
        '通过机器学习分析Z世代用户偏好'
      ]
    },
    copyright: '© domiyoung__'
  },
  {
    id: 'requirements',
    name: '需求分析',
    icon: <AssignmentOutlinedIcon />,
    color: '#FF9190',
    gradient: 'linear-gradient(90deg, #FF9190 0%, #FF4F80 100%)',
    content: {
      objectives: [
        '明确产品详细功能需求',
        '优先级排序与迭代规划',
        '评估技术可行性与资源需求'
      ],
      activities: [
        '用户访谈与需求收集',
        '功能分解与用户故事编写',
        '技术栈评估与决策',
        'MoSCoW需求优先级划分'
      ],
      deliverables: [
        '详细需求规格说明书',
        '用户故事地图',
        '功能优先级矩阵',
        '技术可行性评估报告'
      ],
      tools: [
        'Jira (需求管理)',
        'Confluence (需求文档)',
        'Trello (看板管理)',
        'LucidChart (用户故事地图)'
      ],
      aiStrategies: [
        '使用AI辅助生成用户故事与验收标准',
        '利用自然语言处理分析用户反馈',
        '通过机器学习预测功能开发复杂度'
      ]
    },
    copyright: '© domiyoung__'
  },
  {
    id: 'design',
    name: '设计',
    icon: <ColorLensOutlinedIcon />,
    color: '#FF4F80',
    gradient: 'linear-gradient(90deg, #FF4F80 0%, #A139FD 100%)',
    content: {
      objectives: [
        '创建符合Z世代美学的视觉设计',
        '设计直观且高转化的用户界面',
        '制定组件库与设计规范'
      ],
      activities: [
        '信息架构与用户流程设计',
        '低保真原型设计与测试',
        '视觉设计与品牌融合',
        '高保真原型与交互设计',
        '用户测试与设计优化'
      ],
      deliverables: [
        'UI组件库与设计系统',
        '用户流程图',
        '高保真交互原型',
        '视觉规范指南',
        '用户测试报告'
      ],
      tools: [
        'Figma (UI设计与原型)',
        'Adobe XD (备选设计工具)',
        'Lottie (动效设计)',
        'Maze (用户测试)',
        'InVision (原型展示)'
      ],
      aiStrategies: [
        '使用AI生成多种设计方案与配色方案',
        '智能图像处理优化美妆产品展示效果',
        '基于用户行为数据优化界面布局'
      ]
    },
    copyright: '© domiyoung__'
  },
  {
    id: 'development',
    name: '开发',
    icon: <CodeOutlinedIcon />,
    color: '#A139FD',
    gradient: 'linear-gradient(90deg, #A139FD 0%, #4A9FFF 100%)',
    content: {
      objectives: [
        '高质量实现产品功能与界面',
        '确保代码可维护性与性能',
        '实现前后端无缝集成'
      ],
      activities: [
        '前端React.js组件开发',
        '.NET Core API实现',
        '数据库模型设计与实现',
        'AI功能集成',
        '持续集成与部署'
      ],
      deliverables: [
        '功能完整的产品代码库',
        'API文档',
        '数据库模型文档',
        '前端组件库',
        '技术架构文档'
      ],
      tools: [
        'Visual Studio Code (编码)',
        'GitHub (代码管理)',
        'Docker (容器化)',
        'Azure DevOps (CI/CD)',
        'Postman (API测试)'
      ],
      aiStrategies: [
        '利用AI辅助代码生成与重构',
        '自动化测试用例生成',
        '智能代码审查与优化'
      ]
    },
    copyright: '© domiyoung__'
  },
  {
    id: 'testing',
    name: '测试',
    icon: <BugReportOutlinedIcon />,
    color: '#4A9FFF',
    gradient: 'linear-gradient(90deg, #4A9FFF 0%, #00BFB2 100%)',
    content: {
      objectives: [
        '确保产品质量与用户体验',
        '验证所有功能按预期工作',
        '识别与修复潜在问题'
      ],
      activities: [
        '单元测试与集成测试',
        '用户界面自动化测试',
        '性能测试与优化',
        '用户验收测试',
        '跨浏览器与跨设备测试'
      ],
      deliverables: [
        '测试计划与测试用例',
        '测试自动化脚本',
        '缺陷报告与跟踪',
        '性能测试报告',
        'UAT签核文档'
      ],
      tools: [
        'Jest (JavaScript测试)',
        'Cypress (E2E测试)',
        'JMeter (性能测试)',
        'BrowserStack (跨浏览器测试)',
        'Azure Test Plans (测试管理)'
      ],
      aiStrategies: [
        'AI驱动的自动化测试生成',
        '智能缺陷检测与分类',
        '预测性能瓶颈分析'
      ]
    },
    copyright: '© domiyoung__'
  },
  {
    id: 'deployment',
    name: '部署',
    icon: <RocketLaunchOutlinedIcon />,
    color: '#00BFB2',
    gradient: 'linear-gradient(90deg, #00BFB2 0%, #06D6A0 100%)',
    content: {
      objectives: [
        '顺利将产品发布到生产环境',
        '确保系统稳定性与可用性',
        '实施监控与应急预案'
      ],
      activities: [
        '环境配置与准备',
        '数据库迁移与配置',
        '应用部署自动化',
        '负载均衡与扩展配置',
        'CDN与缓存策略'
      ],
      deliverables: [
        '部署流程文档',
        '基础设施即代码脚本',
        '运维手册',
        '监控与告警配置',
        '灾备与恢复计划'
      ],
      tools: [
        'Azure/AWS (云服务)',
        'Terraform (基础设施即代码)',
        'Kubernetes (容器编排)',
        'Prometheus (监控)',
        'Grafana (数据可视化)'
      ],
      aiStrategies: [
        'AI驱动的智能部署决策',
        '自动化异常检测与响应',
        '预测性资源扩展'
      ]
    },
    copyright: '© domiyoung__'
  },
  {
    id: 'iteration',
    name: '迭代',
    icon: <AutorenewOutlinedIcon />,
    color: '#06D6A0',
    gradient: 'linear-gradient(90deg, #06D6A0 0%, #FFD166 100%)',
    content: {
      objectives: [
        '基于用户反馈持续优化产品',
        '迭代开发新功能',
        '提升产品核心指标'
      ],
      activities: [
        '用户行为数据分析',
        '功能使用情况跟踪',
        'A/B测试新功能',
        '性能优化与技术债务清理',
        '规划下一轮迭代'
      ],
      deliverables: [
        '数据分析报告',
        '迭代计划与Backlog',
        'A/B测试结果',
        '性能优化报告',
        '产品路线图更新'
      ],
      tools: [
        'Google Analytics/Mixpanel (数据分析)',
        'Hotjar (用户行为跟踪)',
        'Optimizely (A/B测试)',
        'Amplitude (产品分析)',
        'ProductBoard (产品管理)'
      ],
      aiStrategies: [
        '利用机器学习预测用户喜好与趋势',
        'AI驱动的个性化推荐算法优化',
        '自动化用户行为模式识别'
      ]
    },
    copyright: '© domiyoung__'
  }
];

// Main component
const ProductLifecycle = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  const [selectedStage, setSelectedStage] = useState(null);
  const [animateStages, setAnimateStages] = useState(false);
  
  useEffect(() => {
    // Start animation after component mounts
    setTimeout(() => setAnimateStages(true), 500);
  }, []);
  
  const openStageDetails = (stage) => {
    setSelectedStage(stage);
  };
  
  const closeStageDetails = () => {
    setSelectedStage(null);
  };
  
  const navigateToNextStage = () => {
    if (!selectedStage) return;
    
    const currentIndex = lifecycleStages.findIndex(stage => stage.id === selectedStage.id);
    const nextIndex = (currentIndex + 1) % lifecycleStages.length;
    setSelectedStage(lifecycleStages[nextIndex]);
  };
  
  // Stage icon colors based on theme
  const getIconColor = (color) => {
    return isDark ? color : color;
  };
  
  return (
    <Container isDark={isDark}>
      <Header>
        <Title isDark={isDark}>产品生命周期</Title>
        <Description isDark={isDark}>
          美妆与潮流产品开发生命周期的七个关键阶段，每个阶段都包含详细的规划、活动及交付物。
          点击各个阶段了解更多信息。
        </Description>
      </Header>
      
      <FlowChartContainer isDark={isDark}>
        <HorizontalFlow isDark={isDark}>
          {lifecycleStages.map((stage, index) => (
            <StageNode 
              key={stage.id}
              onClick={() => openStageDetails(stage)}
              initial={{ opacity: 0, y: 50 }}
              animate={animateStages ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1, duration: 0.5 }
              } : {}}
            >
              <StageIcon 
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)' 
                }}
                whileTap={{ scale: 0.95 }}
                color={getIconColor(stage.color)}
                isDark={isDark}
              >
                {stage.icon}
              </StageIcon>
              <StageName isDark={isDark}>{stage.name}</StageName>
            </StageNode>
          ))}
        </HorizontalFlow>
      </FlowChartContainer>
      
      {/* Stage Detail Modal */}
      {selectedStage && (
        <StageDetailModal 
          isDark={isDark}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent 
            isDark={isDark}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <CloseButton isDark={isDark} onClick={closeStageDetails}>
              <CloseIcon />
            </CloseButton>
            
            <StageTitle 
              gradient={selectedStage.gradient} 
              iconColor={selectedStage.color}
            >
              {selectedStage.icon}
              {selectedStage.name}
            </StageTitle>
            
            <Section>
              <SectionTitle isDark={isDark}>
                <span role="img" aria-label="目标">🎯</span> 阶段目标
              </SectionTitle>
              <List>
                {selectedStage.content.objectives.map((item, index) => (
                  <ListItem key={index} isDark={isDark}>{item}</ListItem>
                ))}
              </List>
            </Section>
            
            <Section>
              <SectionTitle isDark={isDark}>
                <span role="img" aria-label="活动">⚡</span> 关键活动
              </SectionTitle>
              <List>
                {selectedStage.content.activities.map((item, index) => (
                  <ListItem key={index} isDark={isDark}>{item}</ListItem>
                ))}
              </List>
            </Section>
            
            <Section>
              <SectionTitle isDark={isDark}>
                <span role="img" aria-label="交付物">📦</span> 交付物
              </SectionTitle>
              <List>
                {selectedStage.content.deliverables.map((item, index) => (
                  <ListItem key={index} isDark={isDark}>{item}</ListItem>
                ))}
              </List>
            </Section>
            
            <Section>
              <SectionTitle isDark={isDark}>
                <span role="img" aria-label="工具">🛠️</span> 推荐工具
              </SectionTitle>
              <List>
                {selectedStage.content.tools.map((item, index) => (
                  <ListItem key={index} isDark={isDark}>{item}</ListItem>
                ))}
              </List>
            </Section>
            
            <Section>
              <SectionTitle isDark={isDark}>
                <span role="img" aria-label="AI优化">🤖</span> AI优化策略
              </SectionTitle>
              <List>
                {selectedStage.content.aiStrategies.map((item, index) => (
                  <ListItem key={index} isDark={isDark}>{item}</ListItem>
                ))}
              </List>
            </Section>
            
            <ActionButton 
              gradient={selectedStage.gradient}
              onClick={navigateToNextStage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              下一阶段 <ArrowForwardIcon />
            </ActionButton>
          </ModalContent>
        </StageDetailModal>
      )}
    </Container>
  );
};

export default ProductLifecycle; 