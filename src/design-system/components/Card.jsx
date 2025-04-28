import React from 'react';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const cardVariants = cva(
  // 基础样式
  "overflow-hidden transition-all",
  {
    variants: {
      // 卡片变体
      variant: {
        default: "bg-white",
        colored: "bg-primary-light",
        transparent: "bg-transparent",
      },
      // 边框
      bordered: {
        true: "border border-gray4",
        false: "border-0",
      },
      // 阴影
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      // 圆角
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      // 动画效果
      interactive: {
        true: "hover:shadow-lg hover:-translate-y-1",
        false: "",
      },
      // 内边距
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
    },
    // 默认值
    defaultVariants: {
      variant: "default",
      bordered: false,
      shadow: "md",
      rounded: "lg",
      interactive: false,
      padding: "md",
    },
  }
);

const Card = React.forwardRef(({
  children,
  className,
  variant,
  bordered,
  shadow,
  rounded,
  interactive,
  padding,
  title,
  footer,
  footerClassName,
  titleClassName,
  bodyClassName,
  onClick,
  ...props
}, ref) => {
  const isClickable = Boolean(onClick) || interactive;
  
  return (
    <motion.div
      ref={ref}
      className={clsx(cardVariants({
        variant,
        bordered,
        shadow,
        rounded,
        interactive,
        padding,
        className,
      }))}
      onClick={onClick}
      whileHover={isClickable ? { scale: 1.01 } : undefined}
      whileTap={isClickable ? { scale: 0.99 } : undefined}
      style={isClickable ? { cursor: 'pointer' } : undefined}
      {...props}
    >
      {title && (
        <div className={clsx("font-semibold text-xl mb-4", titleClassName)}>
          {title}
        </div>
      )}
      
      <div className={clsx("card-body", bodyClassName)}>
        {children}
      </div>
      
      {footer && (
        <div className={clsx("mt-4 pt-4 border-t border-gray4", footerClassName)}>
          {footer}
        </div>
      )}
    </motion.div>
  );
});

Card.displayName = "Card";

export default Card; 