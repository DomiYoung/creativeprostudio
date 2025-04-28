import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WorkspacePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const panelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-8 right-8 bg-primary text-gray rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-primary-dark focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-tools'}`}></i>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-6"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">开发工作台</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-gray hover:text-red"
              >
                <i className="fas fa-times"></i>
              </motion.button>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-gray6 rounded-lg">
                <h4 className="text-md font-medium mb-2">创建新页面</h4>
                <button className="w-full py-2 bg-primary text-gray font-medium rounded hover:bg-primary-dark transition">
                  <i className="fas fa-plus mr-2"></i> 新建页面
                </button>
              </div>
              
              <div className="p-3 bg-gray6 rounded-lg">
                <h4 className="text-md font-medium mb-2">项目状态</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">已创建页面</span>
                    <span className="text-sm font-medium">8/10</span>
                  </div>
                  <div className="w-full bg-gray5 rounded-full h-2">
                    <div className="bg-green h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-gray6 rounded-lg">
                <h4 className="text-md font-medium mb-2">快速导航</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-sm hover:text-primary flex items-center">
                      <i className="fas fa-file-code mr-2"></i> UI 组件库
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm hover:text-primary flex items-center">
                      <i className="fas fa-palette mr-2"></i> 色彩系统
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm hover:text-primary flex items-center">
                      <i className="fas fa-font mr-2"></i> 字体排版
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm hover:text-primary flex items-center">
                      <i className="fas fa-sitemap mr-2"></i> 页面结构
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="p-3 bg-gray6 rounded-lg">
                <h4 className="text-md font-medium mb-2">最近文档</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-sm hover:text-primary flex items-center">
                      <i className="fas fa-file mr-2"></i> 前端UI规范.md
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm hover:text-primary flex items-center">
                      <i className="fas fa-file-code mr-2"></i> Header.jsx
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WorkspacePanel; 