import styled from '@emotion/styled';
import { motion } from 'framer-motion';

// 容器
export const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
  background-color: var(--gray-100);
  color: var(--gray-900);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// 页眉
export const Header = styled.header`
  height: 60px;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const NavGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  padding-left: 16px;
`;

export const Logo = styled.div`
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

export const LogoText = styled.span`
  color: #333;
  font-weight: 700;
`;

export const LogoHighlight = styled.span`
  color: #F5A680;
  font-weight: 700;
`;

export const NavItem = styled.a`
  display: flex;
  align-items: center;
  color: var(--gray-700);
  text-decoration: none;
  font-size: 14px;
  padding: 0 16px;
  height: 56px;
  transition: all 0.2s;
  font-weight: 500;
  &:hover, &.active {
    color: #F5A680;
  }
  &.active {
    box-shadow: inset 0 -3px 0 #F5A680;
  }
  i {
    margin-right: 8px;
    font-size: 16px;
  }
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #F5A680;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
`;

// 主要内容
export const MainContent = styled.div`
  padding: var(--spacing-8);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
`;

export const WelcomeHero = styled.div`
  background: linear-gradient(135deg, #F5A680 0%, #FFB5C5 100%);
  padding: 48px 0;
  border-radius: var(--radius-lg);
  color: white;
  text-align: center;
  margin-bottom: var(--spacing-8);
  box-shadow: var(--shadow-md);
  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: var(--spacing-3);
  }
  p {
    font-size: 16px;
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.9;
  }
`;

// 工作流组件
export const WorkflowCard = styled.div`
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04);
  margin-bottom: var(--spacing-8);
  border: 1px solid var(--gray-200);
`;

export const WorkflowSteps = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: var(--spacing-6) 0;
  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gray-200);
    z-index: 1;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-6);
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
    transform: translateY(-6px);
    .step-icon-container {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    max-width: 240px;
  }
`;

export const StepIconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-3);
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all var(--animation-normal) ease;
  border: 1px solid var(--gray-200);
`;

export const StepIcon = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 16px;
  transition: all var(--animation-normal) ease;
  background-color: ${props => props.color || '#97C1FF'};
  color: white;
`;

export const StepTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: var(--spacing-1);
  text-align: center;
  color: var(--gray-900);
`;

export const StepDescription = styled.p`
  font-size: 12px;
  color: var(--gray-600);
  text-align: center;
  max-width: 150px;
  line-height: 1.4;
`;

// 分段控制组件
export const SegmentedControl = styled.div`
  display: flex;
  background-color: var(--gray-100);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: var(--spacing-5);
  width: fit-content;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
`;

export const Segment = styled.div`
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: all var(--animation-normal) ease;
  color: var(--gray-600);
  font-weight: 500;
  &.active {
    background-color: white;
    color: var(--gray-900);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  }
  &:hover:not(.active) {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

// 项目卡片组件
export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-5);
  margin-bottom: var(--spacing-8);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCard = styled(motion.div)`
  background-color: white;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid var(--gray-200);
  cursor: pointer;
`;

export const ProjectPreview = styled.div`
  height: 180px;
  background-color: var(--gray-100);
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--animation-normal) ease;
  }
`;

export const ProjectStatus = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: ${props => {
    switch(props.status) {
      case 'in-progress': return '#5594FA';
      case 'review': return '#A76BF4';
      case 'completed': return '#5DC190';
      default: return '#5594FA';
    }
  }};
`;

export const ProjectInfo = styled.div`
  padding: var(--spacing-4);
`;

export const ProjectTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: var(--spacing-2);
  color: var(--gray-900);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: var(--gray-600);
  margin-bottom: var(--spacing-3);
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  i {
    margin-right: var(--spacing-1);
    font-size: 12px;
  }
`;

export const ProgressBar = styled.div`
  height: 4px;
  background-color: var(--gray-200);
  border-radius: 2px;
  overflow: hidden;
  margin-top: var(--spacing-3);
`;

export const ProgressFill = styled.div`
  height: 100%;
  border-radius: 2px;
  background-color: #F5A680;
  width: ${props => props.progress || '0%'};
`;

export const ProjectContributors = styled.div`
  display: flex;
  margin-top: var(--spacing-3);
`;

export const Contributor = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${props => props.color || 'var(--gray-200)'};
  border: 2px solid white;
  margin-right: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${props => props.color ? 'white' : 'var(--gray-700)'};
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  z-index: ${props => props.index || 1};
  
  ${props => props.isAdd && `
    background-color: white;
    border: 1px dashed var(--gray-400);
    color: var(--gray-600);
    cursor: pointer;
    transition: all var(--animation-fast) ease;
  `}

  &:hover {
    ${props => props.isAdd && `
      background-color: var(--gray-100);
      border-color: var(--gray-500);
      color: var(--gray-700);
    `}
  }
`;

// 底部浮动按钮
export const CreateProjectButton = styled(motion.button)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #F5A680;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  border: none;
  font-size: 24px;
  z-index: 99;
`;

// 页脚
export const Footer = styled.footer`
  background-color: var(--gray-900);
  color: white;
  padding: 40px 0;
  text-align: center;
  margin-top: auto;
`;

export const FooterLogo = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  span:last-child {
    color: #F5A680;
  }
`;

export const FooterText = styled.p`
  color: var(--gray-400);
  font-size: 14px;
  margin-bottom: 20px;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
`;

export const FooterLink = styled.a`
  color: var(--gray-300);
  font-size: 14px;
  text-decoration: none;
  &:hover {
    color: white;
  }
`;

export const Copyright = styled.p`
  color: var(--gray-500);
  font-size: 12px;
`; 