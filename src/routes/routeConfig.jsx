import React from 'react';

// Import all page components here
import MasterLibrary from '../pages/MasterLibrary';
import BatchCenter from '../pages/BatchCenter';
import BatchDetail from '../pages/BatchDetail';
import UiGuidelines from '../pages/UiGuidelines';
import ApiSpecification from '../pages/ApiSpecification';
import DatabaseDesign from '../pages/DatabaseDesign';
import InteractionGuidelines from '../pages/InteractionGuidelines';
import ProjectReport from '../pages/ProjectReport';
import ProjectBlueprint from '../pages/ProjectBlueprint';
import FrontendGuide from '../pages/FrontendGuide';
import BackendDesign from '../pages/BackendDesign';
import PrototypeDesign from '../pages/PrototypeDesign';
import AssetLibrary from '../pages/AssetLibrary';
import UXDocuments from '../pages/UXDocuments';
import ProductLifecyclePresentation from '../pages/ProductLifecyclePresentation';
import CtoPresentation from '../pages/CtoPresentation';
import ProjectDetail from '../pages/ProjectDetail';
import Projects from '../pages/Projects';
import EfficiencyAnalytics from '../pages/EfficiencyAnalytics';

// Icons for navigation items
import HomeIcon from '@mui/icons-material/Home';
import ImageIcon from '@mui/icons-material/Image';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SpeedIcon from '@mui/icons-material/Speed';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Define the main navigation items
export const mainNavigationItems = [
  {
    id: 'overview',
    label: '概览',
    icon: <HomeIcon />,
    path: '/creativeprostudio/prototype',
    component: PrototypeDesign,
    alwaysVisible: true
  },
  {
    id: 'asset-library',
    label: '素材库',
    icon: <ImageIcon />,
    path: '/creativeprostudio/asset-library',
    component: AssetLibrary,
    alwaysVisible: true
  },
  {
    id: 'master-library',
    label: '母版库',
    icon: <ViewInArIcon />,
    path: '/creativeprostudio/master-library',
    component: MasterLibrary,
    alwaysVisible: true
  },
  {
    id: 'batch-create',
    label: '批量创建',
    icon: <AddCircleIcon />,
    path: '/creativeprostudio/batch-create',
    component: BatchCenter,
    alwaysVisible: true
  },
  {
    id: 'projects',
    label: '项目管理',
    icon: <AccountTreeIcon />,
    path: '/creativeprostudio/projects',
    component: Projects,
    alwaysVisible: true
  },
  {
    id: 'efficiency-analytics',
    label: '效率分析',
    icon: <SpeedIcon />,
    path: '/creativeprostudio/efficiency-analytics',
    component: EfficiencyAnalytics,
    visibleOn: ['/creativeprostudio/prototype', '/creativeprostudio/asset-library', '/creativeprostudio/projects']
  },
  {
    id: 'ai-assistant',
    label: 'AI助手',
    icon: <SmartToyIcon />,
    path: '/creativeprostudio/ai-assistant',
    component: CtoPresentation,
    visibleOn: []
  },
  {
    id: 'ux-documents',
    label: 'UX设计文档',
    icon: <DescriptionIcon />,
    path: '/creativeprostudio/ux-documents',
    component: UXDocuments,
    visibleOn: []
  },
  {
    id: 'cto-presentation',
    label: 'CTO汇报模板',
    icon: <AssessmentIcon />,
    path: '/creativeprostudio/cto-presentation',
    component: CtoPresentation,
    visibleOn: []
  }
];

// Define additional routes that are not in the main navigation
export const additionalRoutes = [
  {
    path: '/',
    component: PrototypeDesign
  },
  {
    path: '/creativeprostudio',
    component: PrototypeDesign
  },
  {
    path: '/creativeprostudio/batch/:id',
    component: BatchDetail
  },
  {
    path: '/creativeprostudio/ui-guidelines',
    component: UiGuidelines
  },
  {
    path: '/creativeprostudio/api-specification',
    component: ApiSpecification
  },
  {
    path: '/creativeprostudio/database-design',
    component: DatabaseDesign
  },
  {
    path: '/creativeprostudio/interaction-guidelines',
    component: InteractionGuidelines
  },
  {
    path: '/creativeprostudio/project-report',
    component: ProjectReport
  },
  {
    path: '/creativeprostudio/project-blueprint',
    component: ProjectBlueprint
  },
  {
    path: '/creativeprostudio/frontend-guide',
    component: FrontendGuide
  },
  {
    path: '/creativeprostudio/backend-design',
    component: BackendDesign
  },
  {
    path: '/creativeprostudio/product-lifecycle',
    component: ProductLifecyclePresentation
  },
  {
    path: '/creativeprostudio/project-detail/:id',
    component: ProjectDetail
  }
];

// Helper function to determine if a navigation item should be visible
export const shouldShowNavItem = (item, currentPath) => {
  if (item.alwaysVisible) return true;
  if (!item.visibleOn || item.visibleOn.length === 0) return false;
  
  return item.visibleOn.some(path => 
    currentPath === path || currentPath.startsWith(path + '/')
  );
};

// Combine all routes
export const allRoutes = [
  ...mainNavigationItems.map(item => ({
    path: item.path,
    component: item.component
  })),
  ...additionalRoutes
]; 