import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../design-system';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const navigate = useNavigate();
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray6'} flex items-center justify-center`}>
      <div className="container px-6 py-12 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-8 
            ${isDark ? 'bg-purple/20 text-purple-300' : 'bg-indigo/20 text-indigo'}`}
          >
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          
          <h1 className={`text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            404
          </h1>
          
          <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-700'}`}>
            页面未找到
          </h2>
          
          <p className={`text-lg max-w-xl mx-auto mb-8 ${isDark ? 'text-gray-300' : 'text-gray'}`}>
            很抱歉，您尝试访问的页面不存在或已被移动。请返回文档中心重新浏览。
          </p>
          
          <motion.button
            className={`px-6 py-3 rounded-lg font-medium ${
              isDark ? 'bg-purple hover:bg-purple/90 text-white' : 
                      'bg-indigo hover:bg-indigo/90 text-white'
            }`}
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            返回文档中心
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound; 