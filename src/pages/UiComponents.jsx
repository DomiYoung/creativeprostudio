import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme, Button } from '../design-system';

// 图标导入
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import WidgetsIcon from '@mui/icons-material/Widgets';
import GridViewIcon from '@mui/icons-material/GridView';
import PaletteIcon from '@mui/icons-material/Palette';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// 样式组件
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.isDark ? '#121212' : '#f5f5f7'};
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', Helvetica, Arial, sans-serif;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
`;

const Header = styled.header`
  height: 60px;
  background-color: ${props => props.isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.isDark ? '#333' : '#e0e0e0'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  color: #0066cc;
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 102, 204, 0.05);
  }

  svg {
    font-size: 18px;
    margin-right: 4px;
  }
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  margin: 0;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const ComponentNav = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: ${props => props.active ? (props.isDark ? '#333' : '#f0f0f0') : 'transparent'};
  border: 1px solid ${props => props.isDark ? '#444' : '#e0e0e0'};
  border-radius: 8px;
  color: ${props => props.active ? (props.isDark ? '#60a5fa' : '#0066cc') : (props.isDark ? '#f5f5f7' : '#1d1d1f')};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.isDark ? '#2d2d2d' : '#f5f5f7'};
  }

  svg {
    margin-right: 8px;
    font-size: 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  margin: 32px 0 16px 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 12px;
    color: ${props => props.isDark ? '#60a5fa' : '#0066cc'};
  }
`;

const SubSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  margin: 24px 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid ${props => props.isDark ? '#333' : '#e0e0e0'};
`;

const ComponentCard = styled.div`
  background-color: ${props => props.isDark ? '#2d2d2d' : 'white'};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, ${props => props.isDark ? '0.3' : '0.1'});
  padding: 24px;
  margin-bottom: 24px;
`;

const ComponentDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${props => props.isDark ? '#aaa' : '#666'};
  margin-bottom: 24px;
`;

const DemoSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 16px 0 24px 0;
  padding: 16px;
  border-radius: 8px;
  background-color: ${props => props.isDark ? '#222' : '#f9f9f9'};
  border: 1px dashed ${props => props.isDark ? '#444' : '#e0e0e0'};
`;

const CodeBlock = styled.pre`
  background-color: ${props => props.isDark ? '#1a1a1a' : '#f5f5f7'};
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font-family: 'SF Mono', Monaco, Consolas, 'Courier New', monospace;
  font-size: 13px;
  color: ${props => props.isDark ? '#e0e0e0' : '#333'};
  margin: 0 0 24px 0;
  border: 1px solid ${props => props.isDark ? '#333' : '#e0e0e0'};
`;

const PropsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
  font-size: 14px;
`;

const TableHead = styled.thead`
  background-color: ${props => props.isDark ? '#333' : '#f5f5f7'};
  
  th {
    padding: 12px 16px;
    text-align: left;
    color: ${props => props.isDark ? '#e0e0e0' : '#333'};
    font-weight: 500;
    border-bottom: 1px solid ${props => props.isDark ? '#444' : '#e0e0e0'};
  }
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid ${props => props.isDark ? '#333' : '#f0f0f0'};
    
    &:last-child {
      border-bottom: none;
    }
    
    &:nth-child(even) {
      background-color: ${props => props.isDark ? '#222' : '#fafafa'};
    }
  }
  
  td {
    padding: 12px 16px;
    color: ${props => props.isDark ? '#ccc' : '#666'};
    
    &:first-child {
      font-weight: 500;
      color: ${props => props.isDark ? '#e0e0e0' : '#333'};
    }
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const ColorSwatch = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${props => props.isDark ? '#444' : '#e0e0e0'};
`;

const ColorPreview = styled.div`
  height: 80px;
  background-color: ${props => props.color};
`;

const ColorInfo = styled.div`
  padding: 8px 12px;
  background-color: ${props => props.isDark ? '#222' : 'white'};
  
  h4 {
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 500;
    color: ${props => props.isDark ? '#e0e0e0' : '#333'};
  }
  
  span {
    font-size: 12px;
    font-family: 'SF Mono', Monaco, Consolas, 'Courier New', monospace;
    color: ${props => props.isDark ? '#aaa' : '#666'};
  }
`;

const TypographyDemo = styled.div`
  margin-bottom: 24px;
  
  > div {
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 8px;
    background-color: ${props => props.isDark ? '#222' : '#f9f9f9'};
    border: 1px solid ${props => props.isDark ? '#333' : '#f0f0f0'};
  }
  
  h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 500;
    color: ${props => props.isDark ? '#aaa' : '#666'};
  }
