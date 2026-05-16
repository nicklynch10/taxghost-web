import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Tax Tips & Strategies for DIY Investors",
  description:
    "Tax optimization strategies, loss harvesting techniques, and practical guides for managing your investment taxes without a robo-advisor.",
};

export default function BlogIndex() {
  const posts = getAllContent("blog");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-zinc-500">No posts yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-zinc-100 pb-8">
              <Link
                href={`/blog/${post.slug}/`}
                className="text-xl font-semibold hover:text-zinc-600"
              >
                {post.title}
              </Link>
              <p className="text-zinc-500 text-sm mt-1">{post.date}</p>
              <p className="text-zinc-600 mt-2">{post.description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
