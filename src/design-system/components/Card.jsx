import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import colors from '../tokens/colors';
import spacing from '../tokens/spacing';
import typography from '../tokens/typography';

// 基础卡片容器 - 符合Apple设计风格
const CardContainer = styled(motion.div)`
  background-color: ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    switch (props.variant) {
      case 'colored':
        return isDark ? colors.gray[800] : colors.gray[50];
      case 'transparent':
        return 'transparent';
      default:
        return isDark ? colors.ui.card.dark : colors.ui.card.light;
    }
  }};
  
  border-radius: ${props => {
    switch (props.rounded) {
      case 'none': return spacing.borderRadius.none;
      case 'sm': return spacing.borderRadius.xs;
      case 'md': return spacing.borderRadius.sm;
      case 'lg': return spacing.borderRadius.md; // iOS标准圆角
      case 'xl': return spacing.borderRadius.lg;
      case 'full': return spacing.borderRadius.pill;
      default: return spacing.borderRadius.md;
    }
  }};
  
  border: ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    return props.bordered 
      ? `1px solid ${isDark ? colors.ui.border.dark : colors.ui.border.light}` 
      : 'none';
  }};
  
  box-shadow: ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    switch (props.shadow) {
      case 'none': return 'none';
      case 'sm': return isDark ? spacing.shadows.dark.sm : spacing.shadows.sm;
      case 'md': return isDark ? spacing.shadows.dark.md : spacing.shadows.md;
      case 'lg': return isDark ? spacing.shadows.dark.lg : spacing.shadows.lg;
      case 'xl': return isDark ? spacing.shadows.dark.xl : spacing.shadows.xl;
      default: return isDark ? spacing.shadows.dark.md : spacing.shadows.md;
    }
  }};
  
  padding: ${props => {
    switch (props.padding) {
      case 'none': return '0';
      case 'sm': return spacing.space[3]; // 12px
      case 'md': return spacing.space[4]; // 16px
      case 'lg': return spacing.component.card; // 24px
      case 'xl': return spacing.space[8]; // 32px
      default: return spacing.component.card;
    }
  }};
  
  overflow: hidden;
  transition: all 0.2s ease;
  
  /* 交互样式 */
  ${props => props.interactive && `
    cursor: pointer;
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${props.theme?.colorMode === 'dark' 
        ? spacing.shadows.dark.lg 
        : spacing.shadows.lg};
    }
  `}
`;

const CardTitle = styled.div`
  font-family: ${typography.fontFamily.display};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.title3};
  color: ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    return isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light;
  }};
  margin-bottom: ${spacing.space[4]};
`;

const CardBody = styled.div`
  color: ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    return isDark ? colors.ui.text.primary.dark : colors.ui.text.primary.light;
  }};
`;

const CardFooter = styled.div`
  margin-top: ${spacing.space[4]};
  padding-top: ${spacing.space[4]};
  border-top: 1px solid ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    return isDark ? colors.ui.border.dark : colors.ui.border.light;
  }};
  color: ${props => {
    const isDark = props.theme?.colorMode === 'dark';
    return isDark ? colors.ui.text.secondary.dark : colors.ui.text.secondary.light;
  }};
`;

// Card组件
const Card = React.forwardRef(({
  children,
  variant = 'default',
  bordered = false,
  shadow = 'md',
  rounded = 'lg',
  interactive = false,
  padding = 'md',
  title,
  footer,
  titleClassName,
  bodyClassName,
  footerClassName,
  onClick,
  ...props
}, ref) => {
  const isClickable = Boolean(onClick) || interactive;
  
  return (
    <CardContainer
      ref={ref}
      as={motion.div}
      variant={variant}
      bordered={bordered}
      shadow={shadow}
      rounded={rounded}
      padding={padding}
      interactive={interactive}
      onClick={onClick}
      whileHover={isClickable ? { scale: 1.02 } : undefined}
      whileTap={isClickable ? { scale: 0.98 } : undefined}
      {...props}
    >
      {title && (
        <CardTitle className={titleClassName}>
          {title}
        </CardTitle>
      )}
      
      <CardBody className={bodyClassName}>
        {children}
      </CardBody>
      
      {footer && (
        <CardFooter className={footerClassName}>
          {footer}
        </CardFooter>
      )}
    </CardContainer>
  );
});

Card.displayName = "Card";

export default Card; 