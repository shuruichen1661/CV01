// ==================== 平滑滚动效果 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // 使用 scrollIntoView 实现平滑滚动
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 导航栏高亮效果 ====================
function updateNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section, header');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // 当滚动位置在该区间内时，标记为当前
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href').slice(1);
        link.style.borderBottomColor = 'transparent';
        
        if (href === current) {
            link.style.borderBottomColor = 'rgba(255, 255, 255, 0.5)';
        }
    });
}

window.addEventListener('scroll', updateNavigation);

// ==================== 滚动入场动画 ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 添加入场动画类
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 监听所有需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.section, .education-item, .experience-item, .practice-item, .project-card, .skill-category, .contact-item, .honor-item');
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ==================== 页面加载完成后的初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    // 页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
    
    // 初始化导航高亮
    updateNavigation();
    
    // 添加按钮悬停效果的额外反馈
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// ==================== 键盘导航支持 ====================
document.addEventListener('keydown', (e) => {
    // 支持 Tab 键导航
    if (e.key === 'Tab') {
        // 浏览器默认处理
    }
});

// ==================== 检测系统减少动画设置 ====================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // 如果用户设置了减少动画，禁用所有自定义动画
    document.documentElement.style.scrollBehavior = 'auto';
    
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// ==================== 监听系统主题变化 ====================
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function handleThemeChange(e) {
    // 可以在这里添加深色模式支持
    // 目前保持亮色主题
}

darkModeMediaQuery.addEventListener('change', handleThemeChange);

// ==================== 性能优化：节流滚动事件 ====================
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const throttledScroll = throttle(updateNavigation, 100);
window.addEventListener('scroll', throttledScroll);

// ==================== 页面可见性 API ====================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时的处理
    } else {
        // 页面显示时的处理
        updateNavigation();
    }
});
