# Code Architecture - Personal Landing Page

## Components

### ProjectCard Component (Updated Jan 30, 2025)
**New Features:**
- Video support via `videoUrl` and `videoThumbnail` props
- Clickable card backgrounds with `href` prop (using div+onClick)
- Play button overlay for videos
- Inline video playback

**Props:**
- `videoUrl?: string` - Path to video file
- `videoThumbnail?: string` - Thumbnail image for video player
- `href?: string` - Makes entire card clickable (opens in new tab)
- Existing props maintained: title, description, icon, image, links

**Usage:**
```tsx
// Video project
<ProjectCard
  videoUrl="/videos/demo.mp4"
  videoThumbnail="/images/thumbnail.png"
  href="https://example.com"
  links={[...]}
/>

// Image project (existing pattern)
<ProjectCard
  image="/images/screenshot.png"
  href="https://example.com"
  links={[...]}
/>
```

### ContentCard Component (Updated Jan 30, 2025)
**Changes:**
- Added clickable card support with `href` prop
- Uses div+onClick pattern to avoid nested anchor tags
- Keyboard accessible (Enter/Space keys work)

### Hero Component (Updated Feb 1, 2025)
**New Features:**
- Resume link with animated underline on hover
- ArrowUpRight icon from Lucide React
- Opens in new tab with `target="_blank"`
- Positioned below three-line bio with 24px margin

**Styling:**
- Base color: `text-[#6e6e73]` (secondary gray)
- Hover color: `text-[#1d1d1f]` (primary dark)
- Animated underline: 0 → 100% width on hover (0.3s transition)
- Icon animation: Translates diagonally (+0.5px x/y) on hover
- Font size: 14px (smaller than bio to maintain hierarchy)
