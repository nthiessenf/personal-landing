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

