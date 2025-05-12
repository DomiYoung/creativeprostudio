import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design-system';
import { Button } from '../design-system';
import { Tooltip } from '@mui/material';
import FilterBar from '../design-system/components/FilterBar';
import { GridLayout } from '../design-system/components/GridLayout';
import { Card } from '../design-system/components/Card';
import { FormGroup, FormLabel, FormSelect } from '../design-system/components/Form';

// 图标导入
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PostAddIcon from '@mui/icons-material/PostAdd';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import StartIcon from '@mui/icons-material/Start';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';

// 样式组件
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.$isDark ? '#121212' : '#f5f5f7'};
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', Helvetica, Arial, sans-serif;
  color: ${props => props.$isDark ? '#f5f5f7' : '#1d1d1f'};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Header = styled.header`
  height: 60px;
  background-color: ${props => props.$isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: ${props => props.$isDark ? '#f5f5f7' : '#1d1d1f'};
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  margin-right: 16px;
  
  &:hover {
    background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  }
  
  svg {
    margin-right: 8px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  background: ${props => props.$isDark 
    ? 'linear-gradient(90deg, #FF9190 0%, #FFC3A0 100%)' 
    : 'linear-gradient(90deg, #FF6B6B 0%, #FFB88C 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 40px;
  max-width: 800px;
  margin: 0 auto 40px;
  
  &::before {
    content: "";
    position: absolute;
    top: 16px;
    left: 40px;
    right: 40px;
    height: 2px;
    background-color: #e0e0e0;
    z-index: 0;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const StepCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props['data-active'] ? '#0066cc' : props['data-completed'] ? '#4CAF50' : 'white'};
  border: 2px solid ${props => props['data-active'] ? '#0066cc' : props['data-completed'] ? '#4CAF50' : '#e0e0e0'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  color: ${props => (props['data-active'] || props['data-completed']) ? 'white' : '#1d1d1f'};
  font-weight: 500;
  transition: all 0.3s;

  svg {
    font-size: 16px;
  }
`;

const StepLabel = styled.span`
  font-size: 14px;
  color: ${props => props['data-active'] ? '#0066cc' : props['data-completed'] ? '#4CAF50' : '#86868b'};
  font-weight: ${props => props['data-active'] ? '500' : 'normal'};
`;

const UploadArea = styled.div`
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 16px;
  
  &:hover {
    border-color: #0066cc;
    background-color: rgba(0, 102, 204, 0.03);
  }
`;

const UploadIcon = styled.div`
  font-size: 48px;
  color: #0066cc;
  margin-bottom: 16px;
  
  svg {
    width: 48px;
    height: 48px;
  }
`;

const UploadText = styled.div`
  font-size: 16px;
  color: #1d1d1f;
  margin-bottom: 8px;
`;

const UploadSubtext = styled.div`
  font-size: 14px;
  color: #86868b;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const TemplateCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #0066cc;
  }
  
  ${props => props.selected && `
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
  `}
`;

const TemplateImage = styled.div`
  height: 120px;
  background-color: #f0f0f0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
  
  ${props => props.selected && `
    &::after {
      content: "";
      position: absolute;
      top: 8px;
      right: 8px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #0066cc;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14px;
    }
  `}
`;

const TemplateInfo = styled.div`
  padding: 12px;
`;

const TemplateName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1f;
  margin-bottom: 4px;
`;

const TemplateCategory = styled.div`
  font-size: 12px;
  color: #86868b;
`;

const PreviewTable = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr;
  background-color: #f5f5f7;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  
  div {
    font-size: 14px;
    font-weight: 500;
    color: #1d1d1f;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:nth-child(even) {
    background-color: #fafafa;
  }
`;

const TableCell = styled.div`
  font-size: 14px;
  color: #1d1d1f;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

const ResultCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: ${props => props.success ? '#e7f8ed' : props.warning ? '#fff4e5' : '#ffebee'};
  margin-bottom: 12px;
  
  svg {
    margin-right: 12px;
    font-size: 24px;
    color: ${props => props.success ? '#4CAF50' : props.warning ? '#FF9800' : '#F44336'};
  }
`;

