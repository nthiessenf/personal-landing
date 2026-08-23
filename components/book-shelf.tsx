"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { books, genresInUse } from "@/lib/books";
import { BookCover } from "./book-cover";
import { BookModal } from "./book-modal";

const ALL = "All";

export function BookShelf() {
  const [genre, setGenre] = useState<string>(ALL);
  // Index into the *filtered* list, so prev/next walks what's on screen.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Derived from the data, never hardcoded — deleting the last book of a genre
  // removes its button instead of leaving one that matches nothing.
  const genres = useMemo(() => genresInUse(books), []);

  const visible = useMemo(
    () => (genre === ALL ? books : books.filter((b) => b.genre === genre)),
    [genre]
  );

  const selectGenre = (next: string) => {
    setGenre(next);
    // The open book may not exist in the new list; closing avoids showing the
    // wrong one or indexing past the end.
    setOpenIndex(null);
  };

  return (
    <>
      {genres.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {[ALL, ...genres].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => selectGenre(g)}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300 ${
                genre === g
                  ? "bg-[#1d1d1f] text-white"
                  : "bg-black/[0.04] text-[#6e6e73] hover:bg-black/[0.07] hover:text-[#1d1d1f]"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      )}

      <p className="mb-8 text-sm text-[#86868b]">
        {visible.length} {visible.length === 1 ? "book" : "books"}
      </p>

      {/* No AnimatePresence / exit animation here, deliberately. With it, the
          filtered-out books were left mounted at opacity 0 — invisible, but
          still keyboard-focusable, still clickable, and still announced to
          screen readers, so tabbing a filtered shelf walked all 144 books.
          Unmounting immediately and letting `layout` animate the survivors
          into place looks the same and keeps the DOM honest. */}
      <motion.div
        layout
        className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-7 sm:gap-y-12 md:grid-cols-4 lg:grid-cols-5"
      >
        {visible.map((book, i) => (
          <motion.div
            key={book.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <BookCover book={book} onOpen={() => setOpenIndex(i)} />
          </motion.div>
        ))}
      </motion.div>

      {openIndex !== null && (
        <BookModal
          books={visible}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
