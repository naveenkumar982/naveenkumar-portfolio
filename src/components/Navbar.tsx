import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalData } from "../data/portfolio";
import { ThemeAudioControls } from "./ThemeAudioControls";
import { sound } from "../utils/audio";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleClick = () => {
    sound.playClick();
    setMobileOpen(false);
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "py-2.5 bg-surface/85 backdrop-blur-2xl border-b border-border/60 shadow-2xl shadow-black/20"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={() => sound.playClick()}
          className="font-display text-[15px] font-bold tracking-tight text-primary-bright flex items-center gap-2.5 group"
          aria-label="Go to top"
        >
          <span
            className="w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform duration-300"
            style={{ boxShadow: "0 0 8px var(--color-accent-glow)" }}
          />
          <span className="opacity-90 group-hover:opacity-100 transition-opacity">{personalData.name.toUpperCase()}</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7">
          <nav role="navigation" aria-label="Main" className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleClick}
                className="text-label text-muted hover:text-primary-bright transition-colors duration-200 relative group text-[10px]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-accent to-accent-rose transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="h-5 w-px bg-border-bright mx-1" />

          <ThemeAudioControls />

          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="text-label bg-gradient-to-r from-accent to-accent-warm text-surface px-4 py-2 font-bold text-[10px] rounded-sm hover:shadow-lg hover:shadow-accent/15 hover:scale-[1.03] transition-all duration-300"
          >
            LET'S TALK
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-3">
          <ThemeAudioControls />
          <button
            onClick={() => {
              sound.playClick();
              setMobileOpen(!mobileOpen);
            }}
            className="p-2.5 border border-border-bright bg-surface-dim/80 backdrop-blur-md text-primary flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-sm"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className={`block w-5 h-[1.5px] bg-primary-bright transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-primary-bright transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-x-0 top-[58px] bg-surface/98 backdrop-blur-3xl border-b border-border-bright p-8 flex flex-col gap-6 z-50 shadow-2xl"
          >
            <nav className="flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  onClick={handleClick}
                  className="font-display text-xl font-medium text-primary hover:text-accent transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-label text-muted/30 text-[10px]">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>
            <div className="pt-4 border-t border-border">
              <a
                href="#contact"
                onClick={handleClick}
                className="block text-label bg-gradient-to-r from-accent to-accent-warm text-surface text-center py-3.5 font-bold tracking-wider rounded-sm"
              >
                START A CONVERSATION
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
