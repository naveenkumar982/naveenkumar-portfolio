// ========================================================
//  NAVEEN KUMAR — PORTFOLIO SCRIPT
//  Native smooth scroll (NO Lenis), GSAP, Vanta, VanillaTilt
// ========================================================

// ========== FLOATING PARTICLES CANVAS ==========
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function Particle() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.r = Math.random() * 1.5 + 0.5;
        this.dx = (Math.random() - 0.5) * 0.3;
        this.dy = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 146, 60, ${this.opacity})`;
        ctx.fill();
    };

    Particle.prototype.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0 || this.x > w) this.dx *= -1;
        if (this.y < 0 || this.y > h) this.dy *= -1;
    };

    // Create particles — keep count low for performance
    for (let i = 0; i < 60; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
})();

// ========== VANTA.JS BACKGROUND ==========
document.addEventListener('DOMContentLoaded', () => {
    if (typeof VANTA !== 'undefined') {
        try {
            VANTA.NET({
                el: "#vanta-bg",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200,
                minWidth: 200,
                scale: 1.0,
                scaleMobile: 1.0,
                color: 0xfb923c,
                backgroundColor: 0x0c0a09,
                points: 8,
                maxDistance: 22,
                spacing: 18,
            });
        } catch (e) {
            console.log('Vanta init skipped:', e);
        }
    }
});

// ========== GSAP & SCROLLTRIGGER ==========
gsap.registerPlugin(ScrollTrigger);

// Hero entrance — fast, snappy
gsap.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' });
gsap.from('.hero-greeting', { y: 20, opacity: 0, duration: 0.6, delay: 0.35, ease: 'power2.out' });
gsap.from('.hero-name .name-line', { y: 40, opacity: 0, duration: 0.7, stagger: 0.12, delay: 0.45, ease: 'power3.out' });
gsap.from('.hero-title-wrapper', { y: 20, opacity: 0, duration: 0.6, delay: 0.7, ease: 'power2.out' });
gsap.from('.hero-description', { y: 20, opacity: 0, duration: 0.6, delay: 0.85, ease: 'power2.out' });
gsap.from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, delay: 1.0, ease: 'power2.out' });
gsap.from('.hero-stats .stat-item', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, delay: 1.15, ease: 'power2.out' });
gsap.from('.scroll-indicator', { opacity: 0, duration: 0.8, delay: 1.8, ease: 'power2.out' });

// Section headers — slide in fast
gsap.utils.toArray('.section-header').forEach(el => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%' },
        y: 25, opacity: 0, duration: 0.5, ease: 'power2.out'
    });
});

// About section
gsap.from('.about-text p', {
    scrollTrigger: { trigger: '.about-text', start: 'top 82%' },
    y: 20, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out'
});

gsap.from('.about-highlights .highlight-item', {
    scrollTrigger: { trigger: '.about-highlights', start: 'top 85%' },
    x: -20, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out'
});

gsap.from('.terminal-window', {
    scrollTrigger: { trigger: '.terminal-window', start: 'top 82%' },
    y: 30, opacity: 0, duration: 0.6, ease: 'power3.out'
});

// Skill cards — fast stagger
gsap.from('.skill-card', {
    scrollTrigger: { trigger: '.skills-grid', start: 'top 82%' },
    y: 30, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(1.2)'
});

// Skill bar fills
ScrollTrigger.create({
    trigger: '.skills-grid',
    start: 'top 80%',
    onEnter: () => {
        document.querySelectorAll('.skill-fill').forEach(bar => {
            const w = bar.getAttribute('data-width');
            bar.style.width = w + '%';
        });
    },
    once: true
});

// Featured project
gsap.from('.featured-project', {
    scrollTrigger: { trigger: '.featured-project', start: 'top 85%' },
    y: 40, opacity: 0, duration: 0.6, ease: 'power2.out'
});

// Project cards — fast stagger
gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%' },
        y: 35, opacity: 0, duration: 0.45, delay: i * 0.04, ease: 'power2.out'
    });
});

// Contact section
gsap.from('.contact-text', {
    scrollTrigger: { trigger: '.contact-text', start: 'top 85%' },
    y: 20, opacity: 0, duration: 0.5, ease: 'power2.out'
});

gsap.from('.contact-card', {
    scrollTrigger: { trigger: '.contact-links', start: 'top 85%' },
    y: 25, opacity: 0, duration: 0.45, stagger: 0.1, ease: 'power2.out'
});

// ========== VANILLA TILT ==========
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.skill-card'), {
        max: 8, speed: 400, glare: true, 'max-glare': 0.12,
    });
    VanillaTilt.init(document.querySelectorAll('.project-card'), {
        max: 5, speed: 400, glare: true, 'max-glare': 0.08, scale: 1.01,
    });
    VanillaTilt.init(document.querySelectorAll('.contact-card'), {
        max: 8, speed: 400, glare: true, 'max-glare': 0.1,
    });
}

// ========== ANIMATED COUNTERS ==========
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current);
        }, 16);
    });
}

// Trigger counter animation when hero-stats is visible
ScrollTrigger.create({
    trigger: '.hero-stats',
    start: 'top 90%',
    onEnter: animateCounters,
    once: true
});

// ========== TERMINAL TYPING ANIMATION ==========
(function terminalAnim() {
    const cmdEl = document.getElementById('terminalCmd');
    const outputEl = document.getElementById('terminalOutput');
    if (!cmdEl || !outputEl) return;

    const command = 'cat about.json';
    const output = `{
  "name": "Naveen Kumar",
  "role": "Full-Stack Developer & ML Engineer",
  "focus": "Building real-world applications",
  "tech": ["Python", "JavaScript", "AWS", "Docker"],
  "passion": "Turning ideas into products 🚀"
}`;

    let i = 0;
    function typeCmd() {
        if (i < command.length) {
            cmdEl.textContent += command[i];
            i++;
            setTimeout(typeCmd, 60);
        } else {
            setTimeout(() => {
                document.querySelector('.terminal-cursor-blink').style.display = 'none';
                typeOutput(0);
            }, 400);
        }
    }

    function typeOutput(j) {
        if (j <= output.length) {
            outputEl.textContent = output.substring(0, j);
            setTimeout(() => typeOutput(j + 1), 8);
        }
    }

    // Start terminal animation when visible
    ScrollTrigger.create({
        trigger: '.terminal-window',
        start: 'top 80%',
        onEnter: () => setTimeout(typeCmd, 300),
        once: true
    });
})();

// ========== TYPING ANIMATION (HERO) ==========
const titles = [
    'Full-Stack Developer',
    'ML Engineer',
    'Cloud Enthusiast',
    'Problem Solver',
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeTitle() {
    if (!typingElement) return;
    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeTitle, 2000);
            return;
        }
        setTimeout(typeTitle, 70);
    } else {
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeTitle, 400);
            return;
        }
        setTimeout(typeTitle, 35);
    }
}
setTimeout(typeTitle, 1200);

// ========== NAVBAR ==========
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active nav link
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 150) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#fb923c';
        }
    });
}, { passive: true });

// ========== MOBILE NAV ==========
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}
