import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import colors from '../tokens/colors';
import spacing from '../tokens/spacing';
import typography from '../tokens/typography';

// 基础按钮组件 - 按照Apple设计风格
const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: ${props => props.pill ? spacing.borderRadius.pill : spacing.borderRadius.md};
  font-family: ${typography.fontFamily.base};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${props => typography.fontSize[props.size === 'lg' ? 'body' : props.size === 'sm' ? 'footnote' : 'subhead']};
  transition: all 0.2s ease;
  cursor: pointer;
  padding: ${props => 
    props.size === 'lg' ? '12px 24px' : 
    props.size === 'sm' ? '6px 16px' : 
    '8px 20px'};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  /* 根据变体设置样式 */
  ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    
    switch(props.variant) {
      case 'primary':
        return `
          background-color: ${isDark ? colors.primary.dark : colors.primary.light};
          color: white;
          border: none;
          
          &:hover {
            background-color: ${isDark ? '#097CEC' : '#0071EB'};
          }
          
          &:active {
            background-color: ${isDark ? '#0868C6' : '#0062CC'};
          }
        `;
      
      case 'secondary':
        return `
          background-color: ${isDark ? colors.gray[800] : colors.gray[100]};
          color: ${isDark ? colors.gray[100] : colors.gray[900]};
          border: none;
          
          &:hover {
            background-color: ${isDark ? colors.gray[700] : colors.gray[200]};
          }
          
          &:active {
            background-color: ${isDark ? colors.gray[600] : colors.gray[300]};
          }
        `;
      
      case 'outline':
        return `
          background-color: transparent;
          color: ${isDark ? colors.primary.dark : colors.primary.light};
          border: 1px solid ${isDark ? colors.primary.dark : colors.primary.light};
          
          &:hover {
            background-color: ${isDark ? 'rgba(10, 132, 255, 0.1)' : 'rgba(0, 122, 255, 0.1)'};
          }
          
          &:active {
            background-color: ${isDark ? 'rgba(10, 132, 255, 0.2)' : 'rgba(0, 122, 255, 0.2)'};
          }
        `;
        
      case 'ghost':
        return `
          background-color: transparent;
          color: ${isDark ? colors.gray[100] : colors.gray[900]};
          border: none;
          
          &:hover {
            background-color: ${isDark ? colors.gray[800] : colors.gray[100]};
          }
          
          &:active {
            background-color: ${isDark ? colors.gray[700] : colors.gray[200]};
          }
        `;
        
      case 'destructive':
        return `
          background-color: ${colors.semantic.error};
          color: white;
          border: none;
          
          &:hover {
            background-color: #E02F25;
          }
          
          &:active {
            background-color: #C0271F;
          }
        `;
      
      default:
        return '';
    }
  }}
  
  /* 禁用状态 */
  ${props => props.disabled && `
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  `}
`;

// Button组件
const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  pill = false,
  leftIcon,
  rightIcon,
  onClick,
  type = "button",
  ...props
}, ref) => {
  return (
    <StyledButton
      ref={ref}
      as={motion.button}
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      pill={pill}
      onClick={disabled ? undefined : onClick}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      {...props}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {children}
      {rightIcon && <span>{rightIcon}</span>}
    </StyledButton>
  );
});

Button.displayName = "Button";

export default Button; 