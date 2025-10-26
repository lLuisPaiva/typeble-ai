"use client";

import { motion } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const engagements = [
  {
    id: "embedded",
    name: "Embedded Talent",
    label: "Team Augmentation",
    price: "Monthly Retainer",
    description:
      "2–4 principal AI, data, or platform engineers embedded inside your team with bi-weekly strategy syncs and transparent velocity metrics.",
    outcomes: [
      "Principal-level specialists dedicated to your roadmap",
      "Slack, Jira, and repo access for real-time collaboration",
      "Velocity scorecard with agreed KPIs every sprint",
      "Ideal for augmenting critical initiatives",
    ],
    signal: "Use when you need senior capacity without losing internal context.",
  },
  {
    id: "product",
    name: "Scoped Product Build",
    label: "Project-Based (Most Selected)",
    price: "Fixed Project Quote",
    description:
      "Cross-functional pod delivering custom SaaS products or enterprise AI platforms with locked scope, timeline, and budget.",
    outcomes: [
      "Product lead, architect, engineers, QA, and delivery manager",
      "Architecture runway, IaC, and security hardening included",
      "Weekly demos, burn-up charts, and risk register",
      "Ideal for net-new platform launches or AI pilots",
    ],
    signal: "Use when you need accountable delivery with executive-ready reporting.",
  },
  {
    id: "partner",
    name: "Strategic Partner",
    label: "Strategic Retainer",
    price: "Custom Retainer",
    description:
      "Long-term partnership covering modernization, MLOps, governance, and roadmap ownership with a scalable dedicated team.",
    outcomes: [
      "Embedded principal leadership and architecture council",
      "Proactive backlog shaping, experimentation, and benchmarking",
      "Continuous delivery, SRE, and MLOps coverage",
      "Ideal for enterprise transformation mandates",
    ],
    signal: "Use when you expect an enduring partner across product, data, and platform.",
  },
];

export default function Pricing() {
  return (
    <section id="engagement" className="relative overflow-hidden bg-[#0a0a0a] py-24">
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-12 bg-white/40" />
            <div className="text-xs uppercase tracking-widest text-white/80">Engagement Models</div>
          </div>
          <h2 className="text-4xl font-bold tracking-tighter text-white md:text-5xl">
            Flexible Engagement.
            <br />
            <span className="text-white/70">No Black Boxes.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-white/60">
            Choose the model that meets your operating tempo—each guarantees transparency, principal ownership, and full IP rights.
          </p>
        </motion.div>

        <Tabs defaultValue={engagements[1]?.id ?? engagements[0].id} className="mt-10">
          <TabsList className="flex-col gap-3 bg-black/50 p-4 sm:flex-row sm:gap-4">
            {engagements.map((engagement) => (
              <TabsTrigger key={engagement.id} value={engagement.id} className="flex-1">
                {engagement.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {engagements.map((engagement) => (
            <TabsContent key={engagement.id} value={engagement.id}>
              <div className="border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">{engagement.label}</p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">{engagement.name}</h3>
                  </div>
                  <div className="text-sm uppercase tracking-[0.3em] text-white/60">{engagement.price}</div>
                </div>

                <p className="mt-6 max-w-3xl text-white/70">{engagement.description}</p>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <ul className="space-y-4">
                    {engagement.outcomes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="mt-1 h-4 w-4 text-white/70" aria-hidden="true" />
                        <span className="text-sm text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col justify-between gap-4 border border-white/10 bg-black/40 p-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">Signal It’s Right</p>
                      <p className="mt-2 text-sm text-white/75">{engagement.signal}</p>
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center border border-white px-5 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-black"
                    >
                      Schedule Discovery
                      <ExternalLink className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="absolute left-10 top-40 h-32 w-32 border border-white/10" />
      <div className="absolute bottom-20 right-10 h-48 w-48 border-2 border-white/5" />
    </section>
  );
}
