import type { Metadata } from "next";
import CostBasisFixer from "./CostBasisFixer";
import AuthorCard from "@/components/AuthorCard";

export const metadata: Metadata = {
  title: "Free 1099-DA Cost Basis Fixer — Correct Missing Crypto Basis",
  description:
    "Free tool to fix missing or incorrect cost basis on Form 1099-DA. Enter your proceeds and actual cost basis to calculate the correct gain/loss and get the right Form 8949 adjustment code.",
  keywords: [
    "1099-DA",
    "crypto taxes",
    "cost basis",
    "Form 8949",
    "IRS crypto",
    "CP2000",
    "crypto cost basis calculator",
  ],
  openGraph: {
    title: "Free 1099-DA Cost Basis Fixer — Correct Missing Crypto Basis",
    description:
      "Free tool to fix missing or incorrect cost basis on Form 1099-DA. Enter your proceeds and actual cost basis to calculate the correct gain/loss and get the right Form 8949 adjustment code.",
    type: "website",
    siteName: "TaxGhost",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free 1099-DA Cost Basis Fixer — Correct Missing Crypto Basis",
    description:
      "Free tool to fix missing or incorrect cost basis on Form 1099-DA. Enter your proceeds and actual cost basis to calculate the correct gain/loss and get the right Form 8949 adjustment code.",
  },
  alternates: {
    canonical: "https://taxghost.com/tools/1099-da-basis-fixer",
  },
};

