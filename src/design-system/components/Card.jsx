import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { typography } from '../tokens/typography';

// 卡片容器
const CardContainer = styled.div`
  background-color: ${colors.background.primary};
  border-radius: ${props => props.rounded ? spacing.borderRadius.lg : spacing.borderRadius.md};
  box-shadow: ${props => props.elevated ? spacing.shadows.md : 'none'};
  border: ${props => props.bordered ? `1px solid ${colors.neutral.gray10}` : 'none'};
  overflow: hidden;
  transition: all 0.2s ease;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  /* 悬停效果 */
  &:hover {
    ${props => props.interactive && `
      transform: translateY(-2px);
      box-shadow: ${spacing.shadows.lg};
    `}
  }
`;

// 卡片头部
const CardHeader = styled.div`
  padding: ${spacing.space[4]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${props => props.divider ? `1px solid ${colors.neutral.gray10}` : 'none'};
`;

// 卡片标题
const CardTitle = styled.h3`
  margin: 0;
  font-family: ${typography.fontFamily.display};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.lg};
  color: ${colors.neutral.gray1};
`;

// 卡片内容
const CardContent = styled.div`
  padding: ${spacing.space[4]};
`;

// 卡片底部
const CardFooter = styled.div`
  padding: ${spacing.space[4]};
  display: flex;
  align-items: center;
  justify-content: ${props => props.align || 'flex-end'};
  gap: ${spacing.space[3]};
  border-top: ${props => props.divider ? `1px solid ${colors.neutral.gray10}` : 'none'};
  background-color: ${colors.background.secondary};
`;

const Card = ({
  children,
  title,
  extra,
  footer,
  footerAlign,
  bordered = true,
  elevated = false,
  rounded = false,
  interactive = false,
  fullWidth = false,
  headerDivider = true,
  footerDivider = true,
  className,
  ...props
}) => {
  return (
    <CardContainer 
      bordered={bordered}
      elevated={elevated}
      rounded={rounded}
      interactive={interactive}
      fullWidth={fullWidth}
      className={className}
      {...props}
    >
      {title && (
        <CardHeader divider={headerDivider}>
          <CardTitle>{title}</CardTitle>
          {extra && <div>{extra}</div>}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardFooter divider={footerDivider} align={footerAlign}>
          {footer}
        </CardFooter>
      )}
    </CardContainer>
  );
};

export default Card; 