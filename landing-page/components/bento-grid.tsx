"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
  delay?: number;
}

export function BentoCard({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  delay = 0,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn(
        "group relative rounded-2xl overflow-hidden",
        "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:translate-y-[-8px] hover:scale-[1.02]",
        colSpan === 2 && "md:col-span-2",
        rowSpan === 2 && "md:row-span-2",
        className
      )}
    >
      {/* Gradient border wrapper on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "bg-gradient-to-r from-blue-300 via-purple-300 to-pink-200",
          "p-[1px]"
        )}
      >
        <div className="w-full h-full rounded-2xl bg-transparent" />
      </div>

      {/* Main card with glassmorphism */}
      <div
        className={cn(
          "relative rounded-2xl p-6",
          "bg-[rgba(255,255,255,0.7)] backdrop-blur-[20px]",
          "border border-[rgba(255,255,255,0.3)]",
          "shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
          "group-hover:border-transparent",
          "group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
        )}
      >
        {/* Spotlight effect on hover */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
            "pointer-events-none rounded-2xl",
            "bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}

