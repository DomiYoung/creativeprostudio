import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  background-color: #f5f5f7;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', Helvetica, Arial, sans-serif;
`;

const Header = styled.header`
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid #e0e0e0;
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
  color: #1d1d1f;
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
  color: #1d1d1f;
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

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.primary ? '#0066cc' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#0066cc'};
  border: ${props => props.primary ? 'none' : '1px solid #0066cc'};
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.primary ? '#004d99' : 'rgba(0, 102, 204, 0.05)'};
  }

  svg {
    margin-right: ${props => props.iconOnly ? '0' : '8px'};
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 60px);
`;

const LeftPanel = styled.div`
  width: 240px;
  background-color: white;
  border-right: 1px solid #e0e0e0;
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

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const ToolButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  border: none;
  background-color: ${props => props.active ? '#f0f0f0' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f7;
  }

  svg {
    font-size: 20px;
    color: #1d1d1f;
    margin-bottom: 4px;
  }

  span {
    font-size: 12px;
    color: #1d1d1f;
  }
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

const Canvas = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  transform: scale(${props => props.zoom});
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.2s;
`;

const ZoomControls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ZoomText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1f;
  margin: 0 8px;
`;

const ZoomButton = styled.button`
  width: 32px;
  height: 32px;
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
  
  &:disabled {
    color: #cccccc;
    cursor: not-allowed;
  }
  
  svg {
    font-size: 18px;
  }
`;

