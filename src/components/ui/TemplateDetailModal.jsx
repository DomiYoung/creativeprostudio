import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// 图标
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// 样式组件
const ModalContainer = styled.div`
  display: flex;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: ${props => props.isDark ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
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

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled(motion.button)`
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
    transform: translateY(-2px);
  }
  
  &.active {
    color: #FF9190;
    background: ${props => props.isDark ? 'rgba(255, 145, 144, 0.2)' : 'rgba(255, 145, 144, 0.1)'};
  }
`;

const PreviewContainer = styled.div`
  flex: 3;
  padding: 70px 24px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${props => props.isDark ? '#121212' : '#f5f5f7'};
  position: relative;
  
  @media (max-width: 992px) {
    height: 50vh;
  }
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: calc(90vh - 90px);
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const InfoContainer = styled.div`
  flex: 2;
  padding: 70px 24px 24px;
  overflow-y: auto;
  background: ${props => props.isDark ? '#1a1a1a' : 'white'};
  max-height: 90vh;
  
  @media (max-width: 992px) {
    max-height: none;
  }
`;

const TemplateTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.isDark ? 'white' : '#1d1d1f'};
`;

const TemplateCategory = styled.div`
  font-size: 14px;
  color: ${props => props.isDark ? '#aaa' : '#86868b'};
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 24px 0 12px 0;
  color: ${props => props.isDark ? 'white' : '#1d1d1f'};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    font-size: 18px;
    color: #FF9190;
  }
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const MetaItem = styled.div`
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
  padding: 12px;
  border-radius: 8px;
`;

const MetaLabel = styled.div`
  font-size: 12px;
  color: ${props => props.isDark ? '#888' : '#86868b'};
  margin-bottom: 4px;
`;

const MetaValue = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.isDark ? 'white' : '#1d1d1f'};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const Tag = styled.div`
  padding: 6px 12px;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'};
  border-radius: 20px;
  font-size: 13px;
  color: ${props => props.isDark ? '#ddd' : '#666'};
`;

const ActionButtonLarge = styled(motion.button)`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-bottom: 12px;
  transition: all 0.2s;
  
  &.primary {
    background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
    color: white;
    border: none;
    box-shadow: 0 4px 12px rgba(255, 145, 144, 0.25);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 145, 144, 0.35);
    }
  }
  
  &.secondary {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${props => props.isDark ? 'white' : '#1d1d1f'};
    border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    
    &:hover {
      background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'};
      transform: translateY(-2px);
    }
  }
`;

const RelatedTemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
  margin-top: 16px;
`;

const RelatedTemplateItem = styled(motion.div)`
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  
  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const RelatedTemplateName = styled.div`
  font-size: 12px;
  padding: 8px;
  color: ${props => props.isDark ? '#ddd' : '#666'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DescriptionText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${props => props.isDark ? '#ddd' : '#666'};
  margin-bottom: 24px;
`;

const PrimaryButton = styled(motion.button)`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-bottom: 12px;
  transition: all 0.2s;
  
  &.primary {
    background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
    color: white;
    border: none;
    box-shadow: 0 4px 12px rgba(255, 145, 144, 0.25);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 145, 144, 0.35);
    }
  }
`;

const SecondaryButton = styled(motion.button)`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-bottom: 12px;
  transition: all 0.2s;
  
  &.secondary {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${props => props.isDark ? 'white' : '#1d1d1f'};
    border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    
    &:hover {
      background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'};
      transform: translateY(-2px);
    }
  }
`;

