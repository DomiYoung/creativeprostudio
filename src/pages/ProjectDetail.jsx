import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design-system';
import styled from '@emotion/styled';

// 导入组件
import PageLayout from '../design-system/components/PageLayout';
import DeleteConfirmModal from '../components/ui/DeleteConfirmModal';
import EditProjectModal from '../components/ui/EditProjectModal';

// 模拟数据
const mockProjects = [
  {
    id: "1",
    title: '2025春季产品发布',
    coverImage: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'campaign',
    status: 'inprogress',
    tags: ['春季', '产品发布', '重点'],
    progress: 75,
    updated: '2天前',
    deadline: '2025-06-15',
    team: [
      { id: 1, name: 'Jane Doe', role: '项目经理', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 2, name: 'John Smith', role: '视觉设计师', avatar: 'https://i.pravatar.cc/150?img=2' }
    ],
    statusText: '进行中',
    description: '2025春季产品线发布策划，包括线上宣传物料和线下活动策划。重点包括新品发布、社交媒体推广和KOL合作。',
    tasks: [
      { id: 1, title: '确定产品列表', status: 'completed', assignee: 'Jane Doe' },
      { id: 2, title: '视觉风格确认', status: 'completed', assignee: 'John Smith' },
      { id: 3, title: '线上物料设计', status: 'inprogress', assignee: 'John Smith' },
      { id: 4, title: '预算审批', status: 'pending', assignee: 'Jane Doe' },
      { id: 5, title: 'KOL名单确认', status: 'pending', assignee: 'Jane Doe' }
    ],
    timeline: [
      { date: '2025-04-10', event: '项目启动' },
      { date: '2025-05-01', event: '物料定稿' },
      { date: '2025-05-15', event: 'KOL合作启动' },
      { date: '2025-06-01', event: '线上宣传开始' },
      { date: '2025-06-15', event: '产品正式发布' }
    ],
    createdAt: '2025-03-15',
    createdBy: 'domiyoung__',
    projectImages: [
      { id: '101', name: '首页Banner', url: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg', type: 'banner' },
      { id: '102', name: '产品展示图1', url: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg', type: 'product' },
      { id: '103', name: '产品展示图2', url: 'https://images.pexels.com/photos/4620843/pexels-photo-4620843.jpeg', type: 'product' },
      { id: '104', name: '社交媒体宣传图', url: 'https://images.pexels.com/photos/3826678/pexels-photo-3826678.jpeg', type: 'social' },
      { id: '105', name: 'KOL合作视觉', url: 'https://images.pexels.com/photos/8128072/pexels-photo-8128072.jpeg', type: 'kol' },
      { id: '106', name: '线下活动海报', url: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg', type: 'poster' }
    ]
  },
  {
    id: "2",
    title: '美妆新品社交媒体宣传',
    coverImage: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'social',
    status: 'review',
    tags: ['社交媒体', '美妆', '宣传'],
    progress: 85,
    updated: '昨天',
    deadline: '2025-06-20',
    team: [
      { id: 3, name: 'Lisa Wong', role: '内容策划', avatar: 'https://i.pravatar.cc/150?img=5' }
    ],
    statusText: '审核中',
    isFeatured: true,
    description: '针对新款彩妆系列的社交媒体宣传活动，重点覆盖小红书、微博、抖音三大平台，通过创意内容和互动活动提升品牌曝光度。',
    tasks: [
      { id: 1, title: '内容日历规划', status: 'completed', assignee: 'Lisa Wong' },
      { id: 2, title: '小红书爆款文案', status: 'completed', assignee: 'Lisa Wong' },
      { id: 3, title: '抖音素材拍摄', status: 'completed', assignee: 'Lisa Wong' },
      { id: 4, title: '微博话题策划', status: 'inprogress', assignee: 'Lisa Wong' },
      { id: 5, title: '数据分析报告', status: 'pending', assignee: 'Lisa Wong' }
    ],
    timeline: [
      { date: '2025-05-01', event: '项目启动' },
      { date: '2025-05-15', event: '内容规划完成' },
      { date: '2025-06-01', event: '内容开始发布' },
      { date: '2025-06-20', event: '活动结束' },
      { date: '2025-06-30', event: '效果评估' }
    ],
    createdAt: '2025-04-20',
    createdBy: 'domiyoung__'
  }
];

// 样式组件
const ProjectHeader = styled.div`
  margin-bottom: 24px;
  position: relative;
`;

const CoverImage = styled.div`
  width: 100%;
  height: 240px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
  }

  &::after {
    content: '点击进入画布编辑器';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 18px;
    border-radius: 20px;
    font-size: 15px;
    font-weight: 600;
    opacity: 0;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(4px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  &:hover::after {
    opacity: 1;
  }
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
  color: white;
  background: ${props => {
    switch(props.status) {
      case 'inprogress': return 'rgba(124, 101, 255, 0.9)';
      case 'review': return 'rgba(255, 170, 80, 0.9)';
      case 'completed': return 'rgba(52, 199, 89, 0.9)';
      case 'archived': return 'rgba(120, 120, 128, 0.9)';
      default: return 'rgba(124, 101, 255, 0.9)';
    }
  }};
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
  color: white;
  background: rgba(255, 59, 48, 0.9);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const ProjectMeta = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  color: white;
  z-index: 10;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const ProjectTag = styled.span`
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
`;

const ContentSection = styled.div`
  background: ${props => props.isDark ? '#1e1e1e' : 'white'};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, ${props => props.isDark ? '0.25' : '0.05'});
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  display: flex;
  align-items: center;
  
  i {
    margin-right: 10px;
    opacity: 0.8;
  }
`;

const ProjectDescription = styled.p`
  color: ${props => props.isDark ? '#bbb' : '#666'};
  line-height: 1.6;
  margin: 0;
`;

const ProjectProgress = styled.div`
  margin-top: 20px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  border-radius: 4px;
  margin-top: 8px;
  overflow: hidden;
  
  &::before {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background: linear-gradient(to right, ${props => {
      if (props.status === 'completed') return '#34c759, #32d74b';
      if (props.status === 'review') return '#ff9500, #ffaa00';
      return '#7c65ff, #9180ff';
    }});
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

const TeamSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const TeamMember = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-size: cover;
  background-position: center;
  margin-right: 12px;
  border: 3px solid ${props => props.isDark ? '#1e1e1e' : 'white'};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.div`
  font-weight: 600;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
  margin-bottom: 2px;
`;

const MemberRole = styled.div`
  font-size: 12px;
  color: ${props => props.isDark ? '#888' : '#666'};
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Task = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
`;

const TaskStatus = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    switch(props.status) {
      case 'completed': return props.isDark ? 'rgba(52, 199, 89, 0.2)' : 'rgba(52, 199, 89, 0.1)';
      case 'inprogress': return props.isDark ? 'rgba(124, 101, 255, 0.2)' : 'rgba(124, 101, 255, 0.1)';
      default: return props.isDark ? 'rgba(120, 120, 128, 0.2)' : 'rgba(120, 120, 128, 0.1)';
    }
  }};
  
  i {
    font-size: 10px;
    color: ${props => {
      switch(props.status) {
        case 'completed': return '#34c759';
        case 'inprogress': return '#7c65ff';
        default: return '#787880';
      }
    }};
  }
`;

const TaskTitle = styled.div`
  flex: 1;
  font-weight: ${props => props.status === 'completed' ? '500' : '600'};
  color: ${props => {
    if (props.isDark) {
      return props.status === 'completed' ? '#aaa' : '#f5f5f5';
    } else {
      return props.status === 'completed' ? '#888' : '#1d1d1f';
    }
  }};
  text-decoration: ${props => props.status === 'completed' ? 'line-through' : 'none'};
`;

const TaskAssignee = styled.div`
  font-size: 12px;
  color: ${props => props.isDark ? '#888' : '#666'};
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 24px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 6px;
    width: 2px;
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: 20px;
  
  &:last-child {
    padding-bottom: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -24px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${props => props.isDark ? '#7c65ff' : '#9180ff'};
    box-shadow: 0 0 0 4px ${props => props.isDark ? 'rgba(124, 101, 255, 0.2)' : 'rgba(124, 101, 255, 0.15)'};
  }
`;

const TimelineDate = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  color: ${props => props.isDark ? '#f5f5f5' : '#1d1d1f'};
`;

const TimelineEvent = styled.div`
  color: ${props => props.isDark ? '#bbb' : '#666'};
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: ${props => props.isDark ? '#888' : '#666'};
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  
  i {
    margin-right: 8px;
    opacity: 0.7;
  }
`;

const ProjectActions = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 12px;
  z-index: 20;
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.isDark ? 'white' : '#333'};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    background: ${props => props.primary 
      ? (props.isDark ? 'rgba(124, 101, 255, 0.8)' : 'rgba(124, 101, 255, 0.9)') 
      : (props.danger 
          ? (props.isDark ? 'rgba(255, 59, 48, 0.8)' : 'rgba(255, 59, 48, 0.9)')
          : (props.isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)'))
    };
    color: ${props => (props.primary || props.danger) ? 'white' : (props.isDark ? 'white' : '#333')};
  }
