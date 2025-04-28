import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../design-system';

/**
 * 文档查看器组件 - 用于在React应用中显示静态HTML文档
 */
const DocumentFrame = () => {
  const { document: docName } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';

  // 加载文档内容
  useEffect(() => {
    if (!docName) {
      setError('未指定文档名称');
      setLoading(false);
      return;
    }

    // 设置iframe加载事件
    const handleIframeLoad = () => {
      setLoading(false);
    };

    const iframe = document.getElementById('document-frame');
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      iframe.addEventListener('error', () => {
        setError('文档加载失败');
        setLoading(false);
      });
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, [docName]);

  // 返回按钮处理
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray6'}`}>
      {/* 顶部导航 */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-16 backdrop-blur-lg z-20 
                    shadow-sm ${isDark ? 'bg-gray-900/70' : 'bg-white/70'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center">
            <motion.button
              className={`mr-4 p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray6'}`}
              onClick={handleBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={`fas fa-arrow-left ${isDark ? 'text-white' : 'text-gray-800'}`}></i>
            </motion.button>
            <div className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center 
              ${isDark ? 'bg-purple/20' : 'bg-indigo/20'}`}>
              <i className={`fas fa-book text-sm ${isDark ? 'text-purple-300' : 'text-indigo'}`}></i>
            </div>
            <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {docName ? docName.replace('.html', '') : '文档查看器'}
            </span>
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray'}`}>
            CreativePro Studio · 文档中心
          </div>
        </div>
      </motion.div>

      {/* 文档显示区域 */}
      <div className="pt-20 pb-6 px-6 container mx-auto">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className={`w-10 h-10 rounded-full border-4 
              ${isDark ? 'border-purple/20 border-t-purple' : 'border-indigo/20 border-t-indigo'} 
              animate-spin`}></div>
          </div>
        )}

        {error && (
          <motion.div 
            className={`text-center py-20 ${isDark ? 'text-gray-300' : 'text-gray'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <i className="fas fa-exclamation-triangle text-4xl mb-4 text-red"></i>
            <h2 className="text-2xl font-bold mb-2">文档加载失败</h2>
            <p className="mb-6">{error}</p>
            <button 
              className={`px-4 py-2 rounded-lg 
                ${isDark ? 'bg-purple text-white' : 'bg-indigo text-white'}`}
              onClick={handleBack}
            >
              返回文档中心
            </button>
          </motion.div>
        )}

        {!loading && !error && (
          <div className={`rounded-xl overflow-hidden shadow-lg 
            ${isDark ? 'bg-gray-800 shadow-gray-900/50' : 'bg-white shadow-gray3/20'}`}>
            <iframe
              id="document-frame"
              src={`/pages/${docName}`}
              className="w-full h-[calc(100vh-140px)] border-0"
              title={docName}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentFrame; 