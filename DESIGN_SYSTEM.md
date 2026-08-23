# Design System - Personal Landing Page

## Components

### Clickable Cards Pattern (Added Jan 30, 2025)
**Problem:** Nested `<a>` tags cause React hydration errors when cards with href also contain button links.

**Solution:** Use `div` with `onClick` handler instead of `<a>` wrapper:
```tsx
// WRONG - Nested <a> tags
<a href="...">
  <button><a href="...">Click</a></button>
</a>

// CORRECT - div with onClick + stopPropagation
<div onClick={() => window.open(url, '_blank')}>
  <button onClick={(e) => { e.stopPropagation(); ... }}>
</div>
```

**Implementation:**
- `ProjectCard` component: Handles both static images and videos
- `ContentCard` component: Handles platform links
- Both support `href` prop for card-level navigation
- Buttons use `stopPropagation()` to prevent card click

### Video Components (Added Jan 30, 2025)
**ProjectCard Video Support:**
- Accepts `videoUrl` and `videoThumbnail` props
- Shows thumbnail with play button overlay by default
- Plays video inline when clicked
- Dimensions: 400×225px (16:9 aspect ratio) on desktop
- Mobile: Full width with maintained aspect ratio

**Best Practices:**
- Videos should be under 5MB for optimal performance
- Use lazy loading (videos only load when scrolled into view)
- Provide thumbnail as fallback
- Compress with: `ffmpeg -i input.mp4 -vcodec libx264 -crf 28 output.mp4`


### 3D Book Effect (Added Aug 23, 2026)

Book covers hinge open on hover — cover rotates on the Y axis from its left edge,
page leaves fan out behind it, shadow deepens. Ported from minchi.co and adapted
to this site's palette (warm off-white pages, blue-tinted hover shadow matching
`BentoCard`).

CSS lives in `app/globals.css`, not Tailwind arbitrary values — eight nested
layers with multi-part transforms, the same case `.background-gradient` already
handles that way.

**Layer order (back to front):** `.b-back-cover` → `.b-inside` (3× `.b-page`) →
`.b-image` → `.b-effect` (spine) → `.b-light` (sheen).

**Sizing** is entirely `--bw` / `--bh` on `.book-scene`. Placements set only those:
teaser 138px, shelf grid ~195px, modal 120px. `.book-scene--fluid` fills a grid
cell instead, using `--bw: 100%` — valid because every transform consuming `--bw`
is a `translateX`, which resolves percentages against the element's own width.

**Two rules that matter:**

1. Hover is wrapped in `@media (hover: hover) and (pointer: fine)`. Without it, a
   tap on a touch device latches the open state and the book stays stuck ajar.
2. Hover is scoped to `.book-scene:hover` — the individual book — never a parent.
   The teaser card is one big link; scoping it higher would swing all four covers
   at once.

Never wrap a book in `BentoCard`: it sets React state on every `onMouseMove`,
unthrottled. The shelf renders 200+ books.
