import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "../data/portfolio";
import { Reveal } from "../components/Reveal";
import { sound } from "../utils/audio";

type Category = "All" | "AI/ML" | "SRE/Cloud" | "DevTools";

interface ProjectsProps {
  onSelectProject: (p: Project) => void;
}

export function Projects({ onSelectProject }: ProjectsProps) {
  const [filter, setFilter] = useState<Category>("All");
  const categories: Category[] = ["All", "AI/ML", "SRE/Cloud", "DevTools"];

  const featured = projects.filter((p) => p.featured);
  const filtered =
    filter === "All" ? featured : featured.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding bg-surface relative">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 30% 60%, rgba(201,168,76,0.025) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <Reveal>
              <p className="text-label text-muted tracking-[0.3em] mb-4">03 — Selected Work</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-heading">Featured Systems</h2>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="flex items-center gap-1 p-1 border border-border rounded-sm bg-surface-dim/50">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setFilter(cat);
                  }}
                  className={`text-label text-[10px] px-4 py-2 rounded-xs transition-all duration-300 ${
                    filter === cat
                      ? "bg-gradient-to-r from-accent/20 to-accent-warm/20 text-accent font-bold border border-accent/20"
                      : "text-muted hover:text-primary border border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group glass-panel rounded-sm overflow-hidden hover:border-accent/15 transition-all duration-500"
              >
                {/* Image */}
                <div
                  onClick={() => {
                    sound.playClick();
                    onSelectProject(project);
                  }}
                  className="relative aspect-[16/10] overflow-hidden bg-surface-dim cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.subtitle}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent opacity-80" />

                  {/* Category badge */}
                  <span className="absolute top-4 left-4 badge-accent px-3 py-1 text-[9px] rounded-xs shadow-lg">
                    {project.category}
                  </span>

                  {/* Hover reveal */}
                  <div className="absolute inset-0 flex items-center justify-center bg-surface/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-label text-primary-bright text-[11px] border border-primary/30 px-5 py-2 rounded-sm bg-surface/50 backdrop-blur-md">
                      VIEW CASE STUDY →
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-7">
                  <div className="mb-4">
                    <h3
                      onClick={() => {
                        sound.playClick();
                        onSelectProject(project);
                      }}
                      className="font-display text-xl font-bold text-primary-bright group-hover:text-gradient-accent transition-colors duration-300 cursor-pointer mb-1"
                    >
                      {project.title}
                    </h3>
                    <p className="text-label text-muted text-[10px]">{project.subtitle}</p>
                  </div>

                  <p className="font-body text-[13px] text-muted leading-[1.7] mb-5">
                    {project.description}
                  </p>

                  {/* Metrics strip */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="flex items-center gap-5 mb-5 py-3 px-4 bg-surface/50 border border-border/50 rounded-xs">
                      {project.metrics.map((m, i) => (
                        <div key={m.label} className="flex items-center gap-2">
                          {i > 0 && <div className="w-px h-4 bg-border-bright" />}
                          <div className={i > 0 ? "pl-3" : ""}>
                            <span className="text-label text-muted/50 text-[8px] block">{m.label}</span>
                            <span className="font-mono text-[11px] font-bold text-accent">{m.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-label text-[9px] text-muted/70 border border-border/80 px-2.5 py-[3px] rounded-xs bg-surface/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 lg:px-7 pb-5 pt-4 border-t border-border/30 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="text-label text-muted hover:text-primary transition-colors text-[10px] inline-flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      Source
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        className="text-label text-accent hover:underline text-[10px] inline-flex items-center gap-1.5"
                      >
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                        </span>
                        Live
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectProject(project);
                    }}
                    className="text-label text-muted/60 hover:text-accent text-[10px] transition-colors"
                  >
                    Details →
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Archive Link */}
        <Reveal delay={0.2}>
          <div className="mt-20 text-center">
            <a
              href="#all-projects"
              onClick={() => sound.playClick()}
              className="text-label border border-border-bright hover:border-accent/30 px-8 py-4 hover:text-accent transition-all duration-300 inline-flex items-center gap-3 text-muted rounded-sm"
            >
              <span>View Full Archive ({projects.length})</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
