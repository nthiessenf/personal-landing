# Session Log - January 30, 2025

## Session Goal
Add FrugalScan project card to personal landing page with video demo and improve visual consistency.

## Changes Implemented

### 1. Added FrugalScan Project Card
- **Location:** "What I'm Building" section (appears first, before LiftTrack)
- **Features:**
  - Video demo with play button overlay (1:05 duration)
  - Inline video playback on click
  - Three action buttons: Demo, Try It Now, GitHub
  - DollarSign icons (changed from Mail icons)
- **Files:**
  - Video: `/public/videos/frugalscan-demo.mp4` (11MB)
  - Thumbnail: `/public/images/frugalscan-thumbnail.png` (1.1MB)

### 2. Updated LiftTrack Card Layout
- **Change:** Single phone screenshot → Dual phone screenshots
- **New image:** `/public/images/lifttrack-dual-screenshot.png`
- **Dimensions:** 400×225px landscape (matches FrugalScan video aspect ratio)
- **Created with:** Custom HTML tool (`lifttrack-dual-mockup.html`)

### 3. Fixed Clickable Cards Pattern
- **Problem:** Nested `<a>` tags causing React hydration errors
- **Solution:** Changed card wrappers from `<a href>` to `<div onClick>`
- **Implementation:** Updated `ProjectCard` and `ContentCard` components
- **Result:** Cards clickable, buttons work independently, no console errors

### 4. UI Polish
- **Icons:** Changed FrugalScan to use DollarSign instead of Mail
- **Button text:** "Try Live" → "Try It Now"
- **Section titles:** Fixed viewport animation (once: false, amount: 0.3)

## Technical Learnings

### React Hydration Errors
**Issue:** Cannot nest `<a>` inside `<a>` tags in HTML
**Pattern:** 
```tsx
// Use div+onClick for card wrapper
<div onClick={() => window.open(url, '_blank')}>
  <button onClick={(e) => e.stopPropagation()}>...</button>
</div>
```

### Video Performance
- Videos use lazy loading (only load when scrolled into view)
- Thumbnail shows first, video streams on demand
- 11MB is too large for production (target: 5MB)
- Compress command: `ffmpeg -i input.mp4 -vcodec libx264 -crf 28 output.mp4`

### Git Workflow for Backups
**Process:**
1. `git stash` - Hide current changes
2. `git branch production-backup-DATE` - Create backup of old version
3. `git push origin backup-branch` - Push backup to GitHub
4. `git stash pop` - Restore changes
5. `git commit && git push` - Deploy new version

**Branches created:**
- `production-backup-jan30-2025` - Snapshot before FrugalScan addition

## Action Items for Next Session

### High Priority
- [ ] Compress FrugalScan video from 11MB to ~5MB
  - Command: `ffmpeg -i public/videos/frugalscan-demo.mp4 -vcodec libx264 -crf 28 public/videos/frugalscan-demo-compressed.mp4`
  - Then: `git add`, `git commit --amend`, `git push --force`
  - Impact: Faster page loads, better mobile experience

### Future Enhancements
- [ ] Add loading skeleton for video thumbnail
- [ ] Consider adding video preload="metadata" optimization
- [ ] Create more dual-screenshot mockups for future projects
- [ ] Document dual-screenshot creation process

## Files Modified
- `app/page.tsx` - Added FrugalScan card, updated imports
- `components/project-card.tsx` - Added video support, fixed clickable pattern
- `components/content-card.tsx` - Fixed clickable pattern
- `public/images/frugalscan-thumbnail.png` - NEW
- `public/images/lifttrack-dual-screenshot.png` - NEW
- `public/videos/frugalscan-demo.mp4` - NEW (11MB - needs compression)

## Deployment
- **Branch:** main
- **Commit:** "Add FrugalScan project with video demo, dual-screenshot LiftTrack, and UI improvements"
- **Backup:** production-backup-jan30-2025
- **Status:** ✅ Deployed to https://niko-thiessen.com
- **Performance:** Video loads on scroll (lazy loading working)
- **Known issue:** 11MB video size (flagged for compression)

