import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

// 动画变体
const gridAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

// 网格容器
const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 'auto-fill'}, minmax(${props => props.minItemWidth || '280px'}, 1fr));
  gap: ${props => props.gap || '24px'};
  margin-bottom: ${props => props.marginBottom || '40px'};
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// 网格项容器
const GridItem = styled(motion.div)`
  height: 100%;
`;

// 加载器
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  grid-column: 1 / -1;
`;

// 加载器动画
const Loader = styled(motion.div)`
  width: 48px;
  height: 48px;
  border: 3px solid rgba(255, 145, 144, 0.2);
  border-top-color: #FF9190;
  border-radius: 50%;
`;

// 空状态
const EmptyStateContainer = styled.div`
  padding: 60px 20px;
  text-align: center;
  grid-column: 1 / -1;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
  border-radius: 16px;
  border: 1px dashed ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyStateTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
`;

const EmptyStateDescription = styled.p`
  font-size: 14px;
  color: ${props => props.isDark ? '#aaa' : '#666'};
  max-width: 300px;
  margin: 0 auto;
`;

// 主组件
const GridLayout = ({ 
  children, 
  columns = 'auto-fill', 
  minItemWidth = '280px', 
  gap = '24px',
  marginBottom = '40px',
  isLoading = false,
  isEmpty = false,
  emptyIcon = 'fas fa-inbox',
  emptyTitle = '暂无内容',
  emptyDescription = '当前没有可显示的内容',
  isDark = false
}) => {
  return (
    <Grid 
      columns={columns}
      minItemWidth={minItemWidth}
      gap={gap}
      marginBottom={marginBottom}
      variants={gridAnimation}
      initial="hidden"
      animate="visible"
    >
      {isLoading && (
        <LoaderContainer>
          <Loader 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </LoaderContainer>
      )}
      
      {!isLoading && isEmpty && (
        <EmptyStateContainer isDark={isDark}>
          <EmptyStateIcon>
            <i className={emptyIcon}></i>
          </EmptyStateIcon>
          <EmptyStateTitle isDark={isDark}>{emptyTitle}</EmptyStateTitle>
          <EmptyStateDescription isDark={isDark}>{emptyDescription}</EmptyStateDescription>
        </EmptyStateContainer>
      )}
      
      {!isLoading && !isEmpty && React.Children.map(children, (child, index) => (
        <GridItem 
          key={index}
          variants={itemAnimation}
          layout
        >
          {child}
        </GridItem>
      ))}
    </Grid>
  );
};

export default GridLayout; 