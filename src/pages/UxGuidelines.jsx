import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, faUser, faCodeBranch, 
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import '../styles/DocumentPage.css';
import { marked } from 'marked';

const UxGuidelines = () => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState('system');
  
  const uxDocs = [
    { id: 'system', title: '系统蓝图', description: '详细的系统架构、业务领域与技术实现路线图', path: 'DesignSystemOverview.md' },
    { id: 'usability', title: '可用性指南', description: '包含用户体验可用性设计规范和最佳实践', path: 'UsabilityGuidelines.md' },
    { id: 'ia', title: '信息架构', description: '产品信息组织、分类和导航系统设计规范', path: 'InformationArchitecture.md' },
    { id: 'interaction', title: '交互模式', description: '标准交互模式和微交互设计规范', path: 'InteractionPatterns.md' },
    { id: 'visual', title: '视觉设计', description: '视觉设计元素和原则指南', path: 'VisualDesignGuidelines.md' },
    { id: 'materials', title: '素材库', description: 'UX相关素材资源和使用规范', path: 'MaterialLibraryUX.md' },
  ];

  useEffect(() => {
    const loadDocument = async () => {
      setIsLoading(true);
      try {
        const selectedDocument = uxDocs.find(doc => doc.id === selectedDoc) || uxDocs[0];
        const response = await fetch(`/markdown/ux/${selectedDocument.path}`);
        
        if (response.ok) {
          const text = await response.text();
          
          // 配置marked选项
          marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true
          });
          
          const html = marked.parse(text);
          setContent(html);
        } else {
          console.error(`无法加载文档 ${selectedDocument.path}:`, response.status);
          setContent('<p>加载文档失败，请稍后再试</p>');
        }
      } catch (error) {
        console.error('加载文档失败:', error);
        setContent('<p>加载文档失败，请稍后再试</p>');
      } finally {
        setIsLoading(false);
      }
    };

    loadDocument();
  }, [selectedDoc]);

  return (
    <div className="document-container">
      <header className="document-header">
        <h1 className="document-title">用户体验设计指南</h1>
        <p className="document-subtitle">CreativePro Studio UX设计原则与实践</p>
        <div className="metadata">
          <div className="metadata-item">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>最后更新：2025-04-29</span>
          </div>
          <div className="metadata-item">
            <FontAwesomeIcon icon={faUser} />
            <span>作者：UX设计团队</span>
          </div>
          <div className="metadata-item">
            <FontAwesomeIcon icon={faCodeBranch} />
            <span>版本：2.0.0</span>
          </div>
        </div>
      </header>
      
      <div className="document-layout">
        <nav className="toc">
          <h2 className="toc-title">文档导航</h2>
          <ul className="toc-list">
            {uxDocs.map(doc => (
              <li key={doc.id} className={`toc-item ${selectedDoc === doc.id ? 'active' : ''}`}>
                <button 
                  className="toc-link"
                  onClick={() => setSelectedDoc(doc.id)}
                >
                  <span>{doc.title}</span>
                </button>
                <p className="toc-description">{doc.description}</p>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="content-area">
          {isLoading ? (
            <div className="loading-container">
              <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
              <p>加载文档中...</p>
            </div>
          ) : (
            <div 
              className="markdown-content" 
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
          
          <div className="document-footer">
            <p>© domiyoung__ 版权所有 | 本文档仅供授权用户参考，未经许可不得分享或转载</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UxGuidelines; 