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
 * "Projects" is an anchor onto the landing page's Projects section rather than
 * its own route; `Section` carries the matching id and its own scroll-margin.
 */
const NAV = [
  { label: "About", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Bookshelf", href: "/bookshelf" },
];

export function SiteHeader({
  active,
}: {
  active?: "About" | "Projects" | "Bookshelf";
}) {
  const isHome = active === "About";

  const nav = (
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
  );

  if (isHome) {
    return <header className="pt-12 pb-10">{nav}</header>;
  }

  return (
    <header className="pt-12 pb-14">
      {/* One row on desktop: name left, nav optically centred in the column.
          The 1fr/auto/1fr grid centres the nav against the container rather
          than against the leftover space, so it doesn't drift as the name's
          width changes. Stacks on mobile, where both don't fit on a line. */}
      <div className="flex flex-col items-center gap-3 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-baseline sm:gap-0">
        <Link
          href="/"
          className="no-underline block w-fit text-2xl leading-tight text-ink sm:justify-self-start"
        >
          Nikolas Thiessen
        </Link>
        {nav}
      </div>
    </header>
  );
}
