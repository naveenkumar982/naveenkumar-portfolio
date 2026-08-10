import { useState, useEffect } from "react";
import { personalData } from "../data/portfolio";
import { sound } from "../utils/audio";

const footerLinks = [
  { label: "GitHub", href: personalData.github },
  { label: "LinkedIn", href: personalData.linkedin },
  { label: "Twitter", href: personalData.twitter },
  { label: "Email", href: `mailto:${personalData.email}` },
];

export function Footer() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      role="contentinfo"
      className="bg-surface border-t border-border pt-16 pb-12 text-primary"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-border/50">
          {/* Brand & Bio snippet */}
          <div className="md:col-span-6">
            <span className="font-display text-2xl font-bold tracking-tight block">
              {personalData.name.toUpperCase()}
            </span>
            <p className="text-label text-accent mt-2 text-[10px] tracking-widest">
              FULL-STACK DEVELOPER & CLOUD ARCHITECT
            </p>
            <p className="font-body text-sm text-muted max-w-md mt-4 leading-relaxed">
              Crafting high-scale software applications, intelligent AI pipelines, and cloud systems with unwavering architectural discipline.
            </p>
          </div>

          {/* Time & System Status */}
          <div className="md:col-span-3">
            <span className="text-label text-muted/60 text-[9px] tracking-widest block mb-2">
              LOCAL SYSTEM TIME
            </span>
            <div className="font-mono text-sm text-primary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>{currentTime || "12:00:00 PM"} (IST)</span>
            </div>
            <p className="text-label text-muted/70 text-[9px] mt-2">
              LOCATION: {personalData.location.toUpperCase()}
            </p>
          </div>

          {/* Quick links & Back to top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div className="flex flex-wrap gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  onClick={() => sound.playClick()}
                  className="text-label text-muted hover:text-accent transition-colors duration-200 text-[10px]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 text-label text-muted hover:text-primary border border-border px-4 py-2 hover:border-accent transition-colors duration-200 inline-flex items-center gap-2 text-[10px]"
            >
              <span>BACK TO TOP</span>
              <span className="text-accent">↑</span>
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-label text-muted/50 text-[10px] tracking-[0.1em]">
            © {new Date().getFullYear()} {personalData.name.toUpperCase()}. BUILT WITH REACT 19 & TAILWIND CSS.
          </p>
          <p className="text-label text-accent/80 text-[10px] tracking-[0.1em]">
            SYSTEM HEALTH: 100% OPERATIONAL
          </p>
        </div>
      </div>
    </footer>
  );
}
