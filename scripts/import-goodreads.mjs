/**
 * One-time importer: Goodreads CSV export -> lib/books.ts
 *
 * Usage:  node scripts/import-goodreads.mjs [path/to/goodreads_library_export.csv]
 *
 * Committed as a record of how lib/books.ts was generated. Re-running OVERWRITES
 * lib/books.ts, so any hand-tagged genres, hand-written notes, and hand-picked
 * coverIds are lost. If you re-import after curating, diff the output rather
 * than clobbering the file.
 *
 * Cover quality caveat: Open Library's work-level cover is picked arbitrarily and
 * is often a foreign-language edition or a library scan with a checkout sticker.
 * Several coverIds in lib/books.ts were chosen by hand from the work's edition
 * list for that reason. Automated resolution gets ~90%; the rest is eyeballing.
 *
 * Export the CSV from Goodreads: My Books -> Import and Export -> Export Library.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

const INPUT =
  process.argv[2] || join(homedir(), "Downloads", "goodreads_library_export.csv");
const OUTPUT = resolve(process.cwd(), "lib/books.ts");

/** Minimal RFC-4180 parser. Goodreads quotes any field containing commas or
 *  newlines, and escapes embedded quotes by doubling them. */
function parseCSV(input) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') inQuotes = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else if (char !== "\r") {
      field += char;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/** Goodreads writes ISBNs Excel-escaped as ="9780123456789" so spreadsheets
 *  don't mangle them into scientific notation. Unwrap to bare digits. */
const unwrapIsbn = (raw) => (raw || "").replace(/^="?|"?$/g, "").trim();

/** Author and title fields arrive with runs of internal whitespace
 *  ("Brian     Potter"). Collapse them. */
const squash = (s) => (s || "").replace(/\s+/g, " ").trim();

/** "Morning Star (Red Rising Saga, #3)" -> title + series, so the shelf shows
 *  a clean title and the series reads as metadata rather than punctuation. */
