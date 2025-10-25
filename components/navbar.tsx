"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-2xl tracking-tighter">
            TYPEBLE
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#services"
              className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              Services
            </Link>
            <Link
              href="#case-studies"
              className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              Case Studies
            </Link>
            <Link
              href="#process"
              className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              Process
            </Link>
            <Link
              href="#philosophy"
              className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              Philosophy
            </Link>
            <Link
              href="#engagement"
              className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              Engagement
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link
              href="#contact"
              className="border border-white px-5 py-2 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors inline-block"
            >
              Schedule Discovery
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black"
        >
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col space-y-6">
              <Link
                href="#services"
                className="text-neutral-400 hover:text-white py-2 text-2xl font-light"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#case-studies"
                className="text-neutral-400 hover:text-white py-2 text-2xl font-light"
                onClick={() => setIsOpen(false)}
              >
                Case Studies
              </Link>
              <Link
                href="#process"
                className="text-neutral-400 hover:text-white py-2 text-2xl font-light"
                onClick={() => setIsOpen(false)}
              >
                Process
              </Link>
              <Link
                href="#philosophy"
                className="text-neutral-400 hover:text-white py-2 text-2xl font-light"
                onClick={() => setIsOpen(false)}
              >
                Philosophy
              </Link>
              <Link
                href="#engagement"
                className="text-neutral-400 hover:text-white py-2 text-2xl font-light"
                onClick={() => setIsOpen(false)}
              >
                Engagement
              </Link>
              <Link
                href="#contact"
                className="border border-white px-5 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full mt-4 text-center"
              >
                Schedule Discovery
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
