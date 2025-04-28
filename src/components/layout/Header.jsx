import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      className="mb-xl text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.h1 
        className="text-2xl font-semibold mb-md tracking-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        CreativePro Studio 文档中心
      </motion.h1>
      <motion.p 
        className="subtitle text-md text-gray max-w-[600px] mx-auto mb-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        集成设计、开发和文档资源，提供完整的产品设计解决方案
      </motion.p>
    </motion.header>
  );
}

export default Header; 