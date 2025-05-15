import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import AnimatedText from '../components/ui/AnimatedText';
import InteractiveCard from '../components/ui/InteractiveCard';
import colors from '../design-system/tokens/colors';
import spacing from '../design-system/tokens/spacing';
import typography from '../design-system/tokens/typography';

// 样式组件
const Container = styled(motion.div)`
  background-color: ${props => props.isDark ? colors.ui.background.dark : colors.ui.background.light};
  color: ${props => props.isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light};
  min-height: 100vh;
  padding: ${spacing.component.section};
`;

const Header = styled.header`
  margin-bottom: ${spacing.space[6]};
`;

const Content = styled.div`
  max-width: ${spacing.layout.maxWidth};
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: ${spacing.space[8]};
`;

const SectionTitle = styled.h2`
  font-family: ${typography.fontFamily.display};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.title2};
  margin-bottom: ${spacing.space[4]};
  color: ${props => props.isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light};
`;

const SectionContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${spacing.space[4]};
`;

const CardContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.subhead};
  margin-bottom: ${spacing.space[2]};
  color: ${props => props.isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light};
`;

const CardDescription = styled.p`
  font-size: ${typography.fontSize.body};
  color: ${props => props.isDark ? colors.ui.text.secondary.dark : colors.ui.text.secondary.light};
  line-height: ${typography.lineHeight.relaxed};
  flex-grow: 1;
`;

const CardFooter = styled.div`
  margin-top: ${spacing.space[3]};
  padding-top: ${spacing.space[3]};
  border-top: 1px solid ${props => props.isDark ? colors.ui.border.dark : colors.ui.border.light};
  font-size: ${typography.fontSize.footnote};
  color: ${props => props.isDark ? colors.accent.teal : colors.accent.indigo};
`;

const CopyrightNotice = styled.div`
  font-size: ${typography.fontSize.caption1};
  color: ${props => props.isDark ? colors.ui.text.tertiary.dark : colors.ui.text.tertiary.light};
  text-align: center;
  margin-top: ${spacing.space[6]};
`;

