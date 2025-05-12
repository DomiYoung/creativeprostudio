import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { marked } from 'marked';

// 尝试直接导入Markdown文件
// 注意：这需要vite-plugin-markdown配置正确
const importMdFile = async (path) => {
  try {
    // 使用vite-ignore跳过vite的静态分析警告
    // @ts-ignore
    const mdModule = await import(/* @vite-ignore */ `/markdown/ux/${path}`);
    return mdModule.html || mdModule.default || null;
  } catch (error) {
    console.error('导入Markdown文件失败:', error);
    return null;
  }
};

// UX Design System Components
const UXDocumentation = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const location = useLocation();
  
  const uxDocs = [
    { id: 'system', title: '系统蓝图', description: '详细的系统架构、业务领域与技术实现路线图', path: 'DesignSystemOverview.md' },
    { id: 'usability', title: '可用性指南', description: '包含用户体验可用性设计规范和最佳实践', path: 'UsabilityGuidelines.md' },
    { id: 'ia', title: '信息架构', description: '产品信息组织、分类和导航系统设计规范', path: 'InformationArchitecture.md' },
    { id: 'interaction', title: '交互模式', description: '标准交互模式和微交互设计规范', path: 'InteractionPatterns.md' },
    { id: 'visual', title: '视觉设计', description: '视觉设计元素和原则指南', path: 'VisualDesignGuidelines.md' },
    { id: 'materials', title: '素材库', description: 'UX相关素材资源和使用规范', path: 'MaterialLibraryUX.md' },
  ];

  // 页面加载时根据URL路径选择默认文档
  useEffect(() => {
    // 如果URL包含system-blueprint，默认显示系统蓝图
    if (location.pathname.includes('system-blueprint')) {
      setSelectedDoc('system');
    } 
    // 如果没有选中任何文档，默认选择系统蓝图
    else if (!selectedDoc) {
      setSelectedDoc('system');
    }
  }, [location.pathname, selectedDoc]);

  return (
    <div className="flex flex-col p-6 max-w-screen-xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">UX 设计</h1>
        <p className="text-gray-600">
          用户体验设计文档，包含用户旅程地图、信息架构和交互规范，确保产品易用性和一致性。
        </p>
        <div className="mt-4 text-sm text-gray-500">© domiyoung__</div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">文档列表</h2>
            <ul className="space-y-2">
              {uxDocs.map((doc) => (
                <li key={doc.id}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${
                      selectedDoc === doc.id
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedDoc(doc.id)}
                  >
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {doc.description}
                    </div>
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[600px] max-h-[1200px] overflow-y-auto">
            {!selectedDoc ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">选择文档查看</h3>
                <p className="text-gray-500 max-w-md">
                  从左侧列表选择一个文档开始探索我们的用户体验设计系统和规范。
                </p>
              </div>
            ) : (
              <DocumentViewer docId={selectedDoc} docs={uxDocs} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentViewer = ({ docId, docs }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');
  
  const selectedDoc = docs.find(doc => doc.id === docId);

  useEffect(() => {
    setIsLoading(true);
    
    const fetchDocument = async () => {
      try {
        if (selectedDoc) {
          console.log('加载文档:', selectedDoc.path);
          // 从public目录获取Markdown文件
          const response = await fetch(`/markdown/ux/${selectedDoc.path}`);
          
          if (response.ok) {
            const text = await response.text();
            console.log('文档内容长度:', text.length);
            
            // 配置marked选项
            marked.setOptions({
              breaks: true,
              gfm: true,
              headerIds: true
            });
            
            const html = marked.parse(text);
            console.log('HTML内容长度:', html.length);
            setContent(html);
          } else {
            console.error('无法从public目录加载文档:', response.status);
            // 如果在public目录没找到，尝试从源目录加载
            try {
              const rawResponse = await fetch(`/src/design-system/ux/${selectedDoc.path}`);
              if (rawResponse.ok) {
                const rawText = await rawResponse.text();
                const html = marked.parse(rawText);
                setContent(html);
              } else {
                setContent('<p>文档加载失败，请确保文件存在于public/markdown/ux/目录下</p>');
              }
            } catch (innerError) {
              console.error('加载源文件失败:', innerError);
              setContent('<p>文档加载失败，请稍后再试</p>');
            }
          }
        } else {
          setContent('<p>文档不存在或正在建设中...</p>');
        }
      } catch (error) {
        console.error('加载文档失败:', error);
        setContent('<p>加载文档失败，请稍后再试</p>');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDocument();
  }, [docId, selectedDoc]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="prose prose-purple max-w-none">
      <h2 className="text-2xl font-bold mb-6">{selectedDoc?.title}</h2>
      <div 
        className="markdown-content" 
        dangerouslySetInnerHTML={{ __html: content }} 
        style={{ 
          maxHeight: '100%', 
          overflow: 'visible',
          wordBreak: 'break-word' 
        }}
      />
      <div className="mt-8 text-sm text-gray-400">© domiyoung__</div>
    </div>
  );
};

export default UXDocumentation; 