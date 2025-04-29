import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, faUser, faCodeBranch, 
  faUsers, faRoute, faSlidersH, faChartLine,
  faComments, faLightbulb, faCheck
} from '@fortawesome/free-solid-svg-icons';
import '../styles/DocumentPage.css';

const UxGuidelines = () => {
  return (
    <div className="document-container">
      <header className="document-header">
        <h1 className="document-title">用户体验设计指南</h1>
        <p className="document-subtitle">CreativePro Studio UX设计原则与实践</p>
        <div className="metadata">
          <div className="metadata-item">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>最后更新：2025-04-25</span>
          </div>
          <div className="metadata-item">
            <FontAwesomeIcon icon={faUser} />
            <span>作者：UX设计团队</span>
          </div>
          <div className="metadata-item">
            <FontAwesomeIcon icon={faCodeBranch} />
            <span>版本：1.0.0</span>
          </div>
        </div>
      </header>
      
      <nav className="toc">
        <h2 className="toc-title">目录</h2>
        <ul className="toc-list">
          <li className="toc-item">
            <a href="#ux-principles" className="toc-link">
              <FontAwesomeIcon icon={faLightbulb} />
              <span>1. 用户体验原则</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#user-research" className="toc-link">
              <FontAwesomeIcon icon={faUsers} />
              <span>2. 用户研究</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#user-journey" className="toc-link">
              <FontAwesomeIcon icon={faRoute} />
              <span>3. 用户旅程</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#interaction-design" className="toc-link">
              <FontAwesomeIcon icon={faSlidersH} />
              <span>4. 交互设计</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#ux-metrics" className="toc-link">
              <FontAwesomeIcon icon={faChartLine} />
              <span>5. UX评估指标</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <section id="ux-principles" className="section">
        <h2 className="section-title">1. 用户体验原则</h2>
        
        <p>CreativePro Studio的用户体验设计以Z世代女性用户为核心目标，遵循以下体验原则：</p>
        
        <div className="subsection">
          <h3 className="subsection-title">1.1 简单直观</h3>
          <p>追求简单直观的交互设计，降低学习门槛，让用户能够直觉地使用产品的各项功能。</p>
          
          <div className="principles-grid">
            <div className="principle-card">
              <FontAwesomeIcon icon={faCheck} className="principle-icon" />
              <h4>减少认知负担</h4>
              <p>简化界面元素，突出核心功能，降低用户的认知负担</p>
            </div>
            <div className="principle-card">
              <FontAwesomeIcon icon={faCheck} className="principle-icon" />
              <h4>渐进式引导</h4>
              <p>通过渐进式引导帮助用户逐步了解产品功能</p>
            </div>
            <div className="principle-card">
              <FontAwesomeIcon icon={faCheck} className="principle-icon" />
              <h4>清晰反馈</h4>
              <p>为用户操作提供及时清晰的反馈，确保用户了解系统状态</p>
            </div>
          </div>
          
          <div className="note">
            <div className="note-title">
              <FontAwesomeIcon icon={faLightbulb} />
              <span>设计指导</span>
            </div>
            <p>简单不等于简陋，而是通过精心设计让复杂功能变得易于理解和使用。将高级功能适当隐藏，避免对新手造成干扰。</p>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">1.2 高效创作</h3>
          <p>通过智能化工具和流程优化，提高Z世代用户的创作效率，减少重复劳动。</p>
          <ul>
            <li><strong>批量操作</strong>：支持多项目同时编辑和更新</li>
            <li><strong>模板继承</strong>：通过母版模板实现一次设计、多处应用</li>
            <li><strong>智能预设</strong>：根据用户偏好和历史行为提供智能预设</li>
            <li><strong>快捷操作</strong>：提供多种快捷方式，满足不同熟练度用户的需求</li>
          </ul>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">1.3 愉悦体验</h3>
          <p>创造愉悦的产品体验，通过精美视觉设计和流畅的微交互提升用户的使用满意度。</p>
          <ul>
            <li>使用符合Z世代审美的视觉风格，包括渐变色、霓虹效果</li>
            <li>加入适量的动效和反馈，增强交互的愉悦感</li>
            <li>设计成就系统，对用户的创作成果给予积极反馈</li>
            <li>注重小细节，如加载动画、转场效果等</li>
          </ul>
        </div>
      </section>
      
      <section id="user-research" className="section">
        <h2 className="section-title">2. 用户研究</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">2.1 目标用户画像</h3>
          <p>通过深入研究，我们定义了CreativePro Studio的核心用户画像：</p>
          
          <div className="user-persona">
            <div className="persona-header">
              <h4>小莉 - 美妆社交媒体运营</h4>
              <p className="persona-quote">"我需要快速制作大量精美的产品图片，但没有专业设计技能。"</p>
            </div>
            <div className="persona-details">
              <div className="persona-detail">
                <span className="detail-label">年龄:</span>
                <span className="detail-value">24岁</span>
              </div>
              <div className="persona-detail">
                <span className="detail-label">职业:</span>
                <span className="detail-value">美妆品牌电商运营</span>
              </div>
              <div className="persona-detail">
                <span className="detail-label">技能:</span>
                <span className="detail-value">社交媒体运营, 基础PS技能</span>
              </div>
              <div className="persona-detail">
                <span className="detail-label">目标:</span>
                <span className="detail-value">快速制作符合品牌调性的产品图片</span>
              </div>
            </div>
            <div className="persona-needs">
              <h5>核心需求:</h5>
              <ul>
                <li>需要高效率地制作大量产品图片</li>
                <li>需要确保品牌视觉的一致性</li>
                <li>需要跟上新的视觉设计趋势</li>
                <li>需要在没有专业设计师支持的情况下完成工作</li>
              </ul>
            </div>
            <div className="persona-pain-points">
              <h5>痛点:</h5>
              <ul>
                <li>PS学习曲线陡峭，熟练掌握困难</li>
                <li>重复制作类似图片耗时且枯燥</li>
                <li>缺乏设计专业知识，难以创造高质量视觉</li>
                <li>工作节奏快，没有足够时间投入复杂设计工具</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">2.2 用户访谈发现</h3>
          <p>通过对20位Z世代美妆电商运营人员的深入访谈，我们发现以下关键洞察：</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>主题</th>
                  <th>用户反馈</th>
                  <th>设计启示</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>工作效率</td>
                  <td>"我每周需要制作50-100张不同的产品图片，时间压力巨大"</td>
                  <td>需要批量处理功能，一次设置多次应用</td>
                </tr>
                <tr>
                  <td>设计技能</td>
                  <td>"我不是专业设计师，但需要创造专业级别的视觉效果"</td>
                  <td>需要提供专业模板和简单的自定义选项</td>
                </tr>
                <tr>
                  <td>品牌一致性</td>
                  <td>"确保所有图片都符合品牌调性是一个巨大挑战"</td>
                  <td>需要品牌资产管理和模板继承机制</td>
                </tr>
                <tr>
                  <td>协作需求</td>
                  <td>"我需要与团队成员共享设计资源和项目进展"</td>
                  <td>需要协作功能和权限管理系统</td>
                </tr>
                <tr>
                  <td>工具学习</td>
                  <td>"没有时间学习复杂的设计软件，需要能快速上手的工具"</td>
                  <td>需要直观的界面和渐进式的学习曲线</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <section id="user-journey" className="section">
        <h2 className="section-title">3. 用户旅程</h2>
        <p>我们绘制了主要用户旅程地图，帮助团队理解用户的整体体验流程：</p>
        
        <img src="https://via.placeholder.com/900x500" alt="用户旅程地图" className="diagram" />
        
        <div className="subsection">
          <h3 className="subsection-title">3.1 核心用户旅程</h3>
          <p>以下是创建并发布批量产品图片的核心用户旅程：</p>
          
          <div className="journey-steps">
            <div className="journey-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>发现与决策</h4>
                <p>用户寻找高效的设计工具，发现CreativePro Studio并决定尝试</p>
                <div className="step-metrics">
                  <div className="metric">
                    <span className="metric-label">情绪:</span>
                    <span className="metric-value">期待/犹豫</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">目标:</span>
                    <span className="metric-value">评估工具是否适合需求</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>初始设置</h4>
                <p>创建账户并设置品牌资产，上传产品素材</p>
                <div className="step-metrics">
                  <div className="metric">
                    <span className="metric-label">情绪:</span>
                    <span className="metric-value">专注/轻微压力</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">目标:</span>
                    <span className="metric-value">准备设计环境</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>创建模板</h4>
                <p>设计或选择基础模板，定义可变和固定元素</p>
                <div className="step-metrics">
                  <div className="metric">
                    <span className="metric-label">情绪:</span>
                    <span className="metric-value">创造性/专注</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">目标:</span>
                    <span className="metric-value">创建可复用的设计基础</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>批量创建</h4>
                <p>应用模板到多个产品，进行个性化调整</p>
                <div className="step-metrics">
                  <div className="metric">
                    <span className="metric-label">情绪:</span>
                    <span className="metric-value">高效/满足</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">目标:</span>
                    <span className="metric-value">快速生成多个设计</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>导出与分享</h4>
                <p>导出成品并分享到社交媒体或电商平台</p>
                <div className="step-metrics">
                  <div className="metric">
                    <span className="metric-label">情绪:</span>
                    <span className="metric-value">成就感/满意</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">目标:</span>
                    <span className="metric-value">完成工作并展示成果</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="interaction-design" className="section">
        <h2 className="section-title">4. 交互设计</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">4.1 交互模式</h3>
          <p>根据用户研究，我们制定了以下核心交互模式：</p>
          
          <div className="interaction-patterns">
            <div className="pattern-card">
              <h4>直接操作</h4>
              <p>用户可以直接在画布上拖拽、缩放、旋转元素，提供即时反馈</p>
              <div className="pattern-example">
                <FontAwesomeIcon icon={faComments} className="pattern-icon" />
                <p className="example-quote">"我喜欢能直接看到我的修改效果，不需要在多个面板间切换"</p>
              </div>
            </div>
            <div className="pattern-card">
              <h4>批量编辑</h4>
              <p>用户可以同时选择多个项目进行批量修改，系统会即时预览变更效果</p>
              <div className="pattern-example">
                <FontAwesomeIcon icon={faComments} className="pattern-icon" />
                <p className="example-quote">"批量更新功能让我节省了大量时间，特别是品牌调整时"</p>
              </div>
            </div>
            <div className="pattern-card">
              <h4>智能默认值</h4>
              <p>系统提供智能默认设置，用户可以在此基础上进行微调</p>
              <div className="pattern-example">
                <FontAwesomeIcon icon={faComments} className="pattern-icon" />
                <p className="example-quote">"我喜欢系统已经为我做了大部分决策，我只需要做最后的调整"</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="ux-metrics" className="section">
        <h2 className="section-title">5. UX评估指标</h2>
        <p>我们使用以下指标来评估和改进用户体验：</p>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>指标类别</th>
                <th>具体指标</th>
                <th>目标值</th>
                <th>测量方法</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="3">效率指标</td>
                <td>完成任务时间</td>
                <td>比传统设计工具快80%</td>
                <td>用户测试、行为分析</td>
              </tr>
              <tr>
                <td>首次成功率</td>
                <td>{'>'}90%</td>
                <td>用户测试</td>
              </tr>
              <tr>
                <td>点击/任务比率</td>
                <td>{'<'}3次点击/核心任务</td>
                <td>行为分析</td>
              </tr>
              <tr>
                <td rowSpan="3">满意度指标</td>
                <td>NPS评分</td>
                <td>{'>'}40</td>
                <td>用户调查</td>
              </tr>
              <tr>
                <td>CSAT满意度</td>
                <td>{'>'}4.5/5</td>
                <td>用户调查</td>
              </tr>
              <tr>
                <td>情感反应</td>
                <td>正面情绪{'>'}80%</td>
                <td>用户访谈、表情分析</td>
              </tr>
              <tr>
                <td rowSpan="2">参与度指标</td>
                <td>留存率</td>
                <td>月留存{'>'}85%</td>
                <td>使用数据分析</td>
              </tr>
              <tr>
                <td>推荐率</td>
                <td>{'>'}30%</td>
                <td>用户调查、推荐追踪</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      <footer className="document-footer">
        <p>© 2025 domiyoung__ | CreativePro Studio - 面向Z世代女性用户的创意内容平台</p>
      </footer>
    </div>
  );
};

export default UxGuidelines; 