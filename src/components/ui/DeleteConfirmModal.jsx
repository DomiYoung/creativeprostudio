import React from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../design-system';

// 模态框叠加层
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
`;

// 模态框内容
const ModalContent = styled(motion.div)`
  background-color: ${props => props.isDark ? '#1a1a1a' : 'white'};
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

// 模态框标题
const ModalHeader = styled.div`
  padding: 24px 24px 16px 24px;
  display: flex;
  align-items: center;
`;

const HeaderIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 87, 87, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FF5757;
  margin-right: 16px;
  
  i {
    font-size: 20px;
  }
`;

const HeaderTitle = styled.h2`
  margin: 0;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  font-size: 20px;
  font-weight: 600;
`;

// 模态框内容
const ModalBody = styled.div`
  padding: 0 24px 24px 24px;
`;

const Message = styled.p`
  font-size: 15px;
  line-height: 1.5;
  color: ${props => props.isDark ? '#aaa' : '#666'};
  margin: 0 0 24px 0;
  padding-left: 56px;
`;

// 模态框底部
const ModalFooter = styled.div`
  padding: 16px 24px 24px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const FooterButton = styled(motion.button)`
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  
  ${props => props.danger 
    ? `
      background-color: #FF5757;
      color: white;
      border: none;
      box-shadow: 0 4px 12px rgba(255, 87, 87, 0.25);
    `
    : `
      background-color: transparent;
      color: ${props.isDark ? '#f5f5f5' : '#1d1d1f'};
      border: 1px solid ${props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    `
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "删除素材", 
  message = "您确定要删除所选素材吗？此操作无法撤销。",
  confirmText = "删除",
  cancelText = "取消"
}) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContent
          isDark={isDark}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalHeader>
            <HeaderIcon>
              <i className="fas fa-exclamation-triangle"></i>
            </HeaderIcon>
            <HeaderTitle isDark={isDark}>{title}</HeaderTitle>
          </ModalHeader>
          
          <ModalBody>
            <Message isDark={isDark}>{message}</Message>
          </ModalBody>
          
          <ModalFooter>
            <FooterButton
              isDark={isDark}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              {cancelText}
            </FooterButton>
            <FooterButton
              danger
              whileHover={{ y: -2, boxShadow: '0 8px 16px rgba(255, 87, 87, 0.35)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onConfirm}
            >
              {confirmText}
            </FooterButton>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default DeleteConfirmModal; 