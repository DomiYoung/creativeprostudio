import React from 'react';
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

// 铁律卡片
const RuleCard = styled.div`
  background-color: ${props => props.highlighted ? '#FFF9E6' : 'white'};
  border: 1px solid ${props => props.highlighted ? '#FFD980' : colors.gray[200]};
  border-radius: ${spacing.borderRadius.md};
  padding: ${spacing.space[4]};
  margin-bottom: ${spacing.space[4]};
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const RuleNumber = styled.span`
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${props => props.color || colors.primary.light};
  color: white;
  font-weight: ${typography.fontWeight.semibold};
  text-align: center;
  line-height: 28px;
  margin-right: ${spacing.space[2]};
`;

const RuleTitle = styled.h3`
  font-size: ${typography.fontSize.title3};
  color: ${colors.ui.text.primary.light};
  margin: ${spacing.space[2]} 0;
  display: flex;
  align-items: center;
`;

const RuleDescription = styled.p`
  margin-left: 36px;
  color: ${colors.ui.text.secondary.light};
  font-size: ${typography.fontSize.body};
  line-height: ${typography.lineHeight.relaxed};
  margin-top: ${spacing.space[2]};
`;

const SectionTitle = styled.h2`
  font-size: ${typography.fontSize.title2};
  color: ${colors.ui.text.primary.light};
  margin: ${spacing.space[6]} 0 ${spacing.space[4]};
  font-weight: ${typography.fontWeight.semibold};
  font-family: ${typography.fontFamily.display};
`;

const PresentationTemplate = styled.div`
  border: 1px solid ${colors.gray[200]};
  border-radius: ${spacing.borderRadius.md};
  padding: ${spacing.space[4]};
  margin-top: ${spacing.space[4]};
`;

const TemplateSection = styled.div`
  margin-bottom: ${spacing.space[4]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TemplateSectionTitle = styled.h4`
  font-size: ${typography.fontSize.headline};
  color: ${colors.ui.text.primary.light};
  margin-bottom: ${spacing.space[2]};
  font-weight: ${typography.fontWeight.semibold};
`;

const TemplatePlaceholder = styled.div`
  background-color: ${colors.gray[100]};
  border-radius: ${spacing.borderRadius.sm};
  padding: ${spacing.space[3]};
  color: ${colors.gray[600]};
  font-size: ${typography.fontSize.footnote};
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

function CtoPresentation() {
  // 五大铁律数据
  const ironRules = [
    {
      number: 1,
      title: '先说结果（别绕弯）',
      description: '开篇直接陈述核心结论和关键成果，避免铺垫过多背景信息。确保在前30秒内传达最重要的信息。',
      color: '#FF9500', // Orange
    },
    {
      number: 2,
      title: '按时间说（过去→现在→将来）',
      description: '按时间顺序组织内容：过去的工作和成果、当前状态和挑战、未来计划和预期。清晰的时间线有助于CTO理解进展。',
      color: '#5856D6', // Indigo
    },
    {
      number: 3,
      title: '带方案问（别只抛问题）',
      description: '提出问题的同时附带解决方案建议，至少2-3个可行选项及其利弊分析。展示问题思考的深度和主动性。',
      color: '#32D74B', // Green
    },
    {
      number: 4,
      title: '用数据说（别用"大概"）',
      description: '用精确数据支持论点，避免模糊表述。包括关键指标、增长率、比较数据，并使用图表直观展示。',
      color: '#007AFF', // Blue
    },
    {
      number: 5,
      title: '要行动项（明确谁干啥）',
      description: '清晰列出后续行动计划，包括负责人、时间节点和期望成果。确保每个行动项都有明确的责任人和截止日期。',
      color: '#FF3B30', // Red
    },
  ];

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
        <PageTitle>CTO汇报演示模板</PageTitle>
        <PageSubtitle>
          高效地向CTO汇报项目进展、需求和计划的结构化模板，遵循五大铁律确保信息传递清晰有效。
          适用于项目进度汇报、资源请求和战略讨论。
        </PageSubtitle>
        
        <ContentCard>
          <SectionTitle>汇报五大铁律</SectionTitle>
          
          {ironRules.map((rule) => (
            <RuleCard key={rule.number} highlighted={rule.number === 1 || rule.number === 5}>
              <RuleTitle>
                <RuleNumber color={rule.color}>{rule.number}</RuleNumber>
                {rule.title}
              </RuleTitle>
              <RuleDescription>{rule.description}</RuleDescription>
            </RuleCard>
          ))}
        </ContentCard>
        
        <ContentCard>
          <SectionTitle>演示模板结构</SectionTitle>
          <p>按照以下结构组织你的CTO汇报内容，确保信息清晰、重点突出、易于决策。</p>
          
          <PresentationTemplate>
            <TemplateSection>
              <TemplateSectionTitle>1. 核心结论（30秒）</TemplateSectionTitle>
              <TemplatePlaceholder>
                直接陈述最重要的1-2个结论或请求，例如"项目按计划推进，预计6月上线"或"需要增加两名前端开发以确保按时交付"
              </TemplatePlaceholder>
            </TemplateSection>
            
            <TemplateSection>
              <TemplateSectionTitle>2. 时间线进展</TemplateSectionTitle>
              <TemplatePlaceholder>
                <strong>过去：</strong> 上次汇报以来完成的关键里程碑和成果<br />
                <strong>现在：</strong> 当前项目状态、进度百分比、关键指标<br />
                <strong>将来：</strong> 下阶段计划和预期结果
              </TemplatePlaceholder>
            </TemplateSection>
            
            <TemplateSection>
              <TemplateSectionTitle>3. 挑战与解决方案</TemplateSectionTitle>
              <TemplatePlaceholder>
                列出1-3个关键挑战，每个挑战附带:<br />
                - 问题描述和影响<br />
                - 2-3个可行解决方案<br />
                - 推荐方案及理由
              </TemplatePlaceholder>
            </TemplateSection>
            
            <TemplateSection>
              <TemplateSectionTitle>4. 数据支持</TemplateSectionTitle>
              <TemplatePlaceholder>
                提供支持你结论的关键数据:<br />
                - 进度指标（计划vs实际）<br />
                - 性能/质量指标<br />
                - 资源使用情况<br />
                尽量使用图表可视化
              </TemplatePlaceholder>
            </TemplateSection>
            
            <TemplateSection>
              <TemplateSectionTitle>5. 行动计划</TemplateSectionTitle>
              <TemplatePlaceholder>
                明确列出:<br />
                - 接下来的3-5个关键行动项<br />
                - 每项的负责人<br />
                - 截止日期<br />
                - 需要CTO决策或支持的事项
              </TemplatePlaceholder>
            </TemplateSection>
          </PresentationTemplate>
        </ContentCard>
      </MainContent>
      <Footer>
        <p>© domiyoung__. 保留所有权利。</p>
      </Footer>
    </PageContainer>
  );
}

export default CtoPresentation; 