// CreativePro Studio 导航组件
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面路径
    const currentPath = window.location.pathname;
    
    // 创建导航栏
    const nav = document.createElement('div');
    nav.className = 'kimtrue-nav';
    nav.innerHTML = `
        <a href="../index.html" class="nav-logo">CreativePro <span>Studio</span></a>
        <div class="nav-links">
            <a href="../pages/projects.html" class="${currentPath.includes('projects.html') || currentPath.includes('project-detail.html') || currentPath.includes('project-group.html') ? 'active' : ''}">
                <i class="fas fa-folder"></i> Projects
            </a>
            <a href="../pages/master-library.html" class="${currentPath.includes('master-library.html') ? 'active' : ''}">
                <i class="fas fa-palette"></i> Templates
            </a>
            <a href="../pages/asset-library.html" class="${currentPath.includes('asset-library.html') || currentPath.includes('material-library.html') ? 'active' : ''}">
                <i class="fas fa-images"></i> Assets
            </a>
            <a href="../pages/canvas-editor.html" class="${currentPath.includes('canvas-editor.html') ? 'active' : ''}">
                <i class="fas fa-edit"></i> Canvas
            </a>
            <a href="../pages/batch-center.html" class="${currentPath.includes('batch-center.html') ? 'active' : ''}">
                <i class="fas fa-file-export"></i> Export
            </a>
        </div>
        <div class="nav-user">
            <span class="user-name">Domi</span>
            <div class="user-avatar">
                <span>D</span>
            </div>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --brand-color: #F5E1D9;
            --brand-color-alpha: rgba(245, 225, 217, 0.1);
            --brand-color-text: #4A4A4A;
        }
        
        .kimtrue-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            border-bottom: 1px solid #E5E5E7;
            padding: 0 24px;
            height: 64px;
            position: sticky;
            top: 0;
            z-index: 1000;
            font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
        }
        
        .nav-logo {
            font-weight: 600;
            font-size: 16px;
            color: #1D1D1F;
            text-decoration: none;
            display: flex;
            align-items: center;
        }
        
        .nav-logo span {
            color: var(--brand-color);
            margin-left: 2px;
        }
        
        .nav-links {
            display: flex;
            align-items: center;
            gap: 24px;
        }
        
        .nav-links a {
            font-size: 14px;
            color: #636366;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 12px;
            border-radius: 10px;
            transition: all 0.2s;
        }
        
        .nav-links a:hover {
            color: #1D1D1F;
            background-color: #F5F5F7;
        }
        
        .nav-links a.active {
            color: var(--brand-color-text);
            background-color: var(--brand-color-alpha);
        }
        
        .nav-user {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .user-name {
            font-size: 14px;
            color: #636366;
        }
        
        .user-avatar {
            width: 32px;
            height: 32px;
            border-radius: 16px;
            background-color: var(--brand-color);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }
    `;
    
    // 将导航和样式添加到页面
    document.body.prepend(nav);
    document.head.appendChild(style);

    // 为移动设备添加响应式导航
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <a href="../pages/projects.html" class="${currentPath.includes('projects.html') || currentPath.includes('project-detail.html') || currentPath.includes('project-group.html') ? 'active' : ''}">
            <i class="fas fa-folder"></i>
            <span>Projects</span>
        </a>
        <a href="../pages/master-library.html" class="${currentPath.includes('master-library.html') ? 'active' : ''}">
            <i class="fas fa-palette"></i>
            <span>Templates</span>
        </a>
        <a href="../pages/asset-library.html" class="${currentPath.includes('asset-library.html') || currentPath.includes('material-library.html') ? 'active' : ''}">
            <i class="fas fa-images"></i>
            <span>Assets</span>
        </a>
        <a href="../pages/canvas-editor.html" class="${currentPath.includes('canvas-editor.html') ? 'active' : ''}">
            <i class="fas fa-edit"></i>
            <span>Canvas</span>
        </a>
        <a href="../pages/batch-center.html" class="${currentPath.includes('batch-center.html') ? 'active' : ''}">
            <i class="fas fa-file-export"></i>
            <span>Export</span>
        </a>
    `;
    
    // 移动导航样式
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        .mobile-nav {
            display: none;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 64px;
            background-color: white;
            border-top: 1px solid #E5E5E7;
            z-index: 1000;
            justify-content: space-around;
            align-items: center;
            font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
        }
        
        .mobile-nav a {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #636366;
            text-decoration: none;
            flex: 1;
            height: 100%;
            font-size: 12px;
            gap: 4px;
        }
        
        .mobile-nav a i {
            font-size: 18px;
        }
        
        .mobile-nav a.active {
            color: var(--brand-color-text);
        }
        
        @media (max-width: 768px) {
            .kimtrue-nav .nav-links {
                display: none;
            }
            
            .mobile-nav {
                display: flex;
            }
        }
    `;
    
    document.body.appendChild(mobileNav);
    document.head.appendChild(mobileStyle);
});

