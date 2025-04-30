import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design-system';

// 导入统一组件
import PageLayout from '../design-system/components/PageLayout';
import ContentCard from '../design-system/components/ContentCard';
import GridLayout from '../design-system/components/GridLayout';
import FilterBar from '../design-system/components/FilterBar';
import Modal from '../design-system/components/Modal';
import Button from '../design-system/components/Button';
import ProductLifecycleFlow from '../components/ProductLifecycleFlow';

// 图标
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import CameraIcon from '@mui/icons-material/Camera';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import BrushIcon from '@mui/icons-material/Brush';
import InsightsIcon from '@mui/icons-material/Insights';
import SettingsIcon from '@mui/icons-material/Settings';
import TimelineIcon from '@mui/icons-material/Timeline';

// 自定义样式组件
import styled from '@emotion/styled';

const AIContainer = styled.div`
  margin-top: 20px;
`;

const AIFeatureSection = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${props => props.isDark ? '#f5f5f5' : '#212121'};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AIChat = styled(motion.div)`
  background: ${props => props.isDark 
    ? 'linear-gradient(145deg, rgba(40, 40, 45, 0.8), rgba(20, 20, 25, 0.8))' 
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(245, 245, 247, 0.9))'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, ${props => props.isDark ? '0.3' : '0.08'});
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  padding: 24px;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ChatTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.isDark ? '#f5f5f5' : '#212121'};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChatBody = styled.div`
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const ChatInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  input {
    width: 100%;
    padding: 16px 60px 16px 20px;
    border-radius: 30px;
    border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
    font-size: 15px;
    color: ${props => props.isDark ? '#f5f5f5' : '#333'};
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #FF9190;
      box-shadow: 0 0 0 3px rgba(255, 145, 144, 0.25);
    }
    
    &::placeholder {
      color: ${props => props.isDark ? '#999' : '#aaa'};
    }
  }
  
  button {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF9190, #FF7A7A);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-50%) scale(1.05);
      box-shadow: 0 4px 10px rgba(255, 145, 144, 0.3);
    }
  }
`;

const PromptSuggestion = styled(motion.div)`
  display: inline-flex;
  padding: 8px 16px;
  margin: 0 8px 8px 0;
  border-radius: 30px;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)'};
    transform: translateY(-2px);
  }
`;

const AITools = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 10px;
`;

const AITool = styled(motion.div)`
  background: ${props => props.isDark 
    ? 'rgba(30, 30, 35, 0.7)' 
    : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, ${props => props.isDark ? '0.2' : '0.06'});
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, ${props => props.isDark ? '0.3' : '0.1'});
  }
`;

const AIToolIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 24px;
  background: ${props => props.gradient || 'linear-gradient(135deg, #FF9190, #FF7A7A)'};
  color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const AIToolTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${props => props.isDark ? '#f5f5f5' : '#212121'};
`;

const AIToolDescription = styled.p`
  font-size: 14px;
  color: ${props => props.isDark ? '#aaa' : '#666'};
  margin-bottom: 16px;
  flex-grow: 1;
`;

const AIToolBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background: ${props => props.color || 'rgba(255, 145, 144, 0.9)'};
  margin-right: 8px;
`;

const UpgradeBanner = styled(motion.div)`
  background: linear-gradient(135deg, #6DC9FF, #8B75FF);
  border-radius: 24px;
  padding: 24px;
  color: white;
  position: relative;
  overflow: hidden;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    position: relative;
    z-index: 2;
  }
  
  p {
    font-size: 15px;
    margin-bottom: 20px;
    max-width: 500px;
    opacity: 0.9;
    position: relative;
    z-index: 2;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: 30%;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const PromptHistory = styled.div`
  margin-top: 16px;
  
  h4 {
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.isDark ? '#aaa' : '#888'};
    margin-bottom: 10px;
  }
`;

const PromptItem = styled(motion.div)`
  padding: 12px;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  span {
    font-size: 14px;
    color: ${props => props.isDark ? '#f5f5f5' : '#333'};
  }
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'};
  }
