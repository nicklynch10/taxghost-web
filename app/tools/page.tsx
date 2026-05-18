import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Tools — Wash Sale Checker & Tax Calculators",
  description:
    "Free interactive tax tools for DIY investors. Check wash sale rules, calculate tax-loss harvesting savings, and optimize your portfolio taxes.",
};

export default function ToolsIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Free Tools</h1>
      <p className="text-zinc-600 mb-8">
        Interactive calculators and checkers for DIY investors.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/tools/1099-da-basis-fixer/"
          className="border border-zinc-200 rounded-lg p-6 hover:border-zinc-400 transition-colors"
        >
          <h2 className="font-semibold mb-2">1099-DA Cost Basis Fixer</h2>
          <p className="text-sm text-zinc-600">
            Fix missing or incorrect cost basis on Form 1099-DA. Calculate the
            correct crypto gain/loss and get the right Form 8949 adjustment code.
          </p>
        </Link>
        <Link
          href="/tools/wash-sale-checker/"
          className="border border-zinc-200 rounded-lg p-6 hover:border-zinc-400 transition-colors"
        >
          <h2 className="font-semibold mb-2">Wash Sale Checker</h2>
          <p className="text-sm text-zinc-600">
            Check if your stock sale triggers the IRS wash sale rule and
            calculate your disallowed loss.
          </p>
        </Link>
      </div>
    </div>
  );
}