const ProjectBlueprint = () => {
  const [colorMode] = useState('light'); // 可与全局主题系统集成
  const isDark = colorMode === 'dark';
  
  const projectTargetUsers = [
    {
      title: '专业设计师',
      description: '需要高效工作流和先进工具的平面设计、UI/UX设计师',
      icon: '🎨'
    },
    {
      title: '创意团队',
      description: '需要协作功能的设计团队、广告公司和营销部门',
      icon: '👥'
    },
    {
      title: '内容创作者',
      description: '需要快速生成高质量视觉内容的YouTuber、博主和社交媒体管理者',
      icon: '📱'
    },
    {
      title: '企业品牌管理者',
      description: '需要维护品牌一致性和批量生产营销材料的品牌经理',
      icon: '🏢'
    },
    {
      title: 'Z世代创意爱好者',
      description: '追求个性化表达和时尚设计元素的年轻用户',
      icon: '✨'
    }
  ];
  
  const coreValues = [
    {
      title: '设计效率提升',
      description: '通过智能模板系统和画布编辑器，将重复性设计工作时间减少60%',
      icon: '⚡'
    },
    {
      title: '素材一体化管理',
      description: '集中式素材库系统，支持多种格式，实现即搜即用',
      icon: '🗃️'
    },
    {
      title: '协作无缝体验',
      description: '团队实时协作功能，消除沟通障碍和版本混乱',
      icon: '🔄'
    },
    {
      title: '品牌一致性保障',
      description: '母版库系统确保所有设计产出符合品牌视觉标准',
      icon: '🎯'
    },
    {
      title: '批量处理能力',
      description: '支持设计模板批量应用和导出，适合大规模内容生产',
      icon: '📦'
    },
    {
      title: 'AI辅助设计',
      description: '集成智能设计建议和自动生成功能，激发创意灵感',
      icon: '🤖'
    }
  ];
  
  const competitorAnalysis = [
    {
      title: 'Adobe Creative Cloud',
      description: '完整的创意工具生态系统，但学习曲线陡峭，价格昂贵，协作功能分散',
      icon: '🖌️'
    },
    {
      title: 'Figma',
      description: '实时协作功能强大，云端存储便捷，但主要针对UI/UX设计，缺乏全面的素材管理',
      icon: '🔍'
    },
    {
      title: 'Canva',
      description: '易用性高，模板丰富，适合非专业用户，但高级定制性有限，专业设计功能不足',
      icon: '📝'
    },
    {
      title: 'Sketch',
      description: '界面设计专长，插件生态丰富，但仅限MacOS，协作功能较弱',
      icon: '💎'
    }
  ];

  return (
    <Container
      isDark={isDark}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Content>
        <Header>
          <AnimatedText 
            text="CreativePro Studio 项目蓝图" 
            as="h1"
            color={isDark ? "text-white" : "text-gray-900"}
            fontSize="text-3xl md:text-4xl"
            fontWeight="font-bold"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: typography.fontSize.body,
              color: isDark ? colors.ui.text.secondary.dark : colors.ui.text.secondary.light,
              maxWidth: '800px',
              marginTop: spacing.space[2],
              lineHeight: typography.lineHeight.relaxed
            }}
          >
            面向创意专业人士的综合设计与协作平台，专注于提供高效的设计工作流、素材管理和模板系统
          </motion.p>
        </Header>

        <Section>
          <SectionTitle isDark={isDark}>产品定位与目标用户分析</SectionTitle>
          <SectionContent>
            {projectTargetUsers.map((user, index) => (
              <InteractiveCard
                key={index}
                bgColor={isDark ? 'bg-gray-800' : 'bg-white'}
                borderRadius="rounded-xl"
                shadow={isDark ? 'shadow-dark-lg' : 'shadow-lg'}
                padding="p-0"
                border={isDark ? 'border border-gray-700' : 'border border-gray-100'}
              >
                <CardContent>
                  <div className="p-6">
                    <div className="text-3xl mb-3">{user.icon}</div>
                    <CardTitle isDark={isDark}>{user.title}</CardTitle>
                    <CardDescription isDark={isDark}>
                      {user.description}
                    </CardDescription>
                  </div>
                  <CardFooter isDark={isDark} className="px-6 pb-4">
                    了解更多
                  </CardFooter>
                </CardContent>
              </InteractiveCard>
            ))}
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle isDark={isDark}>核心价值主张</SectionTitle>
          <SectionContent>
            {coreValues.map((value, index) => (
              <InteractiveCard
                key={index}
                bgColor={isDark ? 'bg-gray-800' : 'bg-white'}
                borderRadius="rounded-xl"
                shadow={isDark ? 'shadow-dark-lg' : 'shadow-lg'}
                padding="p-0"
                border={isDark ? 'border border-gray-700' : 'border border-gray-100'}
              >
                <CardContent>
                  <div className="p-6">
                    <div className="text-3xl mb-3">{value.icon}</div>
                    <CardTitle isDark={isDark}>{value.title}</CardTitle>
                    <CardDescription isDark={isDark}>
                      {value.description}
                    </CardDescription>
                  </div>
                </CardContent>
              </InteractiveCard>
            ))}
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle isDark={isDark}>市场竞争分析</SectionTitle>
          <SectionContent>
            {competitorAnalysis.map((competitor, index) => (
              <InteractiveCard
                key={index}
                bgColor={isDark ? 'bg-gray-800' : 'bg-white'}
                borderRadius="rounded-xl"
                shadow={isDark ? 'shadow-dark-lg' : 'shadow-lg'}
                padding="p-0"
                border={isDark ? 'border border-gray-700' : 'border border-gray-100'}
              >
                <CardContent>
                  <div className="p-6">
                    <div className="text-3xl mb-3">{competitor.icon}</div>
                    <CardTitle isDark={isDark}>{competitor.title}</CardTitle>
                    <CardDescription isDark={isDark}>
                      {competitor.description}
                    </CardDescription>
                  </div>
                </CardContent>
              </InteractiveCard>
            ))}
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle isDark={isDark}>市场机会</SectionTitle>
          <InteractiveCard
            bgColor={isDark ? 'bg-gray-800' : 'bg-white'}
            borderRadius="rounded-xl"
            shadow={isDark ? 'shadow-dark-lg' : 'shadow-lg'}
            padding="p-6"
            border={isDark ? 'border border-gray-700' : 'border border-gray-100'}
          >
            <ul className="space-y-3 list-disc ml-5">
              <li>
                <span style={{ 
                  color: isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light,
                  fontWeight: typography.fontWeight.medium
                }}>
                  设计工作流程碎片化痛点：
                </span>
                <span style={{ 
                  color: isDark ? colors.ui.text.secondary.dark : colors.ui.text.secondary.light 
                }}>
                  当前市场缺乏将设计、素材管理、协作和输出整合的一站式解决方案
                </span>
              </li>
              <li>
                <span style={{ 
                  color: isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light,
                  fontWeight: typography.fontWeight.medium
                }}>
                  Z世代创意需求增长：
                </span>
                <span style={{ 
                  color: isDark ? colors.ui.text.secondary.dark : colors.ui.text.secondary.light 
                }}>
                  新一代用户对个性化、时尚设计工具的需求日益增长
                </span>
              </li>
              <li>
                <span style={{ 
                  color: isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light,
                  fontWeight: typography.fontWeight.medium
                }}>
                  远程协作需求上升：
                </span>
                <span style={{ 
                  color: isDark ? colors.ui.text.secondary.dark : colors.ui.text.secondary.light 
                }}>
                  全球团队分布式工作趋势推动对高效设计协作工具的需求
                </span>
              </li>
              <li>
                <span style={{ 
                  color: isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light,
                  fontWeight: typography.fontWeight.medium
                }}>
                  AI辅助设计兴起：
                </span>
                <span style={{ 
                  color: isDark ? colors.ui.text.secondary.dark : colors.ui.text.secondary.light 
                }}>
                  将AI技术与创意工作流结合的产品正迎来增长期
                </span>
              </li>
              <li>
                <span style={{ 
                  color: isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light,
                  fontWeight: typography.fontWeight.medium
                }}>
                  内容营销规模扩大：
                </span>
                <span style={{ 
                  color: isDark ? colors.ui.text.secondary.dark : colors.ui.text.secondary.light 
                }}>
                  企业和创作者需要更高效的方式生产大量视觉内容
                </span>
              </li>
            </ul>
          </InteractiveCard>
        </Section>

        <CopyrightNotice isDark={isDark}>
          © domiyoung__
        </CopyrightNotice>
      </Content>
    </Container>
  );
};

export default ProjectBlueprint; 