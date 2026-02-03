import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
};

export type PostFull = PostMeta & {
  content: string;
};


const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

function normalizeDate(input: unknown): string {
  // Keystatic/gray-matter may give Date objects
  if (input instanceof Date && !Number.isNaN(input.getTime())) {
    return input.toISOString().slice(0, 10); // YYYY-MM-DD
  }
  const s = String(input ?? "").trim();
  // If it's already YYYY-MM-DD, keep it
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;

  // Try parsing
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);

  return "";
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdoc"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdoc$/, "");
    const fullPath = path.join(POSTS_DIR, file);

    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);

    return {
      slug,
      title: String(data.title ?? slug),
      date: normalizeDate(data.date),
      summary: String(data.summary ?? ""),
    } satisfies PostMeta;
  });

  // newest -> oldest
  posts.sort((a, b) => b.date.localeCompare(a.date));
  return posts;
}

export function getPostBySlug(slug: string): PostFull | null {
  const safeSlug = decodeURIComponent(slug);
  const fullPath = path.join(POSTS_DIR, `${safeSlug}.mdoc`);

  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug: safeSlug,
    title: String(data.title ?? safeSlug),
    date: normalizeDate(data.date),
    summary: String(data.summary ?? ""),
    content: String(content ?? ""),
  };
}

