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

// 在模拟数据部分添加背景和促销机制相关数据
const mockBackgrounds = [
  { id: 'bg1', name: '简约白色', color: '#FFFFFF', type: 'color' },
  { id: 'bg2', name: '渐变红粉', gradient: 'linear-gradient(135deg, #FF9190 0%, #FFCCCB 100%)', type: 'gradient' },
  { id: 'bg3', name: '节日主题', url: 'https://via.placeholder.com/800x800/F9FAFB/1D1D1F?text=节日背景', type: 'image' },
  { id: 'bg4', name: '618活动', url: 'https://via.placeholder.com/800x800/FFE5E0/1D1D1F?text=618背景', type: 'image' },
];

const mockPromotions = [
  { id: 'promo1', name: '买2赠3', description: '买2赠3', type: 'text', color: '#FF3B30' },
  { id: 'promo2', name: '买1送200毫升', description: '买1送200毫升', type: 'text', color: '#FF9500' },
  { id: 'promo3', name: '第2件半价', description: '第2件半价', type: 'text', color: '#5856D6' },
  { id: 'promo4', name: '满399减100', description: '满399减100', type: 'text', color: '#34C759' },
];

// 模拟绘图元素数据
const mockElements = [
  { id: 'elem1', type: 'text', x: 100, y: 100, width: 200, height: 50, content: '标题文本', fontSize: 24, fontWeight: 'bold', color: '#000000' },
  { id: 'elem2', type: 'image', x: 100, y: 200, width: 300, height: 200, src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  { id: 'elem3', type: 'shape', x: 450, y: 100, width: 150, height: 150, shapeType: 'rectangle', backgroundColor: '#FF9190', borderRadius: '10px' },
  // 新增背景元素
  { id: 'background', type: 'background', x: 0, y: 0, width: '100%', height: '100%', backgroundType: 'color', backgroundColor: '#FFFFFF' },
  // 新增促销机制元素
  { id: 'promotion', type: 'promotion', x: 50, y: 50, width: 120, height: 40, content: '买2赠3', backgroundColor: '#FF3B30', color: '#FFFFFF', borderRadius: '20px' },
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
  background-color: ${props => props.$backgroundColor};
  transition: background-color 0.3s ease;
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
  color: ${props => props.$color};
  margin: 0 8px;
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

// 添加背景面板和促销机制面板的样式
const BackgroundOptionsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const BackgroundOption = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  border: 2px solid ${props => props.selected ? '#0066cc' : 'transparent'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  transition: all 0.2s ease;
`;

const ColorBackground = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${props => props.$color};
`;

const GradientBackground = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.gradient};
`;

const ImageBackground = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
`;

const PromotionOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PromotionOption = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: ${props => props.selected ? '#f0f0f0' : 'white'};
  border: 1px solid ${props => props.selected ? '#0066cc' : '#e0e0e0'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:hover {
    background-color: #f5f5f7;
  }
`;

const PromotionPreview = styled.div`
  padding: 6px 12px;
  border-radius: 4px;
  background-color: ${props => props.$color};
  color: white;
  font-size: 12px;
  font-weight: 500;
`;

const SizeButton = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid ${props => props.$active ? '#007AFF' : 'rgba(0, 0, 0, 0.1)'};
  background: ${props => props.$active ? 'rgba(0, 122, 255, 0.1)' : 'transparent'};
  color: ${props => props.$active ? '#007AFF' : '#333'};
  font-size: 12px;
  margin-right: 8px;
  cursor: pointer;
  
  &:hover {
    background: rgba(0, 122, 255, 0.05);
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
  const [projectId, setProjectId] = useState(null);
  const [templateId, setTemplateId] = useState(null);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [editorTitle, setEditorTitle] = useState("画布编辑器");
  const [elements, setElements] = useState(mockElements);
  const [selectedElement, setSelectedElement] = useState(null);
  const [dragState, setDragState] = useState({ isDragging: false, startX: 0, startY: 0, elementId: null });
  const [canvasBackgroundImage, setCanvasBackgroundImage] = useState(null);
  
  // 新增状态
  const [selectedTool, setSelectedTool] = useState('select');
  const [selectedCanvasSize, setSelectedCanvasSize] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(800);
  const [canvasElements, setCanvasElements] = useState(mockElements);
  
  // 新增状态
  const [selectedBackground, setSelectedBackground] = useState('bg1');
  const [selectedPromotion, setSelectedPromotion] = useState('promo1');
  const [showBackgroundPanel, setShowBackgroundPanel] = useState(false);
  const [showPromotionPanel, setShowPromotionPanel] = useState(false);
  
  // 初始化 - 检查URL参数
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const projectParam = queryParams.get('project');
    const templateParam = queryParams.get('template');
    const imageParam = queryParams.get('image');
    const createParam = queryParams.get('create');
    
    if (projectParam) {
      setProjectId(projectParam);
      setEditorTitle("项目画布编辑");
      // 这里可以根据项目ID加载相应的项目数据
      console.log(`加载项目ID: ${projectParam}，类型: ${typeof projectParam}`);
      
      // 检查是否有图片参数
      if (imageParam) {
        console.log(`加载图片ID: ${imageParam}`);
        setEditorTitle(`编辑图片 - ID:${imageParam}`);
        
        // 模拟加载图片数据
        const mockImages = [
          { id: '101', url: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg', name: '首页Banner' },
          { id: '102', url: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg', name: '产品展示图1' },
          { id: '103', url: 'https://images.pexels.com/photos/4620843/pexels-photo-4620843.jpeg', name: '产品展示图2' },
          { id: '104', url: 'https://images.pexels.com/photos/3826678/pexels-photo-3826678.jpeg', name: '社交媒体宣传图' },
          { id: '105', url: 'https://images.pexels.com/photos/8128072/pexels-photo-8128072.jpeg', name: 'KOL合作视觉' },
          { id: '106', url: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg', name: '线下活动海报' }
        ];
        
        // 查找匹配的图片
        const foundImage = mockImages.find(img => img.id === imageParam);
        if (foundImage) {
          // 设置背景图片
          setCanvasBackgroundImage(foundImage.url);
          setEditorTitle(`编辑 "${foundImage.name}"`);
        }
      }
      
      // 这里模拟从服务器加载项目数据
      // 注意确保ID的类型匹配 - URL参数总是字符串
      const loadProjectData = () => {
        console.log("正在加载项目数据...");
        // 实际项目中，这里应该是一个API调用
        // 现在只是演示用
      };
      
      loadProjectData();
    } else if (templateParam) {
      setTemplateId(templateParam);
      setEditorTitle("模板画布编辑");
      // 这里可以根据模板ID加载相应的模板数据
      console.log(`加载模板ID: ${templateParam}`);
    } else if (createParam === 'template') {
      setIsCreatingTemplate(true);
      setEditorTitle("创建新模板");
      // 初始化一个空白模板
      console.log("创建新模板");
    } else {
      console.log("未指定项目或模板ID，创建空白画布");
    }
  }, []);

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
    
    if (projectId) {
      // 保存项目设计
      console.log(`保存项目ID: ${projectId}`);
      // TODO: 实现项目保存API调用
    } else if (templateId || isCreatingTemplate) {
      // 保存为模板
      console.log(`保存为模板: ${templateId || '新模板'}`);
      // TODO: 实现模板保存API调用
    }
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

  // 打开模板库
  const handleOpenTemplateLibrary = () => {
    navigate('/creativeprostudio/master-library');
  };

  // 处理元素选择
  const handleElementSelect = (elementId) => {
    setSelectedElement(elementId);
  };

  // 开始拖拽元素
  const handleDragStart = (e, elementId) => {
    e.stopPropagation();
    setDragState({
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      elementId
    });
    handleElementSelect(elementId);
  };

  // 拖拽元素
  const handleDragMove = (e) => {
    if (!dragState.isDragging) return;
    
    const deltaX = e.clientX - dragState.startX;
    const deltaY = e.clientY - dragState.startY;
    
    setElements(elements.map(element => {
      if (element.id === dragState.elementId) {
        return {
          ...element,
          x: element.x + deltaX,
          y: element.y + deltaY
        };
      }
      return element;
    }));
    
    setDragState({
      ...dragState,
      startX: e.clientX,
      startY: e.clientY
    });
  };

  // 结束拖拽
  const handleDragEnd = () => {
    setDragState({ isDragging: false, startX: 0, startY: 0, elementId: null });
  };

  // 渲染画布元素
  const renderCanvasElement = (element) => {
    const isSelected = selectedElement === element.id;
    const baseStyle = {
      position: 'absolute',
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
      cursor: 'move',
      border: isSelected ? '2px solid #60a5fa' : 'none',
      boxShadow: isSelected ? '0 0 10px rgba(0, 102, 204, 0.3)' : 'none',
      userSelect: 'none'
    };
    
    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              fontSize: `${element.fontSize}px`,
              fontWeight: element.fontWeight,
              color: element.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
            onMouseDown={(e) => handleDragStart(e, element.id)}
          >
            {element.content}
          </div>
        );
      case 'image':
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              backgroundImage: `url(${element.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onMouseDown={(e) => handleDragStart(e, element.id)}
          />
        );
      case 'shape':
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              backgroundColor: element.backgroundColor,
              borderRadius: element.borderRadius
            }}
            onMouseDown={(e) => handleDragStart(e, element.id)}
          />
        );
      default:
        return null;
    }
  };

  const renderCanvas = () => {
    const canvasContainerStyle = {
      width: `${canvasSize.width}px`,
      height: `${canvasSize.height}px`,
      background: canvasBackgroundImage 
        ? `url(${canvasBackgroundImage}) no-repeat center/cover`
        : isDark ? '#2c2c2e' : '#f5f5f7',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
      transform: `scale(${zoom})`,
      transformOrigin: 'center center',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
    };

    return (
      <div 
        style={canvasContainerStyle}
        onMouseDown={handleDragEnd}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
      >
        {elements.map(element => renderCanvasElement(element))}
      </div>
    );
  };

  // 新增背景处理函数
  const handleBackgroundChange = (backgroundId) => {
    setSelectedBackground(backgroundId);
    const background = mockBackgrounds.find(bg => bg.id === backgroundId);
    
    if(background) {
      // 更新背景元素
      const updatedElements = canvasElements.map(elem => {
        if(elem.id === 'background') {
          if(background.type === 'color') {
            return { ...elem, backgroundType: 'color', backgroundColor: background.color };
          } else if(background.type === 'gradient') {
            return { ...elem, backgroundType: 'gradient', gradient: background.gradient };
          } else if(background.type === 'image') {
            return { ...elem, backgroundType: 'image', backgroundUrl: background.url };
          }
        }
        return elem;
      });
      
      setCanvasElements(updatedElements);
    }
  };
  
  // 新增促销机制处理函数
  const handlePromotionChange = (promotionId) => {
    setSelectedPromotion(promotionId);
    const promotion = mockPromotions.find(promo => promo.id === promotionId);
    
    if(promotion) {
      // 更新促销机制元素
      const updatedElements = canvasElements.map(elem => {
        if(elem.id === 'promotion') {
          return { 
            ...elem, 
            content: promotion.description, 
            backgroundColor: promotion.color
          };
        }
        return elem;
      });
      
      setCanvasElements(updatedElements);
    }
  };

  // 切换背景面板显示
  const toggleBackgroundPanel = () => {
    setShowBackgroundPanel(!showBackgroundPanel);
    setShowPromotionPanel(false);
  };
  
  // 切换促销机制面板显示
  const togglePromotionPanel = () => {
    setShowPromotionPanel(!showPromotionPanel);
    setShowBackgroundPanel(false);
  };

  return (
    <Container style={{backgroundColor: isDark ? '#121212' : '#f5f5f7', color: isDark ? '#f5f5f7' : '#1d1d1f'}}>
      <Header style={{backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)', borderBottomColor: isDark ? '#333' : '#e0e0e0'}}>
        <HeaderLeft>
          <BackButton onClick={handleBack} style={{color: isDark ? '#60a5fa' : '#0066cc'}}>
            <ArrowBackIosNewIcon fontSize="small" />
            返回
          </BackButton>
          <Title style={{color: isDark ? '#f5f5f7' : '#1d1d1f'}}>{editorTitle}</Title>
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
          {templateId && (
            <Button
              variant="outline"
              size="md"
              leftIcon={<AutoFixHighIcon fontSize="small" />}
              onClick={() => {
                // 复制现有模板
                console.log("复制模板:", templateId);
                setIsCreatingTemplate(true);
                setTemplateId(null);
                setEditorTitle("从模板创建新模板");
              }}
            >
              复制模板
            </Button>
          )}
          
          {projectId && !isCreatingTemplate && (
            <Button
              variant="outline"
              size="md"
              leftIcon={<LayersIcon fontSize="small" />}
              onClick={() => {
                // 将项目保存为模板
                console.log("将项目保存为模板");
                setIsCreatingTemplate(true);
                setEditorTitle("保存为模板");
              }}
            >
              保存为模板
            </Button>
          )}
          
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
                <SizeButton 
                  key={size.id}
                  $active={canvasSize.name === size.name}
                  onClick={() => setCanvasSize(size)}
                >
                  {size.name}
                </SizeButton>
              ))}
            </CanvasSizeContainer>
          </PanelSection>
          
          <PanelSection>
            <PanelTitle style={{color: isDark ? '#f5f5f7' : '#1d1d1f'}}>模板与库</PanelTitle>
            <ToolButton 
              onClick={handleOpenTemplateLibrary}
              style={{
                backgroundColor: isDark ? '#1e1e1e' : 'white',
                color: isDark ? '#f5f5f7' : '#1d1d1f',
                borderColor: isDark ? '#444' : '#e0e0e0'
              }}
            >
              <LayersIcon />
              <ToolName>模板库</ToolName>
            </ToolButton>
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
          
          {/* 背景设置面板 */}
          <PanelSection>
            <PanelTitle color="#1d1d1f">背景设置</PanelTitle>
            <Button fullWidth variant="outlined" color="secondary" onClick={toggleBackgroundPanel}>
              更换背景
            </Button>
            
            {showBackgroundPanel && (
              <BackgroundOptionsList>
                {mockBackgrounds.map(bg => (
                  <BackgroundOption 
                    key={bg.id} 
                    selected={selectedBackground === bg.id}
                    onClick={() => handleBackgroundChange(bg.id)}
                  >
                    {bg.type === 'color' && <ColorBackground $color={bg.color} />}
                    {bg.type === 'gradient' && <GradientBackground gradient={bg.gradient} />}
                    {bg.type === 'image' && <ImageBackground url={bg.url} />}
                  </BackgroundOption>
                ))}
              </BackgroundOptionsList>
            )}
          </PanelSection>
          
          {/* 促销机制面板 */}
          <PanelSection>
            <PanelTitle color="#1d1d1f">促销机制设置</PanelTitle>
            <Button fullWidth variant="outlined" color="secondary" onClick={togglePromotionPanel}>
              更换促销机制
            </Button>
            
            {showPromotionPanel && (
              <PromotionOptionsList>
                {mockPromotions.map(promo => (
                  <PromotionOption 
                    key={promo.id} 
                    selected={selectedPromotion === promo.id}
                    onClick={() => handlePromotionChange(promo.id)}
                  >
                    <span>{promo.name}</span>
                    <PromotionPreview $color={promo.color}>
                      {promo.description}
                    </PromotionPreview>
                  </PromotionOption>
                ))}
              </PromotionOptionsList>
            )}
          </PanelSection>
        </LeftPanel>
        
        <WorkArea>
          <CanvasContainer $backgroundColor={isDark ? '#1e1e1e' : 'white'}>
            {renderCanvas()}
          </CanvasContainer>
          
          <ZoomControls>
            <ZoomButton 
              onClick={handleZoomOut}
              disabled={zoom <= 0.25}
            >
              <ZoomOutIcon />
            </ZoomButton>
            <ZoomText $color={isDark ? '#f5f5f7' : '#1d1d1f'}>{Math.round(zoom * 100)}%</ZoomText>
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
                onClick={(e) => {
                  e.stopPropagation();
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
                  $active={activeLayer?.id === layer.id}
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