const RightPanel = styled.div`
  width: 280px;
  background-color: white;
  border-left: 1px solid #e0e0e0;
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

const CanvasEditor = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState('select');
  const [layers, setLayers] = useState(mockLayers);
  const [activeLayer, setActiveLayer] = useState(null);
  const [zoom, setZoom] = useState(0.8);
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
    if (zoom < 2) {
      setZoom(prevZoom => Math.min(prevZoom + 0.1, 2).toFixed(1));
    }
  };

  const handleZoomOut = () => {
    if (zoom > 0.2) {
      setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.2).toFixed(1));
    }
  };

  // 选择画布尺寸
  const handleCanvasSizeChange = (e) => {
    const selectedSize = canvasSizes.find(size => size.id === e.target.value);
    if (selectedSize) {
      setCanvasSize(selectedSize);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <BackButton onClick={handleBack}>
            <ArrowBackIosNewIcon fontSize="small" />
            返回
          </BackButton>
          <Title>画布编辑器</Title>
        </HeaderLeft>
        
        <HeaderCenter>
          <HistoryButton 
            onClick={handleUndo}
            disabled={historyIndex <= 0}
          >
            <UndoIcon />
          </HistoryButton>
          <HistoryButton 
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
          >
            <RedoIcon />
          </HistoryButton>
        </HeaderCenter>
        
        <HeaderRight>
          <ActionButton onClick={handleSave}>
            <SaveIcon fontSize="small" />
            保存
          </ActionButton>
          <ActionButton primary onClick={handleExport}>
            <DownloadIcon fontSize="small" />
            导出
          </ActionButton>
        </HeaderRight>
      </Header>
      
      <Content>
        <LeftPanel>
          <PanelSection>
            <h2>画布尺寸</h2>
            <PropertyRow>
              <select 
                value={canvasSize.id}
                onChange={handleCanvasSizeChange}
              >
                {canvasSizes.map(size => (
                  <option key={size.id} value={size.id}>
                    {size.name} - {size.width}x{size.height}
                  </option>
                ))}
              </select>
            </PropertyRow>
          </PanelSection>
          
          <PanelSection>
            <h2>工具</h2>
            <ToolsGrid>
              {mockTools.map(tool => (
                <ToolButton 
                  key={tool.id}
                  active={activeTool === tool.id}
                  onClick={() => handleToolSelect(tool.id)}
                >
                  {tool.icon}
                  <span>{tool.name}</span>
                </ToolButton>
              ))}
            </ToolsGrid>
          </PanelSection>
          
          <PanelSection style={{ flex: 1 }}>
            <h2>图层</h2>
            <LayersPanel>
              <LayersList>
                {layers.map(layer => (
                  <LayerItem 
                    key={layer.id}
                    active={activeLayer === layer.id}
                    onClick={() => handleLayerSelect(layer.id)}
                  >
                    {layer.type === 'image' && <ImageIcon fontSize="small" />}
                    {layer.type === 'text' && <TextFieldsIcon fontSize="small" />}
                    {layer.type === 'shape' && <AddCircleOutlineIcon fontSize="small" />}
                    <LayerName visible={layer.visible}>{layer.name}</LayerName>
                    <LayerIcon onClick={(e) => {
                      e.stopPropagation();
                      toggleLayerVisibility(layer.id);
                    }}>
                      {layer.visible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                    </LayerIcon>
                    <LayerIcon onClick={(e) => {
                      e.stopPropagation();
                      toggleLayerLock(layer.id);
                    }}>
                      {layer.locked ? <LockIcon fontSize="small" /> : <LockOpenIcon fontSize="small" />}
                    </LayerIcon>
                  </LayerItem>
                ))}
              </LayersList>
            </LayersPanel>
          </PanelSection>
        </LeftPanel>
        
        <WorkArea>
          <Canvas 
            width={canvasSize.width} 
            height={canvasSize.height} 
            zoom={zoom}
          >
            {/* 此处将会放置画布上的各种元素 */}
          </Canvas>
          
          <ZoomControls>
            <ZoomButton 
              onClick={handleZoomOut}
              disabled={zoom <= 0.2}
            >
              <ZoomOutIcon />
            </ZoomButton>
            <ZoomText>{Math.round(zoom * 100)}%</ZoomText>
            <ZoomButton 
              onClick={handleZoomIn}
              disabled={zoom >= 2}
            >
              <ZoomInIcon />
            </ZoomButton>
          </ZoomControls>
        </WorkArea>
        
        <RightPanel>
          <PropertyPanel>
            <PropertyGroup>
              <h3>基本属性</h3>
              <PropertyRow>
                <label>位置 X</label>
                <input type="number" placeholder="0" />
              </PropertyRow>
              <PropertyRow>
                <label>位置 Y</label>
                <input type="number" placeholder="0" />
              </PropertyRow>
              <PropertyRow>
                <label>宽度</label>
                <input type="number" placeholder="200" />
              </PropertyRow>
              <PropertyRow>
                <label>高度</label>
                <input type="number" placeholder="200" />
              </PropertyRow>
              <PropertyRow>
                <label>旋转</label>
                <input type="number" placeholder="0" />
              </PropertyRow>
            </PropertyGroup>
            
            <PropertyGroup>
              <h3>样式</h3>
              <PropertyRow>
                <label>填充颜色</label>
                <input type="color" defaultValue="#FFFFFF" />
              </PropertyRow>
              <PropertyRow>
                <label>不透明度</label>
                <input type="range" min="0" max="100" defaultValue="100" />
              </PropertyRow>
            </PropertyGroup>
            
            <PropertyGroup>
              <h3>文本样式</h3>
              <PropertyRow>
                <label>字体</label>
                <select>
                  <option>苹方</option>
                  <option>黑体</option>
                  <option>宋体</option>
                  <option>Arial</option>
                </select>
              </PropertyRow>
              <PropertyRow>
                <label>大小</label>
                <input type="number" placeholder="16" />
              </PropertyRow>
              <PropertyRow>
                <label>颜色</label>
                <input type="color" defaultValue="#000000" />
              </PropertyRow>
              <PropertyRow>
                <label>对齐</label>
                <ButtonGroup>
                  <button className="active">
                    <FormatAlignLeftIcon />
                  </button>
                  <button>
                    <FormatAlignCenterIcon />
                  </button>
                  <button>
                    <FormatAlignRightIcon />
                  </button>
                </ButtonGroup>
              </PropertyRow>
              <PropertyRow>
                <label>样式</label>
                <ButtonGroup>
                  <button className="active">
                    <FormatBoldIcon />
                  </button>
                  <button>
                    <FormatItalicIcon />
                  </button>
                  <button>
                    <FormatUnderlinedIcon />
                  </button>
                </ButtonGroup>
              </PropertyRow>
            </PropertyGroup>
          </PropertyPanel>
        </RightPanel>
      </Content>
    </Container>
  );
};

export default CanvasEditor; 