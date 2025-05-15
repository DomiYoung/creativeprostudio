import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme } from '../../design-system';

// Import the navigation configuration
import { mainNavigationItems, shouldShowNavItem } from '../../routes/routeConfig';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import ImageIcon from '@mui/icons-material/Image';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SpeedIcon from '@mui/icons-material/Speed';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

// Container for the entire navigation bar
const NavContainer = styled.header`
  height: 60px;
  background-color: ${props => props.$isDark ? 'rgba(28, 28, 30, 0.96)' : 'rgba(249, 249, 249, 0.96)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${props => props.$isDark ? 'rgba(55, 55, 57, 1)' : 'rgba(225, 225, 225, 1)'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
`;

// Logo styling
const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.$isDark ? '#f5f5f7' : '#1d1d1f'};
  letter-spacing: -0.022em;
  cursor: pointer;
`;

// Main content section of the navigation
const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

// Container for navigation items
const MenuItems = styled.div`
  display: flex;
  align-items: center;
  margin-left: 32px;
`;

// Individual navigation item
const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 510;
  color: ${props => props.$active 
    ? (props.$isDark ? '#ffffff' : '#000000') 
    : (props.$isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)')};
  background-color: ${props => props.$active 
    ? (props.$isDark ? 'rgba(55, 55, 65, 0.9)' : 'rgba(210, 210, 215, 0.4)') 
    : 'transparent'};
  text-decoration: none;
  transition: all 0.2s;
  position: relative;
  margin: 0 2px;

  &:hover {
    color: ${props => props.$isDark ? '#ffffff' : '#000000'};
    background-color: ${props => props.$isDark ? 'rgba(65, 65, 75, 0.4)' : 'rgba(225, 225, 230, 0.5)'};
  }

  svg {
    margin-right: 6px;
    font-size: 17px;
  }
`;

// Container for user action items on the right
const ActionItems = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

// Individual action button
const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.$isDark ? 'rgba(60, 60, 67, 0.3)' : 'rgba(210, 210, 215, 0.4)'};
  color: ${props => props.$isDark ? '#f5f5f7' : '#1d1d1f'};
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.$isDark ? 'rgba(80, 80, 85, 0.4)' : 'rgba(200, 200, 205, 0.5)'};
  }
`;

// User avatar 
const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.$isDark ? '#0A84FF' : '#007AFF'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
`;

// Main navigation component
const MainNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // Filter navigation items based on current path
  const visibleNavItems = mainNavigationItems.filter(item => 
    shouldShowNavItem(item, location.pathname)
  );
  
  // Check if the current path matches a navigation item path
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <NavContainer $isDark={isDark}>
      <NavContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo $isDark={isDark} onClick={() => navigate('/creativeprostudio/prototype')}>
            CreativePro Studio
          </Logo>
          
          <MenuItems>
            {visibleNavItems.map(item => (
              <MenuItem 
                key={item.id}
                to={item.path}
                $active={isActive(item.path)}
                $isDark={isDark}
              >
                {item.icon}
                {item.label}
              </MenuItem>
            ))}
          </MenuItems>
        </div>
        
        <ActionItems>
          <ActionButton $isDark={isDark}>
            <SearchIcon fontSize="small" />
          </ActionButton>
          <ActionButton $isDark={isDark}>
            <NotificationsIcon fontSize="small" />
          </ActionButton>
          <UserAvatar $isDark={isDark}>JJ</UserAvatar>
        </ActionItems>
      </NavContent>
    </NavContainer>
  );
};

export default MainNavigation; 