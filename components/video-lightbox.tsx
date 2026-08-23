"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

/**
 * Shared so the demo can be opened from an image (Project) or from a plain text
 * link (DemoLink) without two copies of the modal.
 */
export function VideoLightbox({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/95 p-6 sm:p-10"
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-paper transition-transform hover:scale-110"
        >
          <X className="h-5 w-5 text-ink" />
        </button>
        <video
          src={src}
          controls
          controlsList="nodownload"
          autoPlay
          className="w-full rounded-lg"
          style={{ maxHeight: "80vh" }}
        />
        <p className="mt-3 text-center font-sans text-[13px] text-paper/70">
          Press ESC to close
        </p>
      </div>
    </div>
  );
}
