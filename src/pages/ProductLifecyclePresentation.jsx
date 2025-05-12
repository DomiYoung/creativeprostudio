import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../design-system';

// Icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Main container
const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.isDark 
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
    : 'linear-gradient(135deg, #fdeff9 0%, #ffffff 100%)'};
  overflow-x: hidden;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
`;

// Hero section
const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: "© domiyoung__";
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 14px;
    color: ${props => props.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
    z-index: 10;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.isDark 
    ? 'radial-gradient(circle at 30% 30%, rgba(255, 79, 128, 0.3) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(161, 57, 253, 0.3) 0%, transparent 60%)' 
    : 'radial-gradient(circle at 30% 30%, rgba(255, 79, 128, 0.15) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(161, 57, 253, 0.15) 0%, transparent 60%)'};
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
`;

const Tagline = styled(motion.p)`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${props => props.isDark ? '#FF4F80' : '#FF4F80'};
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 3px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MainTitle = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 24px;
  background: ${props => props.isDark 
    ? 'linear-gradient(90deg, #FF9190 0%, #FF4F80 50%, #A139FD 100%)' 
    : 'linear-gradient(90deg, #FF4F80 0%, #A139FD 50%, #4A9FFF 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: ${props => props.isDark ? '#e0e0e0' : '#555'};
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(90deg, #FF4F80 0%, #A139FD 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 10px 20px rgba(255, 79, 128, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(255, 79, 128, 0.4);
  }
  
  svg {
    font-size: 20px;
  }
`;

const SecondaryButton = styled(motion.button)`
  background: ${props => props.isDark 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.isDark ? 'white' : '#333'};
  border: none;
  padding: 16px 32px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.isDark 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  svg {
    font-size: 20px;
  }
`;

const ScrollDown = styled(motion.div)`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  
  svg {
    font-size: 36px;
    color: ${props => props.isDark ? '#e0e0e0' : '#555'};
  }
`;

