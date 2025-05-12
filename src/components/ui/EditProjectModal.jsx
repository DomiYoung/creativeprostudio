import React, { useState } from 'react';
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
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 24px;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
`;

// 模态框标题
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.isDark ? '#bbb' : '#666'};
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${props => props.isDark ? 'white' : 'black'};
  }
`;

// 表单元素
const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${props => props.isDark ? '#bbb' : '#555'};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.isDark ? '#7c65ff' : '#7c65ff'};
    box-shadow: 0 0 0 2px ${props => props.isDark ? 'rgba(124, 101, 255, 0.2)' : 'rgba(124, 101, 255, 0.2)'};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.isDark ? '#7c65ff' : '#7c65ff'};
    box-shadow: 0 0 0 2px ${props => props.isDark ? 'rgba(124, 101, 255, 0.2)' : 'rgba(124, 101, 255, 0.2)'};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.isDark ? '#7c65ff' : '#7c65ff'};
    box-shadow: 0 0 0 2px ${props => props.isDark ? 'rgba(124, 101, 255, 0.2)' : 'rgba(124, 101, 255, 0.2)'};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background: ${props => props.isDark ? 'rgba(124, 101, 255, 0.2)' : 'rgba(124, 101, 255, 0.1)'};
  color: ${props => props.isDark ? '#c4b8ff' : '#7c65ff'};
  border-radius: 6px;
  font-size: 14px;
  
  button {
    background: none;
    border: none;
    color: ${props => props.isDark ? '#c4b8ff' : '#7c65ff'};
    margin-left: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
    font-size: 14px;
    
    &:hover {
      color: ${props => props.isDark ? 'white' : '#5842e3'};
    }
  }
`;

const TagInput = styled.div`
  display: flex;
  margin-top: 10px;
  
  input {
    flex: 1;
    padding: 10px;
    border-radius: 8px 0 0 8px;
    border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
    color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
    font-size: 14px;
    
    &:focus {
      outline: none;
    }
  }
  
  button {
    padding: 10px 15px;
    background: ${props => props.isDark ? '#7c65ff' : '#7c65ff'};
    color: white;
    border: none;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    font-weight: 500;
    
    &:hover {
      background: ${props => props.isDark ? '#6a54e0' : '#6a54e0'};
    }
  }
`;

// 操作按钮
const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
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

const SaveButton = styled(Button)`
  background: linear-gradient(135deg, #7C65FF 0%, #9180FF 100%);
  color: white;
  border: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(124, 101, 255, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// 编辑项目模态框组件
const EditProjectModal = ({ project, onClose, onUpdate, isDark }) => {
  // 表单数据状态
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description || '');
  const [status, setStatus] = useState(project.status);
  const [deadline, setDeadline] = useState(project.deadline);
  const [tags, setTags] = useState(project.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isFeatured, setIsFeatured] = useState(project.isFeatured || false);
  
  // 添加标签
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };
  
  // 移除标签
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // 键盘输入标签
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  // 提交表单
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 更新项目数据
    const updatedProject = {
      ...project,
      title,
      description,
      status,
      deadline,
      tags,
      isFeatured
    };
    
    // 更新项目状态文本
    switch(status) {
      case 'inprogress':
        updatedProject.statusText = '进行中';
        break;
      case 'review':
        updatedProject.statusText = '审核中';
        break;
      case 'completed':
        updatedProject.statusText = '已完成';
        break;
      case 'archived':
        updatedProject.statusText = '已归档';
        break;
      default:
        updatedProject.statusText = '进行中';
    }
    
    onUpdate(updatedProject);
  };
  
  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ModalContainer
          isDark={isDark}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <ModalHeader>
            <ModalTitle isDark={isDark}>编辑项目</ModalTitle>
            <CloseButton isDark={isDark} onClick={onClose}>
              <i className="fas fa-times"></i>
            </CloseButton>
          </ModalHeader>
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label isDark={isDark}>项目名称</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                isDark={isDark}
                placeholder="输入项目名称"
              />
            </FormGroup>
            
            <FormGroup>
              <Label isDark={isDark}>项目描述</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isDark={isDark}
                placeholder="输入项目描述..."
              />
            </FormGroup>
            
            <FormGroup>
              <Label isDark={isDark}>项目状态</Label>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                isDark={isDark}
              >
                <option value="inprogress">进行中</option>
                <option value="review">审核中</option>
                <option value="completed">已完成</option>
                <option value="archived">已归档</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label isDark={isDark}>截止日期</Label>
              <Input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                isDark={isDark}
              />
            </FormGroup>
            
            <FormGroup>
              <Label isDark={isDark}>标签</Label>
              {tags.length > 0 && (
                <TagsContainer>
                  {tags.map((tag, index) => (
                    <Tag key={index} isDark={isDark}>
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)}>
                        <i className="fas fa-times"></i>
                      </button>
                    </Tag>
                  ))}
                </TagsContainer>
              )}
              
              <TagInput isDark={isDark}>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="添加标签..."
                />
                <button type="button" onClick={handleAddTag}>
                  添加
                </button>
              </TagInput>
            </FormGroup>
            
            <FormGroup>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  style={{ marginRight: 10 }}
                />
                <Label isDark={isDark} htmlFor="isFeatured" style={{ margin: 0 }}>
                  设为重点项目
                </Label>
              </div>
            </FormGroup>
            
            <ModalActions>
              <CancelButton type="button" onClick={onClose} isDark={isDark}>
                取消
              </CancelButton>
              <SaveButton type="submit">
                保存更改
              </SaveButton>
            </ModalActions>
          </form>
        </ModalContainer>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default EditProjectModal; 