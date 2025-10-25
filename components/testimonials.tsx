"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export default function Testimonials() {
  return (
    <section id="philosophy" className="py-24 relative overflow-hidden">
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
            <div className="text-xs uppercase tracking-widest text-white/80">Client Proof</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-2 border-white/20 p-8 md:p-12 bg-white/5 backdrop-blur-sm">
            <div className="absolute top-6 right-8 text-white/10 opacity-60">
              <Quote size={120} />
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <blockquote className="text-2xl md:text-3xl font-light mb-8 leading-relaxed text-white">
                  “This isn’t an ‘agency’; it’s our strategic engineering partner. They diagnosed the architectural failure costing us millions, rebuilt the core platform, and unlocked the next $100M in ARR. Their principals feel like an internal strike team.”
                </blockquote>
                <div className="mt-auto flex items-center">
                  <div className="w-12 h-px bg-white/40 mr-4"></div>
                  <div>
                    <div className="font-bold text-white">Jane K. Doe</div>
                    <div className="text-white/70 text-sm">Chief Technology Officer, [Client Company Name]</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual accent elements */}
      <div className="absolute top-40 right-20 w-56 h-56 border border-white/5"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 border-2 border-white/10"></div>
    </section>
  )
}
