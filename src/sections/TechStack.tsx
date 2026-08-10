import { useState } from "react";
import { skills, type SkillItem } from "../data/portfolio";
import { Reveal } from "../components/Reveal";
import { sound } from "../utils/audio";

const iconPaths: Record<string, string> = {
  code: "M10 20l4-16M4 8l-4 4 4 4M20 8l4 4-4 4",
  cloud: "M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  cpu: "M18 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3",
  terminal: "M4 17l6-5-6-5M12 19h8",
  "git-branch": "M6 3v12M18 9a3 3 0 11-6 0 3 3 0 016 0zM6 21a3 3 0 11-6 0 3 3 0 016 0zM18 9a9 9 0 01-9 9",
};

function SkillIcon({ icon }: { icon: string }) {
  const d = iconPaths[icon] || iconPaths.code;
  return (
    <svg
      className="w-6 h-6 text-accent"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

type SkillCategory = "All" | SkillItem["category"];

export function TechStack() {
  const [selectedCat, setSelectedCat] = useState<SkillCategory>("All");
  const categories: SkillCategory[] = [
    "All",
    "Languages",
    "Full-Stack",
    "Cloud & DevOps",
    "AI/ML",
    "Data & Tools",
  ];

  const filteredSkills =
    selectedCat === "All"
      ? skills
      : skills.filter((s) => s.category === selectedCat);

  const handleCategory = (cat: SkillCategory) => {
    sound.playClick();
    setSelectedCat(cat);
  };

  return (
    <section id="skills" className="section-padding bg-surface-dim/30 border-t border-border/40">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <Reveal>
              <p className="text-label text-muted tracking-[0.3em] mb-3">
                04 // CORE COMPETENCIES
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-heading text-primary">Tech Ecosystem & Radar</h2>
            </Reveal>
          </div>

          {/* Category Chips */}
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`text-label text-[10px] px-3.5 py-1.5 border transition-all duration-200 rounded-xs ${
                    selectedCat === cat
                      ? "border-accent bg-accent/10 text-accent font-bold"
                      : "border-border text-muted hover:text-primary hover:border-border-bright"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Skills Grid with Level Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="glass-panel p-6 border border-border/70 hover:border-accent/50 transition-all duration-300 rounded-sm group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-surface border border-border/60 rounded-xs group-hover:border-accent/40 transition-colors">
                      <SkillIcon icon={skill.icon} />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-primary">
                        {skill.name}
                      </h4>
                      <span className="text-label text-muted/60 text-[9px]">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-accent font-semibold">
                    {skill.level}%
                  </span>
                </div>

                <p className="font-body text-xs text-muted leading-relaxed mb-4">
                  {skill.detail}
                </p>
              </div>

              {/* Proficiency Level Bar */}
              <div className="w-full bg-surface-dim h-1.5 overflow-hidden rounded-full border border-border/40">
                <div
                  className="bg-accent h-full transition-all duration-500 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
