'use client';

import { ExternalLink, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ProjectLink {
  label: string;
  url: string;
  icon: React.ReactNode;
}

interface ProjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  links: ProjectLink[];
  videoUrl?: string;
  videoThumbnail?: string;
  href?: string;
}

export function ProjectCard({
  title,
  description,
  icon,
  image,
  links,
  videoUrl,
  videoThumbnail,
  href,
}: ProjectCardProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVideoModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <div
        onClick={() => href && window.open(href, '_blank')}
        className="relative overflow-hidden rounded-3xl bg-white/70 p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_20px_40px_rgba(0,0,0,0.03)] backdrop-blur-xl backdrop-saturate-[180%] transition-all duration-500 cursor-pointer hover:bg-white/85 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08),0_8px_16px_rgba(147,197,253,0.12)] group"
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-300/30 via-purple-300/20 to-pink-200/30 opacity-0 transition-opacity duration-400 [mask:linear-gradient(white_0_0)_content-box,linear-gradient(white_0_0)] [mask-composite:exclude] [padding:1px] group-hover:opacity-100" />
        <div className="pointer-events-none absolute left-[-50%] top-[-50%] h-[200%] w-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.6)_0%,transparent_70%)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

        <div className="relative z-10 h-full flex flex-col sm:flex-row gap-6">
          {(image || videoThumbnail) && (
            <div 
              className="flex-shrink-0 w-[180px] h-[180px] rounded-2xl overflow-hidden mx-auto sm:mx-0 relative cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (videoUrl) setIsVideoModalOpen(true);
              }}
            >
              <Image
                src={videoThumbnail || image || ''}
                alt={title}
                width={180}
                height={180}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="ml-1 h-7 w-7 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-300/50 to-purple-300/40 shadow-[0_2px_8px_rgba(147,197,253,0.2)] backdrop-blur-sm text-white">
                  {icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1d1d1f]">
                  {title}
                </h3>
              </div>
              {href && (
                <div className="flex h-8 w-8 translate-x-[-4px] translate-y-1 items-center justify-center rounded-lg bg-[#1d1d1f]/8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-[#1d1d1f]/12 group-hover:opacity-100">
                  <ExternalLink className="h-4 w-4 text-[#1d1d1f]" />
                </div>
              )}
            </div>

            <p className="text-[15px] sm:text-base text-[#6e6e73] leading-relaxed mb-5">
              {description}
            </p>

            <div className="flex flex-wrap gap-2">
              {links.map((link, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (link.label === 'Demo' && videoUrl) {
                      setIsVideoModalOpen(true);
                    } else {
                      window.open(link.url, '_blank');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1d1d1f] text-white text-sm font-medium transition-all duration-300 hover:bg-[#000] hover:scale-[1.02] hover:shadow-lg"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-8"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-16 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-2xl hover:bg-gray-100 hover:scale-110 transition-all"
            >
              <X className="h-6 w-6 text-gray-900" />
            </button>
            <video
              src={videoUrl}
              controls
              controlsList="nodownload"
              autoPlay
              className="w-full rounded-2xl"
              style={{ maxHeight: '80vh' }}
            />
            <p className="text-center text-white/80 text-sm mt-4">Press ESC to close</p>
          </div>
        </div>
      )}
    </>
  );
}
