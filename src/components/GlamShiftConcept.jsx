import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// 样式组件
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  color: #1D1D1F;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled(motion.h1)`
  font-family: 'Poppins', 'SF Pro Display', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #A78BFA 0%, #EC4899 50%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #86868B;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureImage = styled.div`
  height: 200px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
  }
`;

const FeatureIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const FeatureContent = styled.div`
  padding: 2rem;
`;

const FeatureName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1D1D1F;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #4A4A4A;
  margin-bottom: 1rem;
`;

const ValueProposition = styled.section`
  background: linear-gradient(to right, rgba(167, 139, 250, 0.1), rgba(236, 72, 153, 0.1));
  border-radius: 16px;
  padding: 3rem 2rem;
  margin: 4rem 0;
`;

const ValueTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  color: #1D1D1F;
`;

const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ValueName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1D1D1F;
`;

const ValueDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #4A4A4A;
`;

const UserSection = styled.section`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin: 4rem 0;
  
  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1D1D1F;
`;

const UserDescription = styled.div`
  font-size: 1rem;
  line-height: 1.8;
  color: #4A4A4A;
`;

const UserTrait = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  &:before {
    content: '•';
    color: #EC4899;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-right: 0.5rem;
  }
`;

const UserAvatar = styled(motion.div)`
  flex: 1;
  position: relative;
  
  img {
    width: 100%;
    max-width: 400px;
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100%;
    height: 100%;
    border-radius: 24px;
    background: linear-gradient(45deg, #A78BFA 0%, #EC4899 100%);
    z-index: -1;
  }
`;

const CallToAction = styled.div`
  text-align: center;
  margin: 6rem 0 3rem 0;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1D1D1F;
`;

const CTADescription = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto 2rem auto;
  color: #4A4A4A;
  line-height: 1.6;
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 1rem 2.5rem;
  background: linear-gradient(90deg, #A78BFA 0%, #EC4899 100%);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(236, 72, 153, 0.3);
  cursor: pointer;
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 6rem;
  font-size: 0.9rem;
  color: #86868B;
`;

const GlamShiftConcept = () => {
  // 定义核心功能
  const features = [
    {
      id: 'ai-lab',
      name: 'AI妆容试验室',
      description: '上传自拍，AI智能分析面部特征，提供个性化妆容推荐与实时预览，找到完美匹配你的妆容风格。',
      icon: '🤖',
      image: 'https://source.unsplash.com/ENOlKqyQhGw/800x600'
    },
    {
      id: 'community',
      name: '趋势妆容社区',
      description: '基于兴趣的妆容风格社区，发现最新潮流，分享短视频创作，与志同道合的美妆爱好者互动交流。',
      icon: '👥',
      image: 'https://source.unsplash.com/DgQf1dUKUTM/800x600'
    },
    {
      id: 'shopping',
      name: '智能购物助手',
      description: 'AI识别喜爱妆容，智能推荐产品组合与替代方案，一键获取完整产品清单，告别盲目购物。',
      icon: '🛍️',
      image: 'https://source.unsplash.com/bBiuSdck8tU/800x600'
    },
    {
      id: 'ar-studio',
      name: 'AR虚拟试妆间',
      description: '3D虚拟试妆体验，支持不同光线条件下妆效模拟，确保你的妆容在各种场景下都完美呈现。',
      icon: '✨',
      image: 'https://source.unsplash.com/CLTI5-LbvbE/800x600'
    },
    {
      id: 'memory',
      name: '妆容记忆库',
      description: '个人妆容收藏与记录系统，跟踪妆容演变与季节变化，建立专属于你的美妆历程。',
      icon: '📚',
      image: 'https://source.unsplash.com/uaJLLnQiuuA/800x600'
    },
    {
      id: 'tutorials',
      name: '互动妆容教程',
      description: '专业美妆达人分享高质量步骤教程，结合AI辅助指导，让你轻松掌握复杂妆容技巧。',
      icon: '📝',
      image: 'https://source.unsplash.com/1K9T5YiZ2WU/800x600'
    }
  ];
  
  // 定义价值主张
  const values = [
    {
      id: 'personalization',
      name: '个性化体验',
      description: '根据面部特征、肤色和个人风格，提供量身定制的妆容推荐和产品建议。',
      icon: '🎯'
    },
    {
      id: 'confidence',
      name: '提升自信',
      description: '在购买前虚拟试用，减少决策焦虑，增强选择信心。',
      icon: '💪'
    },
    {
      id: 'community',
      name: '社区归属感',
      description: '连接相似风格爱好者，创建支持性社区，共同探索美妆世界。',
      icon: '🤝'
    },
    {
      id: 'innovation',
      name: '创新体验',
      description: '运用前沿AR/AI技术，打造沉浸式、互动性的美妆体验。',
      icon: '🔮'
    }
  ];
  
  return (
    <Container>
      <Header>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          魅影妆容社区
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          GlamShift—融合社交分享、AI试妆与智能购物体验的美妆探索平台，为Z世代创造个性化、沉浸式的美妆旅程。
        </Subtitle>
      </Header>
      
      <FeatureGrid>
        {features.map((feature, index) => (
          <FeatureCard 
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FeatureImage src={feature.image}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
            </FeatureImage>
            <FeatureContent>
              <FeatureName>{feature.name}</FeatureName>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureContent>
          </FeatureCard>
        ))}
      </FeatureGrid>
      
      <ValueProposition>
        <ValueTitle>我们的价值主张</ValueTitle>
        <ValueGrid>
          {values.map((value, index) => (
            <ValueCard
              key={value.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ValueIcon>{value.icon}</ValueIcon>
              <ValueName>{value.name}</ValueName>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueCard>
          ))}
        </ValueGrid>
      </ValueProposition>
      
      <UserSection>
        <UserInfo>
          <UserTitle>认识我们的核心用户</UserTitle>
          <UserDescription>
            <UserTrait>22岁，大学生/初入职场</UserTrait>
            <UserTrait>热爱尝试新妆容，但希望有"安全网"</UserTrait>
            <UserTrait>社交媒体活跃用户，重视独特性与表达自我</UserTrait>
            <UserTrait>注重性价比，被体验和社区认同感吸引</UserTrait>
            <UserTrait>痛点：难以判断妆容适合度，购买决策困难</UserTrait>
            <UserTrait>常用平台：Instagram、TikTok、小红书</UserTrait>
            <UserTrait>购物习惯：线上研究，线下体验，最终多在线上完成购买</UserTrait>
          </UserDescription>
        </UserInfo>
        <UserAvatar
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src="https://source.unsplash.com/O_XIvDy0pcs/600x800" alt="Z世代女性用户" />
        </UserAvatar>
      </UserSection>
      
      <CallToAction>
        <CTATitle>开启你的美妆探索之旅</CTATitle>
        <CTADescription>
          加入魅影妆容社区，体验AI驱动的个性化美妆推荐，找到完美适合你的妆容风格，与志同道合的美妆爱好者一起创造和分享。
        </CTADescription>
        <CTAButton 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          立即体验
        </CTAButton>
      </CallToAction>
      
      <Copyright>© domiyoung__</Copyright>
    </Container>
  );
};

export default GlamShiftConcept; 