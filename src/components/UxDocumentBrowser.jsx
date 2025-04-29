import React from 'react';
import { useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const UxDocumentBrowser = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const textColor = isDark ? '#E2E8F0' : '#1D1D1F';
  const bgColor = isDark ? '#1A202C' : '#FFFFFF';
  const secondaryTextColor = isDark ? '#A0AEC0' : '#86868B';
  const borderColor = isDark ? '#2D3748' : '#E5E5E7';
  const primaryColor = isDark ? '#B794F4' : '#F5E1D9';
  const secondaryColor = isDark ? '#D53F8C' : '#FFB5C5';
  const accentColor = isDark ? '#4FD1C5' : '#B6E5D8';

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
      lineHeight: '1.6',
      color: textColor,
      backgroundColor: isDark ? '#171923' : '#F9FAFB',
      padding: '24px',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        background: bgColor,
        borderRadius: '12px',
        boxShadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        padding: '32px'
      }}>
        <header style={{
          marginBottom: '32px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: '32px',
              fontWeight: '600',
              marginBottom: '16px',
              color: textColor
            }}>
            UX文档浏览器
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: '16px',
              color: secondaryTextColor,
              marginBottom: '24px'
            }}>
            CreativePro Studio - Z世代美妆潮流Web产品
          </motion.p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '24px',
            color: secondaryTextColor,
            fontSize: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-calendar-alt"></i>
              <span>更新日期: {new Date().toLocaleDateString()}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-user"></i>
              <span>作者: domiyoung__</span>
            </div>
          </div>
        </header>

        <div style={{
          backgroundColor: isDark ? 'rgba(183, 148, 244, 0.2)' : 'rgba(255, 181, 197, 0.2)',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px',
            color: textColor
          }}>
            目录
          </h2>
          <ul style={{ listStyleType: 'none' }}>
            <li style={{ marginBottom: '8px' }}>
              <a href="#overview" style={{
                textDecoration: 'none',
                color: textColor,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}>
                <i className="fas fa-chevron-right"></i>
                <span>概述</span>
              </a>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <a href="#ux-principles" style={{
                textDecoration: 'none',
                color: textColor,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}>
                <i className="fas fa-chevron-right"></i>
                <span>UX设计原则</span>
              </a>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <a href="#user-journeys" style={{
                textDecoration: 'none',
                color: textColor,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}>
                <i className="fas fa-chevron-right"></i>
                <span>用户旅程</span>
              </a>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <a href="#interaction-design" style={{
                textDecoration: 'none',
                color: textColor,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}>
                <i className="fas fa-chevron-right"></i>
                <span>交互设计</span>
              </a>
            </li>
          </ul>
        </div>

        <section id="overview" style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '16px',
            color: textColor,
            paddingBottom: '8px',
            borderBottom: `1px solid ${borderColor}`
          }}>
            概述
          </h2>
          <p style={{ marginBottom: '16px' }}>
            本文档提供了CreativePro Studio的用户体验(UX)设计规范和文档浏览指南。我们的设计以Apple Human Interface Guidelines为基础，融合Z世代审美，打造高端、简约而优雅的用户体验。
          </p>
          <p style={{ marginBottom: '16px' }}>
            设计目标是为18-25岁的Z世代女性用户提供直观、沉浸式且个性化的美妆与潮流体验，强调创意性视觉效果与AI驱动的流程优化。
          </p>
        </section>

        <section id="ux-principles" style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '16px',
            color: textColor,
            paddingBottom: '8px',
            borderBottom: `1px solid ${borderColor}`
          }}>
            UX设计原则
          </h2>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '500',
              marginBottom: '16px',
              color: textColor
            }}>
              简约优雅
            </h3>
            <p style={{ marginBottom: '16px' }}>
              遵循"少即是多"的设计理念，移除不必要的视觉元素，专注于核心内容和功能。使用留白创造呼吸空间，提升用户体验的优雅感。
            </p>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '500',
              marginBottom: '16px',
              color: textColor
            }}>
              Z世代审美
            </h3>
            <p style={{ marginBottom: '16px' }}>
              融合流行趋势元素，如渐变色彩、微动效和3D效果。色彩方案以粉紫、霓虹绿等Z世代偏好的色调为基础，创造年轻活力的视觉体验。
            </p>
          </div>
        </section>

        <section id="user-journeys" style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '16px',
            color: textColor,
            paddingBottom: '8px',
            borderBottom: `1px solid ${borderColor}`
          }}>
            用户旅程
          </h2>
          <p style={{ marginBottom: '16px' }}>
            我们设计了多个用户旅程路径，确保用户能够轻松找到所需内容并完成目标操作。每个旅程都经过精心规划，最小化用户操作步骤，最大化用户满意度。
          </p>
          
          <div style={{
            position: 'relative',
            margin: '32px 0',
            paddingLeft: '30px'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 8,
              height: '100%',
              width: 2,
              backgroundColor: borderColor
            }}></div>
            
            <div style={{
              position: 'relative',
              marginBottom: '32px'
            }}>
              <div style={{
                position: 'absolute',
                left: -30,
                top: 6,
                width: 18,
                height: 18,
                borderRadius: '50%',
                backgroundColor: primaryColor,
                border: `2px solid ${bgColor}`,
                boxShadow: isDark ? '0 1px 3px rgba(255,255,255,0.1)' : '0 1px 3px rgba(0,0,0,0.05)'
              }}></div>
              
              <div style={{
                backgroundColor: bgColor,
                borderRadius: '8px',
                padding: '24px',
                boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.05)',
                border: `1px solid ${borderColor}`
              }}>
                <span style={{
                  display: 'inline-block',
                  backgroundColor: secondaryColor,
                  color: isDark ? '#1A202C' : 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  marginBottom: '8px'
                }}>
                  发现阶段
                </span>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: textColor
                }}>
                  首次访问体验
                </h3>
                <p>
                  用户首次访问平台时，展示简洁欢迎界面和个性化推荐，引导用户探索核心功能，建立第一印象。
                </p>
              </div>
            </div>
            
            <div style={{
              position: 'relative',
              marginBottom: '32px'
            }}>
              <div style={{
                position: 'absolute',
                left: -30,
                top: 6,
                width: 18,
                height: 18,
                borderRadius: '50%',
                backgroundColor: secondaryColor,
                border: `2px solid ${bgColor}`,
                boxShadow: isDark ? '0 1px 3px rgba(255,255,255,0.1)' : '0 1px 3px rgba(0,0,0,0.05)'
              }}></div>
              
              <div style={{
                backgroundColor: bgColor,
                borderRadius: '8px',
                padding: '24px',
                boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.05)',
                border: `1px solid ${borderColor}`
              }}>
                <span style={{
                  display: 'inline-block',
                  backgroundColor: accentColor,
                  color: isDark ? '#1A202C' : 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  marginBottom: '8px'
                }}>
                  参与阶段
                </span>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: textColor
                }}>
                  内容探索与互动
                </h3>
                <p>
                  设计流畅的内容浏览体验，鼓励用户通过点赞、评论、分享等方式互动，增强社区参与感和用户粘性。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="interaction-design" style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '16px',
            color: textColor,
            paddingBottom: '8px',
            borderBottom: `1px solid ${borderColor}`
          }}>
            交互设计
          </h2>
          <p style={{ marginBottom: '16px' }}>
            我们的交互设计强调即时反馈和流畅过渡，创造愉悦且高效的用户体验。所有交互元素都经过精心设计，确保符合用户的心理模型和操作习惯。
          </p>
          
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '500',
              marginBottom: '16px',
              color: textColor
            }}>
              微交互
            </h3>
            <p style={{ marginBottom: '16px' }}>
              通过精心设计的微交互效果（如悬停动画、点击反馈），增强用户操作的愉悦感，提升整体体验品质。
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '500',
              marginBottom: '16px',
              color: textColor
            }}>
              手势与操作
            </h3>
            <p style={{ marginBottom: '16px' }}>
              设计符合直觉的手势操作，如滑动浏览、捏合缩放等，确保移动端用户的顺畅体验。
            </p>
          </div>
        </section>

        <footer style={{
          marginTop: '40px',
          textAlign: 'center',
          color: secondaryTextColor,
          fontSize: '14px'
        }}>
          <p>© domiyoung__ - 版权所有</p>
        </footer>
      </div>
    </div>
  );
};

export default UxDocumentBrowser; 