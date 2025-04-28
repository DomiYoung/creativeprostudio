import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing } from '../tokens/spacing';

// 按钮变体样式映射
const buttonVariants = {
  // 主要按钮 - 蓝色背景白色文字
  primary: {
    background: colors.brand.primary,
    color: colors.neutral.white,
    border: 'none',
    hover: {
      background: '#0071EB', // 稍深的蓝色
    },
    active: {
      background: '#0062CC', // 更深的蓝色
    },
  },
  
  // 次要按钮 - 透明背景蓝色边框和文字
  secondary: {
    background: 'transparent',
    color: colors.brand.primary,
    border: `1px solid ${colors.brand.primary}`,
    hover: {
      background: 'rgba(0, 122, 255, 0.05)',
    },
    active: {
      background: 'rgba(0, 122, 255, 0.1)',
    },
  },
  
  // 文本按钮 - 无背景无边框蓝色文字
  text: {
    background: 'transparent',
    color: colors.brand.primary,
    border: 'none',
    hover: {
      background: 'rgba(0, 122, 255, 0.05)',
    },
    active: {
      background: 'rgba(0, 122, 255, 0.1)',
    },
  },
};

// 按钮尺寸映射
const buttonSizes = {
  small: {
    padding: `${spacing.space[1]} ${spacing.space[3]}`,
    fontSize: typography.fontSize.sm,
    borderRadius: spacing.borderRadius.md,
  },
  medium: {
    padding: `${spacing.space[2]} ${spacing.space[4]}`,
    fontSize: typography.fontSize.base,
    borderRadius: spacing.borderRadius.md,
  },
  large: {
    padding: `${spacing.space[3]} ${spacing.space[6]}`,
    fontSize: typography.fontSize.lg,
    borderRadius: spacing.borderRadius.lg,
  },
};

// 样式化按钮组件
const StyledButton = styled.button`
  font-family: ${typography.fontFamily.base};
  font-weight: ${typography.fontWeight.medium};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.space[2]};
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;
  outline: none;
  
  /* 应用变体样式 */
  background: ${props => buttonVariants[props.variant].background};
  color: ${props => buttonVariants[props.variant].color};
  border: ${props => buttonVariants[props.variant].border};
  
  /* 应用尺寸样式 */
  padding: ${props => buttonSizes[props.size].padding};
  font-size: ${props => buttonSizes[props.size].fontSize};
  border-radius: ${props => buttonSizes[props.size].borderRadius};
  
  /* 禁用状态 */
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  
  /* 悬停状态 */
  &:hover:not(:disabled) {
    background: ${props => buttonVariants[props.variant].hover.background};
  }
  
  /* 激活状态 */
  &:active:not(:disabled) {
    background: ${props => buttonVariants[props.variant].active.background};
    transform: translateY(1px);
  }
  
  /* 聚焦状态 */
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.3);
  }
`;

const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  icon,
  disabled = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </StyledButton>
  );
};

export default Button; 