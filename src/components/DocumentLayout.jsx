import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Tag } from 'react-feather';
import '../styles/DocumentPage.css';

/**
 * 通用文档布局组件
 * @param {Object} props
 * @param {string} props.title - 文档标题
 * @param {string} props.subtitle - 文档副标题（可选）
 * @param {Array} props.metadata - 元数据项目数组（可选）
 * @param {Array} props.tableOfContents - 目录项目数组（可选）
 * @param {React.ReactNode} props.children - 文档内容
 */
const DocumentLayout = ({ 
  title,
  subtitle,
  metadata = [],
  tableOfContents = [],
  children
}) => {
  return (
    <div className="document-page">
      {/* 返回导航 */}
      <div className="document-back-navigation">
        <Link to="/doccenter" className="back-button">
          <ChevronLeft size={20} />
          <span>返回文档中心</span>
        </Link>
      </div>

      {/* 文档头部 */}
      <header className="document-header">
        <h1 className="document-title">{title}</h1>
        {subtitle && <p className="document-subtitle">{subtitle}</p>}

        {/* 元数据显示 */}
        {metadata.length > 0 && (
          <div className="document-metadata">
            {metadata.map((item, index) => (
              <div key={index} className="metadata-item">
                {item.type === 'date' && <Calendar size={16} />}
                {item.type === 'author' && <User size={16} />}
                {item.type === 'tag' && <Tag size={16} />}
                <span className="metadata-label">{item.label}:</span>
                <span className="metadata-value">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* 主内容区域 */}
      <div className="document-content-wrapper">
        {/* 侧边栏 */}
        {tableOfContents.length > 0 && (
          <aside className="document-sidebar">
            <div className="sidebar-sticky">
              <div className="document-toc">
                <h2 className="toc-title">目录</h2>
                <ul className="toc-list">
                  {tableOfContents.map((item, index) => (
                    <li key={index} className="toc-item">
                      <a href={`#${item.id}`} className="toc-link">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        )}

        {/* 主要内容 */}
        <main className="document-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DocumentLayout; 