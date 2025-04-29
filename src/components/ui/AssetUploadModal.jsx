import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useTheme } from '../../design-system';

// 品牌列表
const BRANDS = [
  { id: 'qc', name: '且初' },
  { id: 'ddg', name: 'ddg' }, 
  { id: 'asz', name: '安修泽' },
  { id: 'oz', name: '奥札' },
  { id: 'abl', name: '艾蓓拉' },
  { id: 'sts', name: '三蒂丝' }
];

// 素材类型
const MATERIAL_TYPES = [
  { id: 'background', name: '背景图' },
  { id: 'product', name: '产品图' },
  { id: 'icon', name: 'icon' },
  { id: 'other', name: '其他图片' }
];

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
  max-width: 800px;
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

// 上传区域
const UploadZone = styled.div`
  border: 2px dashed ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  margin-bottom: 24px;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.01)'};
  transition: all 0.2s;
  
  ${props => props.isDragActive && `
    border-color: #FF9190;
    background-color: ${props.isDark ? 'rgba(255, 145, 144, 0.1)' : 'rgba(255, 145, 144, 0.05)'};
  `}
`;

const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  
  ${props => props.isDragActive && `
    color: #FF9190;
  `}
`;

const UploadText = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  font-weight: 500;
`;

const UploadSubtext = styled.div`
  font-size: 14px;
  color: ${props => props.isDark ? '#999' : '#666'};
  margin-bottom: 16px;
`;

const BrowseButton = styled(motion.button)`
  background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 145, 144, 0.25);
`;

// 已选文件列表
const FileList = styled.div`
  margin-bottom: 24px;
`;

const FileListHeader = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FileListCount = styled.span`
  font-size: 14px;
  color: ${props => props.isDark ? '#999' : '#666'};
  font-weight: normal;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
`;

const FilePreview = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${props => props.isDark ? '#111' : '#f5f5f5'};
  margin-right: 12px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  i {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: ${props => props.isDark ? '#666' : '#999'};
    font-size: 20px;
  }
`;

const FileInfo = styled.div`
  flex: 1;
`;

const FileName = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
`;

const FileSize = styled.div`
  font-size: 12px;
  color: ${props => props.isDark ? '#999' : '#666'};
`;

const FileActions = styled.div`
  display: flex;
  gap: 8px;
`;

const FileActionButton = styled.button`
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

// 元数据表单
const MetadataForm = styled.div`
  margin-bottom: 24px;
`;

const FormTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #FF9190;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #FF9190;
  }
`;

// 自定义文件夹区域
const FolderSection = styled.div`
  margin-bottom: 24px;
`;

const FolderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const FolderItem = styled.div`
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => props.isSelected 
    ? props.isDark ? 'rgba(255, 145, 144, 0.2)' : 'rgba(255, 145, 144, 0.1)'
    : props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
  };
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${props => props.isSelected 
    ? '#FF9190' 
    : props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
  };
  
  &:hover {
    background-color: ${props => props.isSelected 
      ? props.isDark ? 'rgba(255, 145, 144, 0.25)' : 'rgba(255, 145, 144, 0.15)'
      : props.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
    };
  }
`;

const FolderIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
  color: ${props => props.isSelected ? '#FF9190' : props.isDark ? '#999' : '#666'};
`;

const FolderName = styled.div`
  font-size: 14px;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CreateFolderButton = styled.button`
  background: none;
  border: 1px dashed ${props => props.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  color: ${props => props.isDark ? '#999' : '#666'};
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
    border-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
  }
`;

const FolderForm = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
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

