import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Icons
import PlanningIcon from '@mui/icons-material/Lightbulb';
import RequirementsIcon from '@mui/icons-material/AssignmentTurnedIn';
import DesignIcon from '@mui/icons-material/Brush';
import DevelopmentIcon from '@mui/icons-material/Code';
import TestingIcon from '@mui/icons-material/BugReport';
import DeploymentIcon from '@mui/icons-material/Rocket';
import IterationIcon from '@mui/icons-material/Autorenew';

// Styled Components
const FlowContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  padding: 40px 20px;
  background: linear-gradient(135deg, #fad0c4 0%, #f3a0c3 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 700;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 24px;
  }
`;

const FlowWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ConnectionLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  transform: translateY(-50%);
  z-index: 1;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const StageItem = styled(motion.div)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => props.active ? 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)' : '#fff'};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
    width: 100px;
    height: 100px;
  }
`;

const StageIconWrapper = styled.div`
  color: ${props => props.active ? '#fff' : '#6a11cb'};
  font-size: 36px;
  margin-bottom: 8px;
`;

const StageName = styled.p`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: ${props => props.active ? '#fff' : '#333'};
`;

const StageLabel = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const StageDescription = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const DescriptionTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 16px;
`;

const DescriptionText = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
`;

const CtaButton = styled(motion.button)`
  padding: 12px 24px;
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3);
  
  &:hover {
    box-shadow: 0 8px 20px rgba(106, 17, 203, 0.4);
  }
`;

const Copyright = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 500;
`;

// Main Component
const ProductLifecycleFlow = () => {
  const [activeStage, setActiveStage] = useState(null);
  const navigate = useNavigate();

  const stages = [
    { 
      id: 1, 
      name: '规划构想', 
      icon: <PlanningIcon fontSize="inherit" />,
      description: '确定产品愿景、目标和范围，进行市场调研与竞品分析，头脑风暴创新点。'
    },
    { 
      id: 2, 
      name: '需求分析', 
      icon: <RequirementsIcon fontSize="inherit" />,
      description: '收集和分析用户需求，建立用户画像，确定功能优先级，进行可行性评估。'
    },
    { 
      id: 3, 
      name: '设计', 
      icon: <DesignIcon fontSize="inherit" />,
      description: 'UI/UX设计，交互流程规划，技术架构设计，建立设计系统与规范。'
    },
    { 
      id: 4, 
      name: '开发', 
      icon: <DevelopmentIcon fontSize="inherit" />,
      description: '前端与后端开发，数据库设计，API实现，AI功能集成，版本控制。'
    },
    { 
      id: 5, 
      name: '测试', 
      icon: <TestingIcon fontSize="inherit" />,
      description: '单元测试，集成测试，用户验收测试，性能测试，兼容性测试，A/B测试。'
    },
    { 
      id: 6, 
      name: '部署', 
      icon: <DeploymentIcon fontSize="inherit" />,
      description: '环境配置，自动化部署，监控系统建立，SEO优化，安全审计，线上验证。'
    },
    { 
      id: 7, 
      name: '迭代', 
      icon: <IterationIcon fontSize="inherit" />,
      description: '用户反馈收集，数据分析，功能优化，规划新功能，持续集成与部署。'
    },
  ];

  const handleStageClick = (stage) => {
    if (activeStage === stage.id) {
      navigate(`/product-lifecycle/${stage.id}`);
    } else {
      setActiveStage(stage.id);
    }
  };

  const handleViewDetails = () => {
    if (activeStage) {
      navigate(`/product-lifecycle/${activeStage}`);
    }
  };

  return (
    <FlowContainer>
      <Title>创意产品生命周期</Title>
      
      <FlowWrapper>
        <ConnectionLine />
        {stages.map((stage) => (
          <StageItem 
            key={stage.id}
            active={activeStage === stage.id}
            onClick={() => handleStageClick(stage)}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.95 }}
          >
            <StageIconWrapper active={activeStage === stage.id}>
              {stage.icon}
            </StageIconWrapper>
            <StageName active={activeStage === stage.id}>
              {stage.name}
            </StageName>
            <StageLabel>{stage.id}</StageLabel>
          </StageItem>
        ))}
      </FlowWrapper>
      
      {activeStage && (
        <StageDescription
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DescriptionTitle>{stages.find(s => s.id === activeStage).name}</DescriptionTitle>
          <DescriptionText>{stages.find(s => s.id === activeStage).description}</DescriptionText>
          <CtaButton 
            onClick={handleViewDetails}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            查看详情
          </CtaButton>
        </StageDescription>
      )}

      <Copyright>© domiyoung__</Copyright>
    </FlowContainer>
  );
};

export default ProductLifecycleFlow; 