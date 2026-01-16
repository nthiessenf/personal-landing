import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Builder, creator, and storyteller crafting experiences at the intersection of design and technology.",
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
