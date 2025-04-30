import React from 'react';
import styled from '@emotion/styled';
import colors from '../tokens/colors';
import spacing from '../tokens/spacing';
import typography from '../tokens/typography';

// 导航容器 - 符合Apple风格的导航栏
const NavContainer = styled.nav`
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
  align-items: ${props => props.vertical ? 'flex-start' : 'center'};
  padding: ${props => props.vertical ? spacing.space[2] : spacing.layout.headerHeight === '60px' ? '0 24px' : spacing.layout.headerHeight};
  height: ${props => props.vertical ? 'auto' : spacing.layout.headerHeight};
  background-color: ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    if (props.transparent) {
      return 'transparent';
    } else if (props.blurred) {
      return isDark ? 'rgba(29, 29, 31, 0.8)' : 'rgba(255, 255, 255, 0.8)';
    } else {
      return isDark ? colors.ui.card.dark : colors.ui.card.light;
    }
  }};
  backdrop-filter: ${props => props.blurred ? 'blur(20px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.blurred ? 'blur(20px)' : 'none'};
  border-bottom: ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    return props.bordered 
      ? `1px solid ${isDark ? colors.ui.border.dark : colors.ui.border.light}` 
      : 'none';
  }};
  box-shadow: ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    return props.elevated 
      ? isDark ? spacing.shadows.dark.sm : spacing.shadows.sm
      : 'none';
  }};
  width: 100%;
  position: ${props => props.sticky ? 'sticky' : 'relative'};
  top: ${props => props.sticky ? '0' : 'auto'};
  z-index: ${props => props.sticky ? '100' : 'auto'};
  transition: all 0.2s ease;
`;

// 导航标题/Logo
const NavTitle = styled.div`
  font-family: ${typography.fontFamily.display};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.title3};
  color: ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    return isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light;
  }};
  margin-right: ${spacing.space[6]};
  display: flex;
  align-items: center;
  
  img {
    height: 32px;
    width: auto;
    margin-right: ${spacing.space[2]};
  }
`;

// 导航链接列表
const NavList = styled.ul`
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
  gap: ${props => props.vertical ? spacing.space[2] : spacing.space[4]};
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

// 导航链接项
const NavItem = styled.li`
  position: relative;
`;

// 导航链接 - 符合Apple设计的导航链接
const NavLinkBase = styled.a`
  font-family: ${typography.fontFamily.base};
  font-weight: ${typography.fontWeight.medium};
  font-size: ${typography.fontSize.subhead};
  color: ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    return props.$active 
      ? isDark ? colors.primary.dark : colors.primary.light
      : isDark ? colors.ui.text.secondary.dark : colors.ui.text.secondary.light;
  }};
  text-decoration: none;
  padding: ${spacing.space[2]} ${spacing.space[3]};
  border-radius: ${spacing.borderRadius.md};
  display: flex;
  align-items: center;
  gap: ${spacing.space[2]};
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    color: ${props => {
      const isDark = props.theme?.colorMode === 'dark';
      return isDark ? colors.primary.dark : colors.primary.light;
    }};
    background-color: ${props => {
      const isDark = props.theme?.colorMode === 'dark';
      return isDark 
        ? 'rgba(10, 132, 255, 0.1)' 
        : 'rgba(0, 122, 255, 0.05)';
    }};
  }
  
  i, svg {
    font-size: 16px;
  }
  
  ${props => props.$active && `
    background-color: ${props.theme?.colorMode === 'dark' 
      ? 'rgba(10, 132, 255, 0.15)' 
      : 'rgba(0, 122, 255, 0.1)'};
    font-weight: ${typography.fontWeight.semibold};
  `}
`;

// Wrapper component to handle the 'active' prop
const NavLink = ({ active, ...props }) => (
  <NavLinkBase $active={active} {...props} />
);

// 导航右侧区域
const NavRight = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: ${spacing.space[2]};
`;

// 用户头像组件
const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    return isDark ? colors.gray[700] : colors.gray[200];
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    return isDark ? colors.gray[300] : colors.gray[600];
  }};
  font-weight: ${typography.fontWeight.semibold};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 导航按钮
const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  color: ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    return isDark ? colors.ui.text.secondary.dark : colors.ui.text.secondary.light;
  }};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => {
      const isDark = props.theme?.colorMode === 'dark';
      return isDark ? colors.gray[800] : colors.gray[100];
    }};
  }
  
  i, svg {
    font-size: 16px;
  }
`;

/**
 * 导航组件 - 符合Apple设计语言风格
 */
const Navigation = ({
  title,
  logo,
  items = [],
  right,
  vertical = false,
  transparent = false,
  blurred = true,
  bordered = true,
  elevated = false,
  sticky = false,
  activeIndex = -1,
  className,
  renderUserAvatar,
  ...props
}) => {
  return (
    <NavContainer 
      vertical={vertical}
      transparent={transparent}
      blurred={blurred}
      bordered={bordered}
      elevated={elevated}
      sticky={sticky}
      className={className}
      {...props}
    >
      {(title || logo) && (
        <NavTitle>
          {logo && <img src={logo} alt={typeof title === 'string' ? title : 'Logo'} />}
          {title}
        </NavTitle>
      )}
      
      <NavList vertical={vertical}>
        {items.map((item, index) => (
          <NavItem key={index}>
            <NavLink 
              as={item.onClick ? 'button' : 'a'}
              href={!item.onClick ? item.href : undefined}
              active={index === activeIndex}
              onClick={item.onClick}
            >
              {item.icon && <i className={item.icon}></i>}
              {item.label}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
      
      {(right || renderUserAvatar) && (
        <NavRight>
          {right}
          {renderUserAvatar && (
            typeof renderUserAvatar === 'function' 
              ? renderUserAvatar() 
              : <UserAvatar>{renderUserAvatar}</UserAvatar>
          )}
        </NavRight>
      )}
    </NavContainer>
  );
};

// 导出额外组件
Navigation.UserAvatar = UserAvatar;
Navigation.NavButton = NavButton;

export default Navigation; 