import React from 'react';
import { useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const ProjectPlan = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const textColor = isDark ? '#E2E8F0' : '#1D1D1F';
  const bgColor = isDark ? '#1A202C' : '#FFFFFF';
  const secondaryTextColor = isDark ? '#A0AEC0' : '#86868B';
  const borderColor = isDark ? '#2D3748' : '#E5E5E7';
  const primaryColor = isDark ? '#B794F4' : '#F5E1D9';
  const secondaryColor = isDark ? '#D53F8C' : '#FFB5C5';
  const accentColor = isDark ? '#4FD1C5' : '#B6E5D8';
  
  // 项目阶段数据
  const projectPhases = [
    {
      id: 'discovery',
      name: '需求发现',
      duration: '2周',
      description: '通过市场分析和用户研究，确定Z世代美妆潮流Web产品的核心功能和方向。',
      tasks: [
        '进行Z世代用户行为研究和调查',
        '分析竞品和市场趋势',
        '确定用户痛点和需求',
        '制定产品愿景和目标'
      ]
    },
    {
      id: 'planning',
      name: '计划制定',
      duration: '2周',
      description: '根据需求发现阶段的成果，制定详细的产品路线图和开发计划。',
      tasks: [
        '确定核心功能清单和优先级',
        '制定产品开发路线图',
        '分配资源和人员',
        '确定技术栈和架构方案'
      ]
    },
    {
      id: 'design',
      name: '设计阶段',
      duration: '4周',
      description: '基于Apple Human Interface Guidelines的优雅交互理念，为Z世代用户打造现代、时尚的UI/UX设计。',
      tasks: [
        '创建用户流程图和信息架构',
        '设计UI风格指南和组件库',
        '制作高保真UI原型',
        '进行用户测试和设计迭代'
      ]
    },
    {
      id: 'development',
      name: '开发阶段',
      duration: '8周',
      description: '使用React.js前端和.NET Core后端，实现设计的UI和功能。',
      tasks: [
        '搭建前端框架和基础组件',
        '实现后端API和数据库',
        '集成AI功能',
        '实现产品核心功能',
        '持续进行代码审查和质量控制'
      ]
    },
    {
      id: 'testing',
      name: '测试阶段',
      duration: '2周',
      description: '确保产品质量，通过多种测试方法验证功能和性能。',
      tasks: [
        '进行单元测试和集成测试',
        '进行用户验收测试',
        '性能和兼容性测试',
        'A/B测试关键功能',
        '修复bug和优化体验'
      ]
    },
    {
      id: 'launch',
      name: '发布上线',
      duration: '2周',
      description: '产品上线准备和正式发布。',
      tasks: [
        '准备发布环境和域名',
        '配置监控和分析工具',
        '准备营销材料',
        '进行软发布测试',
        '正式发布产品'
      ]
    },
    {
      id: 'iteration',
      name: '持续迭代',
      duration: '持续',
      description: '基于用户反馈和数据分析，持续优化和迭代产品。',
      tasks: [
        '收集和分析用户反馈',
        '优化现有功能',
        '开发新功能',
        '定期发布更新',
        'A/B测试新功能'
      ]
    }
  ];

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
            项目规划
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
            CreativePro Studio - Z世代美妆潮流Web产品 - 项目生命周期与路线图
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
              <span>项目负责人: domiyoung__</span>
            </div>
          </div>
        </header>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '16px',
            color: textColor,
            paddingBottom: '8px',
            borderBottom: `1px solid ${borderColor}`
          }}>
            项目概述
          </h2>
          <p style={{ marginBottom: '16px' }}>
            本项目旨在开发一款面向18-25岁Z世代女性用户的美妆与潮流相关Web产品。产品将突出创意性视觉效果与AI驱动的流程优化，提供个性化体验和社交互动功能。通过整合现代Web设计标准和Apple Human Interface Guidelines的优雅交互理念，我们致力于打造高端、吸引人且易用的用户体验。
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px',
            marginTop: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              flex: '1 1 300px',
              backgroundColor: isDark ? 'rgba(183, 148, 244, 0.1)' : 'rgba(245, 225, 217, 0.2)',
              padding: '16px',
              borderRadius: '8px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '12px',
                color: textColor
              }}>
                目标受众
              </h3>
              <p>18-25岁的Z世代女性，热爱美妆与潮流，偏好个性化、高互动UI，常用Chrome/Safari浏览器，热衷社交媒体。</p>
            </div>
            <div style={{
              flex: '1 1 300px',
              backgroundColor: isDark ? 'rgba(213, 63, 140, 0.1)' : 'rgba(255, 181, 197, 0.2)',
              padding: '16px',
              borderRadius: '8px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '12px',
                color: textColor
              }}>
                技术栈
              </h3>
              <p>前端：React.js (Next.js)，Chakra UI，Framer Motion；后端：.NET Core，PostgreSQL；AI：TensorFlow.js</p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '16px',
            color: textColor,
            paddingBottom: '8px',
            borderBottom: `1px solid ${borderColor}`
          }}>
            项目时间线
          </h2>
          <div style={{
            position: 'relative',
            padding: '32px 0',
            marginLeft: '16px'
          }}>
            {/* 垂直时间线 */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '2px',
              height: '100%',
              backgroundColor: borderColor
            }}></div>
            
            {/* 项目阶段 */}
            {projectPhases.map((phase, index) => (
              <div key={phase.id} style={{
                position: 'relative',
                marginBottom: '40px',
                paddingLeft: '32px'
              }}>
                {/* 时间点 */}
                <div style={{
                  position: 'absolute',
                  left: '-8px',
                  top: '12px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: index % 3 === 0 ? primaryColor : index % 3 === 1 ? secondaryColor : accentColor,
                  border: `2px solid ${bgColor}`,
                  zIndex: 1
                }}></div>
                
                {/* 阶段内容 */}
                <div style={{
                  backgroundColor: isDark ? 'rgba(26, 32, 44, 0.8)' : bgColor,
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                  border: `1px solid ${borderColor}`
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: textColor
                    }}>
                      {phase.name}
                    </h3>
                    <span style={{
                      backgroundColor: index % 3 === 0 ? primaryColor : index % 3 === 1 ? secondaryColor : accentColor,
                      color: isDark ? '#1A202C' : '#FFFFFF',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {phase.duration}
                    </span>
                  </div>
                  
                  <p style={{ marginBottom: '16px' }}>
                    {phase.description}
                  </p>
                  
                  <div>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: textColor
                    }}>
                      主要任务:
                    </h4>
                    <ul style={{
                      paddingLeft: '20px',
                      marginBottom: '8px'
                    }}>
                      {phase.tasks.map((task, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '16px',
            color: textColor,
            paddingBottom: '8px',
            borderBottom: `1px solid ${borderColor}`
          }}>
            风险管理
          </h2>
          <div style={{
            backgroundColor: isDark ? 'rgba(213, 63, 140, 0.1)' : 'rgba(255, 181, 197, 0.2)',
            padding: '24px',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px',
              color: textColor
            }}>
              技术风险
            </h3>
            <p style={{ marginBottom: '8px' }}>
              <strong>风险:</strong> 复杂的WebGL 3D效果可能在部分设备上性能不佳
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>缓解策略:</strong> 实现性能检测并提供 2D 降级方案，确保核心功能在各种设备上可用
            </p>
          </div>
          
          <div style={{
            backgroundColor: isDark ? 'rgba(79, 209, 197, 0.1)' : 'rgba(182, 229, 216, 0.2)',
            padding: '24px',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px',
              color: textColor
            }}>
              用户风险
            </h3>
            <p style={{ marginBottom: '8px' }}>
              <strong>风险:</strong> 设计风格和功能不符合Z世代女性用户预期
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>缓解策略:</strong> 早期进行用户研究和测试，持续收集反馈并快速迭代
            </p>
          </div>
          
          <div style={{
            backgroundColor: isDark ? 'rgba(183, 148, 244, 0.1)' : 'rgba(245, 225, 217, 0.2)',
            padding: '24px',
            borderRadius: '8px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px',
              color: textColor
            }}>
              进度风险
            </h3>
            <p style={{ marginBottom: '8px' }}>
              <strong>风险:</strong> AI功能开发和集成可能延长开发周期
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>缓解策略:</strong> 采用MVP开发模式，优先实现核心功能，AI功能可在后期迭代中优化
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

export default ProjectPlan; 