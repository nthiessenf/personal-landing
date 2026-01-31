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

