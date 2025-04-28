import React from 'react';
import WaveAnimation from './components/ui/WaveAnimation';
import AnimatedText from './components/ui/AnimatedText';
import InteractiveCard from './components/ui/InteractiveCard';
import { motion } from 'framer-motion';

export default function CreativeDemo() {
  const features = [
    {
      id: 1,
      title: "智能音乐创作",
      description: "利用AI技术，根据简短描述自动生成专业品质的音乐作品。",
      icon: "🎵"
    },
    {
      id: 2,
      title: "风格转换",
      description: "一键转换音乐风格，从古典到电子，再到爵士，满足不同场景需求。",
      icon: "🔄"
    },
    {
      id: 3,
      title: "实时协作",
      description: "与其他艺术家实时合作，共同编辑和完善音乐作品。",
      icon: "👥"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* 顶部导航 */}
      <nav className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-purple text-white p-2 rounded-lg">AI</div>
          <span className="font-semibold text-gray-800">MusicStudio</span>
        </div>

        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">功能</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">价格</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">案例</a>
          <button className="bg-purple text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
            立即体验
          </button>
        </div>
      </nav>

      {/* 英雄区域 */}
      <header className="max-w-6xl mx-auto pt-20 pb-16 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimatedText 
              text="AI驱动的音乐创作体验" 
              className="mb-6"
              color="text-gray-800"
              fontSize="text-5xl md:text-6xl"
            />
            
            <motion.p 
              className="text-gray-600 text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              只需几次点击，即可转换音乐风格、调整节奏和更换乐器，实时打造专属音乐作品。
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <button className="bg-purple hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium">
                免费试用
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium">
                了解更多
              </button>
            </motion.div>
          </div>
          
          <div>
            <WaveAnimation 
              height="400px" 
              bgColor="#1c0c50" 
              waveColor="#8466e3" 
            />
          </div>
        </div>
      </header>

      {/* 特性展示 */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <AnimatedText 
          text="革命性音乐创作体验" 
          className="text-center mb-16"
          as="h2"
          fontSize="text-3xl md:text-4xl"
          once={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <InteractiveCard 
                className="h-full"
                bgColor="bg-white"
                maxTilt={10}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 体验区 */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedText 
              text="立即体验AI音乐创作" 
              as="h2"
              fontSize="text-3xl md:text-4xl"
              once={true}
            />
            <motion.p
              className="text-gray-600 mt-4 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              加入全球超过10,000名创作者的行列，用AI技术释放你的音乐潜能
            </motion.p>
          </div>
          
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center p-10">
              <div className="text-5xl mb-6">🎧</div>
              <h3 className="text-2xl font-semibold mb-2">免费开始音乐创作</h3>
              <p className="text-gray-600 text-center mb-6">无需信用卡，立即获得AI音乐创作工具</p>
              <button className="bg-purple hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium">
                开始创作
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="bg-purple p-2 rounded-lg">AI</div>
                <span className="font-semibold">MusicStudio</span>
              </div>
              <p className="text-gray-400 mt-2">用AI重新定义音乐创作</p>
            </div>
            
            <div className="flex flex-wrap gap-8">
              <div>
                <h4 className="font-medium mb-3">产品</h4>
                <ul className="text-gray-400 space-y-2">
                  <li><a href="#" className="hover:text-white">功能</a></li>
                  <li><a href="#" className="hover:text-white">价格</a></li>
                  <li><a href="#" className="hover:text-white">案例</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">资源</h4>
                <ul className="text-gray-400 space-y-2">
                  <li><a href="#" className="hover:text-white">文档</a></li>
                  <li><a href="#" className="hover:text-white">博客</a></li>
                  <li><a href="#" className="hover:text-white">教程</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">联系我们</h4>
                <ul className="text-gray-400 space-y-2">
                  <li><a href="#" className="hover:text-white">support@aimusic.com</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            © 2025 AI MusicStudio. 保留所有权利
          </div>
        </div>
      </footer>
    </div>
  );
}