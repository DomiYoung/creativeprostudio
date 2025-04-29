import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

// 模态框背景
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

// 模态框容器
const ModalContainer = styled(motion.div)`
  background-color: ${props => props.isDark ? '#1a1a1a' : 'white'};
  border-radius: 20px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 24px;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
`;

// 警告图标
const WarningIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  border-radius: 30px;
  background-color: ${props => props.isDark ? 'rgba(255, 59, 48, 0.15)' : 'rgba(255, 59, 48, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  i {
    font-size: 28px;
    color: #ff3b30;
  }
`;

// 模态框标题
const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  margin: 0 0 12px;
  text-align: center;
`;

// 模态框内容
const ModalContent = styled.div`
  margin-bottom: 24px;
  text-align: center;
`;

const ModalMessage = styled.p`
  color: ${props => props.isDark ? '#bbb' : '#666'};
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
`;

// 操作按钮
const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
  }
`;

const CancelButton = styled(Button)`
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.isDark ? '#bbb' : '#666'};
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'};
    color: ${props => props.isDark ? 'white' : 'black'};
  }
`;

const DeleteButton = styled(Button)`
  background: #ff3b30;
  color: white;
  border: none;
  
  &:hover {
    background: #ff2d20;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 59, 48, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// 删除确认模态框组件
const DeleteConfirmModal = ({ title, message, onConfirm, onCancel, isDark }) => {
  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ModalContainer
          isDark={isDark}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <WarningIcon isDark={isDark}>
            <i className="fas fa-exclamation-triangle"></i>
          </WarningIcon>
          
          <ModalTitle isDark={isDark}>{title}</ModalTitle>
          
          <ModalContent>
            <ModalMessage isDark={isDark}>{message}</ModalMessage>
          </ModalContent>
          
          <ModalActions>
            <CancelButton 
              type="button" 
              onClick={onCancel} 
              isDark={isDark}
            >
              取消
            </CancelButton>
            <DeleteButton 
              type="button" 
              onClick={onConfirm}
            >
              确认删除
            </DeleteButton>
          </ModalActions>
        </ModalContainer>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default DeleteConfirmModal; 