`;

// 模拟数据 - 颜色
const themeColors = [
  { name: 'Primary', value: '#0066cc', desc: '主要按钮、强调元素' },
  { name: 'Secondary', value: '#8e44ad', desc: '次要按钮、补充元素' },
  { name: 'Success', value: '#10b981', desc: '成功状态、确认操作' },
  { name: 'Warning', value: '#f59e0b', desc: '警告提示、需注意操作' },
  { name: 'Error', value: '#ef4444', desc: '错误状态、危险操作' },
  { name: 'Info', value: '#3498db', desc: '信息提示、引导元素' },
];

// 模拟数据 - 中性色
const neutralColors = [
  { name: 'Text Primary', value: '#1d1d1f', desc: '主要文本' },
  { name: 'Text Secondary', value: '#86868b', desc: '次要文本' },
  { name: 'Border', value: '#e0e0e0', desc: '边框' },
  { name: 'Background', value: '#f5f5f7', desc: '背景' },
  { name: 'Card', value: '#ffffff', desc: '卡片背景' },
  { name: 'Disabled', value: '#cccccc', desc: '禁用状态' },
];

// 按钮属性
const buttonProps = [
  { name: 'variant', type: 'string', default: 'primary', desc: '按钮变体：primary, secondary, outline, ghost, destructive' },
  { name: 'size', type: 'string', default: 'md', desc: '按钮大小：sm, md, lg' },
  { name: 'fullWidth', type: 'boolean', default: 'false', desc: '是否占满容器宽度' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用' },
  { name: 'leftIcon', type: 'ReactNode', default: 'undefined', desc: '左侧图标' },
  { name: 'rightIcon', type: 'ReactNode', default: 'undefined', desc: '右侧图标' },
  { name: 'pill', type: 'boolean', default: 'false', desc: '是否使用胶囊形状' },
  { name: 'onClick', type: 'function', default: 'undefined', desc: '点击事件处理函数' },
];

const UiComponents = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [activeNav, setActiveNav] = useState('buttons');
  
  // 导航切换处理
  const handleNavChange = (navId) => {
    setActiveNav(navId);
    document.getElementById(navId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // 处理返回
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <Container isDark={isDark}>
      <Header isDark={isDark}>
        <HeaderLeft>
          <BackButton onClick={handleBack} style={{color: isDark ? '#60a5fa' : '#0066cc'}}>
            <ArrowBackIosNewIcon fontSize="small" />
            返回
          </BackButton>
          <Title isDark={isDark}>UI 组件库</Title>
        </HeaderLeft>
      </Header>
      
      <MainContent>
        <ComponentNav>
          <NavItem 
            active={activeNav === 'colors'} 
            isDark={isDark}
            onClick={() => handleNavChange('colors')}
          >
            <ColorLensIcon />
            颜色系统
          </NavItem>
          <NavItem 
            active={activeNav === 'typography'} 
            isDark={isDark}
            onClick={() => handleNavChange('typography')}
          >
            <TextFormatIcon />
            排版
          </NavItem>
          <NavItem 
            active={activeNav === 'buttons'} 
            isDark={isDark}
            onClick={() => handleNavChange('buttons')}
          >
            <WidgetsIcon />
            按钮
          </NavItem>
          <NavItem 
            active={activeNav === 'layout'} 
            isDark={isDark}
            onClick={() => handleNavChange('layout')}
          >
            <GridViewIcon />
            布局
          </NavItem>
        </ComponentNav>
        
        <div id="colors">
          <SectionTitle isDark={isDark}>
            <ColorLensIcon />
            颜色系统
          </SectionTitle>
          
          <ComponentCard isDark={isDark}>
            <ComponentDescription isDark={isDark}>
              颜色系统是设计语言的基础，为产品提供一致的视觉风格。我们的颜色系统针对Z世代女性用户设计，使用明亮、活泼的色调，同时确保满足WCAG 2.1无障碍标准。
            </ComponentDescription>
            
            <SubSectionTitle isDark={isDark}>主题色</SubSectionTitle>
            <ColorGrid>
              {themeColors.map((color) => (
                <ColorSwatch key={color.name} isDark={isDark}>
                  <ColorPreview color={color.value} />
                  <ColorInfo isDark={isDark}>
                    <h4>{color.name}</h4>
                    <span>{color.value}</span>
                  </ColorInfo>
                </ColorSwatch>
              ))}
            </ColorGrid>
            
            <SubSectionTitle isDark={isDark}>中性色</SubSectionTitle>
            <ColorGrid>
              {neutralColors.map((color) => (
                <ColorSwatch key={color.name} isDark={isDark}>
                  <ColorPreview color={color.value} />
                  <ColorInfo isDark={isDark}>
                    <h4>{color.name}</h4>
                    <span>{color.value}</span>
                  </ColorInfo>
                </ColorSwatch>
              ))}
            </ColorGrid>
          </ComponentCard>
        </div>
        
        <div id="typography">
          <SectionTitle isDark={isDark}>
            <TextFormatIcon />
            排版
          </SectionTitle>
          
          <ComponentCard isDark={isDark}>
            <ComponentDescription isDark={isDark}>
              我们的排版系统使用Apple风格的无衬线字体，具有清晰的层次结构和视觉节奏。字体优先使用系统字体，以确保最佳性能和本地化外观。
            </ComponentDescription>
            
            <TypographyDemo isDark={isDark}>
              <div>
                <h4>标题 1</h4>
                <div style={{ fontSize: '32px', fontWeight: '600', color: isDark ? '#f5f5f7' : '#1d1d1f' }}>
                  美妆产品设计系统
                </div>
              </div>
              
              <div>
                <h4>标题 2</h4>
                <div style={{ fontSize: '24px', fontWeight: '600', color: isDark ? '#f5f5f7' : '#1d1d1f' }}>
                  美妆产品设计系统
                </div>
              </div>
              
              <div>
                <h4>标题 3</h4>
                <div style={{ fontSize: '20px', fontWeight: '600', color: isDark ? '#f5f5f7' : '#1d1d1f' }}>
                  美妆产品设计系统
                </div>
              </div>
              
              <div>
                <h4>正文</h4>
                <div style={{ fontSize: '16px', fontWeight: '400', color: isDark ? '#e0e0e0' : '#1d1d1f' }}>
                  我们为美妆品牌打造的设计系统结合了现代美学与实用功能，专为Z世代女性用户设计。系统包含一套完整的UI组件和设计原则，确保产品的一致性和可用性。
                </div>
              </div>
              
              <div>
                <h4>小号文本</h4>
                <div style={{ fontSize: '14px', fontWeight: '400', color: isDark ? '#ccc' : '#86868b' }}>
                  小号文本通常用于辅助信息和注释，保持清晰可读。
                </div>
              </div>
              
              <div>
                <h4>标签文本</h4>
                <div style={{ fontSize: '12px', fontWeight: '500', letterSpacing: '0.5px', textTransform: 'uppercase', color: isDark ? '#aaa' : '#86868b' }}>
                  标签文本用于分类和标识
                </div>
              </div>
            </TypographyDemo>
          </ComponentCard>
        </div>
        
        <div id="buttons">
          <SectionTitle isDark={isDark}>
            <WidgetsIcon />
            按钮
          </SectionTitle>
          
          <ComponentCard isDark={isDark}>
            <ComponentDescription isDark={isDark}>
              按钮是用户交互的主要触发点。我们的按钮设计遵循Apple Human Interface Guidelines的原则，提供清晰的视觉反馈和交互状态。
            </ComponentDescription>
            
            <SubSectionTitle isDark={isDark}>变体</SubSectionTitle>
            <DemoSection isDark={isDark}>
              <Button variant="primary">主要按钮</Button>
              <Button variant="secondary">次要按钮</Button>
              <Button variant="outline">轮廓按钮</Button>
              <Button variant="ghost">幽灵按钮</Button>
              <Button variant="destructive">危险按钮</Button>
            </DemoSection>
            
            <SubSectionTitle isDark={isDark}>尺寸</SubSectionTitle>
            <DemoSection isDark={isDark}>
              <Button variant="primary" size="sm">小号按钮</Button>
              <Button variant="primary" size="md">中号按钮</Button>
              <Button variant="primary" size="lg">大号按钮</Button>
            </DemoSection>
            
            <SubSectionTitle isDark={isDark}>图标按钮</SubSectionTitle>
            <DemoSection isDark={isDark}>
              <Button variant="primary" leftIcon={<AddIcon />}>添加项目</Button>
              <Button variant="outline" rightIcon={<ArrowForwardIcon />}>下一步</Button>
              <Button variant="ghost" leftIcon={<CheckIcon />}>确认选择</Button>
            </DemoSection>
            
            <SubSectionTitle isDark={isDark}>禁用状态</SubSectionTitle>
            <DemoSection isDark={isDark}>
              <Button variant="primary" disabled>禁用按钮</Button>
              <Button variant="outline" disabled>禁用按钮</Button>
              <Button variant="ghost" disabled>禁用按钮</Button>
            </DemoSection>
            
            <SubSectionTitle isDark={isDark}>特殊形状</SubSectionTitle>
            <DemoSection isDark={isDark}>
              <Button variant="primary" pill>胶囊按钮</Button>
              <Button variant="outline" pill leftIcon={<AddIcon />}>添加项目</Button>
            </DemoSection>
            
            <SubSectionTitle isDark={isDark}>宽度</SubSectionTitle>
            <DemoSection isDark={isDark} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Button variant="primary">默认宽度</Button>
              <Button variant="primary" fullWidth>全宽按钮</Button>
            </DemoSection>
            
            <SubSectionTitle isDark={isDark}>使用示例</SubSectionTitle>
            <CodeBlock isDark={isDark}>
              {`import { Button } from '../design-system';

