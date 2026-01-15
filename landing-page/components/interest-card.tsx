"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InterestCardProps {
  title: string;
  items: string[];
  icon?: ReactNode;
}

export function InterestCard({ title, items, icon }: InterestCardProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-300 via-purple-300 to-pink-200 flex items-center justify-center text-foreground backdrop-blur-sm shadow-sm">
            <div className="w-6 h-6 flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>

      {/* List of items */}
      <ul className="flex flex-col gap-2 flex-1">
        {items.map((item, index) => (
          <li
            key={index}
            className={cn(
              "group relative pl-4 py-2 rounded-r-lg",
              "border-l-2 border-muted/30",
              "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              "hover:translate-x-1 hover:border-muted/0",
              "cursor-default"
            )}
          >
            {/* Gradient border on hover - replaces the gray border */}
            <div
              className={cn(
                "absolute left-0 top-0 bottom-0 w-[2px]",
                "bg-gradient-to-b from-blue-300 to-purple-300",
                "opacity-0 group-hover:opacity-100",
                "transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              )}
            />
            
            {/* Item text */}
            <span
              className={cn(
                "relative text-sm text-muted",
                "group-hover:text-foreground",
                "transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              )}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

