import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Guides — Tax-Loss Harvesting & Tax Optimization",
  description:
    "In-depth guides on tax-loss harvesting, wash sale rules, cost basis tracking, and portfolio tax optimization for DIY investors.",
};

export default function GuidesIndex() {
  const guides = getAllContent("guides");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Guides</h1>
      {guides.length === 0 ? (
        <p className="text-zinc-500">No guides yet.</p>
      ) : (
        <div className="space-y-8">
          {guides.map((guide) => (
            <article key={guide.slug} className="border-b border-zinc-100 pb-8">
              <Link
                href={`/guides/${guide.slug}/`}
                className="text-xl font-semibold hover:text-zinc-600"
              >
                {guide.title}
              </Link>
              <p className="text-zinc-600 mt-2">{guide.description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
