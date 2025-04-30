import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

// 图标
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CheckIcon from '@mui/icons-material/Check';
import FolderIcon from '@mui/icons-material/Folder';
import PaletteIcon from '@mui/icons-material/Palette';

// 样式组件
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
`;

const ModalContent = styled(motion.div)`
  background-color: ${props => props.isDark ? '#1a1a1a' : 'white'};
  border-radius: 16px;
  width: 100%;
  max-width: 540px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.isDark ? 'white' : '#1d1d1f'};
  display: flex;
  align-items: center;
  gap: 12px;
  
  svg {
    color: #FF9190;
  }
`;

const CloseButton = styled(motion.button)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.isDark ? 'white' : '#333'};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const ModalBody = styled.div`
  padding: 0;
  overflow-y: auto;
  flex: 1;
`;

const AddButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 145, 144, 0.25);
  margin: 20px 24px;
  width: calc(100% - 48px);
  
  svg {
    margin-right: 8px;
  }
`;

const CollectionList = styled.div`
  margin: 0;
  padding: 0;
`;

const CollectionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 24px;
  border-bottom: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.isDark ? 'white' : '#1d1d1f'};
  position: relative;
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
  }
  
  ${props => props.isEditMode && `
    background: ${props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
    padding-top: 16px;
    padding-bottom: 16px;
  `}
`;

const DragHandle = styled.div`
  cursor: grab;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)'};
  
  &:active {
    cursor: grabbing;
  }
`;

const FolderIconStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: ${props => props.color || '#ccc'};
  margin-right: 12px;
  
  svg {
    font-size: 16px;
    color: ${props => {
      const rgb = props.color || '#ccc';
      // 简单判断是否为深色，决定图标是白色还是黑色
      const isLight = rgb.includes('FF91') || rgb.includes('#FF') || rgb.includes('rgb(255');
      return isLight ? 'rgba(0,0,0,0.7)' : 'white';
    }};
  }
`;

const CollectionName = styled.div`
  flex: 1;
  font-size: 14px;
`;

const CollectionCount = styled.div`
  font-size: 13px;
  color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
  margin-right: 16px;
`;

const ActionIconsContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionIcon = styled(motion.button)`
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${props => props.isDark ? 'white' : 'black'};
  }
  
  &.delete {
    &:hover {
      color: #f44336;
    }
  }
`;

const EditForm = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 12px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  color: ${props => props.isDark ? 'white' : '#1d1d1f'};
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #FF9190;
  }
`;

const ColorPickerButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  background: ${props => props.color || '#ccc'};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #FF9190;
  }
`;

const ColorPickerDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  margin-top: 8px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.isDark ? '#2a2a2a' : 'white'};
  border-radius: 12px;
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(5, 30px);
  gap: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 10;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const ColorOption = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  background: ${props => props.color};
  cursor: pointer;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #FF9190;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const NoCollectionsMessage = styled.div`
  padding: 40px 24px;
  text-align: center;
  color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
  
  p {
    margin-bottom: 20px;
    font-size: 14px;
  }
