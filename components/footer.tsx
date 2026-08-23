/**
 * Quiet by design: the social icons that used to live here have been promoted
 * into the annotated `Elsewhere` list on the page itself, where each link can
 * say what it's for.
 *
 * TODO: bump `LAST_UPDATED` when you change the page. It's the only thing
 * telling a visitor whether any of this is still true.
 */
const LAST_UPDATED = "August 2026";

export function Footer() {
  return (
    <footer className="mt-16 pb-14 font-sans text-[13px] text-ink-faint">
      <p>Last updated {LAST_UPDATED}</p>
    </footer>
  );
}
