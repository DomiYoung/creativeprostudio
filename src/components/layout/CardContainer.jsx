import React from 'react';
import { motion } from 'framer-motion';

const CardContainer = ({ title, children }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section>
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default CardContainer; 