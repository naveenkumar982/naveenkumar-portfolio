import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { Project } from "../data/portfolio";
import { sound } from "../utils/audio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface-dim border border-border/80 shadow-2xl p-6 md:p-8 z-10 custom-scroll"
          >
            {/* Header / Close */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-border/50">
              <div>
                <span className="text-label bg-accent text-surface px-2.5 py-0.5 text-[9px] mb-2 inline-block">
                  {project.category}
                </span>
                <h2 id="modal-title" className="text-heading text-primary font-bold">
                  {project.title}
                </h2>
                <p className="text-label text-muted text-[11px] mt-1">
                  {project.subtitle}
                </p>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="text-muted hover:text-primary p-2 transition-colors border border-border/50 hover:border-accent text-sm"
                aria-label="Close modal"
              >
                ✕ ESC
              </button>
            </div>

            {/* Media Banner */}
            <div className="relative aspect-video overflow-hidden my-6 border border-border/40 bg-surface">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent opacity-60" />
            </div>

            {/* Description */}
            <div className="space-y-4 mb-6">
              <p className="font-body text-base text-primary/90 leading-relaxed">
                {project.detailedDescription || project.description}
              </p>
            </div>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="mb-8">
                <h4 className="text-label text-muted tracking-widest text-[10px] mb-3">
                  SYSTEM PERFORMANCE METRICS
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-3 bg-surface border border-border/60"
                    >
                      <span className="text-label text-muted/60 text-[9px] block mb-1">
                        {m.label}
                      </span>
                      <span className="font-mono text-lg font-bold text-accent">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture summary & highlights */}
            {project.architectureSummary && (
              <div className="mb-6">
                <h4 className="text-label text-muted tracking-widest text-[10px] mb-3">
                  CORE ARCHITECTURE HIGHLIGHTS
                </h4>
                <ul className="space-y-2">
                  {project.architectureSummary.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-primary/80 font-body"
                    >
                      <span className="text-accent font-mono mt-0.5">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech stack badges */}
            <div className="mb-8">
              <h4 className="text-label text-muted tracking-widest text-[10px] mb-3">
                TECHNOLOGY ECOSYSTEM
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-label text-[10px] border border-border px-3 py-1 bg-surface text-primary/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border/50">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="text-label border border-primary px-6 py-3 hover:bg-primary hover:text-surface transition-all duration-300 inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Explore GitHub Repository
              </a>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="text-label bg-accent text-surface px-6 py-3 hover:bg-accent-dim transition-all duration-300 inline-flex items-center gap-2 font-semibold"
                >
                  <span className="w-2 h-2 bg-surface rounded-full animate-ping" />
                  Launch Live System
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
