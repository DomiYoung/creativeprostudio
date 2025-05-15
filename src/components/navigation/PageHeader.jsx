import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme } from '../../design-system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  color: ${props => props.$isDark ? '#0A84FF' : '#007AFF'};
  margin-right: 16px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 6px;
  transition: background-color 0.2s;
  font-size: 14px;
  font-weight: 510;
  
  &:hover {
    background-color: ${props => props.$isDark ? 'rgba(10, 132, 255, 0.1)' : 'rgba(0, 122, 255, 0.1)'};
  }
  
  svg {
    font-size: 16px;
    margin-right: 4px;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  margin: 0;
  letter-spacing: -0.022em;
`;

const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

/**
 * Consistent page header component with optional back button and actions
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {boolean} props.showBackButton - Whether to show the back button
 * @param {function} props.onBack - Custom back action (defaults to navigate(-1))
 * @param {React.ReactNode} props.actions - Actions to display on the right side
 * @param {string} props.backText - Text for back button (defaults to "返回")
 */
const PageHeader = ({ 
  title, 
  showBackButton = true, 
  onBack, 
  actions,
  backText = "返回"
}) => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  
  return (
    <HeaderContainer>
      <TitleSection>
        {showBackButton && (
          <BackButton onClick={handleBack} $isDark={isDark}>
            <ArrowBackIosNewIcon fontSize="small" />
            {backText}
          </BackButton>
        )}
        <Title $isDark={isDark}>{title}</Title>
      </TitleSection>
      
      {actions && (
        <ActionsSection>
          {actions}
        </ActionsSection>
      )}
    </HeaderContainer>
  );
};

export default PageHeader; 