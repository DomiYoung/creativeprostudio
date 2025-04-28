import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveCard({
  children,
  className = '',
  bgColor = 'bg-white',
  borderRadius = 'rounded-xl',
  padding = 'p-6',
  shadow = 'shadow-lg',
  hoverShadow = 'shadow-xl',
  border = 'border border-gray-100',
  maxTilt = 5, // 最大倾斜度数
  perspective = 1000, // 透视效果
  transitionSpeed = 0.15, // 过渡速度
  glare = true, // 是否添加光泽效果
  glareOpacity = 0.15, // 光泽不透明度
  height,
  width,
  onClick
}) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  
  // 处理鼠标移动事件
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // 计算鼠标相对于卡片中心的位置 (-1 到 1 范围)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // 设置旋转角度
    setRotation({
      x: -y * maxTilt,
      y: x * maxTilt
    });
    
    // 更新光泽位置
    setGlarePosition({
      x: (100 * x) + 50,
      y: (100 * y) + 50
    });
  };
  
  // 鼠标离开时重置
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`${className} ${bgColor} ${borderRadius} ${padding} ${border} overflow-hidden relative`}
      style={{
        height,
        width,
        perspective: `${perspective}px`,
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        boxShadow: isHovered 
          ? '0 15px 30px rgba(0, 0, 0, 0.12), 0 8px 12px rgba(0, 0, 0, 0.08)'
          : '0 10px 15px rgba(0, 0, 0, 0.04), 0 4px 6px rgba(0, 0, 0, 0.03)',
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 15,
        duration: transitionSpeed
      }}
    >
      {/* 内容 */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* 光泽效果 */}
      {glare && isHovered && (
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            borderRadius: 'inherit',
          }}
        >
          <div
            className="absolute w-[200%] h-[200%] bg-gradient-radial from-white to-transparent opacity-0"
            style={{
              top: `calc(${glarePosition.y}% - 100%)`,
              left: `calc(${glarePosition.x}% - 100%)`,
              opacity: glareOpacity,
              transformOrigin: 'center center',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        </div>
      )}
    </motion.div>
  );
} 