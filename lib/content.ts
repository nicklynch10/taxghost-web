import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.resolve("content");

export interface ContentItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  content: string;
}

export function getAllContent(type: "blog" | "guides" | "tools"): ContentItem[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const { data, content } = matter(raw);
      return { slug, ...data, content } as ContentItem;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getContent(
  type: "blog" | "guides" | "tools",
  slug: string
): ContentItem | null {
  const items = getAllContent(type);
  return items.find((p) => p.slug === slug) || null;
}
