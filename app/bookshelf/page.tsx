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
        {/* No subtitle: it lived here and on the landing teaser in near-identical
            wording, and reading the same sentence twice within a click reads as a
            templating error. The teaser keeps it, where it's the only thing
            telling a visitor why to come here. On this page the heading, the
            genre filters and the covers already say what it is. */}
        <h1 className="text-[40px] leading-tight tracking-[-0.01em] text-ink">Bookshelf</h1>

        <div className="mt-10">
          <BookShelf />
        </div>
      </main>

      <Footer />
    </div>
  );
}