// 主导航配置
const mainNav = [
    {
        id: 'home',
        name: '首页',
        link: '../index.html',
        icon: 'fas fa-home'
    },
    {
        id: 'projects',
        name: '项目管理',
        link: 'projects.html',
        icon: 'fas fa-project-diagram'
    },
    {
        id: 'assets',
        name: '素材库',
        link: 'asset-library.html',
        icon: 'fas fa-photo-video'
    },
    {
        id: 'workflow',
        name: '工作流',
        link: 'workflow-steps.html',
        icon: 'fas fa-cogs'
    },
    {
        id: 'analytics',
        name: '数据分析',
        link: 'analytics-report.html',
        icon: 'fas fa-chart-bar'
    }
];

// 分类与颜色映射 
const categoryColors = {
    'design': {
        bgColor: '#F5E1D9', // 柔粉米色替代原来的橙色
        textColor: '#4A4A4A'
    },
    'frontend': {
        bgColor: '#EADCD3', // 果泥裸色替代原来的粉色
        textColor: '#4A4A4A'
    },
    'backend': {
        bgColor: '#A5C9BB', // 柔和绿色替代原来的蓝色
        textColor: '#4A4A4A'
    },
    'database': {
        bgColor: '#A5C3C9', // 柔和蓝色替代原来的紫色
        textColor: '#4A4A4A'
    },
    'api': {
        bgColor: '#C9A8D3', // 柔和紫色替代原来的绿色
        textColor: '#4A4A4A'
    },
    'architecture': {
        bgColor: '#E8D5A5', // 柔和黄色替代原来的黄色
        textColor: '#4A4A4A'
    }
};

// 渲染导航
function renderNavigation() {
    const navElement = document.getElementById('main-nav');
    if (!navElement) return;
    
    let navHTML = '';
    
    mainNav.forEach(item => {
        const isActive = window.location.href.includes(item.link);
        navHTML += `
            <a href="${item.link}" class="nav-item ${isActive ? 'active' : ''}">
                <i class="${item.icon}"></i>
                <span>${item.name}</span>
            </a>
        `;
    });
    
    navElement.innerHTML = navHTML;
}

// 获取当前页面标题
function getCurrentPageTitle() {
    const pagePath = window.location.pathname;
    const fileName = pagePath.split('/').pop();
    
    for (let item of mainNav) {
        if (item.link === fileName) {
            return item.name;
        }
    }
    
    // 处理特殊情况
    if (fileName === 'index.html' || fileName === '') {
        return '首页';
    }
    
    return document.title.split(' - ')[0] || 'CreativePro Studio';
}

// 设置document标题
function setDocumentTitle() {
    const pageTitle = getCurrentPageTitle();
    document.title = `${pageTitle} - CreativePro Studio`;
}

// 页面加载后执行
document.addEventListener('DOMContentLoaded', function() {
    renderNavigation();
    setDocumentTitle();
});

// 导出函数和常量用于其他脚本使用
window.appNav = {
    mainNav,
    categoryColors,
    renderNavigation,
    getCurrentPageTitle
}; 