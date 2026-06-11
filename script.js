// ========================================================
//  NAVEEN KUMAR — PORTFOLIO SCRIPT
//  Design Migration: Google Stitch "Modern Engineering Student"
//  Optimizations: Throttled WebGL/Three.js, Passive Observers
// ========================================================

// --- Hero Shader (WebGL background) ---
(function initHeroShader() {
    const canvas = document.getElementById('hero-shader');
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Vertex shader source
    const vsSource = `
        attribute vec4 a_position;
        varying vec2 v_texCoord;
        void main() {
            gl_Position = a_position;
            v_texCoord = a_position.xy * 0.5 + 0.5;
        }
    `;

    // Fragment shader source (Robust grid computation without fwidth standard derivatives requirement)
    const fsSource = `
        precision highp float;
        varying vec2 v_texCoord;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;

        float grid(vec2 uv, float spacing, float width) {
            vec2 g = abs(fract(uv / spacing - 0.5) - 0.5);
            float lineX = step(0.5 - (width / u_resolution.x), g.x);
            float lineY = step(0.5 - (width / u_resolution.y), g.y);
            return max(lineX, lineY);
        }

        void main() {
            vec2 uv = v_texCoord;
            vec2 mouse = u_mouse / u_resolution;
            
            // Base color from design system: #080807 (Carbon Black)
            vec3 backgroundColor = vec3(0.03, 0.03, 0.027);
            
            // Moving grid lines
            float g1 = grid(uv + vec2(u_time * 0.02, 0.0), 0.1, 1.5);
            float g2 = grid(uv - vec2(0.0, u_time * 0.01), 0.05, 1.0);
            
            vec3 color = backgroundColor;
            
            // Accent line color (Graphite Detail grey)
            vec3 lineColor = vec3(0.2, 0.2, 0.18);
            color = mix(color, lineColor, g1 * 0.1);
            color = mix(color, lineColor, g2 * 0.05);
            
            // Mouse glow overlay
            float dist = distance(uv, mouse);
            float glow = smoothstep(0.4, 0.0, dist);
            color += glow * vec3(0.08, 0.08, 0.07);
            
            gl_FragColor = vec4(color, 1.0);
        }
    `;

    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile failed:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Shader linking failed:', gl.getProgramInfoLog(program));
        return;
    }
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const timeUniformLocation = gl.getUniformLocation(program, "u_time");
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    const mouseUniformLocation = gl.getUniformLocation(program, "u_mouse");

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = window.innerHeight - e.clientY;
    });

    let isVisible = true;

    function render(time) {
        if (!isVisible) return;

        canvas.width = window.innerWidth;
        canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);

        gl.uniform1f(timeUniformLocation, time * 0.001);
        gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
        gl.uniform2f(mouseUniformLocation, mouseX, mouseY);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(render);
    }

    // Performance optimization: Stop render loop when Hero is scrolled out of view
    const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
            requestAnimationFrame(render);
        }
    }, { threshold: 0 });

    observer.observe(canvas);
    requestAnimationFrame(render);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    });
})();

// --- Hero 3D Scene (Three.js spinning wireframe) ---
(function initThreeScene() {
    const container = document.getElementById('hero-3d-scene');
    if (!container || typeof THREE === 'undefined') return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Inner wireframe sphere core
    const coreGeom = new THREE.IcosahedronGeometry(1.5, 1);
    const coreMat = new THREE.MeshPhongMaterial({ 
        color: 0x5f5e5e, 
        wireframe: true,
        emissive: 0x0c0a09,
        shininess: 10
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    group.add(core);

    // Surrounding technical orbital rings
    const ringGeom = new THREE.TorusGeometry(2.5, 0.015, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x777771, transparent: true, opacity: 0.15 });

    const rings = [];
    for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        group.add(ring);
        rings.push(ring);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 8;

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    let isVisible = true;

    function animate() {
        if (!isVisible) return;
        requestAnimationFrame(animate);
        
        group.rotation.y += 0.002;
        group.rotation.x += 0.001;

        rings.forEach((ring, idx) => {
            ring.rotation.z += 0.005 * (idx + 1);
        });
        
        // Target dynamic offset to the right side on desktop
        const targetX = window.innerWidth > 768 ? 3.5 : 0;
        group.position.x += (targetX + mouseX * 0.4 - group.position.x) * 0.05;
        group.position.y += (mouseY * 0.4 - group.position.y) * 0.05;
        
        renderer.render(scene, camera);
    }

    // Performance optimization: Stop Three.js rendering when Hero is off-screen
    const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
            requestAnimationFrame(animate);
        }
    }, { threshold: 0 });

    observer.observe(container);
    requestAnimationFrame(animate);

    window.addEventListener('resize', () => {
        width = container.clientWidth || window.innerWidth;
        height = container.clientHeight || window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
})();

