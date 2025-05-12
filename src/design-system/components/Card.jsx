import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import colors from '../tokens/colors';
import spacing from '../tokens/spacing';
import typography from '../tokens/typography';

// 基础卡片容器 - 符合Apple设计风格
const CardContainer = styled(motion.div).attrs(props => ({
  // Extract custom props that shouldn't be passed to DOM
  isDark: undefined,
  variant: undefined,
  isElevated: undefined,
  fullWidth: undefined,
  maxWidth: undefined,
  hasHoverEffect: undefined,
  is3D: undefined,
  interactive: undefined
}))`
  position: relative;
  background: ${props => props.isDark 
    ? 'rgba(28, 28, 32, 0.95)' 
    : 'rgba(255, 255, 255, 0.95)'
  };
  border-radius: ${props => props.variant === 'rounded' ? '24px' : '16px'};
  overflow: hidden;
  box-shadow: ${props => props.isElevated 
    ? props.isDark 
      ? '0 15px 30px rgba(0, 0, 0, 0.3)' 
      : '0 15px 30px rgba(0, 0, 0, 0.1)'
    : props.isDark 
      ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
      : '0 4px 12px rgba(0, 0, 0, 0.05)'
  };
  border: 1px solid ${props => props.isDark 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(0, 0, 0, 0.04)'
  };
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  max-width: ${props => props.maxWidth || 'none'};
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease;

  ${props => props.interactive && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-6px);
      box-shadow: ${props.isDark 
        ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
        : '0 20px 40px rgba(0, 0, 0, 0.15)'
      };
    }
  `}
  
  ${props => props.hasHoverEffect && `
    &:hover {
      transform: translateY(-6px);
      box-shadow: ${props.isDark 
        ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
        : '0 20px 40px rgba(0, 0, 0, 0.15)'
      };
    }
  `}
  
  ${props => props.is3D && `
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-6px) rotateX(5deg) rotateY(5deg);
      box-shadow: ${props.isDark 
        ? '0 25px 50px rgba(0, 0, 0, 0.5)' 
        : '0 25px 50px rgba(0, 0, 0, 0.2)'
      };
    }
  `}
`;

const CardHeader = styled.div.attrs(props => ({
  hasDivider: undefined,
  isDark: undefined
}))`
  padding: 20px 24px;
  border-bottom: ${props => props.hasDivider 
    ? `1px solid ${props.isDark 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.04)'
    }` 
    : 'none'
  };
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled.h3.attrs(props => ({
  isDark: undefined
}))`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.isDark ? '#ffffff' : '#333333'};
  letter-spacing: -0.3px;
`;

const CardSubtitle = styled.p.attrs(props => ({
  isDark: undefined
}))`
  margin: 5px 0 0 0;
  font-size: 14px;
  color: ${props => props.isDark ? '#a0a0a0' : '#777777'};
`;

const CardContent = styled.div.attrs(props => ({
  noPadding: undefined,
  isDark: undefined
}))`
  padding: ${props => props.noPadding ? '0' : '24px'};
  color: ${props => props.isDark ? '#e1e1e1' : '#444444'};
`;

const CardMedia = styled.div.attrs(props => ({
  height: undefined,
  zoomOnHover: undefined
}))`
  position: relative;
  width: 100%;
  height: ${props => props.height || '200px'};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }
  
  ${props => props.zoomOnHover && `
    &:hover img {
      transform: scale(1.05);
    }
  `}
`;

const CardMediaOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0) 50%, 
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 20px;
  
  h3 {
    margin: 0;
    color: white;
    font-size: 20px;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  p {
    margin: 5px 0 0 0;
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const CardFooter = styled.div.attrs(props => ({
  hasDivider: undefined,
  isDark: undefined,
  align: undefined
}))`
  padding: 16px 24px;
  border-top: ${props => props.hasDivider 
    ? `1px solid ${props.isDark 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.04)'
    }` 
    : 'none'
  };
  display: flex;
  align-items: center;
  justify-content: ${props => props.align || 'flex-end'};
  gap: 12px;
`;

const CardBackground = styled.div.attrs(props => ({
  gradient: undefined,
  gradientFrom: undefined,
  gradientTo: undefined,
  background: undefined,
  opacity: undefined
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.gradient 
    ? `linear-gradient(135deg, ${props.gradientFrom || '#FF9190'}, ${props.gradientTo || '#6DC9FF'})` 
    : props.background || 'transparent'
  };
  opacity: ${props => props.opacity || 1};
  z-index: -1;
`;

const CardButton = styled(motion.button).attrs(props => ({
  isDark: undefined
}))`
  background: transparent;
  color: ${props => props.isDark ? '#ffffff' : '#666666'};
  border: 1px solid ${props => props.isDark 
    ? 'rgba(255, 255, 255, 0.15)' 
    : 'rgba(0, 0, 0, 0.1)'
  };
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.isDark 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.05)'
    };
  }
  
  &.primary {
    background: #FF9190;
    color: white;
    border: none;
    
    &:hover {
      background: #FF7B7A;
    }
  }
