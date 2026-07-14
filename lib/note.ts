// Fetches recent note.com posts from the public RSS feed at BUILD time.
// Runs during `next build` (static export), so the blog is baked into the
// static HTML and refreshes on every deploy. Fails soft: returns [] on error
// so the build never breaks if note is unreachable.

export type NotePost = {
  title: string;
  url: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
};

const RSS_URL = "https://note.com/peishum5/rss";

function clean(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function pick(item: string, tag: string): string {
  const m = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return m ? m[1] : "";
}

function toISODate(pubDate: string): string {
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function getNotePosts(limit = 8): Promise<NotePost[]> {
  try {
    const res = await fetch(RSS_URL, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; profile-site)" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
    const posts = items
      .map((it) => ({
        title: clean(pick(it, "title")),
        url: clean(pick(it, "link")),
        date: toISODate(clean(pick(it, "pubDate"))),
        excerpt: clean(pick(it, "description")).slice(0, 88),
      }))
      .filter((p) => p.title && p.url);
    posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    return posts.slice(0, limit);
  } catch {
    return [];
  }
}