`;

// 颜色选项
const colorOptions = [
  '#FF9190', '#FF6B6B', '#FF8A65', '#FFBB86', '#FFD166',
  '#06D6A0', '#26C6DA', '#42A5F5', '#5E81AC', '#81A1C1',
  '#7E57C2', '#9775FA', '#B39DDB', '#F06292', '#EC407A'
];

const TemplateManagerModal = ({ isOpen, onClose, collections = [], onAdd, onEdit, onDelete, onReorder, isDark = false }) => {
  const [editingId, setEditingId] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionColor, setNewCollectionColor] = useState('#FF9190');
  const [editingCollection, setEditingCollection] = useState(null);
  
  // 开始创建新集合
  const handleAddCollection = () => {
    setEditingId('new');
    setNewCollectionName('');
    setNewCollectionColor('#FF9190');
  };
  
  // 开始编辑集合
  const handleEditCollection = (collection) => {
    setEditingId(collection.id);
    setNewCollectionName(collection.name);
    setNewCollectionColor(collection.color);
    setEditingCollection(collection);
  };
  
  // 保存集合
  const handleSaveCollection = () => {
    if (!newCollectionName.trim()) return;
    
    if (editingId === 'new') {
      // 创建新集合
      onAdd && onAdd({
        name: newCollectionName,
        color: newCollectionColor
      });
    } else {
      // 更新现有集合
      onEdit && onEdit({
        ...editingCollection,
        id: editingId,
        name: newCollectionName,
        color: newCollectionColor
      });
    }
    
    setEditingId(null);
    setShowColorPicker(false);
  };
  
  // 取消编辑
  const handleCancelEdit = () => {
    setEditingId(null);
    setShowColorPicker(false);
  };
  
  // 选择颜色
  const handleSelectColor = (color) => {
    setNewCollectionColor(color);
    setShowColorPicker(false);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            isDark={isDark}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <ModalHeader isDark={isDark}>
              <ModalTitle isDark={isDark}>
                <CreateNewFolderIcon /> 管理模板集合
              </ModalTitle>
              <CloseButton 
                isDark={isDark}
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <CloseIcon />
              </CloseButton>
            </ModalHeader>
            
            <ModalBody>
              {collections.length === 0 ? (
                <NoCollectionsMessage isDark={isDark}>
                  <p>暂无模板集合，创建一个开始管理模板</p>
                  <AddButton
                    whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(255, 145, 144, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddCollection}
                  >
                    <AddIcon /> 创建模板集合
                  </AddButton>
                </NoCollectionsMessage>
              ) : (
                <>
                  <AddButton
                    whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(255, 145, 144, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddCollection}
                  >
                    <AddIcon /> 创建模板集合
                  </AddButton>
                  
                  <CollectionList>
                    {editingId === 'new' && (
                      <CollectionItem isDark={isDark} isEditMode={true}>
                        <DragHandle isDark={isDark}>
                          <DragIndicatorIcon />
                        </DragHandle>
                        
                        <FolderIconStyled color={newCollectionColor}>
                          <FolderIcon />
                        </FolderIconStyled>
                        
                        <EditForm>
                          <Input 
                            isDark={isDark}
                            value={newCollectionName}
                            onChange={(e) => setNewCollectionName(e.target.value)}
                            placeholder="输入集合名称"
                            autoFocus
                          />
                          
                          <div style={{ position: 'relative' }}>
                            <ColorPickerButton 
                              isDark={isDark}
                              color={newCollectionColor}
                              onClick={() => setShowColorPicker(!showColorPicker)}
                            >
                              <PaletteIcon style={{ fontSize: '16px', color: 'white', opacity: 0.8 }} />
                            </ColorPickerButton>
                            
                            <AnimatePresence>
                              {showColorPicker && (
                                <ColorPickerDropdown
                                  isDark={isDark}
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                >
                                  {colorOptions.map(color => (
                                    <ColorOption 
                                      key={color}
                                      color={color}
                                      isDark={isDark}
                                      onClick={() => handleSelectColor(color)}
                                    />
                                  ))}
                                </ColorPickerDropdown>
                              )}
                            </AnimatePresence>
                          </div>
                        </EditForm>
                        
                        <ActionButtons>
                          <ActionIcon 
                            isDark={isDark}
                            onClick={handleCancelEdit}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <CloseIcon />
                          </ActionIcon>
                          <ActionIcon 
                            isDark={isDark}
                            onClick={handleSaveCollection}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <CheckIcon />
                          </ActionIcon>
                        </ActionButtons>
                      </CollectionItem>
                    )}
                    
                    {collections.map(collection => (
                      <CollectionItem 
                        key={collection.id} 
                        isDark={isDark}
                        isEditMode={editingId === collection.id}
                      >
                        <DragHandle isDark={isDark}>
                          <DragIndicatorIcon />
                        </DragHandle>
                        
                        <FolderIconStyled color={collection.color}>
                          <FolderIcon />
                        </FolderIconStyled>
                        
                        {editingId === collection.id ? (
                          <EditForm>
                            <Input 
                              isDark={isDark}
                              value={newCollectionName}
                              onChange={(e) => setNewCollectionName(e.target.value)}
                              placeholder="输入集合名称"
                              autoFocus
                            />
                            
                            <div style={{ position: 'relative' }}>
                              <ColorPickerButton 
                                isDark={isDark}
                                color={newCollectionColor}
                                onClick={() => setShowColorPicker(!showColorPicker)}
                              >
                                <PaletteIcon style={{ fontSize: '16px', color: 'white', opacity: 0.8 }} />
                              </ColorPickerButton>
                              
                              <AnimatePresence>
                                {showColorPicker && (
                                  <ColorPickerDropdown
                                    isDark={isDark}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                  >
                                    {colorOptions.map(color => (
                                      <ColorOption 
                                        key={color}
                                        color={color}
                                        isDark={isDark}
                                        onClick={() => handleSelectColor(color)}
                                      />
                                    ))}
                                  </ColorPickerDropdown>
                                )}
                              </AnimatePresence>
                            </div>
                          </EditForm>
                        ) : (
                          <>
                            <CollectionName>{collection.name}</CollectionName>
                            <CollectionCount isDark={isDark}>
                              {collection.count || 0} 个模板
                            </CollectionCount>
                          </>
                        )}
                        
                        {editingId === collection.id ? (
                          <ActionButtons>
                            <ActionIcon 
                              isDark={isDark}
                              onClick={handleCancelEdit}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <CloseIcon />
                            </ActionIcon>
                            <ActionIcon 
                              isDark={isDark}
                              onClick={handleSaveCollection}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <CheckIcon />
                            </ActionIcon>
                          </ActionButtons>
                        ) : (
                          <ActionIconsContainer>
                            <ActionIcon 
                              isDark={isDark}
                              onClick={() => handleEditCollection(collection)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <EditIcon />
                            </ActionIcon>
                            {collection.id !== 'all' && (
                              <ActionIcon 
                                isDark={isDark}
                                className="delete"
                                onClick={() => onDelete && onDelete(collection.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <DeleteOutlineIcon />
                              </ActionIcon>
                            )}
                          </ActionIconsContainer>
                        )}
                      </CollectionItem>
                    ))}
                  </CollectionList>
                </>
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default TemplateManagerModal; 