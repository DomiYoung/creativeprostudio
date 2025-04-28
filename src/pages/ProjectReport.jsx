import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, faUser, faCodeBranch, faChartLine, 
  faLightbulb, faCheck, faExclamationTriangle, faRocket
} from '@fortawesome/free-solid-svg-icons';
import DocumentLayout from '../components/DocumentLayout';
import '../styles/DocumentPage.css';

const ProjectReport = () => {
  // 准备元数据组件
  const metadataContent = (
    <>
      <div className="metadata-item">
        <FontAwesomeIcon icon={faCalendarAlt} />
        <span>汇报日期：2025-06-20</span>
      </div>
      <div className="metadata-item">
        <FontAwesomeIcon icon={faUser} />
        <span>汇报人：产品设计团队</span>
      </div>
      <div className="metadata-item">
        <FontAwesomeIcon icon={faCodeBranch} />
        <span>版本：V1.0</span>
      </div>
    </>
  );

  return (
    <DocumentLayout 
      title="CreativePro Studio 项目进展汇报" 
      subtitle="AI赋能内容创作平台产品开发与设计进展" 
      metadata={metadataContent}
    >
      <nav className="toc">
        <h2 className="toc-title">目录</h2>
        <ul className="toc-list">
          <li className="toc-item">
            <a href="#summary" className="toc-link">
              <FontAwesomeIcon icon={faChartLine} />
              <span>1. 项目概述与进展</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#achievements" className="toc-link">
              <FontAwesomeIcon icon={faCheck} />
              <span>2. 主要成果与里程碑</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#challenges" className="toc-link">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <span>3. 挑战与解决方案</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#next-steps" className="toc-link">
              <FontAwesomeIcon icon={faRocket} />
              <span>4. 下一阶段计划</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#conclusions" className="toc-link">
              <FontAwesomeIcon icon={faLightbulb} />
              <span>5. 结论与建议</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <section id="summary" className="section">
        <h2 className="section-title">1. 项目概述与进展</h2>
        <p>CreativePro Studio是一个AI赋能的内容创作平台，旨在提供一站式设计与内容生产解决方案。本报告总结第一季度的开发进展，重点关注设计系统的建立与完善。</p>
        
        <div className="subsection">
          <h3 className="subsection-title">1.1 项目关键指标</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>指标</th>
                  <th>计划</th>
                  <th>实际</th>
                  <th>完成率</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>核心功能模块</td>
                  <td>6个</td>
                  <td>5个</td>
                  <td>83%</td>
                </tr>
                <tr>
                  <td>设计规范文档</td>
                  <td>4份</td>
                  <td>5份</td>
                  <td>125%</td>
                </tr>
                <tr>
                  <td>组件库开发</td>
                  <td>40个组件</td>
                  <td>35个组件</td>
                  <td>88%</td>
                </tr>
                <tr>
                  <td>测试覆盖率</td>
                  <td>80%</td>
                  <td>85%</td>
                  <td>106%</td>
                </tr>
                <tr>
                  <td>开发迭代</td>
                  <td>6次</td>
                  <td>6次</td>
                  <td>100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">1.2 总体进度</h3>
          <p>项目整体完成度达到90%，按既定计划推进，预计7月底完成全部功能开发和测试。</p>
          
          <div className="progress-container">
            <div className="progress-bar" style={{width: "90%"}}>90%</div>
          </div>
        </div>
      </section>
      
      <section id="achievements" className="section">
        <h2 className="section-title">2. 主要成果与里程碑</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">2.1 设计系统建设</h3>
          <p>完成了完整的设计系统框架建设，包括五大核心文档：</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>文档名称</th>
                  <th>主要内容</th>
                  <th>受益对象</th>
                  <th>完成时间</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>UI设计规范</td>
                  <td>色彩、排版、组件设计规范</td>
                  <td>设计师、前端开发</td>
                  <td>2025-04-30</td>
                </tr>
                <tr>
                  <td>交互设计规范</td>
                  <td>手势交互、动效、反馈机制</td>
                  <td>交互设计师、前端开发</td>
                  <td>2025-05-28</td>
                </tr>
                <tr>
                  <td>API规范</td>
                  <td>接口定义、认证机制、错误处理</td>
                  <td>前后端开发</td>
                  <td>2025-05-10</td>
                </tr>
                <tr>
                  <td>数据库设计</td>
                  <td>数据模型、表结构、查询优化</td>
                  <td>后端开发</td>
                  <td>2025-04-27</td>
                </tr>
                <tr>
                  <td>项目蓝图</td>
                  <td>系统架构、业务流程、技术选型</td>
                  <td>所有团队成员</td>
                  <td>2025-04-15</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="note">
            <div className="note-title">
              <FontAwesomeIcon icon={faLightbulb} />
              <span>成果亮点</span>
            </div>
            <p>设计系统文档的完整性超出预期，特别是交互设计规范的深度和广度得到了团队一致好评，显著提高了产品开发效率和设计一致性。</p>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">2.2 功能模块实现</h3>
          <p>完成了5个核心功能模块的开发：</p>
          <ul>
            <li><strong>画布编辑器</strong>：可视化编辑工具，支持精确像素控制、图层管理</li>
            <li><strong>母版库</strong>：设计母版管理系统，实现一次设计多处应用</li>
            <li><strong>批量处理中心</strong>：批量应用样式、替换元素和导出资源</li>
            <li><strong>素材库</strong>：集中管理产品图片、品牌元素、背景等素材</li>
            <li><strong>项目管理</strong>：跟踪进度、分配任务和审核设计流程</li>
          </ul>
        </div>
      </section>
      
      <section id="challenges" className="section">
        <h2 className="section-title">3. 挑战与解决方案</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">3.1 主要挑战</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>挑战</th>
                  <th>影响</th>
                  <th>解决方案</th>
                  <th>成效</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>跨端体验一致性</td>
                  <td>高</td>
                  <td>建立交互设计规范，定义跨设备适配策略</td>
                  <td>体验一致性提升40%</td>
                </tr>
                <tr>
                  <td>大规模数据处理性能</td>
                  <td>高</td>
                  <td>优化数据库结构，实现数据分片和缓存策略</td>
                  <td>查询性能提升65%</td>
                </tr>
                <tr>
                  <td>组件复用效率</td>
                  <td>中</td>
                  <td>创建组件库，实现设计token化</td>
                  <td>开发效率提升30%</td>
                </tr>
                <tr>
                  <td>设计资源管理</td>
                  <td>中</td>
                  <td>建立统一的素材库和版本控制系统</td>
                  <td>资源查找时间减少50%</td>
                </tr>
                <tr>
                  <td>团队协作效率</td>
                  <td>中</td>
                  <td>统一文档中心，规范开发流程</td>
                  <td>沟通成本降低35%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">3.2 关键解决方案详解</h3>
          <p>面对跨端体验一致性这一核心挑战，我们采取了以下策略：</p>
          
          <ol>
            <li><strong>建立完整的交互规范</strong>：明确定义各类设备的交互模式、反馈机制和动效标准</li>
            <li><strong>响应式设计框架</strong>：实现基于断点的自适应布局系统</li>
            <li><strong>设备特性优化</strong>：针对不同输入方式（触控、鼠标、键盘）优化交互体验</li>
            <li><strong>统一组件库</strong>：开发支持多端适配的组件，确保视觉和交互一致性</li>
          </ol>
          
          <div className="code-block">
            <pre>{`// 响应式设计框架核心实现示例
:root {
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-xxl: 1600px;
}

// 输入适配策略示例
const InputAdapter = {
  detectInputType() {
    return {
      touch: 'ontouchstart' in window,
      pointer: window.matchMedia('(pointer:fine)').matches,
      keyboard: true
    };
  },
  
  optimizeForDevice(deviceType) {
    switch(deviceType) {
      case 'mobile':
        return { targetSize: '44px', hoverEffects: false };
      case 'tablet':
        return { targetSize: '40px', hoverEffects: true };
      case 'desktop':
        return { targetSize: '32px', hoverEffects: true };
    }
  }
};`}</pre>
          </div>
        </div>
      </section>
      
      <section id="next-steps" className="section">
        <h2 className="section-title">4. 下一阶段计划</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">4.1 近期任务（30天内）</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>任务</th>
                  <th>优先级</th>
                  <th>负责团队</th>
                  <th>计划完成</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>AI辅助创作功能开发</td>
                  <td>高</td>
                  <td>AI团队、前端团队</td>
                  <td>2025-07-15</td>
                </tr>
                <tr>
                  <td>完善内容创作指南文档</td>
                  <td>高</td>
                  <td>内容团队、设计团队</td>
                  <td>2025-07-10</td>
                </tr>
                <tr>
                  <td>用户测试与反馈收集</td>
                  <td>高</td>
                  <td>产品团队、UX团队</td>
                  <td>2025-07-20</td>
                </tr>
                <tr>
                  <td>性能优化与压力测试</td>
                  <td>中</td>
                  <td>后端团队、QA团队</td>
                  <td>2025-07-25</td>
                </tr>
                <tr>
                  <td>文档中心内容补充</td>
                  <td>中</td>
                  <td>文档团队</td>
                  <td>2025-07-30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">4.2 关键里程碑</h3>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">2025-07-15</div>
              <div className="timeline-content">
                <h4>AI辅助创作功能发布</h4>
                <p>整合自然语言生成能力，提供智能排版和内容建议</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-date">2025-07-30</div>
              <div className="timeline-content">
                <h4>Beta版全功能发布</h4>
                <p>完成所有核心功能开发，开放内部测试</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-date">2025-08-15</div>
              <div className="timeline-content">
                <h4>公开测试版发布</h4>
                <p>对外开放测试，收集用户反馈</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-date">2025-09-01</div>
              <div className="timeline-content">
                <h4>正式版上线</h4>
                <p>产品正式发布，开始市场推广</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="conclusions" className="section">
        <h2 className="section-title">5. 结论与建议</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">5.1 项目亮点与价值</h3>
          <ul>
            <li><strong>系统化设计</strong>：建立了完整的设计系统，为产品提供一致性体验基础</li>
            <li><strong>效率提升</strong>：批量处理功能显著提高内容创作效率，预计可提升生产力60%</li>
            <li><strong>跨端体验</strong>：优化的交互设计确保在不同设备上保持一致的用户体验</li>
            <li><strong>设计资产管理</strong>：母版库和素材库简化资源管理，降低重复工作</li>
            <li><strong>协作增强</strong>：文档中心统一知识管理，降低团队沟通成本</li>
          </ul>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">5.2 改进建议</h3>
          <p>为进一步提升产品质量和开发效率，提出以下建议：</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>建议</th>
                  <th>预期收益</th>
                  <th>实施难度</th>
                  <th>优先级</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>增强设计系统与代码的同步机制</td>
                  <td>提高设计到开发转换效率，减少不一致</td>
                  <td>中</td>
                  <td>高</td>
                </tr>
                <tr>
                  <td>建立更完善的用户研究框架</td>
                  <td>提供数据驱动的设计决策依据</td>
                  <td>中</td>
                  <td>高</td>
                </tr>
                <tr>
                  <td>扩展交互设计规范，纳入语音交互</td>
                  <td>为未来多模态交互做准备</td>
                  <td>高</td>
                  <td>中</td>
                </tr>
                <tr>
                  <td>实施自动化测试与CI/CD流程</td>
                  <td>提高代码质量，加快迭代速度</td>
                  <td>中</td>
                  <td>高</td>
                </tr>
                <tr>
                  <td>扩充文档中心，增加用户指南</td>
                  <td>降低用户学习成本，提高产品采用率</td>
                  <td>低</td>
                  <td>中</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="note">
          <div className="note-title">
            <FontAwesomeIcon icon={faLightbulb} />
            <span>总结</span>
          </div>
          <p>CreativePro Studio项目进展顺利，核心功能和设计系统已基本完成。通过系统化的设计规范和文档建设，我们解决了跨端体验一致性等关键挑战。下一阶段将重点完善AI辅助创作功能，并推进产品测试与发布。建议进一步强化设计系统与代码的同步机制，建立更完善的用户研究框架，为产品长期发展奠定基础。</p>
        </div>
      </section>
    </DocumentLayout>
  );
};

export default ProjectReport; 