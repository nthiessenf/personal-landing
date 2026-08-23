import Image from "next/image";

/**
 * Gist, with recent issues listed rather than just a subscribe link — the site
 * used to say "I have a newsletter" without showing any of it.
 *
 * Same shape as `Project`: cover on the left, everything else in the text column
 * on the right. That leaves noticeable empty space under the cover, because Gist
 * carries an issue list FrugalScan has no equivalent of. Three fixes were tried
 * and each cost more than the gap did — see DESIGN_SYSTEM.md.
 *
 * Hand-maintained: update when you want different issues featured. Gist runs on
 * beehiiv, which can expose an RSS feed (Settings → Publication → RSS); enable
 * it and this list could be fetched at build time instead.
 *
 * Titles are display labels, not necessarily the full published headline —
 * budget is roughly 48 characters, past which they wrap to a second line and
 * break the rhythm of the list. Trim the subtitle rather than let it wrap.
 */
const RECENT_ISSUES: { title: string; href: string }[] = [
  {
    title: "How ChatGPT Actually Works (No PhD Required)",
    href: "https://www.gist-newsletter.com/p/how-chatgpt-actually-works-no-phd-required",
  },
  {
    title: "The Thinking Partner: How Executives Use AI",
    href: "https://www.gist-newsletter.com/p/the-thinking-partner",
  },
  {
    title: "AI Agents: Software That Works for You",
    href: "https://www.gist-newsletter.com/p/ai-agents",
  },
];

const PLATFORMS: { label: string; href: string }[] = [
  { label: "Subscribe", href: "https://www.gist-newsletter.com" },
  {
    label: "Spotify",
    href: "https://open.spotify.com/show/0r6kYx2AC8yYwwygyi0R2G?si=mIsLYI5OQIW1qoIs27gGpA",
  },
  {
    label: "Apple Podcasts",
    href: "https://podcasts.apple.com/us/podcast/gist/id1869418127",
  },
];

export function Writing() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:gap-7">
      <div className="w-full flex-shrink-0 sm:w-[var(--media-w,240px)]">
        <Image
          src="/images/gist-thumbnail.png"
          alt="Gist"
          width={480}
          height={480}
          sizes="(min-width: 640px) 200px, 100vw"
          className="aspect-[3/2] w-full rounded-md border border-rule object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="mb-2 text-[22px] text-ink">Gist</h3>
        <p className="mb-3 text-ink-soft">
          One new trend or concept in frontier tech, explained clearly. No
          jargon, no hype, so you&apos;re never the one nodding along.
        </p>

        {/* A step down from body copy: three full-size rows made this block
            noticeably taller than the FrugalScan one. */}
        <ul className="mb-3 grid gap-1 text-[16px] leading-snug">
          {RECENT_ISSUES.map((issue, i) => (
            <li key={i} className="flex">
              <span aria-hidden className="mr-2.5 flex-shrink-0 text-ink-faint">
                &#9702;
              </span>
              <a href={issue.href} target="_blank" rel="noopener noreferrer">
                {issue.title}
              </a>
            </li>
          ))}
        </ul>

        <p className="font-sans text-[13px]">
          {PLATFORMS.map((p, i) => (
            <span key={p.label}>
              {i > 0 && <span className="mx-2.5 text-ink-faint">&middot;</span>}
              <a href={p.href} target="_blank" rel="noopener noreferrer">
                {p.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
