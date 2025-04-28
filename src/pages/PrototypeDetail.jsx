import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../design-system';
import styled from '@emotion/styled';

// Styled components with Apple HIG principles
const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.isDark ? 'var(--gray-900)' : 'var(--gray6)'};
  color: ${props => props.isDark ? 'var(--gray-100)' : 'var(--gray-900)'};
`;

const Header = styled.header`
  height: 56px;
  background-color: ${props => props.isDark ? 'var(--gray-800)' : 'white'};
  border-bottom: 1px solid ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray-200)'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: ${props => props.isDark ? 'rgba(32, 32, 35, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  font-size: 16px;
  color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: ${props => props.isDark ? 'var(--primary)' : 'var(--teal)'};
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s;
  font-weight: 500;
  
  &:hover {
    opacity: 0.8;
  }
  
  i {
    font-size: 12px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${props => props.isDark ? 'var(--gray-300)' : 'var(--gray-600)'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
    background-color: ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray-100)'};
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 14px;
  color: ${props => props.isDark ? 'var(--gray-400)' : 'var(--gray-500)'};
  
  a {
    color: ${props => props.isDark ? 'var(--gray-400)' : 'var(--gray-500)'};
    text-decoration: none;
    
    &:hover {
      color: ${props => props.isDark ? 'var(--primary)' : 'var(--teal)'};
    }
  }
  
  .separator {
    color: ${props => props.isDark ? 'var(--gray-600)' : 'var(--gray-400)'};
  }
`;

const ContentHeader = styled.div`
  margin-bottom: 32px;
`;

const PrototypeTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
`;

const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 16px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${props => props.isDark ? 'var(--gray-300)' : 'var(--gray-600)'};
  
  i {
    font-size: 16px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 32px;
  border-bottom: 1px solid ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray-200)'};
`;

const Tab = styled.button`
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active 
    ? (props.isDark ? 'var(--primary)' : 'var(--teal)') 
    : 'transparent'};
  color: ${props => props.active
    ? (props.isDark ? 'white' : 'var(--gray-900)')
    : (props.isDark ? 'var(--gray-400)' : 'var(--gray-500)')};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
  }
`;

const PreviewContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${props => props.isDark 
    ? '0 16px 24px rgba(0, 0, 0, 0.4)' 
    : '0 12px 24px rgba(0, 0, 0, 0.08)'};
  background-color: ${props => props.isDark ? 'var(--gray-800)' : 'white'};
  margin-bottom: 32px;
`;

const PreviewHeader = styled.div`
  height: 40px;
  border-bottom: 1px solid ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray-200)'};
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: ${props => props.isDark ? 'var(--gray-900)' : 'var(--gray-100)'};
`;

const BrowserControls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const BrowserDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => {
    if (props.color === 'red') return 'var(--red)';
    if (props.color === 'yellow') return 'var(--yellow)';
    if (props.color === 'green') return 'var(--green)';
    return 'var(--gray-400)';
  }};
  opacity: 0.8;
`;

const AddressBar = styled.div`
  flex: 1;
  margin: 0 16px;
  height: 24px;
  border-radius: 4px;
  background-color: ${props => props.isDark ? 'var(--gray-800)' : 'var(--gray6)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${props => props.isDark ? 'var(--gray-400)' : 'var(--gray-500)'};
`;

const PreviewContent = styled.div`
  padding: 0;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
  }
`;

const InfoSection = styled.section`
  margin-bottom: 32px;
  padding: 24px;
  border-radius: 12px;
  background-color: ${props => props.isDark ? 'var(--gray-800)' : 'white'};
  box-shadow: ${props => props.isDark 
    ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
    : '0 4px 12px rgba(0, 0, 0, 0.04)'};
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const InfoCard = styled.div`
  border-radius: 8px;
  padding: 16px;
  background-color: ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray6)'};
  
  h3 {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 8px;
    color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
  }
  
  p {
    font-size: 14px;
    color: ${props => props.isDark ? 'var(--gray-300)' : 'var(--gray-600)'};
    line-height: 1.5;
  }
`;

