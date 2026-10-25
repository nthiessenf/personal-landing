import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // Conservative CSP: blocks framing, plugins and base-tag hijacking without
  // breaking Next.js inline scripts/styles. Tighten with nonces later if desired.
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Book covers on /bookshelf are served from Open Library by ISBN.
    // Without this next/image throws at runtime on every cover.
    remotePatterns: [{ protocol: "https", hostname: "covers.openlibrary.org" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
