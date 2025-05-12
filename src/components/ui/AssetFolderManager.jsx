import React, { useState } from 'react';
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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

// 模态框标题
const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  font-size: 20px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.isDark ? '#999' : '#666'};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${props => props.isDark ? '#fff' : '#000'};
  }
`;

// 模态框内容
const ModalBody = styled.div`
  padding: 24px;
`;

// 文件夹列表
const FolderList = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// 文件夹项
const FolderItem = styled.div`
  padding: 16px;
  border-radius: 12px;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.01)'};
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  }
`;

const FolderInfo = styled.div`
  display: flex;
  align-items: center;
`;

const FolderIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 20px;
  color: ${props => props.color || (props.isDark ? '#aaa' : '#666')};
`;

const FolderDetails = styled.div``;

const FolderName = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
`;

const FolderAssetCount = styled.div`
  font-size: 13px;
  color: ${props => props.isDark ? '#888' : '#666'};
`;

const FolderActions = styled.div`
  display: flex;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.isDark ? '#999' : '#666'};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${props => props.isDark ? '#fff' : '#000'};
  }
  
  &.delete:hover {
    background-color: rgba(255, 69, 58, 0.1);
    color: #FF453A;
  }
`;

// 新建文件夹表单
const CreateFolderForm = styled.div`
  margin-bottom: 24px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  font-size: 14px;
  margin-bottom: 16px;
  
  &:focus {
    outline: none;
    border-color: #FF9190;
  }
`;

const ColorCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid ${props => props.isSelected 
    ? '#FF9190' 
    : props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ColorPicker = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

// 批量移动素材表单
const BatchMoveForm = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  font-size: 14px;
  margin-bottom: 16px;
  
  &:focus {
    outline: none;
    border-color: #FF9190;
  }
`;

// 模态框底部
const ModalFooter = styled.div`
  padding: 24px;
  border-top: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
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
  
  ${props => props.primary 
    ? `
      background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
      color: white;
      border: none;
      box-shadow: 0 4px 12px rgba(255, 145, 144, 0.25);
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

// 颜色选项
const folderColors = [
  '#FF9190', '#FFB900', '#00C781', '#00B8D9', '#6554C0', 
  '#F87171', '#A78BFA', '#60A5FA', '#34D399', '#FBBF24'
];

