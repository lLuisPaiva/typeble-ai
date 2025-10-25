"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, ArrowRight } from "lucide-react";

type Message = {
  id: string;
  author: "ai" | "user";
  text: string;
};

const promptSuggestions = [
  "We need a roadmap to modernize a legacy platform.",
  "How could AI agents augment our customer support?",
  "What should an enterprise-ready RAG system look like?",
];

export default function Contact() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      author: "ai",
      text: "I’m the Typeble Strategy Assistant. Tell me what you’re building or fixing and I’ll outline a plan, surface relevant case studies, and line up the right principals for a discovery call.",
    },
    {
      id: "prompt",
      author: "ai",
      text: "Start with your core challenge—new SaaS product, enterprise AI initiative, or legacy modernization?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      author: "user",
      text: value,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    const response: Message = {
      id: `ai-${Date.now()}`,
      author: "ai",
      text: "Perfect. I’ll turn that into a technical game plan and share the best-fit engagement model during a 30-minute discovery session. Use the button below to request a slot—include these notes so the principals step in prepared.",
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, response]);
      setIsProcessing(false);
    }, 700);
  };

  const handleSuggestion = (value: string) => {
    setInput(value);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-white/40"></div>
            <div className="text-xs uppercase tracking-widest text-white/80">
              Contact
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Let’s Build What’s Next.
          </h2>
          <p className="text-white/60 mt-6 max-w-2xl text-lg">
            Bring the problem keeping your engineering leadership awake. We’ll spend 30 minutes pressure-testing the opportunity—no pitch decks, just a technical session.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="border-2 border-white/20 bg-white/5 backdrop-blur-sm p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/50">Typeble Strategy Assistant</div>
                <h3 className="text-2xl font-bold text-white mt-2">Discuss Your Build</h3>
              </div>
              <span className="text-xs uppercase tracking-widest text-black bg-white px-3 py-1">Beta</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {promptSuggestions.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSuggestion(prompt)}
                  className="border border-white/20 text-white/70 text-xs uppercase tracking-widest px-3 py-2 hover:border-white/60 hover:text-white transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="h-[360px] overflow-y-auto pr-2 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.author === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`${
                        message.author === "user"
                          ? "bg-white text-black"
                          : "bg-white/10 text-white"
                      } px-4 py-3 text-sm leading-relaxed max-w-[85%]`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 text-white px-4 py-3 text-sm">Typing…</div>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSend} className="mt-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Outline your challenge…"
                  className="flex-1 bg-black/60 border border-white/20 text-white placeholder:text-white/40 px-4 py-3 focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="border border-white px-4 py-3 text-sm uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </form>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-white/60 text-sm max-w-sm">
                Copy the highlights from this chat into the invite so our principal engineers show up aligned on scope and velocity.
              </p>
              <a
                href="mailto:info@typeble.com?subject=Discovery%20Call%20with%20Typeble"
                className="inline-flex items-center justify-center border border-white px-5 py-3 text-sm uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors"
              >
                Schedule Discovery
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
          <div className="border-2 border-white/20 bg-white/5 backdrop-blur-sm p-8 h-full">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Direct Lines
            </h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-white/10 p-2 rounded-sm mr-4">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-widest text-white/70 mb-2">
                    Email
                  </div>
                  <a
                    href="mailto:info@typeble.com"
                    className="text-white hover:text-white/70 transition-colors"
                  >
                    info@typeble.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white/10 p-2 rounded-sm mr-4">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-widest text-white/70 mb-2">
                    Address
                  </div>
                  <address className="not-italic text-white/80">
                    Headquarters: Lisbon, Portugal
                  </address>
                </div>
              </div>

              <div>
                <div className="text-sm uppercase tracking-widest text-white/70 mb-3">
                  Social
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/company/typeble"
                    className="bg-white/10 p-2 rounded-sm hover:bg-white/20 transition-colors group"
                    aria-label="Connect with us on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://github.com/typeble"
                    className="bg-white/10 p-2 rounded-sm hover:bg-white/20 transition-colors group"
                    aria-label="View our GitHub"
                  >
                    <Github className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 right-20 w-32 h-32 border-2 border-white/10"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 border border-white/5"></div>
    </section>
  );
}
