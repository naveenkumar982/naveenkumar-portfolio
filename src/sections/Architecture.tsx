import { useState } from "react";
import { architecture } from "../data/portfolio";
import { Reveal } from "../components/Reveal";
import { sound } from "../utils/audio";

export function Architecture() {
  const [selectedId, setSelectedId] = useState(architecture[0].id);

  const handleSelect = (id: string) => {
    sound.playClick();
    setSelectedId(id);
  };

  const activeNode = architecture.find((n) => n.id === selectedId) || architecture[0];

  return (
    <section id="architecture" className="section-padding bg-surface-dim/40 border-y border-border/40">
      <div className="section-container">
        <div className="max-w-3xl mb-16">
          <Reveal>
            <p className="text-label text-muted tracking-[0.3em] mb-3">
              02 // SYSTEM ARCHITECTURE
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-heading text-primary mb-4">
              Tiered Architectural Model
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-body text-base sm:text-lg text-muted leading-relaxed">
              Every system is engineered across three cohesive tiers: high-performance responsive presentation layers, resilient asynchronous backend APIs, and declarative automated cloud infrastructure.
            </p>
          </Reveal>
        </div>

        {/* Interactive Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {architecture.map((node, i) => {
            const isSelected = selectedId === node.id;
            return (
              <div
                key={node.id}
                onClick={() => handleSelect(node.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSelect(node.id)}
                className={`glass-panel p-6 md:p-8 cursor-pointer transition-all duration-300 relative rounded-sm ${
                  isSelected
                    ? "border-accent ring-1 ring-accent/50 bg-surface-elevated shadow-xl"
                    : "border-border hover:border-border-bright hover:bg-surface-dim"
                }`}
              >
                {/* Status Dot */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isSelected ? "bg-accent animate-pulse" : "bg-muted/40"
                      }`}
                    />
                    <span className="text-label text-muted text-[10px]">
                      TIER 0{i + 1}
                    </span>
                  </div>
                  <span className="text-label text-accent font-mono text-[10px]">
                    {isSelected ? "ACTIVE VIEW" : "CLICK TO INSPECT"}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-primary mb-2">
                  {node.title}
                </h3>
                <p className="text-label text-accent/90 text-[10px] mb-4">
                  {node.stack}
                </p>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {node.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Tier Deep-Dive Drawer */}
        <Reveal delay={0.1}>
          <div className="glass-panel border border-border p-6 md:p-8 bg-surface-elevated/70 rounded-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/40">
              <div>
                <span className="text-label text-muted/60 text-[9px] tracking-widest block mb-1">
                  DEEP SPECIFICATION
                </span>
                <h4 className="font-display text-lg sm:text-xl font-semibold text-primary">
                  {activeNode.title} — Architectural Guidelines
                </h4>
              </div>
              <span className="text-label bg-accent text-surface px-3 py-1 text-[10px] font-bold self-start md:self-auto">
                {activeNode.stack}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {activeNode.points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="font-mono text-accent font-bold mt-0.5 text-sm">
                    0{idx + 1}.
                  </span>
                  <p className="font-body text-sm text-primary/90 leading-relaxed">
                    {pt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
