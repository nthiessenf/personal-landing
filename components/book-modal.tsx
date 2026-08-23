"use client";

import { ArrowLeft, ArrowRight, Star, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Book, formatFinished } from "@/lib/books";
import { Book3D } from "./book-3d";

interface BookModalProps {
  /** The list currently on screen. Prev/next walk this, not the full shelf. */
  books: Book[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

function Stars({ rating }: { rating: number }) {
  // Goodreads stores whole stars only, so no half-star rendering to do.
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${
            n <= rating ? "fill-ink text-ink" : "fill-transparent text-ink-faint"
          }`}
        />
      ))}
    </span>
  );
}

export function BookModal({ books, index, onClose, onNavigate }: BookModalProps) {
  const book = books[index];

  // Wrap at both ends so the arrows never dead-end.
  const goPrev = useCallback(
    () => onNavigate((index - 1 + books.length) % books.length),
    [index, books.length, onNavigate]
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % books.length),
    [index, books.length, onNavigate]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  // Lock background scroll while open, restoring whatever was there before.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  if (!book) return null;

  const meta = [book.series, formatFinished(book.finished), book.genre].filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/60 p-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={book.title}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-rule bg-paper p-8 shadow-[0_20px_50px_rgba(43,37,33,0.22)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous book"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-300 hover:bg-[rgba(43,37,33,0.06)] hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next book"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-300 hover:bg-[rgba(43,37,33,0.06)] hover:text-ink"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-300 hover:bg-[rgba(43,37,33,0.06)] hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
          <div className="flex-shrink-0 self-center sm:self-start">
            <Book3D book={book} width={120} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[15px] text-ink-soft">{book.author}</p>
            <h2 className="mt-1 text-2xl tracking-[-0.01em] text-ink">
              {book.title}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[12px] text-ink-faint">
              {book.rating !== undefined && <Stars rating={book.rating} />}
              {meta.map((m) => (
                <span key={m}>{m}</span>
              ))}
              {book.status === "reading" && (
                <span className="rounded-full bg-[rgba(43,37,33,0.07)] px-2.5 py-1 font-sans text-[12px] text-ink">
                  Currently reading
                </span>
              )}
            </div>

            {/* Most books start without a note. Omitting the block entirely beats
                rendering an empty panel that makes the shelf look unfinished. */}
            {book.note && (
              <p className="mt-5 leading-relaxed text-ink-soft">{book.note}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
