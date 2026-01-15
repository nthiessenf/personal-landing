"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex items-center py-16 lg:py-24 overflow-visible">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Floating Headshot - Left Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex-shrink-0 p-4"
          >
            <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] lg:w-[180px] lg:h-[180px]">
              <div 
                className="absolute inset-[-8px] rounded-full animate-pulse-glow"
                style={{
                  background: "linear-gradient(135deg, #93c5fd, #c4b5fd, #fbcfe8)",
                  filter: "blur(24px)",
                  opacity: 0.4,
                }}
              />
              
              <div 
                className="relative w-full h-full rounded-full flex items-center justify-center animate-float"
                style={{
                  background: "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 50%, #fbcfe8 100%)",
                  boxShadow: "0 20px 50px rgba(147, 197, 253, 0.25), 0 10px 20px rgba(196, 181, 253, 0.15)",
                }}
              >
                <span className="text-white/85 text-xs sm:text-sm font-semibold tracking-wider">
                  YOUR PHOTO
                </span>
              </div>
            </div>
          </motion.div>

          {/* Hero Content - Right Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] bg-gradient-to-br from-[#1d1d1f] to-[#6e6e73] bg-clip-text text-transparent leading-[1.1] mb-3">
              Your Name
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#6e6e73] font-normal max-w-md mx-auto lg:mx-0 leading-relaxed">
              Builder, creator, and storyteller crafting experiences at the intersection of design and technology.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
