import React from 'react';
import styled from '@emotion/styled';
import colors from '../design-system/tokens/colors';
import spacing from '../design-system/tokens/spacing';
import typography from '../design-system/tokens/typography';
import Navigation from '../design-system/components/Navigation';
import { navigationItems } from '../data/sampleData';

// 页面容器样式
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    150deg,
    ${colors.gray[50]} 0%,
    ${colors.gray[100]} 100%
  );
  display: flex;
  flex-direction: column;
`;

// 主内容区
const MainContent = styled.main`
  padding: ${spacing.space[6]};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

// 页面标题
const PageTitle = styled.h1`
  color: ${colors.ui.text.primary.light};
  font-size: ${typography.fontSize.largeTitle};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing.space[4]};
  font-family: ${typography.fontFamily.display};
`;

// 页面副标题
const PageSubtitle = styled.p`
  color: ${colors.ui.text.secondary.light};
  font-size: ${typography.fontSize.body};
  max-width: 800px;
  margin-bottom: ${spacing.space[6]};
  line-height: ${typography.lineHeight.relaxed};
`;

// 内容区卡片
const ContentCard = styled.div`
  background-color: white;
  border-radius: ${spacing.borderRadius.lg};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: ${spacing.space[6]};
  margin-bottom: ${spacing.space[6]};
`;

// 卡片组件
const FeatureCard = styled.div`
  background-color: ${props => props.highlighted ? '#FFF9E6' : 'white'};
  border: 1px solid ${props => props.highlighted ? '#FFD980' : colors.gray[200]};
  border-radius: ${spacing.borderRadius.md};
  padding: ${spacing.space[4]};
  margin-bottom: ${spacing.space[4]};
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const FeatureIcon = styled.span`
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${props => props.color || colors.primary.light};
  color: white;
  font-weight: ${typography.fontWeight.semibold};
  text-align: center;
  line-height: 28px;
  margin-right: ${spacing.space[2]};
`;

const FeatureTitle = styled.h3`
  font-size: ${typography.fontSize.title3};
  color: ${colors.ui.text.primary.light};
  margin: ${spacing.space[2]} 0;
  display: flex;
  align-items: center;
`;

const FeatureDescription = styled.p`
  margin-left: 36px;
  color: ${colors.ui.text.secondary.light};
  font-size: ${typography.fontSize.body};
  line-height: ${typography.lineHeight.relaxed};
  margin-top: ${spacing.space[2]};
`;

const SectionTitle = styled.h2`
  font-size: ${typography.fontSize.title2};
  color: ${colors.ui.text.primary.light};
  margin: ${spacing.space[6]} 0 ${spacing.space[4]};
  font-weight: ${typography.fontWeight.semibold};
  font-family: ${typography.fontFamily.display};
`;

const RequirementsContainer = styled.div`
  border: 1px solid ${colors.gray[200]};
  border-radius: ${spacing.borderRadius.md};
  padding: ${spacing.space[4]};
  margin-top: ${spacing.space[4]};
`;

const RequirementsSection = styled.div`
  margin-bottom: ${spacing.space[4]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const RequirementsSectionTitle = styled.h4`
  font-size: ${typography.fontSize.headline};
  color: ${colors.ui.text.primary.light};
  margin-bottom: ${spacing.space[2]};
  font-weight: ${typography.fontWeight.semibold};
`;

const RequirementsContent = styled.div`
  background-color: ${colors.gray[100]};
  border-radius: ${spacing.borderRadius.sm};
  padding: ${spacing.space[3]};
  color: ${colors.gray[800]};
  font-size: ${typography.fontSize.subheadline};
`;

const Footer = styled.footer`
  background-color: white;
  padding: ${spacing.space[4]};
  text-align: center;
  border-top: 1px solid ${colors.ui.border.light};
  margin-top: auto;
  
  p {
    color: ${colors.ui.text.secondary.light};
    font-size: ${typography.fontSize.footnote};
  }
`;

// 表格样式
const TableContainer = styled.div`
  overflow-x: auto;
  margin: ${spacing.space[4]} 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${typography.fontSize.footnote};
`;

const TableHeader = styled.th`
  background-color: ${colors.gray[100]};
  padding: ${spacing.space[2]} ${spacing.space[3]};
  text-align: left;
  font-weight: ${typography.fontWeight.semibold};
  border: 1px solid ${colors.gray[200]};
`;

const TableCell = styled.td`
  padding: ${spacing.space[2]} ${spacing.space[3]};
  border: 1px solid ${colors.gray[200]};
`;

const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: ${colors.gray[50]};
  }
  
  &:hover {
    background-color: ${colors.gray[100]};
  }
