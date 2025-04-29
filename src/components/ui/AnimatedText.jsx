import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const letterVariants = {
  initial: { 
    opacity: 0,
    y: 50,
  },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  hover: (i) => ({
    y: -5,
    color: '#8466e3',
    transition: {
      delay: i * 0.025,
      duration: 0.2,
    },
  }),
};

export default function AnimatedText({
  text,
  className = '',
  once = false,
  repeatDelay = 10,
  as: Component = 'h1',
  color = 'text-gray-800',
  hover = true,
  fontSize = 'text-4xl md:text-6xl',
  fontWeight = 'font-bold',
}) {
  const controls = useAnimation();
  
  // 分割文本为单个字符
  const letters = text.split('');
  
  useEffect(() => {
    // 初始动画
    controls.start('animate');
    
    // 如果不是只播放一次，则设置重复动画
    if (!once) {
      const interval = setInterval(() => {
        controls.start('initial').then(() => {
          setTimeout(() => {
            controls.start('animate');
          }, 200);
        });
      }, repeatDelay * 1000);
      
      return () => clearInterval(interval);
    }
  }, [controls, once, repeatDelay]);
  
  return (
    <Component className={`${fontSize} ${fontWeight} ${color} ${className} tracking-tight leading-tight`}>
      <span className="sr-only">{text}</span>
      <motion.span 
        className="inline-block"
        initial="initial"
        animate={controls}
        whileHover={hover ? "hover" : ""}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            className="inline-block"
            custom={i}
            variants={letterVariants}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
} 