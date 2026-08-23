"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { books } from "@/lib/books";
import { Book3D } from "./book-3d";

/**
 * Landing-page entry point to /bookshelf.
 *
 * The hairline box is the one framed container on the page. It's deliberately
 * not a card — no fill, no shadow, no hover lift — just a rule marking off a
 * self-contained thing that continues on another page.
 *
 * The count comes from the data, so it can't drift out of date.
 */
export function ReadingTeaser() {
  // Prefer what's in progress; fall back to most recently finished so the block
  // is never empty between books. Sort order comes from lib/books.ts.
  const reading = books.filter((b) => b.status === "reading");
  const shown = (
    reading.length >= 4 ? reading : [...reading, ...books.filter((b) => b.status === "read")]
  ).slice(0, 4);

  return (
    <>
      <p className="mb-6 text-ink-soft">
        A running list of what I&apos;ve read, kept mostly for my own memory.{" "}
        {books.length} books so far.
      </p>

      <div className="rounded-md border border-rule p-5 sm:p-7">
        <p className="mb-5 text-[16px] text-ink-soft">Recent reads:</p>

        {/* The grid is one link; individual covers become clickable on the
            shelf itself, where the modal exists to receive the click. */}
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

        <Link
          href="/bookshelf"
          className="mt-6 inline-flex items-center gap-2 text-[16px]"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
