import { useState, useRef, useEffect } from "react";
import { personalData } from "../data/portfolio";
import { Reveal } from "../components/Reveal";
import { sound } from "../utils/audio";

interface LogEntry {
  type: "command" | "output" | "error" | "success";
  text: string;
}

export function About() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([
    { type: "output", text: "Initializing NaveenOS v3.2.0 [Developer Terminal]..." },
    { type: "output", text: "Type 'help' to view available system commands or click the shortcut chips below." },
    { type: "command", text: "cat overview.json" },
    {
      type: "output",
      text: JSON.stringify(
        {
          engineer: personalData.name,
          role: personalData.role,
          specialization: ["Full-Stack Engineering", "Cloud Systems", "AI Tooling"],
          status: "Available for high-impact roles",
        },
        null,
        2
      ),
    },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    sound.playClick();
    const newLogs: LogEntry[] = [...history, { type: "command", text: cmd }];
    const lower = cmd.toLowerCase();

    if (lower === "help") {
      newLogs.push({
        type: "output",
        text: `AVAILABLE COMMANDS:
  ▹ bio / about     : View professional journey & philosophy
  ▹ skills          : List core engineering proficiencies
  ▹ projects        : List featured systems & architectures
  ▹ stats           : Display engineering metrics & impact
  ▹ contact         : Show direct email, GitHub & LinkedIn
  ▹ theme <name>    : Switch theme (lime, cyan, violet, emerald)
  ▹ sudo hire       : Send hiring beacon
  ▹ clear           : Clear terminal screen`,
      });
    } else if (lower === "bio" || lower === "about" || lower === "cat bio.txt") {
      newLogs.push({
        type: "output",
        text: `${personalData.extendedBio}\n\nPhilosophy: "Build robust, scalable systems that solve tangible problems with architectural clarity."`,
      });
    } else if (lower === "skills") {
      newLogs.push({
        type: "output",
        text: `CORE STACK:\n▹ Languages: Python, TypeScript, JavaScript, SQL\n▹ Web & State: React 19, FastAPI, Node.js, Tailwind CSS\n▹ Cloud & SRE: AWS (Lambda, S3), Docker, Terraform, CI/CD Actions\n▹ AI/ML: NLP, LLM Fine-Tuning/Streaming, Vector DBs, Prompt Engineering`,
      });
    } else if (lower === "projects") {
      newLogs.push({
        type: "output",
        text: `FEATURED SYSTEMS:\n1. DevContext CLI — Autonomous Git & AI workflow context briefing tool\n2. JudgeAI — AI Legal document analysis & compliance planning system\n3. OpenEnv SRE Agent — Cloud FinOps simulator & automated remediation loop\n4. FinTrack Dashboard — High-frequency personal finance analytics engine\n\n(Explore more in the Selected Works section below)`,
      });
    } else if (lower === "stats") {
      newLogs.push({
        type: "output",
        text: `METRICS OVERVIEW:\n▹ 8+ Full-Stack Systems Built\n▹ 15+ Core Technologies Mastered\n▹ 99.9% Focus on Code Quality & Performance\n▹ 3rd Year Bachelor of Engineering Scholar`,
      });
    } else if (lower === "contact") {
      newLogs.push({
        type: "output",
        text: `DIRECT CHANNELS:\n▹ Email: ${personalData.email}\n▹ GitHub: ${personalData.github}\n▹ LinkedIn: ${personalData.linkedin}`,
      });
    } else if (lower.startsWith("theme")) {
      const parts = lower.split(" ");
      const theme = parts[1];
      if (["lime", "cyan", "violet", "emerald", "default"].includes(theme)) {
        const themeAttr = theme === "lime" ? "default" : theme;
        if (themeAttr === "default") {
          document.documentElement.removeAttribute("data-theme");
        } else {
          document.documentElement.setAttribute("data-theme", themeAttr);
        }
        localStorage.setItem("portfolio_theme", themeAttr);
        newLogs.push({
          type: "success",
          text: `[OK] Theme switched to: ${theme.toUpperCase()}`,
        });
      } else {
        newLogs.push({
          type: "error",
          text: `Unknown theme: '${theme}'. Try 'theme lime', 'theme cyan', 'theme violet', or 'theme emerald'.`,
        });
      }
    } else if (lower === "sudo hire" || lower === "hire") {
      sound.playSuccess();
      newLogs.push({
        type: "success",
        text: `🚀 INITIATING COLLABORATION SEQUENCE...\nCandidate: ${personalData.name}\nStatus: READY FOR INTERVIEWS & CONTRACTS.\nPlease scroll down to the Contact Suite or email ${personalData.email} directly!`,
      });
    } else if (lower === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    } else {
      newLogs.push({
        type: "error",
        text: `Command not found: '${cmd}'. Type 'help' for available commands.`,
      });
    }

    setHistory(newLogs);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else {
      sound.playKey();
    }
  };

  return (
    <section id="about" className="section-padding bg-surface">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Text Column */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-label text-muted tracking-[0.3em] mb-3">
                01 // PROFESSIONAL PROFILE
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-heading text-primary mb-6">
                Engineered for Reliability & Depth
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-body text-base sm:text-lg text-muted leading-relaxed mb-6">
                My approach to software engineering bridges the gap between clean frontend user experience and resilient cloud backend architectures. Every system is built from first principles with a strong focus on modularity, automated testability, and deterministic latency.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body text-base text-muted/80 leading-relaxed mb-8">
                As a 3rd-year engineering student, I combine theoretical foundations in algorithms and distributed systems with practical execution—deploying Docker containers, authoring cloud simulators, and building AI tools that solve real workflows.
              </p>
            </Reveal>

            {/* Quick Feature Points */}
            <Reveal delay={0.25}>
              <div className="space-y-3 pt-4 border-t border-border/40">
                <div className="flex items-center gap-3 text-sm font-body text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Production-grade TypeScript, Python & React apps</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-body text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Cloud architecture with AWS, Docker & Terraform IaC</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-body text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>AI/ML workflow integration with real-time streaming</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Interactive Dev Terminal */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div
                className="glass-panel border border-border rounded-sm shadow-2xl overflow-hidden flex flex-col h-[480px]"
                onClick={() => inputRef.current?.focus()}
              >
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-surface-elevated border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-label text-muted/50 text-[10px] ml-2 font-mono">
                      naveen@dev-box: ~/portfolio
                    </span>
                  </div>
                  <span className="text-label text-accent/80 text-[9px]">LIVE SHELL</span>
                </div>

                {/* Terminal Quick Action Chips */}
                <div className="flex flex-wrap gap-1.5 px-4 py-2 bg-surface-dim border-b border-border/30">
                  <span className="text-label text-muted/50 text-[8px] self-center mr-1">RUN:</span>
                  {["help", "bio", "skills", "projects", "stats", "sudo hire", "clear"].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={(e) => {
                        e.stopPropagation();
                        executeCommand(cmd);
                      }}
                      className="text-label text-[9px] px-2 py-0.5 bg-surface border border-border/60 hover:border-accent hover:text-accent text-muted transition-colors rounded-xs"
                    >
                      ${cmd}
                    </button>
                  ))}
                </div>

                {/* Terminal Log Output */}
                <div className="flex-1 p-4 overflow-y-auto font-mono text-xs leading-relaxed space-y-3 custom-scroll select-text">
                  {history.map((log, index) => (
                    <div key={index}>
                      {log.type === "command" && (
                        <div className="flex items-center gap-2 text-primary font-bold">
                          <span className="text-accent">naveen@dev ~ $</span>
                          <span>{log.text}</span>
                        </div>
                      )}
                      {log.type === "output" && (
                        <pre className="text-muted/90 whitespace-pre-wrap font-mono mt-1 font-normal">
                          {log.text}
                        </pre>
                      )}
                      {log.type === "success" && (
                        <pre className="text-accent whitespace-pre-wrap font-mono mt-1 font-semibold">
                          {log.text}
                        </pre>
                      )}
                      {log.type === "error" && (
                        <pre className="text-red-400 whitespace-pre-wrap font-mono mt-1 font-normal">
                          {log.text}
                        </pre>
                      )}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                {/* Terminal Input Line */}
                <div className="px-4 py-3 bg-surface-elevated/60 border-t border-border/40 flex items-center gap-2">
                  <span className="text-accent font-mono text-xs font-bold">naveen@dev ~ $</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type 'help' or command..."
                    className="flex-1 bg-transparent font-mono text-xs text-primary focus:outline-none placeholder:text-muted/30"
                    aria-label="Terminal command input"
                  />
                  <button
                    onClick={() => executeCommand(inputVal)}
                    className="text-label text-[9px] bg-accent text-surface px-2.5 py-1 font-bold rounded-xs hover:bg-accent-dim"
                  >
                    RUN
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
