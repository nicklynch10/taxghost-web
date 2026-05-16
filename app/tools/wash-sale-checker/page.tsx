import type { Metadata } from "next";
import WashSaleChecker from "./WashSaleChecker";
import AuthorCard from "@/components/AuthorCard";

export const metadata: Metadata = {
  title: "Free Wash Sale Checker — Avoid IRS Disallowed Losses",
  description:
    "Free wash sale checker tool. Enter your stock sale and repurchase details to instantly see if the IRS wash sale rule applies and how much loss you may lose.",
  keywords: [
    "wash sale rule",
    "wash sale calculator",
    "tax loss harvesting",
    "IRS wash sale",
    "substantially identical securities",
    "disallowed loss",
  ],
  openGraph: {
    title: "Free Wash Sale Checker — Avoid IRS Disallowed Losses",
    description:
      "Free wash sale checker tool. Enter your stock sale and repurchase details to instantly see if the IRS wash sale rule applies and how much loss you may lose.",
    type: "website",
    siteName: "TaxGhost",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Wash Sale Checker — Avoid IRS Disallowed Losses",
    description:
      "Free wash sale checker tool. Enter your stock sale and repurchase details to instantly see if the IRS wash sale rule applies and how much loss you may lose.",
  },
  alternates: {
    canonical: "https://taxghost.com/tools/wash-sale-checker",
  },
};

export default function WashSaleCheckerPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Free Wash Sale Checker</h1>
      <p className="text-lg text-zinc-600 mb-8">
        Enter your stock sale and repurchase details to see if the IRS wash sale rule
        applies to your transaction — and how much loss you could lose.
      </p>

      <div className="bg-white border rounded-lg p-6 shadow-sm mb-12">
        <WashSaleChecker />
      </div>

      <AuthorCard
        name="Nick Lynch"
        role="Founder, TaxGhost"
        bio="Built TaxGhost after getting burned by Fidelity's cost basis during a broker transfer. Not a CPA, but reads a lot of IRS publications."
      />
      <p className="text-sm text-zinc-500 mt-3">Last verified: May 15, 2026</p>

      <article className="prose prose-zinc max-w-none mt-12">
        <h2>What Is the Wash Sale Rule?</h2>
        <p>
          The wash sale rule is an IRS regulation designed to prevent investors
          from claiming artificial tax losses. Under IRC Section 1091, if you
          sell a security at a loss and buy the same or a "substantially
          identical" security within 30 days before or after the sale, the loss
          is disallowed for tax purposes. This 61-day window (30 days on either
          side of the sale date) is what makes tax-loss harvesting tricky for
          DIY investors.
        </p>
        <p>
          The rule exists because without it, investors could sell a stock to
          claim a loss, immediately repurchase it, and maintain the exact same
          portfolio position while reducing their tax bill. The IRS closed this
          loophole decades ago, but many investors still accidentally trigger
          wash sales — especially those who use automated investing, dividend
          reinvestment, or multiple brokerage accounts.
        </p>

        <h2>How the 30-Day Window Works</h2>
        <p>
          The wash sale window is not just 30 days after your sale. It is a
          61-day period that includes:
        </p>
        <ul>
          <li>30 days before the sale date</li>
          <li>The sale date itself</li>
          <li>30 days after the sale date</li>
        </ul>
        <p>
          This means if you sell VTI at a loss on June 1, you cannot buy VTI (or
          a substantially identical ETF) between May 2 and July 1 without
          triggering a wash sale. Many investors mistakenly believe they only
          need to wait 30 days after selling, but the pre-sale lookback period
          catches those who accumulate shares right before a planned loss sale.
        </p>
        <p>
          The timing rule applies across all your accounts — including IRAs,
          401(k)s, and taxable brokerage accounts at different firms. The IRS
          does not care which account holds the repurchase. If you sell in your
          taxable account and your spouse buys the same security in their IRA,
          it is still a wash sale.
        </p>

        <h2>What Counts as "Substantially Identical"?</h2>
        <p>
          The IRS deliberately leaves this term vague. Substantially identical
          securities are not limited to the exact same ticker. Here is what
          generally triggers the rule:
        </p>
        <ul>
          <li>
            The same stock or ETF (e.g., selling VTI and repurchasing VTI)
          </li>
          <li>
            Different share classes of the same company (e.g., GOOG and GOOGL)
          </li>
          <li>
            ETFs that track the exact same index with near-identical holdings
            (e.g., VOO and SPY both track the S&P 500)
          </li>
        </ul>
        <p>What generally does NOT trigger a wash sale:</p>
        <ul>
          <li>
            Different ETFs tracking different indices (e.g., VTI total market
            vs. VOO S&P 500)
          </li>
          <li>
            ETFs vs. mutual funds with different structures, even if tracking
            similar indices
          </li>
          <li>
            Stocks of different companies in the same sector
          </li>
        </ul>
        <p>
          The gray area — and where robo-advisors often play — is between ETFs
          that track similar but not identical indices. For example, switching
          from a total U.S. market ETF to a large-cap ETF may or may not be
          considered substantially identical depending on holdings overlap. When
          in doubt, consult a tax professional.
        </p>

        <h2>How to Avoid Wash Sales</h2>
        <p>
          Tax-loss harvesting requires selling at a loss and replacing your
          exposure with something different enough to avoid the wash sale rule,
          but similar enough to maintain your desired asset allocation. Here are
          the most common strategies:
        </p>
        <ol>
          <li>
            <strong>Use a replacement ETF in a different asset class.</strong>{" "}
            Sell a U.S. total market ETF and buy a developed markets ETF for 31
            days, then switch back. This maintains equity exposure while
            avoiding substantial identity.
          </li>
          <li>
            <strong>Switch between factor ETFs.</strong> Replace a broad market
            ETF with a value or quality factor ETF targeting the same geography.
            The holdings overlap is usually low enough to avoid the rule.
          </li>
          <li>
            <strong>Temporarily hold cash or bonds.</strong> The safest (but
            most conservative) approach is to park proceeds in a money market
            fund or short-term treasury ETF for 31 days. You miss any market
            rally but completely eliminate wash sale risk.
          </li>
          <li>
            <strong>Track wash sale windows across all accounts.</strong>{" "}
            Disable dividend reinvestment and automatic purchases for the
            security you sold. A single $50 dividend reinvestment can wreck a
            $5,000 loss harvest.
          </li>
        </ol>
        <p>
          TaxGhost's upcoming tax-loss harvesting engine will automate this
          tracking across all your accounts, flag wash sale risks before you
          trade, and suggest pre-vetted replacement securities that maintain
          your allocation without triggering the rule. Sign up for early access
          to be notified when it launches.
        </p>
      </article>

      <div className="mt-12">
        <AuthorCard
          name="Nick Lynch"
          role="Founder, TaxGhost"
          bio="Built TaxGhost after getting burned by Fidelity's cost basis during a broker transfer. Not a CPA, but reads a lot of IRS publications."
        />
        <p className="text-sm text-zinc-500 mt-4">
          Last verified: May 15, 2026
        </p>
      </div>
    </div>
  );
}
