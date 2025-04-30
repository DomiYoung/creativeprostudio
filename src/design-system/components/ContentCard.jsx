import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../index';

// 卡片容器
const CardContainer = styled(motion.div)`
  background-color: ${props => props.isDark ? '#1e1e1e' : 'white'};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, ${props => props.isDark ? '0.25' : '0.06'});
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, ${props => props.isDark ? '0.3' : '0.1'});
  }
`;

// 卡片预览
const CardPreview = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: ${props => props.aspectRatio || '16/9'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.33, 1, 0.68, 1);
  }
  
  ${CardContainer}:hover & img {
    transform: scale(1.05);
  }
  
  &::after {
    content: '编辑设计';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, rgba(255, 145, 144, 0.85), rgba(255, 105, 104, 0.85));
    color: white;
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 15px;
    font-weight: 600;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 2;
    box-shadow: 0 4px 15px rgba(255, 145, 144, 0.3);
    letter-spacing: 0.5px;
  }
  
  &:hover::after {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.15);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

// 卡片状态标签
const CardStatus = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 7px 14px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  
  ${props => {
    const statusColors = {
      completed: {
        bg: 'rgba(39, 174, 96, 0.2)',
        color: '#27AE60',
        border: 'rgba(39, 174, 96, 0.3)'
      },
      'in-progress': {
        bg: 'rgba(52, 152, 219, 0.2)',
        color: '#3498DB',
        border: 'rgba(52, 152, 219, 0.3)'
      },
      review: {
        bg: 'rgba(243, 156, 18, 0.2)',
        color: '#F39C12',
        border: 'rgba(243, 156, 18, 0.3)'
      },
      new: {
        bg: 'rgba(142, 68, 173, 0.2)',
        color: '#8E44AD',
        border: 'rgba(142, 68, 173, 0.3)'
      },
      featured: {
        bg: 'rgba(255, 145, 144, 0.2)',
        color: '#FF9190',
        border: 'rgba(255, 145, 144, 0.3)'
      }
    };
    
    const status = statusColors[props.status] || statusColors.new;
    
    return `
      background-color: ${status.bg};
      color: ${status.color};
      border: 1px solid ${status.border};
    `;
  }}
`;

// 收藏图标
const FavoriteIcon = styled(motion.div)`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2;
  color: ${props => props.isFavorite ? '#FF9090' : '#aaa'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.15);
    background-color: white;
  }
  
  i {
    font-size: 16px;
  }
`;

// 卡片内容
const CardContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// 卡片标题
const CardTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 14px;
  color: ${props => props.isDark ? '#f5f5f5' : '#212121'};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
  letter-spacing: 0.2px;
`;

// 卡片元数据
const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: ${props => props.hasProgress ? '12px' : '0'};
  gap: 8px;
`;

// 元数据项
const MetaItem = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.isDark ? '#aaa' : '#777'};
  font-size: 13px;
  
  i {
    margin-right: 6px;
    font-size: 14px;
    color: ${props => props.isDark ? '#888' : '#999'};
  }
`;

// 进度条
const ProgressBar = styled.div`
  height: 8px;
  background-color: ${props => props.isDark ? '#333' : '#f0f0f0'};
  border-radius: 4px;
  margin-bottom: 16px;
  overflow: hidden;
  transition: background-color 0.3s ease;
`;

// 进度填充
const ProgressFill = styled(motion.div)`
  height: 100%;
  width: ${props => props.progress || '0%'};
  background: linear-gradient(to right, #FF9190, #FF7A7A);
  border-radius: 4px;
`;

// 卡片标签
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
  padding-top: 12px;
`;

// 标签
const Tag = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
  color: ${props => props.isDark ? '#ccc' : '#666'};
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
  
  &:hover {
    transform: translateY(-2px);
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)'};
  }
`;

// 贡献者
const ContributorsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  padding-top: 12px;
`;

// 贡献者图标
const Contributor = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: white;
  margin-right: -10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: ${props => props.index || 1};
  border: 2px solid ${props => props.isDark ? '#1e1e1e' : 'white'};
  background-color: ${props => props.isAdd 
    ? (props.isDark ? '#333' : '#F0F0F0') 
    : props.color || '#97C1FF'};
  color: ${props => props.isAdd 
    ? (props.isDark ? '#aaa' : '#666') 
    : 'white'};
  transition: border-color 0.3s ease;
`;

// 选择指示器
const SelectIndicator = styled(motion.div)`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: ${props => props.isSelected ? '#FF9190' : 'transparent'};
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  
  i {
    font-size: 12px;
    opacity: ${props => props.isSelected ? 1 : 0};
  }
`;

