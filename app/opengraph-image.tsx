import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Nikolas Thiessen — product builder and engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COVERS = ["cover-0.jpg", "cover-1.jpg", "cover-2.jpg", "cover-3.jpg"];

/**
 * The link preview card, in the site's own visual language: clay ground, an
 * accent label, the name in Newsreader, and a row of book covers.
 *
 * Typographic-plus-covers rather than a photo. A name-and-tagline card was tried
 * first and read as inert — LinkedIn already shows the name and headline
 * directly above the card, so restating them spends the most prominent slot on
 * nothing. The covers are the part that creates a reason to click, and the
 * accent label stops the card reading as "this is a site about books".
 *
 * Fonts and covers are read from disk, not fetched during the build. A network
 * hiccup on the build host would otherwise either fail the build or silently
 * substitute a fallback face, with nothing visibly wrong locally.
 *
 * Refreshing the covers is manual and deliberate — see DESIGN_SYSTEM.md.
 */
export default async function OpengraphImage() {
  const dir = join(process.cwd(), "app/_og");
  const [newsreader, ...covers] = await Promise.all([
    readFile(join(process.cwd(), "app/_fonts/Newsreader-Regular.ttf")),
    ...COVERS.map((f) => readFile(join(dir, f))),
  ]);

  const coverSrc = covers.map(
    (buf) => `data:image/jpeg;base64,${buf.toString("base64")}`
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
          padding: "64px 80px",
          fontFamily: "Newsreader",
        }}
      >
        {/* Centred, not corner-anchored: LinkedIn crops this to a different
            aspect in the card than in its editor, and anything parked at an
            edge gets cut. */}
        <div
          style={{
            fontSize: 21,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#9c5a3c",
            fontFamily: "sans-serif",
            marginBottom: 26,
          }}
        >
          Projects · Writing · Books
        </div>

        <div style={{ fontSize: 84, color: "#2b2521", lineHeight: 1.1 }}>
          Nikolas Thiessen
        </div>

        {/* Nothing here expires — no employer, no current project — so the card
            survives a job change without a rebuild. */}
        <div
          style={{
            fontSize: 32,
            color: "rgba(43,37,33,0.65)",
            marginTop: 16,
          }}
        >
          Product builder and engineer.
        </div>

        <div style={{ display: "flex", gap: 22, marginTop: 48 }}>
          {coverSrc.map((src, i) => (
            <img
              key={i}
              src={src}
              width={116}
              height={174}
              style={{
                objectFit: "cover",
                borderRadius: 4,
                boxShadow: "0 3px 12px rgba(43,37,33,0.22)",
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Newsreader", data: newsreader, style: "normal", weight: 400 }],
    }
  );
}
