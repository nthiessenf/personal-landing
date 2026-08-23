"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { books } from "@/lib/books";
import { Book3D } from "./book-3d";

/**
 * Landing-page entry point to /bookshelf. The whole card is one link and the
 * books are decorative — clicking any of them goes to the shelf, where they
 * become individually clickable.
 *
 * Uses the same Book3D as the shelf, so the hover behaves identically here.
 */
export function ReadingTeaser() {
  // Prefer what's in progress; fall back to most recently finished so the card
  // is never empty between books. Sort order comes from lib/books.ts.
  const reading = books.filter((b) => b.status === "reading");
  const shown = (reading.length >= 4 ? reading : [...reading, ...books.filter((b) => b.status === "read")]).slice(0, 4);

  return (
    <Link href="/bookshelf" className="block">
      <div className="mb-7 flex items-baseline justify-between gap-4">
        <span className="text-[15px] text-[#6e6e73]">Currently reading:</span>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1d1d1f]">
          View all
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-6">
        {shown.map((book, i) => (
          <div
            key={book.id}
            // Four books don't fit comfortably on a narrow screen; drop the last.
            className={i === 3 ? "hidden sm:block" : undefined}
          >
            <Book3D book={book} className="book-scene--fluid" />
          </div>
        ))}
      </div>
    </Link>
  );
}
