import Link from "next/link";

export interface AnnotatedLink {
  label: string;
  href?: string;
  /** Trailing gloss in soft ink — why you'd click, or what this currently is. */
  note: string;
}

const isInternal = (href: string) => href.startsWith("/") || href.startsWith("#");

/**
 * The `Currently` and `Elsewhere` lists. Each row is a link plus a plain-language
 * note; a row with no `href` is just a statement. Replaces the footer's three
 * unlabelled social icons, which gave a visitor no reason to pick one.
 */
export function LinkList({ items }: { items: AnnotatedLink[] }) {
  return (
    <ul className="grid gap-1.5">
      {items.map((item) => (
        // flex rather than a plain marker so a wrapped note hangs under the
        // label instead of sliding back under the bullet.
        <li key={item.label} className="flex leading-relaxed">
          <span aria-hidden className="mr-2.5 flex-shrink-0 text-ink-faint">
            &#9702;
          </span>
          <span>
          {item.href ? (
            isInternal(item.href) ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <a
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              >
                {item.label}
              </a>
            )
          ) : (
            <span>{item.label}</span>
            )}{" "}
            <span className="text-ink-soft">{item.note}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
