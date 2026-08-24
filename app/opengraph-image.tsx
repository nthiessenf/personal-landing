import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Nikolas Thiessen — product builder and engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The link preview card, in the site's own visual language: clay ground, serif
 * name, accent eyebrow. Deliberately typographic rather than a photo — in a feed
 * of stock photography a warm typeset card is the thing that stands out, and it
 * previews what someone actually gets when they click.
 *
 * Newsreader is read from disk rather than fetched at build time so a network
 * hiccup on the build host can't silently swap in a fallback face. The .woff2
 * files next/font generates can't be used here — satori needs ttf/otf/woff.
 */
export default async function OpengraphImage() {
  const newsreader = await readFile(
    join(process.cwd(), "app/_fonts/Newsreader-Regular.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f0e7dc",
          padding: 80,
          fontFamily: "Newsreader",
        }}
      >
        {/* Centred, not corner-anchored: LinkedIn crops this to a different
            aspect in the card than in its editor, and anything parked at an
            edge gets cut. Everything sits in the middle ~70%. */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 20,
            background: "#2b2521",
            color: "#f0e7dc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            marginBottom: 40,
          }}
        >
          NT
        </div>

        <div style={{ fontSize: 88, color: "#2b2521", lineHeight: 1.1 }}>
          Nikolas Thiessen
        </div>

        <div
          style={{
            fontSize: 34,
            color: "rgba(43,37,33,0.65)",
            lineHeight: 1.45,
            marginTop: 22,
            maxWidth: 880,
            textAlign: "center",
          }}
        >
          {/* Kept short enough to set on two balanced lines — the longer version
              left "for." orphaned on a third. */}
          Product builder and engineer. Building product at Tesla, writing Gist,
          reading too much.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Newsreader", data: newsreader, style: "normal", weight: 400 }],
    }
  );
}
