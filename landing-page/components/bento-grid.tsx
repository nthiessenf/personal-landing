"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, useRef, useState } from "react";

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
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const spanClasses = cn(
    colSpan === 2 && "md:col-span-2",
    rowSpan === 2 && "md:row-span-2"
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-3xl p-8",
        "bg-white/70 backdrop-blur-xl",
        "border border-black/[0.04]",
        "shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.02)]",
        "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "hover:-translate-y-2 hover:scale-[1.02]",
        "hover:bg-white/85",
        "hover:shadow-[0_20px_50px_rgba(0,0,0,0.08),0_10px_20px_rgba(147,197,253,0.1)]",
        "cursor-pointer",
        spanClasses,
        className
      )}
      style={{
        ["--mouse-x" as string]: `${mousePosition.x}%`,
        ["--mouse-y" as string]: `${mousePosition.y}%`,
      }}
    >
      <div 
        className={cn(
          "absolute inset-0 rounded-3xl p-px pointer-events-none",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-500"
        )}
        style={{
          background: "linear-gradient(135deg, rgba(147, 197, 253, 0.4), rgba(196, 181, 253, 0.3), rgba(251, 207, 232, 0.4))",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-400"
        )}
        style={{
          background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
