import Image from "next/image";

/**
 * Headshot and three sentences: what I am, where I've lived, where I am now.
 *
 * The name lives here, not in the header: on the landing page `SiteHeader`
 * renders nav only, so this h1 is the page's single name and its only h1.
 * Subpages invert that — wordmark in the header, their own h1 below.
 *
 * Deliberately short. The career arc lives in `Background` below — a short intro
 * over a substantial section balances, where the reverse reads lopsided. Nothing
 * here is repeated down the page: geography and Tesla appear only in this
 * paragraph, the ops history only in Background.
 *
 * NOTE: still a draft. It's the most-read text on the page and should end up in
 * your own words.
 */
export function Intro() {
  return (
    <section className="pb-4">
      <Image
        src="/images/headshot.png"
        alt="Nikolas Thiessen"
        width={92}
        height={92}
        priority
        className="mb-8 h-[92px] w-[92px] rounded-md object-cover shadow-[0_1px_6px_rgba(43,37,33,0.16)]"
      />

      <h1 className="mb-5 text-[40px] leading-tight tracking-[-0.01em] text-ink">
        Nikolas Thiessen
      </h1>

      <p className="text-ink">
        Product builder and engineer. Lived in Peru, Mexico, and the US. Now in
        the Bay Area, building product at Tesla and tinkering with AI apps after
        hours.
      </p>
    </section>
  );
}
