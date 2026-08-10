import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const images = Array.from(document.images);
    const totalResources = Math.max(images.length, 1);
    let loaded = 0;

    function tick() {
      loaded++;
      setProgress(Math.min(Math.round((loaded / totalResources) * 100), 100));
    }

    if (images.length === 0) {
      const timer = setTimeout(() => setProgress(100), 500);
      return () => clearTimeout(timer);
    }

    images.forEach((img) => {
      if (img.complete) {
        tick();
      } else {
        img.addEventListener("load", tick, { once: true });
        img.addEventListener("error", tick, { once: true });
      }
    });

    const safety = setTimeout(() => setProgress(100), 4000);
    return () => clearTimeout(safety);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setIsDone(true), 400);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    if (isDone) {
      const timer = setTimeout(onComplete, 700);
      return () => clearTimeout(timer);
    }
  }, [isDone, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(180deg, #06060a 0%, #0a0a12 50%, #06060a 100%)",
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 40% 30% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)",
            }}
          />

          {/* Name reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <span
              className="font-display text-[10px] font-bold tracking-[0.5em] mb-6"
              style={{
                background: "linear-gradient(135deg, #c9a84c 0%, #e8657a 50%, #d4956b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              PORTFOLIO
            </span>

            <motion.span
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.08em", opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-4xl font-bold text-primary-bright tracking-tight"
            >
              NAVEEN KUMAR TV
            </motion.span>
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 mt-12 w-40">
            <div className="h-[2px] bg-border/30 overflow-hidden rounded-full">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #c9a84c 0%, #e8657a 50%, #d4956b 100%)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 0.4 }}
              className="text-label text-muted mt-3 text-[9px] block text-center tracking-[0.2em]"
            >
              {progress < 100 ? "LOADING" : "READY"}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
