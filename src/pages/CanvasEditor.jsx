import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import GridOnIcon from '@mui/icons-material/GridOn';
import GridOffIcon from '@mui/icons-material/GridOff';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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

// 模拟数据 - 模板
const mockTemplates = [
  {
    id: "template_001",
    name: "产品详情页模板",
    description: "标准产品详情页布局",
    canvas: {
      width: 800,
      height: 800,
      backgroundColor: "#FFFFFF"
    },
    elements: [
      {
        id: "elem_1",
        type: "text",
        name: "price_label",
        position: { x: 50, y: 50 },
        size: { width: 200, height: 50 },
        zIndex: 1,
        rotation: 0,
        defaultProperties: {
          fontFamily: "Arial",
          fontSize: 18,
          fontWeight: "bold",
          color: "#FF3B30",
          alignment: "left",
          placeholder: "价格标签"
        }
      },
      {
        id: "elem_2",
        type: "image",
        name: "product_image",
        position: { x: 50, y: 120 },
        size: { width: 300, height: 300 },
        zIndex: 2,
        rotation: 0,
        defaultProperties: {
          objectFit: "contain",
          placeholder: "product_image"
        }
      },
      {
        id: "elem_3",
        type: "text",
        name: "product_name",
        position: { x: 50, y: 450 },
        size: { width: 400, height: 60 },
        zIndex: 3,
        rotation: 0,
        defaultProperties: {
          fontFamily: "Arial",
          fontSize: 24,
          fontWeight: "bold",
          color: "#000000",
          alignment: "left",
          placeholder: "产品名称"
        }
      },
      {
        id: "elem_4",
        type: "text",
        name: "product_description",
        position: { x: 50, y: 520 },
        size: { width: 400, height: 100 },
        zIndex: 4,
        rotation: 0,
        defaultProperties: {
          fontFamily: "Arial",
          fontSize: 16,
          fontWeight: "normal",
          color: "#666666",
          alignment: "left",
          placeholder: "产品描述信息"
        }
      }
    ],
    version: "1.0",
    created: "2025-04-30T12:00:00Z",
    modified: "2025-04-30T14:30:00Z"
  },
  {
    id: "template_002",
    name: "促销海报模板",
    description: "电商促销海报标准布局",
    canvas: {
      width: 800,
      height: 1000,
      backgroundColor: "#FFE5E0"
    },
    elements: [
      {
        id: "elem_1",
        type: "text",
        name: "promotion_title",
        position: { x: 50, y: 50 },
        size: { width: 700, height: 80 },
        zIndex: 1,
        rotation: 0,
        defaultProperties: {
          fontFamily: "Arial",
          fontSize: 36,
          fontWeight: "bold",
          color: "#FF3B30",
          alignment: "center",
          placeholder: "限时特惠"
        }
      },
      {
        id: "elem_2",
        type: "image",
        name: "product_image",
        position: { x: 150, y: 150 },
        size: { width: 500, height: 500 },
        zIndex: 2,
        rotation: 0,
        defaultProperties: {
          objectFit: "contain",
          placeholder: "product_image"
        }
      },
      {
        id: "elem_3",
        type: "text",
        name: "price",
        position: { x: 150, y: 680 },
        size: { width: 500, height: 100 },
        zIndex: 3,
        rotation: 0,
        defaultProperties: {
          fontFamily: "Arial",
          fontSize: 48,
          fontWeight: "bold",
          color: "#FF3B30",
          alignment: "center",
          placeholder: "¥99.00"
        }
      },
      {
        id: "elem_4",
        type: "text",
        name: "promotion_desc",
        position: { x: 150, y: 800 },
        size: { width: 500, height: 60 },
        zIndex: 4,
        rotation: 0,
        defaultProperties: {
          fontFamily: "Arial",
          fontSize: 24,
          fontWeight: "normal",
          color: "#666666",
          alignment: "center",
          placeholder: "限时抢购，仅限今日"
        }
      }
    ],
    version: "1.0",
    created: "2025-05-15T10:00:00Z",
    modified: "2025-05-15T11:30:00Z"
  }
];

// 预定义的画布尺寸
const canvasSizes = [
  { id: 'custom', name: '自定义', width: 800, height: 800 },
  { id: 'instagram', name: 'Instagram帖子', width: 1080, height: 1080 },
  { id: 'story', name: '故事/朋友圈', width: 1080, height: 1920 },
  { id: 'banner', name: '横幅', width: 1200, height: 628 },
  { id: 'product', name: '产品展示', width: 800, height: 1000 },
];

