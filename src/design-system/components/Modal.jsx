import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'styled-components';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.isDark 
    ? 'rgba(0, 0, 0, 0.8)' 
    : 'rgba(0, 0, 0, 0.6)'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 20px;
`;

const ModalContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: ${props => props.size === 'large' 
    ? '840px' 
    : props.size === 'medium' 
      ? '640px' 
      : props.size === 'small' 
        ? '480px' 
        : props.size === 'xs' 
          ? '360px' 
          : '640px'
  };
  max-height: ${props => props.noPadding ? '90vh' : '85vh'};
  background: ${props => props.isDark 
    ? 'rgba(28, 28, 32, 0.95)' 
    : 'rgba(255, 255, 255, 0.95)'
  };
  border-radius: 24px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, ${props => props.isDark ? '0.5' : '0.2'});
  overflow: hidden;
  padding: ${props => props.noPadding ? '0' : '0'};
  border: 1px solid ${props => props.isDark 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(0, 0, 0, 0.04)'
  };
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.isDark 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(0, 0, 0, 0.04)'
  };
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.isDark ? '#ffffff' : '#333333'};
  letter-spacing: -0.3px;
`;

const CloseButton = styled(motion.button)`
  background: ${props => props.isDark 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(0, 0, 0, 0.04)'
  };
  color: ${props => props.isDark ? '#ffffff' : '#666666'};
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.isDark 
      ? 'rgba(255, 255, 255, 0.15)' 
      : 'rgba(0, 0, 0, 0.08)'
    };
    transform: scale(1.05);
  }
  
  i {
    font-size: 20px;
  }
`;

const ModalContent = styled.div`
  overflow-y: auto;
  padding: ${props => props.noPadding ? '0' : '24px'};
  max-height: calc(85vh - 68px);
  color: ${props => props.isDark ? '#e1e1e1' : '#444444'};
  
  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.isDark 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.1)'
    };
    border-radius: 10px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px 24px;
  gap: 12px;
  border-top: 1px solid ${props => props.isDark 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(0, 0, 0, 0.04)'
  };
`;

const Button = styled(motion.button)`
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  
  &.primary {
    background: #FF9190;
    color: white;
    box-shadow: 0 6px 20px rgba(255, 145, 144, 0.3);
    
    &:hover {
      background: #FF7B7A;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(255, 145, 144, 0.4);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  &.secondary {
    background: ${props => props.isDark 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.04)'
    };
    color: ${props => props.isDark ? '#ffffff' : '#666666'};
    
    &:hover {
      background: ${props => props.isDark 
        ? 'rgba(255, 255, 255, 0.12)' 
        : 'rgba(0, 0, 0, 0.08)'
      };
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, ${props => props.isDark ? '0.3' : '0.08'});
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  i {
    font-size: 16px;
  }
`;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } }
};

const modalVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24,
      mass: 1
    } 
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: { duration: 0.2 }
  }
};

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium', 
  primaryAction, 
  primaryActionLabel = '确认', 
  secondaryAction, 
  secondaryActionLabel = '取消',
  showCloseButton = true,
  noPadding = false,
  showFooter = true,
  footerCustomContent = null,
  overlayClosable = true
}) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 点击遮罩层关闭
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && overlayClosable) {
      onClose();
    }
  };
  
  // ESC键关闭
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  // 打开时禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <ModalOverlay
        isDark={isDark}
        onClick={handleOverlayClick}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
      >
        <ModalContainer
          isDark={isDark}
          size={size}
          noPadding={noPadding}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          {title && (
            <ModalHeader isDark={isDark}>
              <ModalTitle isDark={isDark}>{title}</ModalTitle>
              {showCloseButton && (
                <CloseButton 
                  isDark={isDark} 
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="ri-close-line"></i>
                </CloseButton>
              )}
            </ModalHeader>
          )}
          
          <ModalContent isDark={isDark} noPadding={noPadding}>
            {children}
          </ModalContent>
          
          {showFooter && (footerCustomContent || primaryAction || secondaryAction) && (
            <ModalFooter isDark={isDark}>
              {footerCustomContent || (
                <>
                  {secondaryAction && (
                    <Button 
                      className="secondary" 
                      isDark={isDark}
                      onClick={secondaryAction}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {secondaryActionLabel}
                    </Button>
                  )}
                  {primaryAction && (
                    <Button 
                      className="primary"
                      onClick={primaryAction}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {primaryActionLabel}
                    </Button>
                  )}
                </>
              )}
            </ModalFooter>
          )}
        </ModalContainer>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default Modal; 