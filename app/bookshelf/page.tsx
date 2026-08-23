import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BookShelf } from "@/components/book-shelf";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Bookshelf — Nikolas Thiessen",
  description: "Books I'm reading, have recommended, or found memorable.",
};

// Server component so `metadata` works; the interactive shelf is the client half.
export default function BookshelfPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="relative z-10 flex-1">
        {/* Wider than the landing page's max-w-4xl: a five-column cover grid
            needs more room than a column of text. */}
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="py-10">
            {/* The site has no nav, so the page carries its own way back. */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#6e6e73] transition-colors duration-300 hover:text-[#1d1d1f]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>

            <h1 className="mt-8 text-3xl font-bold tracking-[-0.02em] text-[#1d1d1f] sm:text-4xl lg:text-5xl">
              Bookshelf.
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-[#6e6e73] sm:text-base">
              What I&apos;m reading, what I&apos;ve recommended, and what stuck with me.
            </p>
          </div>

          <div className="pb-20">
            <BookShelf />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
