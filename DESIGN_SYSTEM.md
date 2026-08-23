# Design System — Personal Landing Page

## Direction (Aug 2026)

The site was reworked from a product-page look (Apple grays, pastel gradient
blobs, glassmorphic bento cards, ambient motion) to something closer to a
personal document. Reference point: minchi.co.

**The rule that drives everything: form should not add chrome.** Text sits on the
page background. Cards, glass, borders, hover-lift, and idle animation are all
gone. The only framed elements are actual images — project screenshots and book
covers.

## Palette — warm clay

Defined in `tailwind.config.ts`, applied in `app/globals.css`.

| Token | Value | Use |
|---|---|---|
| `paper` | `#f0e7dc` | page background |
| `paper-deep` | `#e7dccf` | rare secondary fill |
| `ink` | `#2b2521` | body text, headings |
| `ink-soft` | `rgba(43,37,33,0.65)` | notes, descriptions, section labels |
| `ink-faint` | `rgba(43,37,33,0.35)` | bullets, meta, separators |
| `accent` | `#9c5a3c` | link underlines only — never fills or text |
| `rule` | `rgba(43,37,33,0.14)` | hairlines |

Links keep the ink color and carry an accent underline at 45% that goes to 100%
on hover. Links never change color; that keeps the page one warm value.

## Typography

Two faces, loaded via `next/font` in `app/layout.tsx` (self-hosted, no runtime
Google Fonts request):

- **Newsreader** (`--font-serif`) — everything editorial: name, prose, section
  labels, project and book titles.
- **Inter** (`--font-sans`) — utility only: buttons, filter chips, meta, the
  footer. A serif at 12–13px on a control goes mushy; this is the one place the
  serif-throughout idea breaks.

**Nothing is bold.** `globals.css` resets `h1`–`h6` to weight 400. Hierarchy comes
from size, italic, `ink-soft`/`ink-faint`, and whitespace. If you find yourself
reaching for `font-semibold`, the fix is almost always more space or a lighter ink.

Base metrics: 18.5px / 1.72. Name 40px. Section labels 20px italic in full ink
(`h2`). Project and Gist titles 22px.

**Measure.** Prose is uncapped and runs the full column, so its right edge lines
up with the images and the book grid. The column itself is sized to make that
land well: `max-w-[42rem]` gives 608px of content, which is ~75 characters —
the top of the comfortable range.

Two earlier attempts and why they went:

- A `max-w-[36rem]` cap on prose inside a wider column. At 576px it sat 128px
  short of everything below it — close enough to read as a mistake rather than a
  deliberate narrow text column.
- Uncapped prose in a `max-w-3xl` column: aligned, but 704px is ~87 characters,
  well past the guideline.

Narrowing the column to 42rem and the media column to 200px was measured against
the wider version before being adopted: **identical line counts throughout**
(intro 3, descriptions 4) and identical section height. The better measure cost
nothing.

**Media column** is `--media-w`, default 240px, set to 200px on the landing page.
One knob rather than a hardcoded value in two components.

**Media sits beside the text in a shared 200×133 (3:2) slot with `object-cover`.**
Every image crops into that same box; the text column beside it is 380px.

The source images are 1.75:1 and 1:1, and the shared box is what makes the two
entries read as siblings. Three alternatives were tried and rejected:

- **Each image at its own ratio, beside the text.** 200×114 screenshot next to a
  200×200 square — the screenshot reads as too small.
- **A full-width band for the wide image only.** One item breaking rank looks
  like a mistake, and at 608px it dominated the page.
- **Stacked above the text at 360px**, cropped or uncropped. Legible, but too
  large for this page, and it gives up the compact beside-the-text rhythm.

Cost: the Gist cover loses about a third of its starfield to the crop. The
wordmark is centred so it survives.

**Entry shape:** cover on the left, everything else — title, description, links,
and Gist's issue list — in the text column on the right.

This leaves visible empty space under the Gist cover: that entry is 262px tall
against a 133px image, because Gist carries an issue list FrugalScan has no
equivalent of. **This is accepted, not unsolved.** Three fixes were tried and
each cost more than the gap:

- **Tail full width beneath the row.** Puts the CTAs at the far left, detached
  from the copy that motivates them. Looked worse.
- **CTAs stacked under the cover, both entries.** Balances the columns almost
  exactly (220/220 and 227/227) but demotes the two clearest calls to action into
  a sidebar, away from the description.
- **Drop the issue list.** Makes Gist FrugalScan's shape exactly, at the cost of
  the recent-issues idea.

Revisit when `RECENT_ISSUES` holds real titles — reshaping the layout around
placeholder content is what made the earlier attempts hard to judge.

`Project` still accepts `stacked` for a media-above-text layout. It's unused. If
it's ever turned on, set it page-wide — never per item.

`stacked` is set **page-wide, never per item.** An earlier attempt gave
FrugalScan alone a full-width band because it looked small in a column; one item
breaking rank read as a mistake, and at 608px it dwarfed everything around it.

