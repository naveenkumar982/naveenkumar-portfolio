import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "../data/portfolio";
import { Reveal } from "../components/Reveal";
import { sound } from "../utils/audio";

type Category = "All" | "AI/ML" | "SRE/Cloud" | "DevTools";

interface AllProjectsProps {
  onSelectProject: (p: Project) => void;
}

export function AllProjects({ onSelectProject }: AllProjectsProps) {
  const [filter, setFilter] = useState<Category>("All");
  const categories: Category[] = ["All", "AI/ML", "SRE/Cloud", "DevTools"];
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const handleFilter = (cat: Category) => {
    sound.playClick();
    setFilter(cat);
  };

  return (
    <section id="all-projects" className="section-padding bg-surface border-t border-border/40">
      <div className="section-container">
        <Reveal>
          <p className="text-label text-muted tracking-[0.3em] mb-3">
            06 // PROJECT ARCHIVE
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-heading text-primary mb-4">
            Technical Prototypes & Tooling Repository
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-body text-base sm:text-lg text-muted max-w-2xl leading-relaxed mb-10">
            A comprehensive repository of all developed systems, utilities, and prototypes exploring full-stack web applications, AI/ML APIs, and developer workflows.
          </p>
        </Reveal>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-border/40">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`text-label text-[10px] px-4 py-1.5 border transition-all duration-200 rounded-xs ${
                filter === cat
                  ? "border-accent bg-accent/10 text-accent font-bold"
                  : "border-border text-muted hover:text-primary hover:border-border-bright"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of All Projects */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group glass-panel border border-border/70 hover:border-accent/40 transition-colors rounded-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => {
                      sound.playClick();
                      onSelectProject(project);
                    }}
                    className="relative aspect-video overflow-hidden bg-surface-dim cursor-pointer"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent opacity-60" />
                    <span className="absolute top-3 left-3 text-label bg-accent text-surface px-2 py-0.5 text-[8px] font-bold">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3
                      onClick={() => {
                        sound.playClick();
                        onSelectProject(project);
                      }}
                      className="font-display text-lg font-bold text-primary mb-1 group-hover:text-accent transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    <p className="text-label text-muted text-[9px] mb-3">
                      {project.subtitle}
                    </p>
                    <p className="font-body text-xs text-muted/80 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-label text-[8px] text-muted/70 border border-border/60 px-2 py-0.5 bg-surface"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-4 pt-3 border-t border-border/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="text-label text-[9px] text-muted hover:text-primary transition-colors"
                    >
                      Source Code
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        className="text-label text-[9px] text-accent hover:underline inline-flex items-center gap-1"
                      >
                        <span className="w-1 h-1 bg-accent rounded-full animate-ping" />
                        Live Demo
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectProject(project);
                    }}
                    className="text-label text-muted hover:text-accent text-[9px]"
                  >
                    Specs ↗
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
