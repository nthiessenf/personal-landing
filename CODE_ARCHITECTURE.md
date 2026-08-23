# Code Architecture — Personal Landing Page

## Page structure (Aug 2026)

The landing page is a single column of labelled sections, in this order:

```
SiteHeader          nav only on the landing page; name + nav elsewhere
Intro               headshot, name (the page h1), three sentences
Background          one paragraph: ops → product, global teams
Projects            FrugalScan + Gist
Reading             teaser → /bookshelf
Other hobbies       jiu jitsu, surfing, gym
Elsewhere           annotated links (email, GitHub, LinkedIn)
Footer              last-updated line
```

This replaced four parallel "What I'm ___." sections. The old *What I'm Into*
card was folded into the Intro paragraph, and the footer's three unlabelled
social icons became the annotated **Elsewhere** list — every link now says what
it's for.

### The one structural rule

**Nothing is described twice.** The intro covers now and past in prose; every
section below is the only place its subject is explained. Two decisions follow
from it, and both were arrived at the hard way:

- There's no `Currently` section (below).
- Hobbies moved *out* of the intro when they got a section of their own
  (`Off the clock`).
- The career arc moved *into* `Background` and back out of the intro. It briefly
  lived in the intro as a second paragraph, which was right while it was one thin
  sentence: a fat intro over a thin section reads lopsided. With real substance
  the weights flip, and a short intro over a substantial section balances. The
  intro now owns geography and Tesla; Background owns the ops history; neither
  repeats the other.

Before adding anything to this page, check it against the rule.

### Why there is no `Currently` section

There was one, between Intro and Building, and it duplicated both. Every row was
either already named in the intro paragraph or described in full by its own
section below; strip the overlap and nothing unique remained. The intro carries
"what I'm up to now" in warmer form, and the footer's last-updated line carries
recency — neither can go stale the way a hand-maintained list can.

