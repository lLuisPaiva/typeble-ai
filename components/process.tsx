"use client";

import { motion } from "framer-motion";
import { AccordionItem, AccordionSingle } from "@/components/ui/accordion";

const steps = [
  {
    number: "01",
    title: "Deep Discovery & Architecture",
    description: "Principal engineers embed, audit systems, and shape a measurable technical thesis before code ships.",
    detail: [
      "Architecture working session with principal leads",
      "Legacy system audit and risk register",
      "ROI and velocity targets agreed with stakeholders",
    ],
  },
  {
    number: "02",
    title: "Sprint Zero & Prototyping",
    description: "We lock the stack, automation, and data foundations with high-fidelity prototypes for sign-off.",
    detail: [
      "CI/CD runway, IaC, and observability baselines",
      "Security, compliance, and data access controls",
      "Prototype demo aligned to the architecture charter",
    ],
  },
  {
    number: "03",
    title: "Agile Co-Creation",
    description: "Two-week sprints, open repos, and unfiltered access to Typeble leads keep delivery transparent.",
    detail: [
      "Weekly demos with roadmap and risk updates",
      "Dedicated Slack, Jira, and shared documentation",
      "Velocity snapshots and quality metrics each sprint",
    ],
  },
  {
    number: "04",
    title: "Rigorous QA & Security",
    description: "Compliance-first workflows embed security and QA from the first sprint, not as a hand-off.",
    detail: [
      "SOC 2, HIPAA, GDPR controls verified",
      "Automated testing and performance benchmarking",
      "Third-party penetration and red-team coordination",
    ],
  },
  {
    number: "05",
    title: "Deployment & Scalable Hand-off",
    description: "Production launch with knowledge transfer, documentation, and optional ongoing SRE/MLOps support.",
    detail: [
      "Cutover playbooks with rollback plans",
      "Runbooks, diagrams, and ownership matrix",
      "Post-launch shadowing or managed runway",
    ],
  },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-[#0a0a0a] py-24">
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
            <div className="text-xs uppercase tracking-widest text-white/80">Process</div>
          </div>
          <h2 className="text-4xl font-bold tracking-tighter text-white md:text-5xl">
            Our Framework.
            <br />
            <span className="text-white/90">From Ambition to Deployment.</span>
          </h2>
        </motion.div>

        <AccordionSingle defaultValue={steps[0]?.number ?? null} className="space-y-5">
          {steps.map((step) => (
            <AccordionItem
              key={step.number}
              value={step.number}
              title={step.title}
              eyebrow={`Step ${step.number}`}
              description={step.description}
            >
              <ul className="space-y-3 text-white/75">
                {step.detail.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-white" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionItem>
          ))}
        </AccordionSingle>
      </div>

      <div className="absolute top-40 right-20 h-32 w-32 border border-white/10" />
      <div className="absolute bottom-60 left-20 h-40 w-40 border border-white/5" />
    </section>
  );
}