const MyComponent = () => {
  return (
    <div>
      <Button 
        variant="primary"
        size="md"
        leftIcon={<AddIcon />}
        onClick={() => console.log('Button clicked')}
      >
        添加项目
      </Button>
    </div>
  );
};`}
            </CodeBlock>
            
            <SubSectionTitle isDark={isDark}>属性说明</SubSectionTitle>
            <PropsTable>
              <TableHead isDark={isDark}>
                <tr>
                  <th>属性</th>
                  <th>类型</th>
                  <th>默认值</th>
                  <th>说明</th>
                </tr>
              </TableHead>
              <TableBody isDark={isDark}>
                {buttonProps.map((prop) => (
                  <tr key={prop.name}>
                    <td>{prop.name}</td>
                    <td>{prop.type}</td>
                    <td>{prop.default}</td>
                    <td>{prop.desc}</td>
                  </tr>
                ))}
              </TableBody>
            </PropsTable>
          </ComponentCard>
        </div>
        
        <div id="layout">
          <SectionTitle isDark={isDark}>
            <GridViewIcon />
            布局
          </SectionTitle>
          
          <ComponentCard isDark={isDark}>
            <ComponentDescription isDark={isDark}>
              布局系统提供一致的空间关系，确保UI元素在不同屏幕尺寸下保持视觉平衡和层次结构。我们采用8px基础网格系统，支持响应式设计。
            </ComponentDescription>
            
            <SubSectionTitle isDark={isDark}>间距系统</SubSectionTitle>
            <DemoSection isDark={isDark} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: isDark ? '#aaa' : '#666' }}>
                  xs (4px)
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FiberManualRecordIcon style={{ fontSize: '16px', color: isDark ? '#60a5fa' : '#0066cc' }} />
                  <FiberManualRecordIcon style={{ fontSize: '16px', color: isDark ? '#60a5fa' : '#0066cc' }} />
                </div>
              </div>
              
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: isDark ? '#aaa' : '#666' }}>
                  sm (8px)
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiberManualRecordIcon style={{ fontSize: '16px', color: isDark ? '#60a5fa' : '#0066cc' }} />
                  <FiberManualRecordIcon style={{ fontSize: '16px', color: isDark ? '#60a5fa' : '#0066cc' }} />
                </div>
              </div>
              
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: isDark ? '#aaa' : '#666' }}>
                  md (16px)
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <FiberManualRecordIcon style={{ fontSize: '16px', color: isDark ? '#60a5fa' : '#0066cc' }} />
                  <FiberManualRecordIcon style={{ fontSize: '16px', color: isDark ? '#60a5fa' : '#0066cc' }} />
                </div>
              </div>
              
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: isDark ? '#aaa' : '#666' }}>
                  lg (24px)
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <FiberManualRecordIcon style={{ fontSize: '16px', color: isDark ? '#60a5fa' : '#0066cc' }} />
                  <FiberManualRecordIcon style={{ fontSize: '16px', color: isDark ? '#60a5fa' : '#0066cc' }} />
                </div>
              </div>
              
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: isDark ? '#aaa' : '#666' }}>
                  xl (32px)
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                  <FiberManualRecordIcon style={{ fontSize: '16px', color: isDark ? '#60a5fa' : '#0066cc' }} />
                  <FiberManualRecordIcon style={{ fontSize: '16px', color: isDark ? '#60a5fa' : '#0066cc' }} />
                </div>
              </div>
            </DemoSection>
            
            <SubSectionTitle isDark={isDark}>响应式断点</SubSectionTitle>
            <PropsTable>
              <TableHead isDark={isDark}>
                <tr>
                  <th>名称</th>
                  <th>断点</th>
                  <th>描述</th>
                </tr>
              </TableHead>
              <TableBody isDark={isDark}>
                <tr>
                  <td>sm</td>
                  <td>{'<'} 640px</td>
                  <td>移动设备</td>
                </tr>
                <tr>
                  <td>md</td>
                  <td>{'≥'} 640px</td>
                  <td>平板竖屏</td>
                </tr>
                <tr>
                  <td>lg</td>
                  <td>{'≥'} 1024px</td>
                  <td>平板横屏和笔记本</td>
                </tr>
                <tr>
                  <td>xl</td>
                  <td>{'≥'} 1280px</td>
                  <td>台式机</td>
                </tr>
                <tr>
                  <td>2xl</td>
                  <td>{'≥'} 1536px</td>
                  <td>大屏幕</td>
                </tr>
              </TableBody>
            </PropsTable>
          </ComponentCard>
        </div>
        
        <div style={{ textAlign: 'center', margin: '40px 0', padding: '20px', borderRadius: '12px', backgroundColor: isDark ? '#2d2d2d' : '#f9f9f9' }}>
          <p style={{ color: isDark ? '#aaa' : '#666', fontSize: '14px' }}>© domiyoung__ 版权所有 | UI设计系统</p>
        </div>
      </MainContent>
    </Container>
  );
};

export default UiComponents; 