"use client";

import { Book } from "@/lib/books";
import { Book3D } from "./book-3d";

interface BookCoverProps {
  book: Book;
  onOpen: () => void;
  /** Fixed px width. Omit to let the book fill its container (grid cells). */
  width?: number;
}

/**
 * A clickable book. The 3D hover lives in CSS on .book-scene, so this stays a
 * plain button — no mousemove state, unlike BentoCard. That matters: the shelf
 * renders 200+ of these.
 */
export function BookCover({ book, onOpen, width }: BookCoverProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open notes for ${book.title} by ${book.author}`}
      className="block w-full rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93c5fd] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f5f5f7]"
    >
      {width ? (
        <Book3D book={book} width={width} />
      ) : (
        <Book3D book={book} className="book-scene--fluid" />
      )}
    </button>
  );
}
