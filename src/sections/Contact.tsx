import { useState } from "react";
import { personalData } from "../data/portfolio";
import { Reveal } from "../components/Reveal";
import { sound } from "../utils/audio";

interface ContactProps {
  onShowToast: (text: string, type: "success" | "info" | "error") => void;
}

export function Contact({ onShowToast }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    onShowToast("Email address copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      sound.playTone(300, "sawtooth", 0.1, 0.05);
      onShowToast("Please fill in all fields before sending.", "error");
      return;
    }

    sound.playClick();
    setIsSubmitting(true);

    // Simulate reliable transmission and draft direct email
    setTimeout(() => {
      sound.playSuccess();
      setIsSubmitting(false);
      onShowToast("Message dispatched successfully! Opening mail client...", "success");

      // Open mailto link as fallback guarantee
      const mailtoUrl = `mailto:${personalData.email}?subject=${encodeURIComponent(
        `Portfolio Contact from ${name}`
      )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;

      setName("");
      setEmail("");
      setMessage("");
    }, 600);
  };

  return (
    <section id="contact" className="section-padding bg-surface-dim border-t border-border">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Reveal>
                <p className="text-label text-accent tracking-[0.3em] mb-3">
                  07 // INITIATE TRANSMISSION
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-heading text-primary mb-6">
                  Let's Build Systems Together
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="font-body text-base text-muted leading-relaxed mb-8">
                  Whether you're looking for a software engineer to build scalable web applications, design cloud infrastructure, or optimize AI pipelines—my inbox is always open.
                </p>
              </Reveal>

              {/* Quick Copy Email Card */}
              <Reveal delay={0.2}>
                <div className="glass-panel p-6 border border-border/80 rounded-sm mb-6">
                  <span className="text-label text-muted/60 text-[9px] block mb-2">
                    DIRECT EMAIL INBOX
                  </span>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-sm text-primary truncate">
                      {personalData.email}
                    </span>
                    <button
                      onClick={copyEmail}
                      className="text-label bg-accent text-surface px-3 py-1.5 rounded-xs font-bold text-[10px] hover:bg-accent-dim transition-colors shrink-0"
                    >
                      {copied ? "COPIED ✓" : "COPY EMAIL"}
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Social Channels */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="text-label border border-border px-4 py-2 hover:border-accent hover:text-accent transition-colors rounded-xs text-[10px]"
                >
                  GitHub ↗
                </a>
                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="text-label border border-border px-4 py-2 hover:border-accent hover:text-accent transition-colors rounded-xs text-[10px]"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={personalData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="text-label border border-border px-4 py-2 hover:border-accent hover:text-accent transition-colors rounded-xs text-[10px]"
                >
                  Twitter ↗
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-border/30 mt-8 hidden lg:block">
              <span className="text-label text-muted/50 text-[9px]">
                RESPONSE TIME: TYPICALLY WITHIN 24 HOURS
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <form
                onSubmit={handleSubmit}
                className="glass-panel p-8 border border-border rounded-sm shadow-2xl space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-border/40">
                  <span className="text-label text-muted text-[10px]">
                    COMMUNICATION FORM
                  </span>
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-label text-muted text-[9px] block mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={() => sound.playKey()}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-surface border border-border px-4 py-3 text-sm text-primary focus:border-accent focus:outline-none rounded-xs placeholder:text-muted/30"
                    />
                  </div>

                  <div>
                    <label className="text-label text-muted text-[9px] block mb-2">
                      YOUR EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={() => sound.playKey()}
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-surface border border-border px-4 py-3 text-sm text-primary focus:border-accent focus:outline-none rounded-xs placeholder:text-muted/30"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-label text-muted text-[9px]">
                      PROJECT DETAILS & INQUIRY *
                    </label>
                    <span className="text-label text-muted/40 text-[9px]">
                      {message.length} chars
                    </span>
                  </div>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={() => sound.playKey()}
                    placeholder="Describe your engineering role, project requirements, or opportunity..."
                    className="w-full bg-surface border border-border p-4 text-sm text-primary focus:border-accent focus:outline-none rounded-xs placeholder:text-muted/30 resize-none font-body"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-label bg-accent text-surface py-4 font-bold tracking-wider hover:bg-accent-dim transition-all duration-300 rounded-xs shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3 h-3 border-2 border-surface border-t-transparent rounded-full animate-spin" />
                      <span>DISPATCHING MESSAGE...</span>
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT MESSAGE</span>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