`;

const BackButton = styled(ActionButton)`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 20;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 8px;
`;

const QuickActionButton = styled(motion.button)`
  background: ${props => props.secondary ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.secondary ? '#666' : (props.isDark ? 'white' : '#333')};
  border: none;
  width: 100px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    background: ${props => props.secondary ? 'rgba(255, 255, 255, 0.2)' : (props.isDark ? 'rgba(124, 101, 255, 0.8)' : 'rgba(124, 101, 255, 0.9)')};
    color: ${props => props.secondary ? '#666' : (props.isDark ? 'white' : '#333')};
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const TabButton = styled(motion.button)`
  background: ${props => props.active ? (props.isDark ? 'rgba(124, 101, 255, 0.8)' : 'rgba(124, 101, 255, 0.9)') : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.isDark ? (props.active ? 'white' : '#888') : '#333'};
  border: none;
  width: 100px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(124, 101, 255, 0.8)' : 'rgba(124, 101, 255, 0.9)'};
    color: ${props => props.isDark ? 'white' : '#333'};
  }
`;

const TaskAddButton = styled(motion.button)`
  background: ${props => props.isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.isDark ? 'white' : '#333'};
  border: none;
  width: 100px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(124, 101, 255, 0.8)' : 'rgba(124, 101, 255, 0.9)'};
    color: ${props => props.isDark ? 'white' : '#333'};
  }
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
`;

