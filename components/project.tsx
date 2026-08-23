"use client";

import Image from "next/image";
import { useState } from "react";
import { VideoLightbox } from "./video-lightbox";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ProjectProps {
  title: string;
  description: string;
  /** Rendered in a row inside a fixed-width media column, so the text measure
   *  stays identical across every project and the Writing block. */
  images: ProjectImage[];
  /** Media above the text rather than beside it. Unused on the current page,
   *  which runs text-beside-image. Set page-wide if ever used, never per item —
   *  two projects in two different layouts reads as a mistake. */
  stacked?: boolean;
  videoUrl?: string;
  links: ProjectLink[];
}

/**
 * A project on the page rather than in a card: images beside text, no glass, no
 * border, no hover-lift. The whole-card click target is gone too — the links
 * underneath are the way in, which is less surprising than a div that navigates.
 *
 * Images are raw product shots, deliberately not marketing mockups. The
 * originals were device mockups on saturated indigo/blue gradients — leftovers
 * from the old pastel palette that fought the clay page harder than anything
 * else on it. They're cropped to the content: the browser window for FrugalScan,
 * the screens inside the bezels for LiftTrack. A hairline stands in for the
 * mockups' drop shadow so they read as plates in a document.
 *
 * The video lightbox is kept from the old ProjectCard.
 */
export function Project({
  title,
  description,
  images,
  stacked = false,
  videoUrl,
  links,
}: ProjectProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div>
        <div
          className={
            stacked
              ? "flex flex-col gap-5"
              : "flex flex-col gap-6 sm:flex-row sm:gap-7"
          }
        >
          {images.length > 0 && (
            // Shared 3:2 slot with object-cover. The source images are 1.75:1 and
            // 1:1; letting each keep its own ratio was tried and looked worse —
            // a 360px square cover next to a 360×206 screenshot is too unequal.
            // Both crop into the same box instead.
            <div
              className={
                stacked
                  ? "flex w-full gap-2.5 sm:w-[var(--stack-w,360px)]"
                  : "flex w-full flex-shrink-0 gap-2.5 sm:w-[var(--media-w,240px)]"
              }
            >
              {images.map((img) => {
                const shot = (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    // The column is 240px at most and images split it, so cap the
                    // variant Next generates — without this it fetches 3840px for
                    // a 115px slot.
                    sizes="(min-width: 640px) 360px, 100vw"
                    className="aspect-[3/2] w-full rounded-md border border-rule object-cover"
                  />
                );
                // min-w-0 lets a flex child shrink below its intrinsic width;
                // without it two phone screens overflow the column instead of
                // splitting it.
                return (
                  <div key={img.src} className="min-w-0 flex-1">
                    {/* Only the video project makes its image a control; the rest
                      are plain images, so no button wraps something inert. */}
                    {videoUrl ? (
                      <button
                        type="button"
                        onClick={() => setIsVideoOpen(true)}
                        aria-label={`Play ${title} demo`}
                        className="group relative block w-full"
                      >
                        {shot}
                        <span className="absolute inset-0 flex items-center justify-center rounded-md bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25">
                          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
                            <svg
                              className="ml-0.5 h-5 w-5 fill-ink"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </span>
                      </button>
                    ) : (
                      shot
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h3 className="mb-2 text-[22px] text-ink">{title}</h3>
            <p className="mb-3 text-ink-soft">{description}</p>
            <p className="font-sans text-[13px]">
              {links.map((link, i) => (
                <span key={link.label}>
                  {i > 0 && (
                    <span className="mx-2.5 text-ink-faint">&middot;</span>
                  )}
                  {link.url === "#demo" && videoUrl ? (
                    <button
                      type="button"
                      onClick={() => setIsVideoOpen(true)}
                      className="underline decoration-1 underline-offset-[3px] decoration-[rgba(156,90,60,0.45)] transition-colors hover:decoration-accent"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {isVideoOpen && videoUrl && (
        <VideoLightbox src={videoUrl} onClose={() => setIsVideoOpen(false)} />
      )}
    </>
  );
}
