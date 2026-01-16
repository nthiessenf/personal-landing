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
  image?: string;
  href?: string;
}

export function ContentCard({ title, description, platforms, image, href }: ContentCardProps) {
  const content = (
    <div className="h-full flex flex-col sm:flex-row gap-6">
      {/* Square Image - Left Side */}
      {image && (
        <div className="flex-shrink-0 w-[180px] h-[180px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#93c5fd]/10 via-[#c4b5fd]/10 to-[#fbcfe8]/10 border border-[#93c5fd]/15 mx-auto sm:mx-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content - Right Side */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
            style={{
              background: "linear-gradient(135deg, rgba(147, 197, 253, 0.5), rgba(196, 181, 253, 0.4))",
            }}
          >
            <Mail className="w-[18px] h-[18px] text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-[-0.01em]">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[15px] sm:text-base text-[#6e6e73] leading-relaxed mb-5">
          {description}
        </p>

        {/* Platform Links */}
        <div className="flex flex-wrap items-center gap-2">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1d1d1f] text-white text-sm font-medium transition-all duration-300 hover:bg-[#000] hover:scale-[1.02] hover:shadow-lg"
            >
              {platform.icon}
              <span>{platform.name}</span>
            </a>
          ))}
        </div>
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
