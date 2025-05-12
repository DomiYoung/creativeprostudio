import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

// 筛选栏容器
const FilterContainer = styled.div`
  background: ${props => props.$isDark ? 'rgba(32, 32, 32, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  padding: 12px 16px;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.$isDark ? 0.2 : 0.04});
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.$isLast ? '0' : '10px'};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

// 左侧筛选组
const BaseFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.$gap || '8px'};
  flex-wrap: ${props => props.$wrap ? 'nowrap' : 'nowrap'};
  ${props => props.$wrap && `
    overflow-x: auto;
    padding-bottom: 4px;
    margin-bottom: -4px;
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${props.$isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
      border-radius: 4px;
    }
  `}
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    gap: 6px;
  }
`;

// Create a proper filter group component that consumes the wrap and gap props
// and doesn't pass them down to the DOM
const FilterGroup = ({ wrap, gap, ...props }) => (
  <BaseFilterGroup 
    $wrap={wrap}
    $gap={gap}
    {...props} 
  />
);

// 分段控制器
const SegmentedControl = styled.div`
  display: flex;
  background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.05)' : '#F6F6F6'};
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
  color: ${props => props.$isDark ? '#aaa' : '#666'};
  font-weight: 500;
  white-space: nowrap;
  
  &.active {
    background-color: ${props => props.$isDark ? '#1e1e1e' : 'white'};
    color: ${props => props.$isDark ? '#f5f5f5' : '#222'};
    box-shadow: 0 4px 8px rgba(0, 0, 0, ${props => props.$isDark ? '0.3' : '0.05'});
    font-weight: 600;
  }
  
  &:hover:not(.active) {
    color: ${props => props.$isDark ? '#ddd' : '#333'};
    background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)'};
  }
`;

// 筛选按钮
const FilterButton = styled(motion.button)`
  background: ${props => props.$active 
    ? props.$isDark 
      ? 'rgba(255, 255, 255, 0.12)' 
      : 'rgba(0, 0, 0, 0.08)'
    : props.$isDark 
      ? 'rgba(255, 255, 255, 0.06)' 
      : 'rgba(0, 0, 0, 0.03)'
  };
  color: ${props => props.$active 
    ? props.$isDark ? 'white' : '#333' 
    : props.$isDark ? '#f5f5f5' : '#666'
  };
  border: 1px solid ${props => props.$active 
    ? props.$isDark 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.1)'
    : 'transparent'
  };
  min-height: 36px;
  padding: 0 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: ${props => props.$active 
    ? props.$isDark 
      ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
      : '0 4px 12px rgba(0, 0, 0, 0.06)'
    : 'none'
  };
  letter-spacing: 0.2px;
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background: ${props => props.$active 
      ? props.$isDark 
        ? 'rgba(255, 255, 255, 0.15)' 
        : 'rgba(0, 0, 0, 0.1)' 
      : props.$isDark 
        ? 'rgba(255, 255, 255, 0.08)' 
        : 'rgba(0, 0, 0, 0.05)'
    };
    transform: translateY(-2px);
    box-shadow: ${props => props.$isDark 
      ? '0 6px 12px rgba(0, 0, 0, 0.25)' 
      : '0 6px 12px rgba(0, 0, 0, 0.08)'
    };
  }
  
  &:active {
    transform: translateY(0);
  }
  
  i {
    font-size: 14px;
  }
  
  span.count {
    background: ${props => props.$active 
      ? props.$isDark 
        ? 'rgba(255, 255, 255, 0.2)' 
        : 'rgba(0, 0, 0, 0.15)'
      : props.$isDark 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.08)'
    };
    color: ${props => props.$active 
      ? props.$isDark ? 'white' : '#333' 
      : props.$isDark ? '#f5f5f5' : '#666'
    };
    border-radius: 20px;
    padding: 2px 6px;
    font-size: 11px;
    font-weight: 600;
  }
`;

