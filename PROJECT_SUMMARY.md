# Personal Landing Page - Project Summary

## Owner
**Nikolas Thiessen** - Product Engineer at Amazon

## Live Site
**https://niko-thiessen.com**

---

## Project Overview

A premium, Apple-style personal landing page built with Next.js 14, Tailwind CSS 3, and Framer Motion. Features glassmorphism effects, soft pastel gradients, and smooth animations following "radical minimalism" design principles.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Hosting:** Vercel
- **Domain:** Porkbun (niko-thiessen.com)

---

## Project Structure

```
PersonalLanding/
├── app/
│   ├── globals.css          # Global styles, animations, background gradient
│   ├── layout.tsx           # Root layout with background gradient
│   └── page.tsx             # Main page with all sections
├── components/
│   ├── bento-grid.tsx       # Glassmorphism card grid system
│   ├── hero.tsx             # Hero section with photo + name
│   ├── project-card.tsx     # Card for LiftTrack app (with buttons)
│   ├── content-card.tsx     # Card for newsletter/podcast
│   ├── interest-card.tsx    # Cards for reading/hobbies
│   └── footer.tsx           # Footer with social links
├── public/
│   └── images/
│       ├── headshot.png           # Nikolas's profile photo
│       ├── lifttrack-screenshot.png  # LiftTrack app screenshot
│       └── gist-thumbnail.png     # Newsletter thumbnail
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
├── tailwind.config.ts       # Tailwind configuration
├── postcss.config.mjs       # PostCSS config (uses tailwindcss v3)
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies
└── PROJECT_SUMMARY.md       # This file
```

---

## Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [Photo]    Nikolas Thiessen                                │
│             Product Engineer                                │
│             Building products at Amazon                     │
│             Exploring the latest in AI                      │
└─────────────────────────────────────────────────────────────┘

What I'm Building.
┌─────────────────────────────────────────────────────────────┐
│  [App Screenshot]    LiftTrack                              │
│                      An iOS local-first workout tracking    │
│                      app built with React Native...         │
│                      [TestFlight] [GitHub]                  │
└─────────────────────────────────────────────────────────────┘

What I'm Sharing.
┌─────────────────────────────────────────────────────────────┐
│  [Newsletter         Gist | Weekly Newsletter               │
│   Thumbnail]         Every week, one new trend or concept   │
│                      in frontier tech explained clearly...  │
│                      [Read Now] [Spotify] [YouTube] [Apple] │
└─────────────────────────────────────────────────────────────┘

What I'm Into.
┌──────────────────────────┬──────────────────────────────────┐
│  Currently Reading       │  Active Life                     │
│  • The Will of The Many  │  • Jiu Jitsu — training for     │
│  • The Origins of        │    my next competition           │
│    Efficiency            │  • Surfing — planning my next   │
│  • Lenny's Newsletter    │    trip to Indonesia             │
│                          │  • Gym — staying young           │
└──────────────────────────┴──────────────────────────────────┘

