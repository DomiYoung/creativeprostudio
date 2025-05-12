import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useTheme } from '../../design-system';

// MUI组件
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import LabelIcon from '@mui/icons-material/Label';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DescriptionIcon from '@mui/icons-material/Description';

// 模态框背景
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
`;

// 模态框内容
const ModalContent = styled(motion.div)`
  background-color: ${props => props.isDark ? '#1e1e1e' : 'white'};
  border-radius: 20px;
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 3px;
  }
`;

// 模态框头部
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
`;

// 模态框标题
const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
`;

// 关闭按钮
const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'};
  }
`;

// 模态框内容区
const ModalBody = styled.div`
  padding: 24px;
`;

// 表单字段容器
const FormGroup = styled.div`
  margin-bottom: 24px;
`;

// 表单标签
const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.isDark ? '#bbb' : '#666'};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    font-size: 18px;
  }
`;

// 输入框样式
const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 12px;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #FF9190;
    box-shadow: 0 0 0 3px rgba(255, 145, 144, 0.2);
  }
`;

// 文本区域样式
const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 12px;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #FF9190;
    box-shadow: 0 0 0 3px rgba(255, 145, 144, 0.2);
  }
`;

// 选择器样式
const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 12px;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  transition: all 0.2s;
  -webkit-appearance: none;
  background-image: ${props => 
    props.isDark 
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231d1d1f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`
  };
  background-repeat: no-repeat;
  background-position: right 16px center;
  
  &:focus {
    outline: none;
    border-color: #FF9190;
    box-shadow: 0 0 0 3px rgba(255, 145, 144, 0.2);
  }
`;

// 标签输入区域
const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  background-color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  min-height: 50px;
  
  &:focus-within {
    outline: none;
    border-color: #FF9190;
    box-shadow: 0 0 0 3px rgba(255, 145, 144, 0.2);
  }
`;

// 标签样式
const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  border-radius: 16px;
  font-size: 14px;
  margin: 4px 0;
  
  button {
    background: none;
    border: none;
    color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)'};
    cursor: pointer;
    margin-left: 6px;
    padding: 0;
    font-size: 16px;
    display: flex;
    align-items: center;
    
    &:hover {
      color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)'};
    }
  }
`;

// 标签输入框
const TagInputField = styled.input`
  flex: 1;
  min-width: 120px;
  border: none;
  background: transparent;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  font-size: 14px;
  padding: 8px 4px;
  
  &:focus {
    outline: none;
  }
`;

// 图片上传区域
const ImageUpload = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 12px;
  border: 2px dashed ${props => props.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  ${props => !props.hasImage && `
    &:hover {
      border-color: #FF9190;
      background-color: ${props.isDark ? 'rgba(255, 145, 144, 0.05)' : 'rgba(255, 145, 144, 0.05)'};
    }
  `}
  
  ${props => props.hasImage && `
    border: none;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      opacity: 0;
      transition: opacity 0.2s;
    }
    
    &:hover::before {
      opacity: 1;
    }
  `}
`;

const UploadIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  
  svg {
    font-size: 24px;
  }
`;

const UploadText = styled.div`
  font-size: 14px;
  color: ${props => props.isDark ? '#bbb' : '#666'};
`;

const ChangeImageText = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.2s;
  
  ${ImageUpload}:hover & {
    opacity: 1;
  }
`;

// 模态框底部
const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
  gap: 12px;
`;

// 取消按钮
const CancelButton = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 500;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'};
  }
`;

// 创建按钮
const CreateButton = styled.button`
  padding: 10px 24px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(135deg, #FF9190 0%, #FFA194 100%);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(255, 145, 144, 0.2);
  display: flex;
  align-items: center;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(255, 145, 144, 0.25);
  }
  
  svg {
    margin-right: 8px;
    font-size: 18px;
  }
`;

