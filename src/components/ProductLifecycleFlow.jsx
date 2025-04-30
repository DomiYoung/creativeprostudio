import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design-system';

// 自定义样式组件
const FlowContainer = styled(motion.div)`
  width: 100%;
  margin: 30px 0;
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: ${props => props.isDark 
    ? 'linear-gradient(145deg, rgba(30, 30, 35, 0.7), rgba(20, 20, 25, 0.7))' 
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(245, 245, 247, 0.8))'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, ${props => props.isDark ? '0.25' : '0.07'});
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  padding: 40px;
  
  &::before {
    content: '';
    position: absolute;
    top: -100px;
    left: -100px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: ${props => props.isDark 
      ? 'radial-gradient(circle, rgba(255, 145, 144, 0.15), transparent 70%)' 
      : 'radial-gradient(circle, rgba(255, 145, 144, 0.1), transparent 70%)'};
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -80px;
    right: -80px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: ${props => props.isDark 
      ? 'radial-gradient(circle, rgba(109, 201, 255, 0.15), transparent 70%)' 
      : 'radial-gradient(circle, rgba(109, 201, 255, 0.1), transparent 70%)'};
    z-index: 0;
  }
`;

const FlowTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
  text-align: center;
  position: relative;
  z-index: 1;
`;

const StagesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  position: relative;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, 
      #FF9190, #FFA194, #FFB898, #6DC9FF, #8B75FF, #06D6A0
    );
    z-index: 1;
    border-radius: 3px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 40px;
    
    &::before {
      display: none;
    }
  }
`;

const Stage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 3;
  width: 100px;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    gap: 20px;
  }
`;

const StageIcon = styled(motion.div)`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: ${props => props.isActive 
    ? props.gradient || 'linear-gradient(135deg, #FF9190, #FF7A7A)'
    : props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: ${props => props.isActive ? 'white' : props.isDark ? '#aaa' : '#666'};
  font-size: 28px;
  box-shadow: ${props => props.isActive 
    ? '0 10px 20px rgba(0, 0, 0, 0.15)' 
    : props.isDark ? '0 5px 15px rgba(0, 0, 0, 0.2)' : '0 5px 15px rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.isActive 
      ? '0 15px 30px rgba(0, 0, 0, 0.2)' 
      : props.isDark ? '0 10px 20px rgba(0, 0, 0, 0.25)' : '0 10px 20px rgba(0, 0, 0, 0.1)'};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 45px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.isActive 
      ? props.gradient || 'linear-gradient(135deg, #FF9190, #FF7A7A)'
      : props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    z-index: 2;
    box-shadow: ${props => props.isActive 
      ? '0 0 10px rgba(255, 145, 144, 0.5)' 
      : 'none'};
  }
  
  @media (max-width: 768px) {
    margin-bottom: 0;
    width: 70px;
    height: 70px;
    font-size: 24px;
    
    &::before {
      display: none;
    }
  }
`;

const StageName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.isActive 
    ? props.textColor || '#FF9190' 
    : props.isDark ? '#aaa' : '#666'};
  text-align: center;
  transition: color 0.3s ease;
  max-width: 100px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    max-width: none;
    text-align: left;
  }
`;

const ContentPanel = styled(motion.div)`
  background: ${props => props.isDark 
    ? 'rgba(20, 20, 25, 0.7)' 
    : 'rgba(255, 255, 255, 0.7)'};
  border-radius: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 30px;
  min-height: 300px;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  position: relative;
  z-index: 2;
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
`;

const ContentTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${props => props.color || (props.isDark ? '#f5f5f5' : '#333')};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ContentDescription = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${props => props.isDark ? '#bbb' : '#555'};
  margin-bottom: 20px;
`;

const FeaturesList = styled.ul`
  margin-left: 20px;
  margin-bottom: 20px;
  
  li {
    margin-bottom: 10px;
    color: ${props => props.isDark ? '#bbb' : '#555'};
    position: relative;
    
    &::before {
      content: '•';
      color: ${props => props.color || '#FF9190'};
      font-size: 20px;
      position: absolute;
      left: -20px;
      top: -2px;
    }
  }
`;

const Copyright = styled.div`
  font-size: 12px;
  color: ${props => props.isDark ? '#777' : '#999'};
  text-align: right;
  margin-top: 20px;
