import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from './index';
import colors from './tokens/colors';
import spacing from './tokens/spacing';
import typography from './tokens/typography';
import Button from './components/Button';
import Card from './components/Card';
import Navigation from './components/Navigation';

// 页面样式组件
const Container = styled.div`
  background-color: ${props => props.isDark ? colors.ui.background.dark : colors.ui.background.light};
  color: ${props => props.isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light};
  font-family: ${typography.fontFamily.base};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  max-width: ${spacing.layout.maxWidth};
  margin: 0 auto;
  padding: ${spacing.component.section};
  width: 100%;
`;

const Section = styled.section`
  margin-bottom: ${spacing.space[8]};
`;

const SectionTitle = styled.h2`
  font-family: ${typography.fontFamily.display};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.title1};
  margin-bottom: ${spacing.space[4]};
  color: ${props => props.isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light};
`;

const SectionDescription = styled.p`
  font-size: ${typography.fontSize.body};
  margin-bottom: ${spacing.space[4]};
  max-width: 800px;
  line-height: ${typography.lineHeight.relaxed};
  color: ${props => props.isDark ? colors.ui.text.secondary.dark : colors.ui.text.secondary.light};
`;

const SubSection = styled.div`
  margin-bottom: ${spacing.space[6]};
`;

const SubSectionTitle = styled.h3`
  font-family: ${typography.fontFamily.display};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.title3};
  margin-bottom: ${spacing.space[3]};
  color: ${props => props.isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${spacing.space[4]};
  margin-bottom: ${spacing.space[6]};
`;

const ColorBox = styled.div`
  height: 100px;
  border-radius: ${spacing.borderRadius.md};
  background-color: ${props => props.color};
  box-shadow: ${props => props.isDark ? spacing.shadows.dark.sm : spacing.shadows.sm};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${spacing.space[3]};
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
    opacity: ${props => props.light ? 0.5 : 0};
  }
`;

const ColorName = styled.div`
  color: white;
  font-weight: ${typography.fontWeight.medium};
  font-size: ${typography.fontSize.footnote};
  position: relative;
  z-index: 1;
`;

const ColorValue = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-family: ${typography.fontFamily.mono};
  font-size: ${typography.fontSize.caption1};
  position: relative;
  z-index: 1;
`;

const TypeSample = styled.div`
  margin-bottom: ${spacing.space[4]};
`;

const TypeTitle = styled.div`
  font-family: ${typography.fontFamily.mono};
  font-size: ${typography.fontSize.footnote};
  color: ${props => props.isDark ? colors.ui.text.secondary.dark : colors.ui.text.secondary.light};
  margin-bottom: ${spacing.space[1]};
`;

const TypeExample = styled.div`
  font-family: ${props => props.fontFamily || typography.fontFamily.base};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  line-height: ${props => props.lineHeight};
  color: ${props => props.isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light};
`;

const ComponentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${spacing.space[6]};
  margin-bottom: ${spacing.space[6]};
`;

const ComponentExample = styled.div`
  padding: ${spacing.space[4]};
  border-radius: ${spacing.borderRadius.md};
  border: 1px solid ${props => props.isDark ? colors.ui.border.dark : colors.ui.border.light};
  background-color: ${props => props.isDark ? colors.ui.card.dark : colors.ui.card.light};
`;

const ComponentTitle = styled.div`
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.subhead};
  margin-bottom: ${spacing.space[2]};
  color: ${props => props.isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light};
`;

const ComponentVariants = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.space[2]};
  margin-top: ${spacing.space[3]};
  padding-top: ${spacing.space[3]};
  border-top: 1px solid ${props => props.isDark ? colors.ui.border.dark : colors.ui.border.light};
