import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../design-system';
import { Button } from '../design-system';

// 图标导入
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PostAddIcon from '@mui/icons-material/PostAdd';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import StartIcon from '@mui/icons-material/Start';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
    margin-right: 8px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
  background-color: ${props => props.active ? '#0066cc' : props['data-completed'] ? '#4CAF50' : 'white'};
  border: 2px solid ${props => props.active ? '#0066cc' : props['data-completed'] ? '#4CAF50' : '#e0e0e0'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  color: ${props => (props.active || props['data-completed']) ? 'white' : '#1d1d1f'};
  font-weight: 500;
  transition: all 0.3s;

  svg {
    font-size: 16px;
  }
`;

const StepLabel = styled.span`
  font-size: 14px;
  color: ${props => props.active ? '#0066cc' : props['data-completed'] ? '#4CAF50' : '#86868b'};
  font-weight: ${props => props.active ? '500' : 'normal'};
`;

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
  overflow: hidden;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1f;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
  
  &:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231d1d1f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  
  &:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
  }
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
  { id: 1, name: "产品A", price: "¥199", discount: "8折" },
  { id: 2, name: "产品B", price: "¥299", discount: "7.5折" },
  { id: 3, name: "产品C", price: "¥159", discount: "6折" },
  { id: 4, name: "产品D", price: "¥399", discount: "8.5折" },
];

const BatchCreate = () => {
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [results, setResults] = useState([]);
  
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
    navigate('/batch-center');
  };
  
  return (
    <Container isDark={isDark}>
      <Header isDark={isDark}>
        <BackButton onClick={handleBack}>
          <ArrowBackIosNewIcon fontSize="small" />
          返回
        </BackButton>
        <Title>批量创建</Title>
        <div style={{ width: '100px' }}></div>
      </Header>
      
      <MainContent>
        <StepIndicator>
          <Step>
            <StepCircle active={currentStep === 1} data-completed={currentStep > 1}>
              {currentStep > 1 ? <CheckCircleIcon /> : 1}
            </StepCircle>
            <StepLabel active={currentStep === 1} data-completed={currentStep > 1}>选择模板</StepLabel>
          </Step>
          <Step>
            <StepCircle active={currentStep === 2} data-completed={currentStep > 2}>
              {currentStep > 2 ? <CheckCircleIcon /> : 2}
            </StepCircle>
            <StepLabel active={currentStep === 2} data-completed={currentStep > 2}>上传数据</StepLabel>
          </Step>
          <Step>
            <StepCircle active={currentStep === 3} data-completed={currentStep > 3}>
              {currentStep > 3 ? <CheckCircleIcon /> : 3}
            </StepCircle>
            <StepLabel active={currentStep === 3} data-completed={currentStep > 3}>数据预览</StepLabel>
          </Step>
          <Step>
            <StepCircle active={currentStep === 4}>
              4
            </StepCircle>
            <StepLabel active={currentStep === 4}>完成创建</StepLabel>
          </Step>
        </StepIndicator>
        
        {currentStep === 1 && (
          <Card style={{backgroundColor: isDark ? '#1e1e1e' : 'white', color: isDark ? '#f5f5f7' : '#1d1d1f'}}>
            <CardTitle style={{color: isDark ? '#f5f5f7' : '#1d1d1f', borderBottomColor: isDark ? '#333' : '#f0f0f0'}}>选择模板</CardTitle>
            <p>请选择一个模板作为批量创建的基础</p>
            
            <TemplateGrid>
              {mockTemplates.map(template => (
                <TemplateCard 
                  key={template.id}
                  selected={selectedTemplate === template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  style={{
                    borderColor: isDark ? (selectedTemplate === template.id ? '#60a5fa' : '#444') : (selectedTemplate === template.id ? '#0066cc' : '#e0e0e0'),
                    backgroundColor: isDark ? '#2d2d2d' : 'white'
                  }}
                >
                  <TemplateImage 
                    src={template.image}
                    selected={selectedTemplate === template.id}
                  />
                  <TemplateInfo>
                    <TemplateName style={{color: isDark ? '#f5f5f7' : '#1d1d1f'}}>{template.name}</TemplateName>
                    <TemplateCategory style={{color: isDark ? '#888' : '#86868b'}}>{template.category}</TemplateCategory>
                  </TemplateInfo>
                </TemplateCard>
              ))}
            </TemplateGrid>
          </Card>
        )}
        
        {currentStep === 2 && (
          <Card style={{backgroundColor: isDark ? '#1e1e1e' : 'white', color: isDark ? '#f5f5f7' : '#1d1d1f'}}>
            <CardTitle style={{color: isDark ? '#f5f5f7' : '#1d1d1f', borderBottomColor: isDark ? '#333' : '#f0f0f0'}}>上传数据</CardTitle>
            <p>请上传包含产品信息的Excel文件或CSV文件</p>
            
            <input 
              type="file" 
              id="file-upload" 
              style={{ display: 'none' }}
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
              <UploadArea style={{
                borderColor: isDark ? '#444' : '#e0e0e0',
                backgroundColor: isDark ? '#2d2d2d' : 'transparent'
              }}>
                <UploadIcon style={{color: isDark ? '#60a5fa' : '#0066cc'}}>
                  <UploadFileIcon />
                </UploadIcon>
                <UploadText style={{color: isDark ? '#f5f5f7' : '#1d1d1f'}}>点击或拖放文件到此处</UploadText>
                <UploadSubtext style={{color: isDark ? '#888' : '#86868b'}}>支持 Excel, CSV 格式</UploadSubtext>
              </UploadArea>
            </label>
            
            {uploadedFile && (
              <div style={{ marginTop: '16px' }}>
                <p><b>已上传文件:</b> {uploadedFile.name}</p>
              </div>
            )}
            
            <FormGroup>
              <FormLabel style={{color: isDark ? '#e0e0e0' : '#1d1d1f'}}>变量映射</FormLabel>
              <p style={{ fontSize: '14px', color: isDark ? '#888' : '#86868b', marginBottom: '16px' }}>
                将Excel文件中的列与模板变量进行映射
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <FormLabel style={{color: isDark ? '#e0e0e0' : '#1d1d1f'}}>产品名称变量</FormLabel>
                  <FormSelect style={{
                    borderColor: isDark ? '#444' : '#e0e0e0',
                    backgroundColor: isDark ? '#2d2d2d' : 'white',
                    color: isDark ? '#f5f5f7' : '#1d1d1f'
                  }}>
                    <option>产品名</option>
                    <option>商品名</option>
                    <option>名称</option>
                  </FormSelect>
                </div>
                <div>
                  <FormLabel style={{color: isDark ? '#e0e0e0' : '#1d1d1f'}}>价格变量</FormLabel>
                  <FormSelect style={{
                    borderColor: isDark ? '#444' : '#e0e0e0',
                    backgroundColor: isDark ? '#2d2d2d' : 'white',
                    color: isDark ? '#f5f5f7' : '#1d1d1f'
                  }}>
                    <option>价格</option>
                    <option>售价</option>
                    <option>原价</option>
                  </FormSelect>
                </div>
                <div>
                  <FormLabel style={{color: isDark ? '#e0e0e0' : '#1d1d1f'}}>折扣变量</FormLabel>
                  <FormSelect style={{
                    borderColor: isDark ? '#444' : '#e0e0e0',
                    backgroundColor: isDark ? '#2d2d2d' : 'white',
                    color: isDark ? '#f5f5f7' : '#1d1d1f'
                  }}>
                    <option>折扣</option>
                    <option>促销</option>
                    <option>优惠</option>
                  </FormSelect>
                </div>
                <div>
                  <FormLabel style={{color: isDark ? '#e0e0e0' : '#1d1d1f'}}>图片变量</FormLabel>
                  <FormSelect style={{
                    borderColor: isDark ? '#444' : '#e0e0e0',
                    backgroundColor: isDark ? '#2d2d2d' : 'white',
                    color: isDark ? '#f5f5f7' : '#1d1d1f'
                  }}>
                    <option>图片链接</option>
                    <option>产品图</option>
                    <option>图片URL</option>
                  </FormSelect>
                </div>
              </div>
            </FormGroup>
          </Card>
        )}
        
        {currentStep === 3 && (
          <Card style={{backgroundColor: isDark ? '#1e1e1e' : 'white', color: isDark ? '#f5f5f7' : '#1d1d1f'}}>
            <CardTitle style={{color: isDark ? '#f5f5f7' : '#1d1d1f', borderBottomColor: isDark ? '#333' : '#f0f0f0'}}>数据预览</CardTitle>
            <p>预览生成的项目信息，确认无误后进行创建</p>
            
            <PreviewTable style={{borderColor: isDark ? '#444' : '#e0e0e0'}}>
              <TableHeader style={{backgroundColor: isDark ? '#2d2d2d' : '#f5f5f7', borderBottomColor: isDark ? '#444' : '#e0e0e0'}}>
                <div style={{color: isDark ? '#e0e0e0' : '#1d1d1f'}}>序号</div>
                <div style={{color: isDark ? '#e0e0e0' : '#1d1d1f'}}>产品名</div>
                <div style={{color: isDark ? '#e0e0e0' : '#1d1d1f'}}>价格</div>
                <div style={{color: isDark ? '#e0e0e0' : '#1d1d1f'}}>折扣</div>
              </TableHeader>
              {mockPreviewData.map((item, index) => (
                <TableRow key={item.id} style={{
                  borderBottomColor: isDark ? '#333' : '#f0f0f0',
                  backgroundColor: isDark ? (index % 2 === 1 ? '#262626' : 'transparent') : (index % 2 === 1 ? '#fafafa' : 'transparent')
                }}>
                  <TableCell style={{color: isDark ? '#f5f5f7' : '#1d1d1f'}}>{index + 1}</TableCell>
                  <TableCell style={{color: isDark ? '#f5f5f7' : '#1d1d1f'}}>{item.name}</TableCell>
                  <TableCell style={{color: isDark ? '#f5f5f7' : '#1d1d1f'}}>{item.price}</TableCell>
                  <TableCell style={{color: isDark ? '#f5f5f7' : '#1d1d1f'}}>{item.discount}</TableCell>
                </TableRow>
              ))}
            </PreviewTable>
            
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <p>共 36 条数据，显示前 4 条</p>
            </div>
          </Card>
        )}
        
        {currentStep === 4 && (
          <Card style={{backgroundColor: isDark ? '#1e1e1e' : 'white', color: isDark ? '#f5f5f7' : '#1d1d1f'}}>
            <CardTitle style={{color: isDark ? '#f5f5f7' : '#1d1d1f', borderBottomColor: isDark ? '#333' : '#f0f0f0'}}>创建完成</CardTitle>
            
            {results.map((result, index) => (
              <ResultCard 
                key={index}
                success={result.success}
                warning={result.warning}
                error={result.error}
                style={{
                  backgroundColor: isDark 
                    ? (result.success ? 'rgba(16, 185, 129, 0.2)' : result.warning ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)')
                    : (result.success ? '#e7f8ed' : result.warning ? '#fff4e5' : '#ffebee')
                }}
              >
                {result.success && <CheckCircleIcon style={{color: isDark ? '#10b981' : '#4CAF50'}} />}
                {result.warning && <ErrorOutlineIcon style={{color: isDark ? '#f59e0b' : '#FF9800'}} />}
                {result.error && <ErrorOutlineIcon style={{color: isDark ? '#ef4444' : '#F44336'}} />}
                <ResultText>
                  <h4 style={{color: isDark ? '#f5f5f7' : '#1d1d1f'}}>{result.title}</h4>
                  <p style={{color: isDark ? '#888' : '#86868b'}}>{result.message}</p>
                </ResultText>
              </ResultCard>
            ))}
            
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <p>批量创建已完成，您可以前往批量处理中心查看详情</p>
              <Button 
                variant="primary" 
                size="md"
                fullWidth={false}
                onClick={handleComplete}
                style={{ marginTop: '16px' }}
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
              下一步
            </Button>
          )}
        </ButtonsContainer>
      </MainContent>
    </Container>
  );
};

export default BatchCreate; 