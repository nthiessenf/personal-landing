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
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]",
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
  const span = cn(
    colSpan === 2 && "md:col-span-2",
    rowSpan === 2 && "md:row-span-2"
  );

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
        "relative overflow-hidden rounded-3xl p-8 md:p-10",
        "bg-white/70 backdrop-blur-[20px] backdrop-saturate-[180%]",
        "border border-white/20",
        "shadow-[0_1px_3px_rgba(0,0,0,0.05),0_20px_40px_rgba(0,0,0,0.03)]",
        "transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:translate-y-[-8px] hover:scale-[1.02]",
        "hover:bg-white/85",
        "hover:shadow-[0_20px_40px_rgba(0,0,0,0.08),0_8px_16px_rgba(147,197,253,0.12)]",
        "cursor-pointer",
        span,
        className
      )}
    >
      {children}
    </motion.div>
  );
}

