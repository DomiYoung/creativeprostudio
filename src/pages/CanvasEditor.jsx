import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme, Button } from '../design-system';

// 图标导入
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import LayersIcon from '@mui/icons-material/Layers';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import CropIcon from '@mui/icons-material/Crop';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import PaletteIcon from '@mui/icons-material/Palette';
import CropFreeIcon from '@mui/icons-material/CropFree';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BackspaceIcon from '@mui/icons-material/Backspace';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

// 模拟数据
const mockLayers = [
  { id: 1, name: '背景图层', type: 'image', visible: true, locked: false },
  { id: 2, name: '文本标题', type: 'text', visible: true, locked: false },
  { id: 3, name: '产品标签', type: 'shape', visible: true, locked: false },
  { id: 4, name: '价格文本', type: 'text', visible: true, locked: false },
];

const mockTools = [
  { id: 'select', name: '选择', icon: <CropFreeIcon /> },
  { id: 'text', name: '文字', icon: <TextFieldsIcon /> },
  { id: 'image', name: '图片', icon: <ImageIcon /> },
  { id: 'crop', name: '裁剪', icon: <CropIcon /> },
  { id: 'fill', name: '填充', icon: <FormatColorFillIcon /> },
  { id: 'shapes', name: '形状', icon: <AddCircleOutlineIcon /> },
];

// 画布预设尺寸
const canvasSizes = [
  { id: 'instagram', name: 'Instagram帖子', width: 1080, height: 1080 },
  { id: 'story', name: '故事/朋友圈', width: 1080, height: 1920 },
  { id: 'banner', name: '横幅', width: 1200, height: 628 },
  { id: 'product', name: '产品展示', width: 800, height: 1000 },
];

// 样式组件
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.backgroundColor};
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', Helvetica, Arial, sans-serif;
`;

const Header = styled.header`
  height: 60px;
  background-color: ${props => props.backgroundColor};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.borderBottomColor};
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
  color: ${props => props.color};
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
  color: ${props => props.color};
  margin: 0;
`;

const HeaderCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HistoryButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${props => props.color};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &:disabled {
    color: #cccccc;
    cursor: not-allowed;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 60px);
`;

const LeftPanel = styled.div`
  width: 240px;
  background-color: ${props => props.backgroundColor};
  border-right: 1px solid ${props => props.borderRightColor};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const PanelSection = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;

  h2 {
    font-size: 14px;
    font-weight: 600;
    color: #1d1d1f;
    margin: 0 0 16px 0;
  }
`;

const PanelTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.color};
  margin: 0 0 16px 0;
`;

const CanvasSizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CanvasSizeOption = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid ${props => props.borderColor};
  background-color: ${props => props.backgroundColor};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#f0f0f0' : '#f5f5f7'};
  }

  div {
    font-size: 12px;
    color: ${props => props.color};
  }
`;

const ToolsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ToolButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${props => props.borderColor};
  background-color: ${props => props.backgroundColor};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#f0f0f0' : '#f5f5f7'};
  }

  svg {
    font-size: 20px;
    color: ${props => props.color};
    margin-bottom: 4px;
  }

  span {
    font-size: 12px;
    color: ${props => props.color};
  }
`;

const ToolName = styled.span`
  font-size: 12px;
  color: ${props => props.color};
`;

const LayersPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const LayersList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LayerItem = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 4px;
  background-color: ${props => props.active ? '#f0f0f0' : 'transparent'};
  
  &:hover {
    background-color: ${props => props.active ? '#f0f0f0' : '#f8f8f8'};
  }
`;

const LayerName = styled.span`
  flex: 1;
  font-size: 13px;
  margin-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.visible ? '#1d1d1f' : '#999999'};
  text-decoration: ${props => props.visible ? 'none' : 'line-through'};
`;

const LayerIcon = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #1d1d1f;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  svg {
    font-size: 16px;
  }
`;

const WorkArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f7;
  position: relative;
  overflow: auto;
`;

const CanvasContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: auto;
  padding: 40px;
  background-color: ${props => props.backgroundColor};
`;

const Canvas = styled.div`
  width: ${props => props.size.width * props.zoom}px;
  height: ${props => props.size.height * props.zoom}px;
  background-color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transform-origin: center;
`;

const ZoomControls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ZoomText = styled.span`
  font-size: 12px;
  margin: 0 8px;
  color: ${props => props.color};
`;

const LayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LayerControls = styled.div`
  display: flex;
  gap: 4px;
`;

const RightPanel = styled.div`
  width: 280px;
  background-color: ${props => props.backgroundColor};
  border-left: 1px solid ${props => props.borderLeftColor};
  overflow-y: auto;
`;

const PropertyPanel = styled.div`
  padding: 16px;
