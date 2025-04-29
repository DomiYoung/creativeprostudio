import React, { useState } from 'react';
import styled from '@emotion/styled';
import colors from '../design-system/tokens/colors';
import spacing from '../design-system/tokens/spacing';
import typography from '../design-system/tokens/typography';
import Navigation from '../design-system/components/Navigation';
import { navigationItems } from '../data/sampleData';

// 页面容器样式
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    150deg,
    ${colors.gray[50]} 0%,
    ${colors.gray[100]} 100%
  );
  display: flex;
  flex-direction: column;
`;

// 主内容区
const MainContent = styled.main`
  padding: ${spacing.space[6]};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

// 页面标题
const PageTitle = styled.h1`
  color: ${colors.ui.text.primary.light};
  font-size: ${typography.fontSize.largeTitle};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing.space[4]};
  font-family: ${typography.fontFamily.display};
`;

// 页面副标题
const PageSubtitle = styled.p`
  color: ${colors.ui.text.secondary.light};
  font-size: ${typography.fontSize.body};
  max-width: 800px;
  margin-bottom: ${spacing.space[6]};
  line-height: ${typography.lineHeight.relaxed};
`;

// 内容区卡片
const ContentCard = styled.div`
  background-color: white;
  border-radius: ${spacing.borderRadius.lg};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: ${spacing.space[6]};
  margin-bottom: ${spacing.space[6]};
`;

// 生命周期流程图容器
const LifecycleFlowContainer = styled.div`
  margin: ${spacing.space[6]} 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 5%;
    right: 5%;
    height: 3px;
    background: linear-gradient(90deg, #F5E1D9, #FFB5C5, #B6E5D8);
    z-index: 0;
    border-radius: 3px;
  }
`;

// 阶段节点容器
const StagesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
`;

// 阶段节点
const StageNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

// 阶段图标
const StageIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => props.active ? props.color : 'white'};
  color: ${props => props.active ? 'white' : props.color};
  border: 2px solid ${props => props.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.space[3]};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  svg {
    width: 32px;
    height: 32px;
  }
  
  .stage-number {
    font-size: 10px;
    font-weight: ${typography.fontWeight.bold};
    margin-bottom: 4px;
  }
`;

// 阶段名称
const StageName = styled.div`
  font-size: ${typography.fontSize.callout};
  font-weight: ${props => props.active ? typography.fontWeight.semibold : typography.fontWeight.regular};
  color: ${props => props.active ? props.color : colors.ui.text.primary.light};
  transition: all 0.3s ease;
  text-align: center;
  max-width: 100px;
`;

// 阶段详情面板
const StageDetailsPanel = styled.div`
  background-color: white;
  border-radius: ${spacing.borderRadius.md};
  border: 1px solid ${props => props.color || colors.gray[200]};
  padding: ${spacing.space[5]};
  margin-top: ${spacing.space[6]};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: ${props => props.position}%;
    width: 16px;
    height: 16px;
    background-color: white;
    border-top: 1px solid ${props => props.color || colors.gray[200]};
    border-left: 1px solid ${props => props.color || colors.gray[200]};
    transform: rotate(45deg);
  }
`;

// 详情标题
const DetailsTitle = styled.h3`
  font-size: ${typography.fontSize.title3};
  color: ${props => props.color || colors.ui.text.primary.light};
  margin-bottom: ${spacing.space[4]};
  display: flex;
  align-items: center;
  gap: ${spacing.space[2]};
`;

// 详情部分
const DetailsSection = styled.div`
  margin-bottom: ${spacing.space[4]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

// 详情部分标题
const DetailsSectionTitle = styled.h4`
  font-size: ${typography.fontSize.headline};
  color: ${colors.ui.text.primary.light};
  margin-bottom: ${spacing.space[2]};
  font-weight: ${typography.fontWeight.semibold};
`;

// 详情部分内容列表
const DetailsList = styled.ul`
  margin: 0;
  padding-left: 18px;
  
  li {
    margin-bottom: ${spacing.space[2]};
    color: ${colors.ui.text.secondary.light};
  }
