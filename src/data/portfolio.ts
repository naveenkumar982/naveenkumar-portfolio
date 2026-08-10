export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription?: string;
  category: "AI/ML" | "SRE/Cloud" | "DevTools" | "Full-Stack";
  tech: string[];
  github: string;
  live: string | null;
  featured: boolean;
  image: string;
  metrics?: { label: string; value: string }[];
  architectureSummary?: string[];
  keyHighlights?: string[];
}

export interface SkillItem {
  name: string;
  category: "Languages" | "Full-Stack" | "Cloud & DevOps" | "AI/ML" | "Data & Tools";
  level: number; // 0 - 100
  detail: string;
  icon: string;
}

export interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  description: string;
  achievements: string[];
  badge?: string;
}

export const personalData = {
  name: "Naveen Kumar TV",
  role: "Full-Stack Developer & Cloud Engineer",
  tagline: "Architecting Resilient Systems & Intelligent Web Applications.",
  status: "Available for Software Engineering Roles & Projects",
  bio: "3rd Year BE student building production-grade full-stack applications. I turn complex ideas into functional, beautiful products with architectural clarity — from AI-driven legal tech to cloud-native site reliability monitoring.",
  extendedBio:
    "My engineering journey is defined by a transition from curiosity to the rigorous construction of production-ready applications. I focus on the intersection of scalable infrastructure, intelligent data, and modern user-centric interfaces.",
  email: "naveenkumar982@outlook.com",
  github: "https://github.com/naveenkumar982",
  linkedin: "https://linkedin.com/in/naveenkumar9842",
  twitter: "https://twitter.com/naveenkumar",
  location: "India",
  stats: [
    { label: "Systems Built", value: "8+" },
    { label: "Core Tech Stacks", value: "15+" },
    { label: "Engineering Focus", value: "Cloud & AI" },
    { label: "Uptime & Quality", value: "99.9%" },
  ],
};