// 分段按钮样式 - 添加上与FilterButton类似的自定义段控制按钮
const SegmentButton = styled(motion.button)`
  background: ${props => props.$active 
    ? props.$isDark 
      ? 'rgba(255, 255, 255, 0.12)' 
      : 'rgba(0, 0, 0, 0.08)'
    : props.$isDark 
      ? 'rgba(255, 255, 255, 0.06)' 
      : 'rgba(0, 0, 0, 0.03)'
  };
  color: ${props => props.$active 
    ? props.$isDark ? 'white' : '#333' 
    : props.$isDark ? '#f5f5f5' : '#666'
  };
  border: 1px solid ${props => props.$active 
    ? props.$isDark 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.1)'
    : 'transparent'
  };
  min-height: 36px;
  padding: 0 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: ${props => props.$active 
    ? props.$isDark 
      ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
      : '0 4px 12px rgba(0, 0, 0, 0.06)'
    : 'none'
  };
  letter-spacing: 0.2px;
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background: ${props => props.$active 
      ? props.$isDark 
        ? 'rgba(255, 255, 255, 0.15)' 
        : 'rgba(0, 0, 0, 0.1)' 
      : props.$isDark 
        ? 'rgba(255, 255, 255, 0.08)' 
        : 'rgba(0, 0, 0, 0.05)'
    };
    transform: translateY(-2px);
    box-shadow: ${props => props.$isDark 
      ? '0 6px 12px rgba(0, 0, 0, 0.25)' 
      : '0 6px 12px rgba(0, 0, 0, 0.08)'
    };
  }
  
  &:active {
    transform: translateY(0);
  }
  
  i {
    font-size: 14px;
  }
  
  span.count {
    background: ${props => props.$active 
      ? props.$isDark 
        ? 'rgba(255, 255, 255, 0.2)' 
        : 'rgba(0, 0, 0, 0.15)'
      : props.$isDark 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.08)'
    };
    color: ${props => props.$active 
      ? props.$isDark ? 'white' : '#333' 
      : props.$isDark ? '#f5f5f5' : '#666'
    };
    border-radius: 20px;
    padding: 2px 6px;
    font-size: 11px;
    font-weight: 600;
  }
`;

// 筛选组下拉触发器
const FilterGroupButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.$isDark 
    ? props.$hasActive ? 'rgba(255, 145, 144, 0.2)' : 'rgba(255, 255, 255, 0.05)' 
    : props.$hasActive ? 'rgba(255, 145, 144, 0.1)' : '#F6F6F6'};
  color: ${props => props.$hasActive 
    ? '#FF9190' 
    : props.$isDark ? '#aaa' : '#666'};
  border: 1px solid ${props => props.$hasActive 
    ? 'rgba(255, 145, 144, 0.3)' 
    : 'transparent'};
  font-weight: ${props => props.$hasActive ? '600' : '500'};
  min-width: 120px;
  
  &:hover {
    background-color: ${props => props.$isDark 
      ? props.$hasActive ? 'rgba(255, 145, 144, 0.25)' : 'rgba(255, 255, 255, 0.1)' 
      : props.$hasActive ? 'rgba(255, 145, 144, 0.15)' : 'rgba(0, 0, 0, 0.05)'};
  }
  
  i.dropdown-icon {
    margin-left: 8px;
    transition: transform 0.2s;
    ${props => props.$isOpen && 'transform: rotate(180deg);'}
  }
`;

// 筛选组下拉菜单
const FilterDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;
  background-color: ${props => props.$isDark ? '#1a1a1a' : 'white'};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.$isDark ? '0.4' : '0.15'});
  min-width: 200px;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
`;

const FilterDropdownItem = styled.div`
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: ${props => props.$active 
    ? '#FF9190' 
    : props.$isDark ? '#ddd' : '#333'};
  
  &:hover {
    background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  }
  
  i {
    margin-right: 8px;
  }
`;

const DropdownTitle = styled.div`
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.$isDark ? '#888' : '#999'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  background-color: ${props => props.$active
    ? 'rgba(255, 145, 144, 0.15)'
    : props.$isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${props => props.$active
    ? '#FF9190'
    : props.$isDark ? '#aaa' : '#666'};
  border: none;
  font-weight: ${props => props.$active ? '600' : '500'};
  margin-right: 8px;
  white-space: nowrap;
  
  &:hover {
    background-color: ${props => props.$active
      ? 'rgba(255, 145, 144, 0.2)'
      : props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
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
const SearchInput = styled.div`
  position: relative;
  width: ${props => props.$fullWidth ? '100%' : '300px'};
  
  input {
    width: 100%;
    height: 44px;
    border-radius: 30px;
    border: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
    background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.03)'};
    padding: 0 42px 0 20px;
    font-size: 15px;
    color: ${props => props.$isDark ? '#f5f5f5' : '#333'};
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    
    &:focus {
      outline: none;
      border-color: #FF9190;
      box-shadow: 0 0 0 3px rgba(255, 145, 144, 0.25);
    }
    
    &::placeholder {
      color: ${props => props.$isDark ? '#999' : '#aaa'};
    }
  }
  
  i {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.$isDark ? '#999' : '#aaa'};
    font-size: 16px;
    pointer-events: none;
    transition: color 0.3s ease;
  }
  
  &:focus-within i {
    color: #FF9190;
  }
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

