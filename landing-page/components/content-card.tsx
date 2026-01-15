"use client";

import { Mail } from "lucide-react";

interface PlatformLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface ContentCardProps {
  title: string;
  description: string;
  platforms: PlatformLink[];
}

export function ContentCard({ title, description, platforms }: ContentCardProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
          style={{
            background: "linear-gradient(135deg, rgba(147, 197, 253, 0.5), rgba(196, 181, 253, 0.4))",
          }}
        >
          <Mail className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-[-0.01em]">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-[15px] sm:text-base text-[#6e6e73] leading-relaxed mb-6">
        {description}
      </p>

      {/* Platform Links */}
      <div className="flex flex-wrap items-center gap-3 mt-auto">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1d1d1f] text-white text-sm font-medium transition-all duration-300 hover:bg-[#000] hover:scale-[1.02] hover:shadow-lg"
          >
            {platform.icon}
            <span>{platform.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

