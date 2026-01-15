"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex items-center py-20 lg:py-28 overflow-hidden">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Floating Headshot - Left Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex-shrink-0"
          >
            <div className="relative w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] lg:w-[200px] lg:h-[200px]">
              <div 
                className="absolute inset-[-6px] rounded-full animate-pulse-glow"
                style={{
                  background: "linear-gradient(135deg, #93c5fd, #c4b5fd, #fbcfe8)",
                  filter: "blur(28px)",
                  opacity: 0.35,
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
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] bg-gradient-to-br from-[#1d1d1f] to-[#6e6e73] bg-clip-text text-transparent leading-[1.05] mb-4">
              Your Name
            </h1>
            <p className="text-lg sm:text-xl text-[#6e6e73] font-normal max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Builder, creator, and storyte
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