─────────────────────────────────────────────────────────────
© 2025 Nikolas Thiessen               [GitHub] [LinkedIn] [Email]
```

---

## Personal Content

### Hero Section
- **Name:** Nikolas Thiessen
- **Title:** Product Engineer
- **Line 2:** Building products at Amazon
- **Line 3:** Exploring the latest in AI
- **Photo:** `/images/headshot.png`

### What I'm Building
- **Project:** LiftTrack
- **Description:** An iOS local-first workout tracking app built with React Native. Features weekly goals, progress monitoring, and routine management to help you stay consistent.
- **Image:** `/images/lifttrack-screenshot.png`
- **Links:**
  - TestFlight: https://testflight.apple.com/join/kaB6bdcu
  - GitHub: https://github.com/nthiessenf

### What I'm Sharing
- **Title:** Gist | Weekly Newsletter
- **Description:** Every week, one new trend or concept in frontier tech explained clearly—AI, chips, the forces reshaping the future. No jargon. No hype. So you're never the one nodding along.
- **Image:** `/images/gist-thumbnail.png`
- **Platform Links:**
  - Read Now: https://www.gist-newsletter.com
  - Spotify: https://open.spotify.com/show/0r6kYx2AC8yYwwygyi0R2G?si=mIsLYI5OQIW1qoIs27gGpA
  - YouTube: https://youtube.com/@gist-tech-newsletter?si=QpeEWIpQRz-SMBrH
  - Apple Podcasts: https://podcasts.apple.com/us/podcast/gist/id1869418127

### What I'm Into
**Currently Reading:**
- The Will of The Many — James Islington
- The Origins of Efficiency — Brian Potter
- Lenny's Newsletter — Lenny Rachitsky

**Active Life:**
- Jiu Jitsu — training for my next competition
- Surfing — planning my next trip to Indonesia
- Gym — staying young, one rep at a time

### Footer Social Links
- GitHub: https://github.com/nthiessenf
- LinkedIn: https://www.linkedin.com/in/nthiessen/
- Email: nthiessenf@gmail.com

---

## Design System

### Colors
- **Background:** #f5f5f7 (Apple's light gray)
- **Text Primary:** #1d1d1f
- **Text Secondary:** #6e6e73
- **Text Tertiary:** #86868b
- **Accent Gradients:** 
  - Blue: #93c5fd
  - Purple: #c4b5fd
  - Pink: #fbcfe8

### Effects
- **Glassmorphism:** `bg-white/70 backdrop-blur-xl`
- **Card hover:** `-translate-y-2 scale-[1.02]` with gradient border reveal
- **Ambient background:** Soft radial gradients at 8-12% opacity
- **Animations:** Float (6s), pulse-glow (4s), gradient-breathe (15s)

### Typography
- **Font:** SF Pro Display / system fonts
- **Heading:** Bold, tracking-[-0.03em]
- **Body:** Regular weight, text-[#6e6e73]

### Card Thumbnails
- **Fixed size:** 180px × 180px (prevents stretching at different zoom levels)
- **LiftTrack:** Phone mockup with dark gradient background
- **Newsletter:** Square image with subtle border

---

## Key Decisions Made

1. **Tailwind v3 over v4** - Downgraded because v4 uses a different config system that wasn't applying styles correctly

2. **2-column layout** - Full-width cards for Building/Sharing sections, 2-column grid for Interests

3. **Section titles** - Apple-style "What I'm Building." / "What I'm Sharing." / "What I'm Into."

4. **Horizontal card layout** - Square thumbnail on left, content on right

5. **Fixed image dimensions** - 180x180px to prevent stretching at different zoom levels

6. **Photo on left** - Hero layout has headshot on left, name/tagline on right

7. **Combined Newsletter + Podcast** - Single "Gist" card with platform buttons

8. **Tagline style** - Simple lines without colons (cleaner look)

9. **Project buttons** - TestFlight + GitHub buttons on LiftTrack card

10. **Flattened project structure** - Moved files from `landing-page/` to root for simpler Vercel deployment

---

## Deployment

### Vercel Setup
- **Project:** personal-landing
- **Framework:** Next.js (auto-detected)
- **Root Directory:** `.` (files at root level)
- **Build Command:** `next build` (default)
- **Output Directory:** `.next` (default)

### Domain Configuration (Porkbun)
DNS Records:
| Type | Host | Value |
|------|------|-------|
| A | @ (blank) | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### URLs
- **Production:** https://niko-thiessen.com
- **www redirect:** https://www.niko-thiessen.com → https://niko-thiessen.com
- **Vercel URL:** https://personal-landing-henna.vercel.app

---

## Development Commands

### Local Development
```bash
cd ~/Projects/PersonalLanding
npm run dev
```
Opens at http://localhost:3000

### Deploy Changes
```bash
git add .
git commit -m "Your commit message"
git push origin main
```
Vercel auto-deploys on push to main branch.

### Useful Commands
```bash
# View component code
cat components/hero.tsx
cat components/project-card.tsx
cat components/content-card.tsx
cat components/interest-card.tsx
cat components/bento-grid.tsx
cat components/footer.tsx
cat app/page.tsx
cat app/globals.css

# Clear Next.js cache (if styles aren't updating)
rm -rf .next && npm run dev
```

---

## How to Make Changes

### Using Cursor AI Agent
1. Open Cursor
2. Press **Cmd+I** to open AI Composer
3. Use prompts like:
   ```
   Replace the ENTIRE contents of [filename] with exactly this code. Do not modify or improve anything:
   
   [paste code here]
   ```

### After Making Changes
1. Test locally: `npm run dev`
2. Commit and push:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
3. Vercel auto-deploys within 1-2 minutes

---

## Future Enhancements

- [ ] Replace LiftTrack screenshot (remove "Claude content" watermark)
- [ ] Add Twitter/X link when ready
- [ ] Add more projects as needed
- [ ] Consider dark mode toggle
- [ ] Add analytics (Vercel Analytics or Plausible)
- [ ] Add SEO meta tags and Open Graph images

---

## Troubleshooting

### Styles not updating?
```bash
rm -rf .next && npm run dev
```

### Vercel build failing?
- Check that all files are committed and pushed
- Verify Root Directory is set correctly in Vercel settings

### Images not showing?
- Ensure images are in `public/images/`
- Use paths like `/images/headshot.png` (starting with `/`)

### DNS not working?
- Wait 5-30 minutes for propagation
- Verify records in Porkbun match Vercel's requirements
- Click "Refresh" in Vercel Domains settings
