import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, faUser, faCodeBranch, faHandPointer, 
  faArrowsAlt, faMousePointer, faSpinner, faMobileAlt
} from '@fortawesome/free-solid-svg-icons';
import DocumentLayout from '../components/DocumentLayout';
import '../styles/DocumentPage.css';

const InteractionGuidelines = () => {
  // 准备元数据组件
  const metadataContent = (
    <>
      <div className="metadata-item">
        <FontAwesomeIcon icon={faCalendarAlt} />
        <span>最后更新：2025-05-28</span>
      </div>
      <div className="metadata-item">
        <FontAwesomeIcon icon={faUser} />
        <span>作者：交互设计团队</span>
      </div>
      <div className="metadata-item">
        <FontAwesomeIcon icon={faCodeBranch} />
        <span>版本：1.0.0</span>
      </div>
    </>
  );

  return (
    <DocumentLayout 
      title="交互设计规范" 
      subtitle="CreativePro Studio 用户交互体验与反馈机制指南" 
      metadata={metadataContent}
    >
      <nav className="toc">
        <h2 className="toc-title">目录</h2>
        <ul className="toc-list">
          <li className="toc-item">
            <a href="#principles" className="toc-link">
              <FontAwesomeIcon icon={faHandPointer} />
              <span>1. 交互设计原则</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#gestures" className="toc-link">
              <FontAwesomeIcon icon={faHandPointer} />
              <span>2. 手势交互规范</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#transitions" className="toc-link">
              <FontAwesomeIcon icon={faArrowsAlt} />
              <span>3. 动效与转场</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#feedback" className="toc-link">
              <FontAwesomeIcon icon={faMousePointer} />
              <span>4. 反馈机制</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#states" className="toc-link">
              <FontAwesomeIcon icon={faSpinner} />
              <span>5. 交互状态</span>
            </a>
          </li>
          <li className="toc-item">
            <a href="#responsive" className="toc-link">
              <FontAwesomeIcon icon={faMobileAlt} />
              <span>6. 跨设备交互一致性</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <section id="principles" className="section">
        <h2 className="section-title">1. 交互设计原则</h2>
        <p>CreativePro Studio的交互设计遵循以下核心原则，确保用户能够直观、高效地完成任务。</p>
        
        <div className="subsection">
          <h3 className="subsection-title">1.1 基本原则</h3>
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
                  <td>直接操作</td>
                  <td>用户可以直接与对象交互，而非通过复杂的控件或命令</td>
                  <td>拖放功能、内联编辑、实时预览</td>
                </tr>
                <tr>
                  <td>即时反馈</td>
                  <td>每个操作都有明确的反馈，让用户了解系统状态</td>
                  <td>状态指示器、加载动画、操作确认</td>
                </tr>
                <tr>
                  <td>一致性</td>
                  <td>相似功能有相似的交互方式</td>
                  <td>统一的操作模式、熟悉的界面模式</td>
                </tr>
                <tr>
                  <td>宽容度</td>
                  <td>允许用户错误并提供恢复机制</td>
                  <td>撤销功能、确认对话框、自动保存</td>
                </tr>
                <tr>
                  <td>可发现性</td>
                  <td>功能易于被发现和理解</td>
                  <td>清晰的视觉提示、渐进式披露</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="note">
          <div className="note-title">
            <span>设计考量</span>
          </div>
          <p>交互设计应考虑用户的心智模型，尽量减少认知负担。当引入新交互模式时，应确保其提供明确的价值，并易于学习。</p>
        </div>
      </section>
      
      <section id="gestures" className="section">
        <h2 className="section-title">2. 手势交互规范</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">2.1 触摸手势</h3>
          <p>在触摸设备上，我们支持以下标准手势：</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>手势</th>
                  <th>操作</th>
                  <th>使用场景</th>
                  <th>实现注意事项</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>点击 (Tap)</td>
                  <td>选择项目、激活按钮、打开链接</td>
                  <td>通用交互，主要选择方式</td>
                  <td>触发区域至少44×44px，响应时间&lt;100ms</td>
                </tr>
                <tr>
                  <td>双击 (Double Tap)</td>
                  <td>缩放内容、特殊功能激活</td>
                  <td>地图、图片查看器</td>
                  <td>仅用于辅助功能，勿作为唯一操作方式</td>
                </tr>
                <tr>
                  <td>长按 (Long Press)</td>
                  <td>显示上下文菜单、进入选择模式</td>
                  <td>列表项、可编辑内容</td>
                  <td>持续时间500-800ms，提供视觉反馈</td>
                </tr>
                <tr>
                  <td>滑动 (Swipe)</td>
                  <td>滚动内容、切换视图、显示操作</td>
                  <td>长列表、幻灯片、列表项操作</td>
                  <td>保持滑动惯性，提供边界反弹效果</td>
                </tr>
                <tr>
                  <td>捏合 (Pinch)</td>
                  <td>缩放内容</td>
                  <td>图片、地图、文档</td>
                  <td>缩放比例1:3，平滑过渡动画</td>
                </tr>
                <tr>
                  <td>旋转 (Rotate)</td>
                  <td>旋转内容</td>
                  <td>图片编辑、特定可视化</td>
                  <td>提供角度吸附，精确调整选项</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">2.2 鼠标交互</h3>
          <p>在桌面环境中，除了基本的点击操作外，还支持以下鼠标交互：</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>交互</th>
                  <th>操作</th>
                  <th>使用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>悬停 (Hover)</td>
                  <td>显示工具提示、高亮元素</td>
                  <td>导航菜单、可交互元素</td>
                </tr>
                <tr>
                  <td>右键点击</td>
                  <td>显示上下文菜单</td>
                  <td>任何支持上下文操作的元素</td>
                </tr>
                <tr>
                  <td>拖放</td>
                  <td>移动、重排或组织内容</td>
                  <td>文件管理、画布编辑、排序列表</td>
                </tr>
                <tr>
                  <td>滚轮</td>
                  <td>滚动内容、缩放</td>
                  <td>长内容页面、可缩放界面</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="code-block">
            <pre>{`// 实现拖放功能的示例代码
const DraggableItem = () => {
  const onDragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.currentTarget.classList.add('dragging');
  };

  const onDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
  };

  return (
    <div
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="draggable-item"
    >
      可拖动元素
    </div>
  );
};`}</pre>
          </div>
        </div>
      </section>
      
      <section id="transitions" className="section">
        <h2 className="section-title">3. 动效与转场</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">3.1 动效原则</h3>
          <p>动效应当有目的地增强用户体验，而非仅作装饰：</p>
          <ul>
            <li><strong>目的性</strong>：每个动效都应该传达含义，引导注意力或提供反馈</li>
            <li><strong>自然流畅</strong>：动效应当模拟现实世界物理特性，如惯性、弹性</li>
            <li><strong>简洁克制</strong>：避免过度动画，导致视觉疲劳或干扰任务完成</li>
            <li><strong>一致性</strong>：相似元素应有相似的动效语言</li>
            <li><strong>性能优先</strong>：动效不应导致界面卡顿或延迟响应</li>
          </ul>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">3.2 标准动效库</h3>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>动效类型</th>
                  <th>持续时间</th>
                  <th>缓动函数</th>
                  <th>使用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>淡入/淡出</td>
                  <td>200-300ms</td>
                  <td>ease-in-out</td>
                  <td>元素出现与消失</td>
                </tr>
                <tr>
                  <td>缩放</td>
                  <td>200-400ms</td>
                  <td>cubic-bezier(0.175, 0.885, 0.32, 1.275)</td>
                  <td>强调元素、模态框</td>
                </tr>
                <tr>
                  <td>滑动</td>
                  <td>300-500ms</td>
                  <td>ease-out</td>
                  <td>页面转场、侧边栏</td>
                </tr>
                <tr>
                  <td>弹跳</td>
                  <td>600-800ms</td>
                  <td>cubic-bezier(.17,.67,.83,.67)</td>
                  <td>通知、提示信息</td>
                </tr>
                <tr>
                  <td>变换</td>
                  <td>300-500ms</td>
                  <td>ease-in-out</td>
                  <td>状态变化、数据更新</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="code-block">
            <pre>{`/* 标准动效CSS变量 */
:root {
  /* 持续时间 */
  --animation-duration-xs: 100ms;
  --animation-duration-sm: 200ms;
  --animation-duration-md: 300ms;
  --animation-duration-lg: 500ms;
  --animation-duration-xl: 800ms;
  
  /* 缓动函数 */
  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
  --ease-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 使用示例 */
.element {
  transition: transform var(--animation-duration-md) var(--ease-standard),
              opacity var(--animation-duration-sm) var(--ease-standard);
}`}</pre>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">3.3 页面转场</h3>
          <p>页面间转场应保持连贯性，并提供空间上下文：</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>转场类型</th>
                  <th>使用场景</th>
                  <th>动效描述</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>层级转场</td>
                  <td>进入详情页、模态框</td>
                  <td>新内容从下层滑入或淡入，背景稍微缩小</td>
                </tr>
                <tr>
                  <td>水平转场</td>
                  <td>步骤间导航、相邻内容</td>
                  <td>向左或向右滑动，保持方向一致性</td>
                </tr>
                <tr>
                  <td>淡入叠加</td>
                  <td>无明确空间关系的页面</td>
                  <td>当前页面淡出，新页面淡入</td>
                </tr>
                <tr>
                  <td>展开转场</td>
                  <td>从缩略图到详情</td>
                  <td>元素从原位置展开至全屏</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <section id="feedback" className="section">
        <h2 className="section-title">4. 反馈机制</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">4.1 视觉反馈</h3>
          <p>视觉反馈是最基本和普遍的反馈形式：</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>反馈类型</th>
                  <th>实现方式</th>
                  <th>使用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>状态变化</td>
                  <td>颜色、形状、阴影变化</td>
                  <td>按钮点击、选择状态</td>
                </tr>
                <tr>
                  <td>进度指示</td>
                  <td>进度条、加载动画</td>
                  <td>文件上传、数据处理</td>
                </tr>
                <tr>
                  <td>确认信息</td>
                  <td>成功图标、短暂提示</td>
                  <td>操作完成确认</td>
                </tr>
                <tr>
                  <td>错误提示</td>
                  <td>错误图标、错误消息</td>
                  <td>表单验证、操作失败</td>
                </tr>
                <tr>
                  <td>焦点指示</td>
                  <td>边框高亮、背景变化</td>
                  <td>表单输入、键盘导航</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">4.2 触觉反馈</h3>
          <p>在支持触觉反馈的设备上，应适当提供触觉反馈增强体验：</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>反馈类型</th>
                  <th>强度</th>
                  <th>持续时间</th>
                  <th>使用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>轻触反馈</td>
                  <td>轻</td>
                  <td>10ms</td>
                  <td>按钮点击、选择项目</td>
                </tr>
                <tr>
                  <td>确认反馈</td>
                  <td>中</td>
                  <td>20ms</td>
                  <td>操作成功、解锁完成</td>
                </tr>
                <tr>
                  <td>警告反馈</td>
                  <td>重</td>
                  <td>30ms</td>
                  <td>错误提示、警告信息</td>
                </tr>
                <tr>
                  <td>连续反馈</td>
                  <td>变化</td>
                  <td>根据交互</td>
                  <td>滑块调节、滚动到边界</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="note">
            <div className="note-title">
              <span>无障碍考量</span>
            </div>
            <p>触觉反馈应仅作为辅助反馈机制，不应作为唯一的反馈方式。始终提供可视反馈作为主要方式，确保无法感知触觉反馈的用户也能获得良好体验。</p>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">4.3 听觉反馈</h3>
          <p>听觉反馈应谨慎使用，避免造成干扰：</p>
          
          <ul>
            <li><strong>简短克制</strong>：音效应简短、克制，避免干扰用户或周围环境</li>
            <li><strong>可选设置</strong>：所有听觉反馈应可在设置中禁用</li>
            <li><strong>场景适当</strong>：仅在重要状态变化或需要引起注意时使用</li>
            <li><strong>差异化设计</strong>：不同类型反馈应有明显区别，如通知、警告、错误</li>
          </ul>
        </div>
      </section>
      
      <section id="states" className="section">
        <h2 className="section-title">5. 交互状态</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">5.1 控件状态</h3>
          <p>交互控件应明确展示以下状态：</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>状态</th>
                  <th>视觉表现</th>
                  <th>适用控件</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>默认 (Default)</td>
                  <td>基础样式</td>
                  <td>所有控件</td>
                </tr>
                <tr>
                  <td>悬停 (Hover)</td>
                  <td>轻微背景变化、提示性边框</td>
                  <td>按钮、链接、菜单项</td>
                </tr>
                <tr>
                  <td>聚焦 (Focus)</td>
                  <td>明显边框、轮廓或光晕效果</td>
                  <td>表单控件、可操作元素</td>
                </tr>
                <tr>
                  <td>激活 (Active)</td>
                  <td>颜色加深、微小位移</td>
                  <td>按钮、选项卡</td>
                </tr>
                <tr>
                  <td>已选择 (Selected)</td>
                  <td>填充色变化、选中标记</td>
                  <td>复选框、单选框、列表项</td>
                </tr>
                <tr>
                  <td>禁用 (Disabled)</td>
                  <td>降低透明度、灰色调</td>
                  <td>所有控件</td>
                </tr>
                <tr>
                  <td>错误 (Error)</td>
                  <td>红色边框、错误图标</td>
                  <td>表单控件</td>
                </tr>
                <tr>
                  <td>加载 (Loading)</td>
                  <td>加载指示器、部分禁用</td>
                  <td>表单、按钮、内容区域</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="code-block">
            <pre>{`/* 按钮状态样式示例 */
.button {
  background-color: var(--color-primary);
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  transition: all var(--animation-duration-sm) var(--ease-standard);
}

.button:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-light);
}

.button:active {
  transform: translateY(1px);
  box-shadow: none;
}

.button:disabled {
  background-color: var(--color-gray-300);
  color: var(--color-gray-600);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}`}</pre>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">5.2 系统状态</h3>
          <p>系统状态应清晰传达给用户，避免不确定性：</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>状态</th>
                  <th>表现方式</th>
                  <th>用户期望</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>加载中</td>
                  <td>进度条或加载动画，可能的完成时间</td>
                  <td>系统正在处理，用户需等待</td>
                </tr>
                <tr>
                  <td>空状态</td>
                  <td>说明性图示，引导性文本和操作</td>
                  <td>内容为空，但可添加或刷新</td>
                </tr>
                <tr>
                  <td>错误状态</td>
                  <td>错误说明，可能的解决方法，重试选项</td>
                  <td>操作失败，需要修正或重试</td>
                </tr>
                <tr>
                  <td>成功状态</td>
                  <td>成功确认，后续可选操作</td>
                  <td>操作已完成，可继续其他任务</td>
                </tr>
                <tr>
                  <td>部分加载</td>
                  <td>骨架屏，部分内容可见，后台继续加载</td>
                  <td>可开始浏览，更多内容正在加载</td>
                </tr>
                <tr>
                  <td>离线状态</td>
                  <td>离线指示，本地可用功能，同步状态</td>
                  <td>网络不可用，但部分功能可用</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      <section id="responsive" className="section">
        <h2 className="section-title">6. 跨设备交互一致性</h2>
        
        <div className="subsection">
          <h3 className="subsection-title">6.1 输入适配</h3>
          <p>应根据设备的主要输入方式优化交互，同时保持跨设备的一致性体验：</p>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>设备类型</th>
                  <th>主要输入方式</th>
                  <th>交互适配</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>桌面设备</td>
                  <td>鼠标、键盘</td>
                  <td>悬停状态、右键菜单、键盘快捷键</td>
                </tr>
                <tr>
                  <td>平板设备</td>
                  <td>触摸、手写笔</td>
                  <td>较大点击区域、手势操作、多点触控</td>
                </tr>
                <tr>
                  <td>移动设备</td>
                  <td>触摸、单手操作</td>
                  <td>拇指区可达性优化、滑动操作、简化界面</td>
                </tr>
                <tr>
                  <td>混合设备</td>
                  <td>触摸+键盘鼠标</td>
                  <td>同时支持触摸和指针输入，自适应界面</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="subsection">
          <h3 className="subsection-title">6.2 功能一致性</h3>
          <p>核心功能在跨平台实现时应保持一致性，但可根据平台特性进行优化：</p>
          
          <ul>
            <li><strong>核心功能一致</strong>：所有平台应提供相同的核心功能集</li>
            <li><strong>交互模式适配</strong>：根据平台习惯调整交互方式</li>
            <li><strong>视觉语言协调</strong>：遵循平台设计语言，同时保持品牌一致性</li>
            <li><strong>性能优先级</strong>：在功能和性能间取得平衡，移动设备可简化部分复杂功能</li>
          </ul>
          
          <div className="note">
            <div className="note-title">
              <span>平台特性考量</span>
            </div>
            <p>在不同平台间实现功能时，应充分利用各平台特有能力（如iOS的Force Touch、Android的Material You），但确保这些特性增强而非替代基本功能，避免跨平台体验断层。</p>
          </div>
        </div>
      </section>
    </DocumentLayout>
  );
};

export default InteractionGuidelines; 