import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import CreativeDemo from './CreativeDemo.jsx';
import UIShowcase from './UIShowcase.jsx';
import DocCenter from './DocCenter.jsx';
import DocumentFrame from './components/DocumentFrame.jsx';
import NotFound from './components/NotFound.jsx';
import PrototypeDesign from './pages/PrototypeDesign.jsx';
import AssetLibrary from './pages/AssetLibrary.jsx';
import MasterLibrary from './pages/MasterLibrary.jsx';
import BatchCenter from './pages/BatchCenter.jsx';
import BatchDetail from './pages/BatchDetail.jsx';
import CanvasEditor from './pages/CanvasEditor.jsx';
import ProjectsView from './pages/ProjectsView.jsx';
import BatchCreate from './pages/BatchCreate.jsx';
import DatabaseDesign from './pages/DatabaseDesign.jsx';
import ApiSpecification from './pages/ApiSpecification.jsx';
import UiGuidelines from './pages/UiGuidelines.jsx';
import UxGuidelines from './pages/UxGuidelines.jsx';
import ProjectBlueprint from './pages/ProjectBlueprint.jsx';
import BackendArchitecture from './pages/BackendArchitecture.jsx';
import FrontendArchitecture from './pages/FrontendArchitecture.jsx';
import ProjectsList from './pages/ProjectsList.jsx';
import DocumentationPage from './pages/DocumentationPage.jsx';
import MaterialLibrary from './pages/MaterialLibrary.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import { ThemeProvider } from './design-system';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* 项目列表作为新首页 */}
          <Route path="/" element={<ProjectsList />} />
          
          {/* CreativePro Studio项目路由 */}
          <Route path="/creativeprostudio" element={<DocCenter />} />
          <Route path="/creativeprostudio/document/:document" element={<DocumentFrame />} />
          <Route path="/creativeprostudio/system-blueprint" element={<ProjectBlueprint />} />
          <Route path="/creativeprostudio/backend-architecture" element={<BackendArchitecture />} />
          <Route path="/creativeprostudio/frontend-architecture" element={<FrontendArchitecture />} />
          <Route path="/creativeprostudio/prototype" element={<PrototypeDesign />} />
          <Route path="/creativeprostudio/asset-library" element={<AssetLibrary />} />
          <Route path="/creativeprostudio/master-library" element={<MasterLibrary />} />
          <Route path="/creativeprostudio/batch-center" element={<BatchCenter />} />
          <Route path="/creativeprostudio/batch-center/:id" element={<BatchDetail />} />
          <Route path="/creativeprostudio/canvas-editor" element={<CanvasEditor />} />
          <Route path="/creativeprostudio/projects" element={<ProjectsView />} />
          <Route path="/creativeprostudio/batch-create" element={<BatchCreate />} />
          <Route path="/creativeprostudio/material-library" element={<MaterialLibrary />} />
          <Route path="/creativeprostudio/database-design" element={<DatabaseDesign />} />
          <Route path="/creativeprostudio/api-specification" element={<ApiSpecification />} />
          <Route path="/creativeprostudio/ui-guidelines" element={<UiGuidelines />} />
          <Route path="/creativeprostudio/ux-guidelines" element={<UxGuidelines />} />
          <Route path="/creativeprostudio/showcase" element={<UIShowcase />} />
          <Route path="/creativeprostudio/demo" element={<CreativeDemo />} />
          <Route path="/creativeprostudio/app" element={<App />} />
          <Route path="/creativeprostudio/documentation" element={<DocumentationPage />} />
          <Route path="/creativeprostudio/projects/:id" element={<ProjectDetail />} />
          
          {/* 兼容旧路径的重定向 */}
          <Route path="/document/*" element={<Navigate to="/creativeprostudio" replace />} />
          <Route path="/system-blueprint" element={<Navigate to="/creativeprostudio/system-blueprint" replace />} />
          <Route path="/backend-architecture" element={<Navigate to="/creativeprostudio/backend-architecture" replace />} />
          <Route path="/frontend-architecture" element={<Navigate to="/creativeprostudio/frontend-architecture" replace />} />
          <Route path="/prototype" element={<Navigate to="/creativeprostudio/prototype" replace />} />
          <Route path="/asset-library" element={<Navigate to="/creativeprostudio/asset-library" replace />} />
          <Route path="/master-library" element={<Navigate to="/creativeprostudio/master-library" replace />} />
          <Route path="/batch-center" element={<Navigate to="/creativeprostudio/batch-center" replace />} />
          <Route path="/projects" element={<Navigate to="/creativeprostudio/projects" replace />} />
          <Route path="/batch-create" element={<Navigate to="/creativeprostudio/batch-create" replace />} />
          <Route path="/material-library" element={<Navigate to="/creativeprostudio/material-library" replace />} />
          <Route path="/database-design" element={<Navigate to="/creativeprostudio/database-design" replace />} />
          <Route path="/api-specification" element={<Navigate to="/creativeprostudio/api-specification" replace />} />
          <Route path="/ui-guidelines" element={<Navigate to="/creativeprostudio/ui-guidelines" replace />} />
          <Route path="/ux-guidelines" element={<Navigate to="/creativeprostudio/ux-guidelines" replace />} />
          <Route path="/showcase" element={<Navigate to="/creativeprostudio/showcase" replace />} />
          <Route path="/demo" element={<Navigate to="/creativeprostudio/demo" replace />} />
          <Route path="/app" element={<Navigate to="/creativeprostudio/app" replace />} />
          <Route path="/documentation" element={<Navigate to="/creativeprostudio/documentation" replace />} />
          
          {/* 404页面 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);