"use client";

import { ReactNode } from "react";

interface InterestCardProps {
  title: string;
  items: string[];
  icon?: ReactNode;
  label?: string;
}

export function InterestCard({ title, items, icon, label }: InterestCardProps) {
  return (
    <div className="relative h-full flex flex-col">
      {label && (
        <span className="absolute top-0 right-0 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] text-[#6e6e73] uppercase tracking-wide font-semibold border border-black/[0.04]">
          {label}
        </span>
      )}

      <div className="flex items-center gap-3 mb-5">
        {icon && (
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
            style={{
              background: "linear-gradient(135deg, rgba(147, 197, 253, 0.5), rgba(196, 181, 253, 0.4))",
            }}
          >
            <div className="w-[18px] h-[18px] text-white">
              {icon}
            </div>
          </div>
        )}
        <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-[-0.01em]">
          {title}
        </h3>
      </div>

      <ul className="flex flex-col gap-1">
        {items.map((item, index) => (
          <li
            key={index}
            className="group relative pl-5 py-3 cursor-default transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:pl-7"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/[0.08] transition-all duration-300" />
            
            <div 
              className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 origin-bottom"
              style={{
                background: "linear-gradient(to bottom, #93c5fd, #c4b5fd)",
              }}
            />
            
            <span className="text-[15px] text-[#6e6e73] group-hover:text-[#1d1d1f] transition-colors duration-300">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