export const projects: Project[] = [
  {
    id: "devcontext-cli",
    title: "DevContext CLI",
    subtitle: "Developer Session Briefing Tool",
    description:
      "Developer session briefing CLI tool analyzing Git activity, code health, hotspots, and generating AI summaries for seamless workflow context.",
    detailedDescription:
      "DevContext CLI is an autonomous developer tooling suite that inspects git diffs, commits, and AST structures to synthesize comprehensive context snapshots for developers starting their day or handing off features.",
    category: "DevTools",
    tech: ["Node.js", "Git API", "Gemini AI", "TypeScript"],
    github: "https://github.com/naveenkumar982/devcontext-tool",
    live: null,
    featured: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAybwRtlbjY68aH12M7urUeDDAX6tXB4e-uXNH2XgY8xVeHa_l5NBNMMZ4P9pfBGF_-xvxKXU8G3fXbvaCmXOMrsvCNKzbKhRH6vGlIW4AxfOvtZNCg96xO1iztZkSgHOZwYYnPcUa6cEUV9EAO7CbOXOszbKPoHVD1phjtISDE_eX51nbQeg7gGT-3DAYDCTrBguBJllRrFImFatsw-NnjgHeKvqoWXZsyQ6P4cpAumNjRQA7ILblMSvMP5qie2OGjrsmo9BBbWS3S",
    metrics: [
      { label: "Context Speed", value: "< 1.2s" },
      { label: "Hotspot Accuracy", value: "96%" },
      { label: "Token Optimization", value: "-40%" },
    ],
    architectureSummary: [
      "Local Git Tree AST Parser & Diff Extractor",
      "Gemini AI Context Summarization Engine",
      "Zero-latency Terminal UI output stream",
    ],
    keyHighlights: [
      "Automatic detection of code churn and volatile files",
      "Instant morning briefing generated in markdown format",
      "Offline-first cached AST parsing with low footprint",
    ],
  },
  {
    id: "judgeai",
    title: "JudgeAI",
    subtitle: "AI Legal Document Analyzer",
    description:
      "AI-powered court judgment to action plan system. Extracts actionable insights from complex legal documents using NLP and structured reasoning.",
    detailedDescription:
      "JudgeAI transforms hundreds of pages of intricate court judgments into structured legal timelines, compliance action items, and risk assessments through an asynchronous Python FastAPI pipeline.",
    category: "AI/ML",
    tech: ["NLP", "Python", "FastAPI", "Transformers", "React"],
    github: "https://github.com/naveenkumar982/judgeai",
    live: null,
    featured: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvNDYW7n2YwNQEs3euHHm-eRi8J1AoO_uxqwOMXFVLAjTswpztpUa4dIW_ArlZwsziwwuJn28JqLYpezps0up0EH1Zeb34BqLljD7xZwDcaut7pI6znHz-GB04A3htVnT3KOQVGq8vHHu0PJzgBvbBCrppogt23qF6mpY-yPZPQuM_S4Sv3jsyx_ggXDCsax4Ori9P8dKCs1mstqYN6sRUjr8WF_Po--DmCs8Q_BP8e7m5xPjDacLZZhZESRSJ9ngSbrDfa_GIUIIH",
    metrics: [
      { label: "Document Ingestion", value: "50+ Pages/s" },
      { label: "Entity Extraction", value: "98.4%" },
      { label: "Summary Latency", value: "850ms" },
    ],
    architectureSummary: [
      "FastAPI Async worker cluster with Redis task queue",
      "Custom NER pipeline for citation extraction",
      "Vector database embeddings for semantic search",
    ],
    keyHighlights: [
      "Legal precedence graph linking related judicial rulings",
      "Interactive clause comparison and discrepancy detector",
      "Exportable compliance checklists in PDF/Markdown",
    ],
  },
  {
    id: "openenv-sre-agent",
    title: "OpenEnv SRE Agent",
    subtitle: "Cloud SRE & FinOps Simulator",
    description:
      "Cloud Site Reliability Engineering & FinOps Simulator designed for intelligent cloud management, automated remediation, and cost optimization.",
    detailedDescription:
      "An automated SRE and infrastructure operations simulator that analyzes simulated telemetry streams, predicts traffic spikes, and runs Terraform automated state remediations.",
    category: "SRE/Cloud",
    tech: ["Terraform", "AWS", "Python", "Docker", "Prometheus"],
    github: "https://github.com/naveenkumar982/openenv-sre-agent",
    live: null,
    featured: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB_mYDv5_ZVeoaNXsmD_U3RbCMJfao_k8saUmUUSa5PZfsuAfIkiLNgp6CimqLo7h8tt7KZdJMCyWQiak8aoTvG1OIRZSNK3FlkBXKPUqHjmoP2NA7928MQhRqqjqkEo5fXyOYpX-w26eQJi55MFpvJO7dRuWy-rG9ibwHPpxaESUCPZb5wjYv6BJkNzpq14h55sztmB_Fzo7UpQnF2_s33czscrSd4hdmTDZaHSLAIWIYz6zK41H-f-GmYkkk0Gns7Lyd2TlSJhqs",
    metrics: [
      { label: "Cost Reduction", value: "32%" },
      { label: "MTTR Simulation", value: "< 45s" },
      { label: "Metrics Poll Rate", value: "100ms" },
    ],
    architectureSummary: [
      "Multi-agent autonomous remediation loop",
      "Terraform cloud state drift watcher",
      "Real-time chaos engineering test engine",
    ],
    keyHighlights: [
      "Dynamic auto-scaling rules based on predictive workload curves",
      "Automated FinOps idle resource cleanup recommendations",
      "Live incident simulation with real-time health dashboard",
    ],
  },
  {
    id: "fintrack",
    title: "FinTrack Dashboard",
    subtitle: "Smart Expense & Financial Analytics",
    description:
      "Smart expense tracker with real-time Chart.js analytics, budget goals, CSV export, and financial health scoring.",
    detailedDescription:
      "A high-speed financial tracking dashboard engineered with pure performance in mind, offering instantaneous chart rendering, category budgets, and multi-currency conversion.",
    category: "DevTools",
    tech: ["Chart.js", "JavaScript", "REST API", "LocalStorage"],
    github: "https://github.com/naveenkumar982/expense-tracker-dashboard",
    live: "https://naveenkumar982.github.io/expense-tracker-dashboard/",
    featured: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjDkNvvXvk-o8CMB6LW0xZuwvq1ZupmTQf_Xv869etZyae939ZjrhL2_QmQWmlHRPRz8seppzzliItNT_jRfmPUXlJWQ_sDw_M1VXEsu3VVq1aLIuEEDpK5YsxLllhNhj6603NywrALO8eCoor9CZYThwnnzaxQKua7RCNaF-KxMJWcKZV8cbW6DnPIXhXWWQgn84RPqVu0mBOy7fOtFS8svL8R-xu6PjVGF5vZhFjfz3eR4IoGdybfTPPu7CsJmZSJlrCIpbUxmKv",
    metrics: [
      { label: "Render Time", value: "16ms" },
      { label: "Data Portability", value: "JSON/CSV" },
      { label: "Offline First", value: "100%" },
    ],
    architectureSummary: [
      "Zero-dependency reactive state store",
      "Chart.js customized canvas rendering",
      "Client-side CSV parsing and aggregation engine",
    ],
    keyHighlights: [
      "Interactive spending trend visualization by month and category",
      "Dynamic budget thresholds with warning alerts",
      "Instant export and import for seamless backup",
    ],
  },
  {
    id: "nexusai",
    title: "NexusAI",
    subtitle: "AI Chat Assistant & Prompt Lab",
    description:
      "High-performance AI interface featuring markdown rendering, streaming responses, model selection, and secure conversation state management.",
    detailedDescription:
      "A sleek conversational AI web client built to interface with modern LLM endpoints with real-time token streaming, code syntax highlighting, and custom system prompt switching.",
    category: "AI/ML",
    tech: ["Gemini API", "LLM", "JavaScript", "CSS3"],
    github: "https://github.com/naveenkumar982/ai-chat-assistant",
    live: "https://naveenkumar982.github.io/ai-chat-assistant/",
    featured: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxsxW93_wb63LZltsAHJ4s624V9jy5U1-k6RMVJKEPv7OG-wSWiTiP_pZQOsTxQNS-Ah3u9axdO_ch4oyB-KFcjRnwgLXNavUpuv7mjtCNxsEkuw08uIMzGkTGcbtpVkwQXYLpt3_4EIgl7AIAPFb5KyMizykadd8SEDCpZ_NyrTq-qR4wH6yU-cwoboNNLllmQF65KCalevXlv0H9AvVBdj3axeaVAH203Fu26kIpH92McQXMxzABlv8rUdfB9EKFDFE0jf6P7RF1",
    metrics: [
      { label: "Streaming TTFT", value: "120ms" },
      { label: "Markdown Support", value: "Full GFM" },
    ],
    architectureSummary: [
      "Fetch ReadableStream SSE parser",
      "Dynamic code block copy-to-clipboard engine",
    ],
    keyHighlights: [
      "Full conversation history storage with search",
      "Code block syntax highlight and one-click copy",
    ],
  },
  {
    id: "skypulse",
    title: "SkyPulse",
    subtitle: "Real-Time Weather Intelligence",
    description:
      "Real-time atmospheric data processing with 24-hour and 7-day precise forecasting powered by Open-Meteo API.",
    detailedDescription:
      "High-precision weather monitoring client featuring temperature trends, UV index analysis, wind compass, and automated geolocation lookup.",
    category: "DevTools",
    tech: ["JavaScript", "REST API", "Canvas Charts", "CSS Grid"],
    github: "https://github.com/naveenkumar982/weather-dashboard",
    live: "https://naveenkumar982.github.io/weather-dashboard/",
    featured: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAgTXKMoicc_bSs5wQ-Y8b30sR5Nz9romDkIMj8qYBHhnIcIacb4B7LkB2q2X3_4rbkXOZEgj-9B9pl4wRaeCXZRpr02xnsPhCO_dcXd6i8Lxb7vXY1ZJ7kg5mSCHfG9bHkNn0sK9wug1lHlI491lc-TOsIJE_4yLCdFgaefYSj-ZmpublsSBVZDY72LfrChfXjIyMyriAyCQSrD5Mo06zbfZY_m1cRktzJ2scyDKBo5M8JpfulTmU0U0zgXQaZE9BwMUPm1Ioauksg",
    metrics: [
      { label: "Forecast Resolution", value: "Hourly" },
      { label: "API Latency", value: "< 200ms" },
    ],
    architectureSummary: [
      "Open-Meteo REST integration",
      "Geolocation reverse geocoding cache",
    ],
    keyHighlights: [
      "Hourly interactive forecast curve",
      "Dynamic background changes matching live weather condition",
    ],
  },
  {
    id: "taskflow",
    title: "TaskFlow Kanban",
    subtitle: "Project Management Board",
    description:
      "Project board with 5 custom workflow columns, smooth drag-and-drop mechanics, and robust JSON import/export for data portability.",
    detailedDescription:
      "A fluid Kanban board built with native HTML5 Drag and Drop API, custom priority tags, and zero external runtime dependencies.",
    category: "DevTools",
    tech: ["Drag-n-Drop", "Vanilla JS", "CSS Variables"],
    github: "https://github.com/naveenkumar982/kanban-task-board",
    live: "https://naveenkumar982.github.io/kanban-task-board/",
    featured: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZPiG1NuUvxtoj4rR3KG_cWLyRQvX3DM9d7YWpYaHj7mNyggglKMwuMz2e2EdEgnKpYDEKQpIYPC161Xc51kL4JDm7BfLBwtE7DdOk6yrEePyRDGP1nuQxIUOC3CjkqnaFjNzdcyzhzrpKMZWNzn-lyR_2nnk6nLnzuAjxfLuRxXA-4kYQHzrgLb3D7AZ4wvLbDG9RU2zpZ2-shR-x2uWGFyBRq-BmTuMlxL6uln62FNLMxRDYR8zIoyVAAb3jJxGuyiC4C9bIojV7",
    metrics: [
      { label: "Drag Smoothness", value: "60 FPS" },
      { label: "Bundle Size", value: "< 15KB" },
    ],
    architectureSummary: [
      "Native HTML5 Drag & Drop API",
      "Custom reactive column store",
    ],
    keyHighlights: [
      "Smooth column reordering and task prioritization",
      "Color-coded urgency indicators",
    ],
  },
  {
    id: "devink",
    title: "DevInk Platform",
    subtitle: "Technical Blogging Engine",
    description:
      "Full technical blogging platform with Markdown editor, live side-by-side preview, publish/draft system, and reading time analytics.",
    detailedDescription:
      "A distraction-free writing environment for engineers with real-time regex markdown parsing, word count estimation, and draft persistence.",
    category: "DevTools",
    tech: ["Markdown", "Analytics", "JavaScript", "CSS3"],
    github: "https://github.com/naveenkumar982/blog-platform",
    live: "https://naveenkumar982.github.io/blog-platform/",
    featured: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGZoCGvUhtYQFVDVQCMldCzUASiA20QptHRPJzosSDaj4cwiPfPYnnnjH7U4_yrqKA6TOC2ts_CRhERJfC3UIwqYCCgc8pAYQdb2COXtWAiKfpuRQANR7zSxx8lbKtl4lD8EosQLrH_fJ1NlmWBjtFx-DhhkSfdhbceOal3tWxxG4kKhsEV0YUrNCWA-PqbX6ahseXMAnZTHsF31MfSsnYhFgR5M9Em58XIoods_ED3tp2OA_6va_s27p9FVU14HTck7X9IlkzK0Cl",
    metrics: [
      { label: "Live Preview Sync", value: "0ms delay" },
      { label: "Storage", value: "Instant Local" },
    ],
    architectureSummary: [
      "Custom Markdown Parser with code fencing",
      "Live DOM reconciliation loop",
    ],
    keyHighlights: [
      "Synchronized dual-pane scrolling",
      "One-click raw markdown export and import",
    ],
  },
];

