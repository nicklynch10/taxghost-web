import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/404", "/500"],
      },
    ],
    sitemap: "https://taxghost.com/sitemap.xml",
    host: "https://taxghost.com",
  };
}
