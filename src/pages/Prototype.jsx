import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme } from '../design-system';
import PageLayout from '../design-system/components/PageLayout';

// 样式组件
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const DashboardCard = styled.div`
  background-color: ${props => props.isDark ? '#1e1e1e' : 'white'};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, ${props => props.isDark ? '0.2' : '0.04'});
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 30px rgba(0, 0, 0, ${props => props.isDark ? '0.3' : '0.08'});
    border-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
  }
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
  font-size: 24px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: ${props => props.isDark ? '#aaa' : '#666'};
  margin: 0;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
`;

const Prototype = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 面包屑导航
  const breadcrumbs = [
    { label: '首页', path: '/creativeprostudio/prototype' }
  ];
  
  // 渲染单个卡片
  const renderCard = ({ icon, title, description, onClick }) => (
    <DashboardCard 
      onClick={onClick}
      isDark={isDark}
    >
      <CardIcon isDark={isDark}>
        <i className={icon}></i>
      </CardIcon>
      <CardTitle isDark={isDark}>{title}</CardTitle>
      <CardDescription isDark={isDark}>{description}</CardDescription>
    </DashboardCard>
  );
  
  return (
    <PageLayout
      title="CreativePro Studio"
      description="欢迎使用CreativePro Studio，一站式创意设计与开发平台。"
      breadcrumbs={breadcrumbs}
      activeNav="dashboard"
    >
      {/* 设计阶段 */}
      <SectionTitle isDark={isDark}>设计阶段</SectionTitle>
      <CardGrid>
        <DashboardCard
          icon="fas fa-palette"
          title="UI 设计"
          description="UI组件、视觉规范和设计系统"
          onClick={() => navigate('/creativeprostudio/ui-guidelines')}
          isDark={isDark}
        >
          <CardIcon isDark={isDark}>
            <i className="fas fa-palette"></i>
          </CardIcon>
          <CardTitle isDark={isDark}>UI 设计</CardTitle>
          <CardDescription isDark={isDark}>UI组件、视觉规范和设计系统</CardDescription>
        </DashboardCard>
        
        <DashboardCard
          icon="fas fa-user-alt"
          title="UX 设计"
          description="用户体验设计文档，包含用户旅程地图、信息架构和交互规范"
          onClick={() => navigate('/creativeprostudio/ux-documents')}
          isDark={isDark}
        >
          <CardIcon isDark={isDark}>
            <i className="fas fa-user-alt"></i>
          </CardIcon>
          <CardTitle isDark={isDark}>UX 设计</CardTitle>
          <CardDescription isDark={isDark}>用户体验设计文档，包含用户旅程地图、信息架构和交互规范</CardDescription>
        </DashboardCard>
        
        <DashboardCard
          icon="fas fa-images"
          title="素材库"
          description="查找高质量素材，打造精美设计"
          onClick={() => navigate('/creativeprostudio/asset-library')}
          isDark={isDark}
        >
          <CardIcon isDark={isDark}>
            <i className="fas fa-images"></i>
          </CardIcon>
          <CardTitle isDark={isDark}>素材库</CardTitle>
          <CardDescription isDark={isDark}>查找高质量素材，打造精美设计</CardDescription>
        </DashboardCard>
      </CardGrid>
    </PageLayout>
  );
};

export default Prototype; 