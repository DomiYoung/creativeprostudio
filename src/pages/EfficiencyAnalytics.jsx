import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../design-system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import PieChartIcon from '@mui/icons-material/PieChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import GetAppIcon from '@mui/icons-material/GetApp';
import FilterListIcon from '@mui/icons-material/FilterList';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MainNavigation from '../components/navigation/MainNavigation';
import PageHeader from '../components/navigation/PageHeader';

// 模拟数据 - 未来可以从API获取
const mockEfficiencyData = {
  overview: {
    totalProjects: 158,
    totalImages: 896,
    avgTimePerImage: 18, // 分钟
    avgRevisionsPerImage: 2.4,
    totalTimeSaved: 9720, // 分钟
    efficiencyImprovement: 68 // 百分比
  },
  recentProjects: [
    {
      id: 'proj1',
      name: '夏季美妆产品发布',
      images: 38,
      totalTime: 520, // 分钟
      avgTimePerImage: 13.7,
      avgRevisions: 1.8,
      timeSavedPercentage: 72
    },
    {
      id: 'proj2',
      name: '618大促活动素材',
      images: 65,
      totalTime: 845, // 分钟
      avgTimePerImage: 13,
      avgRevisions: 2.2,
      timeSavedPercentage: 74
    },
    {
      id: 'proj3',
      name: '新品上市推广',
      images: 24,
      totalTime: 380, // 分钟
      avgTimePerImage: 15.8,
      avgRevisions: 3.1,
      timeSavedPercentage: 65
    }
  ],
  brandAnalysis: {
    brands: [
      { 
        name: '兰蔻', 
        totalImages: 245, 
        avgTimePerImage: 15.2, 
        avgRevisions: 1.7, 
        efficiencyGain: 73,
        projectCount: 18
      },
      { 
        name: '雅诗兰黛', 
        totalImages: 187, 
        avgTimePerImage: 17.5, 
        avgRevisions: 2.3, 
        efficiencyGain: 68,
        projectCount: 15
      },
      { 
        name: '欧莱雅', 
        totalImages: 264, 
        avgTimePerImage: 14.8, 
        avgRevisions: 1.9, 
        efficiencyGain: 75,
        projectCount: 21
      },
      { 
        name: '资生堂', 
        totalImages: 120, 
        avgTimePerImage: 21.3, 
        avgRevisions: 3.2, 
        efficiencyGain: 61,
        projectCount: 12
      },
      { 
        name: '娇韵诗', 
        totalImages: 80, 
        avgTimePerImage: 19.6, 
        avgRevisions: 2.8, 
        efficiencyGain: 65,
        projectCount: 8
      }
    ],
    mostEfficientBrand: '欧莱雅',
    leastEfficientBrand: '资生堂',
    totalBrandProjects: 74
  },
  timeDistribution: [
    { name: '设计制作', value: 40 },
    { name: '审核修改', value: 25 },
    { name: '素材收集', value: 15 },
    { name: '导出发布', value: 10 },
    { name: '项目规划', value: 10 }
  ],
  revisionStats: {
    categoryCounts: {
      '0次修改': 218,
      '1-2次修改': 452,
      '3-5次修改': 185,
      '5次以上修改': 41
    },
    monthlyTrend: [
      { month: '1月', avgRevisions: 3.8 },
      { month: '2月', avgRevisions: 3.2 },
      { month: '3月', avgRevisions: 2.9 },
      { month: '4月', avgRevisions: 2.5 },
      { month: '5月', avgRevisions: 2.2 },
      { month: '6月', avgRevisions: 1.9 }
    ]
  },
  timeHistory: [
    { month: '1月', avgTimePerImage: 32, withTool: 32 },
    { month: '2月', avgTimePerImage: 28, withTool: 28 },
    { month: '3月', avgTimePerImage: 25, withTool: 25 },
    { month: '4月', avgTimePerImage: 22, withTool: 22 },
    { month: '5月', avgTimePerImage: 18, withTool: 18 },
    { month: '6月', avgTimePerImage: 15, withTool: 15 }
  ],
  comparativeData: {
    withoutTool: {
      avgTimePerImage: 56, // 分钟
      avgRevisionsPerImage: 5.8
    },
    withTool: {
      avgTimePerImage: 18, // 分钟
      avgRevisionsPerImage: 2.4
    }
  },
  efficiencyBottlenecks: {
    slowestProjects: [
      { name: '资生堂冬季新品', avgTime: 27.3, avgIndustry: 18.0, difference: 51.7 },
      { name: '娇韵诗礼盒装', avgTime: 25.8, avgIndustry: 18.0, difference: 43.3 },
      { name: '雅诗兰黛限定款', avgTime: 24.2, avgIndustry: 18.0, difference: 34.4 }
    ],
    highRevisionProjects: [
      { name: '资生堂冬季新品', revisionCount: 4.7, avgIndustry: 2.4, difference: 95.8 },
      { name: '某珠宝活动海报', revisionCount: 4.2, avgIndustry: 2.4, difference: 75.0 },
      { name: '新年营销活动', revisionCount: 3.8, avgIndustry: 2.4, difference: 58.3 }
    ],
    keyIssues: [
      { issue: '素材准备不充分', impactPercentage: 35, solution: '提前规划素材需求清单' },
      { issue: '反馈周期过长', impactPercentage: 28, solution: '实施快速审批流程' },
      { issue: '需求频繁变更', impactPercentage: 22, solution: '优化需求确认流程' },
      { issue: '协作沟通不畅', impactPercentage: 15, solution: '使用实时协作工具' }
    ]
  },
  economicBenefits: {
    yearlySavings: 324000, // 人民币
    resourceUtilization: 68, // 百分比提升
    qualityImprovement: 74, // 百分比提升
    productivityIncrease: 65, // 百分比提升
    roi: 532, // ROI百分比
    costBreakdown: [
      { category: '设计师时间成本', saving: 187000, percentage: 58 },
      { category: '审核人员时间成本', saving: 76000, percentage: 23 },
      { category: '第三方资源成本', saving: 41000, percentage: 13 },
      { category: '其他运营成本', saving: 20000, percentage: 6 }
    ],
    monthlyTrend: [
      { month: '1月', hours: 145, savings: 21750 },
      { month: '2月', hours: 168, savings: 25200 },
      { month: '3月', hours: 192, savings: 28800 },
      { month: '4月', hours: 207, savings: 31050 },
      { month: '5月', hours: 220, savings: 33000 },
      { month: '6月', hours: 236, savings: 35400 }
    ]
  }
};

