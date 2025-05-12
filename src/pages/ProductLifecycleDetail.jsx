import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

// 导入统一组件
import PageLayout from '../design-system/components/PageLayout';
import Button from '../design-system/components/Button';

// 图标
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import TimerIcon from '@mui/icons-material/Timer';

// 样式组件
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ isDark }) => isDark 
    ? 'linear-gradient(145deg, rgba(32, 33, 36, 0.8), rgba(43, 44, 55, 0.8))' 
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(245, 245, 250, 0.8))'};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

const StageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const StageIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-right: 1rem;
  background: ${props => props.gradient || 'linear-gradient(135deg, #FF9190, #FF76A5)'};
  box-shadow: 0 8px 16px rgba(255, 145, 144, 0.3);
  color: white;
`;

const StageTitle = styled.div`
  display: flex;
  align-items: center;
  
  h1 {
    margin: 0;
    font-size: 2.2rem;
    font-weight: 700;
    color: ${({ isDark }) => isDark ? '#f5f5f5' : '#333'};
    line-height: 1.2;
  }
  
  p {
    margin: 0.5rem 0 0;
    font-size: 1rem;
    color: ${({ isDark }) => isDark ? '#aaa' : '#666'};
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: ${({ isDark }) => isDark ? '#f5f5f5' : '#333'};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: #FF9190;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const ContentCard = styled(motion.div)`
  padding: 1.5rem;
  border-radius: 16px;
  background: ${({ isDark }) => isDark 
    ? 'rgba(50, 50, 60, 0.6)' 
    : 'rgba(255, 255, 255, 0.8)'};
  border: 1px solid ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0 1rem;
    color: ${({ isDark }) => isDark ? '#f5f5f5' : '#333'};
  }
  
  p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: ${({ isDark }) => isDark ? '#bbb' : '#555'};
    margin: 0;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActivityItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 12px;
  background: ${({ isDark }) => isDark 
    ? 'rgba(60, 60, 70, 0.5)' 
    : 'rgba(250, 250, 255, 0.8)'};
  border: 1px solid ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'};
  
  .icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: ${({ status }) => 
      status === 'completed' ? 'rgba(46, 213, 115, 0.2)' :
      status === 'inProgress' ? 'rgba(86, 130, 255, 0.2)' :
      'rgba(255, 145, 144, 0.2)'
    };
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    flex-shrink: 0;
    
    svg {
      color: ${({ status }) => 
        status === 'completed' ? '#2ed573' :
        status === 'inProgress' ? '#5682ff' :
        '#FF9190'
      };
    }
  }
  
  .content {
    flex: 1;
    
    h4 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      color: ${({ isDark }) => isDark ? '#f5f5f5' : '#333'};
    }
    
    p {
      margin: 0;
      font-size: 0.9rem;
      color: ${({ isDark }) => isDark ? '#aaa' : '#666'};
      line-height: 1.5;
    }
  }