// 文件夹标签
const FolderTags = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  display: flex;
  gap: 4px;
  z-index: 2;
`;

const FolderTag = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: relative;
  
  &:hover::after {
    content: "${props => props.name}";
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
  }
`;

// 删除按钮
const DeleteButton = styled(motion.div)`
  position: absolute;
  top: 12px;
  right: ${props => props.showSelectIndicator ? '46px' : '12px'};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 87, 87, 0.9);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
  
  i {
    font-size: 14px;
  }
  
  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

// 主组件
const ContentCard = ({ 
  image,
  title,
  status,
  statusText,
  progress,
  isFavorite,
  isSelected,
  showSelectIndicator,
  metaItems = [],
  tags = [],
  contributors = [],
  contributorColors = {},
  aspectRatio = '16/9',
  onClick,
  onSelect,
  folders = [],
  onDelete,
  showDeleteButton = true,
  selectable = false,
  selected = false,
  onEditDesign,
}) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 阻止删除按钮点击事件冒泡到卡片
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(e);
    }
  };
  
  // 处理卡片点击
  const handleCardClick = (e) => {
    if (selectable && onSelect) {
      onSelect(e);
    } else if (onClick) {
      onClick(e);
    }
  };
  
  // 处理图片点击（直接进入编辑器）
  const handleImageClick = (e) => {
    e.stopPropagation();
    if (onEditDesign) {
      onEditDesign(e);
    } else if (onClick) {
      // 如果没有提供编辑器回调，则默认使用onClick
      onClick(e);
    }
  };
  
  return (
    <CardContainer 
      isDark={isDark}
      onClick={handleCardClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <CardPreview 
        aspectRatio={aspectRatio}
        onClick={handleImageClick}
      >
        <motion.img 
          src={image} 
          alt={title}
          whileHover={{ scale: 1.08, rotate: -1 }}
          transition={{ duration: 0.4 }}
        />
        
        {status && statusText && !showSelectIndicator && (
          <CardStatus status={status}>
            {statusText}
          </CardStatus>
        )}
        
        {showSelectIndicator && (
          <SelectIndicator 
            isSelected={isSelected}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <i className={`fas ${isSelected ? 'fa-check' : 'fa-plus'}`}></i>
          </SelectIndicator>
        )}
        
        {showDeleteButton && onDelete && (
          <DeleteButton 
            showSelectIndicator={showSelectIndicator}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDeleteClick}
          >
            <i className="fas fa-trash-alt"></i>
          </DeleteButton>
        )}
        
        <FavoriteIcon 
          isFavorite={isFavorite}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <i className={`fas ${isFavorite ? 'fa-star' : 'fa-star'}`}></i>
        </FavoriteIcon>
        
        {/* 文件夹标签 */}
        {folders.length > 0 && (
          <FolderTags>
            {folders.slice(0, 3).map((folder, index) => (
              <FolderTag 
                key={index}
                color={folder.color}
                name={folder.name}
                onClick={(e) => e.stopPropagation()}
              />
            ))}
            {folders.length > 3 && (
              <FolderTag 
                color="#888"
                name={`还有 ${folders.length - 3} 个文件夹`}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </FolderTags>
        )}
      </CardPreview>
      
      <CardContent>
        <CardTitle isDark={isDark}>{title}</CardTitle>
        
        {metaItems.length > 0 && (
          <CardMeta hasProgress={progress !== undefined}>
            {metaItems.map((item, index) => (
              <MetaItem key={index} isDark={isDark}>
                {item.icon && <i className={`fas ${item.icon}`}></i>}
                {item.text}
              </MetaItem>
            ))}
          </CardMeta>
        )}
        
        {progress !== undefined && (
          <ProgressBar isDark={isDark}>
            <ProgressFill 
              progress={`${progress}%`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </ProgressBar>
        )}
        
        {tags.length > 0 && (
          <TagsContainer>
            {tags.map((tag, index) => (
              <Tag key={index} isDark={isDark}>{tag}</Tag>
            ))}
          </TagsContainer>
        )}
        
        {contributors.length > 0 && (
          <ContributorsContainer>
            {contributors.map((contributor, index) => (
              <Contributor 
                key={index}
                isDark={isDark}
                color={contributorColors[contributor.id] || undefined}
                index={10 - index}
              >
                {contributor.initials || contributor.name?.charAt(0) || '?'}
              </Contributor>
            ))}
            
            {contributors.length > 3 && (
              <Contributor isDark={isDark} isAdd index={1}>
                +{contributors.length - 3}
              </Contributor>
            )}
          </ContributorsContainer>
        )}
      </CardContent>
    </CardContainer>
  );
};

export default ContentCard; 