Gist's recent-issue list is set a step down (16px, tight leading) because three
full-size rows made that block noticeably taller than the FrugalScan one.

## Imagery — artifacts, not advertisements

The page uses images freely (book covers, product shots), but they have to be
**objects**, not marketing art. A book cover is an artifact; a device mockup on a
gradient is an ad, and it reads as one.

The original project thumbnails were mockups on saturated indigo and baby-blue
gradients — leftovers from the old pastel palette. Once the page went clay they
were the only cold, saturated things on it and fought everything else. They were
cropped down to the content:

- `frugalscan-shot.png` — the browser window, gradient surround removed.
- `lifttrack-dashboard.png` / `lifttrack-workouts.png` — the two screens from
  inside the phone bezels, so no gradient survives in the rounded corners.

Originals are kept in `public/images` (`frugalscan-thumbnail.png`,
`lifttrack-dual-screenshot.png`) but nothing references them.

**Treatment:** a `border-rule` hairline and `rounded-md`, no drop shadow — they
sit on the paper like plates in a book rather than floating above it.

**Layout:** every media block — both projects and the Writing block — uses the
same 240px column, so the text measure beside it is identical everywhere. Images
inside split that column with `min-w-0 flex-1`; without `min-w-0` a flex child
refuses to shrink below its intrinsic width and two phone screens overflow.

Always set `sizes` on these. Without it Next generates a 3840px variant for a
115px slot.

## Header

Centred, while page content is left-aligned. The wordmark centres too — a
left-aligned name over a centred nav reads as a mistake.

The wordmark is hidden on the landing page: it does two jobs, identity and a link
home, and both are redundant there (you're already home, and the intro names you
at 40px right below). See the Headings note in `CODE_ARCHITECTURE.md`.

## Parked: the sans/eyebrow alternative

An alternative treatment, explored and set aside — **not rejected**, worth
revisiting. It swaps the page from one voice to two:

- **Body** in Inter at 16.5px / 1.65 (`ink-soft`), instead of Newsreader at
  18.5px / 1.72.
- **Section labels** as eyebrows: Inter, 11px, `letter-spacing: 0.14em`,
  uppercase, in the accent, ~22px below.
- **Item titles** (FrugalScan, Gist) stay Newsreader at 22px.

That last part is the real idea, and it survives independently of the rest: sans
marks *structure*, serif marks *content*. The current design uses serif for both
levels and separates them only by size and italic, which is the weakest hierarchy
on the page.

To try it, override in `Section` and the body components:

```css
h2 { font-family: var(--font-sans); font-size: 11px; font-style: normal;
     letter-spacing: 0.14em; text-transform: uppercase; color: #9c5a3c;
     line-height: 1; margin-bottom: 22px; }
p, li { font-family: var(--font-sans); font-size: 16.5px; line-height: 1.65; }
h3 { font-family: var(--font-serif); font-size: 22px; }
```

**Two things to weigh before adopting it.** With a grey sans body, an accent
label becomes the loudest thing on screen — the eye goes to "BACKGROUND" rather
than to the work. A muted-ink label with a hairline rule running to the right
edge tested better, and leaves the accent doing one job (links). And the page's
one distinctive quality is that it reads like a printed document; a single voice
throughout is most of that.

## Motion

Effectively none. The float, pulse-glow, shimmer, gradient-breathe keyframes and
the per-card mouse-tracking spotlight were all removed — constant idle motion is
what made the page read as a launch page.

Two survive because they're responses to input, not ambience:
- the 3D book hover (CSS, in `globals.css`)
- the shelf's `layout` animation when a genre filter changes

## 3D book

Book covers hinge open on hover — cover rotates on the Y axis from its left edge,
page leaves fan out behind it, shadow deepens. Ported from minchi.co.

CSS lives in `app/globals.css`, not Tailwind arbitrary values — eight nested
layers with multi-part transforms is well past what arbitrary-value classes stay
readable for.

**Layer order (back to front):** `.b-back-cover` → `.b-inside` (3× `.b-page`) →
`.b-image` → `.b-effect` (spine) → `.b-light` (sheen).

**Sizing** is entirely `--bw` / `--bh` on `.book-scene`. Placements set only those.
`.book-scene--fluid` fills a grid cell instead, using `--bw: 100%` — valid because
every transform consuming `--bw` is a `translateX`, which resolves percentages
against the element's own width.

**Two rules that matter:**

1. Hover is wrapped in `@media (hover: hover) and (pointer: fine)`. Without it, a
   tap on a touch device latches the open state and the book stays stuck ajar.
2. Hover is scoped to `.book-scene:hover` — the individual book — never a parent.
   The teaser is one big link; scoping it higher would swing all four covers at
   once.

The hover shadow is warmed into the accent (`rgba(156,90,60,0.20)`), not the blue
it used to be, so a lifted cover still reads as sitting on this page.
