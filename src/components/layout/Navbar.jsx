import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  const tabs = [
    { id: 'home', label: '首页', icon: 'fas fa-home' },
    { id: 'design', label: '设计系统', icon: 'fas fa-palette' },
    { id: 'components', label: '组件库', icon: 'fas fa-cubes' },
    { id: 'docs', label: '文档', icon: 'fas fa-book' },
    { id: 'resources', label: '资源', icon: 'fas fa-box-open' }
  ];
  
  return (
    <motion.nav 
      className="bg-white p-4 shadow-sm mb-6 rounded-lg"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-lg font-semibold text-primary">
            <i className="fas fa-drafting-compass mr-2"></i>
            CreativePro
          </span>
        </motion.div>
        
        <div className="flex items-center space-x-1">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center ${
                activeTab === tab.id ? 'bg-primary text-gray' : 'text-gray hover:bg-gray6'
              }`}
              onClick={() => setActiveTab(tab.id)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </motion.button>
          ))}
        </div>
        
        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button className="h-8 w-8 rounded-full bg-gray6 flex items-center justify-center text-gray hover:bg-gray5 transition">
            <i className="fas fa-search"></i>
          </button>
          <button className="h-8 w-8 rounded-full bg-gray6 flex items-center justify-center text-gray hover:bg-gray5 transition">
            <i className="fas fa-bell"></i>
          </button>
          <div className="h-8 w-8 rounded-full bg-purple text-white flex items-center justify-center">
            <span className="text-xs font-medium">JJ</span>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 