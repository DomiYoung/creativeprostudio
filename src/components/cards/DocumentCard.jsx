import React from 'react';
import { motion } from 'framer-motion';

const DocumentCard = ({ 
  icon,
  iconClass,
  title,
  description,
  meta,
  date,
  isNew,
  isUpdated,
  link 
}) => {
  // 动画变体
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      className="card"
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.03)" }}
      whileTap={{ y: -2, boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)" }}
      onClick={() => window.location.href = link}
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = link;
        }
      }}
    >
      {isNew && <div className="new-badge">新</div>}
      {isUpdated && <div className="updated-badge">更新</div>}
      
      <div className="card-header">
        <motion.div 
          className={`icon-container ${iconClass}`}
          whileHover={{ scale: 1.1 }}
        >
          <i className={icon}></i>
        </motion.div>
      </div>
      
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <div className="card-meta">
          <div className="meta-count">
            <i className={meta.icon}></i>
            <span>{meta.text}</span>
          </div>
          <span>{date}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentCard; 