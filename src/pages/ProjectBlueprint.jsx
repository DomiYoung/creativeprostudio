import React, { useState, useEffect } from 'react';
import DocumentLayout from '../components/DocumentLayout';
import { marked } from 'marked';

const ProjectBlueprint = () => {
  const [blueprintContent, setBlueprintContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlueprint = async () => {
      try {
        // 从public目录加载Markdown文件
        const response = await fetch('/markdown/ux/DesignSystemOverview.md');
        if (response.ok) {
          const text = await response.text();
          // 配置marked选项
          marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true
          });
          const html = marked.parse(text);
          setBlueprintContent(html);
        } else {
          console.error('无法加载系统蓝图内容:', response.status);
          setBlueprintContent('<p>加载系统蓝图内容时出错，请稍后再试</p>');
        }
      } catch (error) {
        console.error('加载系统蓝图内容时出错:', error);
        setBlueprintContent('<p>加载系统蓝图内容时出错，请稍后再试</p>');
      } finally {
        setIsLoading(false);
      }
    };

    loadBlueprint();
  }, []);

  return (
    <DocumentLayout 
      title="系统蓝图"
      copyright="© domiyoung__ 版权所有 | 本系统蓝图仅供授权用户参考，未经许可不得分享或转载"
    >
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: blueprintContent }} 
        />
      )}
    </DocumentLayout>
  );
};

export default ProjectBlueprint; 