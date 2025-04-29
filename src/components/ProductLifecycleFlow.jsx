import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// 样式组件
const Container = styled.div`
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #1D1D1F;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-family: 'Poppins', 'SF Pro Display', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(90deg, #FF6B6B 0%, #FFB88C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Description = styled.p`
  font-size: 1.1rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem auto;
  color: #86868B;
  line-height: 1.6;
`;

const StagesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 3rem;
  
  &:before {
    content: '';
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #F5E1D9, #FFB5C5, #B6E5D8, #97C1FF, #D5B3FF, #FFE599, #F5E1D9);
    z-index: 0;
  }
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1.5rem;
    
    &:before {
      display: none;
    }
  }
`;

const StageNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 1024px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const StageCircle = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${props => props.bgColor || '#F5E1D9'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &:before {
    content: '${props => props.number}';
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 1024px) {
    width: 60px;
    height: 60px;
    margin-bottom: 0;
    
    &:before {
      width: 24px;
      height: 24px;
      font-size: 12px;
    }
  }
`;

const StageIcon = styled.div`
  font-size: 2.5rem;
  
  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const StageName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
  max-width: 120px;
  
  @media (max-width: 1024px) {
    margin-bottom: 0;
    text-align: left;
    max-width: none;
  }
`;

const DetailsPanel = styled(motion.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-top: 1rem;
  position: relative;
  border-top: 5px solid ${props => props.accentColor || '#F5E1D9'};
  
  &:before {
    content: '';
    position: absolute;
    top: -15px;
    left: ${props => props.arrowPosition || '50%'};
    transform: translateX(-50%) rotate(45deg);
    width: 30px;
    height: 30px;
    background: ${props => props.accentColor || '#F5E1D9'};
    z-index: -1;
  }
`;

const DetailTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1D1D1F;
`;

const DetailDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #86868B;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h5`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1D1D1F;
`;

const List = styled.ul`
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
  color: #4A4A4A;
  
  &:before {
    content: '•';
    color: ${props => props.color || '#F5E1D9'};
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;

const AISection = styled.div`
  background: linear-gradient(to right, rgba(245, 225, 217, 0.2), rgba(255, 181, 197, 0.2));
  border-radius: 12px;
  padding: 1.25rem;
  margin-top: 1rem;
`;

const AITitle = styled.h5`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: #FFB5C5;
  }
`;

const Copyright = styled.div`
  font-size: 0.9rem;
  color: #86868B;
  text-align: center;
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid #E5E5E7;
`;

const ProductLifecycleFlow = () => {
  const [activeStage, setActiveStage] = useState(0);
  
  const stages = [
    {
      id: 'planning',
      name: '规划构想',
      icon: '🔍',
      color: '#F5E1D9', // 活力橙
      description: '明确产品愿景、目标市场与核心价值主张',
      activities: [
        '市场调研与竞品分析',
        '用户需求初步收集',
        '产品概念头脑风暴',
        '确定价值主张',
        '初步可行性评估'
      ],
      deliverables: [
        '产品愿景文档',
        '市场分析报告',
        '高层概念原型',
        '初步投资回报评估'
      ],
      tools: [
        'Miro (在线协作白板)',
        'Figma (概念原型)',
        'Market Research Tools',
        'SWOT分析模板'
      ],
      aiOptimization: '利用AI分析美妆与潮流行业趋势数据，预测Z世代用户行为模式，生成初步产品概念可视化效果。',
      proTips: [
        '关注Z世代用户在美妆与潮流领域的独特痛点',
        '构建对Z世代有吸引力的品牌故事',
        '整合社交媒体趋势与用户生成内容策略',
        '确保产品概念兼顾创意性与商业可行性'
      ]
    },
    {
      id: 'requirements',
      name: '需求分析',
      icon: '📊',
      color: '#FFB5C5', // 清新粉
      description: '深入了解用户需求，定义产品功能与技术要求',
      activities: [
        '用户访谈与问卷调查',
        '用户画像创建',
        'MoSCoW需求分类',
        '功能地图绘制',
        '技术可行性评估'
      ],
      deliverables: [
        '详细用户画像',
        '功能需求文档',
        '用户故事地图',
        '技术要求规格',
        '产品路线图'
      ],
      tools: [
        'Jira/Azure DevOps (需求管理)',
        'UserTesting.com (用户研究)',
        'Lucidchart (流程图)',
        'Google Analytics (数据分析)'
      ],
      aiOptimization: '使用AI分析用户反馈数据，识别Z世代美妆爱好者的共性需求模式，自动生成初步用户画像和需求分类。',
      proTips: [
        '采用情绪映射技术理解Z世代用户决策历程',
        '结合定量与定性研究方法确保全面性',
        '重点关注创意表达、社交分享和个性化需求',
        '将需求按"用户价值vs开发成本"矩阵评估优先级'
      ]
    },
    {
      id: 'design',
      name: '设计',
      icon: '🎨',
      color: '#B6E5D8', // 薄荷绿
      description: '创建直观的用户体验和健壮的技术架构',
      activities: [
        '信息架构设计',
        'UI组件设计系统创建',
        '交互设计与原型',
        '技术架构设计',
        '数据模型设计'
      ],
      deliverables: [
        '设计系统',
        '高保真UI设计',
        '交互原型',
        '技术架构图',
        '数据库ER图'
      ],
      tools: [
        'Figma/Adobe XD (UI设计)',
        'Principle/ProtoPie (原型动效)',
        'Draw.io (架构图)',
        'Entity Framework (数据建模)'
      ],
      aiOptimization: '利用AI生成UI设计变体，辅助创建符合Z世代审美的视觉元素，自动检测设计一致性问题，提供微动效建议。',
      proTips: [
        '采用触觉反馈增强UI互动体验',
        '设计符合Z世代审美的微交互动效',
        '构建渐进式信息展示，避免认知超载',
        '保持视觉系统的一致性与品牌特色'
      ]
    },
    {
      id: 'development',
      name: '开发',
      icon: '💻',
      color: '#97C1FF', // 天空蓝
      description: '高质量实现产品功能，确保代码可维护性',
      activities: [
        '前端组件开发',
        'API开发与集成',
        '数据库实现',
        'AI功能集成',
        '持续集成管道搭建'
      ],
      deliverables: [
        '功能完整的代码库',
        'API文档',
        '单元测试',
        '技术文档',
        '构建流水线'
      ],
      tools: [
        'React.js/Next.js (前端)',
        '.NET Core (后端)',
        'PostgreSQL (数据库)',
        'Azure/AWS (云服务)',
        'GitHub Actions (CI/CD)'
      ],
      aiOptimization: '使用AI辅助代码生成，针对美妆试用场景优化性能瓶颈，实时代码审查和漏洞检测，自动化单元测试生成。',
      proTips: [
        '优化图像处理流程，确保产品效果图高质量显示',
        '实现高性能的美妆AR试用功能',
        '前端采用组件化开发，提高复用性',
        '针对移动端优化触控交互体验'
      ]
    },
    {
      id: 'testing',
      name: '测试',
      icon: '🧪',
      color: '#D5B3FF', // 柔和紫
      description: '验证产品功能、性能和用户体验',
      activities: [
        '功能测试',
        '性能测试',
        '兼容性测试',
        '安全测试',
        '用户验收测试'
      ],
      deliverables: [
        '测试计划',
        '测试用例',
        '测试结果报告',
        'Bug跟踪文档',
        '性能报告'
      ],
      tools: [
        'Jest/React Testing Library (前端测试)',
        'NUnit (后端测试)',
        'Selenium (E2E测试)',
        'JMeter (性能测试)',
        'OWASP ZAP (安全测试)'
      ],
      aiOptimization: 'AI生成测试用例，模拟Z世代用户行为进行测试，预测美妆应用的潜在故障点，自动化视觉回归测试。',
      proTips: [
        '组织Z世代用户焦点小组进行实际使用测试',
        '确保AR试妆功能在各种光线条件下表现良好',
        '测试用户生成内容上传与处理流程的稳定性',
        '评估社交分享功能在各主流平台的兼容性'
      ]
    },
    {
      id: 'deployment',
      name: '部署',
      icon: '🚀',
      color: '#FFE599', // 奶油黄
      description: '平稳高效地将产品发布到生产环境',
      activities: [
        '部署策略制定',
        '环境配置',
        '数据迁移',
        '发布管理',
        '监控系统搭建'
      ],
      deliverables: [
        '部署文档',
        '发布说明',
        '监控仪表板',
        '备份恢复计划',
        '运维手册'
      ],
      tools: [
        'Docker/Kubernetes (容器化)',
        'Azure/AWS (云服务)',
        'New Relic/Datadog (监控)',
        'CloudFlare (CDN)',
        'Terraform (基础设施即代码)'
      ],
      aiOptimization: 'AI预测系统负载和资源需求，优化部署配置，提前识别潜在部署风险，智能伸缩资源应对用户流量高峰。',
      proTips: [
        '实施灰度发布策略，逐步扩大用户覆盖范围',
        '优化媒体资源的CDN分发，提升全球访问速度',
        '配置实时错误监控和用户体验跟踪',
        '实施自动化回滚机制，确保故障快速恢复'
      ]
    },
    {
      id: 'iteration',
      name: '迭代',
      icon: '🔄',
      color: '#F5E1D9', // 活力橙
      description: '基于用户反馈持续改进产品',
      activities: [
        '用户行为分析',
        '反馈收集与分析',
        '功能优先级重排',
        '新特性开发',
        'A/B测试'
      ],
      deliverables: [
        '用户行为报告',
        '迭代计划',
        '产品更新日志',
        '性能改进报告',
        '新功能规格'
      ],
      tools: [
        'Google Analytics/Mixpanel (分析)',
        'Hotjar (热图分析)',
        'UserVoice (用户反馈)',
        'Optimizely (A/B测试)',
        'LaunchDarkly (特性开关)'
      ],
      aiOptimization: 'AI分析Z世代用户行为数据，预测美妆趋势变化，识别用户流失风险点，推荐个性化内容优化策略。',
      proTips: [
        '关注Z世代用户社交互动模式的演变',
        '实施快速迭代周期，响应美妆潮流变化',
        '优化AI推荐系统，提高个性化准确度',
        '分析用户生成内容的参与度和传播路径'
      ]
    }
  ];
  
  // 计算箭头位置百分比
  const getArrowPosition = () => {
    // 根据当前活跃阶段计算箭头位置
    const stageCount = stages.length;
    const position = (activeStage / (stageCount - 1)) * 100;
    return `${position}%`;
  };
  
  return (
    <Container>
      <Title>CreativePro Studio产品生命周期</Title>
      <Description>
        探索美妆与潮流相关产品从构思到迭代的七个关键阶段，点击每个阶段了解详细信息。
      </Description>
      
      <StagesWrapper>
        {stages.map((stage, index) => (
          <StageNode 
            key={stage.id}
            onClick={() => setActiveStage(index)}
          >
            <StageCircle 
              bgColor={stage.color}
              number={index + 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: activeStage === index 
                  ? '0 10px 25px rgba(0, 0, 0, 0.2)' 
                  : '0 8px 16px rgba(0, 0, 0, 0.1)' 
              }}
            >
              <StageIcon>{stage.icon}</StageIcon>
            </StageCircle>
            <StageName>{stage.name}</StageName>
          </StageNode>
        ))}
      </StagesWrapper>
      
      <AnimatePresence mode="wait">
        <DetailsPanel
          key={activeStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          accentColor={stages[activeStage].color}
          arrowPosition={getArrowPosition()}
        >
          <DetailTitle>{stages[activeStage].name}</DetailTitle>
          <DetailDescription>{stages[activeStage].description}</DetailDescription>
          
          <SectionTitle>核心活动</SectionTitle>
          <List>
            {stages[activeStage].activities.map((activity, index) => (
              <ListItem key={index} color={stages[activeStage].color}>
                {activity}
              </ListItem>
            ))}
          </List>
          
          <SectionTitle>交付物</SectionTitle>
          <List>
            {stages[activeStage].deliverables.map((deliverable, index) => (
              <ListItem key={index} color={stages[activeStage].color}>
                {deliverable}
              </ListItem>
            ))}
          </List>
          
          <SectionTitle>推荐工具</SectionTitle>
          <List>
            {stages[activeStage].tools.map((tool, index) => (
              <ListItem key={index} color={stages[activeStage].color}>
                {tool}
              </ListItem>
            ))}
          </List>
          
          <AISection>
            <AITitle>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM13 7H11V13H17V11H13V7Z" fill="currentColor"/>
              </svg>
              AI优化策略
            </AITitle>
            <p>{stages[activeStage].aiOptimization}</p>
          </AISection>
          
          <SectionTitle style={{ marginTop: '1.5rem' }}>专业建议</SectionTitle>
          <List>
            {stages[activeStage].proTips.map((tip, index) => (
              <ListItem key={index} color={stages[activeStage].color}>
                {tip}
              </ListItem>
            ))}
          </List>
        </DetailsPanel>
      </AnimatePresence>
      
      <Copyright>© domiyoung__</Copyright>
    </Container>
  );
};

export default ProductLifecycleFlow; 