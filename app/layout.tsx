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
  title: 'Nikolas Thiessen',
  description: 'Product builder at Tesla. Writing Gist, building small AI tools, reading too much.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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