`;

/**
 * UI Guidelines Component
 * 展示CreativePro Studio的UI设计系统规范
 */
const UIGuidelines = () => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 导航项
  const navItems = [
    { label: '颜色', href: '#colors' },
    { label: '排版', href: '#typography' },
    { label: '组件', href: '#components' },
    { label: '间距与布局', href: '#spacing' }
  ];
  
  return (
    <Container isDark={isDark}>
      <Navigation 
        title="CreativePro Studio UI规范"
        items={navItems}
        blurred
        bordered
        elevated
        sticky
        renderUserAvatar="UI"
      />
      
      <Content>
        <Section id="overview">
          <SectionTitle isDark={isDark}>设计系统概览</SectionTitle>
          <SectionDescription isDark={isDark}>
            CreativePro Studio的设计系统基于Apple Human Interface Guidelines，为美妆电商设计工具提供一致、专业的用户体验。
            本规范定义了颜色、排版、间距、组件等核心设计元素，以确保整个应用的视觉和交互一致性。
          </SectionDescription>
        </Section>
        
        <Section id="colors">
          <SectionTitle isDark={isDark}>颜色系统</SectionTitle>
          <SectionDescription isDark={isDark}>
            颜色系统基于Apple的SF颜色，提供了适应浅色和深色模式的完整调色板。主色调使用苹果蓝色（SF Blue），辅以橙色和灰阶色彩，确保清晰的视觉层次。
          </SectionDescription>
          
          <SubSection>
            <SubSectionTitle isDark={isDark}>主色调</SubSectionTitle>
            <Grid>
              <ColorBox color={colors.primary.light} light>
                <ColorName>Primary (Light)</ColorName>
                <ColorValue>{colors.primary.light}</ColorValue>
              </ColorBox>
              <ColorBox color={colors.primary.dark}>
                <ColorName>Primary (Dark)</ColorName>
                <ColorValue>{colors.primary.dark}</ColorValue>
              </ColorBox>
            </Grid>
          </SubSection>
          
          <SubSection>
            <SubSectionTitle isDark={isDark}>辅助色彩</SubSectionTitle>
            <Grid>
              <ColorBox color={colors.accent.orange}>
                <ColorName>Accent Orange</ColorName>
                <ColorValue>{colors.accent.orange}</ColorValue>
              </ColorBox>
              <ColorBox color={colors.accent.green}>
                <ColorName>Accent Green</ColorName>
                <ColorValue>{colors.accent.green}</ColorValue>
              </ColorBox>
              <ColorBox color={colors.accent.indigo}>
                <ColorName>Accent Indigo</ColorName>
                <ColorValue>{colors.accent.indigo}</ColorValue>
              </ColorBox>
              <ColorBox color={colors.accent.teal} light>
                <ColorName>Accent Teal</ColorName>
                <ColorValue>{colors.accent.teal}</ColorValue>
              </ColorBox>
            </Grid>
          </SubSection>
          
          <SubSection>
            <SubSectionTitle isDark={isDark}>语义色彩</SubSectionTitle>
            <Grid>
              <ColorBox color={colors.semantic.success}>
                <ColorName>Success</ColorName>
                <ColorValue>{colors.semantic.success}</ColorValue>
              </ColorBox>
              <ColorBox color={colors.semantic.warning}>
                <ColorName>Warning</ColorName>
                <ColorValue>{colors.semantic.warning}</ColorValue>
              </ColorBox>
              <ColorBox color={colors.semantic.error}>
                <ColorName>Error</ColorName>
                <ColorValue>{colors.semantic.error}</ColorValue>
              </ColorBox>
              <ColorBox color={colors.semantic.info}>
                <ColorName>Info</ColorName>
                <ColorValue>{colors.semantic.info}</ColorValue>
              </ColorBox>
            </Grid>
          </SubSection>
          
          <SubSection>
            <SubSectionTitle isDark={isDark}>灰阶</SubSectionTitle>
            <Grid>
              <ColorBox color={colors.gray[50]} light>
                <ColorName>Gray 50</ColorName>
                <ColorValue>{colors.gray[50]}</ColorValue>
              </ColorBox>
              <ColorBox color={colors.gray[100]} light>
                <ColorName>Gray 100</ColorName>
                <ColorValue>{colors.gray[100]}</ColorValue>
              </ColorBox>
              <ColorBox color={colors.gray[500]} light>
                <ColorName>Gray 500</ColorName>
                <ColorValue>{colors.gray[500]}</ColorValue>
              </ColorBox>
              <ColorBox color={colors.gray[900]}>
                <ColorName>Gray 900</ColorName>
                <ColorValue>{colors.gray[900]}</ColorValue>
              </ColorBox>
            </Grid>
          </SubSection>
        </Section>
        
        <Section id="typography">
          <SectionTitle isDark={isDark}>排版系统</SectionTitle>
          <SectionDescription isDark={isDark}>
            排版系统基于SF Pro字体家族，提供清晰、易读的文本样式。我们遵循Apple的排版最佳实践，使用适当的字体大小、行高和字重来创建层次分明的信息架构。
          </SectionDescription>
          
          <SubSection>
            <SubSectionTitle isDark={isDark}>标题</SubSectionTitle>
            <TypeSample>
              <TypeTitle isDark={isDark}>Large Title (34px)</TypeTitle>
              <TypeExample 
                isDark={isDark}
                fontFamily={typography.fontFamily.display}
                fontSize={typography.fontSize.largeTitle}
                fontWeight={typography.fontWeight.bold}
                lineHeight={typography.lineHeight.tight}
              >
                大标题示例 Large Title Example
              </TypeExample>
            </TypeSample>
            
            <TypeSample>
              <TypeTitle isDark={isDark}>Title 1 (28px)</TypeTitle>
              <TypeExample 
                isDark={isDark}
                fontFamily={typography.fontFamily.display}
                fontSize={typography.fontSize.title1}
                fontWeight={typography.fontWeight.semibold}
                lineHeight={typography.lineHeight.snug}
              >
                标题1示例 Title 1 Example
              </TypeExample>
            </TypeSample>
            
            <TypeSample>
              <TypeTitle isDark={isDark}>Title 2 (22px)</TypeTitle>
              <TypeExample 
                isDark={isDark}
                fontFamily={typography.fontFamily.display}
                fontSize={typography.fontSize.title2}
                fontWeight={typography.fontWeight.semibold}
                lineHeight={typography.lineHeight.snug}
              >
                标题2示例 Title 2 Example
              </TypeExample>
            </TypeSample>
            
            <TypeSample>
              <TypeTitle isDark={isDark}>Title 3 (20px)</TypeTitle>
              <TypeExample 
                isDark={isDark}
                fontFamily={typography.fontFamily.display}
                fontSize={typography.fontSize.title3}
                fontWeight={typography.fontWeight.semibold}
                lineHeight={typography.lineHeight.snug}
              >
                标题3示例 Title 3 Example
              </TypeExample>
            </TypeSample>
          </SubSection>
          
          <SubSection>
            <SubSectionTitle isDark={isDark}>正文</SubSectionTitle>
            <TypeSample>
              <TypeTitle isDark={isDark}>Body (17px)</TypeTitle>
              <TypeExample 
                isDark={isDark}
                fontFamily={typography.fontFamily.base}
                fontSize={typography.fontSize.body}
                fontWeight={typography.fontWeight.regular}
                lineHeight={typography.lineHeight.relaxed}
              >
                正文文本示例。这是一段示例文本，用于展示标准正文样式。Body text example. This is a sample text to demonstrate the standard body style.
              </TypeExample>
            </TypeSample>
            
            <TypeSample>
              <TypeTitle isDark={isDark}>Subheadline (15px)</TypeTitle>
              <TypeExample 
                isDark={isDark}
                fontFamily={typography.fontFamily.base}
                fontSize={typography.fontSize.subhead}
                fontWeight={typography.fontWeight.regular}
                lineHeight={typography.lineHeight.normal}
              >
                副标题文本示例。用于次要内容或段落引导。Subheadline text example. Used for secondary content or paragraph leads.
              </TypeExample>
            </TypeSample>
          </SubSection>
          
          <SubSection>
            <SubSectionTitle isDark={isDark}>辅助文本</SubSectionTitle>
            <TypeSample>
              <TypeTitle isDark={isDark}>Footnote (13px)</TypeTitle>
              <TypeExample 
                isDark={isDark}
                fontFamily={typography.fontFamily.base}
                fontSize={typography.fontSize.footnote}
                fontWeight={typography.fontWeight.regular}
                lineHeight={typography.lineHeight.normal}
              >
                脚注文本示例。用于次要信息或说明文字。Footnote text example. Used for secondary information or explanatory text.
              </TypeExample>
            </TypeSample>
            
            <TypeSample>
              <TypeTitle isDark={isDark}>Caption 1 (12px)</TypeTitle>
              <TypeExample 
                isDark={isDark}
                fontFamily={typography.fontFamily.base}
                fontSize={typography.fontSize.caption1}
                fontWeight={typography.fontWeight.regular}
                lineHeight={typography.lineHeight.tight}
              >
                说明文本示例。用于小型标签或状态指示。Caption text example. Used for small labels or status indicators.
              </TypeExample>
            </TypeSample>
          </SubSection>
        </Section>
        
        <Section id="components">
          <SectionTitle isDark={isDark}>组件系统</SectionTitle>
          <SectionDescription isDark={isDark}>
            组件系统提供了一系列符合Apple设计语言的UI元素，确保整个应用的一致性和可用性。所有组件都支持浅色和深色模式，并遵循iOS的交互模式。
          </SectionDescription>
          
          <ComponentGrid>
            <ComponentExample isDark={isDark}>
              <ComponentTitle isDark={isDark}>按钮 (Button)</ComponentTitle>
              <Button>标准按钮</Button>
              
              <ComponentVariants isDark={isDark}>
                <Button variant="primary" size="sm">小尺寸</Button>
                <Button variant="primary">中尺寸</Button>
                <Button variant="primary" size="lg">大尺寸</Button>
              </ComponentVariants>
              
              <ComponentVariants isDark={isDark}>
                <Button variant="primary">主要按钮</Button>
                <Button variant="secondary">次要按钮</Button>
                <Button variant="outline">轮廓按钮</Button>
                <Button variant="ghost">幽灵按钮</Button>
                <Button variant="destructive">危险按钮</Button>
              </ComponentVariants>
            </ComponentExample>
            
            <ComponentExample isDark={isDark}>
              <ComponentTitle isDark={isDark}>卡片 (Card)</ComponentTitle>
              <Card 
                title="卡片标题" 
                footer="卡片页脚"
                padding="lg"
              >
                这是卡片内容区域，可以包含任何内容组件。
              </Card>
              
              <ComponentVariants isDark={isDark}>
                <Card padding="sm" style={{width: '120px'}}>小内边距</Card>
                <Card bordered style={{width: '120px'}}>带边框</Card>
                <Card shadow="lg" style={{width: '120px'}}>大阴影</Card>
              </ComponentVariants>
            </ComponentExample>
          </ComponentGrid>
        </Section>
        
        <Section id="spacing">
          <SectionTitle isDark={isDark}>间距与布局</SectionTitle>
          <SectionDescription isDark={isDark}>
            间距系统基于8像素网格，确保布局的一致性和视觉平衡。通过使用预定义的间距值，我们创建了有规律的视觉节奏，提高了UI的可预测性和易用性。
          </SectionDescription>
          
          <SubSection>
            <SubSectionTitle isDark={isDark}>基础间距</SubSectionTitle>
            <Grid>
              {Object.entries(spacing.space).slice(0, 8).map(([key, value]) => (
                <Card key={key} bordered padding="md">
                  <div style={{
                    background: isDark ? colors.gray[700] : colors.gray[200],
                    height: value,
                    borderRadius: spacing.borderRadius.sm,
                    marginBottom: spacing.space[2]
                  }}></div>
                  <div style={{fontWeight: typography.fontWeight.medium}}>Space {key}</div>
                  <div style={{
                    fontSize: typography.fontSize.caption1,
                    color: isDark ? colors.ui.text.secondary.dark : colors.ui.text.secondary.light,
                    fontFamily: typography.fontFamily.mono
                  }}>{value}</div>
                </Card>
              ))}
            </Grid>
          </SubSection>
          
          <SubSection>
            <SubSectionTitle isDark={isDark}>圆角</SubSectionTitle>
            <Grid>
              {Object.entries(spacing.borderRadius).map(([key, value]) => (
                <Card key={key} bordered padding="md">
                  <div style={{
                    background: isDark ? colors.accent.teal : colors.accent.indigo,
                    height: '80px',
                    borderRadius: value,
                    marginBottom: spacing.space[2]
                  }}></div>
                  <div style={{fontWeight: typography.fontWeight.medium}}>Radius {key}</div>
                  <div style={{
                    fontSize: typography.fontSize.caption1,
                    color: isDark ? colors.ui.text.secondary.dark : colors.ui.text.secondary.light,
                    fontFamily: typography.fontFamily.mono
                  }}>{value}</div>
                </Card>
              ))}
            </Grid>
          </SubSection>
        </Section>
      </Content>
    </Container>
  );
};

export default UIGuidelines; 