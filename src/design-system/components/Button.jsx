import React from 'react';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// 定义按钮变体
const buttonVariants = cva(
  // 基础样式
  "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50",
  {
    variants: {
      // 按钮风格
      variant: {
        primary: "bg-purple text-white hover:bg-purple/90 focus-visible:ring-purple/50",
        secondary: "bg-gray5 text-gray hover:bg-gray4 focus-visible:ring-gray/30",
        outline: "border border-gray3 bg-white text-gray hover:bg-gray6 focus-visible:ring-gray/20",
        ghost: "bg-transparent text-gray hover:bg-gray6 hover:text-gray",
        link: "bg-transparent text-blue underline-offset-4 hover:underline p-0 height-auto",
      },
      // 按钮尺寸
      size: {
        xs: "text-xs px-2 py-1",
        sm: "text-sm px-3 py-2",
        md: "text-md px-4 py-2",
        lg: "text-lg px-5 py-2.5",
        xl: "text-xl px-6 py-3",
      },
      // 按钮是否占满父元素宽度
      fullWidth: {
        true: "w-full",
      },
      // 按钮是否有禁用状态
      disabled: {
        true: "opacity-50 cursor-not-allowed",
      },
      // 按钮是否有图标
      hasIcon: {
        true: "gap-2",
      },
    },
    // 默认值
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      disabled: false,
      hasIcon: false,
    },
  }
);

const Button = React.forwardRef(({
  children,
  className,
  variant,
  size,
  fullWidth,
  disabled,
  leftIcon,
  rightIcon,
  onClick,
  type = "button",
  ...props
}, ref) => {
  const hasIcon = Boolean(leftIcon || rightIcon);

  return (
    <motion.button
      ref={ref}
      type={type}
      className={clsx(
        buttonVariants({
          variant,
          size,
          fullWidth,
          disabled,
          hasIcon,
          className,
        })
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      {...props}
    >
      {leftIcon && <span className="inline-flex">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="inline-flex">{rightIcon}</span>}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button; 