// 步骤指示器
const StepsIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  position: relative;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#FF9190' : 'rgba(0, 0, 0, 0.1)'};
  color: ${props => props.active ? 'white' : '#666'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  
  ${props => props.completed && `
    background-color: #4CAF50;
  `}
`;

const StepLabel = styled.div`
  font-size: 12px;
  color: ${props => props.active ? '#FF9190' : '#666'};
  font-weight: ${props => props.active ? '600' : 'normal'};
`;

const StepDivider = styled.div`
  height: 2px;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
  margin: 0 8px;
  position: relative;
  top: -16px;
  
  ${props => props.completed && `
    background-color: #4CAF50;
  `}
`;

// 模板网格
const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const TemplateCard = styled.div`
  height: 180px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;
  border: 3px solid ${props => props.selected ? '#FF9190' : 'transparent'};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%);
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const CreateFromScratch = styled(TemplateCard)`
  background-color: ${props => props.isDark ? '#2d2d2d' : '#f0f0f0'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
  
  &:before {
    background: none;
  }
`;

const TemplateInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  color: white;
`;

const TemplateTitle = styled.h3`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
`;

const TemplateDesc = styled.p`
  margin: 0 0 8px 0;
  font-size: 12px;
  opacity: 0.8;
`;

const TemplateTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const TemplateTag = styled.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
`;

// 操作按钮
const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

const ButtonBase = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(ButtonBase)`
  background: linear-gradient(to right, #FF9190, #FFA194);
  color: white;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 145, 144, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(ButtonBase)`
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  color: ${props => props.isDark ? '#f5f5f5' : '#333'};
  
  &:hover:not(:disabled) {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'};
  }
`;

// 预览卡片
const PreviewCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: ${props => props.isDark ? '#2d2d2d' : 'white'};
  margin-bottom: 24px;
`;

const PreviewImage = styled.div`
  height: 160px;
  background-size: cover;
  background-position: center;
`;

const PreviewContent = styled.div`
  padding: 16px;
`;

const PreviewTitle = styled.h3`
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
`;

const PreviewType = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const PreviewTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const PreviewTag = styled.span`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.05);
`;

const SummaryText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${props => props.isDark ? '#bbb' : '#666'};
  margin-bottom: 16px;