const AssetUploadModal = ({ isOpen, onClose }) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const fileInputRef = useRef(null);
  
  // 状态管理
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [brand, setBrand] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [customName, setCustomName] = useState('');
  const [folders, setFolders] = useState([
    { id: 'project1', name: '项目A素材集' },
    { id: 'project2', name: '项目B素材集' },
    { id: 'project3', name: '夏季主题' }
  ]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  
  // 处理拖拽
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragActive) setIsDragActive(true);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  // 处理文件
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(file => {
      // 生成预览URL
      const previewUrl = URL.createObjectURL(file);
      
      return {
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        previewUrl
      };
    });
    
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };
  
  // 格式化文件大小
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // 移除文件
  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      // 释放预览URL
      URL.revokeObjectURL(newFiles[index].previewUrl);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };
  
  // 点击浏览按钮
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };
  
  // 创建新文件夹
  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const folderId = `folder-${Date.now()}`;
      setFolders(prev => [...prev, { id: folderId, name: newFolderName }]);
      setSelectedFolder(folderId);
      setIsCreatingFolder(false);
      setNewFolderName('');
    }
  };
  
  // 上传素材
  const handleUpload = () => {
    // 构建上传数据
    const formData = new FormData();
    selectedFiles.forEach(fileData => {
      formData.append('files', fileData.file);
    });
    
    // 添加元数据
    const metadata = {
      brand,
      materialType,
      customName: customName || undefined,
      folderId: selectedFolder || undefined,
      copyright: 'domiyoung__' // 添加版权
    };
    
    formData.append('metadata', JSON.stringify(metadata));
    
    // 执行上传
    console.log('上传素材', formData);
    
    // 模拟上传成功
    setTimeout(() => {
      onClose();
    }, 1000);
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
            <HeaderTitle isDark={isDark}>上传素材</HeaderTitle>
            <CloseButton isDark={isDark} onClick={onClose}>
              <i className="fas fa-times"></i>
            </CloseButton>
          </ModalHeader>
          
          <ModalBody>
            {/* 拖拽上传区域 */}
            <UploadZone 
              isDark={isDark}
              isDragActive={isDragActive}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <UploadIcon isDark={isDark} isDragActive={isDragActive}>
                <i className="fas fa-cloud-upload-alt"></i>
              </UploadIcon>
              <UploadText isDark={isDark}>
                {isDragActive ? '释放鼠标上传素材' : '拖拽素材到此区域上传'}
              </UploadText>
              <UploadSubtext isDark={isDark}>
                支持 JPG、PNG、SVG、GIF 等常用格式，单文件最大 10MB
              </UploadSubtext>
              <BrowseButton
                whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(255, 145, 144, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBrowseClick}
              >
                浏览文件
              </BrowseButton>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </UploadZone>
            
            {/* 已选文件列表 */}
            {selectedFiles.length > 0 && (
              <FileList>
                <FileListHeader isDark={isDark}>
                  已选素材
                  <FileListCount>{selectedFiles.length} 个文件</FileListCount>
                </FileListHeader>
                
                {selectedFiles.map((file, index) => (
                  <FileItem key={index} isDark={isDark}>
                    <FilePreview isDark={isDark}>
                      {file.type.startsWith('image/') ? (
                        <img src={file.previewUrl} alt={file.name} />
                      ) : (
                        <i className="fas fa-file"></i>
                      )}
                    </FilePreview>
                    <FileInfo>
                      <FileName isDark={isDark}>{file.name}</FileName>
                      <FileSize isDark={isDark}>{file.size}</FileSize>
                    </FileInfo>
                    <FileActions>
                      <FileActionButton 
                        isDark={isDark}
                        onClick={() => handleRemoveFile(index)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </FileActionButton>
                    </FileActions>
                  </FileItem>
                ))}
              </FileList>
            )}
            
            {/* 元数据表单 */}
            <MetadataForm>
              <FormTitle isDark={isDark}>素材信息</FormTitle>
              <FormGrid>
                <FormGroup>
                  <FormLabel isDark={isDark}>品牌</FormLabel>
                  <FormSelect 
                    isDark={isDark} 
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option value="">选择品牌</option>
                    {BRANDS.map(brand => (
                      <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel isDark={isDark}>素材类型</FormLabel>
                  <FormSelect 
                    isDark={isDark}
                    value={materialType}
                    onChange={(e) => setMaterialType(e.target.value)}
                  >
                    <option value="">选择类型</option>
                    {MATERIAL_TYPES.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </FormSelect>
                </FormGroup>
              </FormGrid>
              <FormGroup>
                <FormLabel isDark={isDark}>自定义名称 (可选)</FormLabel>
                <FormInput 
                  isDark={isDark}
                  placeholder="为批量素材添加统一名称"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                />
              </FormGroup>
            </MetadataForm>
            
            {/* 文件夹选择 */}
            <FolderSection>
              <FormTitle isDark={isDark}>项目文件夹</FormTitle>
              <UploadSubtext isDark={isDark}>
                将素材添加到项目文件夹，便于在设计时快速查找
              </UploadSubtext>
              
              <FolderGrid>
                {folders.map(folder => (
                  <FolderItem 
                    key={folder.id}
                    isDark={isDark}
                    isSelected={selectedFolder === folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                  >
                    <FolderIcon isDark={isDark} isSelected={selectedFolder === folder.id}>
                      <i className="fas fa-folder"></i>
                    </FolderIcon>
                    <FolderName isDark={isDark}>{folder.name}</FolderName>
                  </FolderItem>
                ))}
                
                {!isCreatingFolder && (
                  <CreateFolderButton 
                    isDark={isDark}
                    onClick={() => setIsCreatingFolder(true)}
                  >
                    <FolderIcon isDark={isDark}>
                      <i className="fas fa-plus"></i>
                    </FolderIcon>
                    <FolderName isDark={isDark}>新建文件夹</FolderName>
                  </CreateFolderButton>
                )}
              </FolderGrid>
              
              {isCreatingFolder && (
                <FolderForm>
                  <FormInput 
                    isDark={isDark}
                    placeholder="输入文件夹名称"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
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
                </FolderForm>
              )}
            </FolderSection>
          </ModalBody>
          
          <ModalFooter isDark={isDark}>
            <FooterButton
              isDark={isDark}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              取消
            </FooterButton>
            <FooterButton
              primary
              isDark={isDark}
              whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(255, 145, 144, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || !brand || !materialType}
            >
              上传素材
            </FooterButton>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default AssetUploadModal; 