import { useState, useCallback } from "react";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { CustomCursor } from "./components/CustomCursor";
import { Preloader } from "./components/Preloader";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ProjectModal } from "./components/ProjectModal";
import { Toast, type ToastMessage } from "./components/Toast";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Architecture } from "./sections/Architecture";
import { Projects } from "./sections/Projects";
import { TechStack } from "./sections/TechStack";
import { Experience } from "./sections/Experience";
import { AllProjects } from "./sections/AllProjects";
import { Contact } from "./sections/Contact";
import type { Project } from "./data/portfolio";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useSmoothScroll();

  const onPreloaderComplete = useCallback(() => setLoaded(true), []);

  const handleShowToast = useCallback(
    (text: string, type: "success" | "info" | "error" = "info") => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, text, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const handleDismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <>
      <CustomCursor />
      <Preloader onComplete={onPreloaderComplete} />

      {loaded && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Architecture />
            <Projects onSelectProject={(p) => setSelectedProject(p)} />
            <TechStack />
            <Experience />
            <AllProjects onSelectProject={(p) => setSelectedProject(p)} />
            <Contact onShowToast={handleShowToast} />
          </main>
          <Footer />

          {/* Case Study Modal */}
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />

          {/* Toast Notification Container */}
          <Toast toasts={toasts} onDismiss={handleDismissToast} />
        </>
      )}
    </>
  );
}
