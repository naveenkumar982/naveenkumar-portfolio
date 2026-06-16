/* ============================================
   Monologue Technical — Shared JavaScript
   Portfolio data loading, rendering, and interactions
   ============================================ */

// --- Global State ---
let portfolioData = null;

// --- Data Loading ---
async function loadPortfolioData() {
    try {
        const response = await fetch('data/portfolio.json');
        portfolioData = await response.json();
        return portfolioData;
    } catch (error) {
        console.warn('Could not load portfolio.json, using inline data.');
        return null;
    }
}

// --- Populate Social Links ---
function populateLinks(data) {
    if (!data) return;
    const links = data.personal.links;

    document.querySelectorAll('[data-link="github"]').forEach(el => {
        el.href = links.github;
        el.target = '_blank';
    });
    document.querySelectorAll('[data-link="linkedin"]').forEach(el => {
        el.href = links.linkedin;
        el.target = '_blank';
    });
    document.querySelectorAll('[data-link="twitter"]').forEach(el => {
        el.href = links.twitter;
        el.target = '_blank';
    });
    document.querySelectorAll('[data-link="email"]').forEach(el => {
        el.href = links.email;
    });
}

// --- Render Featured Projects (index.html) ---
function renderFeaturedProjects(data) {
    const container = document.getElementById('featured-projects-grid');
    if (!container || !data) return;

    const featured = data.projects.filter(p => p.featured).slice(0, 2);
    container.innerHTML = featured.map(project => `
        <div class="group relative bg-surface border border-outline-variant p-2 overflow-hidden project-card-interactive">
            <div class="aspect-[16/10] overflow-hidden mb-8 relative">
                <img alt="${project.title}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" src="${project.imageUrl}" />
                ${project.badge ? `<div class="absolute top-4 right-4 bg-surface px-4 py-1 font-label-mono text-[10px] border border-primary">${project.badge}</div>` : ''}
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-6">
                    <h3 class="font-headline-md text-headline-md">${project.title} — ${project.subtitle}</h3>
                    <div class="flex gap-2 flex-shrink-0 ml-4">
                        ${project.techTags.map(tag => `<span class="font-label-mono text-[10px] border border-outline px-2 py-0.5">${tag}</span>`).join('')}
                    </div>
                </div>
                <p class="font-body-md text-body-md text-on-surface-variant mb-8 line-clamp-2">${project.description}</p>
                <div class="flex items-center justify-between pt-6 border-t border-outline-variant">
                    ${project.hasCaseStudy ? `<a class="font-label-mono text-label-mono uppercase tracking-widest hover:underline underline-offset-4" href="case-study.html">Case Study</a>` : `<span></span>`}
                    <div class="flex gap-4">
                        <a href="${project.githubUrl}" target="_blank" class="text-primary hover:scale-110 transition-transform"><span class="material-symbols-outlined">code</span></a>
                        ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="text-primary hover:scale-110 transition-transform"><span class="material-symbols-outlined">open_in_new</span></a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// --- Render All Projects (projects.html) ---
function renderAllProjects(data, filterCategory = 'All') {
    const container = document.getElementById('projects-bento-grid');
    if (!container || !data) return;

    const filtered = filterCategory === 'All'
        ? data.projects
        : data.projects.filter(p => p.category === filterCategory);

    container.innerHTML = filtered.map(project => `
        <div class="${project.gridSpan} group project-card scroll-reveal" data-category="${project.category}">
            <div class="project-image-container technical-border bg-surface-container">
                <img src="${project.imageUrl}" alt="${project.title}" />
                <div class="absolute top-4 left-4">
                    <span class="bg-primary text-on-primary px-3 py-1 font-label-mono text-caption uppercase">${project.badge}</span>
                </div>
            </div>
            <div class="mt-6 flex justify-between items-start">
                <div>
                    <h3 class="font-headline-md text-headline-md uppercase tracking-tight mb-2">${project.title}</h3>
                    <p class="font-body-md text-on-surface-variant mb-4 max-w-lg">${project.description}</p>
                    <div class="flex flex-wrap gap-2">
                        ${project.techTags.map(tag => `<span class="font-label-mono text-caption px-2 py-0.5 border border-outline-variant uppercase">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="flex gap-2 flex-shrink-0 ml-4">
                    <a class="technical-border p-2 hover:bg-primary hover:text-on-primary transition-colors" href="${project.githubUrl}" target="_blank" title="Source Code">
                        <span class="material-symbols-outlined">code</span>
                    </a>
                    ${project.demoUrl ? `<a class="technical-border p-2 bg-primary text-on-primary hover:opacity-80 transition-opacity" href="${project.demoUrl}" target="_blank" title="Live Demo">
                        <span class="material-symbols-outlined">open_in_new</span>
                    </a>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    // Re-observe newly created cards
    initScrollReveal();
}

// --- Category Filter ---
function initCategoryFilter(data) {
    const tabs = document.querySelectorAll('.filter-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active', 'border-b', 'border-primary', 'text-primary'));
            tabs.forEach(t => t.classList.add('text-on-surface-variant'));
            tab.classList.add('active', 'border-b', 'border-primary', 'text-primary');
            tab.classList.remove('text-on-surface-variant');

            const category = tab.dataset.category;
            renderAllProjects(data, category);
        });
    });
}