`;

// 详情部分文本
const DetailsText = styled.p`
  color: ${colors.ui.text.secondary.light};
  margin-bottom: ${spacing.space[3]};
`;

// 汇报原则卡片
const RuleCard = styled.div`
  background-color: ${props => props.highlighted ? '#FFF9E6' : 'white'};
  border-left: 4px solid ${props => props.color || colors.primary.light};
  border-radius: ${spacing.borderRadius.md};
  padding: ${spacing.space[4]};
  margin-bottom: ${spacing.space[4]};
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const RuleTitle = styled.h3`
  font-size: ${typography.fontSize.title3};
  color: ${colors.ui.text.primary.light};
  margin: 0 0 ${spacing.space[2]} 0;
`;

const RuleDescription = styled.p`
  color: ${colors.ui.text.secondary.light};
  font-size: ${typography.fontSize.body};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0;
`;

const SectionTitle = styled.h2`
  font-size: ${typography.fontSize.title2};
  color: ${colors.ui.text.primary.light};
  margin: ${spacing.space[6]} 0 ${spacing.space[4]};
  font-weight: ${typography.fontWeight.semibold};
  font-family: ${typography.fontFamily.display};
`;

const Footer = styled.footer`
  background-color: white;
  padding: ${spacing.space[4]};
  text-align: center;
  border-top: 1px solid ${colors.ui.border.light};
  margin-top: auto;
  
  p {
    color: ${colors.ui.text.secondary.light};
    font-size: ${typography.fontSize.footnote};
  }
`;

