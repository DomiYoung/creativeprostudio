import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../design-system';
import ReactMarkdown from 'react-markdown';

// 样式组件
const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const DocumentCard = styled(motion.div)`
  background-color: ${props => props.isDark ? '#1e1e1e' : 'white'};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, ${props => props.isDark ? '0.2' : '0.04'});
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
  font-size: 24px;
`;

const DocumentTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
`;

const DocumentDescription = styled.p`
  font-size: 14px;
  color: ${props => props.isDark ? '#aaa' : '#666'};
  margin: 0 0 16px 0;
  flex-grow: 1;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: ${props => props.isDark ? '#888' : '#999'};
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${props => props.isDark ? '#ddd' : '#666'};
`;

const SearchBar = styled.div`
  position: relative;
  margin-bottom: 24px;
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  padding: 12px 16px;
  padding-left: 40px;
  border-radius: 12px;
  border: none;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
  width: 100%;
  font-size: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, ${props => props.isDark ? '0.1' : '0.02'});
  
  &:focus {
    outline: none;
    box-shadow: 0 2px 12px rgba(0, 0, 0, ${props => props.isDark ? '0.15' : '0.05'});
  }
  
  &::placeholder {
    color: ${props => props.isDark ? '#888' : '#aaa'};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.isDark ? '#888' : '#aaa'};
`;

// 文档查看模态框
const DocumentViewModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const DocumentContent = styled(motion.div)`
  width: 90%;
  max-width: 1000px;
  height: 90%;
  background-color: ${props => props.isDark ? '#1e1e1e' : 'white'};
  border-radius: 16px;
  padding: 32px;
  overflow-y: auto;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
  
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.isDark ? '#f5f5f5' : '#333'};
    margin-top: 1.5em;
    margin-bottom: 0.75em;
  }
  
  p, ul, ol {
    color: ${props => props.isDark ? '#ddd' : '#555'};
    line-height: 1.6;
    margin-bottom: 1em;
  }
  
  code {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
  }
  
  pre {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.03)'};
    padding: 1em;
    border-radius: 8px;
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1em;
  }
  
  th, td {
    padding: 12px;
    border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    text-align: left;
  }
  
  th {
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.isDark ? '#ddd' : '#666'};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

// 获取图标
const getDocumentIcon = (category) => {
  switch (category) {
    case '系统架构':
      return 'fas fa-sitemap';
    case '前端文档':
      return 'fas fa-code';
    case '后端文档':
      return 'fas fa-server';
    case '产品概述':
      return 'fas fa-project-diagram';
    case '功能实现':
      return 'fas fa-cogs';
    case '测试与部署':
      return 'fas fa-rocket';
    case '用户界面':
      return 'fas fa-desktop';
    case '项目管理':
      return 'fas fa-tasks';
    case 'UX设计':
      return 'fas fa-user-alt';
    case '项目蓝图':
      return 'fas fa-map';
    case '详设':
      return 'fas fa-file-code';
    case '后端概设':
      return 'fas fa-database';
    case '前端概设':
      return 'fas fa-laptop-code';
    case '概要设计':
      return 'fas fa-pencil-ruler';
    case '跨域文档':
      return 'fas fa-globe';
    default:
      return 'fas fa-file-alt';
  }
};

const DocumentBrowser = ({ documents, title, description }) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentContent, setDocumentContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 搜索功能
  useEffect(() => {
    if (searchQuery) {
      const filtered = documents.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
      setFilteredDocuments(filtered);
    } else {
      setFilteredDocuments(documents);
    }
  }, [searchQuery, documents]);
  
  // 获取文档内容
  const fetchDocumentContent = async (path) => {
    setIsLoading(true);
    try {
      // 尝试从docs目录加载文档
      const response = await fetch(`/docs/${path}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const content = await response.text();
      setDocumentContent(content);
    } catch (error) {
      console.error('获取文档内容失败:', error);
      setDocumentContent('加载文档内容失败，请稍后重试。');
    } finally {
      setIsLoading(false);
    }
  };
  
  // 查看文档
  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    fetchDocumentContent(document.path);
  };
  
  // 关闭文档查看
  const handleCloseDocument = () => {
    setSelectedDocument(null);
    setDocumentContent('');
  };
  
  return (
    <div>
      <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        {title}
      </h1>
      <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {description}
      </p>
      
      <SearchBar>
        <SearchIcon isDark={isDark}>
          <i className="fas fa-search"></i>
        </SearchIcon>
        <SearchInput 
          isDark={isDark}
          placeholder="搜索文档..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>
      
      <DocumentsGrid>
        {filteredDocuments.map((document, index) => (
          <DocumentCard
            key={index}
            isDark={isDark}
            whileHover={{ 
              y: -10, 
              boxShadow: isDark 
                ? '0 16px 30px rgba(0, 0, 0, 0.3)' 
                : '0 16px 30px rgba(0, 0, 0, 0.08)'
            }}
            onClick={() => handleViewDocument(document)}
          >
            <IconContainer isDark={isDark}>
              <i className={getDocumentIcon(document.category || 'default')}></i>
            </IconContainer>
            <DocumentTitle isDark={isDark}>{document.title}</DocumentTitle>
            <DocumentDescription isDark={isDark}>{document.description}</DocumentDescription>
            <MetaInfo isDark={isDark}>
              <TagContainer>
                {document.tags && document.tags.map((tag, idx) => (
                  <Tag key={idx} isDark={isDark}>{tag}</Tag>
                ))}
              </TagContainer>
              <div>{document.date || '未指定日期'}</div>
            </MetaInfo>
          </DocumentCard>
        ))}
      </DocumentsGrid>
      
      {selectedDocument && (
        <DocumentViewModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseDocument}
        >
          <DocumentContent 
            isDark={isDark}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <CloseButton isDark={isDark} onClick={handleCloseDocument}>
              <i className="fas fa-times"></i>
            </CloseButton>
            
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <i className="fas fa-spinner fa-spin" style={{ fontSize: '24px', color: isDark ? '#aaa' : '#666' }}></i>
                <p style={{ marginTop: '20px', color: isDark ? '#aaa' : '#666' }}>加载文档中...</p>
              </div>
            ) : (
              <>
                <h1 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {selectedDocument.title}
                </h1>
                <ReactMarkdown>{documentContent}</ReactMarkdown>
              </>
            )}
            
            <div style={{ marginTop: '32px', textAlign: 'center', color: isDark ? '#888' : '#999', fontSize: '14px' }}>
              © domiyoung__
            </div>
          </DocumentContent>
        </DocumentViewModal>
      )}
    </div>
  );
};

export default DocumentBrowser; 