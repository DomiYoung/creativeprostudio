import React from 'react';
import { Calendar, User, GitBranch, Layout } from 'react-feather';
import DocumentLayout from '../components/DocumentLayout';
import '../styles/DocumentPage.css';

/**
 * 前端UI指南文档页面
 */
function FrontendGuide() {
  // 文档元数据
  const metadata = [
    { label: '最后更新', value: '2025-06-01', type: 'date' },
    { label: '作者', value: 'UI/UX设计团队', type: 'author' },
    { label: '版本', value: '3.1.2', icon: <GitBranch size={16} /> }
  ];

  // 目录
  const tableOfContents = [
    { id: 'design-principles', title: '1. 设计原则' },
    { id: 'components', title: '2. 组件规范' },
    { id: 'layout', title: '3. 布局系统' },
    { id: 'typography', title: '4. 文字排版' },
    { id: 'colors', title: '5. 色彩系统' },
    { id: 'theme', title: '6. 主题切换' },
    { id: 'accessibility', title: '7. 无障碍设计' },
    { id: 'responsive', title: '8. 响应式设计' },
    { id: 'icon-usage', title: '9. 图标使用' }
  ];

  return (
    <DocumentLayout
      title="前端UI指南"
      subtitle="CreativePro Studio 用户界面设计规范与开发标准"
      metadata={metadata}
      tableOfContents={tableOfContents}
    >
      {/* 1. 设计原则 */}
      <section id="design-principles" className="section">
        <h2 className="section-title">1. 设计原则</h2>
        <p>CreativePro Studio的用户界面遵循以下设计原则，确保为用户提供一致、高效、美观的体验。</p>
        
        <div className="subsection">
          <h3 className="subsection-title">1.1 核心设计理念</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>原则</th>
                  <th>描述</th>
                  <th>实践方式</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>简洁有效</td>
                  <td>保持界面简洁，减少认知负担</td>
                  <td>避免不必要的装饰，精简UI元素，突出核心功能</td>
                </tr>
                <tr>
                  <td>一致性</td>
                  <td>保持视觉和交互设计的一致性</td>
                  <td>使用统一的组件库、色彩系统和交互模式</td>
                </tr>
                <tr>
                  <td>可预测性</td>
                  <td>用户能够预测操作的结果</td>
                  <td>遵循通用设计模式，提供清晰的反馈</td>
                </tr>
                <tr>
                  <td>上下文感知</td>
                  <td>根据用户需求和环境调整体验</td>
                  <td>考虑用户旅程和工作流程，优化每个场景的体验</td>
                </tr>
                <tr>
                  <td>渐进式披露</td>
                  <td>逐步展示复杂信息</td>
                  <td>分层次呈现信息，减少同时展示的功能数量</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="note">
          <div className="note-title">
            <span>设计原则适用场景</span>
          </div>
          <p>这些原则适用于所有产品界面的设计与开发，从原型设计到最终实现，应贯穿整个产品生命周期。在面对设计决策时，应首先回归这些基本原则进行评估。</p>
        </div>
      </section>

      {/* 2. 组件规范 */}
      <section id="components" className="section">
        <h2 className="section-title">2. 组件规范</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">2.1 按钮</h3>
          <p>按钮是用户与应用交互的主要方式之一，我们定义了几种不同类型的按钮，用于不同的场景。</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>按钮类型</th>
                  <th>使用场景</th>
                  <th>样式特点</th>
                  <th>组件类名</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>主要按钮</td>
                  <td>页面主要操作，如"保存"、"提交"</td>
                  <td>填充色彩，高对比度</td>
                  <td><code>Button.Primary</code></td>
                </tr>
                <tr>
                  <td>次要按钮</td>
                  <td>次要操作，如"取消"、"返回"</td>
                  <td>轮廓样式，低对比度</td>
                  <td><code>Button.Secondary</code></td>
                </tr>
                <tr>
                  <td>文字按钮</td>
                  <td>辅助操作，如"查看更多"</td>
                  <td>仅文字，无背景</td>
                  <td><code>Button.Text</code></td>
                </tr>
                <tr>
                  <td>图标按钮</td>
                  <td>工具栏操作，如"刷新"、"关闭"</td>
                  <td>仅图标或图标+文字</td>
                  <td><code>Button.Icon</code></td>
                </tr>
                <tr>
                  <td>危险按钮</td>
                  <td>破坏性操作，如"删除"</td>
                  <td>警示色调</td>
                  <td><code>Button.Danger</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="code-block">
            <pre>{`// 按钮使用示例
import { Button } from '@/components/ui';

// 主要按钮
<Button.Primary onClick={handleSave}>保存项目</Button.Primary>

// 次要按钮
<Button.Secondary onClick={handleCancel}>取消</Button.Secondary>

// 图标按钮
<Button.Icon icon={<RefreshIcon />} onClick={handleRefresh} />

// 危险按钮
<Button.Danger onClick={handleDelete}>删除</Button.Danger>`}</pre>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">2.2 表单控件</h3>
          <p>表单控件包括输入框、选择器、复选框等，用于用户输入和数据收集。</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>控件类型</th>
                  <th>使用场景</th>
                  <th>变体</th>
                  <th>组件类名</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>输入框</td>
                  <td>文本输入</td>
                  <td>基础、带标签、带图标、带验证</td>
                  <td><code>Input</code></td>
                </tr>
                <tr>
                  <td>文本区域</td>
                  <td>多行文本输入</td>
                  <td>基础、自动调整高度</td>
                  <td><code>TextArea</code></td>
                </tr>
                <tr>
                  <td>选择器</td>
                  <td>从预定义选项中选择</td>
                  <td>下拉、多选、搜索、级联</td>
                  <td><code>Select</code></td>
                </tr>
                <tr>
                  <td>复选框</td>
                  <td>多选项选择</td>
                  <td>单个、组、带中间态</td>
                  <td><code>Checkbox</code></td>
                </tr>
                <tr>
                  <td>单选框</td>
                  <td>单选项选择</td>
                  <td>单个、组</td>
                  <td><code>Radio</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. 布局系统 */}
      <section id="layout" className="section">
        <h2 className="section-title">3. 布局系统</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">3.1 栅格系统</h3>
          <p>CreativePro Studio使用12列栅格系统进行页面布局，以确保各种屏幕尺寸下的一致性和灵活性。</p>
          
          <div className="code-block">
            <pre>{`// 使用Grid组件进行布局
import { Grid, Col } from '@/components/layout';

<Grid>
  <Col span={8}>主要内容区域</Col>
  <Col span={4}>侧边栏</Col>
</Grid>

// 响应式布局
<Grid>
  <Col xs={24} sm={12} md={8} lg={6} xl={4}>
    响应式调整的列
  </Col>
</Grid>`}</pre>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">3.2 间距系统</h3>
          <p>我们使用一致的间距系统来控制组件之间的间距，确保界面的视觉节奏。</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>间距名称</th>
                  <th>大小 (px)</th>
                  <th>使用场景</th>
                  <th>CSS变量</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>超小间距</td>
                  <td>4px</td>
                  <td>紧凑元素内部间距</td>
                  <td><code>--spacing-xs</code></td>
                </tr>
                <tr>
                  <td>小间距</td>
                  <td>8px</td>
                  <td>相关元素间的间距</td>
                  <td><code>--spacing-sm</code></td>
                </tr>
                <tr>
                  <td>中间距</td>
                  <td>16px</td>
                  <td>组件间隔</td>
                  <td><code>--spacing-md</code></td>
                </tr>
                <tr>
                  <td>大间距</td>
                  <td>24px</td>
                  <td>区块间隔</td>
                  <td><code>--spacing-lg</code></td>
                </tr>
                <tr>
                  <td>超大间距</td>
                  <td>32px</td>
                  <td>主要区域间隔</td>
                  <td><code>--spacing-xl</code></td>
                </tr>
                <tr>
                  <td>特大间距</td>
                  <td>48px</td>
                  <td>章节间隔</td>
                  <td><code>--spacing-xxl</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. 文字排版 */}
      <section id="typography" className="section">
        <h2 className="section-title">4. 文字排版</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">4.1 字体家族</h3>
          <p>我们使用以下字体堆栈确保在各种平台上的最佳显示效果：</p>
          
          <div className="code-block">
            <pre>{`/* 主字体 */
--font-family-sans: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* 等宽字体 - 用于代码 */
--font-family-mono: 'SF Mono', SFMono-Regular, Consolas, 
  'Liberation Mono', Menlo, Courier, monospace;`}</pre>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">4.2 字体大小</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>名称</th>
                  <th>大小</th>
                  <th>行高</th>
                  <th>使用场景</th>
                  <th>CSS变量</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>特大标题</td>
                  <td>32px</td>
                  <td>40px</td>
                  <td>主标题</td>
                  <td><code>--font-size-xxxl</code></td>
                </tr>
                <tr>
                  <td>大标题</td>
                  <td>28px</td>
                  <td>36px</td>
                  <td>页面标题</td>
                  <td><code>--font-size-xxl</code></td>
                </tr>
                <tr>
                  <td>中标题</td>
                  <td>24px</td>
                  <td>32px</td>
                  <td>主要章节标题</td>
                  <td><code>--font-size-xl</code></td>
                </tr>
                <tr>
                  <td>小标题</td>
                  <td>20px</td>
                  <td>28px</td>
                  <td>子章节标题</td>
                  <td><code>--font-size-lg</code></td>
                </tr>
                <tr>
                  <td>正文大</td>
                  <td>16px</td>
                  <td>24px</td>
                  <td>强调内容</td>
                  <td><code>--font-size-md</code></td>
                </tr>
                <tr>
                  <td>正文</td>
                  <td>14px</td>
                  <td>22px</td>
                  <td>主要正文</td>
                  <td><code>--font-size-sm</code></td>
                </tr>
                <tr>
                  <td>辅助文本</td>
                  <td>12px</td>
                  <td>18px</td>
                  <td>次要说明</td>
                  <td><code>--font-size-xs</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. 色彩系统 */}
      <section id="colors" className="section">
        <h2 className="section-title">5. 色彩系统</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">5.1 主要色彩</h3>
          <p>品牌主色和辅助色定义了产品的视觉识别系统。</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>颜色名称</th>
                  <th>色值(亮色模式)</th>
                  <th>色值(暗色模式)</th>
                  <th>CSS变量</th>
                  <th>使用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>主色</td>
                  <td>#0066FF</td>
                  <td>#4D8EFF</td>
                  <td><code>--color-primary</code></td>
                  <td>主要按钮、强调元素、主链接</td>
                </tr>
                <tr>
                  <td>主色-亮</td>
                  <td>#4D8EFF</td>
                  <td>#80AAFF</td>
                  <td><code>--color-primary-light</code></td>
                  <td>次要按钮、选中状态</td>
                </tr>
                <tr>
                  <td>主色-暗</td>
                  <td>#0052CC</td>
                  <td>#0066FF</td>
                  <td><code>--color-primary-dark</code></td>
                  <td>主按钮悬停状态</td>
                </tr>
                <tr>
                  <td>辅助色</td>
                  <td>#00C875</td>
                  <td>#00E676</td>
                  <td><code>--color-secondary</code></td>
                  <td>成功状态、积极反馈</td>
                </tr>
                <tr>
                  <td>强调色</td>
                  <td>#FF5722</td>
                  <td>#FF7043</td>
                  <td><code>--color-accent</code></td>
                  <td>特殊强调、促销信息</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">5.2 功能色彩</h3>
          <p>功能色彩用于传达特定的状态和信息。</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>颜色名称</th>
                  <th>色值(亮色模式)</th>
                  <th>色值(暗色模式)</th>
                  <th>CSS变量</th>
                  <th>使用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>成功色</td>
                  <td>#00C875</td>
                  <td>#00E676</td>
                  <td><code>--color-success</code></td>
                  <td>成功状态、完成操作</td>
                </tr>
                <tr>
                  <td>警告色</td>
                  <td>#FFB400</td>
                  <td>#FFC400</td>
                  <td><code>--color-warning</code></td>
                  <td>警告、需要注意</td>
                </tr>
                <tr>
                  <td>错误色</td>
                  <td>#F44336</td>
                  <td>#FF5252</td>
                  <td><code>--color-error</code></td>
                  <td>错误状态、失败操作</td>
                </tr>
                <tr>
                  <td>信息色</td>
                  <td>#2196F3</td>
                  <td>#42A5F5</td>
                  <td><code>--color-info</code></td>
                  <td>提示信息、帮助文本</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 后续章节可以根据需要继续添加 */}
    </DocumentLayout>
  );
}

export default FrontendGuide; 