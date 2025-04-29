import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../index';

// 筛选栏容器
const FilterContainer = styled(motion.div)`
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 72px;
  z-index: 10;
  background-color: ${props => props.isDark ? '#121212' : '#fafafa'};
  padding: 8px 0;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: background-color 0.3s ease;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// 左侧筛选组
const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  
  @media (max-width: 640px) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 8px;
    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }
  }
`;

// 分段控制器
const SegmentedControl = styled.div`
  display: flex;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : '#F6F6F6'};
  border-radius: 16px;
  padding: 4px;
  transition: background-color 0.3s ease;
`;

// 分段
const Segment = styled.div`
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${props => props.isDark ? '#aaa' : '#666'};
  font-weight: 500;
  white-space: nowrap;
  
  &.active {
    background-color: ${props => props.isDark ? '#1e1e1e' : 'white'};
    color: ${props => props.isDark ? '#f5f5f5' : '#222'};
    box-shadow: 0 4px 8px rgba(0, 0, 0, ${props => props.isDark ? '0.3' : '0.05'});
    font-weight: 600;
  }
  
  &:hover:not(.active) {
    color: ${props => props.isDark ? '#ddd' : '#333'};
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)'};
  }
`;

// 筛选按钮
const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.isDark 
    ? props.active ? 'rgba(255, 145, 144, 0.2)' : 'rgba(255, 255, 255, 0.05)' 
    : props.active ? 'rgba(255, 145, 144, 0.1)' : '#F6F6F6'};
  color: ${props => props.active 
    ? '#FF9190' 
    : props.isDark ? '#aaa' : '#666'};
  border: 1px solid ${props => props.active 
    ? 'rgba(255, 145, 144, 0.3)' 
    : 'transparent'};
  font-weight: ${props => props.active ? '600' : '500'};
  
  &:hover {
    background-color: ${props => props.isDark 
      ? props.active ? 'rgba(255, 145, 144, 0.25)' : 'rgba(255, 255, 255, 0.1)' 
      : props.active ? 'rgba(255, 145, 144, 0.15)' : 'rgba(0, 0, 0, 0.05)'};
  }
  
  i {
    margin-right: 8px;
  }
`;

// 标签按钮
const TagButton = styled(motion.button)`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.active
    ? 'rgba(255, 145, 144, 0.15)'
    : props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${props => props.active
    ? '#FF9190'
    : props.isDark ? '#aaa' : '#666'};
  border: none;
  font-weight: ${props => props.active ? '600' : '500'};
  margin-right: 8px;
  white-space: nowrap;
  
  &:hover {
    background-color: ${props => props.active
      ? 'rgba(255, 145, 144, 0.2)'
      : props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    transform: translateY(-2px);
  }
`;

// 搜索容器
const SearchContainer = styled.div`
  position: relative;
  min-width: 240px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// 搜索输入框
const SearchInput = styled.input`
  border: none;
  border-radius: 16px;
  padding: 12px 16px;
  padding-left: 38px;
  font-size: 14px;
  width: 100%;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, ${props => props.isDark ? '0.2' : '0.05'});
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.isDark ? '0.3' : '0.1'});
  }
  
  &::placeholder {
    color: ${props => props.isDark ? '#888' : '#aaa'};
  }
`;

// 搜索图标
const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.isDark ? '#888' : '#aaa'};
`;

// 右侧操作组
const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

// 筛选组件
const FilterBar = ({ 
  segments = [],
  activeSegment = '',
  onSegmentChange,
  filters = [],
  activeFilters = [],
  onFilterChange,
  tags = [],
  activeTags = [],
  onTagChange,
  showSearch = true,
  searchPlaceholder = '搜索...',
  onSearch,
  actions = [],
  showSortFilter = true,
  sortOptions = ['最新', '最早', '名称', '热门'],
  activeSort = '最新',
  onSortChange,
  style
}) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  return (
    <FilterContainer 
      isDark={isDark}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={style}
    >
      <FilterGroup>
        {/* 分段控制器 */}
        {segments.length > 0 && (
          <SegmentedControl isDark={isDark}>
            {segments.map(segment => (
              <Segment 
                key={segment.id || segment}
                className={activeSegment === (segment.id || segment) ? 'active' : ''}
                onClick={() => onSegmentChange && onSegmentChange(segment.id || segment)}
                isDark={isDark}
              >
                {segment.label || segment}
              </Segment>
            ))}
          </SegmentedControl>
        )}
        
        {/* 筛选按钮 */}
        {filters.length > 0 && filters.map(filter => (
          <FilterButton 
            key={filter.id || filter}
            active={activeFilters.includes(filter.id || filter)}
            onClick={() => onFilterChange && onFilterChange(filter.id || filter)}
            isDark={isDark}
          >
            {filter.icon && <i className={`fas ${filter.icon}`}></i>}
            {filter.label || filter}
          </FilterButton>
        ))}
        
        {/* 标签 */}
        {tags.length > 0 && tags.map(tag => (
          <TagButton 
            key={tag.id || tag}
            active={activeTags.includes(tag.id || tag)}
            onClick={() => onTagChange && onTagChange(tag.id || tag)}
            isDark={isDark}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {tag.label || tag}
          </TagButton>
        ))}
      </FilterGroup>
      
      <ActionGroup>
        {/* 搜索框 */}
        {showSearch && (
          <SearchContainer>
            <SearchIcon isDark={isDark}>
              <i className="fas fa-search"></i>
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              isDark={isDark}
            />
          </SearchContainer>
        )}
        
        {/* 排序 */}
        {showSortFilter && (
          <SegmentedControl isDark={isDark}>
            {sortOptions.map(sort => (
              <Segment 
                key={sort}
                className={activeSort === sort ? 'active' : ''}
                onClick={() => onSortChange && onSortChange(sort)}
                isDark={isDark}
              >
                {sort}
              </Segment>
            ))}
          </SegmentedControl>
        )}
        
        {/* 自定义操作 */}
        {actions.map((action, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {action}
          </motion.div>
        ))}
      </ActionGroup>
    </FilterContainer>
  );
};

export default FilterBar; 