"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import type { Language } from "@/translations";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, translations, languageMeta } = useLanguage();
  const t = translations.navbar;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
  };

  const renderLanguageButtons = (variant: "desktop" | "mobile") => (
    <div className={variant === "desktop" ? "flex items-center gap-2" : "flex items-center gap-3"}>
      {languageMeta.map((meta) => {
        const isActive = meta.code === language;
        const baseClasses =
          variant === "desktop"
            ? "text-xs uppercase tracking-[0.4em] transition-colors"
            : "text-2xl font-light uppercase tracking-[0.3em] transition-colors";

        return (
          <button
            key={meta.code}
            onClick={() => {
              handleLanguageChange(meta.code as Language);
              if (variant === "mobile") {
                setIsOpen(false);
              }
            }}
            className={`${baseClasses} ${
              isActive ? "text-white" : "text-neutral-400 hover:text-white"
            }`}
            aria-pressed={isActive}
            aria-label={`Switch to ${meta.name}`}
          >
            {meta.label}
          </button>
        );
      })}
    </div>
  );

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
              {t.services}
            </Link>
            <Link
              href="#case-studies"
              className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              {t.caseStudies}
            </Link>
            <Link
              href="#process"
              className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              {t.process}
            </Link>
            <Link
              href="#philosophy"
              className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              {t.philosophy}
            </Link>
            <Link
              href="#engagement"
              className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-widest"
            >
              {t.engagement}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {renderLanguageButtons("desktop")}
            <Link
              href="#contact"
              className="border border-white px-5 py-2 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors inline-block"
            >
              {t.cta}
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

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
                {t.services}
              </Link>
              <Link
                href="#case-studies"
                className="text-neutral-400 hover:text-white py-2 text-2xl font-light"
                onClick={() => setIsOpen(false)}
              >
                {t.caseStudies}
              </Link>
              <Link
                href="#process"
                className="text-neutral-400 hover:text-white py-2 text-2xl font-light"
                onClick={() => setIsOpen(false)}
              >
                {t.process}
              </Link>
              <Link
                href="#philosophy"
                className="text-neutral-400 hover:text-white py-2 text-2xl font-light"
                onClick={() => setIsOpen(false)}
              >
                {t.philosophy}
              </Link>
              <Link
                href="#engagement"
                className="text-neutral-400 hover:text-white py-2 text-2xl font-light"
                onClick={() => setIsOpen(false)}
              >
                {t.engagement}
              </Link>
              <div className="pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-3">
                  {renderLanguageButtons("mobile")}
                </div>
              </div>
              <Link
                href="#contact"
                className="border border-white px-5 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full mt-4 text-center"
                onClick={() => setIsOpen(false)}
              >
                {t.cta}
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
}