// 画布元素类型
const elementTypes = [
  { id: 'text', name: '文本', icon: <TextFieldsIcon /> },
  { id: 'image', name: '图片', icon: <ImageIcon /> },
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

// 以下是新增的样式组件
const Ruler = styled.div`
  position: absolute;
  background: ${props => props.isDark ? '#333' : '#f0f0f0'};
  ${props => props.type === 'horizontal' ? `
    top: 0;
    left: 20px;
    right: 0;
    height: 20px;
  ` : `
    top: 20px;
    left: 0;
    width: 20px;
    bottom: 0;
  `}
  display: flex;
  ${props => props.type === 'horizontal' ? 'flex-direction: row;' : 'flex-direction: column;'}
  overflow: hidden;
`;

const RulerMark = styled.div`
  ${props => props.type === 'horizontal' ? `
    width: 1px;
    height: ${props.isMajor ? '10px' : '5px'};
    margin-right: ${props.isMajor ? '9px' : '4px'};
  ` : `
    height: 1px;
    width: ${props.isMajor ? '10px' : '5px'};
    margin-bottom: ${props.isMajor ? '9px' : '4px'};
  `}
  background: ${props => props.isDark ? '#666' : '#aaa'};
`;

const RulerLabel = styled.div`
  font-size: 7px;
  color: ${props => props.isDark ? '#aaa' : '#666'};
  position: absolute;
  ${props => props.type === 'horizontal' ? `
    top: 2px;
    left: ${props.position}px;
  ` : `
    left: 2px;
    top: ${props.position}px;
    transform: rotate(-90deg);
    transform-origin: left top;
  `}
`;

const Grid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${props => props.isDark ?
    'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)' :
    'linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #ddd 1px, transparent 1px)'};
  background-size: ${props => props.gridSize}px ${props => props.gridSize}px;
  pointer-events: none;
  opacity: ${props => props.opacity};
`;

const ElementControlPoint = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: #0066cc;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: ${props => props.cursor};
  z-index: 10;
`;

const ElementWrapper = styled(motion.div)`
  position: absolute;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move;
  user-select: none;
  border: ${props => props.isSelected ? '1px solid #60a5fa' : '1px dashed #ccc'};
  box-shadow: ${props => props.isSelected ? '0 0 10px rgba(0, 102, 204, 0.3)' : 'none'};
`;

const ElementLabel = styled.div`
  position: absolute;
  top: -25px;
  left: 0;
  background: rgba(0, 102, 204, 0.9);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const TextElement = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  overflow: hidden;
`;

const ImageElement = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.isDark ? '#2c2c2e' : '#f5f5f7'};
  color: ${props => props.isDark ? '#aaa' : '#666'};
`;

// 添加参考线组件
const GuidelineLine = styled.div`
  position: absolute;
  background-color: #0066cc;
  pointer-events: none;
  ${props => props.type === 'horizontal' ? `
    height: 1px;
    left: 0;
    right: 0;
    top: ${props.position}px;
  ` : `
    width: 1px;
    top: 0;
    bottom: 0;
    left: ${props.position}px;
  `}
`;

const EditorMain = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  position: relative;
  background-color: ${props => props.isDark ? '#121212' : '#e5e5e5'};
  padding: 40px;
`;

const EditorContainer = styled.div`
  position: relative;
  margin: auto;
`;

const CanvasElementContainer = styled.div`
  position: relative;
  margin-top: 20px;
  margin-left: 20px;
`;

const RulerCorner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: ${props => props.isDark ? '#333' : '#f0f0f0'};
  z-index: 1;
`;

const EditorRightPanel = styled.div`
  width: 280px;
  background-color: ${props => props.backgroundColor};
  border-left: 1px solid ${props => props.borderLeftColor};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const RightPanelSection = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #1d1d1f;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 6px;
  color: ${props => props.isDark ? '#aaa' : '#666'};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid ${props => props.isDark ? '#444' : '#e0e0e0'};
  background-color: ${props => props.isDark ? '#333' : '#fff'};
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  font-size: 13px;
  
  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid ${props => props.isDark ? '#444' : '#e0e0e0'};
  background-color: ${props => props.isDark ? '#333' : '#fff'};
  color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  font-size: 13px;
  
  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
  }
`;

const FormDivider = styled.div`
  height: 1px;
  background-color: ${props => props.isDark ? '#333' : '#e0e0e0'};
  margin: 16px 0;
`;

const FormNote = styled.div`
  font-size: 12px;
  color: ${props => props.isDark ? '#aaa' : '#666'};
  margin-top: -8px;
  margin-bottom: 16px;
  font-style: italic;
`;

const ColorPreview = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-right: 8px;
  border: 1px solid #e0e0e0;
`;

const ColorPicker = styled.input`
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  margin-left: 8px;
  cursor: pointer;
  
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  
  &::-webkit-color-swatch {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }
`;

const AlignmentButtonGroup = styled.div`
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${props => props.isDark ? '#444' : '#e0e0e0'};
`;

const AlignmentButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: ${props => props.active 
    ? props.isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(96, 165, 250, 0.1)'
    : props.isDark ? '#333' : '#fff'
  };
  border: none;
  color: ${props => props.active 
    ? '#60a5fa' 
    : props.isDark ? '#f5f5f7' : '#1d1d1f'
  };
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active 
      ? props.isDark ? 'rgba(96, 165, 250, 0.3)' : 'rgba(96, 165, 250, 0.2)'
      : props.isDark ? '#444' : '#f5f5f7'
    };
  }
  
  &:not(:last-child) {
    border-right: 1px solid ${props => props.isDark ? '#444' : '#e0e0e0'};
  }
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  background-color: ${props => props.danger 
    ? props.isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'
    : props.isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(96, 165, 250, 0.1)'
  };
  border: none;
  border-radius: 6px;
  color: ${props => props.danger ? '#ef4444' : '#60a5fa'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.danger 
      ? props.isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)'
      : props.isDark ? 'rgba(96, 165, 250, 0.3)' : 'rgba(96, 165, 250, 0.2)'
    };
  }
`;

const ElementLayersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ElementLayerItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  font-size: 13px;
  
  &:hover {
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  }
`;

const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  color: ${props => props.isDark ? '#666' : '#aaa'};
  text-align: center;
  
  i {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  span {
    font-size: 13px;
    line-height: 1.5;
  }
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const EditorToolButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${props => props.isDark ? '#333' : '#e0e0e0'};
  background-color: ${props => props.active 
    ? props.isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(96, 165, 250, 0.1)'
    : 'transparent'
  };
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active 
      ? props.isDark ? 'rgba(96, 165, 250, 0.3)' : 'rgba(96, 165, 250, 0.2)'
      : props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
    };
  }
  
  .tool-icon {
    font-size: 20px;
    margin-bottom: 6px;
    color: ${props => props.active ? '#60a5fa' : props.isDark ? '#f5f5f7' : '#1d1d1f'};
  }
  
  .tool-name {
    font-size: 12px;
    color: ${props => props.active ? '#60a5fa' : props.isDark ? '#aaa' : '#666'};
  }