`;

const RelatedResourcesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const ResourceItem = styled(motion.a)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: ${({ isDark }) => isDark 
    ? 'rgba(40, 40, 50, 0.8)' 
    : 'rgba(245, 245, 250, 0.8)'};
  border: 1px solid ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'};
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
  
  svg {
    margin-right: 0.5rem;
    font-size: 1.2rem;
    color: #FF9190;
  }
  
  span {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ isDark }) => isDark ? '#ddd' : '#444'};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CopyrightNotice = styled.div`
  text-align: right;
  margin-top: 2rem;
  font-size: 0.8rem;
  color: ${({ isDark }) => isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'};
`;

// 产品生命周期详情页面组件
const ProductLifecycleDetail = () => {
  const { stageId } = useParams();
  const navigate = useNavigate();
  const [stageData, setStageData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 从设计系统获取主题
  const colorMode = 'light'; // 这里应该从你的设计系统中获取
  const isDark = colorMode === 'dark';
  
  // 生命周期阶段数据
  const lifecycleStages = {
    planning: {
      id: 'planning',
      title: '规划构想',
      description: '定义产品愿景、目标用户和核心功能',
      icon: '💡',
      gradient: 'linear-gradient(135deg, #FF9190, #FF76A5)',
      keyPoints: [
        '市场调研与分析',
        '定义产品愿景和价值主张',
        '确定目标用户群体',
        '初步功能规划',
        '竞品分析'
      ],
      activities: [
        {
          id: 1,
          title: '目标用户研究',
          description: '深入了解18-25岁Z世代女性用户的美妆与潮流需求、行为和偏好',
          status: 'completed'
        },
        {
          id: 2,
          title: '市场趋势分析',
          description: '研究当前美妆与潮流市场趋势，包括短视频、AR/VR、AI个性化等',
          status: 'completed'
        },
        {
          id: 3,
          title: '产品愿景制定',
          description: '定义产品核心价值、差异化优势和长期发展方向',
          status: 'inProgress'
        },
        {
          id: 4,
          title: '初步功能规划',
          description: '确定产品必备功能、优先级和实施路径',
          status: 'pending'
        }
      ],
      relatedResources: [
        { title: '美妆用户调研报告', url: '#' },
        { title: 'Z世代消费行为分析', url: '#' },
        { title: '2025美妆科技趋势', url: '#' }
      ]
    },
    requirements: {
      id: 'requirements',
      title: '需求分析',
      description: '收集与分析详细的用户需求与业务需求',
      icon: '📊',
      gradient: 'linear-gradient(135deg, #5682FF, #8BABFF)',
      keyPoints: [
        '用户故事和场景定义',
        '功能需求文档',
        '非功能性需求分析',
        '技术可行性评估',
        'MoSCoW优先级划分'
      ],
      activities: [
        {
          id: 1,
          title: '用户访谈和调研',
          description: '与目标用户进行深度访谈，了解痛点和需求',
          status: 'completed'
        },
        {
          id: 2,
          title: '需求文档撰写',
          description: '编写详细的功能需求规格说明书',
          status: 'inProgress'
        },
        {
          id: 3,
          title: '需求优先级划分',
          description: '使用MoSCoW方法(Must have, Should have, Could have, Won\'t have)对需求进行优先级排序',
          status: 'inProgress'
        },
        {
          id: 4,
          title: '技术可行性评估',
          description: '评估需求的技术实现难度和资源消耗',
          status: 'pending'
        }
      ],
      relatedResources: [
        { title: '功能需求规格说明书', url: '#' },
        { title: '用户故事地图', url: '#' },
        { title: '技术可行性评估报告', url: '#' }
      ]
    },
    design: {
      id: 'design',
      title: '设计',
      description: '创建产品的视觉和交互设计，以及技术架构',
      icon: '🎨',
      gradient: 'linear-gradient(135deg, #FF9F1A, #FFCC6F)',
      keyPoints: [
        'UI/UX设计',
        '原型设计',
        '技术架构设计',
        '数据库设计',
        'API设计'
      ],
      activities: [
        {
          id: 1,
          title: '设计系统创建',
          description: '建立统一的设计系统，包括色彩、排版、组件库等',
          status: 'completed'
        },
        {
          id: 2,
          title: '线框图和原型设计',
          description: '创建低保真线框图和高保真交互原型',
          status: 'completed'
        },
        {
          id: 3,
          title: 'UI设计',
          description: '基于设计系统创建视觉设计稿',
          status: 'inProgress'
        },
        {
          id: 4,
          title: '技术架构设计',
          description: '设计前后端架构、数据流和API',
          status: 'inProgress'
        }
      ],
      relatedResources: [
        { title: '设计系统文档', url: '#' },
        { title: 'Figma设计文件', url: '#' },
        { title: '技术架构图', url: '#' }
      ]
    },
    development: {
      id: 'development',
      title: '开发',
      description: '实现产品的前端和后端功能',
      icon: '💻',
      gradient: 'linear-gradient(135deg, #2ED573, #7BED9F)',
      keyPoints: [
        '前端开发',
        '后端开发',
        'API集成',
        '数据库实现',
        '持续集成'
      ],
      activities: [
        {
          id: 1,
          title: '环境搭建',
          description: '搭建开发、测试和生产环境',
          status: 'completed'
        },
        {
          id: 2,
          title: '前端开发',
          description: '使用React.js(Next.js)实现用户界面',
          status: 'inProgress'
        },
        {
          id: 3,
          title: '后端开发',
          description: '使用.NET Core实现API和服务',
          status: 'inProgress'
        },
        {
          id: 4,
          title: 'AI功能集成',
          description: '集成AI服务如Google Cloud Vision、TensorFlow.js等',
          status: 'pending'
        }
      ],
      relatedResources: [
        { title: '前端技术文档', url: '#' },
        { title: '后端API文档', url: '#' },
        { title: '代码仓库', url: '#' }
      ]
    },
    testing: {
      id: 'testing',
      title: '测试',
      description: '确保产品质量和用户体验',
      icon: '🧪',
      gradient: 'linear-gradient(135deg, #8A2BE2, #BF6FF9)',
      keyPoints: [
        '单元测试',
        '集成测试',
        'UI测试',
        '性能测试',
        '用户测试'
      ],
      activities: [
        {
          id: 1,
          title: '测试计划制定',
          description: '制定详细的测试策略和计划',
          status: 'inProgress'
        },
        {
          id: 2,
          title: '单元测试',
          description: '编写和执行单元测试',
          status: 'pending'
        },
        {
          id: 3,
          title: '集成测试',
          description: '测试系统组件间的交互',
          status: 'pending'
        },
        {
          id: 4,
          title: '用户验收测试',
          description: '邀请目标用户参与测试并收集反馈',
          status: 'pending'
        }
      ],
      relatedResources: [
        { title: '测试计划文档', url: '#' },
        { title: '测试用例库', url: '#' },
        { title: '测试报告', url: '#' }
      ]
    },
    deployment: {
      id: 'deployment',
      title: '部署',
      description: '将产品发布到生产环境',
      icon: '🚀',
      gradient: 'linear-gradient(135deg, #1E88E5, #29B6F6)',
      keyPoints: [
        '部署策略',
        '环境配置',
        '监控设置',
        '性能优化',
        '发布计划'
      ],
      activities: [
        {
          id: 1,
          title: '部署策略制定',
          description: '制定部署策略，包括滚动发布、蓝绿部署等',
          status: 'pending'
        },
        {
          id: 2,
          title: '生产环境配置',
          description: '配置生产服务器、数据库和其他基础设施',
          status: 'pending'
        },
        {
          id: 3,
          title: '监控和日志系统搭建',
          description: '搭建监控和日志系统，确保问题及时发现和解决',
          status: 'pending'
        },
        {
          id: 4,
          title: '性能优化',
          description: '优化网站性能，包括加载速度、响应时间等',
          status: 'pending'
        }
      ],
      relatedResources: [
        { title: '部署文档', url: '#' },
        { title: '监控配置指南', url: '#' },
        { title: '性能优化报告', url: '#' }
      ]
    },
    iteration: {
      id: 'iteration',
      title: '迭代',
      description: '根据用户反馈和数据分析持续优化产品',
      icon: '🔄',
      gradient: 'linear-gradient(135deg, #FF4757, #FF6B81)',
      keyPoints: [
        '数据分析',
        '用户反馈收集',
        '功能优化',
        '新功能规划',
        'A/B测试'
      ],
      activities: [
        {
          id: 1,
          title: '用户反馈收集系统搭建',
          description: '建立用户反馈渠道和流程',
          status: 'pending'
        },
        {
          id: 2,
          title: '数据分析系统搭建',
          description: '搭建数据分析系统，追踪关键指标',
          status: 'pending'
        },
        {
          id: 3,
          title: 'A/B测试框架搭建',
          description: '搭建A/B测试框架，验证新功能和改进',
          status: 'pending'
        },
        {
          id: 4,
          title: '版本规划',
          description: '根据数据和反馈规划下一版本的功能和改进',
          status: 'pending'
        }
      ],
      relatedResources: [
        { title: '数据分析报告', url: '#' },
        { title: '用户反馈汇总', url: '#' },
        { title: '产品路线图', url: '#' }
      ]
    }
  };
  
  // 加载阶段数据
  useEffect(() => {
    if (stageId && lifecycleStages[stageId]) {
      setStageData(lifecycleStages[stageId]);
    } else {
      // 处理无效的stageId
      console.error('无效的阶段ID:', stageId);
      // 可以跳转到404页面或返回流程页面
    }
    setLoading(false);
  }, [stageId]);
  
  // 返回上一页
  const handleBack = () => {
    navigate(-1);
  };
  
  // 如果正在加载或数据不存在
  if (loading) {
    return (
      <PageLayout
        title="加载中..."
        description="正在加载生命周期阶段详情"
        activeNav="product-lifecycle"
        isDark={isDark}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          加载中...
        </div>
      </PageLayout>
    );
  }
  
  if (!stageData) {
    return (
      <PageLayout
        title="未找到"
        description="无法找到该生命周期阶段"
        activeNav="product-lifecycle"
        isDark={isDark}
      >
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2>无法找到该生命周期阶段</h2>
          <p>您请求的阶段不存在或已被移除</p>
          <Button
            variant={Button.VARIANTS.PRIMARY}
            onClick={handleBack}
            style={{ marginTop: '1rem' }}
          >
            <ArrowBackIcon style={{ marginRight: '0.5rem' }} />
            返回
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  // 导航路径
  const breadcrumbs = [
    { label: '首页', path: '/' },
    { label: 'AI助手', path: '/creativeprostudio/ai-assistant' },
    { label: '产品生命周期', path: '/creativeprostudio/product-lifecycle' },
    { label: stageData.title, path: `/creativeprostudio/product-lifecycle/${stageData.id}` }
  ];
  
  return (
    <PageLayout
      title={stageData.title}
      description={stageData.description}
      breadcrumbs={breadcrumbs}
      activeNav="ai-assistant"
      isDark={isDark}
    >
      <DetailContainer isDark={isDark}>
        <StageHeader isDark={isDark}>
          <StageTitle isDark={isDark}>
            <StageIcon gradient={stageData.gradient}>
              {stageData.icon}
            </StageIcon>
            <div>
              <h1>{stageData.title}</h1>
              <p>{stageData.description}</p>
            </div>
          </StageTitle>
          
          <Button
            variant={Button.VARIANTS.SECONDARY}
            onClick={handleBack}
            leftIcon={<ArrowBackIcon />}
          >
            返回
          </Button>
        </StageHeader>
        
        <div>
          <SectionTitle isDark={isDark}>关键要点</SectionTitle>
          <ContentGrid>
            {stageData.keyPoints.map((point, index) => (
              <ContentCard 
                key={index}
                isDark={isDark}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.15)' }}
              >
                <h3>#{index + 1}</h3>
                <p>{point}</p>
              </ContentCard>
            ))}
          </ContentGrid>
        </div>
        
        <div>
          <SectionTitle isDark={isDark}>活动与任务</SectionTitle>
          <ActivityList>
            {stageData.activities.map((activity, index) => (
              <ActivityItem 
                key={activity.id}
                isDark={isDark}
                status={activity.status}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="icon">
                  {activity.status === 'completed' ? (
                    <CheckCircleIcon />
                  ) : activity.status === 'inProgress' ? (
                    <PlayCircleFilledIcon />
                  ) : (
                    <TimerIcon />
                  )}
                </div>
                <div className="content">
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                </div>
              </ActivityItem>
            ))}
          </ActivityList>
        </div>
        
        <div>
          <SectionTitle isDark={isDark}>相关资源</SectionTitle>
          <RelatedResourcesList>
            {stageData.relatedResources.map((resource, index) => (
              <ResourceItem 
                key={index}
                href={resource.url}
                isDark={isDark}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-file-alt" style={{ marginRight: '0.5rem', color: '#FF9190' }}></i>
                <span>{resource.title}</span>
              </ResourceItem>
            ))}
          </RelatedResourcesList>
        </div>
        
        <CopyrightNotice isDark={isDark}>
          © domiyoung__
        </CopyrightNotice>
      </DetailContainer>
    </PageLayout>
  );
};

export default ProductLifecycleDetail; 