import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-text';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HistoryIcon from '@mui/icons-material/History';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BarChartIcon from '@mui/icons-material/BarChart';

// 导入批量处理中心相关数据
import { 
  batchProjects, 
  batchStatus, 
  batchDetailConfig, 
  batchItems,
  batchVersionHistory
} from '../data/mock/batches';

// 样式组件
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f7;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', Helvetica, Arial, sans-serif;
`;

const Header = styled.header`
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e0e0e0;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  color: #0066cc;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 102, 204, 0.05);
  }

  svg {
    font-size: 18px;
    margin-right: 8px;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
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
    margin-right: 8px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const InfoSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    color: #0066cc;
  }
`;

const BatchInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: #86868b;
  margin-bottom: 6px;
`;

const InfoValue = styled.span`
  font-size: 16px;
  color: #1d1d1f;
  font-weight: 500;
`;

const ProgressBarContainer = styled.div`
  background-color: #e0e0e0;
  border-radius: 6px;
  height: 8px;
  margin-top: 8px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  background-color: ${props => {
    const statusItem = batchStatus.find(s => s.id === props.status);
    return statusItem ? statusItem.color : '#0066cc';
  }};
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${props => {
    const statusItem = batchStatus.find(s => s.id === props.status);
    return statusItem ? `${statusItem.color}20` : '#f2f2f7';
  }};
  color: ${props => {
    const statusItem = batchStatus.find(s => s.id === props.status);
    return statusItem ? statusItem.color : '#86868b';
  }};

  svg {
    margin-right: 6px;
    font-size: 16px;
  }
`;

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon />;
    case 'failed':
      return <ErrorIcon />;
    case 'processing':
      return <AccessTimeIcon />;
    case 'pending':
      return <AccessTimeIcon />;
    case 'paused':
      return <PauseIcon fontSize="small" />;
    default:
      return null;
  }
};

const Description = styled.p`
  font-size: 16px;
  color: #1d1d1f;
  margin: 0;
  line-height: 1.5;
`;

const ItemsSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const ItemCard = styled(motion.div)`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  position: relative;
  border: 1px solid #e8e8ed;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ItemThumbnail = styled.div`
  height: 160px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
  background-color: ${props => props.src ? 'transparent' : '#f5f5f7'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:after {
    content: '${props => props.status === 'processing' ? '处理中...' : props.status === 'pending' ? '等待处理' : ''}';
    display: ${props => (props.status === 'processing' || props.status === 'pending') && !props.src ? 'flex' : 'none'};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    color: #1d1d1f;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
`;

const ItemStatusIndicator = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => {
    const statusItem = batchStatus.find(s => s.id === props.status);
    return statusItem ? statusItem.color : 'transparent';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemInfo = styled.div`
  padding: 16px;
`;

const ItemName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: #1d1d1f;
`;

const ItemStatus = styled.div`
  font-size: 14px;
  color: #86868b;
  display: flex;
  align-items: center;
  
  svg {
    font-size: 16px;
    margin-right: 6px;
  }
`;

const ItemMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 13px;
  color: #86868b;
`;

const ItemError = styled.div`
  font-size: 14px;
  color: #ff3b30;
  margin-top: 8px;
`;

const SettingsSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const SettingsItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 24px;
  color: #86868b;
  text-align: center;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;
`;

const Tab = styled.button`
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#0066cc' : 'transparent'};
  color: ${props => props.active ? '#0066cc' : '#1d1d1f'};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: #0066cc;
  }
`;

const VersionHistory = styled.div`
  margin-top: 16px;
`;

const VersionItem = styled.div`
  display: flex;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-bottom: 12px;
  background-color: ${props => props.current ? '#f0f7ff' : 'white'};
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: -1px;
    top: -1px;
    bottom: -1px;
    width: 4px;
    background-color: ${props => props.current ? '#0066cc' : 'transparent'};
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`;

const VersionInfo = styled.div`
  flex: 1;
`;

const VersionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const VersionTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #1d1d1f;
  display: flex;
  align-items: center;
  
  span {
    margin-left: 8px;
    font-size: 13px;
    padding: 2px 8px;
    border-radius: 4px;
    background-color: ${props => props.current ? '#e4f8ed' : '#f5f5f7'};
    color: ${props => props.current ? '#34c759' : '#86868b'};
  }
`;

const VersionDate = styled.div`
  font-size: 14px;
  color: #86868b;
`;

const VersionChanges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const VersionChangeItem = styled.div`
  background-color: #f5f5f7;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  display: flex;
  
  span:first-child {
    color: #86868b;
    margin-right: 8px;
  }
  
  span:last-child {
    color: #1d1d1f;
    font-weight: 500;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #1d1d1f;
  margin-top: 8px;
`;

const BatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [batchDetail, setBatchDetail] = useState(null);
  const [batchConfig, setBatchConfig] = useState(null);
  const [batchItemsList, setBatchItemsList] = useState([]);
  const [versionHistory, setVersionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('items');

  useEffect(() => {
    // 模拟API调用以获取批次详情
    const timer = setTimeout(() => {
      const project = batchProjects.find(p => p.id === parseInt(id));
      if (project) {
        setBatchDetail(project);
        setBatchConfig(batchDetailConfig[id] || null);
        setBatchItemsList(batchItems[id] || []);
        setVersionHistory(batchVersionHistory[id] || []);
        setLoading(false);
      } else {
        setError("批量项目不存在");
        setLoading(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleBack = () => {
    navigate('/batch-center');
  };

  const getStatusText = (statusId) => {
    const status = batchStatus.find(s => s.id === statusId);
    return status ? status.name : statusId;
  };

  const getStatusAction = () => {
    if (!batchDetail) return null;
    
    switch (batchDetail.status) {
      case 'processing':
        return (
          <ActionButton primary>
            <PauseIcon /> 暂停
          </ActionButton>
        );
      case 'failed':
        return (
          <ActionButton primary>
            <RestartAltIcon /> 重试
          </ActionButton>
        );
      case 'completed':
        return (
          <ActionButton primary>
            <DownloadIcon /> 下载结果
          </ActionButton>
        );
      case 'paused':
        return (
          <ActionButton primary>
            <PlayArrowIcon /> 继续
          </ActionButton>
        );
      default:
        return (
          <ActionButton primary>
            <PlayArrowIcon /> 开始
          </ActionButton>
        );
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <BackButton onClick={handleBack}>
            <ArrowBackIosNewIcon /> 返回
          </BackButton>
          <Title>加载中...</Title>
          <div></div>
        </Header>
        <EmptyState>正在加载批次详情...</EmptyState>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <BackButton onClick={handleBack}>
            <ArrowBackIosNewIcon /> 返回
          </BackButton>
          <Title>错误</Title>
          <div></div>
        </Header>
        <EmptyState>{error}</EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <ArrowBackIosNewIcon /> 返回
        </BackButton>
        <Title>{batchDetail.name}</Title>
        <ActionButtons>
          <ActionButton>
            <SettingsIcon /> 设置
          </ActionButton>
          {getStatusAction()}
        </ActionButtons>
      </Header>
      
      <Content>
        <InfoSection>
          <SectionTitle>
            <ReceiptIcon />
            批次基本信息
          </SectionTitle>
          <BatchInfo>
            <InfoItem>
              <InfoLabel>状态</InfoLabel>
              <StatusBadge status={batchDetail.status}>
                <StatusIcon status={batchDetail.status} />
                {getStatusText(batchDetail.status)}
              </StatusBadge>
              <ProgressBarContainer>
                <ProgressBarFill 
                  status={batchDetail.status} 
                  progress={batchDetail.progress} 
                />
              </ProgressBarContainer>
            </InfoItem>
            <InfoItem>
              <InfoLabel>创建时间</InfoLabel>
              <InfoValue>
                {new Date(batchDetail.createdAt).toLocaleString('zh-CN')}
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>完成时间</InfoLabel>
              <InfoValue>
                {batchDetail.completedAt ? new Date(batchDetail.completedAt).toLocaleString('zh-CN') : '-'}
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>项目数量</InfoLabel>
              <InfoValue>{batchDetail.itemCount}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>成功数量</InfoLabel>
              <InfoValue>{batchDetail.successCount}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>失败数量</InfoLabel>
              <InfoValue>{batchDetail.failedCount}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>使用模板</InfoLabel>
              <InfoValue>{batchDetail.templateName}</InfoValue>
            </InfoItem>
          </BatchInfo>
          
          <SectionTitle style={{ marginTop: '24px' }}>描述</SectionTitle>
          <Description>{batchDetail.description}</Description>
        </InfoSection>
        
        {batchConfig && (
          <React.Fragment>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <SettingsSection style={{ flex: 1, minWidth: '300px' }}>
                <SectionTitle>
                  <SettingsIcon />
                  批次设置
                </SectionTitle>
                <SettingsGrid>
                  {Object.entries(batchConfig.settings).map(([key, value]) => (
                    <SettingsItem key={key}>
                      <InfoLabel>{key === 'outputFormat' ? '输出格式' : 
                                key === 'quality' ? '图片质量' : 
                                key === 'resolution' ? '分辨率' : 
                                key === 'namingPattern' ? '命名规则' : 
                                key === 'watermark' ? '水印' : 
                                key === 'compression' ? '压缩' : key}</InfoLabel>
                      <InfoValue>{typeof value === 'boolean' ? (value ? '是' : '否') : value}</InfoValue>
                    </SettingsItem>
                  ))}
                </SettingsGrid>
              </SettingsSection>
              
              {batchConfig.stats && (
                <SettingsSection style={{ flex: 1, minWidth: '300px' }}>
                  <SectionTitle>
                    <BarChartIcon />
                    处理统计
                  </SectionTitle>
                  <StatsGrid>
                    {Object.entries(batchConfig.stats).map(([key, value]) => (
                      <StatCard key={key}>
                        <InfoLabel>{key === 'totalTime' ? '总处理时间' : 
                                  key === 'avgProcessingTime' ? '平均处理时间' : 
                                  key === 'totalSize' ? '总大小' :
                                  key === 'avgSize' ? '平均大小' : key}</InfoLabel>
                        <StatValue>{value}</StatValue>
                      </StatCard>
                    ))}
                  </StatsGrid>
                </SettingsSection>
              )}
            </div>
          </React.Fragment>
        )}
        
        <ItemsSection>
          <TabsContainer>
            <Tab 
              active={activeTab === 'items'} 
              onClick={() => setActiveTab('items')}
            >
              项目条目
            </Tab>
            <Tab 
              active={activeTab === 'versions'} 
              onClick={() => setActiveTab('versions')}
            >
              版本历史
            </Tab>
            {batchConfig && batchConfig.audits && batchConfig.audits.length > 0 && (
              <Tab 
                active={activeTab === 'audits'} 
                onClick={() => setActiveTab('audits')}
              >
                审核记录
              </Tab>
            )}
          </TabsContainer>
          
          {activeTab === 'items' && (
            <>
              <SectionTitle>批次项目 ({batchItemsList.length})</SectionTitle>
              <ItemsGrid>
                {batchItemsList.map(item => (
                  <ItemCard 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ItemThumbnail 
                      src={item.thumbnail} 
                      status={item.status}
                    >
                      <ItemStatusIndicator status={item.status}>
                        {item.status === 'completed' && <CheckCircleIcon fontSize="small" />}
                        {item.status === 'failed' && <ErrorIcon fontSize="small" />}
                        {item.status === 'processing' && <AccessTimeIcon fontSize="small" />}
                      </ItemStatusIndicator>
                    </ItemThumbnail>
                    <ItemInfo>
                      <ItemName>{item.productName}</ItemName>
                      <ItemStatus>
                        <StatusIcon status={item.status} />
                        {getStatusText(item.status)}
                      </ItemStatus>
                      {item.error && (
                        <ItemError>{item.error}</ItemError>
                      )}
                      <ItemMeta>
                        {item.processedAt && (
                          <span>{new Date(item.processedAt).toLocaleTimeString('zh-CN')}</span>
                        )}
                        {item.size && (
                          <span>{item.size}</span>
                        )}
                      </ItemMeta>
                    </ItemInfo>
                  </ItemCard>
                ))}
              </ItemsGrid>
            </>
          )}
          
          {activeTab === 'versions' && (
            <VersionHistory>
              {versionHistory.length === 0 ? (
                <EmptyState>暂无版本历史记录</EmptyState>
              ) : (
                versionHistory.map((version) => (
                  <VersionItem 
                    key={version.id} 
                    current={version.isCurrent}
                  >
                    <VersionInfo>
                      <VersionHeader>
                        <VersionTitle current={version.isCurrent}>
                          {version.id} 
                          <span>{version.statusText}</span>
                        </VersionTitle>
                        <VersionDate>
                          {new Date(version.timestamp).toLocaleString('zh-CN')}
                        </VersionDate>
                      </VersionHeader>
                      
                      <VersionChanges>
                        {version.changes.map((change, index) => (
                          <VersionChangeItem key={index}>
                            <span>{change.type}:</span>
                            <span>{change.value}</span>
                          </VersionChangeItem>
                        ))}
                      </VersionChanges>
                    </VersionInfo>
                  </VersionItem>
                ))
              )}
            </VersionHistory>
          )}
          
          {activeTab === 'audits' && batchConfig && batchConfig.audits && (
            <div>
              {batchConfig.audits.length === 0 ? (
                <EmptyState>暂无审核记录</EmptyState>
              ) : (
                batchConfig.audits.map((audit) => (
                  <VersionItem 
                    key={audit.id}
                    current={audit.status === 'approved'}
                  >
                    <VersionInfo>
                      <VersionHeader>
                        <VersionTitle current={audit.status === 'approved'}>
                          审核人: {audit.user}
                          <span>{audit.status === 'approved' ? '已通过' : '未通过'}</span>
                        </VersionTitle>
                        <VersionDate>
                          {new Date(audit.date).toLocaleString('zh-CN')}
                        </VersionDate>
                      </VersionHeader>
                      
                      <div style={{ marginTop: '8px' }}>
                        <p style={{ margin: 0, fontSize: '14px' }}>{audit.comments}</p>
                      </div>
                    </VersionInfo>
                  </VersionItem>
                ))
              )}
            </div>
          )}
        </ItemsSection>
      </Content>
    </Container>
  );
};

export default BatchDetail; 