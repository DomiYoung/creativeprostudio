import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme } from '../index';

// 动画变体
const pageTransition = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 } 
  }
};

const childElement = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

// 布局组件
const Container = styled(motion.div)`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
  background-color: ${props => props.isDark ? '#121212' : '#fafafa'};
  color: ${props => props.isDark ? '#f5f5f5' : '#212121'};
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

// 页眉
const Header = styled.header`
  height: 64px;
  background-color: ${props => props.isDark ? 'rgba(30, 30, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)'};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px ${props => props.isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.03)'};
  transition: background-color 0.3s ease, border-bottom 0.3s ease;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 32px;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  letter-spacing: -0.2px;
`;

const LogoText = styled.span`
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
  transition: color 0.3s ease;
`;

const LogoHighlight = styled.span`
  background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  color: ${props => props.isDark ? '#aaa' : '#555'};
  text-decoration: none;
  font-size: 14px;
  padding: 0 18px;
  height: 64px;
  transition: all 0.2s ease;
  font-weight: 500;
  letter-spacing: -0.2px;
  
  &:hover, &.active {
    color: #FF9190;
  }
  
  &.active {
    box-shadow: inset 0 -2px 0 #FF9190;
    font-weight: 600;
  }
  
  i {
    margin-right: 8px;
    font-size: 16px;
  }
`;

const UserAvatar = styled(motion.div)`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(255, 145, 144, 0.3);
  cursor: pointer;
`;

// 面包屑导航
const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
  color: ${props => props.isDark ? '#aaa' : '#666'};
`;

const BreadcrumbItem = styled.span`
  display: flex;
  align-items: center;
  
  &:not(:last-child) {
    margin-right: 8px;
    
    &:after {
      content: '/';
      margin-left: 8px;
      opacity: 0.5;
    }
  }
  
  &:last-child {
    color: ${props => props.isDark ? '#f5f5f5' : '#333'};
    font-weight: 500;
  }
  
  &:hover {
    color: #FF9190;
    cursor: pointer;
  }
`;

// 主要内容
const MainContent = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

// 页面标题
const PageHeaderContainer = styled(motion.div)`
  margin-bottom: 32px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${props => props.isDark ? '#f5f5f5' : '#212121'};
  transition: color 0.3s ease;
`;

const PageDescription = styled.p`
  font-size: 16px;
  color: ${props => props.isDark ? '#aaa' : '#666'};
  max-width: 600px;
  transition: color 0.3s ease;
`;

// 页脚
const Footer = styled.footer`
  background-color: ${props => props.isDark ? '#1a1a1a' : 'white'};
  padding: 40px 0;
  border-top: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  text-align: center;
  transition: background-color 0.3s ease, border-top 0.3s ease;
`;

const FooterLogo = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 16px;
  
  span:first-of-type {
    color: ${props => props.isDark ? '#f5f5f5' : '#333'};
  }
  
  span:last-of-type {
    background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

const FooterText = styled.p`
  color: ${props => props.isDark ? '#aaa' : '#666'};
  font-size: 14px;
  margin-bottom: 20px;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FooterLink = styled.a`
  color: ${props => props.isDark ? '#aaa' : '#666'};
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
  
  &:hover {
    color: #FF9190;
  }
`;

const Copyright = styled.p`
  color: ${props => props.isDark ? '#777' : '#999'};
  font-size: 13px;
`;

// 主页面布局组件
const PageLayout = ({ 
  children, 
  title, 
  description, 
  breadcrumbs = [], 
  activeNav = 'home',
}) => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 导航项配置
  const navItems = [
    { id: 'home', label: '首页', icon: 'fa-home', path: '/creativeprostudio/prototype' },
    { id: 'asset-library', label: '素材库', icon: 'fa-images', path: '/creativeprostudio/asset-library' },
    { id: 'master-library', label: '母版库', icon: 'fa-palette', path: '/creativeprostudio/master-library' },
    { id: 'batch-create', label: '批量创建', icon: 'fa-th-large', path: '/creativeprostudio/batch-create' },
    { id: 'projects', label: '项目', icon: 'fa-folder-open', path: '/creativeprostudio/projects' }
  ];

  return (
    <Container 
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      isDark={isDark}
    >
      {/* 导航栏 */}
      <Header isDark={isDark}>
        <NavGroup>
          <LogoContainer>
            <Logo onClick={() => navigate('/creativeprostudio/prototype')} style={{ cursor: 'pointer' }}>
              <LogoText isDark={isDark}>CreativePro </LogoText><LogoHighlight>Studio</LogoHighlight>
            </Logo>
          </LogoContainer>
          
          {navItems.map(item => (
            <NavItem 
              key={item.id}
              isDark={isDark}
              className={activeNav === item.id ? 'active' : ''}
              onClick={() => navigate(item.path)}
            >
              <i className={`fas ${item.icon}`}></i> {item.label}
            </NavItem>
          ))}
        </NavGroup>
        
        <NavGroup>
          <UserAvatar 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            D
          </UserAvatar>
        </NavGroup>
      </Header>

      {/* 主要内容 */}
      <MainContent>
        {/* 面包屑导航 */}
        {breadcrumbs.length > 0 && (
          <BreadcrumbContainer isDark={isDark}>
            {breadcrumbs.map((crumb, index) => (
              <BreadcrumbItem 
                key={index} 
                isDark={isDark}
                onClick={() => navigate(crumb.path)}
              >
                {crumb.label}
              </BreadcrumbItem>
            ))}
          </BreadcrumbContainer>
        )}
        
        {/* 页面标题 */}
        {(title || description) && (
          <PageHeaderContainer variants={childElement}>
            {title && <PageTitle isDark={isDark}>{title}</PageTitle>}
            {description && <PageDescription isDark={isDark}>{description}</PageDescription>}
          </PageHeaderContainer>
        )}
        
        {/* 页面内容 */}
        {children}
      </MainContent>

      {/* 页脚 */}
      <Footer isDark={isDark}>
        <FooterLogo isDark={isDark}>
          <span>CreativePro</span> <span>Studio</span>
        </FooterLogo>
        <FooterText isDark={isDark}>专为美妆电商设计的高效创意工具</FooterText>
        <FooterLinks>
          <motion.div whileHover={{ y: -2 }}>
            <FooterLink isDark={isDark} onClick={() => navigate('/')}>关于我们</FooterLink>
          </motion.div>
          <motion.div whileHover={{ y: -2 }}>
            <FooterLink isDark={isDark} onClick={() => navigate('/help')}>帮助中心</FooterLink>
          </motion.div>
          <motion.div whileHover={{ y: -2 }}>
            <FooterLink isDark={isDark} onClick={() => navigate('/privacy')}>隐私政策</FooterLink>
          </motion.div>
          <motion.div whileHover={{ y: -2 }}>
            <FooterLink isDark={isDark} onClick={() => navigate('/terms')}>用户协议</FooterLink>
          </motion.div>
        </FooterLinks>
        <Copyright isDark={isDark}>© 版权归属domiyoung__ 2025 CreativePro Studio. All rights reserved.</Copyright>
      </Footer>
    </Container>
  );
};

export default PageLayout; 