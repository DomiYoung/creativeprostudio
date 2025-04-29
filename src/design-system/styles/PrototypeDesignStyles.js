import styled from '@emotion/styled';
import { motion } from 'framer-motion';

// 容器
export const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
  background-color: #fafafa;
  color: #212121;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// 页眉
export const Header = styled.header`
  height: 64px;
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
`;

export const NavGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 32px;
`;

export const Logo = styled.div`
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  letter-spacing: -0.2px;
`;

export const LogoText = styled.span`
  color: #333;
`;

export const LogoHighlight = styled.span`
  background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

export const NavItem = styled.a`
  display: flex;
  align-items: center;
  color: #555;
  text-decoration: none;
  font-size: 14px;
  padding: 0 18px;
  height: 64px;
  transition: all 0.2s ease;
  font-weight: 500;
  letter-spacing: -0.2px;
  
  &:hover, &.active {
    color: #FF9190;
  }
  
  &.active {
    box-shadow: inset 0 -2px 0 #FF9190;
    font-weight: 600;
  }
  
  i {
    margin-right: 8px;
    font-size: 16px;
  }
`;

export const UserAvatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(255, 145, 144, 0.3);
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

// 主要内容
export const MainContent = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const WelcomeHero = styled.div`
  background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
  padding: 56px 0;
  border-radius: 16px;
  color: white;
  text-align: center;
  margin-bottom: 40px;
  box-shadow: 0 12px 24px rgba(255, 145, 144, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
  
  h1 {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  p {
    font-size: 18px;
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.95;
    position: relative;
    z-index: 1;
    letter-spacing: -0.2px;
  }
`;

// 工作流组件
export const WorkflowCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
  margin-bottom: 48px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const WorkflowSteps = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 80px;
    right: 80px;
    height: 3px;
    background: #F0F0F0;
    z-index: 1;
    border-radius: 3px;
  }
  
  @media (max-width: 992px) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
    
    &::before {
      display: none;
    }
  }
`;

export const WorkflowStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  width: 18%;
  transition: transform 300ms ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
    
    .step-icon-container {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    }
  }
  
  @media (max-width: 992px) {
    width: 100%;
    max-width: 280px;
  }
`;

export const StepIconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.25s ease;
  border: 3px solid white;
`;

export const StepIcon = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 18px;
  transition: all 0.25s ease;
  background-color: ${props => props.color || '#97C1FF'};
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StepTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
  color: #222;
`;

export const StepDescription = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  max-width: 160px;
  line-height: 1.4;
`;

// 分段控制组件
export const SegmentedControl = styled.div`
  display: flex;
  background-color: #F6F6F6;
  border-radius: 16px;
  padding: 4px;
  margin-bottom: 28px;
  width: fit-content;
`;

export const Segment = styled.div`
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666;
  font-weight: 500;
  
  &.active {
    background-color: white;
    color: #222;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    font-weight: 600;
  }
  
  &:hover:not(.active) {
    color: #333;
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

// 项目卡片网格
export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.03);
  cursor: pointer;
  transition: all 0.25s ease;
`;

export const ProjectPreview = styled.div`
  height: 160px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

export const ProjectStatus = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  
  ${props => {
    if (props.status === 'completed') {
      return `
        background-color: rgba(39, 174, 96, 0.15);
        color: #27AE60;
        border: 1px solid rgba(39, 174, 96, 0.2);
      `;
    } else if (props.status === 'in-progress') {
      return `
        background-color: rgba(52, 152, 219, 0.15);
        color: #3498DB;
        border: 1px solid rgba(52, 152, 219, 0.2);
      `;
    } else if (props.status === 'review') {
      return `
        background-color: rgba(243, 156, 18, 0.15);
        color: #F39C12;
        border: 1px solid rgba(243, 156, 18, 0.2);
      `;
    }
  }}
`;

export const ProjectInfo = styled.div`
  padding: 20px;
`;

export const ProjectTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  
  span {
    font-size: 16px;
    font-weight: 600;
    color: #222;
  }
  
  i {
    font-size: 16px;
  }
`;

export const ProjectMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  color: #777;
  font-size: 13px;
  
  i {
    margin-right: 6px;
    font-size: 14px;
    color: #999;
  }
`;

export const ProgressBar = styled.div`
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  margin-bottom: 16px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.progress || '0%'};
  background: linear-gradient(to right, #FF9190, #FFA194);
  border-radius: 3px;
`;

export const ProjectContributors = styled.div`
  display: flex;
  align-items: center;
`;

export const Contributor = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: white;
  margin-right: -10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: ${props => props.index || 1};
  border: 2px solid white;
  background-color: ${props => props.isAdd ? '#F0F0F0' : props.color || '#97C1FF'};
  color: ${props => props.isAdd ? '#666' : 'white'};
`;

// 创建新项目按钮
export const CreateProjectButton = styled(motion.button)`
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 8px 24px rgba(255, 145, 144, 0.3);
  cursor: pointer;
  transition: all 0.25s ease;
  z-index: 100;
  
  &:hover {
    transform: scale(1.05);
  }
`;

// 页脚
export const Footer = styled.footer`
  background-color: white;
  padding: 40px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  text-align: center;
`;

export const FooterLogo = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 16px;
  
  span:first-of-type {
    color: #333;
  }
  
  span:last-of-type {
    background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

export const FooterText = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const FooterLink = styled.a`
  color: #666;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
  
  &:hover {
    color: #FF9190;
  }
`;

export const Copyright = styled.p`
  color: #999;
  font-size: 13px;
`; 