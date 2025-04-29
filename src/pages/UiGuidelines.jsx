import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, faUser, faCodeBranch, faPalette, 
  faLayerGroup, faCube, faTabletAlt, faUniversalAccess,
  faLightbulb, faCode
} from '@fortawesome/free-solid-svg-icons';
import '../styles/DocumentPage.css';

const UiGuidelines = () => {
  return (
    <div className="document-container">
      <header className="document-header">
        <h1 className="document-title">前端UI设计规范</h1>
        <p className="document-subtitle">CreativePro Studio 用户界面设计原则与组件指南</p>
        <div className="metadata">
          <div className="metadata-item">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>最后更新：2025-04-30</span>
          </div>
          <div className="metadata-item">
            <FontAwesomeIcon icon={faUser} />
            <span>作者：UI/UX设计团队</span>
          </div>
          <div className="metadata-item">
            <FontAwesomeIcon icon={faCodeBranch} />
            <span>版本：2.0.1</span>
          </div>
        </div>
      </header>
      
      <nav className="toc">
        <h2 className="toc-title">目录</h2>
        <ul className="toc-list">
          <li className="toc-item">
            <a href="#design-principles" className="toc-link">
              <FontAwesomeIcon icon={faPalette} />
              <span>1. 设计原则</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#design-tokens" className="toc-link">
              <FontAwesomeIcon icon={faCube} />
              <span>2. 设计令牌</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#components" className="toc-link">
              <FontAwesomeIcon icon={faLayerGroup} />
              <span>3. 组件规范</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#responsive" className="toc-link">
              <FontAwesomeIcon icon={faTabletAlt} />
              <span>4. 响应式设计</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#accessibility" className="toc-link">
              <FontAwesomeIcon icon={faUniversalAccess} />
              <span>5. 无障碍设计</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <section id="design-principles" className="section">
        <h2 className="section-title">1. 设计原则</h2>
        
        <p>CreativePro Studio 的界面设计以用户为中心，遵循以下核心原则：</p>
        
        <div className="subsection">
          <h3 className="subsection-title">1.1 简洁明了</h3>
          <p>通过精简的视觉语言和直观的界面元素，减少用户认知负担。界面应服务于用户目标，避免不必要的装饰元素。</p>
          
          <div className="note">
            <div className="note-title">
              <FontAwesomeIcon icon={faLightbulb} />
              <span>设计指导</span>
            </div>
            <p>每个页面应有明确的主要行动点，辅助行动次之，保持视觉层次清晰。设计应遵循"减少而非增加"的原则。</p>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">1.2 一致性</h3>
          <p>在整个产品中保持视觉和交互的一致性，使用户能够轻松将学习经验从一个部分转移到另一个部分。</p>
          <ul>
            <li><strong>视觉一致性</strong>：颜色、字体、空间等视觉元素的使用模式保持一致</li>
            <li><strong>功能一致性</strong>：类似的功能应采用类似的界面表达</li>
            <li><strong>交互一致性</strong>：相同的用户操作产生相同的界面反馈</li>
          </ul>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">1.3 反馈与引导</h3>
          <p>为用户操作提供即时、清晰的反馈，并通过适当的引导帮助用户完成任务。</p>
          <ul>
            <li>操作按钮应有明确的状态变化（如悬停、点击、禁用）</li>
            <li>长时操作应提供进度指示</li>
            <li>表单提交应显示成功或错误信息</li>
            <li>首次使用的功能可提供引导提示</li>
          </ul>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">1.4 灵活高效</h3>
          <p>设计应同时满足新手和专业用户的需求，提供多种操作路径和快捷方式。</p>
          <ul>
            <li>常用功能应易于发现且快速可达</li>
            <li>提供键盘快捷键增强专业用户效率</li>
            <li>复杂任务应提供默认设置，同时允许高级自定义</li>
          </ul>
        </div>
      </section>
      
      <section id="design-tokens" className="section">
        <h2 className="section-title">2. 设计令牌</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">2.1 色彩系统</h3>
          <p>色彩系统基于主色、辅助色和中性色，同时提供语义化的功能色。</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>类别</th>
                  <th>颜色</th>
                  <th>HEX值</th>
                  <th>使用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="3">主色调</td>
                  <td>主色-浅</td>
                  <td>#F5E1D9</td>
                  <td>背景、边框、次要元素</td>
                </tr>
                <tr>
                  <td>主色-中</td>
                  <td>#E8C4B9</td>
                  <td>强调元素、次要按钮</td>
                </tr>
                <tr>
                  <td>主色-深</td>
                  <td>#D9A79A</td>
                  <td>主要按钮、强调文字</td>
                </tr>
                <tr>
                  <td rowSpan="2">辅助色</td>
                  <td>辅助色-浅粉</td>
                  <td>#FFB5C5</td>
                  <td>点缀、视觉强调</td>
                </tr>
                <tr>
                  <td>辅助色-薄荷</td>
                  <td>#B6E5D8</td>
                  <td>成功状态、进度指示</td>
                </tr>
                <tr>
                  <td rowSpan="4">中性色</td>
                  <td>中性色-90</td>
                  <td>#1D1D1F</td>
                  <td>主要文字</td>
                </tr>
                <tr>
                  <td>中性色-60</td>
                  <td>#86868B</td>
                  <td>次要文字、图标</td>
                </tr>
                <tr>
                  <td>中性色-20</td>
                  <td>#E5E5E7</td>
                  <td>分割线、边框</td>
                </tr>
                <tr>
                  <td>中性色-10</td>
                  <td>#F9FAFB</td>
                  <td>背景色</td>
                </tr>
                <tr>
                  <td rowSpan="4">功能色</td>
                  <td>信息色</td>
                  <td>#0066CC</td>
                  <td>提示、链接</td>
                </tr>
                <tr>
                  <td>成功色</td>
                  <td>#34C759</td>
                  <td>成功状态、确认</td>
                </tr>
                <tr>
                  <td>警告色</td>
                  <td>#FF9500</td>
                  <td>警告提示</td>
                </tr>
                <tr>
                  <td>错误色</td>
                  <td>#FF3B30</td>
                  <td>错误提示、删除操作</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="note">
            <div className="note-title">
              <FontAwesomeIcon icon={faLightbulb} />
              <span>色彩应用</span>
            </div>
            <p>遵循 60-30-10 法则：主色调占 60%，辅助色占 30%，强调色占 10%。颜色使用应考虑无障碍标准，确保足够的对比度。</p>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">2.2 字体与排版</h3>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>类别</th>
                  <th>字体</th>
                  <th>字重</th>
                  <th>大小</th>
                  <th>用途</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="6">正文字体</td>
                  <td rowSpan="6">SF Pro Text, -apple-system, Helvetica Neue, Arial, sans-serif</td>
                  <td>Regular (400)</td>
                  <td>14px/1.6</td>
                  <td>正文内容</td>
                </tr>
                <tr>
                  <td>Regular (400)</td>
                  <td>12px/1.5</td>
                  <td>辅助文字、注释</td>
                </tr>
                <tr>
                  <td>Medium (500)</td>
                  <td>14px/1.6</td>
                  <td>强调内容、按钮文字</td>
                </tr>
                <tr>
                  <td>Semibold (600)</td>
                  <td>16px/1.5</td>
                  <td>小标题</td>
                </tr>
                <tr>
                  <td>Semibold (600)</td>
                  <td>20px/1.4</td>
                  <td>中标题</td>
                </tr>
                <tr>
                  <td>Bold (700)</td>
                  <td>24px/1.3</td>
                  <td>大标题</td>
                </tr>
                <tr>
                  <td rowSpan="2">代码字体</td>
                  <td rowSpan="2">SF Mono, SFMono-Regular, Menlo, Monaco, Consolas, monospace</td>
                  <td>Regular (400)</td>
                  <td>13px/1.6</td>
                  <td>代码块、技术内容</td>
                </tr>
                <tr>
                  <td>Medium (500)</td>
                  <td>13px/1.6</td>
                  <td>代码高亮、关键词</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="code-block">
            <pre>
{`/* 字体定义示例 */
:root {
  --font-family-base: "SF Pro Text", -apple-system, BlinkMacSystemFont, 
    "Helvetica Neue", Arial, sans-serif;
  --font-family-code: "SF Mono", SFMono-Regular, Menlo, Monaco, 
    Consolas, monospace;
  
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 24px;
  --font-size-xxl: 32px;
  
  --line-height-tight: 1.3;
  --line-height-base: 1.5;
  --line-height-relaxed: 1.8;
}`}
            </pre>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">2.3 间距与圆角</h3>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>名称</th>
                  <th>大小</th>
                  <th>使用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>间距-超小(xxs)</td>
                  <td>4px</td>
                  <td>相关元素之间的最小间距</td>
                </tr>
                <tr>
                  <td>间距-小(xs)</td>
                  <td>8px</td>
                  <td>紧凑元素间距、图标与文字</td>
                </tr>
                <tr>
                  <td>间距-中(sm)</td>
                  <td>16px</td>
                  <td>表单元素、卡片内边距</td>
                </tr>
                <tr>
                  <td>间距-大(md)</td>
                  <td>24px</td>
                  <td>区块之间间距、卡片外边距</td>
                </tr>
                <tr>
                  <td>间距-超大(lg)</td>
                  <td>32px</td>
                  <td>主要区块间距、页面边距</td>
                </tr>
                <tr>
                  <td>间距-巨大(xl)</td>
                  <td>48px</td>
                  <td>页面主要区块间的间距</td>
                </tr>
                <tr>
                  <td>圆角-小(sm)</td>
                  <td>6px</td>
                  <td>按钮、小卡片、输入框</td>
                </tr>
                <tr>
                  <td>圆角-中(md)</td>
                  <td>8px</td>
                  <td>普通卡片、弹窗</td>
                </tr>
                <tr>
                  <td>圆角-大(lg)</td>
                  <td>12px</td>
                  <td>大型卡片、浮层</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <section id="components" className="section">
        <h2 className="section-title">3. 组件规范</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">3.1 按钮</h3>
          <p>按钮是用户触发操作的主要交互元素，按照视觉层级分为主要、次要、文本三种类型。</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>按钮类型</th>
                  <th>使用场景</th>
                  <th>外观特征</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>主要按钮</td>
                  <td>页面主要行动点，提交表单，确认操作</td>
                  <td>实心背景，醒目颜色，白色文字</td>
                </tr>
                <tr>
                  <td>次要按钮</td>
                  <td>次要行动点，辅助操作，备选项</td>
                  <td>边框样式，背景透明</td>
                </tr>
                <tr>
                  <td>文本按钮</td>
                  <td>轻量级操作，取消，返回</td>
                  <td>无背景无边框，仅文字</td>
                </tr>
                <tr>
                  <td>图标按钮</td>
                  <td>工具栏操作，紧凑界面</td>
                  <td>仅图标或图标+文字</td>
                </tr>
                <tr>
                  <td>危险按钮</td>
                  <td>删除、重置等破坏性操作</td>
                  <td>使用警告色或错误色</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="code-block">
            <pre>
{`// 按钮使用规范示例
<Button variant="primary" size="md">提交</Button>
<Button variant="secondary" size="md">取消</Button>
<Button variant="text">返回</Button>
<Button variant="icon"><Icon name="trash" /></Button>
<Button variant="danger">删除</Button>`}
            </pre>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">3.2 表单控件</h3>
          <p>表单控件是用户输入数据的主要方式，设计应注重清晰的标签、适当的状态反馈和错误提示。</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>控件类型</th>
                  <th>规范要点</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>文本输入框</td>
                  <td>
                    <ul>
                      <li>标签清晰且简洁</li>
                      <li>提供适当的占位符文本</li>
                      <li>错误状态显示红色边框和提示</li>
                      <li>可选输入显示"(可选)"</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>选择控件</td>
                  <td>
                    <ul>
                      <li>选项数量少时使用单选按钮或复选框</li>
                      <li>选项数量多时使用下拉选择器</li>
                      <li>分组选项使用分隔符</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>日期选择器</td>
                  <td>
                    <ul>
                      <li>提供日历视图和直接输入两种方式</li>
                      <li>支持范围选择</li>
                      <li>显示日期格式提示</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">3.3 卡片</h3>
          <p>卡片是内容展示的主要容器，用于组织和分隔内容单元。</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>卡片类型</th>
                  <th>使用场景</th>
                  <th>规范要点</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>基础卡片</td>
                  <td>一般内容展示</td>
                  <td>轻微阴影，圆角边框，适当内边距</td>
                </tr>
                <tr>
                  <td>列表卡片</td>
                  <td>多项同类内容</td>
                  <td>条目间使用分隔线，支持展开/折叠</td>
                </tr>
                <tr>
                  <td>媒体卡片</td>
                  <td>包含图片/视频的内容</td>
                  <td>媒体置顶，内容信息紧随其后</td>
                </tr>
                <tr>
                  <td>交互卡片</td>
                  <td>可点击/可操作内容</td>
                  <td>提供悬停状态，可包含操作按钮</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="code-block">
            <pre>
{`// 卡片组件示例
<Card variant="base" padding="md">
  <CardHeader>
    <CardTitle>标题</CardTitle>
    <CardSubtitle>副标题</CardSubtitle>
  </CardHeader>
  <CardBody>卡片内容</CardBody>
  <CardFooter>
    <Button variant="text">详情</Button>
  </CardFooter>
</Card>`}
            </pre>
          </div>
        </div>
      </section>
      
      <section id="responsive" className="section">
        <h2 className="section-title">4. 响应式设计</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">4.1 断点规范</h3>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>断点名称</th>
                  <th>宽度范围</th>
                  <th>设备类型</th>
                  <th>适配重点</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>xs</td>
                  <td>&lt; 576px</td>
                  <td>小型手机</td>
                  <td>单列布局，隐藏非必要元素</td>
                </tr>
                <tr>
                  <td>sm</td>
                  <td>576px - 767px</td>
                  <td>大型手机</td>
                  <td>单列布局，简化导航</td>
                </tr>
                <tr>
                  <td>md</td>
                  <td>768px - 991px</td>
                  <td>平板竖屏</td>
                  <td>双列布局，折叠侧边栏</td>
                </tr>
                <tr>
                  <td>lg</td>
                  <td>992px - 1199px</td>
                  <td>平板横屏、小型桌面</td>
                  <td>多列布局，侧边栏可见</td>
                </tr>
                <tr>
                  <td>xl</td>
                  <td>1200px - 1599px</td>
                  <td>桌面显示器</td>
                  <td>多列布局，全功能展示</td>
                </tr>
                <tr>
                  <td>xxl</td>
                  <td>≥ 1600px</td>
                  <td>大型显示器</td>
                  <td>宽屏优化，多面板并列</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="code-block">
            <pre>
{`/* 响应式断点定义 */
:root {
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-xxl: 1600px;
}

/* 媒体查询示例 */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}`}
            </pre>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">4.2 布局策略</h3>
          <p>响应式布局采用移动优先的设计策略，从小屏幕开始设计，逐步扩展到大屏幕。</p>
          
          <ul>
            <li><strong>网格系统</strong>：使用12列弹性网格系统</li>
            <li><strong>容器宽度</strong>：在各断点使用不同的最大宽度限制</li>
            <li><strong>元素堆叠</strong>：小屏幕上元素垂直堆叠，大屏幕上水平排列</li>
            <li><strong>导航转换</strong>：小屏幕使用汉堡菜单，大屏幕展开为水平导航</li>
            <li><strong>内容优先级</strong>：重要内容始终保持可见，次要内容在小屏幕上可折叠或隐藏</li>
          </ul>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">4.3 触控优化</h3>
          <p>针对触控设备的特殊设计考虑：</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>设计要点</th>
                  <th>规范要求</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>点击目标尺寸</td>
                  <td>触控元素最小尺寸44x44px，确保易于点击</td>
                </tr>
                <tr>
                  <td>元素间距</td>
                  <td>相邻可点击元素间距至少8px，避免误触</td>
                </tr>
                <tr>
                  <td>手势支持</td>
                  <td>支持常见手势操作：滑动、捏合、双击等</td>
                </tr>
                <tr>
                  <td>反馈方式</td>
                  <td>提供视觉反馈和动画过渡，不依赖悬停效果</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <section id="accessibility" className="section">
        <h2 className="section-title">5. 无障碍设计</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">5.1 基本原则</h3>
          <p>产品设计遵循WCAG 2.1 AA级标准，确保不同能力的用户都能有效使用界面。</p>
          
          <ul>
            <li><strong>可感知</strong>：内容以多种方式呈现，适应不同感知能力</li>
            <li><strong>可操作</strong>：界面元素可通过多种方式操作</li>
            <li><strong>可理解</strong>：内容和操作清晰易懂</li>
            <li><strong>稳健性</strong>：兼容各种辅助技术</li>
          </ul>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">5.2 色彩对比度</h3>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>内容类型</th>
                  <th>最低对比度要求</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>正文文本</td>
                  <td>4.5:1</td>
                </tr>
                <tr>
                  <td>大号文本（18px以上或14px粗体）</td>
                  <td>3:1</td>
                </tr>
                <tr>
                  <td>界面组件和图形对象</td>
                  <td>3:1</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="note">
            <div className="note-title">
              <FontAwesomeIcon icon={faLightbulb} />
              <span>检查工具</span>
            </div>
            <p>设计师应使用对比度检查工具验证设计，确保符合WCAG标准。不要仅依赖颜色传达信息，应同时使用形状、文本或图案。</p>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">5.3 键盘可访问性</h3>
          <p>所有交互功能应支持键盘操作，包括：</p>
          
          <ul>
            <li>可通过Tab键顺序访问所有交互元素</li>
            <li>使用清晰的焦点样式指示当前焦点位置</li>
            <li>提供键盘快捷键访问常用功能</li>
            <li>模态窗口中封闭Tab焦点循环</li>
            <li>下拉菜单可通过方向键导航</li>
          </ul>
          
          <div className="code-block">
            <pre>
{`/* 焦点样式示例 */
:focus {
  outline: 2px solid #0066CC;
  outline-offset: 2px;
}

/* 无鼠标用户的焦点样式增强 */
:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 3px solid #0066CC;
  outline-offset: 3px;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.3);
}`}
            </pre>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">5.4 屏幕阅读器支持</h3>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>设计要点</th>
                  <th>实现方式</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>语义化标记</td>
                  <td>使用正确的HTML元素表达内容结构</td>
                </tr>
                <tr>
                  <td>替代文本</td>
                  <td>为图像提供描述性alt文本</td>
                </tr>
                <tr>
                  <td>ARIA属性</td>
                  <td>使用aria-label、aria-describedby等增强可访问性</td>
                </tr>
                <tr>
                  <td>状态通知</td>
                  <td>动态内容变化时通过aria-live通知屏幕阅读器</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="code-block">
            <pre>
{`// 屏幕阅读器支持示例
<button 
  aria-label="关闭对话框" 
  aria-describedby="close-desc"
>
  <Icon name="close" />
</button>
<span id="close-desc" class="sr-only">
  关闭当前对话框并丢弃未保存的更改
</span>`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UiGuidelines; 