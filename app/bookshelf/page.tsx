import type { Metadata } from "next";
import { BookShelf } from "@/components/book-shelf";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Bookshelf — Nikolas Thiessen",
  description: "Books I'm reading, have recommended, or found memorable.",
};

// Server component so `metadata` works; the interactive shelf is the client half.
export default function BookshelfPage() {
  return (
    // Wider than the landing page's max-w-[42rem]: a five-column cover grid
    // needs more room than a column of text.
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 sm:px-8">
      <SiteHeader active="Bookshelf" />

      <main className="flex-1">
        <h1 className="text-[40px] leading-tight tracking-[-0.01em] text-ink">Bookshelf</h1>
        {/* Deliberately the same sentence as the landing teaser, not a variation:
            two near-identical wordings read as a mistake, one repeated line reads
            as the description of the thing. Change both together. */}
        <p className="mt-4 max-w-[36rem] text-ink-soft">
          What I&apos;m reading, what I&apos;ve recommended, and what stuck with me.
        </p>

        <div className="mt-12">
          <BookShelf />
        </div>
      </main>

      <Footer />
    </div>
  );
}
