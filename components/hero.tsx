"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TextGenerateEffect } from "./TextGenerateEffect";

export default function Hero() {
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!shapeRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Create a more pronounced 3D effect for the shape
      const xPos = (clientX / innerWidth - 0.5) * 10;
      const yPos = (clientY / innerHeight - 0.5) * 10;
      const rotateX = -yPos * 0.5; // Rotate based on Y position
      const rotateY = xPos * 0.5; // Rotate based on X position

      shapeRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${
        xPos * 0.3
      }px, ${yPos * 0.3}px, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const shapeAnimationDelay = 0.6;

  return (
    <section className="relative flex items-center px-10 py-[100px] sm:py-[110px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#222_0%,_#000_100%)]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="inline-block border border-neutral-800 px-3 py-1 text-xs uppercase tracking-widest text-neutral-400">
                Digital Design Studio
              </div>
            </motion.div>
            <h1>
              <TextGenerateEffect
                words="MINIMAL"
                className="text-5xl md:text-7xl lg:text-8xl font-bold m-0 leading-tight tracking-tighter"
                duration={0.5}
                speed={0.2}
                initialDelay={0.2}
              />
              <TextGenerateEffect
                words="BRUTALIST"
                className="text-5xl md:text-7xl lg:text-8xl font-bold m-0 leading-tight tracking-tighter text-neutral-400"
                duration={0.5}
                speed={0.2}
                initialDelay={0.4}
              />
              <TextGenerateEffect
                words="DESIGN"
                className="text-5xl md:text-7xl lg:text-8xl font-bold m-2 leading-tight tracking-tighter"
                duration={0.5}
                speed={0.2}
                initialDelay={0.6}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-neutral-400 mb-8 max-w-md text-lg"
            >
              We create minimalist digital experiences that make an impact. Raw,
              unfiltered, and straight to the point.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="border border-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center">
                View Our Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="border border-neutral-800 px-8 py-3 text-sm uppercase tracking-widest text-neutral-400 hover:border-neutral-600 hover:text-white transition-colors">
                About Us
              </button>
            </motion.div>
          </div>
          {/* shape with professional animation sequence */}
          <div className="relative">
            <motion.div
              ref={shapeRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: shapeAnimationDelay,
                ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smooth appearance
              }}
              className="relative transition-transform duration-200 ease-out"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Background shape - appears first */}
              <motion.div
                className="absolute -bottom-10 -right-10 w-2/3 h-2/3 border border-neutral-800 bg-neutral-950 z-[-1]"
                initial={{ opacity: 0, x: 10, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: shapeAnimationDelay,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{ transform: "translateZ(-20px)" }}
              ></motion.div>

              {/* Main square container */}
              <motion.div
                className="aspect-square relative overflow-hidden border border-neutral-800"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.9,
                  delay: shapeAnimationDelay + 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              >
                {/* Background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: shapeAnimationDelay + 0.2 }}
                ></motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-3/4 h-3/4 relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: shapeAnimationDelay + 0.3 }}
                  >
                    {/* Four lines - animate in sequence */}
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-white"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.4 }}
                    ></motion.div>
                    <motion.div
                      className="absolute bottom-0 right-0 w-full h-1 bg-white"
                      initial={{ scaleX: 0, originX: 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.5 }}
                    ></motion.div>
                    <motion.div
                      className="absolute top-0 right-0 h-full w-1 bg-white"
                      initial={{ scaleY: 0, originY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.6 }}
                    ></motion.div>
                    <motion.div
                      className="absolute bottom-0 left-0 h-full w-1 bg-white"
                      initial={{ scaleY: 0, originY: 1 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.7 }}
                    ></motion.div>

                    {/* Center square - last to appear */}
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-neutral-700 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: shapeAnimationDelay + 0.8,
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                    >
                      <motion.div
                        className="w-3/4 h-3/4 bg-neutral-900 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.9 }}
                      >
                        <motion.div
                          className="w-1/2 h-1/2 bg-white"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: shapeAnimationDelay + 1.0,
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                          }}
                        ></motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <div className="flex items-center gap-8 border border-neutral-800 px-8 py-4">
            <div className="text-xs uppercase tracking-widest text-neutral-400">
              Scroll
            </div>
            <div className="h-px w-10 bg-neutral-800"></div>
            <div className="text-xs uppercase tracking-widest text-neutral-400">
              Discover
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
