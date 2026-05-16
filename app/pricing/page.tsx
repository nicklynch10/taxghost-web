import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Free Tax Tools for DIY Investors",
  description:
    "TaxGhost is free while in beta. Use our wash sale checker, tax-loss harvesting calculator, and cost basis reconstructor at no cost.",
};

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Pricing</h1>
      <p className="text-zinc-600 mb-8">
        TaxGhost is free while in beta. Paid plans coming soon.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-zinc-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Free</h2>
          <p className="text-3xl font-bold mb-4">$0</p>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li>Wash sale checker</li>
            <li>TLH calculator</li>
            <li>Cost basis reconstructor</li>
            <li>All blog content and guides</li>
          </ul>
        </div>
        <div className="border border-zinc-200 rounded-lg p-6 opacity-60">
          <h2 className="text-xl font-semibold mb-2">Pro</h2>
          <p className="text-3xl font-bold mb-4">$29/mo</p>
          <p className="text-sm text-zinc-500 mb-4">Coming soon</p>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li>Everything in Free</li>
            <li>Multi-broker cost basis merger</li>
            <li>1099-B validator</li>
            <li>Priority support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
