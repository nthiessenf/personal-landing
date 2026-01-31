"use client";

import { ReactNode } from "react";

interface Platform {
  name: string;
  href: string;
  icon: ReactNode;
}

interface ContentCardProps {
  title: string;
  description: string;
  platforms?: Platform[];
  image?: string;
  href?: string;
}

export function ContentCard({
  title,
  description,
  platforms,
  image,
  href,
}: ContentCardProps) {
  const handleCardClick = () => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const content = (
    <div className="h-full flex flex-col sm:flex-row gap-6">
      {/* Thumbnail */}
      {image && (
        <div className="flex-shrink-0 w-[180px] h-[180px] rounded-2xl overflow-hidden mx-auto sm:mx-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-[-0.01em] mb-2">
          {title}
        </h3>

        <p className="text-[15px] sm:text-base text-[#6e6e73] leading-relaxed mb-5">
          {description}
        </p>

        {/* Platform Links */}
        <div className="flex flex-wrap items-center gap-2">
          {platforms?.map((platform) => (
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
      <div 
        onClick={handleCardClick}
        className="h-full cursor-pointer"
        role="link"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
      >
        {content}
      </div>
    );
  }

  return <div className="h-full">{content}</div>;
}
