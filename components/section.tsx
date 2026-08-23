import { ReactNode } from "react";

/**
 * A section is a label and then content — no card, no border, no background.
 *
 * The label is an eyebrow: Inter, uppercase, in the accent. It used to be serif
 * italic at 20px in full ink, which sat in the same visual register as the prose
 * beneath it and got lost in the page. Sans in a different colour can't be
 * mistaken for content, so the sections are findable without being read.
 *
 * That gives the page a two-tier system worth preserving: **sans marks
 * structure, serif marks content.** Item titles (FrugalScan, Gist) stay serif.
 * Don't grow this past 13px — at 15px it starts competing with those 22px serif
 * titles and the two tiers blur back together.
 *
 * Tracking eases off as size grows: wide letterspacing helps a small cap read as
 * a label, but past a point it stops letters grouping into words. 0.12em is
 * tuned to 13px.
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
      <h2 className="mb-6 font-sans text-[13px] uppercase leading-none tracking-[0.12em] text-accent">
        {label}
      </h2>
      {children}
    </section>
  );
}