// 标签容器
const TagContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: ${props => props.$marginTop || '0'};
`;

// 标签
const Tag = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${props => props.$isDark ? '#f5f5f5' : '#666'};
  padding: 6px 12px 6px 14px;
  border-radius: 30px;
  font-size: 13px;
  transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  cursor: pointer;
  border: 1px solid transparent;
  
  &:hover {
    background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'};
    border-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    transform: translateY(-2px);
    box-shadow: ${props => props.$isDark 
      ? '0 4px 12px rgba(0, 0, 0, 0.25)' 
      : '0 4px 12px rgba(0, 0, 0, 0.05)'
    };
  }
  
  i {
    font-size: 14px;
    cursor: pointer;
    color: ${props => props.$isDark ? '#aaa' : '#999'};
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.$isDark ? 'white' : '#333'};
    }
  }
`;

// Dropdown样式修改
const Dropdown = styled.div`
  position: relative;
`;

const DropdownToggle = styled.button`
  background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${props => props.$isDark ? '#f5f5f5' : '#666'};
  height: 44px;
  padding: 0 16px;
  border-radius: 30px;
  border: 1px solid transparent;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  letter-spacing: 0.2px;
  
  &:hover {
    background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'};
    border-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    transform: translateY(-2px);
    box-shadow: ${props => props.$isDark 
      ? '0 4px 12px rgba(0, 0, 0, 0.25)' 
      : '0 4px 12px rgba(0, 0, 0, 0.05)'
    };
  }
  
  i {
    font-size: 16px;
    transition: transform 0.3s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 200px;
  background: ${props => props.$isDark ? 'rgba(40, 40, 40, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, ${props => props.$isDark ? 0.4 : 0.1});
  border: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  padding: 8px;
  z-index: 100;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  color: ${props => props.$isDark ? '#f5f5f5' : '#666'};
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 2px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.03)'};
    color: ${props => props.$isDark ? 'white' : '#333'};
  }
  
  &.active {
    background: ${props => props.$isDark ? 'rgba(255, 145, 144, 0.2)' : 'rgba(255, 145, 144, 0.1)'};
    color: #FF9190;
    font-weight: 500;
  }
  
  i {
    font-size: 16px;
  }
`;