const AssetFolderManager = ({ isOpen, onClose, selectedAssets = [] }) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 状态
  const [folders, setFolders] = useState([
    { id: 'project1', name: '项目A素材集', assetCount: 28, color: '#FF9190', assets: ['asset-1', 'asset-2', 'asset-3'] },
    { id: 'project2', name: '项目B素材集', assetCount: 15, color: '#00B8D9', assets: ['asset-4', 'asset-5'] },
    { id: 'project3', name: '夏季主题', assetCount: 42, color: '#00C781', assets: ['asset-6', 'asset-7', 'asset-8'] },
    { id: 'project4', name: '产品详情页', assetCount: 7, color: '#FFB900', assets: ['asset-9'] }
  ]);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedColor, setSelectedColor] = useState(folderColors[0]);
  const [targetFolder, setTargetFolder] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [duplicateCount, setDuplicateCount] = useState(0);
  const [newAssetCount, setNewAssetCount] = useState(0);
  const [addDuplicates, setAddDuplicates] = useState(false);
  
  // 处理新建文件夹
  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: `folder-${Date.now()}`,
        name: newFolderName,
        assetCount: 0,
        color: selectedColor,
        assets: []
      };
      
      setFolders(prev => [...prev, newFolder]);
      setNewFolderName('');
      setSelectedColor(folderColors[0]);
      setIsCreatingFolder(false);
    }
  };
  
  // 处理删除文件夹
  const handleDeleteFolder = (folderId) => {
    setFolders(prev => prev.filter(folder => folder.id !== folderId));
  };
  
  // 检查重复素材并显示确认对话框
  const checkDuplicatesAndConfirm = () => {
    if (selectedAssets.length > 0 && targetFolder) {
      const folder = folders.find(f => f.id === targetFolder);
      if (folder) {
        // 计算重复和新素材
        const duplicates = selectedAssets.filter(asset => folder.assets.includes(asset.id));
        const newAssets = selectedAssets.filter(asset => !folder.assets.includes(asset.id));
        
        setDuplicateCount(duplicates.length);
        setNewAssetCount(newAssets.length);
        setShowConfirmation(true);
      }
    }
  };
  
  // 处理批量移动素材
  const handleBatchMove = () => {
    if (selectedAssets.length > 0 && targetFolder) {
      const folder = folders.find(f => f.id === targetFolder);
      if (folder) {
        // 根据用户选择确定要添加的素材
        let assetsToAdd = [];
        if (addDuplicates) {
          // 添加所有素材，包括重复的
          assetsToAdd = selectedAssets.map(asset => asset.id);
        } else {
          // 只添加新素材，跳过重复的
          assetsToAdd = selectedAssets
            .filter(asset => !folder.assets.includes(asset.id))
            .map(asset => asset.id);
        }
        
        // 更新目标文件夹
        setFolders(prev => prev.map(f => {
          if (f.id === targetFolder) {
            return {
              ...f,
              assetCount: addDuplicates 
                ? f.assetCount + selectedAssets.length
                : f.assetCount + assetsToAdd.length,
              assets: addDuplicates
                ? [...f.assets, ...assetsToAdd] 
                : [...f.assets, ...assetsToAdd]
            };
          }
          return f;
        }));
        
        // 生成消息
        const message = addDuplicates
          ? `已将 ${selectedAssets.length} 个素材移至文件夹 "${folder.name}"`
          : `已将 ${assetsToAdd.length} 个新素材移至文件夹 "${folder.name}"，跳过 ${duplicateCount} 个已存在素材`;
        
        console.log(message);
        
        // 重置状态
        setShowConfirmation(false);
        setAddDuplicates(false);
        
        // 关闭模态框
        onClose();
      }
    }
  };
  
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
          <ModalHeader isDark={isDark}>
            <HeaderTitle isDark={isDark}>管理素材文件夹</HeaderTitle>
            <CloseButton isDark={isDark} onClick={onClose}>
              <i className="fas fa-times"></i>
            </CloseButton>
          </ModalHeader>
          
          <ModalBody>
            {!isCreatingFolder ? (
              <FooterButton
                isDark={isDark}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreatingFolder(true)}
              >
                <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
                新建文件夹
              </FooterButton>
            ) : (
              <CreateFolderForm>
                <FormLabel isDark={isDark}>文件夹名称</FormLabel>
                <FormInput 
                  isDark={isDark}
                  placeholder="输入文件夹名称..."
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
                
                <FormLabel isDark={isDark}>选择颜色标签</FormLabel>
                <ColorPicker>
                  {folderColors.map(color => (
                    <ColorCircle 
                      key={color}
                      color={color}
                      isSelected={color === selectedColor}
                      isDark={isDark}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </ColorPicker>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <FooterButton
                    primary
                    isDark={isDark}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateFolder}
                    disabled={!newFolderName.trim()}
                  >
                    创建
                  </FooterButton>
                  <FooterButton
                    isDark={isDark}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsCreatingFolder(false);
                      setNewFolderName('');
                    }}
                  >
                    取消
                  </FooterButton>
                </div>
              </CreateFolderForm>
            )}
            
            <FolderList>
              {folders.map(folder => (
                <FolderItem key={folder.id} isDark={isDark}>
                  <FolderInfo>
                    <FolderIcon isDark={isDark} color={folder.color}>
                      <i className="fas fa-folder"></i>
                    </FolderIcon>
                    <FolderDetails>
                      <FolderName isDark={isDark}>{folder.name}</FolderName>
                      <FolderAssetCount isDark={isDark}>
                        {folder.assetCount} 个素材
                      </FolderAssetCount>
                    </FolderDetails>
                  </FolderInfo>
                  <FolderActions>
                    <ActionButton 
                      isDark={isDark}
                      onClick={() => console.log(`查看文件夹 ${folder.name}`)}
                    >
                      <i className="fas fa-eye"></i>
                    </ActionButton>
                    <ActionButton 
                      isDark={isDark}
                      className="delete"
                      onClick={() => handleDeleteFolder(folder.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </ActionButton>
                  </FolderActions>
                </FolderItem>
              ))}
            </FolderList>
            
            {selectedAssets.length > 0 && !showConfirmation && (
              <BatchMoveForm isDark={isDark}>
                <FormLabel isDark={isDark}>
                  批量移动 {selectedAssets.length} 个所选素材到文件夹
                </FormLabel>
                <FormSelect 
                  isDark={isDark}
                  value={targetFolder}
                  onChange={(e) => setTargetFolder(e.target.value)}
                >
                  <option value="">选择目标文件夹</option>
                  {folders.map(folder => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </FormSelect>
                
                <FooterButton
                  primary
                  isDark={isDark}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={checkDuplicatesAndConfirm}
                  disabled={!targetFolder}
                >
                  <i className="fas fa-file-export" style={{ marginRight: '8px' }}></i>
                  移动至此文件夹
                </FooterButton>
              </BatchMoveForm>
            )}

            {showConfirmation && (
              <BatchMoveForm isDark={isDark}>
                <div style={{ 
                  padding: '16px', 
                  borderRadius: '8px', 
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                  marginBottom: '16px'
                }}>
                  <div style={{ 
                    fontSize: '15px', 
                    fontWeight: '500', 
                    marginBottom: '12px',
                    color: isDark ? '#f5f5f5' : '#1d1d1f'
                  }}>
                    素材添加确认
                  </div>
                  
                  <div style={{ 
                    fontSize: '14px', 
                    color: isDark ? '#aaa' : '#666',
                    marginBottom: '8px'
                  }}>
                    • {newAssetCount} 个新素材将被添加到文件夹
                  </div>
                  
                  {duplicateCount > 0 && (
                    <div style={{ 
                      fontSize: '14px', 
                      color: isDark ? '#aaa' : '#666',
                      marginBottom: '16px'
                    }}>
                      • {duplicateCount} 个素材已存在于所选文件夹
                    </div>
                  )}
                  
                  {duplicateCount > 0 && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <input 
                        type="checkbox" 
                        id="addDuplicates" 
                        checked={addDuplicates}
                        onChange={() => setAddDuplicates(!addDuplicates)}
                      />
                      <label 
                        htmlFor="addDuplicates"
                        style={{ 
                          fontSize: '14px', 
                          color: isDark ? '#f5f5f5' : '#1d1d1f',
                          cursor: 'pointer'
                        }}
                      >
                        添加所有素材（包括已存在的）
                      </label>
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <FooterButton
                    primary
                    isDark={isDark}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBatchMove}
                  >
                    确认添加
                  </FooterButton>
                  <FooterButton
                    isDark={isDark}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowConfirmation(false);
                      setAddDuplicates(false);
                    }}
                  >
                    取消
                  </FooterButton>
                </div>
              </BatchMoveForm>
            )}
          </ModalBody>
          
          <ModalFooter isDark={isDark}>
            <FooterButton
              isDark={isDark}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              关闭
            </FooterButton>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default AssetFolderManager; 