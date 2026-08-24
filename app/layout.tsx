import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";

/**
 * Newsreader carries everything editorial — name, prose, section labels, titles.
 * Inter is the utility face: buttons, chips, meta. A serif at 12px on a button
 * goes mushy, which is the one place the serif-throughout idea breaks down.
 */
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  // metadataBase lets Next emit absolute og:image URLs — scrapers reject
  // relative ones, so previews break silently without it.
  metadataBase: new URL('https://www.niko-thiessen.com'),
  title: 'Nikolas Thiessen',
  description: 'Product builder at Tesla. Writing Gist, building small AI tools, reading too much.',
  openGraph: {
    title: 'Nikolas Thiessen',
    description: 'Product builder and engineer. Building product at Tesla, writing Gist, reading too much.',
    url: 'https://www.niko-thiessen.com',
    siteName: 'Nikolas Thiessen',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nikolas Thiessen',
    description: 'Product builder and engineer. Building product at Tesla, writing Gist, reading too much.',
  },
  // SVG first so modern browsers get the scalable mark; the PNGs are the
  // fallback. There's deliberately no favicon.ico — the old one carried the
  // previous design and .ico can't be generated from the SVG here, so a stale
  // wrong-brand icon would be worse than none.
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
