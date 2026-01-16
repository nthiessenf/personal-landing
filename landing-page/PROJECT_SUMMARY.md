# Personal Landing Page - Project Summary

## Owner
**Nikolas Thiessen** - Product Engineer at Amazon

---

## Project Overview

A premium, Apple-style personal landing page built with Next.js 14, Tailwind CSS 3, and Framer Motion. Features glassmorphism effects, soft pastel gradients, and smooth animations following "radical minimalism" design principles.

**Live Dev Server:** `npm run dev` → http://localhost:3000

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3 (downgraded from v4 for compatibility)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel (pending)

---

## Project Structure

```
PersonalLanding/
└── landing-page/
    ├── app/
    │   ├── globals.css          # Global styles, animations, background gradient
    │   ├── layout.tsx           # Root layout with background gradient
    │   └── page.tsx             # Main page with all sections
    ├── components/
    │   ├── bento-grid.tsx       # Glassmorphism card grid system
    │   ├── hero.tsx             # Hero section with photo + name
    │   ├── project-card.tsx     # Card for LiftTrack app
    │   ├── content-card.tsx     # Card for newsletter/podcast
    │   ├── interest-card.tsx    # Cards for reading/hobbies
    │   └── footer.tsx           # Footer with social links
    ├── public/
    │   └── images/
    │       ├── headshot.png           # Nikolas's profile photo
    │       ├── lifttrack-screenshot.png  # LiftTrack app screenshot
    │       └── gist-thumbnail.png     # Newsletter thumbnail
    ├── tailwind.config.ts       # Tailwind configuration
    ├── postcss.config.mjs       # PostCSS config (uses tailwindcss v3)
    └── package.json
```

---

## Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [Photo]    Nikolas Thiessen                                │
│             Product Engineer                                │
│             Currently: Building products at Amazon          │
│             Learning: Latest trends in AI                   │
└─────────────────────────────────────────────────────────────┘

What I'm Building.
┌─────────────────────────────────────────────────────────────┐
│  [App Screenshot]    LiftTrack                              │
│                      An iOS local-first workout tracking    │
│                      app built with React Native...         │
└─────────────────────────────────────────────────────────────┘

What I'm Sharing.
┌─────────────────────────────────────────────────────────────┐
│  [Newsletter         Gist | Weekly Newsletter               │
│   Thumbnail]         Every week, one new trend or concept   │
│                      in frontier tech explained clearly...  │
│                      [Subscribe] [Spotify] [YouTube] [Apple]│
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
© 2025 Nikolas Thiessen          [GitHub] [LinkedIn] [Email]
```

---

## Personal Content

### Hero Section
- **Name:** Nikolas Thiessen
- **Title:** Product Engineer
- **Currently:** Building products at Amazon
- **Learning:** Latest trends in AI

### What I'm Building
- **Project:** LiftTrack
- **Description:** An iOS local-first workout tracking app built with React Native. Features weekly goals, progress monitoring, and routine management to help you stay consistent.
- **Link:** None currently (TestFlight not set up for public link yet)
- **Image:** `/images/lifttrack-screenshot.png`

### What I'm Sharing
- **Title:** Gist | Weekly Newsletter
- **Description:** Every week, one new trend or concept in frontier tech explained clearly—AI, chips, the forces reshaping the future. No jargon. No hype. So you're never the one nodding along.
- **Image:** `/images/gist-thumbnail.png`
- **Platform Links:**
  - Subscribe: https://www.gist-newsletter.com
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

### Social Links
- GitHub: https://github.com/nthiessenf
- LinkedIn: https://www.linkedin.com/in/nthiessen/
- Email: nthiessenf@gmail.com
- Twitter/X: Not included

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

---

## Key Decisions Made

1. **Tailwind v3 over v4** - Downgraded because v4 uses a different config system that wasn't applying styles correctly

2. **2-column layout** - Full-width cards for Building/Sharing sections, 2-column grid for Interests

3. **Section titles** - Apple-style "What I'm Building." / "What I'm Sharing." / "What I'm Into."

4. **Horizontal card layout** - Square thumbnail on left, content on right (more compact than vertical)

5. **Fixed image dimensions** - 180x180px to prevent stretching at different zoom levels

6. **Photo on left** - Hero layout has headshot on left, name/tagline on right

7. **Combined Newsletter + Podcast** - Single "Gist" card with platform buttons (Subscribe, Spotify, YouTube, Apple)

---

## Remaining Tasks

### Small Fixes (Optional)
- [ ] Replace LiftTrack screenshot (current one has "Claude content" watermark)
- [ ] Any typography/spacing tweaks
- [ ] Test on actual mobile device

### Deployment
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Set up custom domain (optional)

### Future Enhancements
- [ ] Add TestFlight link once available
- [ ] Add Twitter/X when ready
- [ ] Add more projects as needed
- [ ] Consider dark mode toggle

---

## How to Resume Development

1. Navigate to project:
   ```bash
   cd ~/Projects/PersonalLanding/landing-page
   ```

2. Start dev server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000

4. To make changes, use Cursor's AI agent (Cmd+I) with prompts like:
   ```
   Replace the ENTIRE contents of [filename] with exactly this code. Do not modify or improve anything:
   
   [paste code here]
   ```

---

## Deployment to Vercel (When Ready)

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. Go to https://vercel.com

3. Click "New Project"

4. Import your GitHub repository

5. Vercel auto-detects Next.js - just click "Deploy"

6. Your site will be live at `your-project.vercel.app`

7. (Optional) Add custom domain in Vercel dashboard

---

## File Reference

For quick access to current component code, run:
```bash
cat components/hero.tsx
cat components/project-card.tsx
cat components/content-card.tsx
cat components/interest-card.tsx
cat components/bento-grid.tsx
cat components/footer.tsx
cat app/page.tsx
cat app/globals.css
```
