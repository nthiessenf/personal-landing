"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Hero Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold leading-tight mb-6 bg-gradient-to-r from-foreground via-foreground to-muted bg-clip-text text-transparent"
            >
              Your Name
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-lg sm:text-xl text-muted max-w-2xl mx-auto lg:mx-0"
            >
              Building beautiful experiences with modern web technologies
            </motion.p>
          </motion.div>

          {/* Floating Headshot - Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex-shrink-0 order-1 lg:order-2"
          >
            <div className="relative w-[200px] h-[200px] mx-auto lg:mx-0">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 via-purple-300 to-pink-200 opacity-30 blur-xl animate-pulse-glow" />
              
              {/* Main circle */}
              <motion.div
                className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-300 via-purple-300 to-pink-200 flex items-center justify-center text-foreground font-semibold text-sm shadow-2xl"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-center px-4">YOUR PHOTO</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