// Features section
const FeaturesSection = styled.section`
  padding: 100px 20px;
  background: ${props => props.isDark 
    ? '#16213e' 
    : '#fff'};
  position: relative;
  
  &::after {
    content: "© domiyoung__";
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 14px;
    color: ${props => props.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
  }
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 80px;
  background: ${props => props.gradient || (props.isDark 
    ? 'linear-gradient(90deg, #FF9190 0%, #FF4F80 100%)' 
    : 'linear-gradient(90deg, #FF4F80 0%, #A139FD 100%)')};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 50px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FeatureCard = styled(motion.div)`
  background: ${props => props.isDark 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 20px;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.isDark 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: ${props => props.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  
  svg {
    font-size: 40px;
    color: white;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${props => props.isDark ? '#f8f9fa' : '#333'};
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.isDark ? '#a0a0a0' : '#666'};
  line-height: 1.6;
`;

// Product concept section
const ConceptSection = styled.section`
  padding: 100px 20px;
  background: ${props => props.isDark 
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
    : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'};
  position: relative;
  
  &::after {
    content: "© domiyoung__";
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 14px;
    color: ${props => props.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
  }
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const ConceptContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 60px;
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const ConceptImage = styled(motion.div)`
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  height: 600px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  
  @media (max-width: 992px) {
    width: 100%;
    height: 400px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.7) 100%);
  }
`;

const ConceptContent = styled.div`
  flex: 1;
  
  @media (max-width: 992px) {
    text-align: center;
  }
`;

const ConceptList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 30px 0;
`;

const ConceptItem = styled(motion.li)`
  margin-bottom: 20px;
  padding-left: 30px;
  position: relative;
  color: ${props => props.isDark ? '#e0e0e0' : '#555'};
  font-size: 1.1rem;
  line-height: 1.6;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(90deg, #FF4F80 0%, #A139FD 100%);
  }
  
  @media (max-width: 992px) {
    padding-left: 0;
    padding-top: 30px;
    text-align: center;
    
    &::before {
      left: calc(50% - 4px);
      top: 10px;
    }
  }
`;

// Footer
const Footer = styled.footer`
  padding: 60px 20px 40px;
  background: ${props => props.isDark 
    ? '#13192c' 
    : '#fafafa'};
  text-align: center;
  position: relative;
  
  &::after {
    content: "© domiyoung__";
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 14px;
    color: ${props => props.isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
  }
`;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: ${props => props.isDark 
    ? 'linear-gradient(90deg, #FF9190 0%, #FF4F80 50%, #A139FD 100%)' 
    : 'linear-gradient(90deg, #FF4F80 0%, #A139FD 50%, #4A9FFF 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FooterText = styled.p`
  color: ${props => props.isDark ? '#a0a0a0' : '#666'};
  max-width: 600px;
  margin: 0 auto 40px;
  line-height: 1.6;
`;

// Main component
const ProductLifecyclePresentation = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    concept: false
  });
  
  useEffect(() => {
    // Start animation after component mounts
    setIsVisible(prev => ({ ...prev, hero: true }));
    
    // Add scroll event listener to trigger animations
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      // Features section animation
      const featuresSection = document.getElementById('features-section');
      if (featuresSection && scrollPosition > featuresSection.offsetTop + 100) {
        setIsVisible(prev => ({ ...prev, features: true }));
      }
      
      // Concept section animation
      const conceptSection = document.getElementById('concept-section');
      if (conceptSection && scrollPosition > conceptSection.offsetTop + 100) {
        setIsVisible(prev => ({ ...prev, concept: true }));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToFeatures = () => {
    document.getElementById('features-section').scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  const navigateToLifecycle = () => {
    navigate('/creativeprostudio/product-lifecycle');
  };
  
  const features = [
    {
      title: "AI 美妆试用",
      description: "使用最先进的人工智能技术，无需实际涂抹即可虚拟试用各种美妆产品，找到完美匹配。",
      icon: <FaceRetouchingNaturalIcon />,
      gradient: "linear-gradient(90deg, #FF9190 0%, #FF4F80 100%)"
    },
    {
      title: "趋势预测",
      description: "基于全球时尚数据和Z世代喜好，预测并推荐即将流行的美妆与时尚趋势。",
      icon: <TrendingUpIcon />,
      gradient: "linear-gradient(90deg, #FF4F80 0%, #A139FD 100%)"
    },
    {
      title: "社区创作",
      description: "分享个性化妆容和搭配，获取社区反馈，与志同道合的Z世代创作者建立联系。",
      icon: <AutoAwesomeIcon />,
      gradient: "linear-gradient(90deg, #A139FD 0%, #4A9FFF 100%)"
    },
    {
      title: "AR 滤镜工作室",
      description: "创建专属AR美颜滤镜，完美融合真实与虚拟美妆效果，一键分享至社交平台。",
      icon: <CameraAltIcon />,
      gradient: "linear-gradient(90deg, #4A9FFF 0%, #00BFB2 100%)"
    },
    {
      title: "个性化推荐",
      description: "AI分析您的肤色、风格偏好和使用习惯，提供量身定制的美妆产品和教程推荐。",
      icon: <FilterVintageIcon />,
      gradient: "linear-gradient(90deg, #00BFB2 0%, #06D6A0 100%)"
    },
    {
      title: "一键购物",
      description: "发现喜爱的产品后，无缝对接各大电商平台，一键添加购物车或直接购买。",
      icon: <ShoppingBagIcon />,
      gradient: "linear-gradient(90deg, #06D6A0 0%, #FFD166 100%)"
    }
  ];
  
  const conceptPoints = [
    "Beauty Innovation Hub是一款专为Z世代设计的创新美妆平台，将AI技术与社交互动融为一体",
    "满足18-25岁年轻女性对个性化、社交化美妆体验的需求",
    "通过AR/AI虚拟试妆消除传统试妆的痛点，降低购买决策风险",
    "独特的社区创作功能鼓励用户分享创意，建立粉丝群体，成为美妆KOL",
    "趋势预测算法分析全球美妆动态，帮助用户走在时尚前沿",
    "无缝集成电商功能，用户从发现到购买仅需几秒钟",
    "所有用户生成内容均标注\"版权归属domiyoung__\"，保护创作者权益"
  ];
  
  return (
    <Container isDark={isDark}>
      {/* Hero Section */}
      <HeroSection isDark={isDark}>
        <GradientOverlay isDark={isDark} />
        <HeroContent>
          <AnimatePresence>
            {isVisible.hero && (
              <>
                <Tagline
                  isDark={isDark}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  为Z世代打造
                </Tagline>
                
                <MainTitle
                  isDark={isDark}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Beauty Innovation Hub
                </MainTitle>
                
                <Subtitle
                  isDark={isDark}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  融合AI技术与社交互动的创新美妆平台，为Z世代女性提供虚拟试妆、趋势预测与创意分享的沉浸式体验
                </Subtitle>
                
                <CTAContainer
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <PrimaryButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={navigateToLifecycle}
                  >
                    产品生命周期 <AddCircleOutlineIcon />
                  </PrimaryButton>
                  
                  <SecondaryButton
                    isDark={isDark}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToFeatures}
                  >
                    探索功能 <PersonAddIcon />
                  </SecondaryButton>
                </CTAContainer>
              </>
            )}
          </AnimatePresence>
        </HeroContent>
        
        <ScrollDown
          isDark={isDark}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={scrollToFeatures}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <KeyboardArrowDownIcon />
          </motion.div>
        </ScrollDown>
      </HeroSection>
      
      {/* Features Section */}
      <FeaturesSection id="features-section" isDark={isDark}>
        <SectionTitle isDark={isDark}>核心功能</SectionTitle>
        
        <FeaturesGrid>
          <AnimatePresence>
            {isVisible.features && features.map((feature, index) => (
              <FeatureCard
                key={index}
                isDark={isDark}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <FeatureIconContainer gradient={feature.gradient}>
                  {feature.icon}
                </FeatureIconContainer>
                <FeatureTitle isDark={isDark}>{feature.title}</FeatureTitle>
                <FeatureDescription isDark={isDark}>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </AnimatePresence>
        </FeaturesGrid>
      </FeaturesSection>
      
      {/* Concept Section */}
      <ConceptSection id="concept-section" isDark={isDark}>
        <SectionTitle 
          isDark={isDark}
          gradient="linear-gradient(90deg, #A139FD 0%, #4A9FFF 100%)"
        >
          产品理念
        </SectionTitle>
        
        <ConceptContainer>
          <AnimatePresence>
            {isVisible.concept && (
              <ConceptImage
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <img 
                  src="https://images.pexels.com/photos/3373716/pexels-photo-3373716.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Beauty Innovation Hub Concept" 
                />
              </ConceptImage>
            )}
          </AnimatePresence>
          
          <ConceptContent>
            <ConceptList>
              <AnimatePresence>
                {isVisible.concept && conceptPoints.map((point, index) => (
                  <ConceptItem
                    key={index}
                    isDark={isDark}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    {point}
                  </ConceptItem>
                ))}
              </AnimatePresence>
            </ConceptList>
            
            <AnimatePresence>
              {isVisible.concept && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <PrimaryButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={navigateToLifecycle}
                  >
                    查看产品生命周期 <AddCircleOutlineIcon />
                  </PrimaryButton>
                </motion.div>
              )}
            </AnimatePresence>
          </ConceptContent>
        </ConceptContainer>
      </ConceptSection>
      
      {/* Footer */}
      <Footer isDark={isDark}>
        <FooterLogo isDark={isDark}>Beauty Innovation Hub</FooterLogo>
        <FooterText isDark={isDark}>
          由domiyoung__设计与开发，专为Z世代美妆爱好者打造的创新数字平台。
          融合前沿技术与时尚潮流，为用户带来全新的美妆探索体验。
        </FooterText>
      </Footer>
    </Container>
  );
};

export default ProductLifecyclePresentation; 