`;

// 模拟数据
const aiTools = [
  {
    id: 1,
    title: 'AI 图像生成',
    description: '基于文字描述生成高质量的创意图像，支持多种风格和调整',
    icon: <AutoFixHighIcon />,
    gradient: 'linear-gradient(135deg, #FF9190, #FF6B6B)',
    badge: 'Z世代最爱',
    badgeColor: 'rgba(255, 145, 144, 0.9)'
  },
  {
    id: 2,
    title: 'AI 文案助手',
    description: '生成吸引Z世代的营销文案、产品描述和社交媒体内容',
    icon: <TextFieldsIcon />,
    gradient: 'linear-gradient(135deg, #6DC9FF, #39B8FF)',
    badge: '热门',
    badgeColor: 'rgba(109, 201, 255, 0.9)'
  },
  {
    id: 3,
    title: 'AI 设计增强',
    description: '自动增强你的设计作品，提供配色、排版和元素建议',
    icon: <FormatPaintIcon />,
    gradient: 'linear-gradient(135deg, #8B75FF, #6A4DFF)',
    badge: '新功能',
    badgeColor: 'rgba(139, 117, 255, 0.9)'
  },
  {
    id: 4,
    title: 'AI 趋势分析',
    description: '分析Z世代的设计偏好和趋势，提供数据驱动的创意建议',
    icon: <InsightsIcon />,
    gradient: 'linear-gradient(135deg, #FFD166, #F8B64C)',
    badge: '数据驱动',
    badgeColor: 'rgba(255, 209, 102, 0.9)'
  },
  {
    id: 5,
    title: 'AI 图像编辑',
    description: '智能编辑和优化图像，一键实现专业效果和风格转换',
    icon: <BrushIcon />,
    gradient: 'linear-gradient(135deg, #06D6A0, #04BF8A)',
    badge: '时尚',
    badgeColor: 'rgba(6, 214, 160, 0.9)'
  },
  {
    id: 6,
    title: 'AI 相机滤镜',
    description: '为你的照片添加定制化的AI滤镜，打造独特的视觉风格',
    icon: <CameraIcon />,
    gradient: 'linear-gradient(135deg, #EF476F, #D64161)',
    badge: '社交必备',
    badgeColor: 'rgba(239, 71, 111, 0.9)'
  }
];

// 提示词建议
const promptSuggestions = [
  "创建一个适合Z世代的美妆广告设计",
  "设计一款潮流品牌的社交媒体封面",
  "生成一个霓虹风格的品牌Logo",
  "设计一张时尚电商产品展示图",
  "为我的社交媒体创建一套统一风格的贴文模板"
];

// 历史提示词
const promptHistory = [
  "设计一个渐变风格的故事封面",
  "帮我为夏季系列创建三张Banner",
  "生成一套霓虹色的图标",
  "优化我的产品展示图为暗色系风格"
];

// AI助手页面组件
const AIAssistant = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 状态
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [favorites, setFavorites] = useState([2, 5]); // 默认收藏的工具ID
  
  // 导航路径
  const breadcrumbs = [
    { label: '首页', path: '/' },
    { label: 'AI助手', path: '/ai-assistant' }
  ];

  // 处理提交提示词
  const handleSubmitPrompt = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    
    // 模拟AI处理
    setTimeout(() => {
      setIsProcessing(false);
      // 这里实际应用中会处理AI响应
      console.log(`处理提示词: ${prompt}`);
    }, 2000);
  };
  
  // 处理工具选择
  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    setShowModal(true);
  };
  
  // 切换收藏状态
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  // 使用建议提示词
  const useSuggestion = (suggestion) => {
    setPrompt(suggestion);
  };
  
  return (
    <PageLayout
      title="AI创意助手"
      description="使用AI驱动的工具提升你的创意和设计效率，专为Z世代美妆与潮流品牌定制。"
      breadcrumbs={breadcrumbs}
      activeNav="ai-assistant"
      isDark={isDark}
    >
      <AIContainer>
        {/* AI聊天助手 */}
        <AIFeatureSection>
          <SectionTitle isDark={isDark}>
            <SmartToyIcon style={{ color: '#FF9190' }} />
            与AI助手对话
          </SectionTitle>
          
          <AIChat
            isDark={isDark}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ChatHeader>
              <ChatTitle isDark={isDark}>
                <SmartToyIcon />
                创意Pro AI助手
              </ChatTitle>
            </ChatHeader>
            
            <ChatBody>
              <motion.img 
                src="https://cdn.iconscout.com/icon/free/png-256/free-ai-artificial-intelligence-brain-thinking-31011.png" 
                alt="AI Assistant"
                width="80"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2 
                }}
              />
              <h3 style={{ margin: '20px 0 10px', color: isDark ? '#f5f5f5' : '#333' }}>
                你好，我是你的AI创意助手！
              </h3>
              <p style={{ color: isDark ? '#aaa' : '#666', marginBottom: '20px' }}>
                我可以帮助你进行创意设计、生成内容、解答问题，试着问我一些问题吧...
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
                {promptSuggestions.map((suggestion, index) => (
                  <PromptSuggestion 
                    key={index}
                    isDark={isDark}
                    onClick={() => useSuggestion(suggestion)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {suggestion}
                  </PromptSuggestion>
                ))}
              </div>
            </ChatBody>
            
            <form onSubmit={handleSubmitPrompt}>
              <ChatInput isDark={isDark}>
                <input
                  type="text"
                  placeholder="输入你的创意需求或问题..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isProcessing}
                />
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isProcessing}
                >
                  <i className={isProcessing ? "fas fa-spinner fa-spin" : "fas fa-arrow-right"}></i>
                </motion.button>
              </ChatInput>
            </form>
            
            {promptHistory.length > 0 && (
              <PromptHistory isDark={isDark}>
                <h4>最近提示词</h4>
                <AnimatePresence>
                  {promptHistory.map((item, index) => (
                    <PromptItem 
                      key={index}
                      isDark={isDark}
                      onClick={() => useSuggestion(item)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span>{item}</span>
                      <i className="fas fa-redo" style={{ fontSize: 14, color: isDark ? '#888' : '#aaa' }}></i>
                    </PromptItem>
                  ))}
                </AnimatePresence>
              </PromptHistory>
            )}
          </AIChat>
        </AIFeatureSection>
      
        {/* AI工具集 */}
        <AIFeatureSection>
          <SectionTitle isDark={isDark}>
            <AutoFixHighIcon style={{ color: '#FF9190' }} />
            AI创意工具
          </SectionTitle>
          
          <AITools>
            {aiTools.map((tool) => (
              <AITool 
                key={tool.id}
                isDark={isDark}
                onClick={() => handleToolSelect(tool)}
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: tool.id * 0.05 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <AIToolIcon gradient={tool.gradient}>
                    {tool.icon}
                  </AIToolIcon>
                  <motion.div 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(tool.id);
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {favorites.includes(tool.id) ? (
                      <FavoriteIcon style={{ color: '#FF9190' }} />
                    ) : (
                      <FavoriteBorderIcon style={{ color: isDark ? '#aaa' : '#ccc' }} />
                    )}
                  </motion.div>
                </div>
                
                <AIToolTitle isDark={isDark}>{tool.title}</AIToolTitle>
                <AIToolDescription isDark={isDark}>{tool.description}</AIToolDescription>
                
                <div>
                  <AIToolBadge color={tool.badgeColor}>{tool.badge}</AIToolBadge>
                  <AIToolBadge color="rgba(0, 0, 0, 0.3)">AI</AIToolBadge>
                </div>
              </AITool>
            ))}
          </AITools>
        </AIFeatureSection>
        
        {/* 产品生命周期流程图 */}
        <AIFeatureSection>
          <SectionTitle isDark={isDark}>
            <TimelineIcon style={{ color: '#FF9190' }} />
            产品生命周期流程
          </SectionTitle>
          
          <ProductLifecycleFlow />
          
          <div style={{ 
            textAlign: 'center', 
            marginTop: 20, 
            fontSize: 14, 
            color: isDark ? '#aaa' : '#666'
          }}>
            通过AI辅助的生命周期管理，让您的美妆与潮流产品开发更高效
          </div>
        </AIFeatureSection>
        
        {/* 升级横幅 */}
        <UpgradeBanner 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3>升级到CreativePro AI Premium</h3>
          <p>解锁所有AI功能，获取更多生成额度，优先使用最新的AI模型，让你的创意无限释放。</p>
          <Button
            variant={Button.VARIANTS.GRADIENT}
            gradientFrom="#ffffff"
            gradientTo="#f8f8f8"
            size={Button.SIZES.MD}
            rounded
            color="#333"
            glow
          >
            立即升级
          </Button>
          
          <div style={{ 
            position: 'absolute', 
            top: 20, 
            right: 20, 
            color: 'white', 
            opacity: 0.6, 
            fontSize: 12 
          }}>
            © domiyoung__
          </div>
        </UpgradeBanner>
      </AIContainer>
      
      {/* 工具详情模态框 */}
      <AnimatePresence>
        {showModal && selectedTool && (
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={selectedTool.title}
            size="medium"
            primaryAction={() => console.log('使用工具', selectedTool.id)}
            primaryActionLabel="开始使用"
            secondaryAction={() => setShowModal(false)}
            secondaryActionLabel="取消"
          >
            <div style={{ padding: '20px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <AIToolIcon gradient={selectedTool.gradient} style={{ marginRight: 16 }}>
                  {selectedTool.icon}
                </AIToolIcon>
                <div>
                  <AIToolBadge color={selectedTool.badgeColor}>{selectedTool.badge}</AIToolBadge>
                  <AIToolBadge color="rgba(0, 0, 0, 0.3)">AI</AIToolBadge>
                </div>
              </div>
              
              <p style={{ marginBottom: 20, lineHeight: 1.6 }}>
                {selectedTool.description}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.
              </p>
              
              <h4 style={{ marginBottom: 10, fontSize: 16, fontWeight: 600 }}>功能特点</h4>
              <ul style={{ marginLeft: 20, marginBottom: 20 }}>
                <li style={{ marginBottom: 8 }}>适合Z世代美妆与潮流品牌的定制功能</li>
                <li style={{ marginBottom: 8 }}>多种风格选项，支持实时预览</li>
                <li style={{ marginBottom: 8 }}>内置模板库，快速创建专业内容</li>
                <li style={{ marginBottom: 8 }}>一键导出多种格式，适配各平台</li>
              </ul>
              
              <div style={{ 
                fontSize: 12, 
                opacity: 0.6, 
                textAlign: 'right',
                marginTop: 30
              }}>
                © domiyoung__
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default AIAssistant; 