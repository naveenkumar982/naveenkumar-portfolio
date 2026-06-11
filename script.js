// ========== VANTA.JS BACKGROUND ==========
document.addEventListener('DOMContentLoaded', () => {
    if (typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xfb923c,
            backgroundColor: 0x140d0a,
            points: 12.00,
            maxDistance: 20.00,
            spacing: 16.00
        });
    }
});

// ========== SMOOTH SCROLL (LENIS) ==========
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// ========== GSAP & SCROLLTRIGGER ==========
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
gsap.from(".hero-content", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.5
});

// Section Title Animations
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

// About Text Animation
gsap.from(".about-text p", {
    scrollTrigger: {
        trigger: ".about-text",
        start: "top 80%",
    },
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
});

gsap.from(".about-terminal", {
    scrollTrigger: {
        trigger: ".about-terminal",
        start: "top 80%",
    },
    x: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// Skills Animation
gsap.from(".skill-card", {
    scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "back.out(1.5)"
});

// Projects Animation
gsap.utils.toArray('.project-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

// ========== VANILLA TILT ==========
VanillaTilt.init(document.querySelectorAll(".skill-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.1,
    scale: 1.02
});

// ========== TYPING ANIMATION ==========
const titles = [
    "Software Developer",
    "ML Engineer",
    "Cloud Enthusiast",
    "Problem Solver",
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeTitle() {
    if(!typingElement) return;
    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeTitle, 2000);
            return;
        }
        setTimeout(typeTitle, 80);
    } else {
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeTitle, 500);
            return;
        }
        setTimeout(typeTitle, 40);
    }
}
setTimeout(typeTitle, 1000);

// ========== NAVBAR SCROLL & ACTIVE STATE ==========
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent-cyan)';
        }
    });
});

// ========== MOBILE NAV TOGGLE ==========
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if(navToggle) {
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
