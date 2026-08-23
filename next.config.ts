import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Book covers on /bookshelf are served from Open Library by ISBN.
    // Without this next/image throws at runtime on every cover.
    remotePatterns: [{ protocol: "https", hostname: "covers.openlibrary.org" }],
  },
};

export default nextConfig;