const SortDropdown = ({ options, value, onChange, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // 关闭下拉菜单的点击外部监听
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // 获取当前选中的选项
  const selectedOption = options.find(option => option.value === value) || options[0];
  
  return (
    <Dropdown ref={dropdownRef}>
      <DropdownToggle 
        $isDark={isDark} 
        $isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="ri-sort-desc"></i>
        {selectedOption.label}
        <i className="ri-arrow-down-s-line"></i>
      </DropdownToggle>
      
      <AnimatePresence>
        {isOpen && (
          <DropdownMenu
            $isDark={isDark}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {options.map(option => (
              <DropdownItem
                key={option.value}
                $isDark={isDark}
                className={value === option.value ? 'active' : ''}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <i className={option.icon}></i>
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </AnimatePresence>
    </Dropdown>
  );
};

// 创建一个带有滚动容器的过滤组件
const ScrollableFilterContainer = styled.div`
  position: relative;
  width: 100%;
  
  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 40px;
    pointer-events: none;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%, 
      ${props => props.$isDark ? 'rgba(32, 32, 32, 0.8)' : 'rgba(255, 255, 255, 0.8)'} 100%);
    opacity: 0.9;
    display: ${props => props.$showGradient ? 'block' : 'none'};
  }
`;

// 横向滚动的过滤组容器
const ScrollableFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 6px;
  margin-bottom: -6px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 4px;
  }
`;

// 创建一个过滤器下拉菜单组件
const FilterDropdownContainer = styled.div`
  position: relative;
  margin-right: 8px;
`;

const FilterDropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: ${props => props.$hasActive 
    ? props.$isDark 
      ? 'rgba(255, 145, 144, 0.12)' 
      : 'rgba(255, 145, 144, 0.08)'
    : props.$isDark 
      ? 'rgba(255, 255, 255, 0.06)' 
      : 'rgba(0, 0, 0, 0.03)'
  };
  color: ${props => props.$hasActive 
    ? '#FF9190' 
    : props.$isDark ? '#f5f5f5' : '#666'
  };
  border: 1px solid ${props => props.$hasActive 
    ? 'rgba(255, 145, 144, 0.2)' 
    : 'transparent'
  };
  min-height: 36px;
  padding: 0 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: ${props => props.$hasActive ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.$hasActive 
      ? props.$isDark 
        ? 'rgba(255, 145, 144, 0.15)' 
        : 'rgba(255, 145, 144, 0.1)' 
      : props.$isDark 
        ? 'rgba(255, 255, 255, 0.08)' 
        : 'rgba(0, 0, 0, 0.05)'
    };
    transform: translateY(-2px);
  }
  
  i.caret {
    font-size: 14px;
    transition: transform 0.2s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
  
  .badge {
    background: ${props => props.$hasActive 
      ? props.$isDark 
        ? 'rgba(255, 145, 144, 0.2)' 
        : 'rgba(255, 145, 144, 0.15)'
      : props.$isDark 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.08)'
    };
    color: ${props => props.$hasActive 
      ? '#FF9190' 
      : props.$isDark ? '#f5f5f5' : '#666'
    };
    border-radius: 20px;
    padding: 2px 6px;
    font-size: 11px;
    font-weight: 600;
  }
`;

const FilterDropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 180px;
  max-height: 300px;
  overflow-y: auto;
  background: ${props => props.$isDark ? 'rgba(40, 40, 40, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, ${props => props.$isDark ? 0.3 : 0.15});
  border: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  padding: 6px;
  z-index: 120;
`;

const FilterMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 8px;
  cursor: pointer;
  color: ${props => props.$active 
    ? '#FF9190' 
    : props.$isDark ? '#f5f5f5' : '#666'
  };
  background: ${props => props.$active 
    ? props.$isDark 
      ? 'rgba(255, 145, 144, 0.15)' 
      : 'rgba(255, 145, 144, 0.1)'
    : 'transparent'
  };
  font-weight: ${props => props.$active ? '600' : 'normal'};
  transition: all 0.2s ease;
  margin-bottom: 2px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    background: ${props => props.$active 
      ? props.$isDark 
        ? 'rgba(255, 145, 144, 0.2)' 
        : 'rgba(255, 145, 144, 0.15)'
      : props.$isDark 
        ? 'rgba(255, 255, 255, 0.05)' 
        : 'rgba(0, 0, 0, 0.03)'
    };
  }
  
  i {
    margin-right: 8px;
    font-size: 14px;
  }
`;

// 品牌等过滤器的下拉组件
const DropdownFilter = ({ 
  title, 
  items = [], 
  activeItems = [], 
  onChange, 
  isDark = false 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
  
  // 点击外部关闭下拉菜单
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleItemClick = (itemId) => {
    onChange(itemId);
    // 维持菜单打开状态以便连续选择
  };
  
  return (
    <FilterDropdownContainer ref={dropdownRef}>
      <FilterDropdownButton 
        $hasActive={activeItems.length > 0}
        $isOpen={isOpen}
        $isDark={isDark}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {activeItems.length > 0 && (
          <span className="badge">{activeItems.length}</span>
        )}
        <i className="ri-arrow-down-s-line caret" />
      </FilterDropdownButton>
      
      <AnimatePresence>
        {isOpen && (
          <FilterDropdownMenu
            $isDark={isDark}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item) => (
              <FilterMenuItem
                key={item.id}
                $active={activeItems.includes(item.id)}
                $isDark={isDark}
                onClick={() => handleItemClick(item.id)}
              >
                <div>
                  {item.icon && <i className={item.icon}></i>}
                  {item.label}
                </div>
                {activeItems.includes(item.id) && (
                  <i className="ri-check-line" />
                )}
              </FilterMenuItem>
            ))}
          </FilterDropdownMenu>
        )}
      </AnimatePresence>
    </FilterDropdownContainer>
  );
};

// 过滤栏组件
const FilterBar = ({
  segments = [],
  filters = [],
  tags = [],
  searchValue = '',
  onSearchChange,
  onSegmentChange,
  onFilterChange,
  onTagRemove,
  sortOptions = [],
  sortValue,
  onSortChange,
  isDark = false,
}) => {
  // 滚动状态引用
  const segmentsRef = React.useRef(null);
  
  // 滚动阴影状态
  const [segmentsCanScroll, setSegmentsCanScroll] = React.useState(false);
  
  // 检测是否可以滚动
  React.useEffect(() => {
    const checkSegmentsScroll = () => {
      if (segmentsRef.current) {
        const { scrollWidth, clientWidth } = segmentsRef.current;
        setSegmentsCanScroll(scrollWidth > clientWidth);
      }
    };
    
    // 初始检查
    checkSegmentsScroll();
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', checkSegmentsScroll);
    
    // 清理
    return () => {
      window.removeEventListener('resize', checkSegmentsScroll);
    };
  }, [segments]);
  
  // 渲染下拉过滤器 - 使用下拉形式展示筛选器
  const renderDropdownFilters = () => {
    // 筛选出指定的筛选器类型
    const dropdownFilters = filters.filter(filter => 
      filter.title === '品牌' || 
      filter.title === '素材类型' || 
      filter.title === '项目文件夹' ||
      filter.title === '时间'
    );
    
    if (dropdownFilters.length === 0) return null;
    
    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {dropdownFilters.map((filter, index) => (
          <DropdownFilter
            key={`dropdown-filter-${index}`}
            title={filter.title}
            items={filter.items}
            activeItems={filter.activeItems || []}
            onChange={filter.onChange}
            isDark={isDark}
          />
        ))}
      </div>
    );
  };
  
  return (
    <FilterContainer $isDark={isDark}>
      <FilterRow>
      {/* ScrollableFilterContainer 是滚动容器，ScrollableFilterGroup 是滚动组 */}
        {/* <ScrollableFilterContainer $isDark={isDark} $showGradient={segmentsCanScroll}>
          <ScrollableFilterGroup ref={segmentsRef} $isDark={isDark}>
            {segments.map((segment, idx) => (
              <SegmentButton
                key={segment.value || segment.id || `segment-${idx}`}
                $active={segment.active}
                $isDark={isDark}
                onClick={() => onSegmentChange(segment.value || segment.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {segment.icon && <i className={segment.icon}></i>}
                {segment.label}
                {segment.count > 0 && <span className="count">{segment.count}</span>}
              </SegmentButton>
            ))}
          </ScrollableFilterGroup>
        </ScrollableFilterContainer> */}

        {/* 搜索和排序组 */}
        <FilterGroup key="search-sort-group">
          <SearchInput $isDark={isDark}>
            <input
              type="text"
              placeholder="搜索..."
              value={searchValue}
              onChange={e => onSearchChange(e.target.value)}
            />
            <i className="ri-search-line"></i>
          </SearchInput>
          
          {sortOptions.length > 0 && (
            <SortDropdown
              options={Array.isArray(sortOptions) && typeof sortOptions[0] === 'string' 
                ? sortOptions.map(opt => ({ label: opt, value: opt })) 
                : sortOptions}
              value={sortValue}
              onChange={onSortChange}
              isDark={isDark}
            />
          )}
        </FilterGroup>
      </FilterRow>

      {filters.length > 0 && (
        <FilterRow>
          {/* 只使用下拉菜单形式 */}
          {renderDropdownFilters()}
        </FilterRow>
      )}

      {/* 标签组 */}
      {tags.length > 0 && (
        <FilterRow $isLast>
          <ScrollableFilterContainer $isDark={isDark}>
            <ScrollableFilterGroup $isDark={isDark}>
              {tags.map((tag, idx) => (
                <Tag 
                  key={tag.value || tag.id || `tag-${idx}`} 
                  $isDark={isDark}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {tag.label}
                  <i 
                    className="ri-close-line" 
                    onClick={() => onTagRemove(tag.value || tag.id)}
                  />
                </Tag>
              ))}
            </ScrollableFilterGroup>
          </ScrollableFilterContainer>
        </FilterRow>
      )}
    </FilterContainer>
  );
};

export default FilterBar; 