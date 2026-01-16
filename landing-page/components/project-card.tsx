"use client";

import { ReactNode } from "react";

interface ProjectLink {
  name: string;
  href: string;
  icon: ReactNode;
}

interface ProjectCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  image?: string;
  links?: ProjectLink[];
  href?: string;
}

export function ProjectCard({
  title,
  description,
  icon,
  image,
  links,
  href,
}: ProjectCardProps) {
  const content = (
    <div className="relative h-full flex flex-col sm:flex-row gap-6">
      {/* Phone Mockup with Screenshot */}
      {image && (
        <div 
          className="flex-shrink-0 w-[180px] h-[180px] rounded-2xl overflow-hidden flex items-center justify-center mx-auto sm:mx-0"
          style={{
            background: "linear-gradient(145deg, #1a1a1a 0%, #0a2520 50%, #0d3d35 100%)",
          }}
        >
          <div className="relative w-[70%] h-[90%] rounded-[20px] overflow-hidden border-[3px] border-[#2a2a2a] shadow-2xl">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      )}

      {/* Content - Right Side */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-2">
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

        <p className="text-[15px] sm:text-base text-[#6e6e73] leading-relaxed mb-5">
          {description}
        </p>

        {/* Links/Buttons */}
        {links && links.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1d1d1f] text-white text-sm font-medium transition-all duration-300 hover:bg-[#000] hover:scale-[1.02] hover:shadow-lg"
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full cursor-pointer"
      >
        {content}
      </a>
    );
  }

  return <div className="h-full">{content}</div>;
}

