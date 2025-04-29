import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import Markdown from 'vite-plugin-markdown';

// 获取pages目录下的HTML文件
const pagesDirectory = path.resolve(__dirname, './pages');
const pagesInput = {};
if (fs.existsSync(pagesDirectory)) {
  const pages = fs.readdirSync(pagesDirectory)
    .filter(file => file.endsWith('.html'));
  
  pages.forEach(page => {
    pagesInput[page.replace('.html', '')] = path.resolve(__dirname, `./pages/${page}`);
  });
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    }),
    Markdown.plugin({
      mode: ['html', 'toc'],
      markdownIt: {
        html: true,
        linkify: true,
        typographer: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      // 处理页面路径
      '/pages': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      // 需要代理的真实后端API可以在这里配置
    },
    // 添加自定义中间件来模拟文档API
    middlewares: [
      (req, res, next) => {
        // 处理文档目录API
        if (req.url.startsWith('/api/docs/')) {
          const category = req.url.replace('/api/docs/', '');
          const docsDir = path.resolve(__dirname, 'docs', category);
          
          try {
            if (fs.existsSync(docsDir) && fs.lstatSync(docsDir).isDirectory()) {
              const files = fs.readdirSync(docsDir);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(files));
              return;
            }
          } catch (error) {
            console.error(`读取目录${docsDir}失败:`, error);
          }
          
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Directory not found' }));
          return;
        }
        
        // 处理所有文档API
        if (req.url === '/api/documents') {
          try {
            const docsDir = path.resolve(__dirname, 'docs');
            const categories = fs.readdirSync(docsDir).filter(item => {
              const itemPath = path.join(docsDir, item);
              return fs.lstatSync(itemPath).isDirectory();
            });
            
            // 简单返回目录结构，实际应用中这里可能需要更复杂的逻辑
            const result = categories.map(category => {
              const categoryPath = path.join(docsDir, category);
              let files = [];
              
              try {
                files = fs.readdirSync(categoryPath)
                  .filter(file => file.endsWith('.md'))
                  .map(file => ({ 
                    name: file,
                    path: `${category}/${file}`
                  }));
              } catch (error) {
                console.error(`读取${categoryPath}下的文件失败:`, error);
              }
              
              return {
                category,
                files
              };
            });
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
            return;
          } catch (error) {
            console.error('获取文档列表失败:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to list documents' }));
            return;
          }
        }
        
        next();
      }
    ]
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ...pagesInput
      },
    },
  },
}); 