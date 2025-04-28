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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DocCenter />} />
        <Route path="/document/:document" element={<DocumentFrame />} />
        <Route path="/prototype" element={<PrototypeDesign />} />
        <Route path="/asset-library" element={<AssetLibrary />} />
        <Route path="/master-library" element={<MasterLibrary />} />
        <Route path="/batch-center" element={<BatchCenter />} />
        <Route path="/batch-center/:id" element={<BatchDetail />} />
        <Route path="/canvas-editor" element={<CanvasEditor />} />
        <Route path="/projects" element={<ProjectsView />} />
        <Route path="/batch-create" element={<BatchCreate />} />
        <Route path="/database-design" element={<DatabaseDesign />} />
        <Route path="/api-specification" element={<ApiSpecification />} />
        <Route path="/ui-guidelines" element={<UiGuidelines />} />
        <Route path="/pages/*" element={<Navigate to="/" replace />} />
        <Route path="/showcase" element={<UIShowcase />} />
        <Route path="/demo" element={<CreativeDemo />} />
        <Route path="/app" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);