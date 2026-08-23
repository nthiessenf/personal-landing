"use client";

import { useState } from "react";
import { VideoLightbox } from "./video-lightbox";

/**
 * Opens the demo video from a plain text link. Needed for the link-only layout,
 * where there's no thumbnail to click.
 */
export function DemoLink({ src, label }: { src: string; label: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="underline decoration-1 underline-offset-[3px] decoration-[rgba(156,90,60,0.45)] transition-colors hover:decoration-accent"
      >
        {label}
      </button>
      {open && <VideoLightbox src={src} onClose={() => setOpen(false)} />}
    </>
  );
}