`;

// 图片展示组件
const ImageContainer = styled.div`
  margin: ${spacing.space[4]} 0;
  border-radius: ${spacing.borderRadius.md};
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ImageCaption = styled.div`
  background-color: ${colors.gray[100]};
  padding: ${spacing.space[2]} ${spacing.space[3]};
  font-size: ${typography.fontSize.footnote};
  color: ${colors.gray[600]};
  text-align: center;
`;

// 并排图片展示
const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${spacing.space[4]};
  margin: ${spacing.space[4]} 0;
`;

// 特性横幅
const FeatureBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #FFE5E0 0%, #F5E1D9 100%);
  border-radius: ${spacing.borderRadius.lg};
  padding: ${spacing.space[6]};
  margin: ${spacing.space[4]} 0;
  text-align: center;
  color: ${colors.ui.text.primary.light};
  
  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
  }
`;

const BannerContent = styled.div`
  flex: 1;
  
  h3 {
    font-size: ${typography.fontSize.title2};
    margin-bottom: ${spacing.space[3]};
    font-weight: ${typography.fontWeight.bold};
  }
  
  p {
    font-size: ${typography.fontSize.body};
    line-height: ${typography.lineHeight.relaxed};
    margin-bottom: ${spacing.space[4]};
  }
  
  @media (min-width: 768px) {
    padding-right: ${spacing.space[6]};
  }
`;

const BannerImage = styled.div`
  flex: 1;
  max-width: 100%;
  
  img {
    width: 100%;
    height: auto;
    border-radius: ${spacing.borderRadius.md};
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: 767px) {
    margin-top: ${spacing.space[4]};
  }
`;

