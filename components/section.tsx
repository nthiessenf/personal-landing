import { ReactNode } from "react";

/**
 * A section is a label and then content — no card, no border, no background.
 * Labels are deliberately quiet and *not* parallel in phrasing with each other;
 * the old "What I'm ___." headings made every section read as a slot in a
 * template.
 *
 * They still have to register as headings, though, so they sit a step up from
 * body text: full-strength ink rather than `ink-soft`, and slightly larger.
 * Weight is not available as a lever — nothing on this site is bold — so the
 * separation comes from size, italic, and the space above.
 */
export function Section({
  label,
  id,
  children,
}: {
  label: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 pb-9 pt-12">
      <h2 className="mb-6 text-[20px] italic text-ink">{label}</h2>
      {children}
    </section>
  );
}
