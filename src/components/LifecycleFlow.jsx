import React, { useState } from 'react';
import { Box, Flex, Text, Button, useMediaQuery } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { useColorMode } from '@chakra-ui/color-mode';
import { motion } from 'framer-motion';

const LifecycleFlow = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activePhase, setActivePhase] = useState(null);

  // 样式变量
  const textColor = isDark ? '#E2E8F0' : '#1D1D1F';
  const bgColor = isDark ? '#1A202C' : '#FFFFFF';
  const secondaryTextColor = isDark ? '#A0AEC0' : '#86868B';
  const borderColor = isDark ? '#2D3748' : '#E5E5E7';
  const accentGradient = isDark 
    ? 'linear-gradient(135deg, #B794F4 0%, #D53F8C 50%, #4FD1C5 100%)'
    : 'linear-gradient(135deg, #F5E1D9 0%, #FFB5C5 50%, #B6E5D8 100%)';
  const shadowColor = isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)';
  const phaseColors = [
    { bg: isDark ? 'rgba(183, 148, 244, 0.15)' : 'rgba(245, 225, 217, 0.3)', 
      border: isDark ? 'rgba(183, 148, 244, 0.4)' : 'rgba(245, 225, 217, 0.8)',
      icon: '🔍' },
    { bg: isDark ? 'rgba(213, 63, 140, 0.15)' : 'rgba(255, 181, 197, 0.3)', 
      border: isDark ? 'rgba(213, 63, 140, 0.4)' : 'rgba(255, 181, 197, 0.8)',
      icon: '📊' },
    { bg: isDark ? 'rgba(79, 209, 197, 0.15)' : 'rgba(182, 229, 216, 0.3)', 
      border: isDark ? 'rgba(79, 209, 197, 0.4)' : 'rgba(182, 229, 216, 0.8)',
      icon: '🎨' },
    { bg: isDark ? 'rgba(144, 205, 244, 0.15)' : 'rgba(173, 216, 230, 0.3)', 
      border: isDark ? 'rgba(144, 205, 244, 0.4)' : 'rgba(173, 216, 230, 0.8)',
      icon: '💻' },
    { bg: isDark ? 'rgba(144, 205, 244, 0.15)' : 'rgba(230, 210, 173, 0.3)', 
      border: isDark ? 'rgba(144, 205, 244, 0.4)' : 'rgba(230, 210, 173, 0.8)',
      icon: '🧪' },
    { bg: isDark ? 'rgba(144, 205, 244, 0.15)' : 'rgba(181, 228, 202, 0.3)', 
      border: isDark ? 'rgba(144, 205, 244, 0.4)' : 'rgba(181, 228, 202, 0.8)',
      icon: '🚀' },
    { bg: isDark ? 'rgba(144, 205, 244, 0.15)' : 'rgba(243, 166, 131, 0.3)', 
      border: isDark ? 'rgba(144, 205, 244, 0.4)' : 'rgba(243, 166, 131, 0.8)',
      icon: '🔄' }
  ];

  // 生命周期阶段数据
  const lifeCyclePhases = [
    {
      id: 'planning',
      name: '规划构想',
      description: '产品愿景制定与可行性评估',
      details: {
        objective: '明确产品愿景、目标市场与核心价值主张',
        activities: ['市场调研与竞品分析', '用户需求初步收集', '产品概念头脑风暴', '确定价值主张', '初步可行性评估'],
        deliverables: ['产品愿景文档', '市场分析报告', '高层概念原型', '初步投资回报评估'],
        tools: ['Miro (在线协作白板)', 'Figma (概念原型)', 'Market Research Tools', 'SWOT分析模板'],
        aiOptimization: '利用AI生成市场趋势分析，预测目标用户行为模式，生成初步产品概念可视化效果。'
      }
    },
    {
      id: 'requirements',
      name: '需求分析',
      description: '用户需求收集与功能优先级排序',
      details: {
        objective: '深入了解用户需求，定义产品功能与技术要求',
        activities: ['用户访谈与问卷调查', '用户画像创建', 'MoSCoW需求分类', '功能地图绘制', '技术可行性评估'],
        deliverables: ['详细用户画像', '功能需求文档', '用户故事地图', '技术要求规格', '产品路线图'],
        tools: ['Jira/Azure DevOps (需求管理)', 'UserTesting.com (用户研究)', 'Lucidchart (流程图)', 'Google Analytics (数据分析)'],
        aiOptimization: '使用AI分析用户反馈数据，识别模式和优先需求，自动生成初步用户画像和需求分类。'
      }
    },
    {
      id: 'design',
      name: '设计',
      description: 'UI/UX设计与技术架构规划',
      details: {
        objective: '创建直观的用户体验和健壮的技术架构',
        activities: ['信息架构设计', 'UI组件设计系统创建', '交互设计与原型', '技术架构设计', '数据模型设计'],
        deliverables: ['设计系统', '高保真UI设计', '交互原型', '技术架构图', '数据库ER图'],
        tools: ['Figma/Adobe XD (UI设计)', 'Principle/ProtoPie (原型动效)', 'Draw.io (架构图)', 'Entity Framework (数据建模)'],
        aiOptimization: '利用AI生成UI设计变体，辅助创建符合Z世代审美的视觉元素，自动检测设计一致性问题。'
      }
    },
    {
      id: 'development',
      name: '开发',
      description: '前后端实现与集成',
      details: {
        objective: '高质量实现产品功能，确保代码可维护性',
        activities: ['前端组件开发', 'API开发与集成', '数据库实现', 'AI功能集成', '持续集成管道搭建'],
        deliverables: ['功能完整的代码库', 'API文档', '单元测试', '技术文档', '构建流水线'],
        tools: ['React.js/Next.js (前端)', '.NET Core (后端)', 'PostgreSQL (数据库)', 'Azure/AWS (云服务)', 'GitHub Actions (CI/CD)'],
        aiOptimization: '使用AI辅助代码生成，优化性能瓶颈，实时代码审查和漏洞检测。'
      }
    },
    {
      id: 'testing',
      name: '测试',
      description: '功能验证与用户体验测试',
      details: {
        objective: '验证产品功能、性能和用户体验',
        activities: ['功能测试', '性能测试', '兼容性测试', '安全测试', '用户验收测试'],
        deliverables: ['测试计划', '测试用例', '测试结果报告', 'Bug跟踪文档', '性能报告'],
        tools: ['Jest/React Testing Library (前端测试)', 'NUnit (后端测试)', 'Selenium (E2E测试)', 'JMeter (性能测试)', 'OWASP ZAP (安全测试)'],
        aiOptimization: 'AI生成测试用例，自动识别潜在边缘情况，模拟用户行为进行测试，预测潜在故障点。'
      }
    },
    {
      id: 'deployment',
      name: '部署',
      description: '产品发布与运维支持',
      details: {
        objective: '平稳高效地将产品发布到生产环境',
        activities: ['部署策略制定', '环境配置', '数据迁移', '发布管理', '监控系统搭建'],
        deliverables: ['部署文档', '发布说明', '监控仪表板', '备份恢复计划', '运维手册'],
        tools: ['Docker/Kubernetes (容器化)', 'Azure/AWS (云服务)', 'New Relic/Datadog (监控)', 'CloudFlare (CDN)', 'Terraform (基础设施即代码)'],
        aiOptimization: 'AI预测系统负载和资源需求，优化部署配置，提前识别潜在部署风险，智能伸缩资源。'
      }
    },
    {
      id: 'iteration',
      name: '迭代',
      description: '持续优化与功能扩展',
      details: {
        objective: '基于用户反馈持续改进产品',
        activities: ['用户行为分析', '反馈收集与分析', '功能优先级重排', '新特性开发', 'A/B测试'],
        deliverables: ['用户行为报告', '迭代计划', '产品更新日志', '性能改进报告', '新功能规格'],
        tools: ['Google Analytics/Mixpanel (分析)', 'Hotjar (热图分析)', 'UserVoice (用户反馈)', 'Optimizely (A/B测试)', 'LaunchDarkly (特性开关)'],
        aiOptimization: 'AI分析用户行为数据，预测趋势变化，识别改进机会，推荐优化策略和新功能。'
      }
    }
  ];

  // 处理阶段点击事件
  const handlePhaseClick = (phase) => {
    setActivePhase(phase);
    onOpen();
  };

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
        maxWidth: '1200px',
        margin: '0 auto',
        background: bgColor,
        borderRadius: '12px',
        boxShadow: `0 4px 6px ${shadowColor}`,
        padding: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 装饰背景元素 */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '-100px',
          width: '300px',
          height: '300px',
          background: isDark ? 'rgba(183, 148, 244, 0.05)' : 'rgba(245, 225, 217, 0.2)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 0
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          right: '-80px',
          width: '250px',
          height: '250px',
          background: isDark ? 'rgba(79, 209, 197, 0.05)' : 'rgba(182, 229, 216, 0.2)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 0
        }}></div>

        <header style={{
          marginBottom: '40px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: '32px',
              fontWeight: '600',
              marginBottom: '16px',
              color: textColor,
              background: isDark 
                ? '-webkit-linear-gradient(135deg, #B794F4 0%, #D53F8C 50%, #4FD1C5 100%)' 
                : '-webkit-linear-gradient(135deg, #F5E1D9 0%, #FFB5C5 50%, #B6E5D8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
            产品生命周期流程
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: '16px',
              color: secondaryTextColor,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
            从概念到上线的七个关键阶段，点击每个阶段了解详情
          </motion.p>
        </header>

        {/* 生命周期流程图 - 移动端 */}
        {isMobile && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '32px',
            position: 'relative',
            zIndex: 1
          }}>
            {lifeCyclePhases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handlePhaseClick(phase)}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  backgroundColor: phaseColors[index].bg,
                  border: `1px solid ${phaseColors[index].border}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  transform: 'scale(1)',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  {phaseColors[index].icon}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    {phase.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: secondaryTextColor
                  }}>
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 生命周期流程图 - 桌面端 */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              position: 'relative',
              padding: '40px 0',
              marginBottom: '40px',
              zIndex: 1
            }}
          >
            {/* 连接线 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50px',
              right: '50px',
              height: '4px',
              background: accentGradient,
              transform: 'translateY(-50%)',
              zIndex: 0,
              borderRadius: '2px'
            }}></div>
            
            {/* 阶段节点 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 1
            }}>
              {lifeCyclePhases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  onClick={() => handlePhaseClick(phase)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    width: '120px'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: phaseColors[index].bg,
                    border: `2px solid ${phaseColors[index].border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    marginBottom: '12px',
                    boxShadow: `0 4px 8px ${shadowColor}`,
                    transition: 'all 0.3s ease'
                  }}>
                    {phaseColors[index].icon}
                  </div>
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    textAlign: 'center',
                    marginBottom: '4px'
                  }}>
                    {phase.name}
                  </h3>
                  <p style={{
                    fontSize: '12px',
                    color: secondaryTextColor,
                    textAlign: 'center'
                  }}>
                    {phase.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 阶段详情介绍 */}
        <div style={{
          padding: '24px',
          borderRadius: '12px',
          backgroundColor: isDark ? 'rgba(26, 32, 44, 0.4)' : 'rgba(247, 250, 252, 0.8)',
          border: `1px solid ${borderColor}`,
          marginBottom: '24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '500',
            marginBottom: '12px'
          }}>
            点击任一阶段节点，了解该阶段的详细活动、交付物与最佳实践
          </h2>
          <p style={{
            fontSize: '14px',
            color: secondaryTextColor
          }}>
            每个阶段都提供了关键活动、工具建议、AI优化策略和版权处理指南
          </p>
        </div>

        {/* 阶段详情弹窗 */}
        {activePhase && (
          <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent
              bg={isDark ? '#1A202C' : '#FFFFFF'}
              color={textColor}
              borderRadius="12px"
              boxShadow={`0 4px 20px ${shadowColor}`}
              border={`1px solid ${borderColor}`}
              maxW={isMobile ? "90%" : "800px"}
            >
              <ModalHeader
                paddingY="20px"
                background={isDark ? 'rgba(26, 32, 44, 0.8)' : 'rgba(247, 250, 252, 0.8)'}
                borderTopLeftRadius="12px"
                borderTopRightRadius="12px"
                borderBottom={`1px solid ${borderColor}`}
              >
                <Flex alignItems="center" gap={3}>
                  <Box 
                    p={2} 
                    borderRadius="full" 
                    fontSize="xl" 
                    bg={lifeCyclePhases.indexOf(activePhase) !== -1 ? 
                      phaseColors[lifeCyclePhases.indexOf(activePhase)].bg : 'gray.100'}
                  >
                    {lifeCyclePhases.indexOf(activePhase) !== -1 ? 
                      phaseColors[lifeCyclePhases.indexOf(activePhase)].icon : '🔍'}
                  </Box>
                  <Box>
                    <Text fontSize="lg" fontWeight="bold">{activePhase.name}</Text>
                    <Text fontSize="sm" color={secondaryTextColor}>{activePhase.description}</Text>
                  </Box>
                </Flex>
              </ModalHeader>
              <ModalCloseButton top="20px" right="16px" />
              <ModalBody padding="24px">
                <Box mb={6}>
                  <Text fontWeight="600" mb={2} fontSize="16px">目标</Text>
                  <Box 
                    p={3} 
                    bg={isDark ? 'rgba(26, 32, 44, 0.3)' : 'rgba(247, 250, 252, 0.6)'} 
                    borderRadius="md"
                    borderLeft="4px solid"
                    borderLeftColor={isDark ? "#B794F4" : "#F5E1D9"}
                  >
                    {activePhase.details.objective}
                  </Box>
                </Box>

                <Box mb={6}>
                  <Text fontWeight="600" mb={2} fontSize="16px">关键活动</Text>
                  <Box
                    p={4}
                    bg={isDark ? 'rgba(26, 32, 44, 0.3)' : 'rgba(247, 250, 252, 0.6)'}
                    borderRadius="md"
                  >
                    {activePhase.details.activities.map((activity, index) => (
                      <Flex key={index} mb={index < activePhase.details.activities.length - 1 ? 2 : 0} align="center">
                        <Box 
                          w="24px" 
                          h="24px" 
                          borderRadius="full" 
                          bg={isDark ? 'rgba(183, 148, 244, 0.3)' : 'rgba(245, 225, 217, 0.5)'} 
                          display="flex" 
                          alignItems="center" 
                          justifyContent="center"
                          fontSize="12px"
                          mr={3}
                        >
                          {index + 1}
                        </Box>
                        <Text fontSize="14px">{activity}</Text>
                      </Flex>
                    ))}
                  </Box>
                </Box>

                <Box mb={6}>
                  <Text fontWeight="600" mb={2} fontSize="16px">交付物</Text>
                  <Flex flexWrap="wrap" gap={2}>
                    {activePhase.details.deliverables.map((deliverable, index) => (
                      <Box
                        key={index}
                        px={3}
                        py={2}
                        borderRadius="full"
                        fontSize="13px"
                        bg={isDark ? 'rgba(79, 209, 197, 0.1)' : 'rgba(182, 229, 216, 0.3)'}
                        border="1px solid"
                        borderColor={isDark ? 'rgba(79, 209, 197, 0.3)' : 'rgba(182, 229, 216, 0.8)'}
                      >
                        {deliverable}
                      </Box>
                    ))}
                  </Flex>
                </Box>

                <Box mb={6}>
                  <Text fontWeight="600" mb={2} fontSize="16px">推荐工具</Text>
                  <Flex flexWrap="wrap" gap={2}>
                    {activePhase.details.tools.map((tool, index) => (
                      <Box
                        key={index}
                        px={3}
                        py={2}
                        borderRadius="md"
                        fontSize="13px"
                        bg={isDark ? 'rgba(26, 32, 44, 0.3)' : 'white'}
                        border="1px solid"
                        borderColor={borderColor}
                        boxShadow="sm"
                      >
                        {tool}
                      </Box>
                    ))}
                  </Flex>
                </Box>

                <Box mb={6}>
                  <Text fontWeight="600" mb={2} fontSize="16px">AI优化策略</Text>
                  <Box
                    p={4}
                    bg={isDark ? 'rgba(183, 148, 244, 0.1)' : 'rgba(245, 225, 217, 0.2)'}
                    borderRadius="md"
                    fontSize="14px"
                  >
                    {activePhase.details.aiOptimization}
                  </Box>
                </Box>

                <Box 
                  mt={6} 
                  pt={4} 
                  borderTop={`1px solid ${borderColor}`}
                  textAlign="center"
                  fontSize="13px"
                  color={secondaryTextColor}
                >
                  <Text>© domiyoung__ - 版权所有</Text>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

        <footer style={{
          marginTop: '40px',
          textAlign: 'center',
          color: secondaryTextColor,
          fontSize: '14px',
          borderTop: `1px solid ${borderColor}`,
          paddingTop: '24px',
          position: 'relative',
          zIndex: 1
        }}>
          <p>© domiyoung__ - 版权所有</p>
        </footer>
      </div>
    </div>
  );
};

export default LifecycleFlow; 