export const skills: SkillItem[] = [
  {
    name: "Python",
    category: "Languages",
    level: 90,
    detail: "FastAPI, Pandas, PyTorch, Scripting",
    icon: "code",
  },
  {
    name: "TypeScript / JavaScript",
    category: "Languages",
    level: 92,
    detail: "ES6+, React 19, Node.js, Next.js",
    icon: "terminal",
  },
  {
    name: "React & Modern Web",
    category: "Full-Stack",
    level: 94,
    detail: "Component Architecture, Tailwind, State",
    icon: "layers",
  },
  {
    name: "AWS & Cloud Services",
    category: "Cloud & DevOps",
    level: 85,
    detail: "Lambda, S3, ECR, API Gateway, EC2",
    icon: "cloud",
  },
  {
    name: "Docker & Containerization",
    category: "Cloud & DevOps",
    level: 88,
    detail: "Multi-stage builds, CI/CD, Compose",
    icon: "layers",
  },
  {
    name: "Terraform & IaC",
    category: "Cloud & DevOps",
    level: 82,
    detail: "Infrastructure Automation, State Mgmt",
    icon: "git-branch",
  },
  {
    name: "Machine Learning & NLP",
    category: "AI/ML",
    level: 84,
    detail: "LLM APIs, Transformers, Vector DBs",
    icon: "cpu",
  },
  {
    name: "FastAPI & REST APIs",
    category: "Full-Stack",
    level: 90,
    detail: "Async endpoints, Pydantic, OpenAPI",
    icon: "terminal",
  },
  {
    name: "SQL & Databases",
    category: "Data & Tools",
    level: 86,
    detail: "PostgreSQL, MySQL, Redis, Indexing",
    icon: "layers",
  },
  {
    name: "Git & GitHub Actions",
    category: "Cloud & DevOps",
    level: 90,
    detail: "Automated Workflows, Trunk Dev",
    icon: "git-branch",
  },
  {
    name: "System Design & SRE",
    category: "Full-Stack",
    level: 85,
    detail: "Observability, Telemetry, Scalability",
    icon: "cpu",
  },
  {
    name: "Chart.js & Data Viz",
    category: "Data & Tools",
    level: 88,
    detail: "Real-time analytics, Canvas rendering",
    icon: "code",
  },
];

