import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

// Button variants
const VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  TEXT: 'text',
  GRADIENT: 'gradient',
  OUTLINE: 'outline',
  GHOST: 'ghost',
};

// Button sizes
const SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
};

// Base button styles
const StyledButton = styled(motion.button)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: ${props => props.$rounded ? '9999px' : '12px'};
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  overflow: hidden;
  user-select: none;
  
  /* Size variations */
  ${props => {
    switch (props.$size) {
      case SIZES.XS:
        return `
          padding: 6px 12px;
          font-size: 12px;
          height: 30px;
        `;
      case SIZES.SM:
        return `
          padding: 8px 16px;
          font-size: 13px;
          height: 36px;
        `;
      case SIZES.MD:
        return `
          padding: 10px 20px;
          font-size: 14px;
          height: 42px;
        `;
      case SIZES.LG:
        return `
          padding: 12px 24px;
          font-size: 15px;
          height: 48px;
        `;
      case SIZES.XL:
        return `
          padding: 14px 28px;
          font-size: 16px;
          height: 54px;
        `;
      default:
        return `
          padding: 10px 20px;
          font-size: 14px;
          height: 42px;
        `;
    }
  }}
  
  /* Variant variations */
  ${props => {
    const isDark = props.$isDark;
    
    // Generate consistent color brightening/darkening for hover states
    const brighten = (color, amount = 10) => {
      // Simple implementation for demo purposes
      return color;
    };
    
    const darken = (color, amount = 10) => {
      // Simple implementation for demo purposes
      return color;
    };
    
    // Color management based on variant and theme
    let bgColor, textColor, hoverBgColor, hoverTextColor, activeBgColor;
    
    switch (props.$variant) {
      case VARIANTS.PRIMARY:
        bgColor = props.$color || '#FF9190';
        textColor = '#FFF';
        hoverBgColor = brighten(bgColor, 5);
        activeBgColor = darken(bgColor, 10);
        
        return `
          background-color: ${bgColor};
          color: ${textColor};
          
          &:hover {
            background-color: #FF7B7A;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 145, 144, 0.3);
          }
          
          &:active {
            background-color: #FF6665;
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(255, 145, 144, 0.2);
          }
        `;
        
      case VARIANTS.SECONDARY:
        bgColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
        textColor = isDark ? '#FFFFFF' : '#333333';
        
        return `
          background-color: ${bgColor};
          color: ${textColor};
          
          &:hover {
            background-color: ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'};
            transform: translateY(-2px);
            box-shadow: ${isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
          }
          
          &:active {
            background-color: ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)'};
            transform: translateY(0);
          }
        `;
        
      case VARIANTS.TERTIARY:
        textColor = isDark ? '#e0e0e0' : '#555555';
        bgColor = 'transparent';
        
        return `
          background-color: ${bgColor};
          color: ${textColor};
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'};
          
          &:hover {
            background-color: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
            transform: translateY(-2px);
            border-color: ${isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.18)'};
          }
          
          &:active {
            background-color: ${isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
            transform: translateY(0);
          }
        `;
        
      case VARIANTS.TEXT:
        textColor = props.$color || (isDark ? '#e0e0e0' : '#555555');
        bgColor = 'transparent';
        
        return `
          background-color: transparent;
          color: ${textColor};
          padding-left: 8px;
          padding-right: 8px;
          
          &:hover {
            background-color: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
            transform: translateY(-1px);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
        
      case VARIANTS.GRADIENT:
        const gradientFrom = props.$gradientFrom || '#FF9190';
        const gradientTo = props.$gradientTo || '#6DC9FF';
        
        return `
          background: linear-gradient(135deg, ${gradientFrom}, ${gradientTo});
          color: white;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            background: linear-gradient(135deg, ${brighten(gradientFrom, 5)}, ${brighten(gradientTo, 5)});
          }
          
          &:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            background: linear-gradient(135deg, ${darken(gradientFrom, 5)}, ${darken(gradientTo, 5)});
          }
        `;
        
      case VARIANTS.OUTLINE:
        textColor = props.$color || (isDark ? '#e0e0e0' : '#555555');
        
        return `
          background-color: transparent;
          color: ${textColor};
          border: 2px solid ${textColor};
          
          &:hover {
            background-color: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
            transform: translateY(-2px);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
        
      case VARIANTS.GHOST:
        textColor = props.$color || (isDark ? '#e0e0e0' : '#555555');
        
        return `
          background-color: transparent;
          color: ${textColor};
          
          &:hover {
            background-color: ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'};
            transform: translateY(-2px);
          }
          
          &:active {
            background-color: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
            transform: translateY(0);
          }
        `;
        
      default:
        return '';
    }
  }}
  
  /* Full width option */
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  /* Disabled state */
  ${props => props.disabled && `
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  `}
  
  /* Icon only mode */
  ${props => props.$iconOnly && `
    padding: 0;
    aspect-ratio: 1;
    justify-content: center;
  `}
  
  /* Ripple effect base styles */
  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

// Main button component
const ButtonBase = React.forwardRef(({
  children,
  variant = VARIANTS.PRIMARY,
  size = SIZES.MD,
  color,
  gradientFrom,
  gradientTo,
  fullWidth = false,
  rounded = false,
  iconOnly = false,
  ripple = true,
  className,
  loading = false,
  onClick,
  disabled = false,
  isDark = false,
  ...props
}, ref) => {
  // Ripple effect
  const createRipple = (e) => {
    if (!ripple) return;
    
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    
    const existingRipple = button.getElementsByClassName('ripple')[0];
    
    if (existingRipple) {
      existingRipple.remove();
    }
    
    button.appendChild(circle);
  };
  
  // Handle click and ripple effect
  const handleClick = (e) => {
    if (disabled || loading) return;
    
    createRipple(e);
    
    if (onClick) {
      onClick(e);
    }
  };
  
  return (
    <StyledButton
      ref={ref}
      $variant={variant}
      $size={size}
      $color={color}
      $gradientFrom={gradientFrom}
      $gradientTo={gradientTo}
      $fullWidth={fullWidth}
      $rounded={rounded}
      $iconOnly={iconOnly}
      $isDark={isDark}
      className={className}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading ? (
        <span className="loading-spinner">
          {/* Loading spinner */}
          <svg viewBox="0 0 24 24" width="16" height="16">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="35 15" />
          </svg>
        </span>
      ) : (
        children
      )}
    </StyledButton>
  );
});

// Wrapper component to use the theme context
const Button = React.forwardRef((props, ref) => {
  const { isDark } = useTheme();
  
  return <ButtonBase {...props} isDark={props.isDark !== undefined ? props.isDark : isDark} ref={ref} />;
});

// Export button with its variants and sizes
Button.displayName = 'Button';
Button.VARIANTS = VARIANTS;
Button.SIZES = SIZES;

export default Button;