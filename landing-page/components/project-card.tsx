"use client";

import { ExternalLink } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
    <div className="group relative h-full flex flex-col">
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-300 via-purple-300 to-pink-200 flex items-center justify-center text-foreground backdrop-blur-sm shadow-sm">
              <div className="w-6 h-6 flex items-center justify-center">
                {icon}
              </div>
            </div>
          )}
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>

        {/* External link arrow - slides in on hover */}
        {link && (
          <div className="opacity-0 translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
            <ExternalLink className="w-4 h-4 text-muted" />
          </div>
        )}
      </div>

      {/* Image placeholder with shimmer animation */}
      {image ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-muted/20">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />
        </div>
      ) : (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-muted/20 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />
          <span className="text-xs text-muted relative z-10">Image Placeholder</span>
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-muted flex-1">{description}</p>
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
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

