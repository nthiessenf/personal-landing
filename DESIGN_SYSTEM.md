# Design System — Personal Landing Page

## Direction (Aug 2026)

The site was reworked from a product-page look (Apple grays, pastel gradient
blobs, glassmorphic bento cards, ambient motion) to something closer to a
personal document. Reference point: minchi.co.

**The rule that drives everything: form should not add chrome.** Text sits on the
page background. Glass, fills, shadows, hover-lift, and idle animation are all
gone. Framed elements are actual images — project screenshots and book covers.

**One exception:** the Reading teaser sits in a hairline box. It's a rule, not a
card — no fill, no shadow, no hover state — marking off a self-contained thing
that continues on another page. If a second box ever appears, check it against
that test first.

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

- **Newsreader** (`--font-serif`) — everything editorial: name, prose, project
  and book titles.
- **Inter** (`--font-sans`) — section labels, plus utility text: buttons, filter
  chips, meta, the footer. A serif at 12–13px on a control goes mushy.

**Sans marks structure, serif marks content.** That two-tier split is the point
of using two faces at all, and it's worth protecting when adding anything new.

**Nothing is bold.** `globals.css` resets `h1`–`h6` to weight 400. Hierarchy comes
from size, italic, `ink-soft`/`ink-faint`, and whitespace. If you find yourself
reaching for `font-semibold`, the fix is almost always more space or a lighter ink.

Base metrics: 18.5px / 1.72. Name 40px serif. Project and Gist titles 22px serif.

**Section labels** (`h2`) are Inter, 13px, uppercase, `0.12em` tracking, in the
accent. They were serif italic at 20px in full ink and got lost — that sits in
the same visual register as the prose beneath it, so sections were findable only
by reading them.

Don't grow them past 13px: at 15px they compete with the 22px serif item titles
and the two tiers blur. Tracking eases off as size grows — wide letterspacing
helps a small cap read as a label, but past a point it stops letters grouping
into words. `0.12em` is tuned to 13px.

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

## Parked: sans body copy

The eyebrow labels above came out of a larger alternative. **The other half is
still parked:** body copy in Inter at 16.5px / 1.65 (`ink-soft`) instead of
Newsreader at 18.5px / 1.72.

```css
p, li { font-family: var(--font-sans); font-size: 16.5px; line-height: 1.65; }
```

It tested well — crisper, denser, and better at small sizes than serif is (the
Gist issue list is the weakest type on the page today). It was set aside because
the page's one distinctive quality is that it reads like a printed document, and
a serif body is most of that.

**Two things to weigh if you revisit it.** With a grey sans body the accent label
becomes the loudest thing on screen, and the eye goes to "BACKGROUND" rather than
to the work — a muted-ink label with a hairline rule running to the right edge
tested better in that combination. And applying sans to headings *as well*, so
nothing is serif, loses the warmth entirely and lands close to a generic modern
personal site.

Also rejected: putting the name in the eyebrow treatment. At 26px uppercase
accent it reads as a label for the page rather than a person, and it makes the
name compete with the section labels for the same colour.

## Icon

`public/icon.svg` — an "NT" monogram: paper letters on an ink rounded square,
Georgia (the closest ubiquitous serif to Newsreader; the favicon renders outside
the page, so `next/font` isn't available to it).

Ink ground rather than paper: a paper-coloured square would dissolve into a light
browser tab, and the mark has to hold at 16px.

PNGs are rasterised from that same SVG with `sips`, so the whole set stays in
sync from one source:

```
sips -s format png -Z <size> public/icon.svg --out public/<name>.png
```

There is deliberately **no `favicon.ico`**. The old one carried the previous
design, and `.ico` can't be generated from the SVG with the tools here — a stale
wrong-brand icon is worse than none, and every current browser takes the SVG or
PNG `<link>` instead.

## Link preview (Open Graph)

`app/opengraph-image.tsx` renders a 1200×630 card at build time: clay ground, an
accent label, the name in Newsreader, and a row of book covers.

A name-and-tagline card was tried first and read as **inert** — LinkedIn already
shows the name and headline directly above it, so restating them spends the most
prominent slot on nothing. The covers create the reason to click; the accent
label stops the card reading as "a site about books".

**Covers are local**, in `app/_og/`, read from disk rather than fetched. Same
reasoning as the font: a cover CDN hiccup would otherwise fail the build or drop
the images silently. They're a decorative snapshot, not live data — refresh them
by hand when the shelf has moved on:

```
# URLs come from lib/books.ts — reading first, then most recently read
curl -sL -o app/_og/cover-0.jpg "<cover url>"
```

**Nothing on the card or in the meta descriptions expires** — no employer, no
current project. Link previews are cached hard by every scraper that reads them,
so anything that goes stale is awkward to correct after the fact. Keep it that
way when editing.

Newsreader is read from `app/_fonts/Newsreader-Regular.ttf` rather than fetched
at build time, so a network failure on the build host can't silently substitute a
fallback face. The `.woff2` files `next/font` produces can't be used — satori
needs ttf/otf/woff.

`metadataBase` in `app/layout.tsx` is required: scrapers reject relative
`og:image` URLs, and without it previews break with no visible error locally.

**Composition is centred, not corner-anchored.** LinkedIn crops this to one
aspect in a feed card and another in its editor; anything parked near an edge
gets cut.

Note LinkedIn's *Featured* section does **not** read `og:image` — that thumbnail
is uploaded by hand. Export the card with:

```
curl -s -o thumb.png http://localhost:3000/opengraph-image
```

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
