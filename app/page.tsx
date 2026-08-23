import { SiteHeader } from "@/components/site-header";
import { Intro } from "@/components/intro";
import { Section } from "@/components/section";
import { LinkList, type AnnotatedLink } from "@/components/link-list";
import { Project } from "@/components/project";
import { Writing } from "@/components/writing";
import { ReadingTeaser } from "@/components/reading-teaser";
import { Footer } from "@/components/footer";

/**
 * The page's one structural rule: nothing is described twice. The intro says
 * what I am, where I've lived, and where I am now; Background covers how I got
 * here; each section below is the only place its subject is explained.
 *
 * That rule is why there's no `Currently` section — it duplicated both the intro
 * and the sections beneath it — and why hobbies sit in `Other hobbies` rather
 * than in the intro paragraph.
 *
 * NOTE: the notes below are drafts. Rewrite them in your voice — especially the
 * `Off the clock` ones, which name a specific competition and trip.
 */
const OFF_THE_CLOCK: AnnotatedLink[] = [
  { label: "Jiu jitsu", note: "applying kaizen on the mats" },
  { label: "Surfing", note: "planning the next trip to Indonesia" },
  { label: "Gym", note: "training for longevity" },
];

const ELSEWHERE: AnnotatedLink[] = [
  { label: "Email", href: "mailto:nthiessenf@gmail.com", note: "the best way to reach me" },
  { label: "GitHub", href: "https://github.com/nthiessenf", note: "side projects, in varying states of finished" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nthiessen/", note: "for work things" },
];

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[42rem] flex-col px-6 sm:px-8"
      // 200px media column: puts prose at ~75 characters instead of ~87, and
      // measured out to cost nothing — identical line counts either way.
      // 200px media column. Every image crops into a shared 3:2 slot, so the two
      // entries read as siblings despite 1.75:1 and 1:1 sources.
      style={{ ["--media-w" as string]: "200px" }}>
      <SiteHeader active="About" />

      <main className="flex-1">
        <Intro />

        {/* No company names here on purpose — the roles are the distinctive part,
            and "led global ops teams across three continents" says more than a
            logo does. Add them if you'd rather be concrete. */}
        <Section label="Background">
          <p className="text-ink-soft">
            I worked in investment banking and then operations before moving
            into product. I led ops teams out of Latin America, Europe, and
            Asia, and now build for those same markets.
          </p>
        </Section>

        {/* `Building` and `Writing` used to be separate headings; each held one
            item, which made the heading scaffolding rather than structure. One
            label covers both — a newsletter is a project too. */}
        <Section label="Projects">
          <div className="grid gap-12">
            <Project
              title="FrugalScan"
              description="AI-powered spending insights from your bank statements. Upload a PDF, get personalized analysis in 60 seconds — no account linking."
              videoUrl="/videos/frugalscan-demo.mp4"
              images={[
                {
                  src: "/images/frugalscan-shot.png",
                  alt: "The FrugalScan landing page",
                  width: 2910,
                  height: 1660,
                },
              ]}
              links={[
                { label: "Watch the demo", url: "#demo" },
                { label: "Try it", url: "https://frugalscan.com" },
                { label: "GitHub", url: "https://github.com/nthiessenf" },
              ]}
            />
            {/* The header's "Writing" nav item anchors here. */}
            <div id="writing" className="scroll-mt-8">
              <Writing />
            </div>
          </div>
        </Section>

        <Section label="Reading">
          <ReadingTeaser />
        </Section>

        {/* "Other" because Reading, just above, is a hobby too — this is the
            rest of them. */}
        <Section label="Other hobbies">
          <LinkList items={OFF_THE_CLOCK} />
        </Section>

        <Section label="Elsewhere">
          <LinkList items={ELSEWHERE} />
        </Section>
      </main>

      <Footer />
    </div>
  );
}
