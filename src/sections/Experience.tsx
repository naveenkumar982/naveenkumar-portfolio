import { experienceData } from "../data/portfolio";
import { Reveal } from "../components/Reveal";

export function Experience() {
  return (
    <section id="experience" className="section-padding bg-surface">
      <div className="section-container">
        <div className="max-w-3xl mb-16">
          <Reveal>
            <p className="text-label text-muted tracking-[0.3em] mb-3">
              05 // ENGINEERING JOURNEY
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-heading text-primary mb-4">
              Milestones & Academic Profile
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-body text-base sm:text-lg text-muted leading-relaxed">
              Synthesizing rigorous academic computer engineering coursework with hands-on open-source development and modern cloud applications.
            </p>
          </Reveal>
        </div>

        {/* Timeline Grid */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-border/60">
          {experienceData.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={item.period}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                } gap-6 md:gap-12 pl-12 md:pl-0`}
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-surface border-2 border-accent flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2">
                  <div className="glass-panel p-6 md:p-8 border border-border/80 hover:border-accent/40 transition-colors rounded-sm shadow-xl">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="text-label text-accent font-mono text-[10px]">
                        {item.period}
                      </span>
                      {item.badge && (
                        <span className="text-label bg-surface-dim border border-border text-muted px-2.5 py-0.5 text-[9px]">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-bold text-primary mb-1">
                      {item.role}
                    </h3>
                    <p className="text-label text-muted/70 text-[10px] mb-4">
                      {item.organization}
                    </p>

                    <p className="font-body text-sm text-muted leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-border/40">
                      {item.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-xs text-primary/80 font-body">
                          <span className="text-accent font-mono">▹</span>
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
