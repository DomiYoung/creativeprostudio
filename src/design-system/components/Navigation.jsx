import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { typography } from '../tokens/typography';

// 导航容器
const NavContainer = styled.nav`
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
  align-items: ${props => props.vertical ? 'flex-start' : 'center'};
  padding: ${props => props.vertical ? spacing.space[2] : spacing.space[4]};
  background-color: ${props => props.transparent ? 'transparent' : colors.background.primary};
  border-bottom: ${props => props.bordered ? `1px solid ${colors.neutral.gray10}` : 'none'};
  box-shadow: ${props => props.elevated ? spacing.shadows.sm : 'none'};
  width: 100%;
`;

// 导航标题
const NavTitle = styled.div`
  font-family: ${typography.fontFamily.display};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.lg};
  color: ${colors.neutral.gray1};
  margin-right: ${spacing.space[6]};
`;

// 导航链接列表
const NavList = styled.ul`
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
  gap: ${props => props.vertical ? spacing.space[2] : spacing.space[6]};
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

// 导航链接项
const NavItem = styled.li`
  position: relative;
`;

// 导航链接
const NavLink = styled.a`
  font-family: ${typography.fontFamily.base};
  font-weight: ${typography.fontWeight.medium};
  font-size: ${typography.fontSize.base};
  color: ${props => props.active ? colors.brand.primary : colors.neutral.gray6};
  text-decoration: none;
  padding: ${spacing.space[2]};
  display: block;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${colors.brand.primary};
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${colors.brand.primary};
    transform: scaleX(${props => props.active ? 1 : 0});
    transform-origin: left;
    transition: transform 0.2s ease;
  }
`;

// 导航右侧区域
const NavRight = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: ${spacing.space[4]};
`;

const Navigation = ({
  title,
  items = [],
  right,
  vertical = false,
  transparent = false,
  bordered = true,
  elevated = false,
  activeIndex = -1,
  className,
  ...props
}) => {
  return (
    <NavContainer 
      vertical={vertical}
      transparent={transparent}
      bordered={bordered}
      elevated={elevated}
      className={className}
      {...props}
    >
      {title && <NavTitle>{title}</NavTitle>}
      <NavList vertical={vertical}>
        {items.map((item, index) => (
          <NavItem key={index}>
            <NavLink 
              href={item.href} 
              active={index === activeIndex}
              onClick={item.onClick}
            >
              {item.label}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
      {right && <NavRight>{right}</NavRight>}
    </NavContainer>
  );
};

export default Navigation; 