// 样式组件
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.$isDark ? '#121212' : '#f5f5f7'};
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', Helvetica, Arial, sans-serif;
  color: ${props => props.$isDark ? '#f5f5f7' : '#1d1d1f'};
`;



const FilterButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: 1px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  font-size: 14px;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  }

  svg {
    font-size: 18px;
    margin-right: 6px;
  }
`;

const ExportButton = styled(FilterButton)`
  color: ${props => props.$isDark ? '#0A84FF' : '#007AFF'};
  border-color: ${props => props.$isDark ? '#0A84FF' : '#007AFF'};

  &:hover {
    background-color: ${props => props.$isDark ? 'rgba(10, 132, 255, 0.1)' : 'rgba(0, 122, 255, 0.1)'};
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 24px;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

const OverviewSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled(motion.div)`
  background-color: ${props => props.$isDark ? '#1C1C1E' : 'white'};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px ${props => props.$isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  display: flex;
  flex-direction: column;
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: white;
`;

const StatTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.$isDark ? '#86868B' : '#86868B'};
  margin: 0;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  margin-bottom: 8px;
`;

const StatSubtext = styled.div`
  font-size: 14px;
  color: ${props => props.$positive ? '#34C759' : props.$negative ? '#FF3B30' : props.$isDark ? '#86868B' : '#86868B'};
  display: flex;
  align-items: center;
`;

const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background-color: ${props => props.$isDark ? '#1C1C1E' : 'white'};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px ${props => props.$isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  margin: 0;
`;

const ChartContent = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$isDark ? '#86868B' : '#86868B'};
`;

const ProjectsSection = styled.div`
  margin-bottom: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  margin: 0;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
`;

const ProjectCard = styled.div`
  background-color: ${props => props.$isDark ? '#1C1C1E' : 'white'};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px ${props => props.$isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
`;

const ProjectHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${props => props.$isDark ? '#333' : '#f0f0f0'};
`;

const ProjectName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  margin: 0;
`;

const ProjectStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
`;

const ProjectStatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectStatLabel = styled.div`
  font-size: 12px;
  color: ${props => props.$isDark ? '#86868B' : '#86868B'};
  margin-bottom: 4px;
`;

const ProjectStatValue = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
`;

const ComparisonSection = styled.div`
  background-color: ${props => props.$isDark ? '#1C1C1E' : 'white'};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px ${props => props.$isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  margin-bottom: 24px;
`;

const ComparisonTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  margin: 0 0 20px 0;
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ComparisonCard = styled.div`
  padding: 20px;
  border-radius: 8px;
  background-color: ${props => props.$withTool 
    ? props.$isDark ? 'rgba(52, 199, 89, 0.1)' : 'rgba(52, 199, 89, 0.05)'
    : props.$isDark ? 'rgba(255, 59, 48, 0.1)' : 'rgba(255, 59, 48, 0.05)'
  };
  border: 1px solid ${props => props.$withTool 
    ? props.$isDark ? 'rgba(52, 199, 89, 0.2)' : 'rgba(52, 199, 89, 0.2)'
    : props.$isDark ? 'rgba(255, 59, 48, 0.2)' : 'rgba(255, 59, 48, 0.2)'
  };
`;

const ComparisonHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const ComparisonIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${props => props.$withTool ? '#34C759' : '#FF3B30'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: white;
`;

const ComparisonLabel = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  margin: 0;
`;

const ComparisonStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const ComparisonStatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const ComparisonStatLabel = styled.div`
  font-size: 14px;
  color: ${props => props.$isDark ? '#86868B' : '#86868B'};
  margin-bottom: 4px;
`;

const ComparisonStatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.$withTool ? '#34C759' : '#FF3B30'};
`;

const ConclusionCard = styled.div`
  background-color: ${props => props.$isDark ? '#1C1C1E' : 'white'};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px ${props => props.$isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  border-left: 4px solid ${props => props.$isDark ? '#5E5CE6' : '#5856D6'};
`;

const ConclusionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  margin: 0 0 16px 0;
`;

const ConclusionText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  margin: 0;
`;

// 图表模拟组件
const Chart = ({ type, data, isDark }) => (
  <ChartContent $isDark={isDark}>
    {type === 'bar' && '柱状图将在这里渲染（需要整合实际图表库）'}
    {type === 'line' && '折线图将在这里渲染（需要整合实际图表库）'}
    {type === 'pie' && '饼图将在这里渲染（需要整合实际图表库）'}
  </ChartContent>
);

// 添加品牌分析相关样式组件
const BrandAnalysisSection = styled.div`
  margin-bottom: 24px;
`;

const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`;

const BrandCard = styled.div`
  background-color: ${props => props.$isDark ? '#1C1C1E' : 'white'};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px ${props => props.$isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  border-left: 4px solid ${props => props.$color};
`;

const BrandName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  margin: 0 0 16px 0;
`;

const BrandStatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BrandStatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BrandStatLabel = styled.div`
  font-size: 14px;
  color: ${props => props.$isDark ? '#86868B' : '#86868B'};
`;

const BrandStatValue = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
`;

const EfficiencyBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  background-color: ${props => props.$high ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 59, 48, 0.1)'};
  color: ${props => props.$high ? '#34C759' : '#FF3B30'};
`;

// 在现有样式组件后添加效率瓶颈分析相关样式
const BottleneckSection = styled.div`
  margin-bottom: 24px;
`;

const BottleneckGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const BottleneckTable = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
`;

const BottleneckTableHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 2fr) 1fr 1fr 1fr;
  padding: 12px 16px;
  background-color: ${props => props.$isDark ? '#2C2C2E' : '#f5f5f7'};
  border-bottom: 1px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
  
  > div {
    font-size: 13px;
    font-weight: 600;
    color: ${props => props.$isDark ? '#AEAEB2' : '#86868B'};
  }
`;

const BottleneckTableRow = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 2fr) 1fr 1fr 1fr;
  padding: 12px 16px;
  border-bottom: 1px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
  background-color: ${props => props.$isDark ? '#1C1C1E' : 'white'};
  
  &:last-child {
    border-bottom: none;
  }
  
  > div {
    font-size: 14px;
    color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
    display: flex;
    align-items: center;
  }
`;

const DifferenceIndicator = styled.span`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => props.$negative ? 'rgba(255, 59, 48, 0.1)' : 'rgba(52, 199, 89, 0.1)'};
  color: ${props => props.$negative ? '#FF3B30' : '#34C759'};
  margin-left: 8px;
`;

const IssueCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: ${props => props.$isDark ? '#2C2C2E' : '#f8f8f8'};
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IssueInfo = styled.div`
  flex: 1;
`;

const IssueName = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  margin-bottom: 4px;
`;

const IssueSolution = styled.div`
  font-size: 13px;
  color: ${props => props.$isDark ? '#AEAEB2' : '#86868B'};
`;

const IssueImpact = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.$isDark ? '#1C1C1E' : 'white'};
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 1px 3px ${props => props.$isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
`;

// 添加经济效益分析相关样式
const EconomicSection = styled.div`
  margin-bottom: 24px;
`;

const ROICard = styled.div`
  background-color: ${props => props.$isDark ? '#1C1C1E' : 'white'};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px ${props => props.$isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  margin-bottom: 16px;
  text-align: center;
`;

const ROIValue = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #34C759;
  margin: 16px 0;
  display: flex;
  align-items: baseline;
  justify-content: center;
  
  span {
    font-size: 20px;
    margin-left: 4px;
  }
`;

const ROIDescription = styled.p`
  font-size: 16px;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
`;

const CostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`;

const CostCard = styled.div`
  background-color: ${props => props.$isDark ? '#1C1C1E' : 'white'};
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px ${props => props.$isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  display: flex;
  flex-direction: column;
`;

const CostCategory = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.$isDark ? '#AEAEB2' : '#86868B'};
  margin-bottom: 8px;
`;

const CostAmount = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.$isDark ? '#F5F5F7' : '#1D1D1F'};
  margin-bottom: 4px;
`;

const CostPercentage = styled.div`
  font-size: 14px;
  color: #34C759;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${props => props.$isDark ? '#2C2C2E' : '#F2F2F7'};
  border-radius: 3px;
  margin-top: 12px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.$percentage}%;
  background-color: #34C759;
  border-radius: 3px;
`;

const EfficiencyAnalytics = () => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';

  // 计算效率提升
  const calculateImprovement = () => {
    const { withoutTool, withTool } = mockEfficiencyData.comparativeData;
    const timeImprovement = ((withoutTool.avgTimePerImage - withTool.avgTimePerImage) / withoutTool.avgTimePerImage) * 100;
    const revisionImprovement = ((withoutTool.avgRevisionsPerImage - withTool.avgRevisionsPerImage) / withoutTool.avgRevisionsPerImage) * 100;
    
    return {
      time: timeImprovement.toFixed(0),
      revisions: revisionImprovement.toFixed(0)
    };
  };

  const improvements = calculateImprovement();

  // Page Header actions
  const headerActions = (
    <>
      <FilterButton $isDark={isDark}>
        <DateRangeIcon />
        最近30天
      </FilterButton>
      <FilterButton $isDark={isDark}>
        <FilterListIcon />
        筛选
      </FilterButton>
      <ExportButton $isDark={isDark}>
        <GetAppIcon />
        导出报告
      </ExportButton>
    </>
  );

  return (
    <Container $isDark={isDark}>
      <MainNavigation />

      <Content>
        <PageHeader 
          title="效率分析面板" 
          showBackButton={true}
          actions={headerActions}
        />

        <OverviewSection>
          <StatCard 
            $isDark={isDark}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatHeader>
              <StatIcon $color="#5856D6">
                <SpeedIcon />
              </StatIcon>
              <StatTitle $isDark={isDark}>平均每图制作时间</StatTitle>
            </StatHeader>
            <StatValue $isDark={isDark}>{mockEfficiencyData.overview.avgTimePerImage} 分钟</StatValue>
            <StatSubtext $positive $isDark={isDark}>
              比传统方式快 {improvements.time}%
            </StatSubtext>
          </StatCard>

          <StatCard 
            $isDark={isDark}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatHeader>
              <StatIcon $color="#FF9500">
                <EditIcon />
              </StatIcon>
              <StatTitle $isDark={isDark}>平均修改次数</StatTitle>
            </StatHeader>
            <StatValue $isDark={isDark}>{mockEfficiencyData.overview.avgRevisionsPerImage.toFixed(1)}</StatValue>
            <StatSubtext $positive $isDark={isDark}>
              比传统方式减少 {improvements.revisions}%
            </StatSubtext>
          </StatCard>

          <StatCard 
            $isDark={isDark}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatHeader>
              <StatIcon $color="#34C759">
                <AccessTimeIcon />
              </StatIcon>
              <StatTitle $isDark={isDark}>总节省时间</StatTitle>
            </StatHeader>
            <StatValue $isDark={isDark}>{(mockEfficiencyData.overview.totalTimeSaved / 60).toFixed(0)} 小时</StatValue>
            <StatSubtext $isDark={isDark}>
              共 {mockEfficiencyData.overview.totalImages} 张图
            </StatSubtext>
          </StatCard>

          <StatCard 
            $isDark={isDark}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatHeader>
              <StatIcon $color="#FF3B30">
                <ThumbUpAltIcon />
              </StatIcon>
              <StatTitle $isDark={isDark}>整体效率提升</StatTitle>
            </StatHeader>
            <StatValue $isDark={isDark}>{mockEfficiencyData.overview.efficiencyImprovement}%</StatValue>
            <StatSubtext $isDark={isDark}>
              累计 {mockEfficiencyData.overview.totalProjects} 个项目
            </StatSubtext>
          </StatCard>
        </OverviewSection>

        <ChartsSection>
          <ChartCard $isDark={isDark}>
            <ChartHeader>
              <ChartTitle $isDark={isDark}>设计时间趋势</ChartTitle>
            </ChartHeader>
            <Chart type="line" data={mockEfficiencyData.timeHistory} isDark={isDark} />
          </ChartCard>

          <ChartCard $isDark={isDark}>
            <ChartHeader>
              <ChartTitle $isDark={isDark}>设计工作时间分布</ChartTitle>
            </ChartHeader>
            <Chart type="pie" data={mockEfficiencyData.timeDistribution} isDark={isDark} />
          </ChartCard>
        </ChartsSection>

        <ProjectsSection>
          <SectionHeader>
            <SectionTitle $isDark={isDark}>最近项目效率</SectionTitle>
          </SectionHeader>
          <ProjectsGrid>
            {mockEfficiencyData.recentProjects.map(project => (
              <ProjectCard key={project.id} $isDark={isDark}>
                <ProjectHeader $isDark={isDark}>
                  <ProjectName $isDark={isDark}>{project.name}</ProjectName>
                </ProjectHeader>
                <ProjectStats>
                  <ProjectStatItem>
                    <ProjectStatLabel $isDark={isDark}>图像数量</ProjectStatLabel>
                    <ProjectStatValue $isDark={isDark}>{project.images}</ProjectStatValue>
                  </ProjectStatItem>
                  <ProjectStatItem>
                    <ProjectStatLabel $isDark={isDark}>平均制作时间</ProjectStatLabel>
                    <ProjectStatValue $isDark={isDark}>{project.avgTimePerImage}分钟</ProjectStatValue>
                  </ProjectStatItem>
                  <ProjectStatItem>
                    <ProjectStatLabel $isDark={isDark}>平均修改次数</ProjectStatLabel>
                    <ProjectStatValue $isDark={isDark}>{project.avgRevisions}</ProjectStatValue>
                  </ProjectStatItem>
                  <ProjectStatItem>
                    <ProjectStatLabel $isDark={isDark}>节省时间</ProjectStatLabel>
                    <ProjectStatValue $isDark={isDark}>{project.timeSavedPercentage}%</ProjectStatValue>
                  </ProjectStatItem>
                </ProjectStats>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </ProjectsSection>

        {/* 品牌效率分析 */}
        <BrandAnalysisSection>
          <SectionHeader>
            <SectionTitle $isDark={isDark}>品牌效率分析</SectionTitle>
          </SectionHeader>
          <BrandGrid>
            {mockEfficiencyData.brandAnalysis.brands.map((brand, index) => {
              // 为不同品牌分配不同颜色
              const brandColors = ['#5856D6', '#FF9500', '#34C759', '#FF2D55', '#007AFF'];
              const color = brandColors[index % brandColors.length];
              const isHighEfficiency = brand.efficiencyGain > 70;
              
              return (
                <BrandCard key={brand.name} $isDark={isDark} $color={color}>
                  <BrandName $isDark={isDark}>{brand.name}</BrandName>
                  <BrandStatsList>
                    <BrandStatItem>
                      <BrandStatLabel $isDark={isDark}>总图片数</BrandStatLabel>
                      <BrandStatValue $isDark={isDark}>{brand.totalImages}</BrandStatValue>
                    </BrandStatItem>
                    <BrandStatItem>
                      <BrandStatLabel $isDark={isDark}>项目数量</BrandStatLabel>
                      <BrandStatValue $isDark={isDark}>{brand.projectCount}</BrandStatValue>
                    </BrandStatItem>
                    <BrandStatItem>
                      <BrandStatLabel $isDark={isDark}>平均制作时间</BrandStatLabel>
                      <BrandStatValue $isDark={isDark}>{brand.avgTimePerImage}分钟</BrandStatValue>
                    </BrandStatItem>
                    <BrandStatItem>
                      <BrandStatLabel $isDark={isDark}>平均修改次数</BrandStatLabel>
                      <BrandStatValue $isDark={isDark}>{brand.avgRevisions.toFixed(1)}</BrandStatValue>
                    </BrandStatItem>
                    <BrandStatItem>
                      <BrandStatLabel $isDark={isDark}>效率提升</BrandStatLabel>
                      <EfficiencyBadge $high={isHighEfficiency}>
                        {brand.efficiencyGain}%
                      </EfficiencyBadge>
                    </BrandStatItem>
                  </BrandStatsList>
                </BrandCard>
              );
            })}
          </BrandGrid>
          <ChartCard $isDark={isDark}>
            <ChartHeader>
              <ChartTitle $isDark={isDark}>品牌效率对比</ChartTitle>
            </ChartHeader>
            <Chart type="bar" data={mockEfficiencyData.brandAnalysis.brands} isDark={isDark} />
          </ChartCard>
        </BrandAnalysisSection>

        {/* 效率瓶颈识别 */}
        <BottleneckSection>
          <SectionHeader>
            <SectionTitle $isDark={isDark}>效率瓶颈识别</SectionTitle>
          </SectionHeader>
          
          <BottleneckGrid>
            {/* 处理时间异常项目 */}
            <ChartCard $isDark={isDark}>
              <ChartHeader>
                <ChartTitle $isDark={isDark}>处理时间异常项目</ChartTitle>
              </ChartHeader>
              
              <BottleneckTable $isDark={isDark}>
                <BottleneckTableHeader $isDark={isDark}>
                  <div>项目名称</div>
                  <div>平均时间</div>
                  <div>行业平均</div>
                  <div>差异</div>
                </BottleneckTableHeader>
                
                {mockEfficiencyData.efficiencyBottlenecks.slowestProjects.map(project => (
                  <BottleneckTableRow key={project.name} $isDark={isDark}>
                    <div>{project.name}</div>
                    <div>{project.avgTime}分钟</div>
                    <div>{project.avgIndustry}分钟</div>
                    <div>
                      +{project.difference}%
                      <DifferenceIndicator $negative>
                        高于平均
                      </DifferenceIndicator>
                    </div>
                  </BottleneckTableRow>
                ))}
              </BottleneckTable>
            </ChartCard>
            
            {/* 修改次数异常项目 */}
            <ChartCard $isDark={isDark}>
              <ChartHeader>
                <ChartTitle $isDark={isDark}>修改次数异常项目</ChartTitle>
              </ChartHeader>
              
              <BottleneckTable $isDark={isDark}>
                <BottleneckTableHeader $isDark={isDark}>
                  <div>项目名称</div>
                  <div>修改次数</div>
                  <div>行业平均</div>
                  <div>差异</div>
                </BottleneckTableHeader>
                
                {mockEfficiencyData.efficiencyBottlenecks.highRevisionProjects.map(project => (
                  <BottleneckTableRow key={project.name} $isDark={isDark}>
                    <div>{project.name}</div>
                    <div>{project.revisionCount}次</div>
                    <div>{project.avgIndustry}次</div>
                    <div>
                      +{project.difference}%
                      <DifferenceIndicator $negative>
                        高于平均
                      </DifferenceIndicator>
                    </div>
                  </BottleneckTableRow>
                ))}
              </BottleneckTable>
            </ChartCard>
          </BottleneckGrid>
          
          {/* 关键问题分析 */}
          <ChartCard $isDark={isDark}>
            <ChartHeader>
              <ChartTitle $isDark={isDark}>关键效率问题与解决方案</ChartTitle>
            </ChartHeader>
            
            <div style={{ padding: '12px 0' }}>
              {mockEfficiencyData.efficiencyBottlenecks.keyIssues.map(issue => (
                <IssueCard key={issue.issue} $isDark={isDark}>
                  <IssueInfo>
                    <IssueName $isDark={isDark}>{issue.issue}</IssueName>
                    <IssueSolution $isDark={isDark}>解决方案: {issue.solution}</IssueSolution>
                  </IssueInfo>
                  <IssueImpact $isDark={isDark}>
                    {issue.impactPercentage}%
                  </IssueImpact>
                </IssueCard>
              ))}
            </div>
          </ChartCard>
        </BottleneckSection>

        <ComparisonSection $isDark={isDark}>
          <ComparisonTitle $isDark={isDark}>工作效率对比</ComparisonTitle>
          <ComparisonGrid>
            <ComparisonCard $isDark={isDark}>
              <ComparisonHeader>
                <ComparisonIcon>
                  <SettingsIcon />
                </ComparisonIcon>
                <ComparisonLabel $isDark={isDark}>传统设计流程</ComparisonLabel>
              </ComparisonHeader>
              <ComparisonStats>
                <ComparisonStatItem>
                  <ComparisonStatLabel $isDark={isDark}>平均每图时间</ComparisonStatLabel>
                  <ComparisonStatValue $withTool={false}>
                    {mockEfficiencyData.comparativeData.withoutTool.avgTimePerImage}分钟
                  </ComparisonStatValue>
                </ComparisonStatItem>
                <ComparisonStatItem>
                  <ComparisonStatLabel $isDark={isDark}>平均修改次数</ComparisonStatLabel>
                  <ComparisonStatValue $withTool={false}>
                    {mockEfficiencyData.comparativeData.withoutTool.avgRevisionsPerImage.toFixed(1)}次
                  </ComparisonStatValue>
                </ComparisonStatItem>
              </ComparisonStats>
            </ComparisonCard>

            <ComparisonCard $withTool $isDark={isDark}>
              <ComparisonHeader>
                <ComparisonIcon $withTool>
                  <SpeedIcon />
                </ComparisonIcon>
                <ComparisonLabel $isDark={isDark}>使用CreativePro Studio</ComparisonLabel>
              </ComparisonHeader>
              <ComparisonStats>
                <ComparisonStatItem>
                  <ComparisonStatLabel $isDark={isDark}>平均每图时间</ComparisonStatLabel>
                  <ComparisonStatValue $withTool>
                    {mockEfficiencyData.comparativeData.withTool.avgTimePerImage}分钟
                  </ComparisonStatValue>
                </ComparisonStatItem>
                <ComparisonStatItem>
                  <ComparisonStatLabel $isDark={isDark}>平均修改次数</ComparisonStatLabel>
                  <ComparisonStatValue $withTool>
                    {mockEfficiencyData.comparativeData.withTool.avgRevisionsPerImage.toFixed(1)}次
                  </ComparisonStatValue>
                </ComparisonStatItem>
              </ComparisonStats>
            </ComparisonCard>
          </ComparisonGrid>
        </ComparisonSection>

        {/* 经济效益分析 */}
        <EconomicSection>
          <SectionHeader>
            <SectionTitle $isDark={isDark}>经济效益分析</SectionTitle>
          </SectionHeader>
          
          <ROICard $isDark={isDark}>
            <ChartTitle $isDark={isDark}>投资回报率 (ROI)</ChartTitle>
            <ROIValue>{mockEfficiencyData.economicBenefits.roi}<span>%</span></ROIValue>
            <ROIDescription $isDark={isDark}>
              CreativePro Studio的实施产生了显著的经济收益，年度节省成本约{(mockEfficiencyData.economicBenefits.yearlySavings/10000).toFixed(1)}万元。投资回报率达到{mockEfficiencyData.economicBenefits.roi}%，体现了工具对提高设计团队生产力的巨大价值。
            </ROIDescription>
          </ROICard>
          
          <CostGrid>
            {mockEfficiencyData.economicBenefits.costBreakdown.map(item => (
              <CostCard key={item.category} $isDark={isDark}>
                <CostCategory $isDark={isDark}>{item.category}</CostCategory>
                <CostAmount $isDark={isDark}>{item.saving.toLocaleString()}元</CostAmount>
                <CostPercentage>节省占比 {item.percentage}%</CostPercentage>
                <ProgressBar $isDark={isDark}>
                  <ProgressFill $percentage={item.percentage} />
                </ProgressBar>
              </CostCard>
            ))}
          </CostGrid>
          
          <BottleneckGrid>
            <ChartCard $isDark={isDark}>
              <ChartHeader>
                <ChartTitle $isDark={isDark}>月度节省时间与成本</ChartTitle>
              </ChartHeader>
              <Chart type="line" data={mockEfficiencyData.economicBenefits.monthlyTrend} isDark={isDark} />
            </ChartCard>
            
            <ChartCard $isDark={isDark}>
              <ChartHeader>
                <ChartTitle $isDark={isDark}>核心指标提升</ChartTitle>
              </ChartHeader>
              <div style={{ padding: '24px 16px', height: '252px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ fontSize: '14px', color: isDark ? '#F5F5F7' : '#1D1D1F' }}>资源利用率</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#34C759' }}>{mockEfficiencyData.economicBenefits.resourceUtilization}%</div>
                  </div>
                  <ProgressBar $isDark={isDark}>
                    <ProgressFill $percentage={mockEfficiencyData.economicBenefits.resourceUtilization} />
                  </ProgressBar>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ fontSize: '14px', color: isDark ? '#F5F5F7' : '#1D1D1F' }}>品质提升</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#34C759' }}>{mockEfficiencyData.economicBenefits.qualityImprovement}%</div>
                  </div>
                  <ProgressBar $isDark={isDark}>
                    <ProgressFill $percentage={mockEfficiencyData.economicBenefits.qualityImprovement} />
                  </ProgressBar>
                </div>
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ fontSize: '14px', color: isDark ? '#F5F5F7' : '#1D1D1F' }}>生产力提升</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#34C759' }}>{mockEfficiencyData.economicBenefits.productivityIncrease}%</div>
                  </div>
                  <ProgressBar $isDark={isDark}>
                    <ProgressFill $percentage={mockEfficiencyData.economicBenefits.productivityIncrease} />
                  </ProgressBar>
                </div>
              </div>
            </ChartCard>
          </BottleneckGrid>
        </EconomicSection>

        <ConclusionCard $isDark={isDark}>
          <ConclusionTitle $isDark={isDark}>效率分析结论</ConclusionTitle>
          <ConclusionText $isDark={isDark}>
            通过使用CreativePro Studio，设计团队实现了多方面的显著提效：
            <br /><br />
            1. <strong>时间效率提升</strong>：平均每张图的制作时间从{mockEfficiencyData.comparativeData.withoutTool.avgTimePerImage}分钟降低到{mockEfficiencyData.comparativeData.withTool.avgTimePerImage}分钟，提效{improvements.time}%。
            <br /><br />
            2. <strong>质量提升</strong>：平均修改次数从{mockEfficiencyData.comparativeData.withoutTool.avgRevisionsPerImage.toFixed(1)}次减少到{mockEfficiencyData.comparativeData.withTool.avgRevisionsPerImage.toFixed(1)}次，提效{improvements.revisions}%，大幅减少返工并提高一次通过率。
            <br /><br />
            3. <strong>品牌效率差异</strong>："欧莱雅"品牌展现最高效率({mockEfficiencyData.brandAnalysis.brands[2].efficiencyGain}%)，而"资生堂"品牌效率相对较低({mockEfficiencyData.brandAnalysis.brands[3].efficiencyGain}%)，应重点研究其工作方式差异。
            <br /><br />
            4. <strong>关键瓶颈</strong>："素材准备不充分"是影响效率的首要因素(占{mockEfficiencyData.efficiencyBottlenecks.keyIssues[0].impactPercentage}%)，建议针对性采取改进措施。
            <br /><br />
            5. <strong>经济收益</strong>：年度节省成本约{(mockEfficiencyData.economicBenefits.yearlySavings/10000).toFixed(1)}万元，投资回报率达{mockEfficiencyData.economicBenefits.roi}%，实现了显著的经济效益。
            <br /><br />
            综合分析表明，CreativePro Studio不仅大幅提高了设计效率、降低了修改频次，还创造了可量化的经济价值。建议在现有基础上进一步扩大工具应用范围，并针对识别出的效率瓶颈制定针对性改进策略。
          </ConclusionText>
        </ConclusionCard>
      </Content>
    </Container>
  );
};

export default EfficiencyAnalytics; 