function splitSeries(rawTitle) {
  // Handles both "#3" and omnibus ranges like "#1-3".
  const match = rawTitle.match(/^(.*?)\s*\(([^()]*#[\d.]+(?:-[\d.]+)?)\)\s*$/);
  if (!match) return { title: rawTitle, series: undefined };
  return { title: squash(match[1]), series: squash(match[2]).replace(/,\s*#/, " #") };
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Emit a TS single-quoted-safe double-quoted string literal. */
const lit = (s) => JSON.stringify(s);

const rows = parseCSV(readFileSync(INPUT, "utf8"));
const header = rows[0].map((h) => h.trim());
const idx = (name) => {
  const i = header.indexOf(name);
  if (i === -1) throw new Error(`Expected column "${name}" not found in CSV header`);
  return i;
};

const C = {
  title: idx("Title"),
  author: idx("Author"),
  isbn13: idx("ISBN13"),
  isbn: idx("ISBN"),
  rating: idx("My Rating"),
  dateRead: idx("Date Read"),
  shelf: idx("Exclusive Shelf"),
};

const seenIds = new Set();
const books = [];
let skippedToRead = 0;

for (const row of rows.slice(1)) {
  if (!row[C.title]) continue;

  const shelf = row[C.shelf];
  // A shelf of books he hasn't read isn't the point of the page.
  if (shelf === "to-read") {
    skippedToRead++;
    continue;
  }
  const status = shelf === "currently-reading" ? "reading" : "read";

  const { title, series } = splitSeries(squash(row[C.title]));
  const author = squash(row[C.author]);

  // Prefer ISBN13 (what the Open Library cover endpoint keys on best), but fall
  // back to ISBN10 rather than dropping the cover entirely.
  const isbn = unwrapIsbn(row[C.isbn13]) || unwrapIsbn(row[C.isbn]);

  // Goodreads uses 0 to mean "unrated", not "zero stars".
  const ratingRaw = parseInt(row[C.rating], 10);
  const rating = Number.isInteger(ratingRaw) && ratingRaw > 0 ? ratingRaw : undefined;

  // "YYYY/MM/DD", and empty for anything read before he tracked dates.
  let finished;
  const dm = (row[C.dateRead] || "").match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
  if (dm) finished = { month: parseInt(dm[2], 10), year: parseInt(dm[1], 10) };

  let id = slugify(title);
  if (!id) id = slugify(author) || "book";
  let unique = id;
  let n = 2;
  while (seenIds.has(unique)) unique = `${id}-${n++}`;
  seenIds.add(unique);

  books.push({ id: unique, title, author, series, isbn, status, rating, finished, sort: row[C.dateRead] || "" });
}

// ---------------------------------------------------------------------------
// Resolve covers.
//
// The ISBN in the export is whichever edition was shelved, and Open Library is
// missing covers for a lot of specific editions (~23% of the ones here). Their
// search endpoint returns a cover for the *work*, which hits far more often, so
// fall back to that whenever the direct ISBN lookup 404s.
// ---------------------------------------------------------------------------
const UA = "PersonalLanding-bookshelf-import/1.0 (one-time import)";

async function isbnHasCover(isbn) {
  if (!isbn) return false;
  try {
    const res = await fetch(
      `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`,
      { method: "HEAD", headers: { "User-Agent": UA } }
    );
    return res.ok;
  } catch {
    return false;
  }
}

/** Lowercase, strip punctuation and articles, collapse whitespace. */
const norm = (s) =>
  (s || "")
    .toLowerCase()
    // "How to Win Friends & Influence People" vs "...and Influence People"
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(the|a|an)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Open Library's search is fuzzy enough to return unrelated books — querying
 * "Red Tide M.P. Woodward" came back with an 1894 Harvard library scan. A wrong
 * cover is worse than no cover, so only accept a hit whose title AND author
 * both actually match.
 */
function isPlausibleMatch(doc, title, author) {
  const want = norm(title);
  const got = norm(doc.title);
  if (!want || !got) return false;

  // Goodreads titles carry subtitles Open Library sometimes drops, and vice
  // versa ("The Hobbit" vs "The Hobbit, or There and Back Again"). Allow a
  // prefix match either way, but require it to land on a word boundary so
  // "The Grid" can't match "The Gridiron Handbook".
  let titleOk = got === want;
  if (!titleOk) {
    const [short, long] = got.length < want.length ? [got, want] : [want, got];
    titleOk =
      short.length >= 4 &&
      long.startsWith(short) &&
      (long.length === short.length || long[short.length] === " ");
  }
  if (!titleOk) return false;

  // Surname is the stable part; Goodreads and Open Library disagree constantly
  // on initials and middle names.
  const surname = norm(author).split(" ").filter(Boolean).pop();
  if (!surname || surname.length < 3) return false;
  const names = doc.author_name || [];
  // Open Library sometimes lists an author only in their native script
  // (村上春樹 for Murakami), which no surname check can match. The title
  // already matched exactly, so accept rather than discard a good cover.
  if (names.length && !names.some((n) => /[a-z]/i.test(n))) return true;
  return names.some((a) => norm(a).split(" ").includes(surname));
}

async function searchCoverId(title, author) {
  const params = new URLSearchParams({
    q: `${title} ${author}`,
    fields: "title,author_name,cover_i",
    limit: "5",
  });
  try {
    const res = await fetch(`https://openlibrary.org/search.json?${params}`, {
      headers: { "User-Agent": UA },
    });
    if (!res.ok) return undefined;
    const data = await res.json();
    const hit = (data?.docs || []).find(
      (d) => d.cover_i && isPlausibleMatch(d, title, author)
    );
    return hit?.cover_i ?? undefined;
  } catch {
    return undefined;
  }
}

/** Small worker pool — Open Library is a free service, so don't hammer it. */
async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (cursor < items.length) {
        const i = cursor++;
        results[i] = await fn(items[i], i);
      }
    })
  );
  return results;
}

process.stdout.write(`Resolving covers for ${books.length} books`);
let done = 0;
await mapLimit(books, 6, async (b) => {
  if (await isbnHasCover(b.isbn)) {
    b.coverByIsbn = true;
  } else {
    b.coverId = await searchCoverId(b.title, b.author);
  }
  if (++done % 25 === 0) process.stdout.write(".");
});
process.stdout.write("\n");

// Newest-read first, so the teaser and the top of the shelf stay current.
// Undated books sort to the end rather than jumbling in among the dated ones.
books.sort((a, b) => {
  if (a.status !== b.status) return a.status === "reading" ? -1 : 1;
  if (!a.sort && !b.sort) return 0;
  if (!a.sort) return 1;
  if (!b.sort) return -1;
  return b.sort.localeCompare(a.sort);
});

const entries = books
  .map((b) => {
    const lines = [
      `    id: ${lit(b.id)},`,
      `    title: ${lit(b.title)},`,
      `    author: ${lit(b.author)},`,
    ];
    if (b.series) lines.push(`    series: ${lit(b.series)},`);
    lines.push(`    isbn: ${lit(b.isbn)},`);
    if (b.coverByIsbn) lines.push(`    coverIsbn: ${lit(b.isbn)},`);
    else if (b.coverId) lines.push(`    coverId: ${b.coverId},`);
    else lines.push(`    // TODO: no cover on Open Library — shows the fallback tile`);
    lines.push(`    status: ${lit(b.status)},`);
    lines.push(`    genre: "",`);
    if (b.rating !== undefined) lines.push(`    rating: ${b.rating},`);
    if (b.finished) lines.push(`    finished: { month: ${b.finished.month}, year: ${b.finished.year} },`);
    return `  {\n${lines.join("\n")}\n  },`;
  })
  .join("\n");

const missingIsbn = books.filter((b) => !b.isbn).length;

const file = `// GENERATED by scripts/import-goodreads.mjs from a Goodreads library export.
// Safe to hand-edit — this file is the source of truth for the shelf. Re-running
// the importer overwrites it, so curate here and don't re-run casually.
//
// After import, two passes are yours to make:
//   1. Delete books that don't belong on a public shelf.
//   2. Fill in \`genre\` (currently "" everywhere) and add \`note\` where you have something to say.

export type BookStatus = "reading" | "read";

/** Hand-assigned during curation. Kept as a loose string so adding a genre is a
 *  one-word edit here; the filter buttons derive themselves from what's in use. */
export type Genre = string;

export interface Book {
  /** Slug from the title. React key and modal identity. */
  id: string;
  title: string;
  author: string;
  /** e.g. "Red Rising Saga #1", split out of the Goodreads title. */
  series?: string;
  /** From the Goodreads export. Bibliographic data — NOT a promise that a cover
   *  exists, which is what coverIsbn is for. */
  isbn: string;
  /** A cover file in public/, for books no cover API has. Wins over everything.
   *  Hand-added during curation — the importer never sets this, so re-importing
   *  drops it. Check public/images/covers/ before assuming a book has no cover. */
  coverSrc?: string;
  /** Set only when this ISBN was verified at import time to have a cover. */
  coverIsbn?: string;
  /** Open Library cover id, resolved by searching title+author when the ISBN
   *  had no cover. Preferred over coverIsbn when present. */
  coverId?: number;
  status: BookStatus;
  /** "" until hand-tagged. Untagged books show under "All" but no genre button. */
  genre: Genre;
  /** 1-5. Undefined when unrated; Goodreads has no half stars. */
  rating?: number;
  finished?: { month: number; year: number };
  /** Your take on the book. Omitted from the modal when absent. */
  note?: string;
}

/**
 * Open Library cover URL. Prefers the resolved cover id — it points at the work
 * rather than one specific edition, so it hits far more often than the ISBN the
 * Goodreads export happened to record.
 *
 * \`default=false\` makes a miss return 404 rather than a grey placeholder image,
 * which is what lets BookCover's onError swap in the fallback tile.
 */
export const coverUrl = (book: Pick<Book, "coverSrc" | "coverIsbn" | "coverId">) =>
  book.coverSrc
    ? book.coverSrc
    : book.coverId
      ? \`https://covers.openlibrary.org/b/id/\${book.coverId}-L.jpg?default=false\`
      : \`https://covers.openlibrary.org/b/isbn/\${book.coverIsbn}-L.jpg?default=false\`;

/**
 * True only when a cover was actually verified at import time. Checking \`isbn\`
 * here instead would be wrong: plenty of books have an ISBN that Open Library
 * has no cover for, and rendering an <img> for those means a guaranteed 404 and
 * a visible flash before the fallback tile takes over.
 */
export const hasCover = (book: Pick<Book, "coverSrc" | "coverIsbn" | "coverId">) =>
  Boolean(book.coverSrc || book.coverId || book.coverIsbn);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatFinished = (finished: Book["finished"]) =>
  finished ? \`\${MONTHS[finished.month - 1]} \${finished.year}\` : "";

/** Genres actually in use, for the filter buttons. Derived rather than hardcoded
 *  so deleting the last book of a genre removes its button automatically. */
export const genresInUse = (list: Book[]): string[] =>
  [...new Set(list.map((b) => b.genre).filter(Boolean))].sort();

export const books: Book[] = [
${entries}
];
`;

writeFileSync(OUTPUT, file);

console.log(`Imported ${books.length} books -> lib/books.ts`);
console.log(`  reading: ${books.filter((b) => b.status === "reading").length}`);
console.log(`  read:    ${books.filter((b) => b.status === "read").length}`);
console.log(`  skipped ${skippedToRead} to-read`);
console.log(`  covers: ${books.filter((b) => b.coverByIsbn).length} by ISBN, ${books.filter((b) => b.coverId).length} by search, ${books.filter((b) => !b.coverByIsbn && !b.coverId).length} none (fallback tile)`);
console.log(`  ${missingIsbn} had no ISBN in the export`);
