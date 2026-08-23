"use client";

import Image from "next/image";
import { useState } from "react";
import { Book, coverUrl, hasCover } from "@/lib/books";

interface Book3DProps {
  book: Book;
  /** Cover width in px. Height follows at the 2:3 ratio book covers use. */
  width?: number;
  /** Tailwind classes for responsive sizing. Overrides `width` when both are set. */
  className?: string;
  /** Set on the shelf grid, where the whole tile is already a labelled button. */
  decorative?: boolean;
}

/**
 * The 3D book. Layered spans that the CSS in globals.css turns into a cover
 * hinged on its left edge, with page leaves behind it that fan out on hover.
 *
 * Deliberately a single component shared by the landing-page teaser, the shelf
 * grid, and the modal — only --bw/--bh differ between them. Forking a "simple"
 * variant for one placement is how they drift apart.
 */
export function Book3D({ book, width = 188, className, decorative = true }: Book3DProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = failed || !hasCover(book);

  return (
    <span
      className={`book-scene ${className ?? ""}`}
      style={className ? undefined : { ["--bw" as string]: `${width}px`, ["--bh" as string]: `${Math.round(width * 1.5)}px` }}
      aria-hidden={decorative ? true : undefined}
    >
      <span className="book-3d">
        <span className="b-back-cover" />
        <span className="b-inside">
          <span className="b-page" />
          <span className="b-page" />
          <span className="b-page" />
        </span>
        <span className="b-image">
          {showFallback ? (
            // Open Library has no cover for this ISBN, or the export had no ISBN
            // at all. A typographic tile reads as deliberate; a broken <img> does not.
            <span
              className="flex h-full w-full flex-col justify-between gap-2 p-[7%] text-left"
              style={{
                background:
                  "linear-gradient(145deg, rgba(147, 197, 253, 0.9), rgba(196, 181, 253, 0.8) 55%, rgba(251, 207, 232, 0.85))",
              }}
            >
              <span
                className="line-clamp-4 leading-snug text-ink"
                style={{ fontSize: "clamp(8px, 6cqw, 13px)" }}
              >
                {book.title}
              </span>
              <span
                className="line-clamp-2 leading-tight text-ink-soft"
                style={{ fontSize: "clamp(7px, 5cqw, 11px)" }}
              >
                {book.author}
              </span>
            </span>
          ) : (
            <Image
              src={coverUrl(book)}
              alt={decorative ? "" : `${book.title} by ${book.author}`}
              width={188}
              height={282}
              onError={() => setFailed(true)}
              draggable={false}
              className="h-full w-full object-cover"
            />
          )}
        </span>
        <span className="b-effect" />
        <span className="b-light" />
      </span>
    </span>
  );
}
