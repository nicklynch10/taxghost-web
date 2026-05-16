import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TaxGhost",
  "url": "https://taxghost.com",
  "logo": "https://taxghost.com/logo.png",
  "description": "Tax-loss harvesting and portfolio tax optimization for DIY investors",
  "sameAs": [
    "https://twitter.com/taxghost",
    "https://linkedin.com/company/taxghost",
  ],
};

export const metadata: Metadata = {
  title: {
    template: "%s | TaxGhost",
    default: "TaxGhost — Tax-Loss Harvesting for DIY Investors",
  },
  description:
    "Reconstruct tax lots, find harvesting opportunities, and optimize your portfolio taxes without giving up control.",
  openGraph: {
    type: "website",
    siteName: "TaxGhost",
    title: "TaxGhost — Tax-Loss Harvesting for DIY Investors",
    description:
      "Reconstruct tax lots, find harvesting opportunities, and optimize your portfolio taxes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="bg-white text-zinc-900 antialiased font-sans">
        <header className="border-b border-zinc-200">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <a
              href="/"
              className="text-xl font-bold tracking-tight text-zinc-900"
            >
              TaxGhost
            </a>
            <nav className="flex gap-6 text-sm">
              <a href="/blog" className="hover:text-zinc-600">
                Blog
              </a>
              <a href="/guides" className="hover:text-zinc-600">
                Guides
              </a>
              <a href="/tools" className="hover:text-zinc-600">
                Tools
              </a>
              <a href="/pricing" className="hover:text-zinc-600">
                Pricing
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-zinc-200 mt-20">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-zinc-500">
            <p>TaxGhost — Tax optimization for DIY investors.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
