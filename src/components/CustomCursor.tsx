import { useEffect, useRef } from "react";
import { useIsTouchDevice } from "../hooks/useMediaQuery";

export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    if (isTouch) return;

    let raf: number;
    const lerped = { x: 0, y: 0 };

    function onMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY };
      const inner = innerRef.current;
      const outer = outerRef.current;
      if (inner) {
        inner.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
      if (!visible.current) {
        visible.current = true;
        if (outer) outer.style.opacity = "1";
        if (inner) inner.style.opacity = "1";
      }
    }

    function onLeave() {
      visible.current = false;
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (outer) outer.style.opacity = "0";
      if (inner) inner.style.opacity = "0";
    }

    function animate() {
      lerped.x += (pos.current.x - lerped.x) * 0.14;
      lerped.y += (pos.current.y - lerped.y) * 0.14;
      const outer = outerRef.current;
      if (outer) {
        outer.style.transform = `translate(${lerped.x - 20}px, ${lerped.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    }

    function onLinkEnter() {
      const outer = outerRef.current;
      if (outer) {
        outer.style.width = "54px";
        outer.style.height = "54px";
        outer.style.borderColor = "var(--color-accent)";
        outer.style.background = "var(--color-accent-glow)";
      }
    }

    function onLinkLeave() {
      const outer = outerRef.current;
      if (outer) {
        outer.style.width = "40px";
        outer.style.height = "40px";
        outer.style.borderColor = "rgba(201,168,76,0.25)";
        outer.style.background = "transparent";
      }
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(animate);

    const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onLinkEnter);
      el.addEventListener("mouseleave", onLinkLeave);
    });

    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll("a, button, [role='button'], input, textarea");
      els.forEach((el) => {
        el.addEventListener("mouseenter", onLinkEnter);
        el.addEventListener("mouseleave", onLinkLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={outerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.25)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transition: "width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, background-color 0.25s, opacity 0.25s",
          willChange: "transform",
        }}
      />
      <div
        ref={innerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--color-accent)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transition: "opacity 0.25s",
          willChange: "transform",
        }}
      />
    </>
  );
}