const TaskCheck = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    switch(props.status) {
      case 'completed': return props.isDark ? 'rgba(52, 199, 89, 0.2)' : 'rgba(52, 199, 89, 0.1)';
      case 'inprogress': return props.isDark ? 'rgba(124, 101, 255, 0.2)' : 'rgba(124, 101, 255, 0.1)';
      default: return props.isDark ? 'rgba(120, 120, 128, 0.2)' : 'rgba(120, 120, 128, 0.1)';
    }
  }};
  
  i {
    font-size: 10px;
    color: ${props => {
      switch(props.status) {
        case 'completed': return '#34c759';
        case 'inprogress': return '#7c65ff';
        default: return '#787880';
      }
    }};
  }
`;

const TaskContent = styled.div`
  flex: 1;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 8px;
`;

const TaskAction = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
  
  &:hover {
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 增加图片库组件
const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

const ImageItem = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16/9;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &::after {
    content: '点击编辑';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 2;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageName = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  color: white;
  font-size: 12px;
  font-weight: 500;
  z-index: 1;
`;

const ImageType = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  background: rgba(124, 101, 255, 0.8);
  color: white;
  font-size: 10px;
  font-weight: 600;
  border-radius: 10px;
  z-index: 1;
`;

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  
  // 获取项目数据
  useEffect(() => {
    // 模拟API请求
    const fetchProject = () => {
      setLoading(true);
      setTimeout(() => {
        console.log("查找项目ID:", projectId, typeof projectId);
        
        // 不进行严格ID匹配，直接使用第一个项目数据
        // 这样无论传入什么ID都会显示项目详情
        setProject(mockProjects[0]);
        
        /* 原来的ID匹配逻辑，暂时注释掉
        // 确保ID比较时使用字符串比较，因为URL参数总是字符串
        const foundProject = mockProjects.find(p => String(p.id) === String(projectId));
        console.log("找到项目:", foundProject);
        if (foundProject) {
          setProject(foundProject);
        } else {
          // 项目不存在，返回列表页
          console.log("项目不存在，返回列表页");
          navigate('/creativeprostudio/projects');
        }
        */
        
        setLoading(false);
      }, 500);
    };
    
    fetchProject();
  }, [projectId, navigate]);
  
  // 返回项目列表
  const handleBack = () => {
    navigate('/creativeprostudio/projects');
  };
  
  // 打开编辑模态框
  const handleEdit = () => {
    setShowEditModal(true);
  };
  
  // 关闭编辑模态框
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  
  // 更新项目信息
  const handleUpdateProject = (updatedProject) => {
    setProject(prevProject => ({
      ...prevProject,
      ...updatedProject
    }));
    setShowEditModal(false);
  };
  
  // 打开删除确认模态框
  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  
  // 确认删除
  const confirmDelete = () => {
    // 执行删除逻辑，然后返回列表页
    navigate('/creativeprostudio/projects');
  };
  
  // 关闭删除确认弹窗
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  
  // 获取任务状态图标
  const getTaskStatusIcon = (status) => {
    switch(status) {
      case 'completed': return 'fa-check';
      case 'inprogress': return 'fa-spinner';
      default: return 'fa-clock';
    }
  };
  
  // 加载中状态
  if (loading) {
    return (
      <PageLayout
        title="项目详情"
        subtitle="加载中..."
        icon="fa-project-diagram"
        iconColor="#9180FF"
      >
        <div className="flex justify-center items-center" style={{ height: '50vh' }}>
          <div className={`animate-spin h-12 w-12 border-t-2 border-b-2 rounded-full ${
            isDark ? 'border-indigo-400' : 'border-indigo-600'
          }`}></div>
        </div>
      </PageLayout>
    );
  }
  
  // 项目不存在
  if (!project) {
    return null;
  }
  
  return (
    <PageLayout
      title={project.title}
      subtitle={`${project.type === 'campaign' ? '营销活动' : project.type === 'social' ? '社交媒体' : project.type === 'product' ? '产品设计' : '其他项目'} · ${project.statusText}`}
      icon="fa-project-diagram"
      iconColor="#9180FF"
      showTitle={false}
    >
      <ProjectHeader>
        <CoverImage 
          style={{ backgroundImage: `url(${project.coverImage})` }}
          onClick={() => {
            console.log("导航到画布编辑器，项目ID:", project.id);
            navigate(`/creativeprostudio/canvas-editor?project=${project.id}`);
          }}
        >
          <BackButton
            isDark={isDark}
            onClick={(e) => {
              e.stopPropagation();
              handleBack();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-arrow-left"></i>
          </BackButton>
          
          <ProjectActions>
            <ActionButton
              isDark={isDark}
              primary
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-edit"></i>
            </ActionButton>
            
            <ActionButton
              isDark={isDark}
              danger
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-trash"></i>
            </ActionButton>
          </ProjectActions>
          
          {project.isFeatured && <FeaturedBadge>重点项目</FeaturedBadge>}
          <StatusBadge status={project.status}>{project.statusText}</StatusBadge>
          
          <ProjectMeta>
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <div className="text-sm opacity-80">
              截止日期: {project.deadline} · 更新于 {project.updated}
            </div>
            
            <ProjectTags>
              {project.tags.map((tag, index) => (
                <ProjectTag key={index}>{tag}</ProjectTag>
              ))}
            </ProjectTags>
            
            <QuickActions>
              <QuickActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("快速动作按钮，导航到画布编辑器，项目ID:", project.id);
                  navigate(`/creativeprostudio/canvas-editor?project=${project.id}`);
                }}
              >
                <i className="fas fa-pencil-alt"></i>
                编辑设计
              </QuickActionButton>
              
              <QuickActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                secondary
                onClick={(e) => e.stopPropagation()}
              >
                <i className="fas fa-share-alt"></i>
                分享
              </QuickActionButton>
              
              <QuickActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                secondary
                onClick={(e) => e.stopPropagation()}
              >
                <i className="fas fa-download"></i>
                导出
              </QuickActionButton>
            </QuickActions>
          </ProjectMeta>
        </CoverImage>
      </ProjectHeader>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ContentSection isDark={isDark}>
            <TabsContainer>
              {['概述', '任务', '日程', '团队', '文件'].map((tab, index) => (
                <TabButton 
                  key={index} 
                  active={activeTab === index}
                  onClick={() => setActiveTab(index)}
                  isDark={isDark}
                >
                  {tab}
                </TabButton>
              ))}
            </TabsContainer>
            
            {activeTab === 0 && (
              <>
                <SectionTitle isDark={isDark}>
                  <i className="fas fa-info-circle"></i>
                  项目概述
                </SectionTitle>
                <ProjectDescription isDark={isDark}>
                  {project.description}
                </ProjectDescription>
                
                <ProjectProgress>
                  <div className="flex justify-between items-center mb-2">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      完成进度
                    </span>
                    <span className={`font-semibold ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>
                      {project.progress}%
                    </span>
                  </div>
                  <ProgressBar progress={project.progress} status={project.status} isDark={isDark} />
                </ProjectProgress>
              </>
            )}
            
            {activeTab === 1 && (
              <>
                <SectionTitle isDark={isDark}>
                  <i className="fas fa-tasks"></i>
                  任务列表
                  <TaskAddButton 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddTaskModal(true)}
                  >
                    <i className="fas fa-plus"></i>
                    添加任务
                  </TaskAddButton>
                </SectionTitle>
                <TasksList>
                  {project.tasks.map((task, index) => (
                    <TaskItem key={index} status={task.status} isDark={isDark}>
                      <TaskCheck status={task.status}>
                        <i className={`fas ${getTaskStatusIcon(task.status)}`}></i>
                      </TaskCheck>
                      <TaskContent>
                        <TaskTitle>{task.title}</TaskTitle>
                        <TaskAssignee>{task.assignee}</TaskAssignee>
                      </TaskContent>
                      <TaskActions>
                        <TaskAction>
                          <i className="fas fa-ellipsis-v"></i>
                        </TaskAction>
                      </TaskActions>
                    </TaskItem>
                  ))}
                </TasksList>
              </>
            )}
            
            {activeTab === 2 && (
              <>
                <SectionTitle isDark={isDark}>
                  <i className="fas fa-calendar"></i>
                  项目时间线
                </SectionTitle>
                <Timeline isDark={isDark}>
                  {project.timeline.map((item, index) => (
                    <TimelineItem key={index} isDark={isDark}>
                      <TimelineDate isDark={isDark}>{item.date}</TimelineDate>
                      <TimelineEvent isDark={isDark}>{item.event}</TimelineEvent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </>
            )}
            
            {activeTab === 3 && (
              <ContentSection isDark={isDark}>
                <SectionTitle isDark={isDark}>
                  <i className="fas fa-users"></i>
                  项目团队
                </SectionTitle>
                <TeamSection>
                  {project.team.map((member, index) => (
                    <TeamMember key={index} isDark={isDark}>
                      <Avatar 
                        style={{ backgroundImage: `url(${member.avatar})` }}
                        isDark={isDark}
                      />
                      <MemberInfo>
                        <MemberName isDark={isDark}>{member.name}</MemberName>
                        <MemberRole isDark={isDark}>{member.role}</MemberRole>
                      </MemberInfo>
                    </TeamMember>
                  ))}
                </TeamSection>
              </ContentSection>
            )}
            
            {activeTab === 4 && (
              <ContentSection isDark={isDark}>
                <SectionTitle isDark={isDark}>
                  <i className="fas fa-images"></i>
                  项目图片库
                </SectionTitle>
                <p style={{ color: isDark ? '#bbb' : '#666', marginBottom: '16px' }}>
                  项目相关的设计图片和素材，点击可以进入画布编辑器进行编辑。
                </p>
                
                <ImageGallery>
                  {project.projectImages && project.projectImages.map((image) => (
                    <ImageItem 
                      key={image.id}
                      onClick={() => {
                        console.log(`编辑图片: ${image.id}, 项目ID: ${project.id}`);
                        navigate(`/creativeprostudio/canvas-editor?project=${project.id}&image=${image.id}`);
                      }}
                    >
                      <ImagePreview src={image.url} alt={image.name} />
                      <ImageName>{image.name}</ImageName>
                      <ImageType>{image.type}</ImageType>
                    </ImageItem>
                  ))}
                </ImageGallery>
              </ContentSection>
            )}
            
            <MetaInfo isDark={isDark}>
              <MetaItem>
                <i className="far fa-calendar-alt"></i>
                创建于 {project.createdAt}
              </MetaItem>
              
              <MetaItem>
                <i className="far fa-user"></i>
                创建者: {project.createdBy}
              </MetaItem>
            </MetaInfo>
          </ContentSection>
        </div>
        
        <div>
          {/* 右侧内容部分 */}
        </div>
      </div>
      
      <div className="text-center mt-8 text-sm" style={{ color: isDark ? '#888' : '#666' }}>
        © domiyoung__ | CreativePro Studio - 项目详情 | 版权所有
      </div>
      
      {/* 编辑项目模态框 */}
      {showEditModal && (
        <EditProjectModal
          project={project}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdateProject}
          isDark={isDark}
        />
      )}
      
      {/* 删除确认模态框 */}
      {showDeleteModal && (
        <DeleteConfirmModal
          title={`删除项目：${project.title}`}
          message="确定要删除这个项目吗？此操作无法撤销，所有与该项目相关的设计和内容都将被移除。"
          onConfirm={confirmDelete}
          onCancel={closeDeleteModal}
          isDark={isDark}
        />
      )}
    </PageLayout>
  );
};

export default ProjectDetail; 