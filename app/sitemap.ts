import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";

export const dynamic = "force-static";

const BASE_URL = "https://taxghost.com";

const staticPages = [
  { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { url: "/blog/", priority: 0.8, changeFrequency: "weekly" as const },
  { url: "/guides/", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/tools/", priority: 0.9, changeFrequency: "weekly" as const },
  { url: "/pricing/", priority: 0.9, changeFrequency: "weekly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = getAllContent("blog").map((post) => ({
    url: `/blog/${post.slug}/`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
    lastModified: new Date(post.date),
  }));

  const guides = getAllContent("guides").map((guide) => ({
    url: `/guides/${guide.slug}/`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: new Date(guide.date),
  }));

  const tools = getAllContent("tools").map((tool) => ({
    url: `/tools/${tool.slug}/`,
    priority: 0.9,
    changeFrequency: "weekly" as const,
    lastModified: new Date(tool.date),
  }));

  return [
    ...staticPages.map((page) => ({
      url: `${BASE_URL}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...blogPosts.map((page) => ({
      url: `${BASE_URL}${page.url}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...guides.map((page) => ({
      url: `${BASE_URL}${page.url}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...tools.map((page) => ({
      url: `${BASE_URL}${page.url}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
  ];
}