// --- Render Skills (about.html) ---
function renderSkills(data) {
    const container = document.getElementById('skills-grid');
    if (!container || !data) return;

    container.innerHTML = data.skills.map(skill => `
        <div class="skill-card group">
            <div class="flex items-center gap-4 mb-6">
                <div class="skill-icon w-12 h-12 flex items-center justify-center border border-primary">
                    <span class="material-symbols-outlined text-primary">${skill.icon}</span>
                </div>
                <h3 class="font-headline-md text-headline-md">${skill.name}</h3>
            </div>
            <p class="font-body-md text-on-surface-variant mb-6">${skill.description}</p>
            <div class="flex flex-wrap gap-2">
                ${skill.tags.map(tag => `<span class="px-3 py-1 border border-outline-variant font-label-mono text-[10px] uppercase">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// --- Mobile Menu ---
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const isHidden = menu.classList.contains('hidden');
        if (isHidden) {
            menu.classList.remove('hidden');
            btn.querySelector('.material-symbols-outlined').textContent = 'close';
        } else {
            menu.classList.add('hidden');
            btn.querySelector('.material-symbols-outlined').textContent = 'menu';
        }
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            btn.querySelector('.material-symbols-outlined').textContent = 'menu';
        });
    });
}

// --- Navbar Scroll Shrink ---
function initNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('h-16');
            nav.classList.remove('h-20');
        } else {
            nav.classList.add('h-20');
            nav.classList.remove('h-16');
        }
    });
}

// --- Intersection Observer for Scroll Reveal ---
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // Also observe sections
    document.querySelectorAll('section').forEach(section => {
        if (!section.classList.contains('no-reveal')) {
            section.classList.add('transition-all', 'duration-1000');
            observer.observe(section);
        }
    });
}

// --- Contact Form Simulation ---
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Transmission Pending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Transmission Received';
            btn.style.backgroundColor = '#16a34a';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
                form.reset();
            }, 3000);
        }, 1500);
    });
}

// --- Terminal Type Effect ---
let terminalLines = [
    '<span class="text-on-primary-container">naveen@dev ~ $</span> <span class="text-bone-surface">cat status.txt</span>',
    '<span class="text-outline-variant">Loading modules...</span>',
    '<span class="text-outline-variant">[OK] Database connected</span>',
    '<span class="text-outline-variant">[OK] API Endpoints active</span>',
    '<span class="text-bone-surface">System optimal. Ready for input.</span>'
];
let currentLine = 0;

function typeNextLine() {
    if (currentLine < terminalLines.length) {
        const terminal = document.getElementById('typed-output');
        if (!terminal) return;
        const newLine = document.createElement('div');
        newLine.innerHTML = terminalLines[currentLine] + '<br/>';
        newLine.style.opacity = '0';
        newLine.style.transform = 'translateY(5px)';
        terminal.appendChild(newLine);
        requestAnimationFrame(() => {
            newLine.style.transition = 'all 0.3s ease';
            newLine.style.opacity = '1';
            newLine.style.transform = 'translateY(0)';
        });
        currentLine++;
    }
}

// --- Active Nav Highlighting ---
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!navLinks.length) return;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'border-b', 'border-primary', 'pb-1');
            link.classList.add('text-on-surface-variant');
            const href = link.getAttribute('href');
            if (href && href.includes('#') && href.split('#')[1] === current) {
                link.classList.add('text-primary', 'border-b', 'border-primary', 'pb-1');
                link.classList.remove('text-on-surface-variant');
            }
        });
    });
}

// --- Page Loader ---
function initPageLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('loaded'), 200);
    });
}

// --- Init All ---
document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadPortfolioData();

    populateLinks(data);
    initMobileMenu();
    initNavScroll();
    initScrollReveal();
    initContactForm();
    initNavHighlight();
    initPageLoader();

    // Page-specific rendering
    if (document.getElementById('featured-projects-grid')) {
        renderFeaturedProjects(data);
    }
    if (document.getElementById('projects-bento-grid')) {
        renderAllProjects(data);
        initCategoryFilter(data);
    }
    if (document.getElementById('skills-grid')) {
        renderSkills(data);
    }
});