If you ever want it back, make it a genuine `/now` changelog ("shipped X in
June", "comp in October") rather than a catalog of things — that doesn't overlap,
because the sections say what things *are* while a now-list says what's
*happening*. Weigh it against the upkeep: a stale Currently is worse than none.

### LiftTrack

Removed. There's no Apple developer account any more, so it's off the App Store
and its TestFlight link is a dead end — the page returns 200 but reads "this beta
isn't accepting any new testers." It briefly survived as a clause in the intro;
that went when `Background` took over, since a retired side project diluted a
paragraph about a career arc. `lifttrack-*.png` remain in `public/images`,
unreferenced.

## Components

| Component | Role |
|---|---|
| `site-header.tsx` | Nav on every page; name only off the landing page. Exists mainly so `/bookshelf` is reachable from anywhere; it used to be enterable only via the reading teaser. `Writing` is a `/#writing` anchor — there's no `/writing` route yet. |
| `intro.tsx` | Headshot, name, three sentences. **Copy is a draft** — it's the most-read text on the page. |
| `section.tsx` | Italic label + content. No card, no border. Takes an optional `id` for anchoring. |
| `link-list.tsx` | The `Currently` and `Elsewhere` rows: a link plus a plain-language note. `href` is optional — a row without one is a statement. Uses flex so a wrapped note hangs under the label, not under the bullet. |
| *(Background)* | Inline in `app/page.tsx` — one paragraph, no component. Names no companies on purpose; the roles are the distinctive part. |
| `project.tsx` | A project: image beside text, no card. A link whose `url` is `#demo` opens the video lightbox instead of navigating. |
| `video-lightbox.tsx` | The demo overlay. Shared so it can be opened from an image or a plain text link without two copies. |
| `demo-link.tsx` | Opens the demo from a text link, for layouts with no thumbnail to click. |
| `writing.tsx` | Gist, with recent issue titles. **`RECENT_ISSUES` is hand-maintained** — see below. |
| `reading-teaser.tsx` | Landing-page entry to `/bookshelf`. The cover grid is one link; books are decorative. |
| `footer.tsx` | Just the last-updated line. **`LAST_UPDATED` is hand-maintained.** |

### Headings

There is exactly one `h1` per page, and the name appears exactly once.

The wordmark does two jobs — say whose site this is, and link home — and on the
landing page both are redundant: you're already home, and the intro names you at
40px right below. So `SiteHeader` renders **nav only** when
`active === "About"`, and the intro's 40px name is that page's `h1`. Every other
page gets the wordmark back, where it earns both jobs, and supplies its own `h1`
below it (`Bookshelf`).

If you add a page, give it an `h1` — the header won't provide one.

Section labels are `h2`: 20px, italic, full-strength ink. Weight isn't available
as a lever here — nothing on this site is bold — so their separation from body
text comes from size, italic, and the space above.

### `Projects`

`Building` and `Writing` were separate headings until each was down to one item,
at which point they were scaffolding rather than structure. One label now covers
both. The header's *Writing* nav item anchors to `#writing` on the Gist block
inside the section — keep that id if you rename anything.

`Other hobbies` sits below `Reading` and is named "other" because reading is a
hobby too; the section is the rest of them.

*Other hobbies* and *Elsewhere* are both `LinkList` data in `app/page.tsx`, not
components. The earlier version of *Off the clock* was three generic bullets in a
card and read like the hobbies field on a form; the notes are deliberately
specific now — a named competition and a named trip do more work than a category.

### Removed in the Aug 2026 rework

`bento-grid.tsx` (BentoCard/BentoGrid), `hero.tsx`, `project-card.tsx`,
`content-card.tsx`, `interest-card.tsx`. All were card-chrome wrappers or their
contents; `project.tsx` and `writing.tsx` cover what they did without the chrome.

### Two hand-maintained spots

Both are marked `TODO` in the source:

- `writing.tsx` → `RECENT_ISSUES`. Gist runs on beehiiv, which can expose an RSS
  feed (Settings → Publication → RSS). No feed responded at the usual paths when
  this was built, so the titles are placeholders. If you enable the feed, this
  list can be fetched at build time instead.
- `footer.tsx` → `LAST_UPDATED`. It's the only thing telling a visitor whether
  any of the page is still true.

## Bookshelf

Cover-forward reading shelf: a teaser on the landing page linking to `/bookshelf`.

**Data — `lib/books.ts`**

Generated by `scripts/import-goodreads.mjs` from a Goodreads library export, then
hand-curated. It is the source of truth; re-running the importer **overwrites it**,
losing any hand-tagged genres and hand-written notes.

```
node scripts/import-goodreads.mjs [path/to/goodreads_library_export.csv]
```

The importer skips `to-read`, unwraps Goodreads' Excel-escaped ISBNs (`="978…"`),
collapses doubled whitespace in author names, splits series out of titles
(`Morning Star (Red Rising Saga, #3)` → title + `series`), maps rating `0` to
undefined (Goodreads uses 0 for "unrated"), and resolves a cover for each book.

**Cover resolution.** Open Library is missing covers for many specific editions —
the ISBN Goodreads recorded hits only ~62% of the time. So the importer tries the
ISBN endpoint first, and when that 404s falls back to Open Library's search API,
which returns a cover for the *work* rather than one edition. That raises coverage
to ~86%. Search results are validated against title **and** author surname before
being accepted: unvalidated, the search returned an 1894 Harvard library scan for
a 2022 thriller. A wrong cover is worse than no cover.

| Component | Role |
|---|---|
| `book-3d.tsx` | The 3D book. One component, three placements — teaser, shelf grid, modal. Only `--bw`/`--bh` differ. Renders a typographic fallback tile when there's no cover. |
| `book-cover.tsx` | Clickable wrapper. Plain button, CSS-only hover — deliberately no per-frame React state; the shelf renders 144 of these. |
| `book-shelf.tsx` | Genre filter chips + grid + modal state. Client component. |
| `book-modal.tsx` | Detail overlay with prev/next (buttons and arrow keys). |

**Genres** are hand-assigned in `lib/books.ts` (`genre: ""` after import). The
filter buttons derive themselves from `genresInUse()`, so a genre with no books
has no button, and no buttons render at all until something is tagged.

**`next.config.ts`** needs `images.remotePatterns` for `covers.openlibrary.org` or
`next/image` throws at runtime on every cover.