`;

const LayerItemIcon = styled.div`
  margin-right: 8px;
  color: ${props => props.isDark ? '#aaa' : '#666'};
`;

const LayerItemName = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LayerItemActions = styled.div`
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
  
  ${ElementLayerItem}:hover & {
    opacity: 1;
  }
`;

const LayerItemAction = styled.button`
  background: none;
  border: none;
  color: ${props => props.isDark ? '#aaa' : '#666'};
  padding: 2px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    color: ${props => props.isDark ? '#f5f5f7' : '#1d1d1f'};
  }
`;

const CanvasEditor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  // 画布引用
  const canvasRef = useRef(null);
  
  // 基础状态
  const [activeTool, setActiveTool] = useState('select');
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [editorTitle, setEditorTitle] = useState("模板编辑器");
  
  // 模板数据状态
  const [templateId, setTemplateId] = useState(null);
  const [template, setTemplate] = useState(null);
  const [canvasProperties, setCanvasProperties] = useState({
    width: 800,
    height: 800,
    backgroundColor: "#FFFFFF",
    scale: 1
  });
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  
  // 画布辅助功能状态
  const [gridVisible, setGridVisible] = useState(true);
  const [gridSize, setGridSize] = useState(20);
  const [rulersVisible, setRulersVisible] = useState(true);
  const [guideLines, setGuideLines] = useState({
    horizontal: [],
    vertical: []
  });
  
  // 拖拽状态
  const [dragState, setDragState] = useState({
    isDragging: false,
    isResizing: false,
    startX: 0,
    startY: 0,
    elementId: null,
    resizeHandle: null,
    originalSize: { width: 0, height: 0 },
    originalPosition: { x: 0, y: 0 }
  });
  
  // 初始化 - 检查URL参数并加载模板
  useEffect(() => {
    // 获取template参数
    const templateParam = searchParams.get('template');
    
    if (templateParam) {
      setTemplateId(templateParam);
      loadTemplate(templateParam);
    } else {
      // 无模板参数，创建空白画布
      initEmptyCanvas();
    }
  }, [searchParams]);
  
  // 加载模板数据
  const loadTemplate = (id) => {
    // 在实际应用中，这里应该是API调用
    // 现在使用模拟数据
    const foundTemplate = mockTemplates.find(t => t.id === id || t.id === `template_${id}`);
    
    if (foundTemplate) {
      setTemplate(foundTemplate);
      setEditorTitle(`编辑模板: ${foundTemplate.name}`);
      
      // 设置画布属性
      setCanvasProperties({
        width: foundTemplate.canvas.width,
        height: foundTemplate.canvas.height,
        backgroundColor: foundTemplate.canvas.backgroundColor,
        scale: 1
      });
      
      // 转换元素数据格式
      const convertedElements = foundTemplate.elements.map(elem => ({
        ...elem,
        x: elem.position.x,
        y: elem.position.y,
        width: elem.size.width,
        height: elem.size.height
      }));
      
      setElements(convertedElements);
    } else {
      console.error(`Template with id ${id} not found`);
      initEmptyCanvas();
    }
  };
  
  // 初始化空白画布
  const initEmptyCanvas = () => {
    setEditorTitle("新建模板");
    setCanvasProperties({
      width: 800,
      height: 800,
      backgroundColor: "#FFFFFF",
      scale: 1
    });
    setElements([]);
  };
  
  // 添加新元素
  const addElement = (type) => {
    const newElement = {
      id: `element_${Date.now()}`,
      type,
      name: type === 'text' ? `文本_${elements.length + 1}` : `图片_${elements.length + 1}`,
      x: canvasProperties.width / 2 - 100,
      y: canvasProperties.height / 2 - 40,
      width: type === 'text' ? 200 : 300,
      height: type === 'text' ? 80 : 200,
      zIndex: elements.length + 1,
      rotation: 0,
      defaultProperties: type === 'text' ? {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#000000',
        alignment: 'left',
        placeholder: type === 'text' ? '输入文字...' : '图片占位符'
      } : {
        objectFit: 'contain',
        placeholder: 'product_image'
      }
    };
    
    // 添加元素并记录历史
    setElements(prev => [...prev, newElement]);
    addToHistory([...elements, newElement]);
    setSelectedElementId(newElement.id);
  };
  
  // 更新元素位置
  const updateElementPosition = (id, x, y) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, x, y } : el
    ));
  };
  
  // 更新元素尺寸
  const updateElementSize = (id, width, height) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, width, height } : el
    ));
  };
  
  // 更新元素属性
  const updateElementProperties = (id, properties) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, defaultProperties: { ...el.defaultProperties, ...properties } } : el
    ));
  };
  
  // 更新元素名称
  const updateElementName = (id, name) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, name } : el
    ));
  };
  
  // 删除元素
  const deleteElement = (id) => {
    const updatedElements = elements.filter(el => el.id !== id);
    setElements(updatedElements);
    addToHistory(updatedElements);
    
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  };
  
  // 复制元素
  const duplicateElement = (id) => {
    const elementToDuplicate = elements.find(el => el.id === id);
    if (elementToDuplicate) {
      const newElement = {
        ...elementToDuplicate,
        id: `element_${Date.now()}`,
        name: `${elementToDuplicate.name}_副本`,
        x: elementToDuplicate.x + 20,
        y: elementToDuplicate.y + 20,
        zIndex: elements.length + 1
      };
      
      const updatedElements = [...elements, newElement];
      setElements(updatedElements);
      addToHistory(updatedElements);
      setSelectedElementId(newElement.id);
    }
  };
  
  // 更新画布属性
  const updateCanvas = (properties) => {
    setCanvasProperties({
      ...canvasProperties,
      ...properties
    });
  };
  
  // 添加到历史记录
  const addToHistory = (newElements) => {
    // 如果当前不是最新的历史记录点，则移除后面的历史
    const newHistory = history.slice(0, historyIndex + 1);
    
    // 添加新的历史记录
    newHistory.push({
      elements: newElements,
      canvasProperties: { ...canvasProperties }
    });
    
    // 限制历史记录数量
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  
  // 处理撤销操作
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousState = history[newIndex];
      
      setElements(previousState.elements);
      setCanvasProperties(previousState.canvasProperties);
      setHistoryIndex(newIndex);
    }
  };
  
  // 处理重做操作
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextState = history[newIndex];
      
      setElements(nextState.elements);
      setCanvasProperties(nextState.canvasProperties);
      setHistoryIndex(newIndex);
    }
  };
  
  // 获取选中的元素
  const selectedElement = elements.find(el => el.id === selectedElementId);
  
  // 处理元素选择
  const handleElementSelect = (elementId) => {
    setSelectedElementId(elementId);
  };
  
  // 开始拖拽或调整大小
  const handleElementActionStart = (e, elementId, action, handle = null) => {
    e.stopPropagation();
    e.preventDefault();
    
    const element = elements.find(el => el.id === elementId);
    
    if (action === 'drag') {
      setDragState({
        isDragging: true,
        isResizing: false,
        startX: e.clientX,
        startY: e.clientY,
        elementId,
        resizeHandle: null,
        originalPosition: { x: element.x, y: element.y },
        originalSize: { width: element.width, height: element.height }
      });
    } else if (action === 'resize') {
      setDragState({
        isDragging: false,
        isResizing: true,
        startX: e.clientX,
        startY: e.clientY,
        elementId,
        resizeHandle: handle,
        originalPosition: { x: element.x, y: element.y },
        originalSize: { width: element.width, height: element.height }
      });
    }
    
    handleElementSelect(elementId);
  };
  
  // 处理鼠标移动（拖拽或调整大小）
  const handleMouseMove = (e) => {
    if (!dragState.isDragging && !dragState.isResizing) return;
    
    if (dragState.isDragging) {
      // 处理拖拽逻辑
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;
      
      // 计算新位置
      const newX = Math.max(0, dragState.originalPosition.x + deltaX / zoom);
      const newY = Math.max(0, dragState.originalPosition.y + deltaY / zoom);
      
      // 更新元素位置
      updateElementPosition(dragState.elementId, newX, newY);
      
      // 检查对齐参考线
      checkAlignmentGuides(dragState.elementId, newX, newY);
    } else if (dragState.isResizing) {
      // 处理调整大小逻辑
      const deltaX = (e.clientX - dragState.startX) / zoom;
      const deltaY = (e.clientY - dragState.startY) / zoom;
      const element = elements.find(el => el.id === dragState.elementId);
      
      let newWidth = element.width;
      let newHeight = element.height;
      let newX = element.x;
      let newY = element.y;
      
      switch (dragState.resizeHandle) {
        case 'top-left':
          newWidth = dragState.originalSize.width - deltaX;
          newHeight = dragState.originalSize.height - deltaY;
          newX = dragState.originalPosition.x + deltaX;
          newY = dragState.originalPosition.y + deltaY;
          break;
        case 'top':
          newHeight = dragState.originalSize.height - deltaY;
          newY = dragState.originalPosition.y + deltaY;
          break;
        case 'top-right':
          newWidth = dragState.originalSize.width + deltaX;
          newHeight = dragState.originalSize.height - deltaY;
          newY = dragState.originalPosition.y + deltaY;
          break;
        case 'right':
          newWidth = dragState.originalSize.width + deltaX;
          break;
        case 'bottom-right':
          newWidth = dragState.originalSize.width + deltaX;
          newHeight = dragState.originalSize.height + deltaY;
          break;
        case 'bottom':
          newHeight = dragState.originalSize.height + deltaY;
          break;
        case 'bottom-left':
          newWidth = dragState.originalSize.width - deltaX;
          newHeight = dragState.originalSize.height + deltaY;
          newX = dragState.originalPosition.x + deltaX;
          break;
        case 'left':
          newWidth = dragState.originalSize.width - deltaX;
          newX = dragState.originalPosition.x + deltaX;
          break;
        default:
          break;
      }
      
      // 确保最小尺寸
      newWidth = Math.max(20, newWidth);
      newHeight = Math.max(20, newHeight);
      
      // 更新元素位置和尺寸
      updateElementPosition(dragState.elementId, newX, newY);
      updateElementSize(dragState.elementId, newWidth, newHeight);
    }
  };
  
  // 结束拖拽或调整大小
  const handleMouseUp = () => {
    if (dragState.isDragging || dragState.isResizing) {
      // 记录到历史
      addToHistory([...elements]);
      
      // 清除对齐参考线
      setGuideLines({ horizontal: [], vertical: [] });
    }
    
    setDragState({
      isDragging: false,
      isResizing: false,
      startX: 0,
      startY: 0,
      elementId: null,
      resizeHandle: null,
      originalSize: { width: 0, height: 0 },
      originalPosition: { x: 0, y: 0 }
    });
  };
  
  // 检查对齐参考线
  const checkAlignmentGuides = (elementId, x, y) => {
    const element = elements.find(el => el.id === elementId);
    const elementCenterX = x + element.width / 2;
    const elementCenterY = y + element.height / 2;
    const elementRight = x + element.width;
    const elementBottom = y + element.height;
    
    const snapThreshold = 5; // 吸附阈值（像素）
    const newGuides = { horizontal: [], vertical: [] };
    
    // 检查与其他元素的对齐
    elements.forEach(otherElement => {
      if (otherElement.id === elementId) return;
      
      const otherCenterX = otherElement.x + otherElement.width / 2;
      const otherCenterY = otherElement.y + otherElement.height / 2;
      const otherRight = otherElement.x + otherElement.width;
      const otherBottom = otherElement.y + otherElement.height;
      
      // 检查水平对齐
      if (Math.abs(y - otherElement.y) < snapThreshold) {
        // 顶部对齐
        newGuides.horizontal.push(otherElement.y);
        updateElementPosition(elementId, x, otherElement.y);
      } else if (Math.abs(elementBottom - otherBottom) < snapThreshold) {
        // 底部对齐
        newGuides.horizontal.push(otherBottom);
        updateElementPosition(elementId, x, otherBottom - element.height);
      } else if (Math.abs(elementCenterY - otherCenterY) < snapThreshold) {
        // 中心对齐
        newGuides.horizontal.push(otherCenterY);
        updateElementPosition(elementId, x, otherCenterY - element.height / 2);
      }
      
      // 检查垂直对齐
      if (Math.abs(x - otherElement.x) < snapThreshold) {
        // 左侧对齐
        newGuides.vertical.push(otherElement.x);
        updateElementPosition(elementId, otherElement.x, y);
      } else if (Math.abs(elementRight - otherRight) < snapThreshold) {
        // 右侧对齐
        newGuides.vertical.push(otherRight);
        updateElementPosition(elementId, otherRight - element.width, y);
      } else if (Math.abs(elementCenterX - otherCenterX) < snapThreshold) {
        // 中心对齐
        newGuides.vertical.push(otherCenterX);
        updateElementPosition(elementId, otherCenterX - element.width / 2, y);
      }
    });
    
    // 设置参考线
    setGuideLines(newGuides);
  };
  
  // 保存模板
  const saveTemplate = () => {
    // 准备模板数据
    const templateData = {
      id: templateId || `template_${Date.now()}`,
      name: editorTitle,
      description: "模板描述",
      canvas: {
        width: canvasProperties.width,
        height: canvasProperties.height,
        backgroundColor: canvasProperties.backgroundColor
      },
      elements: elements.map(element => ({
        id: element.id,
        type: element.type,
        name: element.name,
        position: { x: element.x, y: element.y },
        size: { width: element.width, height: element.height },
        zIndex: element.zIndex,
        rotation: element.rotation,
        defaultProperties: element.defaultProperties
      })),
      version: "1.0",
      created: new Date().toISOString(),
      modified: new Date().toISOString()
    };
    
    console.log('保存模板数据:', templateData);
    // 在实际应用中，这里应该调用API保存模板
    alert("模板保存成功！");
  };
  
  // 处理返回按钮
  const handleBack = () => {
    navigate(-1); // 返回上一页
  };
  
  // 处理缩放
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.25));
  };
  
  // 渲染标尺刻度
  const renderRulerMarks = (type) => {
    const marks = [];
    const size = type === 'horizontal' ? canvasProperties.width : canvasProperties.height;
    const interval = gridSize;
    
    for (let i = 0; i <= size; i += interval) {
      const isMajor = i % (interval * 5) === 0;
      
      marks.push(
        <RulerMark 
          key={`mark-${i}`} 
          type={type} 
          isMajor={isMajor} 
          isDark={isDark} 
        />
      );
      
      if (isMajor) {
        marks.push(
          <RulerLabel 
            key={`label-${i}`} 
            type={type} 
            position={i} 
            isDark={isDark}
          >
            {i}
          </RulerLabel>
        );
      }
    }
    
    return marks;
  };
  
  // 渲染参考线
  const renderGuideLines = () => {
    return (
      <>
        {guideLines.horizontal.map((position, index) => (
          <GuidelineLine 
            key={`h-${index}`} 
            type="horizontal" 
            position={position} 
          />
        ))}
        {guideLines.vertical.map((position, index) => (
          <GuidelineLine 
            key={`v-${index}`} 
            type="vertical" 
            position={position} 
          />
        ))}
      </>
    );
  };
  
  // 渲染网格
  const renderGrid = () => {
    if (!gridVisible) return null;
    
    return (
      <Grid 
        isDark={isDark} 
        gridSize={gridSize} 
        opacity={0.2} 
      />
    );
  };
  
  // 渲染控制点
  const renderControlPoints = (element) => {
    if (!selectedElement || selectedElement.id !== element.id) return null;
    
    return (
      <>
        <ElementControlPoint 
          style={{ top: '0%', left: '0%' }} 
          cursor="nw-resize"
          onMouseDown={(e) => handleElementActionStart(e, element.id, 'resize', 'top-left')}
        />
        <ElementControlPoint 
          style={{ top: '0%', left: '50%' }} 
          cursor="n-resize"
          onMouseDown={(e) => handleElementActionStart(e, element.id, 'resize', 'top')}
        />
        <ElementControlPoint 
          style={{ top: '0%', left: '100%' }} 
          cursor="ne-resize"
          onMouseDown={(e) => handleElementActionStart(e, element.id, 'resize', 'top-right')}
        />
        <ElementControlPoint 
          style={{ top: '50%', left: '0%' }} 
          cursor="w-resize"
          onMouseDown={(e) => handleElementActionStart(e, element.id, 'resize', 'left')}
        />
        <ElementControlPoint 
          style={{ top: '50%', left: '100%' }} 
          cursor="e-resize"
          onMouseDown={(e) => handleElementActionStart(e, element.id, 'resize', 'right')}
        />
        <ElementControlPoint 
          style={{ top: '100%', left: '0%' }} 
          cursor="sw-resize"
          onMouseDown={(e) => handleElementActionStart(e, element.id, 'resize', 'bottom-left')}
        />
        <ElementControlPoint 
          style={{ top: '100%', left: '50%' }} 
          cursor="s-resize"
          onMouseDown={(e) => handleElementActionStart(e, element.id, 'resize', 'bottom')}
        />
        <ElementControlPoint 
          style={{ top: '100%', left: '100%' }} 
          cursor="se-resize"
          onMouseDown={(e) => handleElementActionStart(e, element.id, 'resize', 'bottom-right')}
        />
      </>
    );
  };
  
  // 渲染元素
  const renderElement = (element) => {
    const isSelected = selectedElementId === element.id;
    
    return (
      <ElementWrapper
        key={element.id}
        isSelected={isSelected}
        style={{
          left: `${element.x}px`,
          top: `${element.y}px`,
          width: `${element.width}px`,
          height: `${element.height}px`,
          zIndex: element.zIndex,
          transform: `rotate(${element.rotation || 0}deg)`
        }}
        onMouseDown={(e) => handleElementActionStart(e, element.id, 'drag')}
      >
        <ElementLabel visible={isSelected}>
          {element.name}
        </ElementLabel>
        
        {element.type === 'text' && (
          <TextElement
            style={{
              fontFamily: element.defaultProperties.fontFamily,
              fontSize: `${element.defaultProperties.fontSize}px`,
              fontWeight: element.defaultProperties.fontWeight,
              color: element.defaultProperties.color,
              textAlign: element.defaultProperties.alignment
            }}
          >
            {element.defaultProperties.placeholder}
          </TextElement>
        )}
        
        {element.type === 'image' && (
          <ImageElement isDark={isDark}>
            <i className="fas fa-image" style={{ fontSize: '24px', marginRight: '8px' }}></i>
            {element.defaultProperties.placeholder}
          </ImageElement>
        )}
        
        {renderControlPoints(element)}
      </ElementWrapper>
    );
  };
  
  // 渲染画布
  const renderCanvas = () => {
    const canvasStyle = {
      width: `${canvasProperties.width}px`,
      height: `${canvasProperties.height}px`,
      backgroundColor: canvasProperties.backgroundColor,
      position: 'relative',
      overflow: 'hidden',
      transform: `scale(${zoom})`,
      transformOrigin: 'top left',
      transition: 'transform 0.2s ease',
      boxShadow: isDark 
        ? '0 0 20px rgba(0, 0, 0, 0.5)' 
        : '0 0 20px rgba(0, 0, 0, 0.1)'
    };
    
    return (
      <div 
        ref={canvasRef}
        style={canvasStyle}
        onClick={() => setSelectedElementId(null)}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {renderGrid()}
        {elements.map(renderElement)}
        {renderGuideLines()}
      </div>
    );
  };
  
  return (
    <Container backgroundColor={isDark ? '#121212' : '#f5f5f7'}>
      <Header backgroundColor={isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)'} borderBottomColor={isDark ? '#333' : '#e0e0e0'}>
        <HeaderLeft>
          <BackButton onClick={handleBack} color={isDark ? '#60a5fa' : '#0066cc'}>
            <ArrowBackIosNewIcon fontSize="small" />
            返回
          </BackButton>
          <Title color={isDark ? '#f5f5f7' : '#1d1d1f'}>{editorTitle}</Title>
        </HeaderLeft>
        
        <HeaderCenter>
          <HistoryButton 
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            color={isDark ? '#f5f5f7' : '#1d1d1f'}
            title="撤销"
          >
            <UndoIcon fontSize="small" />
          </HistoryButton>
          <HistoryButton 
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            color={isDark ? '#f5f5f7' : '#1d1d1f'}
            title="重做"
          >
            <RedoIcon fontSize="small" />
          </HistoryButton>
        </HeaderCenter>
        
        <HeaderRight>
          <Button
            onClick={() => setGridVisible(!gridVisible)}
            variant="text"
            style={{ minWidth: 'auto', padding: '6px' }}
            title={gridVisible ? "隐藏网格" : "显示网格"}
          >
            <GridOnIcon />
          </Button>
          <Button
            onClick={() => setRulersVisible(!rulersVisible)}
            variant="text"
            style={{ minWidth: 'auto', padding: '6px' }}
            title={rulersVisible ? "隐藏标尺" : "显示标尺"}
          >
            <AspectRatioIcon />
          </Button>
          <Button 
            onClick={handleZoomOut}
            variant="text"
            style={{ minWidth: 'auto', padding: '6px' }}
            disabled={zoom <= 0.25}
            title="缩小"
          >
            <ZoomOutIcon />
          </Button>
          <div style={{ fontSize: '14px', margin: '0 8px' }}>
            {Math.round(zoom * 100)}%
          </div>
          <Button 
            onClick={handleZoomIn}
            variant="text"
            style={{ minWidth: 'auto', padding: '6px' }}
            disabled={zoom >= 2}
            title="放大"
          >
            <ZoomInIcon />
          </Button>
          <Button
            onClick={saveTemplate}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            保存模板
          </Button>
        </HeaderRight>
      </Header>
      
      <Content>
        <LeftPanel backgroundColor={isDark ? '#1c1c1e' : '#f9f9f9'} borderRightColor={isDark ? '#333' : '#e0e0e0'}>
          <PanelSection style={{ borderBottom: isDark ? '1px solid #333' : '1px solid #e0e0e0' }}>
            <SectionTitle style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}>画布设置</SectionTitle>
            <FormGroup>
              <FormLabel>画布宽度</FormLabel>
              <FormInput 
                type="number" 
                value={canvasProperties.width}
                onChange={(e) => updateCanvas({ width: parseInt(e.target.value) || 0 })}
                min="100"
                max="5000"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>画布高度</FormLabel>
              <FormInput 
                type="number" 
                value={canvasProperties.height}
                onChange={(e) => updateCanvas({ height: parseInt(e.target.value) || 0 })}
                min="100"
                max="5000"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>背景颜色</FormLabel>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ColorPreview style={{ backgroundColor: canvasProperties.backgroundColor }} />
                <FormInput 
                  type="text" 
                  value={canvasProperties.backgroundColor}
                  onChange={(e) => updateCanvas({ backgroundColor: e.target.value })}
                  style={{ flex: 1 }}
                />
                <ColorPicker 
                  type="color"
                  value={canvasProperties.backgroundColor}
                  onChange={(e) => updateCanvas({ backgroundColor: e.target.value })}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <FormLabel>预设尺寸</FormLabel>
              <FormSelect
                value=""
                onChange={(e) => {
                  if (e.target.value) {
                    const selectedSize = canvasSizes.find(s => s.id === e.target.value);
                    if (selectedSize) {
                      updateCanvas({ 
                        width: selectedSize.width, 
                        height: selectedSize.height 
                      });
                    }
                  }
                }}
              >
                <option value="">选择预设尺寸</option>
                {canvasSizes.map(size => (
                  <option key={size.id} value={size.id}>
                    {size.name} ({size.width}x{size.height})
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>网格大小</FormLabel>
              <FormInput 
                type="number" 
                value={gridSize}
                onChange={(e) => setGridSize(parseInt(e.target.value) || 20)}
                min="5"
                max="100"
              />
            </FormGroup>
          </PanelSection>
          
          <PanelSection style={{ borderBottom: isDark ? '1px solid #333' : '1px solid #e0e0e0' }}>
            <SectionTitle style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}>添加元素</SectionTitle>
            <ToolsGrid>
              {elementTypes.map(tool => (
                <EditorToolButton
                  key={tool.id}
                  active={activeTool === tool.id}
                  onClick={() => addElement(tool.id)}
                  style={{ 
                    backgroundColor: isDark 
                      ? activeTool === tool.id ? 'rgba(96, 165, 250, 0.2)' : 'transparent'
                      : activeTool === tool.id ? 'rgba(96, 165, 250, 0.1)' : 'transparent' 
                  }}
                >
                  <div className="tool-icon">{tool.icon}</div>
                  <div className="tool-name">{tool.name}</div>
                </EditorToolButton>
              ))}
            </ToolsGrid>
          </PanelSection>
          
          <PanelSection style={{ flex: 1, borderBottom: isDark ? '1px solid #333' : '1px solid #e0e0e0', overflowY: 'auto' }}>
            <SectionTitle style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                元素列表
                <span style={{ fontSize: '12px', color: isDark ? '#aaa' : '#666' }}>
                  {elements.length} 个元素
                </span>
              </div>
            </SectionTitle>
            <ElementLayersList>
              {elements.length === 0 ? (
                <EmptyMessage>
                  <i className="fas fa-layer-group"></i>
                  <span>没有元素</span>
                  <span>使用上方工具添加元素</span>
                </EmptyMessage>
              ) : (
                elements.map(element => (
                  <ElementLayerItem 
                    key={element.id}
                    active={selectedElementId === element.id}
                    onClick={() => handleElementSelect(element.id)}
                    style={{ 
                      backgroundColor: isDark 
                        ? selectedElementId === element.id ? 'rgba(96, 165, 250, 0.2)' : 'transparent'
                        : selectedElementId === element.id ? 'rgba(96, 165, 250, 0.1)' : 'transparent' 
                    }}
                  >
                    <LayerItemIcon>
                      {element.type === 'text' 
                        ? <TextFieldsIcon fontSize="small" /> 
                        : <ImageIcon fontSize="small" />
                      }
                    </LayerItemIcon>
                    <LayerItemName>{element.name}</LayerItemName>
                    <LayerItemActions>
                      <LayerItemAction 
                        title="复制元素"
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateElement(element.id);
                        }}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </LayerItemAction>
                      <LayerItemAction 
                        title="删除元素"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteElement(element.id);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </LayerItemAction>
                    </LayerItemActions>
                  </ElementLayerItem>
                ))
              )}
            </ElementLayersList>
          </PanelSection>
        </LeftPanel>
        
        <EditorMain isDark={isDark}>
          <EditorContainer>
            {rulersVisible && (
              <>
                <Ruler type="horizontal" isDark={isDark}>
                  {renderRulerMarks('horizontal')}
                </Ruler>
                <Ruler type="vertical" isDark={isDark}>
                  {renderRulerMarks('vertical')}
                </Ruler>
                <RulerCorner isDark={isDark} />
              </>
            )}
            
            <CanvasElementContainer>
              {renderCanvas()}
            </CanvasElementContainer>
          </EditorContainer>
        </EditorMain>
        
        <EditorRightPanel backgroundColor={isDark ? '#1c1c1e' : '#f9f9f9'} borderLeftColor={isDark ? '#333' : '#e0e0e0'}>
          <RightPanelSection style={{ borderBottom: isDark ? '1px solid #333' : '1px solid #e0e0e0' }}>
            <SectionTitle style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}>
              {selectedElement ? '元素属性' : '模板属性'}
            </SectionTitle>
            
            {!selectedElement ? (
              <div>
                <FormGroup>
                  <FormLabel>模板名称</FormLabel>
                  <FormInput 
                    type="text" 
                    value={editorTitle}
                    onChange={(e) => setEditorTitle(e.target.value)}
                  />
                </FormGroup>
              </div>
            ) : (
              <div>
                <FormGroup>
                  <FormLabel>元素名称</FormLabel>
                  <FormInput 
                    type="text" 
                    value={selectedElement.name}
                    onChange={(e) => updateElementName(selectedElement.id, e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>X 位置</FormLabel>
                  <FormInput 
                    type="number" 
                    value={Math.round(selectedElement.x)}
                    onChange={(e) => updateElementPosition(selectedElement.id, parseInt(e.target.value) || 0, selectedElement.y)}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Y 位置</FormLabel>
                  <FormInput 
                    type="number" 
                    value={Math.round(selectedElement.y)}
                    onChange={(e) => updateElementPosition(selectedElement.id, selectedElement.x, parseInt(e.target.value) || 0)}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>宽度</FormLabel>
                  <FormInput 
                    type="number" 
                    value={Math.round(selectedElement.width)}
                    onChange={(e) => updateElementSize(selectedElement.id, parseInt(e.target.value) || 0, selectedElement.height)}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>高度</FormLabel>
                  <FormInput 
                    type="number" 
                    value={Math.round(selectedElement.height)}
                    onChange={(e) => updateElementSize(selectedElement.id, selectedElement.width, parseInt(e.target.value) || 0)}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>旋转 (度)</FormLabel>
                  <FormInput 
                    type="number" 
                    value={selectedElement.rotation || 0}
                    onChange={(e) => {
                      setElements(elements.map(el => 
                        el.id === selectedElement.id ? { ...el, rotation: parseInt(e.target.value) || 0 } : el
                      ));
                    }}
                    min="-360"
                    max="360"
                  />
                </FormGroup>
                
                {selectedElement.type === 'text' && (
                  <>
                    <FormDivider />
                    <FormGroup>
                      <FormLabel>字体</FormLabel>
                      <FormSelect
                        value={selectedElement.defaultProperties.fontFamily}
                        onChange={(e) => updateElementProperties(selectedElement.id, { fontFamily: e.target.value })}
                      >
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Verdana">Verdana</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>字号</FormLabel>
                      <FormInput 
                        type="number" 
                        value={selectedElement.defaultProperties.fontSize}
                        onChange={(e) => updateElementProperties(selectedElement.id, { fontSize: parseInt(e.target.value) || 12 })}
                        min="8"
                        max="72"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>字体粗细</FormLabel>
                      <FormSelect
                        value={selectedElement.defaultProperties.fontWeight}
                        onChange={(e) => updateElementProperties(selectedElement.id, { fontWeight: e.target.value })}
                      >
                        <option value="normal">正常</option>
                        <option value="bold">粗体</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>颜色</FormLabel>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ColorPreview style={{ backgroundColor: selectedElement.defaultProperties.color }} />
                        <FormInput 
                          type="text" 
                          value={selectedElement.defaultProperties.color}
                          onChange={(e) => updateElementProperties(selectedElement.id, { color: e.target.value })}
                          style={{ flex: 1 }}
                        />
                        <ColorPicker 
                          type="color"
                          value={selectedElement.defaultProperties.color}
                          onChange={(e) => updateElementProperties(selectedElement.id, { color: e.target.value })}
                        />
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>对齐方式</FormLabel>
                      <AlignmentButtonGroup>
                        <AlignmentButton 
                          active={selectedElement.defaultProperties.alignment === 'left'}
                          onClick={() => updateElementProperties(selectedElement.id, { alignment: 'left' })}
                          title="左对齐"
                        >
                          <FormatAlignLeftIcon fontSize="small" />
                        </AlignmentButton>
                        <AlignmentButton 
                          active={selectedElement.defaultProperties.alignment === 'center'}
                          onClick={() => updateElementProperties(selectedElement.id, { alignment: 'center' })}
                          title="居中对齐"
                        >
                          <FormatAlignCenterIcon fontSize="small" />
                        </AlignmentButton>
                        <AlignmentButton 
                          active={selectedElement.defaultProperties.alignment === 'right'}
                          onClick={() => updateElementProperties(selectedElement.id, { alignment: 'right' })}
                          title="右对齐"
                        >
                          <FormatAlignRightIcon fontSize="small" />
                        </AlignmentButton>
                      </AlignmentButtonGroup>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>占位文本</FormLabel>
                      <FormInput 
                        type="text" 
                        value={selectedElement.defaultProperties.placeholder}
                        onChange={(e) => updateElementProperties(selectedElement.id, { placeholder: e.target.value })}
                      />
                    </FormGroup>
                  </>
                )}
                
                {selectedElement.type === 'image' && (
                  <>
                    <FormDivider />
                    <FormGroup>
                      <FormLabel>填充方式</FormLabel>
                      <FormSelect
                        value={selectedElement.defaultProperties.objectFit}
                        onChange={(e) => updateElementProperties(selectedElement.id, { objectFit: e.target.value })}
                      >
                        <option value="contain">包含 (保持比例)</option>
                        <option value="cover">覆盖 (裁剪)</option>
                        <option value="fill">填充 (拉伸)</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>占位符名称</FormLabel>
                      <FormInput 
                        type="text" 
                        value={selectedElement.defaultProperties.placeholder}
                        onChange={(e) => updateElementProperties(selectedElement.id, { placeholder: e.target.value })}
                      />
                    </FormGroup>
                    <FormNote>
                      此占位符名称将用于映射到实际数据。
                    </FormNote>
                  </>
                )}
                
                <FormDivider />
                <ActionButtonGroup>
                  <ActionButton 
                    onClick={() => duplicateElement(selectedElement.id)}
                    title="复制元素"
                  >
                    <ContentCopyIcon fontSize="small" />
                    复制
                  </ActionButton>
                  <ActionButton 
                    onClick={() => deleteElement(selectedElement.id)}
                    title="删除元素"
                    danger
                  >
                    <DeleteIcon fontSize="small" />
                    删除
                  </ActionButton>
                </ActionButtonGroup>
              </div>
            )}
          </RightPanelSection>
        </EditorRightPanel>
      </Content>
    </Container>
  );
};

export default CanvasEditor; 