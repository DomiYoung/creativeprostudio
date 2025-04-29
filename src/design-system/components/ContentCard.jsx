import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../index';

// 卡片容器
const CardContainer = styled(motion.div)`
  background-color: ${props => props.isDark ? '#1e1e1e' : 'white'};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, ${props => props.isDark ? '0.2' : '0.04'});
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'};
  transition: background-color 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
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
    transition: transform 0.5s ease;
  }
`;

// 卡片状态标签
const CardStatus = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  z-index: 2;
  
  ${props => {
    const statusColors = {
      completed: {
        bg: 'rgba(39, 174, 96, 0.15)',
        color: '#27AE60',
        border: 'rgba(39, 174, 96, 0.2)'
      },
      'in-progress': {
        bg: 'rgba(52, 152, 219, 0.15)',
        color: '#3498DB',
        border: 'rgba(52, 152, 219, 0.2)'
      },
      review: {
        bg: 'rgba(243, 156, 18, 0.15)',
        color: '#F39C12',
        border: 'rgba(243, 156, 18, 0.2)'
      },
      new: {
        bg: 'rgba(142, 68, 173, 0.15)',
        color: '#8E44AD',
        border: 'rgba(142, 68, 173, 0.2)'
      },
      featured: {
        bg: 'rgba(255, 145, 144, 0.15)',
        color: '#FF9190',
        border: 'rgba(255, 145, 144, 0.2)'
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
  color: ${props => props.isFavorite ? '#FFE599' : '#aaa'};
  
  i {
    font-size: 14px;
  }
`;

// 卡片内容
const CardContent = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// 卡片标题
const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${props => props.isDark ? '#f5f5f5' : '#212121'};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
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
  height: 6px;
  background-color: ${props => props.isDark ? '#333' : '#f0f0f0'};
  border-radius: 3px;
  margin-bottom: 16px;
  overflow: hidden;
  transition: background-color 0.3s ease;
`;

// 进度填充
const ProgressFill = styled(motion.div)`
  height: 100%;
  width: ${props => props.progress || '0%'};
  background: linear-gradient(to right, #FF9190, #FFA194);
  border-radius: 3px;
`;

// 卡片标签
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 12px;
`;

// 标签
const Tag = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
  color: ${props => props.isDark ? '#ccc' : '#666'};
  transition: background-color 0.3s ease, color 0.3s ease;
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

// 主组件
const ContentCard = ({ 
  image,
  title,
  status,
  statusText,
  progress,
  isFavorite,
  metaItems = [],
  tags = [],
  contributors = [],
  contributorColors = {},
  aspectRatio = '16/9',
  onClick,
}) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  return (
    <CardContainer 
      isDark={isDark}
      whileHover={{ 
        y: -10, 
        boxShadow: isDark 
          ? '0 16px 30px rgba(0, 0, 0, 0.3)' 
          : '0 16px 30px rgba(0, 0, 0, 0.08)',
        borderColor: isDark 
          ? 'rgba(255, 255, 255, 0.08)' 
          : 'rgba(0, 0, 0, 0.08)'
      }}
      onClick={onClick}
      layout
    >
      <CardPreview aspectRatio={aspectRatio}>
        <motion.img 
          src={image} 
          alt={title}
          whileHover={{ scale: 1.08, rotate: -1 }}
          transition={{ duration: 0.4 }}
        />
        
        {status && statusText && (
          <CardStatus status={status}>
            {statusText}
          </CardStatus>
        )}
        
        <FavoriteIcon 
          isFavorite={isFavorite}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className={`fas ${isFavorite ? 'fa-star' : 'fa-star'}`}></i>
        </FavoriteIcon>
      </CardPreview>
      
      <CardContent>
        <CardTitle isDark={isDark}>{title}</CardTitle>
        
        {metaItems.length > 0 && (
          <CardMeta hasProgress={progress !== undefined}>
            {metaItems.map((item, index) => (
              <MetaItem key={index} isDark={isDark}>
                <i className={`far ${item.icon}`}></i> {item.text}
              </MetaItem>
            ))}
          </CardMeta>
        )}
        
        {progress !== undefined && (
          <ProgressBar isDark={isDark}>
            <ProgressFill 
              initial={{ width: 0 }}
              animate={{ width: progress }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              progress={progress}
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
            {contributors.map((contributor, i) => (
              <motion.div
                key={`contributor-${i}`}
                whileHover={{ y: -4, scale: 1.1, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Contributor 
                  color={contributorColors[contributor]}
                  index={5 - i}
                  isDark={isDark}
                >
                  {contributor}
                </Contributor>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ y: -4, scale: 1.1, zIndex: 10 }}
            >
              <Contributor isAdd index={1} isDark={isDark}>+</Contributor>
            </motion.div>
          </ContributorsContainer>
        )}
      </CardContent>
    </CardContainer>
  );
};

export default ContentCard; 