export default function CostBasisFixerPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Free 1099-DA Cost Basis Fixer</h1>
      <p className="text-lg text-zinc-600 mb-8">
        Brokers sent 1099-DA forms with $0 cost basis. Enter your actual numbers to see the
        correct gain or loss and get the right Form 8949 adjustment code.
      </p>

      <div className="bg-white border rounded-lg p-6 shadow-sm mb-12">
        <CostBasisFixer />
      </div>

      <AuthorCard
        name="Nick Milton"
        role="Founder, TaxGhost"
        bio="Built TaxGhost after getting burned by Fidelity's cost basis during a broker transfer. Not a CPA, but reads a lot of IRS publications."
      />
      <p className="text-sm text-zinc-500 mt-3">Last verified: May 16, 2026</p>

      <article className="prose prose-zinc max-w-none mt-12">
        <h2>What Is Form 1099-DA and Why Is Cost Basis Missing?</h2>
        <p>
          Form 1099-DA is the new IRS information return for digital asset transactions.
          Starting with the 2025 tax year, crypto brokers — including Coinbase, Kraken,
          Robinhood Crypto, and others — are required to report sales of cryptocurrency
          and other digital assets to both you and the IRS. This form is analogous to
          Form 1099-B for stocks, but it is brand new, and the reporting rules are being
          phased in gradually.
        </p>
        <p>
          The biggest problem investors faced this tax season: Box 1e, "Cost or Other Basis,"
          was often blank or showed $0. This is not a mistake by your broker in the
          traditional sense. Under IRS transitional rules, brokers were not required to
          report cost basis for digital assets sold in 2025 if those assets were acquired
          before the broker's cost basis tracking obligation began. For many investors,
          this means the 1099-DA shows the full proceeds as a taxable gain — even if you
          actually broke even or lost money.
        </p>
        <p>
          If you do nothing, the IRS automated matching system (CP2000) will compare your
          tax return against the 1099-DA data and notice that you did not report the full
          proceeds as income. Even if you did report the sale, if your reported basis does
          not match the $0 shown on the 1099-DA, the IRS may assume you underreported your
          income. Millions of crypto investors are expected to receive CP2000 notices in
          2026 because of this mismatch.
        </p>

        <h2>Why Brokers Report $0 Basis</h2>
        <p>
          The IRS issued final regulations on broker reporting for digital assets in 2024,
          with staggered effective dates. Brokers must report proceeds starting with 2025
          sales, but cost basis reporting has a delayed implementation timeline. Here is
          why your basis might be missing or incorrect:
        </p>
        <ul>
          <li>
            <strong>Pre-2026 acquisitions:</strong> Assets bought before January 1, 2026,
            may not have basis reported because the broker was not yet required to track it.
          </li>
          <li>
            <strong>Transfers between wallets or exchanges:</strong> If you moved crypto
            from a non-reporting wallet to a reporting exchange, the exchange may not know
            your original purchase price.
          </li>
          <li>
            <strong>Gifts or airdrops:</strong> Assets received as gifts or airdrops have
            special basis rules that brokers may not have correctly implemented.
          </li>
          <li>
            <strong>Software limitations:</strong> Some brokers are still building out their
            1099-DA generation systems and may default to $0 when they cannot determine basis.
          </li>
        </ul>
        <p>
          The key point: a $0 basis on your 1099-DA does not mean your actual basis is $0.
          It means the broker did not report it. You are still required to report your
          actual basis on your tax return.
        </p>

        <h2>How to Calculate Your Actual Cost Basis</h2>
        <p>
          Your cost basis is generally what you paid to acquire the asset, including
          transaction fees, minus any return of capital or plus any reinvested dividends
          (though dividends are rare for crypto). For digital assets, you need to track:
        </p>
        <ol>
          <li>
            <strong>Purchase records:</strong> Exchange trade confirmations, bank statements
            showing wire transfers, or credit card receipts for crypto purchases. The date,
            amount, and price per unit are what matter.
          </li>
          <li>
            <strong>Transaction fees:</strong> Mining fees (gas), exchange trading fees, and
            transfer fees can all be added to your basis. Keep records of these.
          </li>
          <li>
            <strong>Gifts and inheritances:</strong> If you received crypto as a gift, your
            basis is generally the same as the donor's basis (carryover basis). If you
            inherited it, your basis is the fair market value on the date of death
            (stepped-up basis).
          </li>
          <li>
            <strong>Mining and staking rewards:</strong> Mined or staked crypto is taxed as
            ordinary income at fair market value on the date received. That value becomes
            your basis for future sales.
          </li>
          <li>
            <strong>Airdrops and hard forks:</strong> These are also ordinary income at fair
            market value when received, and that value is your basis.
          </li>
        </ol>
        <p>
          If you do not have perfect records, reconstruct your basis from exchange history
          exports (CSV files), blockchain explorers (for on-chain transactions), and bank
          statements. The IRS accepts reasonable estimates supported by the best available
          evidence, but precise records are always better.
        </p>

        <h2>How to Report on Form 8949 and Schedule D</h2>
        <p>
          When your 1099-DA shows $0 or incorrect basis, you cannot simply copy the numbers
          onto your tax return. You must use Form 8949 to report the sale with the correct
          basis and an adjustment code explaining the difference. Here is how:
        </p>
        <ol>
          <li>
            <strong>Enter the sale on Form 8949:</strong> List the description of the property
            (e.g., "1.5 BTC"), dates acquired and sold, proceeds (from 1099-DA Box 1d), and
            your actual cost basis.
          </li>
          <li>
            <strong>Calculate the adjustment:</strong> In column (g), enter the difference
            between your actual basis and the reported basis. If the 1099-DA shows $0 basis
            and your actual basis is $8,000, enter $8,000 in column (g).
          </li>
          <li>
            <strong>Use the correct adjustment code:</strong> In column (f), enter Code B if
            the broker did not report basis to the IRS. Enter Code T if the broker reported
            an incorrect basis. For most 2025 1099-DA forms with $0 basis, Code B is correct.
          </li>
          <li>
            <strong>Transfer to Schedule D:</strong> The totals from Form 8949 flow to
            Schedule D, which calculates your net capital gain or loss.
          </li>
        </ol>
        <p>
          If you have many transactions, tax software like TurboTax, H&R Block, or FreeTaxUSA
          can import 1099-DA data and let you adjust basis transaction by transaction. For
          complex histories, a CPA or enrolled agent is worth the cost.
        </p>

        <h2>What Is a CP2000 Notice and How to Respond</h2>
        <p>
          A CP2000 is an IRS notice proposing changes to your tax return based on information
          reported by third parties (like your broker). It is not a bill, but it can become
          one if you ignore it. If you filed your return using the $0 basis from your 1099-DA,
          or if the IRS cannot match your reported basis to the 1099-DA data, you may receive
          a CP2000 proposing additional tax, interest, and penalties.
        </p>
        <p>
          Here is what a typical crypto-related CP2000 looks like:
        </p>
        <ul>
          <li>
            <strong>Proposed tax due:</strong> The IRS assumes your gain is the full proceeds
            amount (since basis was $0), which can be thousands of dollars more than you
            actually owe.
          </li>
          <li>
            <strong>Interest:</strong> Accrues from the original filing deadline until paid.
          </li>
          <li>
            <strong>Accuracy-related penalty:</strong> Up to 20% of the underpayment if the
            IRS believes you substantially understated your income.
          </li>
        </ul>
        <p>
          To respond, you have three options:
        </p>
        <ol>
          <li>
            <strong>Agree:</strong> If the IRS is correct, sign and return the response form
            with payment.
          </li>
          <li>
            <strong>Partially agree:</strong> If some of the proposed changes are correct and
            some are not, explain which ones you disagree with and provide documentation.
          </li>
          <li>
            <strong>Disagree:</strong> If the IRS is wrong — for example, because your actual
            basis was not $0 — submit a signed statement explaining the discrepancy and attach
            copies of your purchase records, exchange statements, or other evidence of your
            actual cost basis.
          </li>
        </ol>
        <p>
          The most important thing: respond by the deadline on the notice, usually 30 days.
          Ignoring a CP2000 leads to a statutory notice of deficiency, which is much harder
          to reverse. Keep copies of everything you send.
        </p>

        <h2>IRS Final Regulations: What Changes in 2026</h2>
        <p>
          The IRS issued final regulations on digital asset broker reporting in December 2024.
          Here is what changes going forward:
        </p>
        <ul>
          <li>
            <strong>Full basis reporting starts January 1, 2026:</strong> Brokers must report
            both proceeds and cost basis for digital assets acquired on or after this date.
            This should eliminate the $0 basis problem for future purchases.
          </li>
          <li>
            <strong>Expanded broker definition:</strong> The regulations clarify that certain
            decentralized finance (DeFi) frontends and crypto ATMs may qualify as brokers,
            though implementation is still being litigated.
          </li>
          <li>
            <strong>Stablecoin reporting:</strong> Sales of stablecoins are reportable events,
            even if the gain or loss is minimal. Many investors do not realize that converting
            USDC to USD is a taxable sale.
          </li>
          <li>
            <strong>Form 1099-DA format updates:</strong> The IRS may revise the form layout
            for the 2026 tax year based on feedback from the 2025 filing season.
          </li>
        </ul>
        <p>
          For 2025 sales, you are still on the hook for reconstructing your own basis. Do not
          wait for brokers to fix this retroactively. The IRS expects you to keep your own
          records and report accurately regardless of what the 1099-DA says.
        </p>

        <h2>Bottom Line</h2>
        <p>
          The 1099-DA cost basis problem is real, it affects millions of investors, and it is
          not going away until 2026 at the earliest. If your 1099-DA shows $0 basis, you need
          to calculate your actual basis, file Form 8949 with the correct adjustment code, and
          keep records in case the IRS sends a CP2000. Use the calculator above to check your
          numbers, and consult a tax professional if your situation is complex.
        </p>
      </article>

      <div className="mt-12">
        <AuthorCard
          name="Nick Milton"
          role="Founder, TaxGhost"
          bio="Built TaxGhost after getting burned by Fidelity's cost basis during a broker transfer. Not a CPA, but reads a lot of IRS publications."
        />
        <p className="text-sm text-zinc-500 mt-4">
          Last verified: May 16, 2026
        </p>
      </div>
    </div>
  );
}
