import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme } from '../../design-system';
import MainNavigation from '../navigation/MainNavigation';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.isDark ? '#121212' : '#f9f9f9'};
`;

const MainContent = styled.main`
  flex: 1;
  overflow-x: hidden;
  padding: 20px;
  transition: all 0.3s ease;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

const Layout = () => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  return (
    <LayoutContainer isDark={isDark}>
      <MainNavigation />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout; 