function ProductRequirementsDoc() {
  // 核心价值主张
  const coreValues = [
    {
      number: 1,
      title: '提高设计效率',
      description: '80%时间节省，将2-3小时的工作缩短至10分钟',
      color: '#FF9500', // Orange
    },
    {
      number: 2,
      title: '确保设计一致性',
      description: '95%的品牌视觉一致性提升',
      color: '#5856D6', // Indigo
    },
    {
      number: 3,
      title: '简化复杂工作',
      description: '使非设计人员也能完成90%的日常视觉任务',
      color: '#32D74B', // Green
    },
    {
      number: 4,
      title: '促进团队协作',
      description: '统一资源与标准，提高内容产出速度300%',
      color: '#007AFF', // Blue
    },
  ];
  
  // 优先级矩阵数据 - 调整为2个月紧急开发计划
  const priorityMatrix = [
    { module: '批量处理系统', importance: '高', urgency: '高', priority: 'P0' },
    { module: '母版模板系统', importance: '高', urgency: '高', priority: 'P0' },
    { module: '批量导出功能', importance: '高', urgency: '高', priority: 'P0' },
    { module: '精确画布控制', importance: '高', urgency: '中', priority: 'P1' },
    { module: '素材库基础功能', importance: '中', urgency: '高', priority: 'P1' },
    { module: '协作与权限', importance: '低', urgency: '低', priority: 'P2' },
  ];

  return (
    <PageContainer>
      <Navigation 
        title="CreativePro Studio"
        items={navigationItems}
        blurred
        bordered
        sticky
      />
      <MainContent>
        <PageTitle>CreativePro Studio 产品需求文档</PageTitle>
        <PageSubtitle>
          为且初(KIMTRUE)美妆电商团队量身打造的视觉内容创作平台，旨在重塑美妆产品图片的制作流程，将复杂的设计工作简化为直观的操作。
        </PageSubtitle>
        
        {/* 产品愿景展示横幅 */}
        <FeatureBanner>
          <BannerContent>
            <h3>产品愿景</h3>
            <p>
              CreativePro Studio 重塑美妆产品图片的制作流程，将复杂的设计工作简化为直观的操作，使每位团队成员都能创建专业级电商视觉内容。正如且初产品以简约配方传递高效护肤理念，CreativePro Studio以简约界面提供强大功能，成为品牌视觉表达的忠实助手。
            </p>
          </BannerContent>
          <BannerImage>
            <img src="https://via.placeholder.com/600x400/F5E1D9/1D1D1F?text=CreativePro+Studio" alt="产品愿景" />
          </BannerImage>
        </FeatureBanner>
        
        <ContentCard>
          <SectionTitle>产品核心价值主张</SectionTitle>
          
          {coreValues.map((value) => (
            <FeatureCard key={value.number} highlighted={value.number === 1 || value.number === 4}>
              <FeatureTitle>
                <FeatureIcon color={value.color}>{value.number}</FeatureIcon>
                {value.title}
              </FeatureTitle>
              <FeatureDescription>{value.description}</FeatureDescription>
            </FeatureCard>
          ))}
          
          <ImageContainer>
            <StyledImage 
              src="https://via.placeholder.com/1200x600/F9FAFB/1D1D1F?text=效率对比图表" 
              alt="产品效率对比图表" 
            />
            <ImageCaption>图1: CreativePro Studio设计效率提升对比图</ImageCaption>
          </ImageContainer>
        </ContentCard>
        
        <ContentCard>
          <SectionTitle>核心功能概览</SectionTitle>
          
          <RequirementsContainer>
            <RequirementsSection>
              <RequirementsSectionTitle>1. 专业级画布系统</RequirementsSectionTitle>
              <RequirementsContent>
                精确尺寸设置、网格与参考线、智能辅助对齐系统，提供像素级精准控制，支持800×800px等常用规格，电商平台预设。画布支持背景属性设置，可灵活更换单张图片背景；支持促销机制属性（如"买2赠3"、"买1送200毫升"等），单张编辑时可快速修改或更换促销机制。
              </RequirementsContent>
            </RequirementsSection>
            
            <RequirementsSection>
              <RequirementsSectionTitle>2. 批量处理系统</RequirementsSectionTitle>
              <RequirementsContent>
                项目批量管理、母版模板系统、批量元素处理、批量导出系统，支持一次创建多达100个项目，让主模板更新自动应用到所有子项目。特别支持批量背景更换功能，保持产品位置不变；支持批量促销机制管理，包括批量添加新机制、批量替换（如"买2赠3"→"买2赠4"），并可在项目中同时管理多个促销机制。
              </RequirementsContent>
            </RequirementsSection>
            
            <RequirementsSection>
              <RequirementsSectionTitle>3. 素材库系统</RequirementsSectionTitle>
              <RequirementsContent>
                多媒体资源管理、智能分类系统、素材快速应用，包含产品图库、促销元素库、背景素材库和品牌资产库，支持拖放使用和批量应用。
              </RequirementsContent>
            </RequirementsSection>
            
            <RequirementsSection>
              <RequirementsSectionTitle>4. AI辅助功能</RequirementsSectionTitle>
              <RequirementsContent>
                智能识别与优化，包括产品识别、背景移除、图像增强；内容生成功能，提供布局建议、元素推荐和样式建议。
              </RequirementsContent>
            </RequirementsSection>
            
            <RequirementsSection>
              <RequirementsSectionTitle>5. 协作与工作流</RequirementsSectionTitle>
              <RequirementsContent>
                多角色权限控制、版本历史管理、团队协作功能，支持自动保存和版本回滚，为不同角色提供差异化权限。
              </RequirementsContent>
            </RequirementsSection>
          </RequirementsContainer>
          
          {/* 功能截图网格 */}
          <ImageGrid>
            <ImageContainer>
              <StyledImage 
                src="https://via.placeholder.com/600x400/F5E1D9/1D1D1F?text=画布系统截图" 
                alt="画布系统截图" 
              />
              <ImageCaption>专业级画布系统 - 支持背景和促销机制单张编辑</ImageCaption>
            </ImageContainer>
            
            <ImageContainer>
              <StyledImage 
                src="https://via.placeholder.com/600x400/FFB5C5/1D1D1F?text=批量处理截图" 
                alt="批量处理截图" 
              />
              <ImageCaption>批量处理系统 - 支持批量背景替换和促销机制更新</ImageCaption>
            </ImageContainer>
            
            <ImageContainer>
              <StyledImage 
                src="https://via.placeholder.com/600x400/B6E5D8/1D1D1F?text=素材库截图" 
                alt="素材库截图" 
              />
              <ImageCaption>素材库系统</ImageCaption>
            </ImageContainer>
          </ImageGrid>
        </ContentCard>
        
        <ContentCard>
          <SectionTitle>用户界面设计风格</SectionTitle>
          <p>采用多巴胺色系设计体系，提供专业且愉悦的使用体验。</p>
          
          <RequirementsContent>
            <strong>主要颜色：</strong><br/>
            - 品牌橙色 #F5E1D9 (活力橙) - 主要操作、强调按钮<br/>
            - 品牌粉色 #FFB5C5 (清新粉) - 次要强调<br/>
            - 薄荷绿 #B6E5D8 - 成功状态<br/>
            - 天空蓝 #97C1FF - 信息提示<br/>
            - 柔和紫 #D5B3FF - 特殊状态<br/>
            - 奶油黄 #FFE599 - 警告提示<br/><br/>
            
            <strong>字体系统：</strong><br/>
            - 字体家族: SF Pro Display/Text (系统默认)<br/>
            - 大小系统: 从12px到24px的完整系列<br/><br/>
            
            <strong>交互设计：</strong><br/>
            - 直接操作原则：所有元素支持拖拽、点击等直接操作<br/>
            - 即时反馈：所有操作提供即时视觉反馈<br/>
            - 优雅的过渡动效：简短、明确、有目的，不干扰工作流
          </RequirementsContent>
          
          {/* 设计样式展示 */}
          <ImageContainer>
            <StyledImage 
              src="https://via.placeholder.com/1200x600/F9FAFB/1D1D1F?text=UI设计系统展示" 
              alt="UI设计系统展示" 
            />
            <ImageCaption>图2: CreativePro Studio UI设计系统</ImageCaption>
          </ImageContainer>
        </ContentCard>
        
        <ContentCard>
          <SectionTitle>用户场景展示</SectionTitle>
          
          <ImageContainer>
            <StyledImage 
              src="https://via.placeholder.com/1200x600/F5E1D9/1D1D1F?text=618活动批量更新" 
              alt="场景展示: 618活动批量更新" 
            />
            <ImageCaption>场景一: 618活动批量更新 - 设计师在半天内完成100个SKU的活动详情页更新</ImageCaption>
          </ImageContainer>
          
          <RequirementsContent>
            <strong>场景一：618活动批量更新</strong><br/>
            <strong>用户角色:</strong> 设计师<br/>
            <strong>背景:</strong> 需要为且初土豆泥卸妆膏系列100个SKU更新618活动详情页<br/><br/>
            
            <strong>详细流程:</strong><br/>
            1. 创建新项目组"618土豆泥活动"，设置画布尺寸800×800px<br/>
            2. 批量导入100个SKU信息和产品图<br/>
            3. 设计一个主模板，包含活动背景、促销标签位置和样式<br/>
            4. 应用主模板到所有子项目<br/>
            5. 自动匹配每个SKU的专属信息<br/>
            6. 批量检查所有设计<br/>
            7. 一键导出所有项目，按命名规则自动命名<br/><br/>
            
            <strong>成功指标:</strong><br/> 
            - 从传统3-4天工作量减少到半天内完成<br/>
            - 所有图片视觉风格100%一致<br/>
            - 每个SKU的专属信息正确无误
          </RequirementsContent>
          
          <ImageContainer>
            <StyledImage 
              src="https://via.placeholder.com/1200x600/B6E5D8/1D1D1F?text=促销机制批量变更" 
              alt="场景展示: 促销机制批量变更" 
            />
            <ImageCaption>场景二: 促销机制批量变更 - 运营人员15分钟内完成全部促销信息更新</ImageCaption>
          </ImageContainer>
          
          <RequirementsContent>
            <strong>场景二：促销策略变更</strong><br/>
            <strong>用户角色:</strong> 运营人员<br/>
            <strong>背景:</strong> 临时调整促销策略，需要将"买2赠3"改为"买2赠4"<br/><br/>
            
            <strong>详细流程:</strong><br/>
            1. 打开项目组"618土豆泥活动"<br/>
            2. 进入批量替换功能<br/>
            3. 搜索"买2赠3"促销机制<br/>
            4. 替换为"买2赠4"新机制<br/>
            5. 预览变更效果<br/>
            6. 确认并应用到所有相关项目<br/>
            7. 批量导出更新后的图片<br/><br/>
            
            <strong>成功指标:</strong><br/> 
            - 15分钟内完成全部促销机制更新<br/>
            - 确保所有替换准确无误<br/>
            - 保持设计的其他元素不受影响
          </RequirementsContent>
          
          <ImageContainer>
            <StyledImage 
              src="https://via.placeholder.com/1200x600/97C1FF/1D1D1F?text=节日背景批量更换" 
              alt="场景展示: 节日背景批量更换" 
            />
            <ImageCaption>场景三: 节日背景批量更换 - 保持产品位置不变，30分钟内完成更新</ImageCaption>
          </ImageContainer>
          
          <RequirementsContent>
            <strong>场景三：节日背景更新</strong><br/>
            <strong>用户角色:</strong> 设计师<br/>
            <strong>背景:</strong> 需要为所有产品图更换节日主题背景<br/><br/>
            
            <strong>详细流程:</strong><br/>
            1. 打开项目组<br/>
            2. 进入批量背景替换功能<br/>
            3. 从素材库选择新的节日背景<br/>
            4. 系统自动识别产品，保持位置不变<br/>
            5. 预览效果，调整背景参数<br/>
            6. 应用到所有选定项目<br/>
            7. 导出更新后的图片<br/><br/>
            
            <strong>成功指标:</strong><br/> 
            - 保持产品图位置和大小不变<br/>
            - 新背景与产品自然融合<br/>
            - 30分钟内完成全部更新
          </RequirementsContent>
        </ContentCard>
        
        <ContentCard>
          <SectionTitle>优先级与开发里程碑</SectionTitle>
          
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>功能模块</TableHeader>
                  <TableHeader>重要性</TableHeader>
                  <TableHeader>紧急性</TableHeader>
                  <TableHeader>综合优先级</TableHeader>
                </tr>
              </thead>
              <tbody>
                {priorityMatrix.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.module}</TableCell>
                    <TableCell>{item.importance}</TableCell>
                    <TableCell>{item.urgency}</TableCell>
                    <TableCell>{item.priority}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
          
          <ImageContainer>
            <StyledImage 
              src="https://via.placeholder.com/1200x600/F9FAFB/1D1D1F?text=加速开发路线图(2个月)" 
              alt="开发路线图" 
            />
            <ImageCaption>图3: CreativePro Studio 2个月加速开发路线图</ImageCaption>
          </ImageContainer>
          
          <RequirementsContainer>
            <RequirementsSection>
              <RequirementsSectionTitle>里程碑1：核心功能（3周）</RequirementsSectionTitle>
              <RequirementsContent>
                - 批量处理系统开发（P0）<br/>
                - 母版模板系统实现（P0）<br/>
                - 批量导出功能（P0）<br/>
                - 基础画布控制<br/>
                - 背景和促销机制属性设置及批量处理功能
              </RequirementsContent>
            </RequirementsSection>
            
            <RequirementsSection>
              <RequirementsSectionTitle>里程碑2：必要功能（3周）</RequirementsSectionTitle>
              <RequirementsContent>
                - 精确元素控制优化（P1）<br/>
                - 素材库基础功能（P1）<br/>
                - 基础图层管理<br/>
                - UI/UX优化<br/>
                - 性能测试与优化
              </RequirementsContent>
            </RequirementsSection>
            
            <RequirementsSection>
              <RequirementsSectionTitle>里程碑3：后续迭代计划（上线后）</RequirementsSectionTitle>
              <RequirementsContent>
                - AI辅助功能<br/>
                - 高级协作与权限系统<br/>
                - 版本历史管理<br/>
                - 与外部系统集成<br/>
                - 功能扩展与优化
              </RequirementsContent>
            </RequirementsSection>
          </RequirementsContainer>
          
          {/* 添加快速实施说明 */}
          <FeatureBanner>
            <BannerContent>
              <h3>快速实施策略</h3>
              <p>
                为满足2个月内完成开发的需求，我们采用了以下加速策略：<br/>
                • 优先实现批量处理核心功能，确保主要痛点快速解决<br/>
                • 精简第一版功能，聚焦必要性高的模块<br/>
                • 增加开发资源，采用并行开发模式<br/>
                • 简化UI设计，先保证功能可用，后续迭代优化体验<br/>
                • 阶段性验收，确保每周有可交付成果
              </p>
            </BannerContent>
            <BannerImage>
              <img src="https://via.placeholder.com/600x400/F5E1D9/1D1D1F?text=快速实施策略" alt="快速实施策略" />
            </BannerImage>
          </FeatureBanner>
        </ContentCard>
      </MainContent>
      <Footer>
        <p>© domiyoung__. 保留所有权利。</p>
      </Footer>
    </PageContainer>
  );
}

export default ProductRequirementsDoc; 