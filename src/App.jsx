import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './App.css';
import Button from './design-system/components/Button';
import Card from './design-system/components/Card';
import Navigation from './design-system/components/Navigation';
import colors from './design-system/tokens/colors';
import { navigationItems, cardExamples } from './data/sampleData';
import styled from '@emotion/styled';
import spacing from './design-system/tokens/spacing';
import typography from './design-system/tokens/typography';
import MasterLibrary from './pages/MasterLibrary';
import BatchCenter from './pages/BatchCenter';
import BatchDetail from './pages/BatchDetail';
import UiGuidelines from './pages/UiGuidelines';
import ApiSpecification from './pages/ApiSpecification';
import DatabaseDesign from './pages/DatabaseDesign';
import InteractionGuidelines from './pages/InteractionGuidelines';
import ProjectReport from './pages/ProjectReport';
import ProjectBlueprint from './pages/ProjectBlueprint';
import FrontendGuide from './pages/FrontendGuide';
import BackendDesign from './pages/BackendDesign';
import PrototypeDesign from './pages/PrototypeDesign';
import ProductConcept from './components/ProductConcept';
import LifecycleFlow from './components/LifecycleFlow';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// 创建Chakra UI主题
const theme = extendTheme({
  styles: {
    global: {
      // 避免全局样式覆盖
      'html, body': {
        background: 'transparent',
      },
    },
  },
});

// 应用容器 - 使用高品质背景渐变
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    150deg,
    ${colors.gray[50]} 0%,
    ${colors.gray[100]} 100%
  );
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 80%;
    background: radial-gradient(
      circle at 70% 20%,
      rgba(0, 122, 255, 0.05) 0%,
      rgba(0, 122, 255, 0) 70%
    );
    z-index: 0;
    pointer-events: none;
  }
`;

// 主内容区
const MainContent = styled.main`
  padding: ${spacing.space[6]};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
`;

// 页面标题区
const HeaderSection = styled.header`
  margin-bottom: ${spacing.space[8]};
  position: relative;
`;

const PageTitle = styled.h1`
  color: ${colors.ui.text.primary.light};
  font-size: ${typography.fontSize.largeTitle};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing.space[2]};
  font-family: ${typography.fontFamily.display};
`;

const PageSubtitle = styled.p`
  color: ${colors.ui.text.secondary.light};
  font-size: ${typography.fontSize.body};
  max-width: 600px;
  line-height: ${typography.lineHeight.relaxed};
`;

// 产品生命周期导航
const LifecycleNav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: ${spacing.space[6]} 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 24px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${colors.gray[200]};
    z-index: 0;
  }
`;

const LifecycleStage = styled.button`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  padding: 0;
  
  &:focus {
    outline: none;
  }
  
  .stage-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.active ? colors.primary.light : colors.gray[100]};
    color: ${props => props.active ? 'white' : colors.gray[500]};
    margin-bottom: ${spacing.space[2]};
    box-shadow: ${props => props.active ? 
      '0 4px 12px rgba(0, 122, 255, 0.2)' : 
      '0 2px 4px rgba(0, 0, 0, 0.05)'};
    transition: all 0.2s ease;
  }
  
  .stage-name {
    font-size: ${typography.fontSize.footnote};
    color: ${props => props.active ? colors.primary.light : colors.gray[500]};
    font-weight: ${props => props.active ? typography.fontWeight.semibold : typography.fontWeight.regular};
    transition: all 0.2s ease;
  }
  
  &:hover {
    .stage-icon {
      background-color: ${props => props.active ? colors.primary.light : colors.gray[200]};
      transform: translateY(-2px);
    }
    
    .stage-name {
      color: ${props => props.active ? colors.primary.light : colors.gray[700]};
    }
  }
`;

// 文档内容区
const SectionContent = styled.div`
  background-color: white;
  border-radius: ${spacing.borderRadius.lg};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: ${spacing.space[6]};
  margin-bottom: ${spacing.space[6]};
`;

