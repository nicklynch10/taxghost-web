"use client";

import { useState, useMemo } from "react";

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
}

function parseCurrency(val: string): number {
  const cleaned = val.replace(/[$,]/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

function daysBetween(a: string, b: string): number | null {
  if (!a || !b) return null;
  const d1 = new Date(a + "T00:00:00");
  const d2 = new Date(b + "T00:00:00");
  const ms = d2.getTime() - d1.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

function holdingPeriodLabel(days: number | null): string {
  if (days === null) return "—";
  if (days < 0) return "Invalid (sold before acquired)";
  if (days > 365) return "Long-term (> 1 year)";
  return "Short-term (≤ 1 year)";
}

export default function CostBasisFixer() {
  const [proceeds, setProceeds] = useState("");
  const [reportedBasis, setReportedBasis] = useState("0");
  const [actualBasis, setActualBasis] = useState("");
  const [dateAcquired, setDateAcquired] = useState("");
  const [dateSold, setDateSold] = useState("");
  const [manualHoldingPeriod, setManualHoldingPeriod] = useState<"auto" | "short" | "long">("auto");

  const daysHeld = useMemo(() => daysBetween(dateAcquired, dateSold), [dateAcquired, dateSold]);

  const computedHoldingPeriod = useMemo(() => {
    if (manualHoldingPeriod !== "auto") {
      return manualHoldingPeriod === "long" ? "Long-term (> 1 year)" : "Short-term (≤ 1 year)";
    }
    return holdingPeriodLabel(daysHeld);
  }, [manualHoldingPeriod, daysHeld]);

  const isLongTerm = useMemo(() => {
    if (manualHoldingPeriod !== "auto") return manualHoldingPeriod === "long";
    if (daysHeld === null) return false;
    return daysHeld > 365;
  }, [manualHoldingPeriod, daysHeld]);

  const result = useMemo(() => {
    const p = parseCurrency(proceeds);
    const rb = parseCurrency(reportedBasis);
    const ab = parseCurrency(actualBasis);

    if (p === 0 && ab === 0) return null;
    if (ab === 0 && actualBasis.trim() === "") return null;

    const correctedGainLoss = p - ab;
    const reportedGainLoss = p - rb;
    const discrepancy = correctedGainLoss - reportedGainLoss;

    const adjustmentCode = rb === 0 ? "B" : "T";
    const adjustmentCodeReason =
      adjustmentCode === "B"
        ? "Basis was not reported to the IRS on Form 1099-DA. Use Code B on Form 8949."
        : "Form 1099-DA reported an incorrect basis. Use Code T on Form 8949.";

    return {
      correctedGainLoss,
      reportedGainLoss,
      discrepancy,
      adjustmentCode,
      adjustmentCodeReason,
      isGain: correctedGainLoss >= 0,
    } as const;
  }, [proceeds, reportedBasis, actualBasis]);

  const summaryText = useMemo(() => {
    if (!result) return "";
    const lines = [
      "=== 1099-DA Cost Basis Correction Summary ===",
      "",
      `Proceeds (Box 1d):          ${formatCurrency(parseCurrency(proceeds))}`,
      `Reported Cost Basis (Box 1e): ${formatCurrency(parseCurrency(reportedBasis))}`,
      `Actual Cost Basis:            ${formatCurrency(parseCurrency(actualBasis))}`,
      `Date Acquired:                ${dateAcquired || "—"}`,
      `Date Sold:                    ${dateSold || "—"}`,
      `Holding Period:               ${computedHoldingPeriod}`,
      "",
      `Reported Gain/Loss:           ${formatCurrency(result.reportedGainLoss)}`,
      `Corrected Gain/Loss:          ${formatCurrency(result.correctedGainLoss)}`,
      `Discrepancy:                  ${formatCurrency(result.discrepancy)}`,
      `Form 8949 Adjustment Code:    ${result.adjustmentCode}`,
      "",
      "This tool is for educational purposes only. Consult a tax professional for your specific situation.",
    ];
    return lines.join("\n");
  }, [result, proceeds, reportedBasis, actualBasis, dateAcquired, dateSold, computedHoldingPeriod]);

  const inputClass =
    "w-full border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent";
  const labelClass = "block text-sm font-medium text-zinc-700 mb-1";

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">
            From Your 1099-DA
          </h3>
          <div>
            <label className={labelClass}>Proceeds (Box 1d)</label>
            <input
              type="text"
              value={proceeds}
              onChange={(e) => setProceeds(e.target.value)}
              placeholder="$10,000.00"
              className={inputClass}
            />
            <p className="text-xs text-zinc-500 mt-1">The sale amount reported by your broker.</p>
          </div>
          <div>
            <label className={labelClass}>Reported Cost Basis (Box 1e)</label>
            <input
              type="text"
              value={reportedBasis}
              onChange={(e) => setReportedBasis(e.target.value)}
              placeholder="$0.00"
              className={inputClass}
            />
            <p className="text-xs text-zinc-500 mt-1">
              Often $0 or blank for 2025 sales. Brokers were not required to report basis yet.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">
            Your Actual Records
          </h3>
          <div>
            <label className={labelClass}>Actual Cost Basis</label>
            <input
              type="text"
              value={actualBasis}
              onChange={(e) => setActualBasis(e.target.value)}
              placeholder="$8,500.00"
              className={inputClass}
            />
            <p className="text-xs text-zinc-500 mt-1">
              What you actually paid, including fees. Check your purchase confirmations.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Date Acquired</label>
              <input
                type="date"
                value={dateAcquired}
                onChange={(e) => setDateAcquired(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Date Sold</label>
              <input
                type="date"
                value={dateSold}
                onChange={(e) => setDateSold(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Holding Period</label>
            <select
              value={manualHoldingPeriod}
              onChange={(e) => setManualHoldingPeriod(e.target.value as "auto" | "short" | "long")}
              className={inputClass}
            >
              <option value="auto">Auto ({computedHoldingPeriod})</option>
              <option value="short">Short-term (≤ 1 year)</option>
              <option value="long">Long-term (&gt; 1 year)</option>
            </select>
            <p className="text-xs text-zinc-500 mt-1">
              {daysHeld !== null && daysHeld >= 0
                ? `Auto-detected: ${daysHeld} day${daysHeld === 1 ? "" : "s"} held`
                : "Enter dates to auto-detect, or select manually."}
            </p>
          </div>
        </div>
      </div>

      {result && (
        <div
          className={`rounded-lg p-4 border ${
            result.isGain
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">{result.isGain ? "📈" : "📉"}</span>
            <div className="flex-1">
              <p
                className={`font-semibold ${
                  result.isGain ? "text-green-900" : "text-red-900"
                }`}
              >
                Corrected {result.isGain ? "Gain" : "Loss"}: {formatCurrency(Math.abs(result.correctedGainLoss))}
              </p>
              <p className="text-sm text-zinc-700 mt-1">
                Your broker reported a {result.reportedGainLoss >= 0 ? "gain" : "loss"} of{" "}
                {formatCurrency(Math.abs(result.reportedGainLoss))}. With your actual cost basis, the
                correct figure is a {result.correctedGainLoss >= 0 ? "gain" : "loss"} of{" "}
                {formatCurrency(Math.abs(result.correctedGainLoss))}.
              </p>
              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <span className="font-medium">Discrepancy:</span>{" "}
                  <span className={result.discrepancy > 0 ? "text-green-700" : result.discrepancy < 0 ? "text-red-700" : ""}>
                    {formatCurrency(result.discrepancy)}
                  </span>
                  <span className="text-zinc-500 text-xs ml-2">
                    ({result.discrepancy > 0 ? "overstated gain / understated loss" : result.discrepancy < 0 ? "understated gain / overstated loss" : "no difference"})
                  </span>
                </p>
                <p>
                  <span className="font-medium">Form 8949 Adjustment Code:</span>{" "}
                  <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-sm font-mono">
                    {result.adjustmentCode}
                  </code>
                </p>
                <p className="text-xs text-zinc-600">{result.adjustmentCodeReason}</p>
                <p className="text-xs text-zinc-600 mt-1">
                  Holding period: {computedHoldingPeriod} — reported on{" "}
                  {isLongTerm ? "Schedule D, Line 8 (long-term)" : "Schedule D, Line 1 (short-term)"}.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="border border-zinc-200 rounded-lg p-4 bg-zinc-50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-zinc-900">Copy for Your Tax Prep</h4>
            <button
              onClick={() => {
                navigator.clipboard.writeText(summaryText);
              }}
              className="text-sm text-zinc-700 hover:text-zinc-900 underline"
            >
              Copy to Clipboard
            </button>
          </div>
          <pre className="text-xs text-zinc-700 bg-white border border-zinc-200 rounded-md p-3 overflow-x-auto whitespace-pre-wrap">
            {summaryText}
          </pre>
        </div>
      )}

      <p className="text-xs text-zinc-500">
        This tool is for educational purposes only. Consult a tax professional for your specific situation.
      </p>
    </div>
  );
}
