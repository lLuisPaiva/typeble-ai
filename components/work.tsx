"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function Work() {
  const projects = [
    {
      title: "Autonomous Agent Fleet for Logistics",
      subtitle: "CLIENT: GLOBAL SCM PROVIDER",
      image: "/works/1.webp?height=600&width=800",
      impact: "Reduced manual intervention by 78%, delivering 24/7 predictive routing and $12M in year-one savings.",
    },
    {
      title: "RAG System for LegalTech Analysis",
      subtitle: "CLIENT: AMLAW 100 FIRM",
      image: "/works/2.webp?height=600&width=800",
      impact: "LLM fine-tuning plus secure retrieval compressed research cycles from two weeks to 48 hours with audit trails.",
    },
    {
      title: "Multi-Tenant FinTech SaaS Platform",
      subtitle: "CLIENT: SERIES B STARTUP",
      image: "/works/3.webp?height=600&width=800",
      impact: "Launched in 16 weeks with SOC 2 controls, audited ledgers, and 99.99% uptime across regions.",
    },
    {
      title: "Legacy System Modernization",
      subtitle: "CLIENT: FORTUNE 500 MANUFACTURER",
      image: "/works/4.webp?height=600&width=800",
      impact: "Retired 18 monolithic apps, unified the data fabric, and cut maintenance spend by 42% across plants.",
    },
  ]

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden">
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
            <div className="text-xs uppercase tracking-widest text-white/80">Case Studies</div>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 md:mb-0 text-white max-w-2xl">
              Our Work. Proven Impact.
            </h2>
            <a
              href="#contact"
              className="border-2 border-white/20 px-6 py-3 text-sm uppercase tracking-widest text-white/80 hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center group"
            >
              Start Your Brief
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden border-2 border-white/20 mb-4 group-hover:border-white/50 transition-all duration-300">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                
                {/* Year badge with improved visibility */}
                {/* Overlay content that appears on hover */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black/70 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-xs uppercase tracking-widest text-white/80 mb-1">Impact Snapshot</div>
                  <p className="text-white/80 text-sm leading-snug">
                    {project.impact}
                  </p>
                </div>
              </div>
              
              {/* Project title with enhanced styling */}
              <h3 className="text-2xl font-bold tracking-tighter text-white group-hover:translate-x-2 transition-transform duration-300">{project.title}</h3>
              <p className="text-white/60 group-hover:text-white/90 transition-colors text-xs uppercase tracking-[0.3em]">
                {project.subtitle}
              </p>
              
              {/* Animated underline on hover */}
              <div className="h-px w-0 bg-white group-hover:w-20 transition-all duration-300 mt-2"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-32 h-32 border border-white/10"></div>
      <div className="absolute bottom-20 left-0 w-48 h-48 border border-white/5"></div>
    </section>
  )
}
