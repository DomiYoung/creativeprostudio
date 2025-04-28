import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="text-center text-gray text-sm mt-2xl py-lg border-t border-gray5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <p>© 2025 CreativePro Studio | AI赋能内容创作平台 | 版权所有: @domiyoung___</p>
    </motion.footer>
  );
};

export default Footer; 