const CommentSection = styled.div`
  margin-bottom: 32px;
  padding: 24px;
  border-radius: 12px;
  background-color: ${props => props.isDark ? 'var(--gray-800)' : 'white'};
  box-shadow: ${props => props.isDark 
    ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
    : '0 4px 12px rgba(0, 0, 0, 0.04)'};
`;

const Comment = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid ${props => props.isDark ? 'var(--gray-700)' : 'var(--gray-200)'};
  
  &:last-child {
    border-bottom: none;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: ${props => props.color || 'var(--teal)'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
    font-size: 12px;
  }
  
  .name {
    font-size: 14px;
    font-weight: 500;
    color: ${props => props.isDark ? 'white' : 'var(--gray-900)'};
  }
`;

const CommentDate = styled.div`
  font-size: 12px;
  color: ${props => props.isDark ? 'var(--gray-400)' : 'var(--gray-500)'};
`;

const CommentText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${props => props.isDark ? 'var(--gray-300)' : 'var(--gray-600)'};
`;

const PrototypeDetail = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [activeTab, setActiveTab] = useState('preview');
  
  return (
    <Container isDark={isDark}>
      <Header isDark={isDark}>
        <HeaderTitle isDark={isDark}>
          <BackButton isDark={isDark} onClick={() => navigate(-1)}>
            <i className="fas fa-chevron-left"></i>
            返回
          </BackButton>
          <span>原型详情</span>
        </HeaderTitle>
        <HeaderActions>
          <ActionButton isDark={isDark} title="分享">
            <i className="fas fa-share-alt"></i>
          </ActionButton>
          <ActionButton isDark={isDark} title="下载">
            <i className="fas fa-download"></i>
          </ActionButton>
          <ActionButton isDark={isDark} title="收藏">
            <i className="far fa-heart"></i>
          </ActionButton>
        </HeaderActions>
      </Header>
      
      <MainContent>
        <Breadcrumbs isDark={isDark}>
          <a href="/">首页</a>
          <span className="separator">›</span>
          <a href="/document">文档中心</a>
          <span className="separator">›</span>
          <span>页面原型</span>
        </Breadcrumbs>
        
        <ContentHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PrototypeTitle isDark={isDark}>CreativePro 电商平台交互原型</PrototypeTitle>
            <div style={{ fontSize: '15px', color: isDark ? 'var(--gray-300)' : 'var(--gray-600)' }}>
              这是CreativePro Studio 电商平台的交互原型设计，包含完整的用户流程和主要界面，遵循Apple Human Interface Guidelines设计原则。
            </div>
            
            <MetaContainer>
              <MetaItem isDark={isDark}>
                <i className="far fa-calendar-alt"></i>
                <span>更新于：2025-04-22</span>
              </MetaItem>
              <MetaItem isDark={isDark}>
                <i className="far fa-user"></i>
                <span>设计：UX设计团队</span>
              </MetaItem>
              <MetaItem isDark={isDark}>
                <i className="far fa-eye"></i>
                <span>已查看：254次</span>
              </MetaItem>
            </MetaContainer>
          </motion.div>
        </ContentHeader>
        
        <TabsContainer isDark={isDark}>
          <Tab 
            isDark={isDark} 
            active={activeTab === 'preview'} 
            onClick={() => setActiveTab('preview')}
          >
            原型预览
          </Tab>
          <Tab 
            isDark={isDark} 
            active={activeTab === 'specs'} 
            onClick={() => setActiveTab('specs')}
          >
            设计规范
          </Tab>
          <Tab 
            isDark={isDark} 
            active={activeTab === 'assets'} 
            onClick={() => setActiveTab('assets')}
          >
            相关资源
          </Tab>
          <Tab 
            isDark={isDark} 
            active={activeTab === 'comments'} 
            onClick={() => setActiveTab('comments')}
          >
            评论记录
          </Tab>
        </TabsContainer>
        
        {activeTab === 'preview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <PreviewContainer isDark={isDark}>
              <PreviewHeader isDark={isDark}>
                <BrowserControls>
                  <BrowserDot color="red" />
                  <BrowserDot color="yellow" />
                  <BrowserDot color="green" />
                </BrowserControls>
                <AddressBar isDark={isDark}>
                  creativepro-studio.example.com/prototype
                </AddressBar>
              </PreviewHeader>
              <PreviewContent>
                <img src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                     alt="Prototype Preview" />
              </PreviewContent>
            </PreviewContainer>
            
            <InfoSection isDark={isDark}>
              <SectionTitle isDark={isDark}>设计说明</SectionTitle>
              <InfoGrid>
                <InfoCard isDark={isDark}>
                  <h3>设计目标</h3>
                  <p>创建一个符合Apple Human Interface Guidelines的电商平台，提供流畅的用户体验和现代化的UI设计，突出产品展示并简化购买流程。</p>
                </InfoCard>
                <InfoCard isDark={isDark}>
                  <h3>目标用户</h3>
                  <p>追求高品质生活体验的年轻专业人士，熟悉数字产品，注重产品设计和用户体验，偏好简洁流畅的交互。</p>
                </InfoCard>
                <InfoCard isDark={isDark}>
                  <h3>关键流程</h3>
                  <p>包含产品浏览、详情查看、购物车管理、结账流程和账户管理等核心用户旅程，确保全流程的一致性和可用性。</p>
                </InfoCard>
                <InfoCard isDark={isDark}>
                  <h3>设计特点</h3>
                  <p>采用扁平化设计与微妙的层次感相结合，使用柔和的阴影和高对比度提升可读性，符合现代iOS及macOS设计语言。</p>
                </InfoCard>
              </InfoGrid>
            </InfoSection>
          </motion.div>
        )}
        
        {activeTab === 'comments' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CommentSection isDark={isDark}>
              <SectionTitle isDark={isDark}>评论与反馈</SectionTitle>
              
              <Comment isDark={isDark}>
                <CommentHeader>
                  <CommentAuthor isDark={isDark} color="var(--blue)">
                    <div className="avatar">L</div>
                    <div className="name">刘设计师</div>
                  </CommentAuthor>
                  <CommentDate isDark={isDark}>2025-04-20 14:30</CommentDate>
                </CommentHeader>
                <CommentText isDark={isDark}>
                  购物车页面的交互流程非常流畅，但建议在结账按钮上增加更明显的视觉反馈，让用户更容易识别下一步操作。整体设计符合Apple Human Interface Guidelines，简洁有效。
                </CommentText>
              </Comment>
              
              <Comment isDark={isDark}>
                <CommentHeader>
                  <CommentAuthor isDark={isDark} color="var(--mint)">
                    <div className="avatar">Z</div>
                    <div className="name">张产品经理</div>
                  </CommentAuthor>
                  <CommentDate isDark={isDark}>2025-04-19 09:15</CommentDate>
                </CommentHeader>
                <CommentText isDark={isDark}>
                  原型整体风格统一，符合我们的品牌调性。不过首页的商品展示区域可以考虑增加一些分类筛选功能，方便用户快速找到感兴趣的内容。期待下一版的优化！
                </CommentText>
              </Comment>
              
              <Comment isDark={isDark}>
                <CommentHeader>
                  <CommentAuthor isDark={isDark} color="var(--purple)">
                    <div className="avatar">W</div>
                    <div className="name">王开发</div>
                  </CommentAuthor>
                  <CommentDate isDark={isDark}>2025-04-18 16:45</CommentDate>
                </CommentHeader>
                <CommentText isDark={isDark}>
                  从技术实现角度看，大部分界面都可以直接开发，交互清晰明确。建议提供一下表单验证的细节说明，以便我们实现更准确的前端验证逻辑。设计系统文档很完善，赞！
                </CommentText>
              </Comment>
            </CommentSection>
          </motion.div>
        )}
      </MainContent>
    </Container>
  );
};

export default PrototypeDetail; 