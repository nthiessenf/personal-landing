"use client";

import Link from "next/link";
import { books } from "@/lib/books";
import { Book3D } from "./book-3d";

/**
 * Landing-page entry point to /bookshelf. The whole block is one link and the
 * books are decorative — clicking any of them goes to the shelf, where they
 * become individually clickable.
 *
 * Uses the same Book3D as the shelf, so the hover behaves identically here.
 */
export function ReadingTeaser() {
  // Prefer what's in progress; fall back to most recently finished so the block
  // is never empty between books. Sort order comes from lib/books.ts.
  const reading = books.filter((b) => b.status === "reading");
  const shown = (reading.length >= 4 ? reading : [...reading, ...books.filter((b) => b.status === "read")]).slice(0, 4);

  return (
    <div>
      <p className="mb-6 text-ink-soft">
        Currently reading, and{" "}
        <Link href="/bookshelf">the rest of the shelf</Link>.
      </p>

      <Link href="/bookshelf" className="no-underline block">
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
    </div>
  );
}