const ResultText = styled.div`
  flex: 1;
  
  h4 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 500;
    color: #1d1d1f;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #86868b;
  }
`;

// 模拟数据
const mockTemplates = [
  { id: 1, name: "限时促销海报", category: "电商营销", image: "https://source.unsplash.com/random/400x300?poster" },
  { id: 2, name: "新品发布", category: "产品展示", image: "https://source.unsplash.com/random/400x300?product" },
  { id: 3, name: "社交媒体帖子", category: "社交媒体", image: "https://source.unsplash.com/random/400x300?social" },
  { id: 4, name: "母亲节特辑", category: "节日营销", image: "https://source.unsplash.com/random/400x300?mothersday" },
  { id: 5, name: "产品详情", category: "产品展示", image: "https://source.unsplash.com/random/400x300?detail" },
  { id: 6, name: "优惠券", category: "电商营销", image: "https://source.unsplash.com/random/400x300?coupon" },
];

const mockPreviewData = [
  { 
    id: 1, 
    name: "产品A", 
    price: "¥199", 
    discount: "8折",
    imageUrl: "https://source.unsplash.com/random/600x400?cosmetic1"
  },
  { 
    id: 2, 
    name: "产品B", 
    price: "¥299", 
    discount: "7.5折",
    imageUrl: "https://source.unsplash.com/random/600x400?cosmetic2" 
  },
  { 
    id: 3, 
    name: "产品C", 
    price: "¥159", 
    discount: "6折",
    imageUrl: "https://source.unsplash.com/random/600x400?cosmetic3" 
  },
  { 
    id: 4, 
    name: "产品D", 
    price: "¥399", 
    discount: "8.5折",
    imageUrl: "https://source.unsplash.com/random/600x400?cosmetic4" 
  },
];

