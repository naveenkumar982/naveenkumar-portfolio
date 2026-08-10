import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { personalData } from "../data/portfolio";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { sound } from "../utils/audio";

/* ─── Premium Particle Canvas with warm glow ─── */
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let mx = -500;
    let my = -500;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let t = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.004;

      const gap = 48;
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap;
          const y = j * gap;
          const dx = mx - x;
          const dy = my - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 200);
          const wave = Math.sin(t * 2 + i * 0.2 + j * 0.15) * 0.5 + 0.5;

          const r = 0.8 + influence * 3 + wave * 0.3;
          const alpha = 0.04 + influence * 0.5 + wave * 0.02;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);

          if (influence > 0.05) {
            /* Warm gold glow near cursor */
            const goldR = Math.round(201 + influence * 40);
            const goldG = Math.round(168 - influence * 30);
            const goldB = Math.round(76 + influence * 50);
            ctx.fillStyle = `rgba(${goldR}, ${goldG}, ${goldB}, ${Math.min(alpha * 1.6, 0.85)})`;
          } else {
            ctx.fillStyle = `rgba(232, 230, 227, ${Math.max(alpha, 0.03)})`;
          }
          ctx.fill();
        }
      }

      /* Radial ambient glow following cursor */
      if (mx > 0 && my > 0) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 250);
        grad.addColorStop(0, "rgba(201, 168, 76, 0.04)");
        grad.addColorStop(0.5, "rgba(232, 101, 122, 0.015)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

const letterVariants: Variants = {
  hidden: { y: 80, opacity: 0, rotateX: -30 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: 0.15 + i * 0.025,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function Hero() {
  const nameChars = personalData.name.split("");

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden noise-overlay pt-28 pb-20"
    >
      <HeroCanvas />

      {/* Deep ambient gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 80%, rgba(201,168,76,0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(232,101,122,0.025) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Availability indicator */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 border border-border-bright/60 bg-surface-dim/60 backdrop-blur-xl mb-8 rounded-full"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-label text-accent text-[10px] tracking-[0.15em]">
            {personalData.status.toUpperCase()}
          </span>
        </motion.div>

        {/* Section index */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-label text-muted tracking-[0.3em] mb-5"
        >
          00 — Introduction
        </motion.p>

        {/* Big name — gradient text */}
        <h1 className="text-display overflow-hidden mb-5" style={{ perspective: "600px" }}>
          <span className="inline-flex flex-wrap" aria-label={personalData.name}>
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className={char === " " ? "w-[0.25em]" : "inline-block"}
                style={{ transformOrigin: "bottom center" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Tagline — accent gradient */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gradient-accent max-w-3xl mb-10"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.35rem, 3vw, 2.2rem)",
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
          }}
        >
          {personalData.tagline}
        </motion.p>

        {/* Bio & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
        >
          <div className="section-divider mb-8" />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <p className="font-body text-[15px] sm:text-base text-muted max-w-xl leading-[1.75]">
              {personalData.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="#projects"
                onClick={() => sound.playClick()}
                className="group text-label bg-gradient-to-r from-accent to-accent-warm text-surface px-7 py-3.5 inline-flex items-center gap-3 font-bold tracking-wider rounded-sm shadow-lg shadow-accent/10 hover:shadow-accent/25 hover:scale-[1.02] transition-all duration-300"
              >
                <span>VIEW WORK</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href="#about"
                onClick={() => sound.playClick()}
                className="text-label border border-border-bright hover:border-accent/40 text-primary/80 hover:text-primary px-7 py-3.5 transition-all duration-300 inline-flex items-center gap-2 rounded-sm"
              >
                <span>TERMINAL</span>
                <span className="font-mono text-accent">$_</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 bg-border/50 border border-border/50 rounded-sm overflow-hidden"
        >
          {personalData.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-5 bg-surface-dim/80 backdrop-blur-sm hover:bg-surface-elevated/40 transition-colors duration-500"
            >
              <span className="font-display text-2xl sm:text-3xl font-bold text-gradient-accent block mb-1">
                {stat.value}
              </span>
              <span className="text-label text-muted text-[9px] tracking-[0.15em]">
                {stat.label.toUpperCase()}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-label text-muted/30 text-[9px] tracking-[0.25em]">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-accent/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