const SectionTitle = styled.h2`
  font-size: ${typography.fontSize.title2};
  color: ${colors.ui.text.primary.light};
  margin-bottom: ${spacing.space[4]};
  font-weight: ${typography.fontWeight.semibold};
  font-family: ${typography.fontFamily.display};
  display: flex;
  align-items: center;
  gap: ${spacing.space[2]};
`;

// 文档网格布局
const DocsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${spacing.space[4]};
`;

// 文档卡片
const DocCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  background-color: ${colors.gray[50]};
  border-radius: ${spacing.borderRadius.md};
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
  }
`;

const DocCardHeader = styled.div`
  padding: ${spacing.space[3]};
  background-color: ${props => props.color || colors.primary.light};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DocCardTitle = styled.h3`
  font-size: ${typography.fontSize.subhead};
  font-weight: ${typography.fontWeight.semibold};
  margin: 0;
`;

const DocCardBody = styled.div`
  padding: ${spacing.space[4]};
`;

const DocCardDesc = styled.p`
  color: ${colors.ui.text.secondary.light};
  font-size: ${typography.fontSize.footnote};
  margin: 0;
  line-height: ${typography.lineHeight.relaxed};
`;

const DocCardFooter = styled.div`
  padding: ${spacing.space[3]};
  border-top: 1px solid ${colors.gray[100]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${typography.fontSize.caption1};
  color: ${colors.gray[500]};
`;

// 页脚
const AppFooterStyled = styled.footer`
  background-color: white;
  padding: ${spacing.space[6]};
  text-align: center;
  border-top: 1px solid ${colors.ui.border.light};
  margin-top: auto;
  
  p {
    color: ${colors.ui.text.secondary.light};
    font-size: ${typography.fontSize.footnote};
  }
`;

// 图标组件
const Icon = ({ name }) => {
  // 简单图标实现
  const iconMap = {
    plan: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>,
    research: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
    design: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
    develop: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    test: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    deploy: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21"/><path d="M16 16l-4-4-4 4"/></svg>,
    iterate: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6"/><path d="M2.5 12.1v-6h6"/><path d="M20.7 16.5A10 10 0 1 0 4.1 13"/><path d="M13.9 7.1A10 10 0 0 1 20 11l1.5-3"/></svg>,
    document: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    system: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  };
  
  return iconMap[name] || null;
};

// 首页组件
function Home() {
  const [activeStage, setActiveStage] = useState('plan');
  
  // 产品生命周期阶段
  const lifecycleStages = [
    { id: 'plan', name: '规划构想', icon: 'plan' },
    { id: 'research', name: '需求分析', icon: 'research' },
    { id: 'design', name: '设计', icon: 'design' },
    { id: 'develop', name: '开发', icon: 'develop' },
    { id: 'test', name: '测试', icon: 'test' },
    { id: 'deploy', name: '部署', icon: 'deploy' },
    { id: 'iterate', name: '迭代', icon: 'iterate' }
  ];
  
  // 文档内容按生命周期阶段组织
  const docsByStage = {
    plan: {
      title: '项目规划与构想',
      icon: 'plan',
      color: '#007AFF', // SF Blue
      docs: [
        { id: 'project-blueprint', title: '项目蓝图', path: '/project-blueprint', desc: '项目整体规划文档，包含愿景目标、里程碑设定、资源规划和风险评估', lastUpdate: '2025-05-04' },
        { id: 'project-report', title: '项目报告', path: '/project-report', desc: '项目进度、健康状况和关键指标追踪', lastUpdate: '2025-05-10' },
      ]
    },
    research: {
      title: '需求分析',
      icon: 'research',
      color: '#5856D6', // SF Indigo
      docs: [
        { id: 'user-research', title: '用户研究', path: '/user-research', desc: '目标用户分析、用户旅程地图和痛点识别', lastUpdate: '2025-04-12' },
        { id: 'market-analysis', title: '市场分析', path: '/market-analysis', desc: '市场趋势、竞品分析和机会识别', lastUpdate: '2025-04-15' },
      ]
    },
    design: {
      title: '设计阶段',
      icon: 'design',
      color: '#FF9500', // SF Orange
      docs: [
        { id: 'frontend-design', title: '前端概要设计', path: '/frontend-design', desc: '包含前端系统的整体架构、组件设计、状态管理方案和路由设计', lastUpdate: '2025-05-01' },
        { id: 'backend-design', title: '后端概要设计', path: '/backend-design', desc: '详述后端服务架构、数据模型、API设计和安全策略', lastUpdate: '2025-05-02' },
        { id: 'ui-guidelines', title: 'UI设计规范', path: '/ui-guidelines', desc: '符合Apple Human Interface Guidelines的用户体验设计规范', lastUpdate: '2025-05-03' },
        { id: 'interaction-guidelines', title: '交互设计规范', path: '/interaction-guidelines', desc: '用户交互原则、动效指南和状态转换设计', lastUpdate: '2025-05-05' },
      ]
    },
    develop: {
      title: '开发与实现',
      icon: 'develop',
      color: '#AF52DE', // SF Purple
      docs: [
        { id: 'api-specification', title: 'API规范', path: '/api-specification', desc: 'RESTful API接口规范、认证机制和错误处理', lastUpdate: '2025-04-20' },
        { id: 'database-design', title: '数据库设计', path: '/database-design', desc: '数据结构、关系模型和优化策略', lastUpdate: '2025-04-22' },
        { id: 'coding-standards', title: '编码规范', path: '/coding-standards', desc: '代码风格、命名规范和最佳实践', lastUpdate: '2025-04-18' },
      ]
    },
    test: {
      title: '测试与质量保障',
      icon: 'test',
      color: '#32D74B', // SF Green
      docs: [
        { id: 'test-strategy', title: '测试策略', path: '/test-strategy', desc: '测试流程、范围和方法论', lastUpdate: '2025-06-02' },
        { id: 'qa-guidelines', title: '质量保障指南', path: '/qa-guidelines', desc: '质量标准、检查清单和风险管理', lastUpdate: '2025-06-05' },
      ]
    },
    deploy: {
      title: '部署与发布',
      icon: 'deploy',
      color: '#FF3B30', // SF Red
      docs: [
        { id: 'deployment-guide', title: '部署指南', path: '/deployment-guide', desc: '部署流程、环境设置和监控策略', lastUpdate: '2025-06-15' },
        { id: 'release-notes', title: '发布说明', path: '/release-notes', desc: '版本特性、更新日志和兼容性说明', lastUpdate: '2025-06-20' },
      ]
    },
    iterate: {
      title: '运维与迭代',
      icon: 'iterate',
      color: '#64D2FF', // SF Teal
      docs: [
        { id: 'maintenance-guide', title: '运维手册', path: '/maintenance-guide', desc: '日常维护、性能优化和故障排除', lastUpdate: '2025-07-01' },
        { id: 'iteration-plan', title: '迭代计划', path: '/iteration-plan', desc: '版本规划、特性路线图和优先级排序', lastUpdate: '2025-07-05' },
      ]
    }
  };
  
  // 系统页面文档
  const systemDocs = [
    { id: 'master-library', title: '母版库', path: '/master-library', desc: '母版库设计与使用指南', lastUpdate: '2025-03-15' },
    { id: 'batch-center', title: '批量处理中心', path: '/batch-center', desc: '批量处理功能与流程说明', lastUpdate: '2025-03-20' },
    { id: 'batch-detail', title: '批量详情', path: '/batch-detail', desc: '批量任务详情页面使用指南', lastUpdate: '2025-03-22' },
  ];
  
  return (
    <AppContainer>
      <Navigation 
        title="CreativePro Studio"
        items={navigationItems}
        blurred
        bordered
        sticky
      />
      <MainContent>
        {/* 头部区域 */}
        <HeaderSection>
          <PageTitle>创意产品文档中心</PageTitle>
          <PageSubtitle>
            探索CreativePro Studio的设计与开发文档，了解从构想到实现的全生命周期过程。
          </PageSubtitle>
        </HeaderSection>
        
        {/* 生命周期导航 */}
        <LifecycleNav>
          {lifecycleStages.map(stage => (
            <LifecycleStage 
              key={stage.id}
              active={activeStage === stage.id}
              onClick={() => setActiveStage(stage.id)}
            >
              <div className="stage-icon">
                <Icon name={stage.icon} />
              </div>
              <span className="stage-name">{stage.name}</span>
            </LifecycleStage>
          ))}
        </LifecycleNav>
        
        {/* 当前阶段文档 */}
        <SectionContent>
          <SectionTitle>
            <Icon name={docsByStage[activeStage].icon} />
            {docsByStage[activeStage].title}
          </SectionTitle>
          
          <DocsGrid>
            {docsByStage[activeStage].docs.map(doc => (
              <DocCard key={doc.id} to={doc.path}>
                <DocCardHeader color={docsByStage[activeStage].color}>
                  <DocCardTitle>{doc.title}</DocCardTitle>
                </DocCardHeader>
                <DocCardBody>
                  <DocCardDesc>{doc.desc}</DocCardDesc>
                </DocCardBody>
                <DocCardFooter>
                  <span>最后更新: {doc.lastUpdate}</span>
                </DocCardFooter>
              </DocCard>
            ))}
          </DocsGrid>
        </SectionContent>
        
        {/* 系统页面文档 */}
        <SectionContent>
          <SectionTitle>
            <Icon name="system" />
            系统页面文档
          </SectionTitle>
          
          <DocsGrid>
            {systemDocs.map(doc => (
              <DocCard key={doc.id} to={doc.path}>
                <DocCardHeader color="#8E8E93">
                  <DocCardTitle>{doc.title}</DocCardTitle>
                </DocCardHeader>
                <DocCardBody>
                  <DocCardDesc>{doc.desc}</DocCardDesc>
                </DocCardBody>
                <DocCardFooter>
                  <span>最后更新: {doc.lastUpdate}</span>
                </DocCardFooter>
              </DocCard>
            ))}
          </DocsGrid>
        </SectionContent>
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

// 文档中心组件
function DocCenter() {
  return (
    <AppContainer>
      <Navigation 
        title="文档中心"
        items={navigationItems}
        blurred
        bordered
        sticky
      />
      <MainContent>
        <PageTitle>产品设计文档</PageTitle>
        <p>请从左侧导航选择要查看的文档。</p>
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

// 404组件
function NotFound() {
  return (
    <AppContainer>
      <MainContent>
        <PageTitle>404 - 页面未找到</PageTitle>
        <p>您访问的页面不存在。</p>
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doccenter" element={<DocCenter />} />
            <Route path="/database-design" element={<DatabaseDesign />} />
            <Route path="/api-specification" element={<ApiSpecification />} />
            <Route path="/ui-guidelines" element={<UiGuidelines />} />
            <Route path="/interaction-guidelines" element={<InteractionGuidelines />} />
            <Route path="/project-report" element={<ProjectReport />} />
            <Route path="/project-blueprint" element={<ProjectBlueprint />} />
            <Route path="/frontend-design" element={<FrontendGuide />} />
            <Route path="/backend-design" element={<BackendDesign />} />
            <Route path="/master-library" element={<MasterLibrary />} />
            <Route path="/batch-center" element={<BatchCenter />} />
            <Route path="/batch-detail" element={<BatchDetail />} />
            <Route path="/home-page" element={<PrototypeDesign />} />
            <Route path="/product-concept" element={<ProductConcept />} />
            <Route path="/lifecycle-flow" element={<LifecycleFlow />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App; 