const BatchCreate = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [results, setResults] = useState([]);
  const [previewMode, setPreviewMode] = useState('grid'); // 'grid' or 'list'
  
  // 过滤器状态
  const [activeTemplateCategory, setActiveTemplateCategory] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState(mockTemplates);
  
  // 过滤模板
  useEffect(() => {
    let filtered = [...mockTemplates];
    
    // 按类别过滤
    if (activeTemplateCategory !== '全部') {
      filtered = filtered.filter(template => template.category === activeTemplateCategory);
    }
    
    // 按搜索词过滤
    if (searchTerm) {
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredTemplates(filtered);
  }, [activeTemplateCategory, searchTerm]);
  
  // 处理返回按钮
  const handleBack = () => {
    navigate(-1);
  };
  
  // 处理模板选择
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };
  
  // 处理文件上传
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };
  
  // 处理下一步
  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      
      // 模拟处理结果
      if (currentStep === 3) {
        setResults([
          { success: true, title: "成功创建32个项目", message: "所有数据已正确处理" },
          { warning: true, title: "3个项目需要注意", message: "图片分辨率不足" },
          { error: true, title: "1个项目失败", message: "产品E信息不完整" }
        ]);
      }
    }
  };
  
  // 处理上一步
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // 处理完成
  const handleComplete = () => {
    navigate('/creativeprostudio/batch-center');
  };
  
  // 模板类别列表
  const templateCategories = ['全部', '产品', '营销', '品牌'];
  
  // 步骤标题和描述
  const stepInfo = [
    {
      title: "选择模板",
      description: "请选择一个模板作为批量创建的基础"
    },
    {
      title: "上传数据",
      description: "请上传包含产品信息的Excel文件或CSV文件"
    },
    {
      title: "预览创建",
      description: "预览批量生成的内容，确认无误后开始创建"
    },
    {
      title: "创建完成",
      description: "您的批量创建任务已完成"
    }
  ];
  
  // 切换预览模式
  const togglePreviewMode = () => {
    setPreviewMode(previewMode === 'grid' ? 'list' : 'grid');
  };
  
  // 当前步骤信息
  const currentStepInfo = stepInfo[currentStep - 1];
  
  // 面包屑导航
  const breadcrumbs = [
    { label: '主页', href: '/creativeprostudio' },
    { label: '批量创建', href: '/creativeprostudio/batch-create' }
  ];
  
  return (
    <Container $isDark={isDark}>
      <Header $isDark={isDark}>
        <Tooltip title="返回">
          <BackButton 
            $isDark={isDark}
            onClick={handleBack}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
            返回
          </BackButton>
        </Tooltip>
        <Title $isDark={isDark}>批量创建</Title>
        <div style={{ width: '100px' }}></div>
      </Header>
      
      <MainContent>
        {currentStep === 1 && (
          <FilterBar 
            segments={templateCategories}
            activeSegment={activeTemplateCategory}
            onSegmentChange={setActiveTemplateCategory}
            showSearch={true}
            searchPlaceholder="搜索模板..."
            onSearch={setSearchTerm}
            showSortFilter={false}
            isDark={isDark}
          />
        )}
        
        <StepIndicator>
          <Step>
            <StepCircle data-active={currentStep === 1} data-completed={currentStep > 1} $isDark={isDark}>
              {currentStep > 1 ? <CheckCircleIcon /> : 1}
            </StepCircle>
            <StepLabel data-active={currentStep === 1} data-completed={currentStep > 1} $isDark={isDark}>选择模板</StepLabel>
          </Step>
          <Step>
            <StepCircle data-active={currentStep === 2} data-completed={currentStep > 2} $isDark={isDark}>
              {currentStep > 2 ? <CheckCircleIcon /> : 2}
            </StepCircle>
            <StepLabel data-active={currentStep === 2} data-completed={currentStep > 2} $isDark={isDark}>上传数据</StepLabel>
          </Step>
          <Step>
            <StepCircle data-active={currentStep === 3} data-completed={currentStep > 3} $isDark={isDark}>
              {currentStep > 3 ? <CheckCircleIcon /> : 3}
            </StepCircle>
            <StepLabel data-active={currentStep === 3} data-completed={currentStep > 3} $isDark={isDark}>预览创建</StepLabel>
          </Step>
          <Step>
            <StepCircle data-active={currentStep === 4} $isDark={isDark}>
              4
            </StepCircle>
            <StepLabel data-active={currentStep === 4} $isDark={isDark}>完成创建</StepLabel>
          </Step>
        </StepIndicator>
        
        {currentStep === 1 && (
          <Card
            variant="default"
            title={currentStepInfo.title}
            subtitle={currentStepInfo.description}
            headerDivider
            isElevated={false}
            fullWidth
          >
            <GridLayout
              columns="auto-fill"
              minItemWidth="240px"
              gap="16px"
              isLoading={false}
              isEmpty={filteredTemplates.length === 0}
              emptyIcon="fas fa-image"
              emptyTitle="无匹配模板"
              emptyDescription="尝试更改筛选条件或搜索词"
              isDark={isDark}
            >
              {filteredTemplates.map(template => (
                <Card
                  key={template.id}
                  interactive
                  hasHoverEffect
                  media={template.image}
                  mediaHeight="140px"
                  mediaZoomOnHover
                  onClick={() => handleTemplateSelect(template.id)}
                  isElevated={selectedTemplate === template.id}
                  variant={selectedTemplate === template.id ? 'outlined' : 'default'}
                  style={selectedTemplate === template.id ? {
                    borderColor: '#FF9190',
                    borderWidth: '2px'
                  } : {}}
                >
                  <div style={{ padding: '12px' }}>
                    <h4 style={{ 
                      margin: '0 0 4px 0',
                      fontSize: '15px',
                      fontWeight: '600',
                      color: isDark ? '#f5f5f7' : '#1d1d1f'
                    }}>{template.name}</h4>
                    <div style={{ 
                      fontSize: '13px',
                      color: isDark ? '#aaa' : '#86868b'
                    }}>{template.category}</div>
                  </div>
                </Card>
              ))}
            </GridLayout>
          </Card>
        )}
        
        {currentStep === 2 && (
          <Card
            variant="default"
            title={currentStepInfo.title}
            subtitle={currentStepInfo.description}
            headerDivider
            isElevated={false}
            fullWidth
          >
            <input 
              type="file" 
              id="file-upload" 
              style={{ display: 'none' }}
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
              <UploadArea style={{
                borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'
              }}>
                <UploadIcon style={{color: '#FF9190'}}>
                  <UploadFileIcon style={{ width: '48px', height: '48px' }} />
                </UploadIcon>
                <UploadText style={{color: isDark ? '#f5f5f7' : '#1d1d1f'}}>点击或拖放文件到此处</UploadText>
                <UploadSubtext style={{color: isDark ? '#aaa' : '#86868b'}}>支持 Excel, CSV 格式</UploadSubtext>
              </UploadArea>
            </label>
            
            {uploadedFile && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  marginTop: '24px',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <InsertPhotoIcon style={{ color: '#FF9190' }} />
                <div>
                  <h4 style={{ 
                    margin: '0 0 4px 0',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: isDark ? '#f5f5f7' : '#1d1d1f'
                  }}>已上传文件</h4>
                  <div style={{ 
                    fontSize: '13px',
                    color: isDark ? '#aaa' : '#86868b'
                  }}>{uploadedFile.name}</div>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  style={{ marginLeft: 'auto' }}
                  onClick={() => setUploadedFile(null)}
                >
                  移除
                </Button>
              </motion.div>
            )}
            
            <div style={{ 
              marginTop: '32px',
              padding: '24px',
              borderRadius: '12px',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'}`
            }}>
              <h3 style={{ 
                margin: '0 0 16px 0',
                fontSize: '16px',
                fontWeight: '600',
                color: isDark ? '#f5f5f7' : '#1d1d1f'
              }}>数据映射设置</h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
                gap: '16px' 
              }}>
                <div>
                  <FormLabel style={{color: isDark ? '#e0e0e0' : '#1d1d1f'}}>产品名称</FormLabel>
                  <FormSelect style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                    backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'white',
                    color: isDark ? '#f5f5f7' : '#1d1d1f'
                  }}>
                    <option>产品名</option>
                    <option>商品名</option>
                    <option>名称</option>
                  </FormSelect>
                </div>
                <div>
                  <FormLabel style={{color: isDark ? '#e0e0e0' : '#1d1d1f'}}>价格</FormLabel>
                  <FormSelect style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                    backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'white',
                    color: isDark ? '#f5f5f7' : '#1d1d1f'
                  }}>
                    <option>价格</option>
                    <option>售价</option>
                    <option>原价</option>
                  </FormSelect>
                </div>
                <div>
                  <FormLabel style={{color: isDark ? '#e0e0e0' : '#1d1d1f'}}>折扣</FormLabel>
                  <FormSelect style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                    backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'white',
                    color: isDark ? '#f5f5f7' : '#1d1d1f'
                  }}>
                    <option>折扣</option>
                    <option>促销</option>
                    <option>优惠</option>
                  </FormSelect>
                </div>
                <div>
                  <FormLabel style={{color: isDark ? '#e0e0e0' : '#1d1d1f'}}>图片链接</FormLabel>
                  <FormSelect style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                    backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'white',
                    color: isDark ? '#f5f5f7' : '#1d1d1f'
                  }}>
                    <option>图片链接</option>
                    <option>产品图</option>
                    <option>图片URL</option>
                  </FormSelect>
                </div>
              </div>
            </div>
          </Card>
        )}
        
        {currentStep === 3 && (
          <Card
            variant="default"
            title={currentStepInfo.title}
            subtitle={currentStepInfo.description}
            headerAction={
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button 
                  variant={previewMode === 'grid' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('grid')}
                >
                  <GridViewIcon style={{ fontSize: '18px' }} />
                </Button>
                <Button 
                  variant={previewMode === 'list' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('list')}
                >
                  <ViewListIcon style={{ fontSize: '18px' }} />
                </Button>
              </div>
            }
            headerDivider
            isElevated={false}
            fullWidth
          >
            {previewMode === 'grid' ? (
              <GridLayout
                columns="auto-fill"
                minItemWidth="280px"
                gap="24px"
                isLoading={false}
                isEmpty={mockPreviewData.length === 0}
                isDark={isDark}
              >
                {mockPreviewData.map((item) => (
                  <Card
                    key={item.id}
                    interactive
                    hasHoverEffect
                    media={item.imageUrl}
                    mediaHeight="200px"
                    mediaZoomOnHover
                    mediaOverlay
                    mediaTitle={item.name}
                    mediaSubtitle={`${item.price} · ${item.discount}`}
                    badge={`${item.id}/36`}
                    badgeColor="#FF9190"
                  />
                ))}
              </GridLayout>
            ) : (
              <div style={{ 
                borderRadius: '12px',
                overflow: 'hidden',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'}`
              }}>
                {mockPreviewData.map((item, index) => (
                  <div 
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px',
                      borderBottom: index < mockPreviewData.length - 1 ? `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'}` : 'none',
                      backgroundColor: isDark ? (index % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)') : (index % 2 === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.01)')
                    }}
                  >
                    <div style={{ 
                      width: '40px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: isDark ? '#aaa' : '#86868b'
                    }}>{item.id}</div>
                    <div style={{ width: '80px', height: '60px', marginRight: '16px', borderRadius: '8px', overflow: 'hidden' }}>
                      <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        margin: '0 0 4px 0',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: isDark ? '#f5f5f7' : '#1d1d1f'
                      }}>{item.name}</h4>
                      <div style={{ 
                        fontSize: '13px',
                        color: isDark ? '#aaa' : '#86868b'
                      }}>{item.price} · {item.discount}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      编辑
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <div style={{ textAlign: 'center', marginTop: '24px', color: isDark ? '#aaa' : '#86868b' }}>
              <p>共 36 条数据，显示前 4 条</p>
            </div>
          </Card>
        )}
        
        {currentStep === 4 && (
          <Card
            variant="default"
            title={currentStepInfo.title}
            subtitle={currentStepInfo.description}
            headerDivider
            isElevated={false}
            fullWidth
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {results.map((result, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: isDark 
                      ? (result.success ? 'rgba(16, 185, 129, 0.1)' : result.warning ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)')
                      : (result.success ? 'rgba(16, 185, 129, 0.08)' : result.warning ? 'rgba(245, 158, 11, 0.08)' : 'rgba(239, 68, 68, 0.08)'),
                    border: `1px solid ${isDark 
                      ? (result.success ? 'rgba(16, 185, 129, 0.2)' : result.warning ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)')
                      : (result.success ? 'rgba(16, 185, 129, 0.15)' : result.warning ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)')}`
                  }}
                >
                  {result.success && <CheckCircleIcon style={{color: isDark ? '#10b981' : '#4CAF50', marginRight: '16px'}} />}
                  {result.warning && <ErrorOutlineIcon style={{color: isDark ? '#f59e0b' : '#FF9800', marginRight: '16px'}} />}
                  {result.error && <ErrorOutlineIcon style={{color: isDark ? '#ef4444' : '#F44336', marginRight: '16px'}} />}
                  <div>
                    <h4 style={{
                      margin: '0 0 4px 0',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: isDark ? '#f5f5f7' : '#1d1d1f'
                    }}>{result.title}</h4>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      color: isDark ? '#aaa' : '#86868b'
                    }}>{result.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: '24px', color: isDark ? '#aaa' : '#86868b' }}>批量创建已完成，您可以前往批量处理中心查看详情</p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleComplete}
              >
                前往批量处理中心
              </Button>
            </div>
          </Card>
        )}
        
        <ButtonsContainer>
          {currentStep > 1 && currentStep < 4 && (
            <Button 
              variant="outline" 
              size="md"
              onClick={handlePreviousStep}
            >
              上一步
            </Button>
          )}
          {currentStep < 4 && (
            <Button 
              variant="primary" 
              size="md"
              disabled={currentStep === 1 && !selectedTemplate}
              style={{ marginLeft: 'auto' }}
              onClick={handleNextStep}
            >
              {currentStep === 3 ? '开始创建' : '下一步'}
            </Button>
          )}
        </ButtonsContainer>
      </MainContent>
    </Container>
  );
};

export default BatchCreate; 