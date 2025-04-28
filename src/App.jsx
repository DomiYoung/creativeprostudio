import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Button from './design-system/components/Button';
import Card from './design-system/components/Card';
import Navigation from './design-system/components/Navigation';
import { colors } from './design-system/tokens/colors';
import { navigationItems, cardExamples } from './data/sampleData';
import styled from '@emotion/styled';
import { spacing } from './design-system/tokens/spacing';
import MasterLibrary from './pages/MasterLibrary';
import BatchCenter from './pages/BatchCenter';
import BatchDetail from './pages/BatchDetail';
import UiGuidelines from './pages/UiGuidelines';
import ApiSpecification from './pages/ApiSpecification';
import DatabaseDesign from './pages/DatabaseDesign';
import InteractionGuidelines from './pages/InteractionGuidelines';
import ProjectReport from './pages/ProjectReport';

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 