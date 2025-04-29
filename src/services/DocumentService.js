/**
 * DocumentService.js - 处理文档相关服务
 * © domiyoung__
 */

// 将分类转换为中文名称
const categoryMap = {
  '系统架构': '系统架构',
  '后端文档': '后端文档',
  '前端文档': '前端文档',
  '产品概述': '产品概述',
  '功能实现': '功能实现',
  '测试与部署': '测试与部署',
  '用户界面': '用户界面',
  '项目管理': '项目管理',
  'UX设计': 'UX设计',
  '项目蓝图': '项目蓝图',
  '详设': '详设',
  '后端概设': '后端概设',
  '前端概设': '前端概设',
  '概要设计': '概要设计',
  '跨域文档': '跨域文档'
};

// 从目录名称获取分类中文名
const getCategoryName = (dirName) => {
  return categoryMap[dirName] || dirName;
};

// 获取文档标题和描述
const extractMetadataFromContent = (content) => {
  const title = content.match(/^#\s+(.*)/m)?.[1] || 'Untitled Document';
  
  // 尝试提取前100个字符作为描述，排除标题和特殊符号
  const descriptionMatch = content.replace(/^#\s+.*$/m, '')
    .replace(/^\*.*\*$/mg, '')
    .replace(/^>.*$/mg, '')
    .replace(/^\s+$/mg, '')
    .trim()
    .match(/^(.{1,150})/s);
  
  const description = descriptionMatch ? descriptionMatch[1].trim() + '...' : '无描述信息';
  
  // 尝试提取文档中的标签
  const tagsMatch = content.match(/tags:\s*\[(.*)\]/i);
  const tags = tagsMatch 
    ? tagsMatch[1].split(',').map(tag => tag.trim().replace(/['"]/g, ''))
    : [];
  
  // 尝试提取日期
  const dateMatch = content.match(/更新于(\d{4}[-年]\d{1,2}[-月]\d{1,2})/);
  const date = dateMatch ? dateMatch[1].replace(/年|月/g, '-').replace(/日/, '') : new Date().toISOString().slice(0, 10);
  
  return {
    title,
    description,
    tags,
    date
  };
};

// 获取文档内容
export const getDocumentContent = async (path) => {
  try {
    const response = await fetch(`/docs/${path}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error('获取文档内容失败:', error);
    throw error;
  }
};

// 提取所有文档的元数据
const extractDocsFromCategory = async (categoryPath) => {
  try {
    // 在实际应用中，这里应该是一个API调用
    // 但为了演示目的，我们直接使用fetch请求来获取文件列表
    
    // 获取目录下的所有文件
    const response = await fetch(`/api/docs/${categoryPath}`);
    
    if (!response.ok) {
      console.warn(`无法获取${categoryPath}下的文档列表`);
      return [];
    }
    
    const files = await response.json();
    
    // 对每个文件提取元数据
    const docsPromises = files.map(async (file) => {
      if (!file.endsWith('.md')) return null;
      
      try {
        const content = await getDocumentContent(`${categoryPath}/${file}`);
        const metadata = extractMetadataFromContent(content);
        
        return {
          ...metadata,
          path: `${categoryPath}/${file}`,
          category: categoryPath
        };
      } catch (error) {
        console.error(`处理文档${file}时出错:`, error);
        return null;
      }
    });
    
    const docs = await Promise.all(docsPromises);
    return docs.filter(doc => doc !== null);
  } catch (error) {
    console.error(`获取${categoryPath}类别的文档失败:`, error);
    return [];
  }
};

// 所有文档的元数据，格式为 { category, documents }
export const getAllDocuments = async () => {
  const categories = [
    '系统架构', 
    '后端文档', 
    '前端文档', 
    '产品概述', 
    '功能实现', 
    '测试与部署', 
    '用户界面', 
    '项目管理',
    'UX设计',
    '项目蓝图',
    '详设',
    '后端概设',
    '前端概设',
    '概要设计',
    '跨域文档'
  ];
  
  try {
    // 尝试从服务器获取文档列表
    const response = await fetch('/api/documents');
    
    if (response.ok) {
      return await response.json();
    }
    
    // 如果API调用失败，通过路径解析生成文档列表
    const categoriesPromises = categories.map(async (category) => {
      const documents = await extractDocsFromCategory(category);
      return {
        category,
        documents: documents.length > 0 ? documents : generateSampleDocuments(category)
      };
    });
    
    return await Promise.all(categoriesPromises);
  } catch (error) {
    console.error('获取文档列表失败:', error);
    // 发生错误时返回示例数据
    return categories.map(category => {
      return {
        category,
        documents: generateSampleDocuments(category)
      };
    });
  }
};

// 获取特定类别的文档
export const getDocumentsByCategory = async (category) => {
  try {
    const allDocs = await getAllDocuments();
    const categoryDocs = allDocs.find(c => c.category === category);
    return categoryDocs ? categoryDocs.documents : [];
  } catch (error) {
    console.error(`获取${category}文档失败:`, error);
    return generateSampleDocuments(category);
  }
};

// 生成示例文档数据
const generateSampleDocuments = (category) => {
  switch (category) {
    case '系统架构':
      return [
        {
          title: '系统架构概述',
          description: '概述系统架构的整体设计及各组件间的交互关系',
          path: '系统架构/系统架构概述.md',
          date: '2025-05-02',
          tags: ['架构', '设计']
        },
        {
          title: '技术栈选型',
          description: '详细说明系统所使用的技术栈及其选择理由',
          path: '系统架构/技术栈选型.md',
          date: '2025-05-01',
          tags: ['技术栈', 'React', '.NET']
        }
      ];
    
    case '前端文档':
      return [
        {
          title: '前端架构设计',
          description: '前端架构设计文档，包含组件架构、状态管理、路由设计等内容',
          path: '前端文档/前端架构设计.md',
          date: '2025-05-02',
          tags: ['前端', '架构']
        },
        {
          title: '组件设计规范',
          description: '前端组件设计规范，包含组件结构、命名规范、交互规则等',
          path: '前端文档/组件设计规范.md',
          date: '2025-05-01',
          tags: ['组件', '规范']
        }
      ];
    
    case '后端文档':
      return [
        {
          title: '后端API设计',
          description: '后端API设计文档，包含接口规范、认证机制、数据格式等',
          path: '后端文档/后端API设计.md',
          date: '2025-05-02',
          tags: ['API', '后端']
        },
        {
          title: '数据库设计',
          description: '数据库设计文档，包含表结构、索引设计、查询优化等',
          path: '后端文档/数据库设计.md',
          date: '2025-05-01',
          tags: ['数据库', 'SQL']
        }
      ];
      
    default:
      return [
        {
          title: `${category}示例文档1`,
          description: `这是${category}分类下的示例文档1`,
          path: `${category}/示例文档1.md`,
          date: '2025-05-02',
          tags: ['示例', category]
        },
        {
          title: `${category}示例文档2`,
          description: `这是${category}分类下的示例文档2`,
          path: `${category}/示例文档2.md`,
          date: '2025-05-01',
          tags: ['示例', category]
        }
      ];
  }
};

export default {
  getAllDocuments,
  getDocumentsByCategory,
  getDocumentContent
}; 