// --- Dynamic Terminal Command Appender ---
let terminalLines = [
    '<span class="text-on-primary-container">naveen@dev ~ $</span> <span class="text-bone-surface">cat status.txt</span>',
    '<span class="text-outline-variant">Loading portfolio modules...</span>',
    '<span class="text-outline-variant">[OK] Host connection established</span>',
    '<span class="text-outline-variant">[OK] System metrics: Optimal</span>',
    '<span class="text-bone-surface">Ready for collaboration. Send message below.</span>'
];
let currentLine = 0;

window.typeNextLine = function() {
    if (currentLine < terminalLines.length) {
        const terminal = document.getElementById('typed-output');
        if (terminal) {
            const newLine = document.createElement('div');
            newLine.className = 'mt-2';
            newLine.innerHTML = terminalLines[currentLine];
            terminal.appendChild(newLine);
            currentLine++;
        }
    }
};

// --- Mobile Navigation Menu ---
(function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
})();

// --- Navbar Scrolled Style & Active Nav Link Observer ---
(function initNavObservers() {
    const navbar = document.querySelector('nav');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    const hero = document.getElementById('hero-shader');

    if (hero && navbar) {
        // Scroll style toggle on navbar
        const navObserver = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (!entry.isIntersecting) {
                navbar.classList.add('h-16');
                navbar.classList.remove('h-20');
            } else {
                navbar.classList.add('h-20');
                navbar.classList.remove('h-16');
            }
        }, { rootMargin: '-80px 0px 0px 0px' });
        navObserver.observe(hero);
    }

    // Active link highlighting
    const activeLinkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.style.opacity = '1';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = '#000000';
                        link.style.fontWeight = 'bold';
                    } else {
                        link.style.color = '';
                        link.style.fontWeight = '';
                    }
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });

    sections.forEach(sec => {
        if (sec.getAttribute('id')) activeLinkObserver.observe(sec);
    });
})();

// --- GitHub API Integration ---
const GITHUB_USERNAME = 'naveenkumar982';

async function fetchGitHubData() {
    try {
        const [profileRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`)
        ]);

        if (!profileRes.ok || !reposRes.ok) return;

        const profile = await profileRes.json();
        const repos = await reposRes.json();

        // Update profile elements
        const avatar = document.getElementById('ghAvatar');
        const name = document.getElementById('ghName');
        const bio = document.getElementById('ghBio');
        const reposVal = document.getElementById('ghRepos');
        const followersVal = document.getElementById('ghFollowers');
        const starsVal = document.getElementById('ghStars');
        const contVal = document.getElementById('ghContributions');

        if (avatar) avatar.src = profile.avatar_url;
        if (name) name.textContent = profile.name || GITHUB_USERNAME;
        if (bio) bio.textContent = profile.bio || 'Full-Stack Developer & BE Student';
        if (reposVal) reposVal.textContent = profile.public_repos;
        if (followersVal) followersVal.textContent = profile.followers;

        // Sum up repositories stars
        const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
        if (starsVal) starsVal.textContent = totalStars;

        // Approx contributions metric
        const thisYear = new Date().getFullYear();
        const activeReposCount = repos.filter(r => new Date(r.pushed_at).getFullYear() >= thisYear - 1).length;
        if (contVal) contVal.textContent = (activeReposCount * 12) + '+';

        // Extract and display top languages used
        const langMap = {};
        repos.forEach(r => {
            if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
        });

        const sortedLangs = Object.entries(langMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
        const langContainer = document.getElementById('ghLanguages');
        if (langContainer) {
            langContainer.innerHTML = sortedLangs.map(([lang, count]) => {
                return `<span class="font-label-mono text-[10px] border border-primary px-3 py-1 bg-surface-container-low font-bold">${lang} (${count})</span>`;
            }).join('');
        }

    } catch (err) {
        console.log('GitHub metrics load failed:', err);
    }
}
fetchGitHubData();

// --- Contact Form Handling (Web3Forms API) ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('contactSubmit');
        const submitText = document.getElementById('submitText');
        const submitLoading = document.getElementById('submitLoading');
        const formStatus = document.getElementById('formStatus');

        if (!submitBtn || !submitText || !submitLoading || !formStatus) return;

        // Show loading state
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        submitLoading.style.display = 'inline';
        formStatus.textContent = '';
        formStatus.className = 'form-status font-label-mono text-xs text-center mt-2';

        try {
            const formData = new FormData(contactForm);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                formStatus.textContent = '✅ MESSAGE SENT SUCCESSFULLY. WILL RESPOND SHORTLY.';
                formStatus.className = 'form-status success font-label-mono text-xs text-center mt-2';
                contactForm.reset();
            } else {
                formStatus.textContent = '❌ SUBMISSION FAILED. EMAIL HELLO@NAVEENKUMAR.DEV DIRECTLY.';
                formStatus.className = 'form-status error font-label-mono text-xs text-center mt-2';
            }
        } catch (err) {
            formStatus.textContent = '❌ NETWORK ERROR. EMAIL HELLO@NAVEENKUMAR.DEV DIRECTLY.';
            formStatus.className = 'form-status error font-label-mono text-xs text-center mt-2';
        }

        // Reset submit button state
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        submitLoading.style.display = 'none';
    });
}
