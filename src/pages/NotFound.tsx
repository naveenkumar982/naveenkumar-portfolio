import { motion } from "framer-motion";

export function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-surface relative noise-overlay">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center z-10"
      >
        <p className="text-label text-accent tracking-[0.3em] mb-8">
          ERROR 404
        </p>

        <h1
          className="font-display font-semibold mb-6"
          style={{
            fontSize: "clamp(6rem, 20vw, 14rem)",
            lineHeight: 1,
            letterSpacing: "-0.06em",
          }}
        >
          <span className="text-primary">4</span>
          <span className="text-muted/20">0</span>
          <span className="text-primary">4</span>
        </h1>

        <p className="font-body text-lg text-muted mb-12 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <a
          href="/"
          className="text-label border border-primary px-8 py-4 hover:bg-primary hover:text-surface transition-all duration-300 inline-flex items-center gap-3"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13 8H3M7 4L3 8l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Home
        </a>
      </motion.div>

      {/* Decorative grid dots */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