`;

const Badge = styled.span.attrs(props => ({
  color: undefined,
  absolute: undefined
}))`
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.color || '#FF9190'};
  color: white;
  border-radius: 12px;
  position: ${props => props.absolute ? 'absolute' : 'relative'};
  top: ${props => props.absolute ? '12px' : 'auto'};
  right: ${props => props.absolute ? '12px' : 'auto'};
  z-index: 2;
`;

const Card = ({ 
  children,
  title,
  subtitle,
  headerAction,
  media,
  mediaHeight,
  mediaOverlay,
  mediaTitle,
  mediaSubtitle,
  mediaZoomOnHover = true,
  footer,
  footerAlign = 'flex-end',
  variant = 'default',
  isElevated = false,
  fullWidth = false,
  maxWidth,
  hasHoverEffect = false,
  is3D = false,
  interactive = false,
  headerDivider = false,
  footerDivider = false,
  noPadding = false,
  badge,
  badgeColor,
  gradient = false,
  gradientFrom,
  gradientTo,
  background,
  backgroundOpacity,
  onClick,
  whileHover,
  whileTap,
  initial,
  animate,
  transition,
  ...props
}) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  const motionProps = {
    whileHover,
    whileTap: whileTap || (interactive ? { scale: 0.98 } : undefined),
    initial,
    animate,
    transition
  };
  
  // Filter out non-DOM props to avoid React warnings
  const filteredProps = { ...props };
  const nonDOMProps = ['bordered', 'shadow', 'padding', 'className'];
  nonDOMProps.forEach(prop => {
    if (prop in filteredProps) {
      delete filteredProps[prop];
    }
  });
  
  return (
    <CardContainer 
      isDark={isDark}
      variant={variant}
      isElevated={isElevated}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      hasHoverEffect={hasHoverEffect}
      is3D={is3D}
      interactive={interactive}
      onClick={onClick}
      {...motionProps}
      {...filteredProps}
    >
      {badge && (
        <Badge color={badgeColor} absolute>{badge}</Badge>
      )}
      
      {(gradient || background) && (
        <CardBackground 
          gradient={gradient} 
          gradientFrom={gradientFrom} 
          gradientTo={gradientTo} 
          background={background}
          opacity={backgroundOpacity}
        />
      )}
      
      {media && (
        <CardMedia height={mediaHeight} zoomOnHover={mediaZoomOnHover}>
          <img src={media} alt={mediaTitle || title} />
          {mediaOverlay && (
            <CardMediaOverlay>
              {mediaTitle && <h3>{mediaTitle}</h3>}
              {mediaSubtitle && <p>{mediaSubtitle}</p>}
            </CardMediaOverlay>
          )}
        </CardMedia>
      )}
      
      {(title || subtitle) && (
        <CardHeader hasDivider={headerDivider} isDark={isDark}>
          <div>
            {title && <CardTitle isDark={isDark}>{title}</CardTitle>}
            {subtitle && <CardSubtitle isDark={isDark}>{subtitle}</CardSubtitle>}
          </div>
          {headerAction}
        </CardHeader>
      )}
      
      <CardContent noPadding={noPadding} isDark={isDark}>
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter hasDivider={footerDivider} align={footerAlign} isDark={isDark}>
          {footer}
        </CardFooter>
      )}
    </CardContainer>
  );
};

// 子组件导出
Card.Button = ({ children, primary, isDark, ...props }) => {
  const { colorMode } = useTheme();
  const darkMode = isDark !== undefined ? isDark : colorMode === 'dark';
  
  return (
    <CardButton 
      className={primary ? 'primary' : ''}
      isDark={darkMode}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </CardButton>
  );
};

Card.Badge = Badge;

export { Card };
export default Card; 