`;

const PropertyGroup = styled.div`
  margin-bottom: 20px;
  
  h3 {
    font-size: 14px;
    font-weight: 600;
    color: #1d1d1f;
    margin: 0 0 12px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f0f0;
  }
`;

const PropertyRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  
  label {
    flex: 1;
    font-size: 13px;
    color: #666;
  }
  
  input, select {
    flex: 2;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    font-size: 13px;
    outline: none;
    
    &:focus {
      border-color: #0066cc;
      box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
    }
  }
  
  input[type="color"] {
    padding: 2px;
    height: 30px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
  
  button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    background-color: #f5f5f7;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    color: #1d1d1f;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background-color: #e8e8e8;
    }
    
    &.active {
      background-color: #0066cc;
      color: white;
      border-color: #0066cc;
    }
    
    svg {
      font-size: 16px;
    }
  }
`;

const ZoomButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.disabled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)'};
  border: none;
  border-radius: 4px;
  color: ${props => props.disabled ? '#999' : '#333'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.9);
  }
  
  svg {
    font-size: 18px;
  }
`;

const CanvasEditor = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [activeTool, setActiveTool] = useState('select');
  const [layers, setLayers] = useState(mockLayers);
  const [activeLayer, setActiveLayer] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [canvasSize, setCanvasSize] = useState(canvasSizes[0]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // 处理工具选择
  const handleToolSelect = (toolId) => {
    setActiveTool(toolId);
  };

  // 处理图层可见性切换
  const toggleLayerVisibility = (layerId) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  // 处理图层锁定切换
  const toggleLayerLock = (layerId) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, locked: !layer.locked } : layer
    ));
  };

  // 处理图层选择
  const handleLayerSelect = (layerId) => {
    setActiveLayer(layerId);
  };

  // 处理返回按钮
  const handleBack = () => {
    navigate(-1); // 返回上一页
  };

  // 处理撤销操作
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      // 应用历史记录中的状态
    }
  };

  // 处理重做操作
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      // 应用历史记录中的状态
    }
  };

  // 处理保存操作
  const handleSave = () => {
    console.log('保存当前设计');
    // 保存当前设计的逻辑
  };

  // 处理导出操作
  const handleExport = () => {
    console.log('导出当前设计');
    // 导出当前设计的逻辑
  };

  // 处理缩放
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.25));
  };

  // 选择画布尺寸
  const handleCanvasSizeChange = (e) => {
    const selectedSize = canvasSizes.find(size => size.id === e.target.value);
    if (selectedSize) {
      setCanvasSize(selectedSize);
    }
  };

  return (
    <Container style={{backgroundColor: isDark ? '#121212' : '#f5f5f7', color: isDark ? '#f5f5f7' : '#1d1d1f'}}>
      <Header style={{backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)', borderBottomColor: isDark ? '#333' : '#e0e0e0'}}>
        <HeaderLeft>
          <BackButton onClick={handleBack} style={{color: isDark ? '#60a5fa' : '#0066cc'}}>
            <ArrowBackIosNewIcon fontSize="small" />
            返回
          </BackButton>
          <Title style={{color: isDark ? '#f5f5f7' : '#1d1d1f'}}>画布编辑器</Title>
        </HeaderLeft>
        
        <HeaderCenter>
          <HistoryButton 
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            style={{color: isDark ? (historyIndex <= 0 ? '#555' : '#f5f5f7') : (historyIndex <= 0 ? '#cccccc' : '#1d1d1f')}}
          >
            <UndoIcon />
          </HistoryButton>
          <HistoryButton 
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            style={{color: isDark ? (historyIndex >= history.length - 1 ? '#555' : '#f5f5f7') : (historyIndex >= history.length - 1 ? '#cccccc' : '#1d1d1f')}}
          >
            <RedoIcon />
          </HistoryButton>
        </HeaderCenter>
        
        <HeaderRight>
          <Button
            variant="outline"
            size="md"
            leftIcon={<SaveIcon fontSize="small" />}
            onClick={handleSave}
          >
            保存
          </Button>
          <Button
            variant="primary"
            size="md"
            leftIcon={<DownloadIcon fontSize="small" />}
            onClick={handleExport}
          >
            导出
          </Button>
        </HeaderRight>
      </Header>
      
      <Content>
        <LeftPanel style={{backgroundColor: isDark ? '#1e1e1e' : 'white', borderRightColor: isDark ? '#333' : '#e0e0e0'}}>
          <PanelSection>
            <PanelTitle style={{color: isDark ? '#f5f5f7' : '#1d1d1f'}}>画布尺寸</PanelTitle>
            <CanvasSizeContainer>
              {canvasSizes.map((size) => (
                <CanvasSizeOption 
                  key={size.name}
                  active={canvasSize.name === size.name}
                  onClick={() => setCanvasSize(size)}
                  style={{
                    backgroundColor: isDark 
                      ? (canvasSize.name === size.name ? '#333' : '#1e1e1e') 
                      : (canvasSize.name === size.name ? '#f0f0f0' : 'white'),
                    color: isDark ? '#f5f5f7' : '#1d1d1f',
                    borderColor: isDark ? '#444' : '#e0e0e0'
                  }}
                >
                  <div>{size.name}</div>
                  <div>{size.width} × {size.height}px</div>
                </CanvasSizeOption>
              ))}
            </CanvasSizeContainer>
          </PanelSection>
          
          <PanelSection>
            <PanelTitle style={{color: isDark ? '#f5f5f7' : '#1d1d1f'}}>工具</PanelTitle>
            <ToolsContainer>
              {mockTools.map((tool) => (
                <ToolButton 
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  active={activeTool === tool.id}
                  style={{
                    backgroundColor: isDark 
                      ? (activeTool === tool.id ? '#333' : '#1e1e1e') 
                      : (activeTool === tool.id ? '#f0f0f0' : 'white'),
                    color: isDark 
                      ? (activeTool === tool.id ? '#60a5fa' : '#f5f5f7') 
                      : (activeTool === tool.id ? '#0066cc' : '#1d1d1f'),
                    borderColor: isDark ? '#444' : '#e0e0e0'
                  }}
                >
                  {tool.icon}
                  <ToolName>{tool.name}</ToolName>
                </ToolButton>
              ))}
            </ToolsContainer>
          </PanelSection>
        </LeftPanel>
        
        <WorkArea>
          <CanvasContainer backgroundColor={isDark ? '#1e1e1e' : 'white'}>
            <Canvas 
              size={canvasSize}
              zoom={zoom}
            >
              {/* 此处将会放置画布上的各种元素 */}
            </Canvas>
          </CanvasContainer>
          
          <ZoomControls>
            <ZoomButton 
              onClick={handleZoomOut}
              disabled={zoom <= 0.25}
            >
              <ZoomOutIcon />
            </ZoomButton>
            <ZoomText color={isDark ? '#f5f5f7' : '#1d1d1f'}>{Math.round(zoom * 100)}%</ZoomText>
            <ZoomButton 
              onClick={handleZoomIn}
              disabled={zoom >= 2}
            >
              <ZoomInIcon />
            </ZoomButton>
          </ZoomControls>
        </WorkArea>
        
        <RightPanel style={{backgroundColor: isDark ? '#1e1e1e' : 'white', borderLeftColor: isDark ? '#333' : '#e0e0e0'}}>
          <PanelSection>
            <PanelTitle style={{color: isDark ? '#f5f5f7' : '#1d1d1f'}}>
              <LayersIcon style={{marginRight: '8px'}} />
              图层
              <Button 
                variant="ghost" 
                size="sm" 
                style={{marginLeft: 'auto'}} 
                onClick={() => {
                  const newLayer = { id: `layer-${layers.length + 1}`, name: `图层 ${layers.length + 1}`, type: 'shape', visible: true, locked: false };
                  setLayers([...layers, newLayer]);
                }}
                leftIcon={<AddCircleOutlineIcon fontSize="small" />}
              />
            </PanelTitle>
            <LayersContainer>
              {layers.map((layer) => (
                <LayerItem 
                  key={layer.id}
                  active={activeLayer?.id === layer.id}
                  onClick={() => setActiveLayer(layer)}
                  style={{
                    backgroundColor: isDark 
                      ? (activeLayer?.id === layer.id ? '#333' : '#1e1e1e') 
                      : (activeLayer?.id === layer.id ? '#f0f0f0' : 'white'),
                    color: isDark ? '#f5f5f7' : '#1d1d1f',
                    borderColor: isDark ? '#444' : '#e0e0e0'
                  }}
                >
                  <LayerName>{layer.name}</LayerName>
                  <LayerControls>
                    <Button 
                      variant="ghost" 
                      size="xs" 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLayerVisibility(layer.id);
                      }}
                      leftIcon={layer.visible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                    />
                    <Button 
                      variant="ghost" 
                      size="xs" 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLayerLock(layer.id);
                      }}
                      leftIcon={layer.locked ? <LockIcon fontSize="small" /> : <LockOpenIcon fontSize="small" />}
                    />
                    <Button 
                      variant="ghost" 
                      size="xs" 
                      onClick={(e) => {
                        e.stopPropagation();
                        const newLayers = layers.filter(l => l.id !== layer.id);
                        setLayers(newLayers);
                        if (activeLayer?.id === layer.id) {
                          setActiveLayer(null);
                        }
                      }}
                      leftIcon={<DeleteIcon fontSize="small" style={{color: isDark ? '#ff6b6b' : '#d32f2f'}} />}
                    />
                  </LayerControls>
                </LayerItem>
              ))}
            </LayersContainer>
          </PanelSection>
        </RightPanel>
      </Content>
    </Container>
  );
};

export default CanvasEditor; 