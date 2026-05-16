import { buildMetadata } from "@/lib/seo";
import { getContent } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const metadata = buildMetadata({
  title: "The Complete Guide to Tax Loss Harvesting",
  description:
    "A step-by-step guide to tax loss harvesting for DIY investors. Learn how to harvest losses year-round, avoid wash sales, and keep more of your after-tax returns.",
  keywords: [
    "tax loss harvesting",
    "TLH",
    "wash sale rule",
    "DIY investing",
    "tax optimization",
  ],
});

export default function TaxLossHarvestingGuide() {
  const guide = getContent("guides", "tax-loss-harvesting-guide");
  if (!guide) return null;

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">{guide.title}</h1>
      <p className="text-zinc-500 mb-8">{guide.date}</p>
      <div className="prose prose-zinc max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {guide.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