export const architecture = [
  {
    id: "frontend",
    title: "01. Presentation & State",
    stack: "React 19 / TypeScript / Tailwind CSS / Framer Motion",
    description:
      "High-frame-rate responsive interfaces, design systems, accessible semantic structure, and reactive client-state management with sub-second rendering performance.",
    points: [
      "Custom design systems with CSS variable tokens",
      "Hardware-accelerated animations & canvas particles",
      "Zero-overhead touch & keyboard accessibility",
    ],
  },
  {
    id: "backend",
    title: "02. Microservices & APIs",
    stack: "FastAPI / Node.js / Python / REST & WebSockets",
    description:
      "Asynchronous request routing, strict Pydantic payload validation, token authentication, and lightweight distributed caching layers.",
    points: [
      "High-throughput asynchronous endpoints",
      "Resilient LLM inference streaming pipelines",
      "Comprehensive OpenAPI specifications",
    ],
  },
  {
    id: "infrastructure",
    title: "03. Cloud & Autonomous SRE",
    stack: "AWS (Lambda, S3) / Docker / Terraform / GitHub Actions",
    description:
      "Immutable container images, declarative infrastructure as code, automated continuous deployment pipelines, and proactive health metrics.",
    points: [
      "Reproducible multi-stage Docker builds",
      "Automated CI/CD testing and deployment matrix",
      "Simulated FinOps and cloud state drift monitors",
    ],
  },
];

export const experienceData: TimelineItem[] = [
  {
    period: "2023 — Present",
    role: "Bachelor of Engineering (BE) Student",
    organization: "Engineering Academy",
    description:
      "Specializing in Computer Science & Engineering principles, system design, algorithm analysis, cloud architecture, and data engineering.",
    achievements: [
      "Constructed multiple production-grade end-to-end full-stack applications",
      "Authored open-source developer productivity tools and cloud simulators",
      "Active participant in technical hackathons and competitive problem solving",
    ],
    badge: "Current — 3rd Year",
  },
  {
    period: "2024 — 2025",
    role: "Independent Software & Systems Builder",
    organization: "Open Source & Research",
    description:
      "Engineered automated developer tooling (DevContext CLI), AI legal document analyzer (JudgeAI), and SRE FinOps simulation frameworks.",
    achievements: [
      "Implemented Gemini AI and LLM APIs for automated code synthesis and briefings",
      "Designed and deployed responsive web dashboards with real-time analytics",
      "Authored automated CI/CD workflows and Docker configurations",
    ],
    badge: "Open Source",
  },
];
