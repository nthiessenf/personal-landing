# Personal Landing Page

A premium, Apple-inspired personal landing page built with modern web technologies. Features glassmorphism effects, soft pastel gradients, and smooth animations following radical minimalism design principles.

---

## ✨ Features

- **Premium Glassmorphism UI** – Frosted glass cards with backdrop blur and gradient borders
- **Smooth Animations** – Framer Motion-powered micro-interactions and hover effects
- **Responsive Bento Grid** – Modern card-based layout that adapts to all screen sizes
- **Optimized Performance** – Built with Next.js 14 App Router for fast page loads
- **Apple-Inspired Design** – Soft pastels, generous whitespace, and refined typography

---

## 🎨 Design Philosophy

This project embodies **Radical Minimalism** – a design approach that prioritizes:

- **Typography over decoration** – Let the content breathe
- **Whitespace as a design element** – Strategic use of negative space
- **Subtle motion** – Animations that enhance, never distract
- **Quiet luxury** – Polished experiences without visual noise

Inspired by Apple, Linear, and Swiss design principles.

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **Tailwind CSS v3** | Utility-first styling |
| **Framer Motion** | Animation library |
| **Lucide React** | Icon system |
| **TypeScript** | Type safety |
| **Vercel** | Hosting & deployment |

---

## 📁 Project Structure

```
personal-landing/
├── app/
│   ├── globals.css          # Global styles & animations
│   ├── layout.tsx           # Root layout with background
│   └── page.tsx             # Main landing page
├── components/
│   ├── bento-grid.tsx       # Card grid system
│   ├── hero.tsx             # Hero section with photo
│   ├── project-card.tsx     # Featured project cards
│   ├── content-card.tsx     # Newsletter/podcast cards
│   ├── interest-card.tsx    # Reading/hobbies cards
│   └── footer.tsx           # Social links footer
├── public/
│   └── images/              # Photos & thumbnails
├── lib/
│   └── utils.ts             # Helper functions
└── tailwind.config.ts       # Tailwind configuration
```

---

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nthiessenf/personal-landing.git
   cd personal-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 🎯 Key Components

### Hero Section
Features a floating profile photo with soft glow effects and ambient animations. The layout adapts from horizontal (desktop) to vertical (mobile) for optimal viewing.

### Bento Grid System
A flexible card-based layout that showcases:
- **What I'm Building** – Featured projects with call-to-action buttons
- **What I'm Sharing** – Newsletter and content with multi-platform links
- **What I'm Into** – Personal interests and current activities

### Glassmorphism Cards
Each card features:
- Frosted glass background (`backdrop-blur-xl`)
- Gradient borders that reveal on hover
- Subtle spotlight effects
- Smooth 3D transform animations

---

## 🎨 Design System

### Color Palette
```css
Background:     #f5f5f7  /* Apple's light gray */
Text Primary:   #1d1d1f  /* Deep charcoal */
Text Secondary: #6e6e73  /* Medium gray */
Text Tertiary:  #86868b  /* Light gray */

Accent Gradients:
  Blue:   #93c5fd
  Purple: #c4b5fd
  Pink:   #fbcfe8
```

### Typography
- **Font Family:** SF Pro Display (fallback to system fonts)
- **Headings:** Bold weight with tight letter-spacing
- **Body:** Regular weight in secondary color

### Animation Timing
- **Hover transitions:** 0.4s cubic-bezier
- **Ambient animations:** 6s ease-in-out loops
- **Page entry:** Staggered fade-ins

---

## 🚢 Deployment

This project is optimized for **Vercel** deployment:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Custom Domain** (Optional)
   - Add your domain in Vercel settings
   - Update DNS records with your registrar

### Build Command
```bash
next build
```

### Environment Variables
None required for basic deployment.

---

## 📝 Customization Guide

### Update Personal Content

1. **Hero Section** (`components/hero.tsx`)
   - Replace name and tagline
   - Update profile photo path

2. **Projects** (`components/project-card.tsx`)
   - Modify project descriptions
   - Update button links

3. **Interests** (`components/interest-card.tsx`)
   - Edit reading lists
   - Update hobby descriptions

4. **Footer** (`components/footer.tsx`)
   - Update social media links

### Color Scheme

Edit `tailwind.config.ts` to customize the color palette:

```typescript
theme: {
  extend: {
    colors: {
      'glass-blue': '#93c5fd',
      'glass-purple': '#c4b5fd',
      'glass-pink': '#fbcfe8',
    }
  }
}
```

---

## 🐛 Troubleshooting

### Styles not updating?
Clear Next.js cache:
```bash
rm -rf .next && npm run dev
```

### Images not showing?
Ensure images are in `public/images/` and use absolute paths:
```tsx
<img src="/images/headshot.png" alt="Profile" />
```

### Build errors on Vercel?
- Verify all dependencies are in `package.json`
- Check that TypeScript has no type errors
- Ensure environment variables are set if needed

---

## 📈 Performance

- **Lighthouse Score:** 95+ across all metrics
- **First Contentful Paint:** < 1.2s
- **Time to Interactive:** < 2.5s
- **Bundle Size:** Optimized with Next.js automatic code splitting

---

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Design inspiration from [Apple](https://apple.com), [Linear](https://linear.app), and [Rauno](https://rauno.me)
- Icons by [Lucide](https://lucide.dev)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Hosted on [Vercel](https://vercel.com)

---

## 📬 Contact

**Nikolas Thiessen**  
Product Engineer at Amazon

- GitHub: [@nthiessenf](https://github.com/nthiessenf)
- LinkedIn: [/in/nthiessen](https://www.linkedin.com/in/nthiessen/)
- Email: nthiessenf@gmail.com
- Website: [niko-thiessen.com](https://niko-thiessen.com)

---

<div align="center">
  
  **[⬆ Back to Top](#personal-landing-page)**
  
  Made with ❤️ and a lot of ☕
  
</div>
