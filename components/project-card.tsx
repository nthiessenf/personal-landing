"use client";

import { ReactNode, useState, useRef } from "react";
import { Play } from "lucide-react";

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
  videoUrl?: string;
  videoThumbnail?: string;
  links?: ProjectLink[];
  href?: string;
}

export function ProjectCard({
  title,
  description,
  icon,
  image,
  videoUrl,
  videoThumbnail,
  links,
  href,
}: ProjectCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  const content = (
    <div className="relative h-full flex flex-col sm:flex-row gap-6">
      {/* Video Player or Image */}
      {videoUrl ? (
        <div className="flex-shrink-0 w-full sm:w-[400px] rounded-2xl overflow-hidden relative group">
          {!isPlaying ? (
            // Video Thumbnail with Play Button
            <div 
              onClick={handlePlayClick}
              className="relative w-full aspect-video cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200"
            >
              {videoThumbnail ? (
                <img
                  src={videoThumbnail}
                  alt={`${title} demo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log('Thumbnail failed to load');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#6e6e73] text-sm">
                  {title} demo
                </div>
              )}
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-all group-hover:bg-black/30">
                <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all group-hover:scale-110 group-hover:bg-white">
                  <Play className="w-7 h-7 text-[#1d1d1f] ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
          ) : (
            // Video Player
            <video
              ref={videoRef}
              className="w-full aspect-video rounded-2xl"
              controls
              poster={videoThumbnail}
              onError={(e) => {
                console.error('Video failed to load');
                setIsPlaying(false);
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          )}
        </div>
      ) : videoThumbnail ? (
        // Static Landscape Image (videoThumbnail without videoUrl)
        <div className="flex-shrink-0 w-full sm:w-[400px] rounded-2xl overflow-hidden">
          <img
            src={videoThumbnail}
            alt={title}
            className="w-full aspect-video object-cover rounded-2xl"
            onError={(e) => {
              console.log('Thumbnail failed to load');
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      ) : image ? (
        // Phone Mockup with Screenshot (existing)
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
      ) : null}

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
            {links.map((link) => {
              const isWatchDemo = link.name === "Demo";
              
              if (isWatchDemo) {
                return (
                  <button
                    key={link.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayClick();
                    }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1d1d1f] text-white text-sm font-medium transition-all duration-300 hover:bg-[#000] hover:scale-[1.02] hover:shadow-lg"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </button>
                );
              }
              
              return (
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const handleCardClick = () => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

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
