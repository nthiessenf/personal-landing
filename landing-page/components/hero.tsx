"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex items-center py-16 lg:py-24 overflow-visible">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Headshot - Left Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex-shrink-0 p-4"
          >
            <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] lg:w-[180px] lg:h-[180px]">
              {/* Ambient glow behind photo */}
              <div 
                className="absolute inset-[-8px] rounded-full animate-pulse-glow"
                style={{
                  background: "linear-gradient(135deg, #93c5fd, #c4b5fd, #fbcfe8)",
                  filter: "blur(24px)",
                  opacity: 0.4,
                }}
              />
              
              {/* Photo */}
              <div 
                className="relative w-full h-full rounded-full overflow-hidden animate-float"
                style={{
                  boxShadow: "0 20px 50px rgba(147, 197, 253, 0.25), 0 10px 20px rgba(196, 181, 253, 0.15)",
                }}
              >
                <img 
                  src="/images/headshot.png" 
                  alt="Nikolas Thiessen"
                  className="w-full h-full object-cover"
                />
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] bg-gradient-to-br from-[#1d1d1f] to-[#6e6e73] bg-clip-text text-transparent leading-[1.1] mb-4">
              Nikolas Thiessen
            </h1>
            <div className="text-base sm:text-lg lg:text-xl text-[#6e6e73] font-normal max-w-md mx-auto lg:mx-0 leading-relaxed">
              <p className="font-medium text-[#1d1d1f]">Product Engineer</p>
              <p>Currently: Building products at Amazon</p>
              <p>Learning: Latest trends in AI</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
