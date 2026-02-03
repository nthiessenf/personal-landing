import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Nikolas Thiessen',
  description: 'Product Engineer building at Amazon, exploring AI',
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
    <html lang="en">
      <body>
        <div className="background-gradient" />
        {children}
      </body>
    </html>
  );
}
