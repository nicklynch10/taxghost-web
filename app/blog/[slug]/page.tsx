import { notFound } from "next/navigation";
import { getAllContent, getContent } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const posts = getAllContent("blog");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getContent("blog", slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      siteName: "TaxGhost",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://taxghost.com/blog/${slug}/`,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getContent("blog", slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-zinc-500 mb-8">{post.date}</p>
      <div className="prose prose-zinc max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