`;

const CreateProjectModal = ({ isOpen, onClose, onCreateProject }) => {
  const { isDark } = useTheme();
  const fileInputRef = useRef(null);
  
  // 步骤管理
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // 项目模板
  const projectTemplates = [
    {
      id: 1,
      name: "美妆产品发布",
      type: "product",
      image: "https://images.pexels.com/photos/4620843/pexels-photo-4620843.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "美妆新品发布营销策划，包含产品展示、社交推广和促销活动",
      tags: ["美妆", "新品", "营销"],
      tasks: [
        { title: "产品介绍文案", status: "pending" },
        { title: "社交媒体计划", status: "pending" },
        { title: "视觉设计", status: "pending" }
      ]
    },
    {
      id: 2,
      name: "季节促销活动",
      type: "campaign",
      image: "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "季节性促销活动策划，包含多渠道营销和折扣策略",
      tags: ["促销", "活动", "电商"],
      tasks: [
        { title: "活动规则制定", status: "pending" },
        { title: "折扣设计", status: "pending" },
        { title: "Banner设计", status: "pending" }
      ]
    },
    {
      id: 3,
      name: "社交媒体系列",
      type: "social",
      image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "社交媒体内容系列，覆盖多个平台的一系列相关内容",
      tags: ["社交", "内容", "系列"],
      tasks: [
        { title: "内容日历规划", status: "pending" },
        { title: "平台特色内容", status: "pending" },
        { title: "互动活动设计", status: "pending" }
      ]
    }
  ];
  
  // 项目表单状态
  const [formData, setFormData] = useState({
    title: '',
    type: 'campaign',
    description: '',
    coverImage: null,
    imagePreview: null,
    tags: [],
    deadline: '',
    team: []
  });
  
  // 应用模板
  const applyTemplate = (template) => {
    setFormData({
      ...formData,
      title: template.name,
      type: template.type,
      description: template.description,
      imagePreview: template.image,
      tags: [...template.tags],
      tasks: [...template.tasks]
    });
    setSelectedTemplate(template.id);
  };
  
  // 标签输入状态
  const [tagInput, setTagInput] = useState('');
  
  // 处理输入变更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // 处理图片上传
  const handleImageUpload = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };
  
  // 处理图片变更
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        coverImage: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };
  
  // 处理标签添加
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };
  
  // 处理标签移除
  const handleRemoveTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  
  // 表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 创建新项目对象
    const newProject = {
      ...formData,
      id: Date.now(), // 临时ID，实际应由后端生成
      status: 'inprogress',
      progress: 0,
      updated: '刚刚',
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: 'domiyoung__', // 版权归属标记
      statusText: '进行中',
      tasks: []
    };
    
    onCreateProject(newProject);
    onClose();
    
    // 重置表单
    setFormData({
      title: '',
      type: 'campaign',
      description: '',
      coverImage: null,
      imagePreview: null,
      tags: [],
      deadline: '',
      team: []
    });
    setTagInput('');
  };
  
  // 判断表单是否可提交
  const isFormValid = formData.title.trim() && formData.description.trim() && formData.imagePreview;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ModalContent
            isDark={isDark}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit}>
              <ModalHeader isDark={isDark}>
                <ModalTitle isDark={isDark}>
                  {step === 1 ? "选择项目模板" : "创建新项目"}
                </ModalTitle>
                <CloseButton isDark={isDark} onClick={onClose}>
                  <CloseIcon />
                </CloseButton>
              </ModalHeader>
              
              <ModalBody>
                {/* 步骤指示器 */}
                <StepsIndicator>
                  <Step active={step >= 1} completed={step > 1}>
                    <StepNumber>1</StepNumber>
                    <StepLabel>选择模板</StepLabel>
                  </Step>
                  <StepDivider completed={step > 1} />
                  <Step active={step >= 2} completed={step > 2}>
                    <StepNumber>2</StepNumber>
                    <StepLabel>自定义</StepLabel>
                  </Step>
                  <StepDivider completed={step > 2} />
                  <Step active={step >= 3}>
                    <StepNumber>3</StepNumber>
                    <StepLabel>创建</StepLabel>
                  </Step>
                </StepsIndicator>
                
                {/* 步骤1: 选择模板 */}
                {step === 1 && (
                  <div>
                    <TemplatesGrid>
                      <CreateFromScratch 
                        isDark={isDark}
                        selected={selectedTemplate === null}
                        onClick={() => {
                          setSelectedTemplate(null);
                          setFormData({
                            title: '',
                            type: 'campaign',
                            description: '',
                            coverImage: null,
                            imagePreview: null,
                            tags: [],
                            deadline: '',
                            team: []
                          });
                        }}
                      >
                        <AddIcon style={{ fontSize: 40, marginBottom: 16 }} />
                        <TemplateTitle>从零开始</TemplateTitle>
                        <TemplateDesc>创建一个空白项目</TemplateDesc>
                      </CreateFromScratch>
                      
                      {projectTemplates.map(template => (
                        <TemplateCard
                          key={template.id}
                          isDark={isDark}
                          selected={selectedTemplate === template.id}
                          onClick={() => applyTemplate(template)}
                          style={{ backgroundImage: `url(${template.image})` }}
                        >
                          <TemplateInfo>
                            <TemplateTitle>{template.name}</TemplateTitle>
                            <TemplateDesc>{template.description}</TemplateDesc>
                            <TemplateTags>
                              {template.tags.map((tag, i) => (
                                <TemplateTag key={i}>{tag}</TemplateTag>
                              ))}
                            </TemplateTags>
                          </TemplateInfo>
                        </TemplateCard>
                      ))}
                    </TemplatesGrid>
                    
                    <ActionButtons>
                      <SecondaryButton
                        isDark={isDark}
                        type="button"
                        onClick={onClose}
                      >
                        取消
                      </SecondaryButton>
                      <PrimaryButton
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={selectedTemplate === undefined}
                      >
                        下一步
                      </PrimaryButton>
                    </ActionButtons>
                  </div>
                )}
                
                {/* 步骤2: 自定义项目 */}
                {step === 2 && (
                  <div>
                    {/* 封面图片上传 */}
                    <FormGroup>
                      <Label isDark={isDark}>
                        <ImageIcon />
                        项目封面
                      </Label>
                      <ImageUpload 
                        isDark={isDark} 
                        onClick={handleImageUpload}
                        hasImage={!!formData.imagePreview}
                        style={formData.imagePreview ? { backgroundImage: `url(${formData.imagePreview})` } : {}}
                      >
                        {!formData.imagePreview ? (
                          <>
                            <UploadIcon isDark={isDark}>
                              <ImageIcon />
                            </UploadIcon>
                            <UploadText isDark={isDark}>点击或拖拽图片到此处</UploadText>
                          </>
                        ) : (
                          <ChangeImageText>更换图片</ChangeImageText>
                        )}
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          accept="image/*"
                          style={{ display: 'none' }}
                        />
                      </ImageUpload>
                    </FormGroup>
                    
                    {/* 项目标题 */}
                    <FormGroup>
                      <Label isDark={isDark}>
                        <DescriptionIcon />
                        项目标题
                      </Label>
                      <Input
                        isDark={isDark}
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="输入项目标题"
                        required
                      />
                    </FormGroup>
                    
                    {/* 项目类型 */}
                    <FormGroup>
                      <Label isDark={isDark}>
                        <LabelIcon />
                        项目类型
                      </Label>
                      <Select
                        isDark={isDark}
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                      >
                        <option value="campaign">营销活动</option>
                        <option value="social">社交媒体</option>
                        <option value="product">产品发布</option>
                        <option value="content">内容创作</option>
                        <option value="other">其他</option>
                      </Select>
                    </FormGroup>
                    
                    {/* 项目描述 */}
                    <FormGroup>
                      <Label isDark={isDark}>
                        <DescriptionIcon />
                        项目描述
                      </Label>
                      <TextArea
                        isDark={isDark}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="输入项目描述"
                        required
                      />
                    </FormGroup>
                    
                    {/* 项目标签 */}
                    <FormGroup>
                      <Label isDark={isDark}>
                        <LabelIcon />
                        项目标签 (按回车添加)
                      </Label>
                      <TagInput isDark={isDark}>
                        {formData.tags.map((tag, index) => (
                          <Tag key={index} isDark={isDark}>
                            {tag}
                            <button type="button" onClick={() => handleRemoveTag(tag)}>×</button>
                          </Tag>
                        ))}
                        <TagInputField
                          isDark={isDark}
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleAddTag}
                          placeholder={formData.tags.length === 0 ? "输入标签并按回车" : ""}
                        />
                      </TagInput>
                    </FormGroup>
                    
                    {/* 截止日期 */}
                    <FormGroup>
                      <Label isDark={isDark}>
                        <CalendarTodayIcon />
                        截止日期
                      </Label>
                      <Input
                        isDark={isDark}
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </div>
                )}
                
                {/* 步骤3: 确认并创建 */}
                {step === 3 && (
                  <div>
                    <PreviewCard isDark={isDark}>
                      <PreviewImage style={{ backgroundImage: `url(${formData.imagePreview})` }} />
                      <PreviewContent>
                        <PreviewTitle>{formData.title}</PreviewTitle>
                        <PreviewType>{
                          formData.type === 'campaign' ? '营销活动' : 
                          formData.type === 'social' ? '社交媒体' : 
                          formData.type === 'product' ? '产品发布' : 
                          formData.type === 'content' ? '内容创作' : '其他'
                        }</PreviewType>
                        <PreviewTags>
                          {formData.tags.map((tag, i) => (
                            <PreviewTag key={i}>{tag}</PreviewTag>
                          ))}
                        </PreviewTags>
                      </PreviewContent>
                    </PreviewCard>
                    
                    <SummaryText isDark={isDark}>
                      项目将以<strong>{formData.title}</strong>为名创建，并包含预定义的任务和标签。
                      创建后，您可以继续编辑项目详情和添加更多内容。
                    </SummaryText>
                    
                    <ActionButtons>
                      <SecondaryButton
                        isDark={isDark}
                        type="button"
                        onClick={() => setStep(2)}
                      >
                        上一步
                      </SecondaryButton>
                      <PrimaryButton
                        type="submit"
                      >
                        创建项目
                      </PrimaryButton>
                    </ActionButtons>
                  </div>
                )}
              </ModalBody>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default CreateProjectModal; 