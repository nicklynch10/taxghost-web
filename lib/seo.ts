import type { Metadata } from "next";

export function buildMetadata(item: {
  title: string;
  description: string;
  keywords: string[];
}): Metadata {
  return {
    title: item.title,
    description: item.description,
    keywords: item.keywords,
    openGraph: {
      title: item.title,
      description: item.description,
      type: "article",
      siteName: "TaxGhost",
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
    },
  };
}
