import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Keep more of your after-tax returns
        </h1>
        <p className="text-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
          TaxGhost reconstructs your tax lots from any brokerage statement,
          finds tax-loss harvesting opportunities, and flags wash sales — all
          without moving your assets to a robo-advisor.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/tools"
            className="bg-zinc-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-zinc-800"
          >
            Try Free Tools
          </Link>
          <Link
            href="/blog"
            className="border border-zinc-300 px-6 py-3 rounded-lg font-medium hover:bg-zinc-50"
          >
            Read the Blog
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-zinc-100">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Free Tools
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/tools/wash-sale-checker"
            className="border border-zinc-200 rounded-lg p-6 hover:border-zinc-400 transition-colors"
          >
            <h3 className="font-semibold mb-2">Wash Sale Checker</h3>
            <p className="text-sm text-zinc-600">
              Check if your trades trigger the wash sale rule before you execute.
            </p>
          </Link>
          <div className="border border-zinc-200 rounded-lg p-6 opacity-60">
            <h3 className="font-semibold mb-2">TLH Calculator</h3>
            <p className="text-sm text-zinc-600">Coming soon.</p>
          </div>
          <div className="border border-zinc-200 rounded-lg p-6 opacity-60">
            <h3 className="font-semibold mb-2">Cost Basis Reconstructor</h3>
            <p className="text-sm text-zinc-600">Coming soon.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
