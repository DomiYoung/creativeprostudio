import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import Sidebar from '../navigation/Sidebar';
import { useTheme } from '../../design-system';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.isDark ? '#121212' : '#f9f9f9'};
`;

const MainContent = styled.main`
  flex: 1;
  overflow-x: hidden;
  padding: 20px;
  transition: all 0.3s ease;
`;

const Layout = () => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  return (
    <LayoutContainer isDark={isDark}>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout; 