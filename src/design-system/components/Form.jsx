import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../ThemeContext';

const StyledFormGroup = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const StyledFormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.$isDark ? '#f5f5f7' : '#1d1d1f'};
`;

const StyledFormSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background-color: ${props => props.$isDark ? '#2c2c2e' : '#ffffff'};
  color: ${props => props.$isDark ? '#f5f5f7' : '#1d1d1f'};
  border: 1px solid ${props => props.$isDark ? '#444' : '#e0e0e0'};
  border-radius: 8px;
  appearance: none;
  background-image: ${props => `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${props.$isDark ? '%23f5f5f7' : '%231d1d1f'}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`};
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
  }
  
  &:disabled {
    background-color: ${props => props.$isDark ? '#1c1c1e' : '#f5f5f7'};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const FormGroup = ({ children, ...props }) => {
  return <StyledFormGroup {...props}>{children}</StyledFormGroup>;
};

export const FormLabel = ({ children, ...props }) => {
  const { isDark } = useTheme();
  return (
    <StyledFormLabel $isDark={isDark} {...props}>
      {children}
    </StyledFormLabel>
  );
};

export const FormSelect = React.forwardRef(({ children, ...props }, ref) => {
  const { isDark } = useTheme();
  return (
    <StyledFormSelect $isDark={isDark} ref={ref} {...props}>
      {children}
    </StyledFormSelect>
  );
});

// Add a displayName to the forwarded ref component
FormSelect.displayName = 'FormSelect';

export default {
  FormGroup,
  FormLabel,
  FormSelect
}; 