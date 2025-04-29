import React from 'react';
import { 
  ThemeProvider, Button, Card, WaveAnimation, AnimatedText, InteractiveCard, useTheme 
} from './design-system';
import { motion } from 'framer-motion';

// 颜色展示组件
const ColorSwatch = ({ color, name }) => (
  <div className="flex flex-col items-center">
    <div 
      className={`w-16 h-16 rounded-lg mb-2 ${color}`}
      style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}
    ></div>
    <span className="text-xs text-gray-600">{name}</span>
  </div>
);

// 主题切换按钮
const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useTheme();
  
  return (
    <button 
      onClick={toggleColorMode}
      className="fixed top-4 right-4 bg-gray6 dark:bg-gray-800 p-2 rounded-full"
    >
      {colorMode === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

function UIShowcase() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray6 dark:bg-gray-900 transition-colors duration-200">
        <ThemeToggle />
        
        <div className="container mx-auto py-12 px-4">
          <div className="text-center mb-12">
            <AnimatedText
              text="CreativePro 设计系统"
              fontSize="text-4xl md:text-5xl"
              className="mb-4"
              color="text-gray-800 dark:text-white"
            />
            <p className="text-gray dark:text-gray-300 max-w-2xl mx-auto">
              统一的设计系统，结合创意性组件和基础UI组件，符合Apple Human Interface Guidelines。
            </p>
          </div>
          
          {/* 颜色系统 */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">颜色系统</h2>
            <Card
              shadow="md"
              bordered
              padding="lg"
              className="dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-6">
                <ColorSwatch color="bg-primary" name="Primary" />
                <ColorSwatch color="bg-secondary" name="Secondary" />
                <ColorSwatch color="bg-purple" name="Purple" />
                <ColorSwatch color="bg-blue" name="Blue" />
                <ColorSwatch color="bg-green" name="Green" />
                <ColorSwatch color="bg-red" name="Red" />
                <ColorSwatch color="bg-yellow" name="Yellow" />
                <ColorSwatch color="bg-gray" name="Gray" />
              </div>
            </Card>
          </section>
          
          {/* 基础组件 */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">基础组件</h2>
            
            {/* 按钮 */}
            <h3 className="text-xl font-medium mb-4 text-gray-700 dark:text-gray-200">按钮</h3>
            <Card 
              shadow="md"
              bordered
              padding="lg"
              className="mb-8 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">主要按钮</Button>
                <Button variant="secondary">次要按钮</Button>
                <Button variant="outline">边框按钮</Button>
                <Button variant="ghost">幽灵按钮</Button>
                <Button variant="link">链接按钮</Button>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <Button variant="primary" size="xs">超小</Button>
                <Button variant="primary" size="sm">小</Button>
                <Button variant="primary" size="md">中</Button>
                <Button variant="primary" size="lg">大</Button>
                <Button variant="primary" size="xl">超大</Button>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <Button 
                  variant="primary"
                  leftIcon={<span className="text-sm">👋</span>}
                >
                  左侧图标
                </Button>
                <Button 
                  variant="secondary"
                  rightIcon={<span className="text-sm">🚀</span>}
                >
                  右侧图标
                </Button>
                <Button variant="primary" disabled>禁用按钮</Button>
              </div>
            </Card>
            
            {/* 卡片 */}
            <h3 className="text-xl font-medium mb-4 text-gray-700 dark:text-gray-200">卡片</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card
                title="标准卡片"
                shadow="md"
                bordered
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                卡片内容可以包含文本、图片或其他组件。
              </Card>
              
              <Card
                title="交互式卡片"
                interactive
                shadow="sm"
                bordered
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                悬停时会有微小的动画效果。尝试将鼠标放在这张卡片上。
              </Card>
              
              <Card
                title="带页脚的卡片"
                shadow="md"
                bordered
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                footer={
                  <div className="flex justify-end">
                    <Button variant="primary" size="sm">确认</Button>
                  </div>
                }
              >
                这张卡片底部有操作按钮区域。
              </Card>
            </div>
          </section>
          
          {/* 创意组件 */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">创意组件</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 波浪动画 */}
              <Card
                title="波浪动画"
                shadow="md"
                bordered
                padding="sm"
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <WaveAnimation 
                  height="200px" 
                  bgColor={useTheme().colorMode === 'dark' ? '#1c0c50' : '#8466e3'} 
                  waveColor={useTheme().colorMode === 'dark' ? '#8466e3' : '#1c0c50'} 
                />
              </Card>
              
              {/* 文字动画 */}
              <Card
                title="文字动画"
                shadow="md"
                bordered
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <div className="p-6 flex justify-center items-center h-[200px]">
                  <AnimatedText 
                    text="创意文字" 
                    fontSize="text-4xl" 
                    color={useTheme().colorMode === 'dark' ? 'text-white' : 'text-gray-800'}
                    repeatDelay={3}
                  />
                </div>
              </Card>
              
              {/* 3D交互卡片 */}
              <Card
                title="3D交互卡片"
                shadow="md"
                bordered
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                padding="sm"
              >
                <div className="p-4">
                  <InteractiveCard
                    maxTilt={15}
                    glareOpacity={0.2}
                    bgColor={useTheme().colorMode === 'dark' ? 'bg-gray-700' : 'bg-white'}
                    className="p-6"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">✨</div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-white">
                        3D效果卡片
                      </h3>
                      <p className="text-gray dark:text-gray-300">
                        移动鼠标来查看3D效果和光泽反射
                      </p>
                    </div>
                  </InteractiveCard>
                </div>
              </Card>
              
              {/* 运动效果 */}
              <Card
                title="运动效果"
                shadow="md"
                bordered
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <div className="p-6 flex flex-col items-center justify-center h-[200px] gap-6">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="w-20 h-20 bg-purple rounded-lg flex items-center justify-center text-white text-2xl"
                  >
                    🚀
                  </motion.div>
                  <p className="text-gray dark:text-gray-300 text-center">
                    使用Framer Motion实现的连续动画效果
                  </p>
                </div>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default UIShowcase; 