import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useTheme } from '../../design-system';

// MUI图标
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// 模态框覆盖层
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
`;

// 模态框容器
const ModalContainer = styled(motion.div)`
  background-color: ${props => props.isDark ? '#1e1e1e' : 'white'};
  border-radius: 20px;
  width: 100%;
  max-width: 420px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

// 模态框头部
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
`;

// 模态框标题
const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
`;

// 关闭按钮
const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'};
  }
`;

// 模态框内容
const ModalContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// 警告图标容器
const WarningIconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: ${props => props.isDark ? 'rgba(255, 59, 48, 0.1)' : 'rgba(255, 59, 48, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: #FF3B30; // SF Red
`;

// 警告消息
const WarningMessage = styled.p`
  font-size: 15px;
  line-height: 1.5;
  color: ${props => props.isDark ? '#bbb' : '#666'};
  margin: 0 0 16px;
  max-width: 340px;
`;

// 模态框底部
const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 24px 24px;
  gap: 12px;
`;

// 取消按钮
const CancelButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'};
  }
`;

// 确认按钮
const ConfirmButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  background: #FF3B30; // SF Red
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #E02D22;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(255, 59, 48, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = '删除确认', 
  message = '确定要删除此项目吗？此操作不可撤销。',
  confirmText = '删除',
  cancelText = '取消'
}) => {
  const { isDark } = useTheme();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            isDark={isDark}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            <ModalHeader isDark={isDark}>
              <ModalTitle isDark={isDark}>{title}</ModalTitle>
              <CloseButton isDark={isDark} onClick={onClose}>
                <CloseIcon fontSize="small" />
              </CloseButton>
            </ModalHeader>
            
            <ModalContent>
              <WarningIconContainer isDark={isDark}>
                <WarningAmberIcon style={{ fontSize: 32 }} />
              </WarningIconContainer>
              <WarningMessage isDark={isDark}>{message}</WarningMessage>
            </ModalContent>
            
            <ModalFooter>
              <CancelButton isDark={isDark} onClick={onClose}>
                {cancelText}
              </CancelButton>
              <ConfirmButton onClick={onConfirm}>
                {confirmText}
              </ConfirmButton>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal; 