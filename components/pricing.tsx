"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const engagements = [
  {
    name: "Embedded Talent",
    label: "Team Augmentation",
    price: "Monthly Retainer",
    description:
      "2–4 principal AI, data, or platform engineers embedded in your stack. Direct Slack/Jira integration, bi-weekly strategy syncs, and measurable velocity targets.",
    features: [
      "Principal-level specialists only",
      "Direct access to engineers",
      "Roadmap acceleration metrics",
      "Ideal for: accelerating critical initiatives",
    ],
  },
  {
    name: "Scoped Product Build",
    label: "Project-Based (Most Selected)",
    price: "Fixed Project Quote",
    description:
      "Cross-functional pod delivering custom SaaS development or enterprise AI solutions with defined scope, timeline, and budget. Includes architecture runway, security hardening, and documentation.",
    features: [
      "Product, architect, engineers, QA",
      "Fixed budget & timeline",
      "Full IP & code ownership",
      "Ideal for: new platforms, AI pilots",
    ],
  },
  {
    name: "Strategic Partner",
    label: "Strategic Retainer",
    price: "Custom Retainer",
    description:
      "Long-term partnership covering legacy system modernization, ongoing MLOps, and product innovation. Dedicated, scalable team owning roadmap, governance, and continuous deployment.",
    features: [
      "Dedicated principal leadership",
      "Proactive architecture & roadmap",
      "Ongoing MLOps & SRE support",
      "Ideal for: enterprise transformation",
    ],
  },
]

export default function Pricing() {
  return (
    <section id="engagement" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
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
            <div className="text-xs uppercase tracking-widest text-white/80">Engagement Models</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Flexible Engagement.
            <br />
            <span className="text-white/70">No Black Boxes.</span>
          </h2>
          <p className="text-white/60 mt-6 max-w-2xl text-lg">
            Choose the model that aligns with your roadmap—each designed for transparency, velocity, and full IP ownership.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {engagements.map((engagement, index) => (
            <div
              key={index}
              className={`border-2 border-white/20 p-8 relative bg-white/5 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300`}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-3">{engagement.label}</div>
              <h3 className="text-2xl font-bold mb-2 text-white">{engagement.name}</h3>
              <div className="text-white/70 text-sm uppercase tracking-widest mb-6">{engagement.price}</div>
              <p className="text-white/70 mb-6 leading-relaxed">{engagement.description}</p>
              <ul className="space-y-4 mb-8">
                {engagement.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start group">
                    <Check className="w-5 h-5 mr-3 text-white/60 group-hover:text-white flex-shrink-0 mt-0.5 transition-colors duration-300" />
                    <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="w-full inline-flex justify-center py-3 text-sm uppercase tracking-widest border-2 border-white/40 text-white hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                Schedule Discovery
              </a>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-40 left-10 w-32 h-32 border border-white/10"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-white/5"></div>
    </section>
  )
}