function ProductLifecyclePresentation() {
  const [activeStage, setActiveStage] = useState(0);
  
  // 生命周期阶段数据
  const lifecycleStages = [
    {
      id: 'planning',
      name: '规划构想',
      description: '明确产品愿景、目标市场与核心价值主张',
      color: '#F5E1D9', // 品牌橙色
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
        </svg>
      ),
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
      aiOptimization: '利用AI生成市场趋势分析，预测目标用户行为模式，生成初步产品概念可视化效果。'
    },
    {
      id: 'requirements',
      name: '需求分析',
      description: '深入了解用户需求，定义产品功能与技术要求',
      color: '#FFB5C5', // 品牌粉色
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M7,7H9V9H7V7M7,11H9V13H7V11M7,15H9V17H7V15M17,17H11V15H17V17M17,13H11V11H17V13M17,9H11V7H17V9Z" />
        </svg>
      ),
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
      aiOptimization: '使用AI分析用户反馈数据，识别模式和优先需求，自动生成初步用户画像和需求分类。'
    },
    {
      id: 'design',
      name: '设计',
      description: '创建直观的用户体验和健壮的技术架构',
      color: '#B6E5D8', // 薄荷绿
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21C8.21,21 10,19.21 10,17C10,15.95 9.55,15 9,14.3L7,14Z" />
        </svg>
      ),
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
      aiOptimization: '利用AI生成UI设计变体，辅助创建符合Z世代审美的视觉元素，自动检测设计一致性问题。'
    },
    {
      id: 'development',
      name: '开发',
      description: '高质量实现产品功能，确保代码可维护性',
      color: '#97C1FF', // 天空蓝
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z" />
        </svg>
      ),
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
      aiOptimization: '使用AI辅助代码生成，优化性能瓶颈，实时代码审查和漏洞检测。'
    },
    {
      id: 'testing',
      name: '测试',
      description: '验证产品功能、性能和用户体验',
      color: '#FFE599', // 奶油黄
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M13,13H11V7H13V13M13,17H11V15H13V17Z" />
        </svg>
      ),
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
      aiOptimization: 'AI生成测试用例，自动识别潜在边缘情况，模拟用户行为进行测试，预测潜在故障点。'
    },
    {
      id: 'deployment',
      name: '部署',
      description: '平稳高效地将产品发布到生产环境',
      color: '#B6E5D8', // 薄荷绿
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M18,11H10L13.5,7.5L12.08,6.08L6.16,12L12.08,17.92L13.5,16.5L10,13H18V11Z" />
        </svg>
      ),
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
      aiOptimization: 'AI预测系统负载和资源需求，优化部署配置，提前识别潜在部署风险，智能伸缩资源。'
    },
    {
      id: 'iteration',
      name: '迭代',
      description: '基于用户反馈持续改进产品',
      color: '#D5B3FF', // 柔和紫
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
        </svg>
      ),
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
      aiOptimization: 'AI分析用户行为数据，预测趋势变化，识别改进机会，推荐优化策略和新功能。'
    }
  ];
  
  // 汇报原则数据
  const reportingPrinciples = [
    {
      title: '先说结果（汇报核心成果）',
      description: '开始汇报时，直接陈述项目的当前阶段、关键成果和需要决策的事项，确保在前30秒内传达最重要的信息。',
      color: '#F5E1D9', // 品牌橙色
      highlighted: true
    },
    {
      title: '按时间说（过去→现在→将来）',
      description: '按时间顺序组织内容：上次汇报以来的进展、当前所处阶段的工作状态、下个阶段的计划和预期。',
      color: '#FFB5C5', // 品牌粉色
      highlighted: false
    },
    {
      title: '带方案问（提出解决思路）',
      description: '提出问题的同时附带2-3个解决方案建议及其利弊分析，展示深度思考。',
      color: '#B6E5D8', // 薄荷绿
      highlighted: false
    },
    {
      title: '用数据说（精确而非模糊）',
      description: '用精确数据支持论点，包括完成率、资源使用情况、关键指标对比，并以图表可视化展示。',
      color: '#97C1FF', // 天空蓝
      highlighted: false
    },
    {
      title: '要行动项（明确谁干啥）',
      description: '明确列出后续行动计划，包括负责人、截止日期和预期成果，以及需要领导决策或支持的事项。',
      color: '#D5B3FF', // 柔和紫
      highlighted: true
    }
  ];
  
  // 计算阶段详情面板的箭头位置
  const getPositionPercentage = () => {
    return (100 / (lifecycleStages.length - 1)) * activeStage;
  };
  
  return (
    <PageContainer>
      <Navigation 
        title="CreativePro Studio"
        items={navigationItems}
        blurred
        bordered
        sticky
      />
      <MainContent>
        <PageTitle>CreativePro Studio产品生命周期</PageTitle>
        <PageSubtitle>
          全面展示且初美妆电商视觉内容创作平台的七个关键开发阶段，从规划构想到持续迭代，为团队提供清晰的产品路线图与阶段性目标。
        </PageSubtitle>
        
        <ContentCard>
          <SectionTitle>产品生命周期交互流程图</SectionTitle>
          
          {/* 交互式生命周期流程图 */}
          <LifecycleFlowContainer>
            <StagesContainer>
              {lifecycleStages.map((stage, index) => (
                <StageNode 
                  key={stage.id}
                  onClick={() => setActiveStage(index)}
                >
                  <StageIcon 
                    color={stage.color}
                    active={index === activeStage}
                  >
                    <div className="stage-number">{index + 1}</div>
                    {stage.icon}
                  </StageIcon>
                  <StageName 
                    color={stage.color}
                    active={index === activeStage}
                  >
                    {stage.name}
                  </StageName>
                </StageNode>
              ))}
            </StagesContainer>
            
            {/* 阶段详情面板 */}
            <StageDetailsPanel 
              color={lifecycleStages[activeStage].color}
              position={getPositionPercentage()}
            >
              <DetailsTitle color={lifecycleStages[activeStage].color}>
                {lifecycleStages[activeStage].icon}
                {lifecycleStages[activeStage].name}：{lifecycleStages[activeStage].description}
              </DetailsTitle>
              
              <DetailsSection>
                <DetailsSectionTitle>阶段目标</DetailsSectionTitle>
                <DetailsText>{lifecycleStages[activeStage].description}</DetailsText>
              </DetailsSection>
              
              <DetailsSection>
                <DetailsSectionTitle>关键活动</DetailsSectionTitle>
                <DetailsList>
                  {lifecycleStages[activeStage].activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </DetailsList>
              </DetailsSection>
              
              <DetailsSection>
                <DetailsSectionTitle>交付物</DetailsSectionTitle>
                <DetailsList>
                  {lifecycleStages[activeStage].deliverables.map((deliverable, index) => (
                    <li key={index}>{deliverable}</li>
                  ))}
                </DetailsList>
              </DetailsSection>
              
              <DetailsSection>
                <DetailsSectionTitle>推荐工具</DetailsSectionTitle>
                <DetailsList>
                  {lifecycleStages[activeStage].tools.map((tool, index) => (
                    <li key={index}>{tool}</li>
                  ))}
                </DetailsList>
              </DetailsSection>
              
              <DetailsSection>
                <DetailsSectionTitle>AI优化策略</DetailsSectionTitle>
                <DetailsText>{lifecycleStages[activeStage].aiOptimization}</DetailsText>
              </DetailsSection>
            </StageDetailsPanel>
          </LifecycleFlowContainer>
        </ContentCard>
        
        <ContentCard>
          <SectionTitle>汇报原则与最佳实践</SectionTitle>
          <DetailsText>在向领导汇报产品生命周期各阶段工作时，请遵循以下五大汇报原则，确保信息传递清晰有效。</DetailsText>
          
          {reportingPrinciples.map((principle, index) => (
            <RuleCard 
              key={index} 
              highlighted={principle.highlighted}
              color={principle.color}
            >
              <RuleTitle>{principle.title}</RuleTitle>
              <RuleDescription>{principle.description}</RuleDescription>
            </RuleCard>
          ))}
        </ContentCard>
        
        <ContentCard>
          <SectionTitle>当前阶段汇报模板</SectionTitle>
          <DetailsText>使用以下结构向领导汇报当前产品阶段的关键信息，确保汇报简洁明了、重点突出。</DetailsText>
          
          <DetailsSection>
            <DetailsSectionTitle>1. 核心进展（30秒概述）</DetailsSectionTitle>
            <DetailsText>
              当前所处生命周期阶段：<strong>{lifecycleStages[activeStage].name}</strong><br />
              完成度：[填写百分比]<br />
              关键成果：[列出1-2个最重要成果]<br />
              需要决策：[如有，列出需要领导决策的事项]
            </DetailsText>
          </DetailsSection>
          
          <DetailsSection>
            <DetailsSectionTitle>2. 时间线进展</DetailsSectionTitle>
            <DetailsText>
              <strong>过去：</strong> [上次汇报以来完成的里程碑]<br />
              <strong>现在：</strong> [当前正在进行的工作与挑战]<br />
              <strong>未来：</strong> [接下来的计划与节点]
            </DetailsText>
          </DetailsSection>
          
          <DetailsSection>
            <DetailsSectionTitle>3. 主要挑战与解决方案</DetailsSectionTitle>
            <DetailsText>
              挑战1：[描述问题]<br />
              - 方案A：[描述] - 优点：[...] 缺点：[...]<br />
              - 方案B：[描述] - 优点：[...] 缺点：[...]<br />
              - 推荐方案：[...] 理由：[...]
            </DetailsText>
          </DetailsSection>
          
          <DetailsSection>
            <DetailsSectionTitle>4. 关键数据与指标</DetailsSectionTitle>
            <DetailsText>
              - 进度对比：计划vs实际 [数据]<br />
              - 资源使用情况：[数据]<br />
              - 质量指标：[数据]<br />
              - 风险评估：[数据]
            </DetailsText>
          </DetailsSection>
          
          <DetailsSection>
            <DetailsSectionTitle>5. 下阶段行动计划</DetailsSectionTitle>
            <DetailsText>
              1. [行动项1] - 负责人：[姓名] - 截止日期：[日期]<br />
              2. [行动项2] - 负责人：[姓名] - 截止日期：[日期]<br />
              3. [行动项3] - 负责人：[姓名] - 截止日期：[日期]<br />
              <br />
              需要支持：[列出需要领导支持的具体事项]
            </DetailsText>
          </DetailsSection>
        </ContentCard>
      </MainContent>
      <Footer>
        <p>© domiyoung__. 保留所有权利。</p>
      </Footer>
    </PageContainer>
  );
}

export default ProductLifecyclePresentation; 