import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

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
      }
    }
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