import Link from "next/link";

/**
 * Nav on every page, wordmark on every page *except* the landing one.
 *
 * The wordmark does two jobs — say whose site this is, and link home — and on
 * the landing page both are redundant: you're already home, and the intro names
 * you at 40px immediately below. Rendering it there put the name on screen
 * twice. Subpages keep it, where it earns both jobs back.
 *
 * Exists mainly so /bookshelf is reachable from anywhere; it used to be a dead
 * end you could only enter through the reading teaser.
 *
 * The whole header is centred, page content is not. On subpages that means the
 * wordmark centres too — a left-aligned name over a centred nav reads as a
 * mistake rather than a choice.
 *
 * "Writing" is an anchor onto the Gist block rather than its own route.
 */
const NAV = [
  { label: "About", href: "/" },
  { label: "Writing", href: "/#writing" },
  { label: "Books", href: "/bookshelf" },
];

export function SiteHeader({ active }: { active?: "About" | "Writing" | "Books" }) {
  const isHome = active === "About";

  return (
    <header className={isHome ? "pt-12 pb-10" : "pt-12 pb-14"}>
      {!isHome && (
        <Link href="/" className="no-underline mx-auto mb-3 block w-fit text-2xl leading-tight text-ink">
          Nikolas Thiessen
        </Link>
      )}

      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-[17px]">
        {NAV.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className={
              label === active
                ? "text-ink underline decoration-1 underline-offset-4 decoration-[rgba(156,90,60,0.45)] hover:decoration-accent"
                : "no-underline text-ink-soft transition-colors hover:text-ink"
            }
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
