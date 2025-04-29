import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Flex, 
  Circle, 
  Divider, 
  VStack,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  List,
  ListItem,
  ListIcon,
  useDisclosure
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClipboard, FiLayers, FiCode, FiBox, FiServer, FiRefreshCw } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionCircle = motion(Circle);

const ProductLifecycle = () => {
  const [activeStage, setActiveStage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const accentColor = useColorModeValue('purple.500', 'purple.300');
  const lineColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBgColor = useColorModeValue('purple.50', 'purple.900');
  
  const stages = [
    {
      id: 1,
      name: '规划构想',
      icon: FiClipboard,
      description: '确定产品愿景、目标和范围，探索市场需求和机会',
      details: {
        objectives: '明确产品愿景和目标用户',
        activities: [
          '市场研究和竞品分析',
          '用户画像定义',
          '头脑风暴创意概念',
          '制定产品路线图'
        ],
        deliverables: [
          '产品愿景文档',
          '初步商业模式',
          '产品概念原型'
        ],
        tools: [
          'Miro（协作白板）',
          'Figma（概念原型）',
          'Google Analytics（市场数据）'
        ],
        aiStrategies: [
          '利用AI生成市场趋势分析报告',
          '通过AI辅助创建初步用户画像',
          '利用机器学习预测产品市场接受度'
        ]
      }
    },
    {
      id: 2,
      name: '需求分析',
      icon: FiLayers,
      description: '收集、分析和优先排序用户需求和功能要求',
      details: {
        objectives: '转化产品愿景为具体需求和功能集',
        activities: [
          '用户调研和访谈',
          '用户旅程映射',
          '需求分析和优先级排序',
          '用户故事编写'
        ],
        deliverables: [
          '需求规格说明书',
          '用户故事地图',
          'MoSCoW功能优先级清单'
        ],
        tools: [
          'Jira（需求管理）',
          'UserTesting（用户研究）',
          'Lucidchart（流程图）'
        ],
        aiStrategies: [
          'AI辅助用户行为分析',
          '自动化需求文档生成',
          'ML驱动的需求优先级排序'
        ]
      }
    },
    {
      id: 3,
      name: '设计',
      icon: FiLayers,
      description: '创建用户体验和界面设计，确定技术架构方案',
      details: {
        objectives: '开发用户友好的界面设计和稳健的技术架构',
        activities: [
          'UX线框图设计',
          'UI高保真设计',
          '交互设计和原型制作',
          '技术架构设计'
        ],
        deliverables: [
          'UI设计系统',
          '交互原型',
          '技术架构文档',
          'API设计规范'
        ],
        tools: [
          'Figma（UI设计）',
          'Adobe XD（原型）',
          'Whimsical（架构图）'
        ],
        aiStrategies: [
          'AI生成UI组件变体',
          '自动化可访问性检查',
          'AI辅助的用户测试分析'
        ]
      }
    },
    {
      id: 4,
      name: '开发',
      icon: FiCode,
      description: '实现产品功能，将设计转化为工作代码',
      details: {
        objectives: '根据设计和架构构建高质量产品',
        activities: [
          '前端开发（React.js）',
          '后端开发（.NET Core）',
          '数据库实现（PostgreSQL）',
          'API集成和开发'
        ],
        deliverables: [
          '功能完整的代码库',
          '组件库',
          'API文档',
          '数据库架构'
        ],
        tools: [
          'Visual Studio Code（编码）',
          'GitHub（版本控制）',
          'Docker（容器化）',
          'Azure DevOps（CI/CD）'
        ],
        aiStrategies: [
          'AI代码审查和优化',
          '自动化组件生成',
          'ML驱动的代码质量分析'
        ]
      }
    },
    {
      id: 5,
      name: '测试',
      icon: FiBox,
      description: '验证产品质量和功能，确保符合要求和标准',
      details: {
        objectives: '确保产品质量、性能和用户体验',
        activities: [
          '单元测试和集成测试',
          '用户验收测试（UAT）',
          '性能和安全测试',
          'A/B测试'
        ],
        deliverables: [
          '测试计划和用例',
          '测试报告',
          '性能基准',
          '用户反馈汇总'
        ],
        tools: [
          'Jest（前端测试）',
          'xUnit（后端测试）',
          'Lighthouse（性能测试）',
          'OWASP ZAP（安全测试）'
        ],
        aiStrategies: [
          'AI自动化测试生成',
          '智能回归测试',
          '预测性错误分析'
        ]
      }
    },
    {
      id: 6,
      name: '部署',
      icon: FiServer,
      description: '将产品发布到生产环境，确保平稳运行',
      details: {
        objectives: '安全可靠地发布产品并确保稳定运行',
        activities: [
          '部署准备和配置',
          '环境设置',
          '持续集成/持续部署',
          '监控和警报设置'
        ],
        deliverables: [
          '部署文档',
          '上线清单',
          '监控仪表板',
          '维护计划'
        ],
        tools: [
          'Azure（云服务）',
          'Jenkins（CI/CD）',
          'Kubernetes（容器编排）',
          'New Relic（监控）'
        ],
        aiStrategies: [
          'AI预测性扩展',
          '智能监控和自动修复',
          '自动化性能优化'
        ]
      }
    },
    {
      id: 7,
      name: '迭代',
      icon: FiRefreshCw,
      description: '收集用户反馈，持续改进和优化产品',
      details: {
        objectives: '基于数据和用户反馈持续优化产品',
        activities: [
          '用户反馈收集',
          '数据分析和用户行为跟踪',
          '功能优先级重新评估',
          '迭代计划制定'
        ],
        deliverables: [
          '数据分析报告',
          '迭代计划',
          '产品路线图更新',
          '性能改进指标'
        ],
        tools: [
          'Mixpanel（分析）',
          'Hotjar（用户行为）',
          'UserVoice（反馈管理）',
          'Tableau（数据可视化）'
        ],
        aiStrategies: [
          'AI推荐引擎优化',
          '自动化用户细分和分析',
          '预测性用户行为建模'
        ]
      }
    }
  ];

  const handleStageClick = (stage) => {
    setActiveStage(stage);
    onOpen();
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Box textAlign="center" mb={16}>
        <Heading as="h1" size="2xl" mb={4}>
          产品生命周期流程
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="800px" mx="auto">
          从构想到迭代的完整产品开发流程，清晰定义每个阶段的活动与交付物
        </Text>
        <Text fontSize="sm" color="gray.500" mt={2}>
          © domiyoung__
        </Text>
      </Box>

      <Box position="relative" px={4} py={10}>
        {/* 水平流程线 */}
        <Box 
          position="absolute" 
          top="50%" 
          left="0" 
          right="0" 
          height="3px" 
          bg={lineColor} 
          zIndex={1}
        />
        
        {/* 阶段节点 */}
        <Flex justifyContent="space-between" position="relative" zIndex={2}>
          {stages.map((stage) => (
            <VStack key={stage.id} spacing={4}>
              <MotionCircle
                size="60px"
                bg={bgColor}
                border="3px solid"
                borderColor={accentColor}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: hoverBgColor,
                  boxShadow: "0 0 12px rgba(159, 122, 234, 0.6)" 
                }}
                cursor="pointer"
                onClick={() => handleStageClick(stage)}
              >
                <Box as={stage.icon} size="24px" color={accentColor} />
              </MotionCircle>
              <Text fontWeight="600" textAlign="center" fontSize="sm">
                {stage.name}
              </Text>
            </VStack>
          ))}
        </Flex>
      </Box>

      {/* 阶段简介卡片 */}
      <Flex wrap="wrap" justify="space-between" mt={16}>
        {stages.map((stage) => (
          <MotionBox 
            key={stage.id}
            width={["100%", "48%", "30%"]}
            bg={bgColor}
            p={6}
            borderRadius="lg"
            boxShadow="md"
            mb={6}
            whileHover={{ 
              y: -5,
              boxShadow: "lg" 
            }}
            cursor="pointer"
            onClick={() => handleStageClick(stage)}
          >
            <Flex align="center" mb={3}>
              <Circle size="40px" bg={`${accentColor}30`} mr={4}>
                <Box as={stage.icon} size="20px" color={accentColor} />
              </Circle>
              <Heading size="md">{stage.name}</Heading>
            </Flex>
            <Text color="gray.600">{stage.description}</Text>
          </MotionBox>
        ))}
      </Flex>

      {/* 阶段详情弹窗 */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay backdropFilter="blur(3px)" />
        <ModalContent>
          {activeStage && (
            <>
              <ModalHeader>
                <Flex align="center">
                  <Circle size="40px" bg={`${accentColor}30`} mr={4}>
                    <Box as={activeStage.icon} size="20px" color={accentColor} />
                  </Circle>
                  <Heading size="lg">{activeStage.name}</Heading>
                </Flex>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text fontSize="lg" fontWeight="500" mb={4}>
                  {activeStage.description}
                </Text>
                
                <Heading size="sm" mb={2} mt={6}>阶段目标</Heading>
                <Text mb={4}>{activeStage.details.objectives}</Text>
                
                <Heading size="sm" mb={2} mt={6}>关键活动</Heading>
                <List spacing={2} mb={4}>
                  {activeStage.details.activities.map((activity, index) => (
                    <ListItem key={index} display="flex" alignItems="center">
                      <ListIcon as={FiCheckCircle} color={accentColor} />
                      {activity}
                    </ListItem>
                  ))}
                </List>
                
                <Heading size="sm" mb={2} mt={6}>输出物</Heading>
                <List spacing={2} mb={4}>
                  {activeStage.details.deliverables.map((deliverable, index) => (
                    <ListItem key={index} display="flex" alignItems="center">
                      <ListIcon as={FiCheckCircle} color={accentColor} />
                      {deliverable}
                    </ListItem>
                  ))}
                </List>
                
                <Heading size="sm" mb={2} mt={6}>推荐工具</Heading>
                <List spacing={2} mb={4}>
                  {activeStage.details.tools.map((tool, index) => (
                    <ListItem key={index} display="flex" alignItems="center">
                      <ListIcon as={FiCheckCircle} color={accentColor} />
                      {tool}
                    </ListItem>
                  ))}
                </List>
                
                <Heading size="sm" mb={2} mt={6}>AI优化策略</Heading>
                <List spacing={2} mb={4}>
                  {activeStage.details.aiStrategies.map((strategy, index) => (
                    <ListItem key={index} display="flex" alignItems="center">
                      <ListIcon as={FiCheckCircle} color={accentColor} />
                      {strategy}
                    </ListItem>
                  ))}
                </List>
                
                <Text fontSize="sm" color="gray.500" textAlign="right" mt={4}>
                  文档版权归属 © domiyoung__
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>关闭</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ProductLifecycle; 