const TemplateDetailModal = ({ template, onClose, onUse, onToggleFavorite, onEdit, relatedTemplates = [], isDark = false }) => {
  const navigate = useNavigate();
  
  const generateDescription = (template) => {
    return `${template.description || '无描述信息'}`;
  };
  
  const handleUseTemplate = () => {
    if (typeof onUse === 'function') {
      onUse(template);
    } else {
      // 默认行为
      navigate(`/creativeprostudio/batch-create?template=${template.id}`);
    }
  };
  
  const handleCloneTemplate = () => {
    console.log('Clone template:', template.id);
    // 实现克隆逻辑
  };
  
  const handleEditTemplate = () => {
    if (typeof onEdit === 'function') {
      onEdit(template);
    } else {
      // 默认行为
      navigate(`/creativeprostudio/canvas-editor?template=${template.id}`);
    }
  };
  
  // 生成模板元信息
  const metaInfo = [
    { label: '类型', value: template.type === 'horizontal' ? '横版' : template.type === 'vertical' ? '竖版' : '方形' },
    { label: '分辨率', value: template.resolution },
    { label: '收藏数', value: '42' }, // 假数据
    { label: '使用次数', value: '128' } // 假数据
  ];
  
  // 更新时间格式化
  const formattedDate = template.updated;
  
  return (
    <ModalContainer>
      <ModalHeader isDark={isDark}>
        <CloseButton 
          isDark={isDark}
          onClick={onClose}
          whileTap={{ scale: 0.95 }}
        >
          <CloseIcon />
        </CloseButton>
        <ActionButtons>
          <ActionButton 
            isDark={isDark}
            whileTap={{ scale: 0.95 }}
            className={template.isFavorite ? 'active' : ''}
            onClick={() => onToggleFavorite(template.id)}
            title={template.isFavorite ? '取消收藏' : '加入收藏'}
          >
            {template.isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </ActionButton>
          <ActionButton 
            isDark={isDark}
            whileTap={{ scale: 0.95 }}
            onClick={handleEditTemplate}
            title="编辑模板"
          >
            <EditIcon />
          </ActionButton>
          <ActionButton 
            isDark={isDark}
            whileTap={{ scale: 0.95 }}
            title="下载模板"
          >
            <DownloadIcon />
          </ActionButton>
          <ActionButton 
            isDark={isDark}
            whileTap={{ scale: 0.95 }}
            title="分享模板"
          >
            <ShareIcon />
          </ActionButton>
        </ActionButtons>
      </ModalHeader>
      
      <PreviewContainer isDark={isDark}>
        <PreviewImage src={template.thumbnail} alt={template.title} />
      </PreviewContainer>
      
      <InfoContainer isDark={isDark}>
        <TemplateTitle isDark={isDark}>{template.title}</TemplateTitle>
        <TemplateCategory isDark={isDark}>
          {template.category} - {template.collection} · 更新于{formattedDate}
        </TemplateCategory>
        
        <SectionTitle isDark={isDark}>
          <InsertLinkIcon /> 模板信息
        </SectionTitle>
        <MetaGrid>
          {metaInfo.map((item, index) => (
            <MetaItem key={index} isDark={isDark}>
              <MetaLabel isDark={isDark}>{item.label}</MetaLabel>
              <MetaValue isDark={isDark}>{item.value}</MetaValue>
            </MetaItem>
          ))}
        </MetaGrid>
        
        <SectionTitle isDark={isDark}>标签</SectionTitle>
        <TagsContainer>
          {template.tags.map((tag, index) => (
            <Tag key={index} isDark={isDark}>{tag}</Tag>
          ))}
        </TagsContainer>
        
        <SectionTitle isDark={isDark}>描述</SectionTitle>
        <DescriptionText isDark={isDark}>
          {generateDescription(template)}
        </DescriptionText>
        
        <PrimaryButton 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUseTemplate}
          isDark={isDark}
        >
          <i className="fas fa-play"></i> 使用此模板
        </PrimaryButton>
        
        <SecondaryButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleEditTemplate}
          isDark={isDark}
        >
          <EditIcon fontSize="small" /> 编辑模板
        </SecondaryButton>
        
        <SecondaryButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCloneTemplate}
          isDark={isDark}
        >
          <ContentCopyIcon fontSize="small" /> 复制此模板
        </SecondaryButton>
        
        {relatedTemplates.length > 0 && (
          <>
            <SectionTitle isDark={isDark}>相关模板</SectionTitle>
            <RelatedTemplatesGrid>
              {relatedTemplates.map(related => (
                <RelatedTemplateItem 
                  key={related.id}
                  isDark={isDark}
                  whileHover={{ y: -4 }}
                >
                  <img src={related.thumbnail} alt={related.title} />
                  <RelatedTemplateName isDark={isDark}>{related.title}</RelatedTemplateName>
                </RelatedTemplateItem>
              ))}
            </RelatedTemplatesGrid>
          </>
        )}
      </InfoContainer>
    </ModalContainer>
  );
};

export default TemplateDetailModal; 