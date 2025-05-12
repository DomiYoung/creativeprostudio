import React, { useState } from 'react';
import { Box, Flex, Badge, useMediaQuery } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/color-mode';
import { motion } from 'framer-motion';

const ProductConcept = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [activeConcept, setActiveConcept] = useState(0);

  // 样式变量
  const textColor = isDark ? '#E2E8F0' : '#1D1D1F';
  const bgColor = isDark ? '#1A202C' : '#FFFFFF';
  const secondaryTextColor = isDark ? '#A0AEC0' : '#86868B';
  const borderColor = isDark ? '#2D3748' : '#E5E5E7';
  const primaryColor = isDark ? '#B794F4' : '#F5E1D9';
  const secondaryColor = isDark ? '#D53F8C' : '#FFB5C5';
  const accentColor = isDark ? '#4FD1C5' : '#B6E5D8';
  const gradientBg = isDark 
    ? 'linear-gradient(135deg, rgba(183, 148, 244, 0.1) 0%, rgba(213, 63, 140, 0.1) 50%, rgba(79, 209, 197, 0.1) 100%)'
    : 'linear-gradient(135deg, rgba(245, 225, 217, 0.2) 0%, rgba(255, 181, 197, 0.2) 50%, rgba(182, 229, 216, 0.2) 100%)';

  // 产品概念数据
  const productConcepts = [
    {
      id: 'virtual-makeup',
      name: 'AI虚拟妆容工作室',
      tagline: '用AI重新定义你的美妆体验',
      description: '一个基于AI的虚拟妆容试用平台，允许用户通过摄像头实时尝试不同的妆容效果，分享创作，并直接购买所使用的产品。',
      keyFeatures: [
        {
          name: 'AI妆容识别与推荐',
          description: '通过AI分析用户面部特征，提供个性化妆容推荐和适合的产品建议',
          icon: '🤖'
        },
        {
          name: '实时虚拟试妆',
          description: '高精度AR技术，让用户可以实时看到不同妆容在自己脸上的效果',
          icon: '🔄'
        },
        {
          name: '社区创作与分享',
          description: '用户可以创建自己的妆容设计，分享给社区，并获得其他用户的反馈',
          icon: '👥'
        },
        {
          name: '无缝购物体验',
          description: '用户满意效果后，可一键查看并购买所有用于创建该妆容的产品',
          icon: '🛍️'
        },
        {
          name: '妆容教程与技巧',
          description: '为不同妆容提供专业化、个性化的步骤指导和技巧分享',
          icon: '📚'
        }
      ],
      uniqueSellingPoints: [
        '基于TensorFlow.js的高精度面部识别和妆容映射',
        '个性化AI算法，根据用户肤色、脸型提供最佳效果',
        '社交分享功能，支持一键分享到各大社交平台',
        '虚拟与实物的无缝连接，从虚拟试用到实际购买'
      ],
      targetMarket: '18-25岁追求个性化美妆体验的Z世代女性，热衷于社交媒体分享和新技术尝试',
      techFeasibility: 'React.js (Next.js)前端可实现流畅的UI交互，TensorFlow.js支持客户端AI计算，.NET Core后端处理用户数据和产品信息'
    },
    {
      id: 'beauty-community',
      name: '美妆社区平台',
      tagline: '发现、分享、定义你的美',
      description: '一个专注于美妆和潮流的社区平台，用户可以发现最新趋势、分享自己的妆容心得，与志同道合的人交流互动。',
      keyFeatures: [
        {
          name: '个性化内容推送',
          description: 'AI算法根据用户兴趣和浏览历史，推荐相关的美妆内容和产品',
          icon: '📱'
        },
        {
          name: '短视频创作工具',
          description: '内置专业美妆短视频编辑工具，支持各种特效和滤镜',
          icon: '🎬'
        },
        {
          name: '话题挑战与活动',
          description: '定期举办美妆话题挑战，鼓励用户参与创作和互动',
          icon: '🏆'
        },
        {
          name: '达人认证系统',
          description: '专业美妆达人认证，提供更高曝光度和品牌合作机会',
          icon: '⭐'
        },
        {
          name: '产品评测与推荐',
          description: '用户可以分享真实使用体验，帮助他人做出购买决策',
          icon: '💯'
        }
      ],
      uniqueSellingPoints: [
        '整合社交媒体特性与电商功能，创造沉浸式美妆社区',
        '专注于Z世代审美与交互习惯，设计符合目标用户的UI/UX',
        'AI驱动的内容发现系统，提高用户内容曝光率',
        '与美妆品牌的深度合作，提供独家内容和产品'
      ],
      targetMarket: '热爱分享和社交的18-25岁年轻女性，追求美妆潮流，希望获得社区认可',
      techFeasibility: 'React.js适合构建响应式社交界面，.NET Core提供稳定的API服务，可集成第三方AI服务进行内容推荐'
    },
    {
      id: 'personalized-ecommerce',
      name: '个性化美妆电商',
      tagline: '为你的独特风格量身定制',
      description: '一个高度个性化的美妆电商平台，通过AI分析用户肤质、风格偏好，提供定制化的产品推荐和购物体验。',
      keyFeatures: [
        {
          name: 'AI肤质分析',
          description: '通过上传照片，AI分析用户肤质状况，推荐最适合的护肤产品',
          icon: '📊'
        },
        {
          name: '个性化产品推荐',
          description: '基于用户历史偏好、肤质和季节变化，智能推荐产品',
          icon: '🎯'
        },
        {
          name: '虚拟妆容搭配',
          description: '用户可以虚拟尝试不同产品组合效果，找到最适合的搭配',
          icon: '💄'
        },
        {
          name: '订阅制妆盒',
          description: '基于个人偏好定期配送个性化美妆产品盒',
          icon: '📦'
        },
        {
          name: '社区反馈与评价',
          description: '查看相似肤质和风格用户的真实评价和使用效果',
          icon: '📝'
        }
      ],
      uniqueSellingPoints: [
        'AI驱动的个性化推荐系统，提高产品匹配度',
        '3D虚拟试用功能，减少购买失误',
        '数据驱动的用户画像，持续优化推荐算法',
        '社区与电商的无缝结合，提高转化率'
      ],
      targetMarket: '注重个性化体验、愿意为适合自己的产品支付溢价的18-25岁Z世代女性',
      techFeasibility: 'React.js可实现流畅的电商界面，.NET Core提供稳定的后端服务，集成AI服务进行肤质分析和产品匹配'
    }
  ];

  // 动画变量
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
      lineHeight: '1.6',
      color: textColor,
      backgroundColor: isDark ? '#171923' : '#F9FAFB',
      padding: '24px',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: bgColor,
        borderRadius: '12px',
        boxShadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 背景装饰 */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '300px',
          height: '300px',
          background: gradientBg,
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.6,
          zIndex: 0
        }}></div>
        
        <header style={{
          marginBottom: '32px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: '32px',
              fontWeight: '600',
              marginBottom: '16px',
              color: textColor
            }}>
            产品概念探索
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: '16px',
              color: secondaryTextColor,
              marginBottom: '24px',
              maxWidth: '700px',
              margin: '0 auto 24px'
            }}>
            为18-25岁Z世代女性用户打造创新美妆与潮流相关Web产品概念，
            突出创意性视觉效果与AI驱动的流程优化
          </motion.p>
        </header>

        {/* 概念选择器 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '40px',
          position: 'relative',
          zIndex: 1,
          flexWrap: isMobile ? 'wrap' : 'nowrap'
        }}>
          {productConcepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveConcept(index)}
              style={{
                padding: '16px 20px',
                borderRadius: '8px',
                backgroundColor: activeConcept === index 
                  ? (index === 0 ? primaryColor : index === 1 ? secondaryColor : accentColor) 
                  : isDark ? 'rgba(26, 32, 44, 0.6)' : 'rgba(247, 250, 252, 0.8)',
                border: `1px solid ${borderColor}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flex: isMobile ? '1 1 100%' : '1',
                color: activeConcept === index 
                  ? (isDark ? '#1A202C' : '#FFFFFF')
                  : textColor,
                fontWeight: activeConcept === index ? '600' : '400',
                textAlign: 'center',
                boxShadow: activeConcept === index 
                  ? (isDark ? '0 4px 12px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.15)')
                  : 'none'
              }}
            >
              {concept.name}
            </motion.div>
          ))}
        </div>

        {/* 当前概念详情 */}
        <motion.section
          key={productConcepts[activeConcept].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'relative',
            zIndex: 1
          }}
        >
          <div style={{
            padding: '24px',
            borderRadius: '12px',
            backgroundColor: isDark ? 'rgba(26, 32, 44, 0.6)' : 'rgba(247, 250, 252, 0.6)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${borderColor}`,
            marginBottom: '32px'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              marginBottom: '8px',
              color: textColor
            }}>
              {productConcepts[activeConcept].name}
            </h2>
            <p style={{
              fontSize: '18px',
              fontWeight: '500',
              marginBottom: '16px',
              color: activeConcept === 0 ? (isDark ? '#B794F4' : '#F5E1D9') 
                : activeConcept === 1 ? (isDark ? '#D53F8C' : '#FFB5C5') 
                : (isDark ? '#4FD1C5' : '#B6E5D8') 
            }}>
              {productConcepts[activeConcept].tagline}
            </p>
            <p style={{
              fontSize: '16px',
              marginBottom: '24px',
              maxWidth: '800px'
            }}>
              {productConcepts[activeConcept].description}
            </p>
          </div>

          {/* 核心功能 */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '16px',
              color: textColor,
              paddingBottom: '8px',
              borderBottom: `1px solid ${borderColor}`
            }}>
              核心功能
            </h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px'
              }}
            >
              {productConcepts[activeConcept].keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: isDark ? 'rgba(26, 32, 44, 0.4)' : 'white',
                    border: `1px solid ${borderColor}`,
                    boxShadow: isDark ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{
                    fontSize: '28px',
                    marginBottom: '12px'
                  }}>
                    {feature.icon}
                  </div>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: textColor
                  }}>
                    {feature.name}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: secondaryTextColor
                  }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* 独特卖点 */}
          <div style={{ 
            marginBottom: '32px',
            backgroundColor: isDark ? 'rgba(26, 32, 44, 0.4)' : 'white',
            padding: '24px',
            borderRadius: '8px',
            border: `1px solid ${borderColor}`,
            boxShadow: isDark ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '16px',
              color: textColor
            }}>
              独特卖点
            </h3>
            <ul style={{
              paddingLeft: '20px'
            }}>
              {productConcepts[activeConcept].uniqueSellingPoints.map((point, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ 
                    marginBottom: '12px',
                    position: 'relative'
                  }}
                >
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 市场潜力与技术可行性 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div style={{
              backgroundColor: isDark ? 'rgba(183, 148, 244, 0.1)' : 'rgba(245, 225, 217, 0.2)',
              padding: '24px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '16px',
                color: textColor
              }}>
                目标市场
              </h3>
              <p>
                {productConcepts[activeConcept].targetMarket}
              </p>
            </div>
            <div style={{
              backgroundColor: isDark ? 'rgba(79, 209, 197, 0.1)' : 'rgba(182, 229, 216, 0.2)',
              padding: '24px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '16px',
                color: textColor
              }}>
                技术可行性
              </h3>
              <p>
                {productConcepts[activeConcept].techFeasibility}
              </p>
            </div>
          </div>
        </motion.section>

        <footer style={{
          marginTop: '40px',
          textAlign: 'center',
          color: secondaryTextColor,
          fontSize: '14px',
          position: 'relative',
          zIndex: 1
        }}>
          <p>© domiyoung__ - 版权所有</p>
        </footer>
      </div>
    </div>
  );
};

export default ProductConcept; 