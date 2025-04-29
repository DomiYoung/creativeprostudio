import React, { useState, useEffect } from 'react';
import { useTheme } from '../design-system';
import DocumentBrowser from '../components/DocumentBrowser';
import { getAllDocuments } from '../services/DocumentService';
import styled from '@emotion/styled';

// 样式组件
const DocPageContainer = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
  border-bottom: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  padding-bottom: 16px;
`;

const CategoryTab = styled.button`
  padding: 8px 16px;
  border-radius: 40px;
  background-color: ${props => props.isActive 
    ? (props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)')
    : 'transparent'
  };
  border: 1px solid ${props => props.isActive 
    ? (props.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)')
    : props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
  };
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'};
  }
`;

const CategoryTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin: 40px 0 20px;
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
  border-bottom: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  padding-bottom: 10px;
`;

const NoDocsMessage = styled.div`
  padding: 40px;
  text-align: center;
  color: ${props => props.isDark ? '#888' : '#666'};
`;

const DocumentationPage = () => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [allCategories, setAllCategories] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  // 获取所有文档
  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        const docs = await getAllDocuments();
        setDocuments(docs);
        
        // 提取所有分类
        const categories = docs.map(doc => doc.category);
        setAllCategories(['all', ...categories]);
      } catch (error) {
        console.error('获取文档失败:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDocuments();
  }, []);
  
  // 切换分类
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  // 根据活动分类筛选文档
  const filteredDocuments = activeCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === activeCategory);
  
  return (
    <DocPageContainer>
      <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        文档中心
      </h1>
      <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        浏览项目文档，包含系统设计、前后端实现、用户界面等各方面的详细说明
      </p>
      
      {/* 分类标签 */}
      <CategoryTabs isDark={isDark}>
        {allCategories.map((category, index) => (
          <CategoryTab 
            key={index}
            isDark={isDark}
            isActive={activeCategory === category}
            onClick={() => handleCategoryChange(category)}
          >
            {category === 'all' ? '全部文档' : category}
          </CategoryTab>
        ))}
      </CategoryTabs>
      
      {/* 文档内容 */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {activeCategory === 'all' ? (
            // 全部文档分类显示
            filteredDocuments.map((category, index) => (
              <div key={index}>
                <CategoryTitle isDark={isDark}>
                  {category.category}
                </CategoryTitle>
                <DocumentBrowser 
                  documents={category.documents}
                  title=""
                  description=""
                />
              </div>
            ))
          ) : (
            // 单一分类显示
            filteredDocuments.length > 0 ? (
              filteredDocuments.map((category, index) => (
                <DocumentBrowser 
                  key={index}
                  documents={category.documents}
                  title={category.category}
                  description={`${category.category}相关的所有文档`}
                />
              ))
            ) : (
              <NoDocsMessage isDark={isDark}>
                <i className="fas fa-folder-open text-4xl mb-4 block"></i>
                <p>该分类下暂无文档</p>
              </NoDocsMessage>
            )
          )}
        </>
      )}
      
      <div className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
        © domiyoung__
      </div>
    </DocPageContainer>
  );
};

export default DocumentationPage; 