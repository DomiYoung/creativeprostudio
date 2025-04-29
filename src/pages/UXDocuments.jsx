import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../design-system';
import PageLayout from '../design-system/components/PageLayout';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

// 示例文档数据
const uxDocuments = [
  {
    id: 'material-library-ux',
    title: '素材库交互设计',
    description: '面向Z世代女性用户的美妆与潮流产品素材库的交互设计规范，包含分类、筛选和文件夹管理。',
    type: 'ux',
    path: 'src/design-system/ux/MaterialLibraryUX.md',
    date: '2025-04-25',
    tags: ['素材库', 'Z世代']
  },
  {
    id: 'usability-guidelines',
    title: '可用性指南',
    description: '创意产品工作室的可用性指南，包含界面设计、交互模式和辅助功能等方面的详细规范。',
    type: 'guidelines',
    path: 'src/design-system/ux/UsabilityGuidelines.md',
    date: '2025-04-22',
    tags: ['可用性', '设计规范']
  },
  {
    id: 'interaction-patterns',
    title: '交互模式指南',
    description: '创意工作室产品的交互设计模式库，包含常见交互模式的实现方法和最佳实践。',
    type: 'guidelines',
    path: 'src/design-system/ux/InteractionPatterns.md',
    date: '2025-04-20',
    tags: ['交互', '模式库']
  },
  {
    id: 'information-architecture',
    title: '信息架构',
    description: '产品的信息架构设计文档，包含内容组织、导航系统和搜索系统的规划。',
    type: 'docs',
    path: 'src/design-system/ux/InformationArchitecture.md',
    date: '2025-04-18',
    tags: ['信息架构', '导航']
  },
  {
    id: 'visual-design-guidelines',
    title: '视觉设计指南',
    description: '面向Z世代用户的视觉设计语言，包含色彩、排版、图像处理和动效等元素的规范。',
    type: 'docs',
    path: 'src/design-system/ux/VisualDesignGuidelines.md',
    date: '2025-04-15',
    tags: ['视觉设计', '设计语言']
  }
];

// 获取图标
const getDocumentIcon = (type) => {
  switch (type) {
    case 'ux':
      return 'fas fa-user-alt';
    case 'flow':
      return 'fas fa-project-diagram';
    case 'docs':
      return 'fas fa-file-alt';
    case 'guidelines':
      return 'fas fa-ruler-combined';
    default:
      return 'fas fa-file';
  }
};

const UXDocuments = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState(uxDocuments);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentContent, setDocumentContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 面包屑导航
  const breadcrumbs = [
    { label: '首页', path: '/creativeprostudio/prototype' },
    { label: 'UX设计文档', path: '/creativeprostudio/ux-documents' }
  ];
  
  // 搜索功能
  useEffect(() => {
    if (searchQuery) {
      const filtered = uxDocuments.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredDocuments(filtered);
    } else {
      setFilteredDocuments(uxDocuments);
    }
  }, [searchQuery]);
  
  // 获取文档内容
  const fetchDocumentContent = async (path) => {
    setIsLoading(true);
    try {
      // 在实际项目中，这里应该调用API获取文档内容
      // 这里为了演示，我们直接读取本地文件
      const response = await fetch(`/${path}`);
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
    <PageLayout
      title="UX设计文档"
      description="用户体验设计文档，包含用户旅程地图、信息架构和交互规范，确保产品易用性和一致性。"
      breadcrumbs={breadcrumbs}
      activeNav="ux-documents"
    >
      <SearchBar>
        <SearchIcon isDark={isDark}>
          <i className="fas fa-search"></i>
        </SearchIcon>
        <SearchInput 
          isDark={isDark}
          placeholder="搜索UX文档..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>
      
      <DocumentsGrid>
        {filteredDocuments.map(document => (
          <DocumentCard
            key={document.id}
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
              <i className={getDocumentIcon(document.type)}></i>
            </IconContainer>
            <DocumentTitle isDark={isDark}>{document.title}</DocumentTitle>
            <DocumentDescription isDark={isDark}>{document.description}</DocumentDescription>
            <MetaInfo isDark={isDark}>
              <TagContainer>
                {document.tags.map((tag, index) => (
                  <Tag key={index} isDark={isDark}>{tag}</Tag>
                ))}
              </TagContainer>
              <div>{document.date}</div>
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
              <ReactMarkdown>{documentContent}</ReactMarkdown>
            )}
            
            <div style={{ marginTop: '32px', textAlign: 'center', color: isDark ? '#888' : '#999', fontSize: '14px' }}>
              © domiyoung__
            </div>
          </DocumentContent>
        </DocumentViewModal>
      )}
    </PageLayout>
  );
};

export default UXDocuments; 