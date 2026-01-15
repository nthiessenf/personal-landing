"use client";

import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  link?: string;
  icon?: ReactNode;
  image?: string;
}

export function ProjectCard({
  title,
  description,
  link,
  icon,
  image,
}: ProjectCardProps) {
  const content = (
    <div className="relative h-full flex flex-col sm:flex-row gap-6">
      {/* Square Image - Left Side */}
      {image && (
        <div className="flex-shrink-0 w-full sm:w-40 md:w-44 lg:w-52 aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#93c5fd]/10 via-[#c4b5fd]/10 to-[#fbcfe8]/10 border border-[#93c5fd]/15">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content - Right Side */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
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
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-[-0.01em]">
              {title}
            </h3>
          </div>
          
          {link && (
            <div className="w-8 h-8 rounded-lg bg-black/[0.04] flex items-center justify-center opacity-0 translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
              <ArrowUpRight className="w-4 h-4 text-[#6e6e73]" />
            </div>
          )}
        </div>

        <p className="text-[15px] sm:text-base text-[#6e6e73] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {content}
      </a>
    );
  }

  return <div className="h-full">{content}</div>;
}