`;

// 阶段数据
const stagesData = [
  {
    id: 'planning',
    name: '规划构想',
    icon: 'fas fa-lightbulb',
    gradient: 'linear-gradient(135deg, #FF9190, #FF7A7A)',
    textColor: '#FF9190',
    title: '规划构想阶段',
    description: '这是Z世代美妆潮流产品的创意起点，我们进行市场调研，头脑风暴和战略定位，确保产品符合目标用户需求。',
    features: [
      '目标用户（18-25岁Z世代女性）的深度洞察',
      '竞品分析与市场机会识别',
      '品牌定位与产品概念构思',
      '初步商业可行性评估'
    ]
  },
  {
    id: 'analysis',
    name: '需求分析',
    icon: 'fas fa-search',
    gradient: 'linear-gradient(135deg, #FFA194, #FF8F80)',
    textColor: '#FFA194',
    title: '需求分析阶段',
    description: '深入理解Z世代用户的期望与行为，通过数据分析和用户调研，确定功能优先级和技术可行性。',
    features: [
      '用户研究与体验测试',
      '功能需求优先级排序（使用MoSCoW方法）',
      '技术可行性评估',
      '用户旅程和用例开发'
    ]
  },
  {
    id: 'design',
    name: '设计',
    icon: 'fas fa-pencil-ruler',
    gradient: 'linear-gradient(135deg, #FFB898, #FFA87E)',
    textColor: '#FFB898',
    title: 'UI/UX设计阶段',
    description: '创建视觉吸引力强、互动性高的界面，融合Z世代审美（渐变色、3D效果、微动效），确保良好的用户体验。',
    features: [
      '线框图与用户流程图创建',
      'Z世代审美的视觉设计（渐变色、微交互、3D元素）',
      '响应式设计确保在所有设备上的体验一致性',
      '可访问性设计确保包容性体验'
    ]
  },
  {
    id: 'development',
    name: '开发',
    icon: 'fas fa-code',
    gradient: 'linear-gradient(135deg, #6DC9FF, #39B8FF)',
    textColor: '#6DC9FF',
    title: '开发阶段',
    description: '使用React.js和.NET Core实现设计，确保性能优化和AI集成，为Z世代用户提供流畅体验。',
    features: [
      'React.js前端开发（组件设计、状态管理）',
      '.NET Core API开发',
      'AI功能集成（个性化推荐、视觉生成）',
      '性能优化确保快速加载和响应'
    ]
  },
  {
    id: 'testing',
    name: '测试',
    icon: 'fas fa-vial',
    gradient: 'linear-gradient(135deg, #8B75FF, #6A4DFF)',
    textColor: '#8B75FF',
    title: '测试阶段',
    description: '全面测试确保产品质量和可靠性，包括功能测试、UI测试和性能测试，收集用户反馈进行优化。',
    features: [
      '功能测试确保所有功能按预期工作',
      '用户接受度测试（与Z世代美妆爱好者）',
      '性能和负载测试',
      'A/B测试优化用户转化率'
    ]
  },
  {
    id: 'deployment',
    name: '部署',
    icon: 'fas fa-rocket',
    gradient: 'linear-gradient(135deg, #06D6A0, #04BF8A)',
    textColor: '#06D6A0',
    title: '部署阶段',
    description: '产品正式上线，确保CI/CD流程、监控系统和SEO优化，为Z世代用户提供稳定、高质量的体验。',
    features: [
      'CI/CD流程部署',
      '服务器配置与安全性',
      '监控与日志系统配置',
      'SEO优化确保可发现性'
    ]
  },
  {
    id: 'iteration',
    name: '迭代',
    icon: 'fas fa-sync-alt',
    gradient: 'linear-gradient(135deg, #EF476F, #D64161)',
    textColor: '#EF476F',
    title: '迭代阶段',
    description: '持续改进产品，分析用户数据，收集反馈，并规划新功能，确保产品不断满足Z世代用户不断变化的需求。',
    features: [
      '用户行为数据分析',
      '反馈收集与问题修复',
      '新功能规划与开发',
      '性能和用户体验持续优化'
    ]
  }
];

const ProductLifecycleFlow = () => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [activeStage, setActiveStage] = useState('planning');
  
  const currentStage = stagesData.find(stage => stage.id === activeStage);
  
  return (
    <FlowContainer
      isDark={isDark}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FlowTitle isDark={isDark}>产品生命周期七阶段</FlowTitle>
      
      <StagesContainer>
        {stagesData.map((stage) => (
          <Stage
            key={stage.id}
            onClick={() => setActiveStage(stage.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <StageIcon
              isDark={isDark}
              isActive={activeStage === stage.id}
              gradient={stage.gradient}
              whileHover={{ y: -5 }}
            >
              <i className={stage.icon}></i>
            </StageIcon>
            <StageName 
              isDark={isDark} 
              isActive={activeStage === stage.id}
              textColor={stage.textColor}
            >
              {stage.name}
            </StageName>
          </Stage>
        ))}
      </StagesContainer>
      
      <AnimatePresence mode="wait">
        <ContentPanel
          key={activeStage}
          isDark={isDark}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {currentStage && (
            <>
              <ContentTitle isDark={isDark} color={currentStage.textColor}>
                <i className={currentStage.icon}></i>
                {currentStage.title}
              </ContentTitle>
              
              <ContentDescription isDark={isDark}>
                {currentStage.description}
              </ContentDescription>
              
              <h4 style={{ 
                marginBottom: '16px', 
                fontSize: '16px', 
                fontWeight: 600,
                color: isDark ? '#ddd' : '#444' 
              }}>
                关键活动
              </h4>
              
              <FeaturesList isDark={isDark} color={currentStage.textColor}>
                {currentStage.features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </FeaturesList>
              
              <Copyright isDark={isDark}>
                © 版权归属domiyoung__
              </Copyright>
            </>
          )}
        </ContentPanel>
      </AnimatePresence>
    </FlowContainer>
  );
};

export default ProductLifecycleFlow; 