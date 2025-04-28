import React from 'react';
import './App.css';
import Button from './design-system/components/Button';
import Card from './design-system/components/Card';
import Navigation from './design-system/components/Navigation';
import { colors } from './design-system/tokens/colors';
import { navigationItems, cardExamples } from './data/sampleData';
import styled from '@emotion/styled';
import { spacing } from './design-system/tokens/spacing';

// 应用容器
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${colors.background.secondary};
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
  color: ${colors.neutral.gray1};
  margin-bottom: ${spacing.space[6]};
  font-weight: bold;
`;

// 卡片网格
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${spacing.space[5]};
  margin-top: ${spacing.space[6]};
`;

// 页脚
const Footer = styled.footer`
  background-color: ${colors.background.primary};
  padding: ${spacing.space[4]};
  text-align: center;
  border-top: 1px solid ${colors.neutral.gray10};
  margin-top: auto;
`;

function App() {
  return (
    <AppContainer>
      <Navigation 
        title="CreativePro Studio"
        items={navigationItems}
        activeIndex={0}
        elevated
        right={
          <Button
            variant="primary"
            size="small"
          >
            文档中心
          </Button>
        }
      />
      
      <MainContent>
        <PageTitle>产品设计文档中心</PageTitle>
        
        <Card
          title="欢迎使用CreativePro Studio产品文档中心"
          bordered
          elevated
          fullWidth
          footer={
            <Button 
              variant="primary"
            >
              开始浏览
            </Button>
          }
        >
          <p>此系统集成了所有产品设计相关文档，包括前后端概要设计、详细设计方案、UX设计规范以及项目蓝图。</p>
          <p>使用左侧导航或下方卡片浏览不同分类的文档内容。</p>
        </Card>
        
        <CardGrid>
          {cardExamples.map(card => (
            <Card 
              key={card.id}
              title={card.title}
              bordered
              elevated
              rounded
              interactive
              footerDivider
              footer={
                <>
                  <span>{card.footer}</span>
                  <Button 
                    variant="text"
                    size="small"
                  >
                    查看详情
                  </Button>
                </>
              }
            >
              {card.content}
            </Card>
          ))}
        </CardGrid>
      </MainContent>
      
      <Footer>
        © 2025 CreativePro Studio. 符合Apple Human Interface Guidelines设计规范
      </Footer>
    </AppContainer>
  );
}

export default App; 