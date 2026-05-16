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

function daysBetween(a: string, b: string): number {
  const d1 = new Date(a + "T00:00:00");
  const d2 = new Date(b + "T00:00:00");
  const ms = d2.getTime() - d1.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export default function WashSaleChecker() {
  const [originalSymbol, setOriginalSymbol] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [costBasis, setCostBasis] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [repurchaseSymbol, setRepurchaseSymbol] = useState("");
  const [repurchaseDate, setRepurchaseDate] = useState("");
  const [repurchasePrice, setRepurchasePrice] = useState("");

  const result = useMemo(() => {
    if (
      !originalSymbol ||
      !saleDate ||
      !costBasis ||
      !salePrice ||
      !repurchaseDate ||
      !repurchaseSymbol
    ) {
      return null;
    }

    const cb = parseCurrency(costBasis);
    const sp = parseCurrency(salePrice);
    const loss = cb - sp;
    if (loss <= 0) {
      return {
        isWashSale: false,
        reason: "No loss was realized on the original sale.",
        note: "The wash sale rule only applies to sales at a loss.",
      } as const;
    }

    const days = daysBetween(saleDate, repurchaseDate);
    const withinWindow = days >= -30 && days <= 30;
    const sameSymbol =
      originalSymbol.trim().toUpperCase() ===
      repurchaseSymbol.trim().toUpperCase();

    if (withinWindow && sameSymbol) {
      const disallowedLoss = loss;
      const adjustedBasis = parseCurrency(repurchasePrice) + disallowedLoss;
      return {
        isWashSale: true,
        disallowedLoss,
        adjustedBasis,
        reason: `Repurchase of ${repurchaseSymbol.toUpperCase()} occurred ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} ${days < 0 ? "before" : "after"} the sale, and the securities are substantially identical.`,
        note: "The disallowed loss is added to the cost basis of the repurchased shares.",
      } as const;
    }

    if (!withinWindow) {
      return {
        isWashSale: false,
        reason: `Repurchase occurred ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} ${days < 0 ? "before" : "after"} the sale, outside the 30-day window.`,
        note: "The wash sale rule requires repurchase within 30 days before or after the sale.",
      } as const;
    }

    return {
      isWashSale: false,
      reason: `Repurchase was of a different security (${repurchaseSymbol.toUpperCase()} vs ${originalSymbol.toUpperCase()}).`,
      note: "For this checker, different symbols are treated as not substantially identical. In practice, consult a tax professional for close substitutes.",
    } as const;
  }, [
    originalSymbol,
    saleDate,
    costBasis,
    salePrice,
    repurchaseSymbol,
    repurchaseDate,
    repurchasePrice,
  ]);

  const inputClass =
    "w-full border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent";
  const labelClass = "block text-sm font-medium text-zinc-700 mb-1";

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">
            Original Sale
          </h3>
          <div>
            <label className={labelClass}>Security Symbol</label>
            <input
              type="text"
              value={originalSymbol}
              onChange={(e) => setOriginalSymbol(e.target.value)}
              placeholder="e.g. VTI"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Sale Date</label>
            <input
              type="date"
              value={saleDate}
              onChange={(e) => setSaleDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Cost Basis (per share)</label>
            <input
              type="text"
              value={costBasis}
              onChange={(e) => setCostBasis(e.target.value)}
              placeholder="$100.00"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Sale Price (per share)</label>
            <input
              type="text"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              placeholder="$80.00"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">
            Repurchase
          </h3>
          <div>
            <label className={labelClass}>Security Symbol</label>
            <input
              type="text"
              value={repurchaseSymbol}
              onChange={(e) => setRepurchaseSymbol(e.target.value)}
              placeholder="e.g. VTI"
              className={inputClass}
            />
            <p className="text-xs text-zinc-500 mt-1">
              Defaults to same as original. Change to test different securities.
            </p>
          </div>
          <div>
            <label className={labelClass}>Repurchase Date</label>
            <input
              type="date"
              value={repurchaseDate}
              onChange={(e) => setRepurchaseDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Repurchase Price (per share)</label>
            <input
              type="text"
              value={repurchasePrice}
              onChange={(e) => setRepurchasePrice(e.target.value)}
              placeholder="$85.00"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {result && (
        <div
          className={`rounded-lg p-4 ${
            result.isWashSale
              ? "bg-red-50 border border-red-200"
              : "bg-green-50 border border-green-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">
              {result.isWashSale ? "⚠️" : "✅"}
            </span>
            <div>
              <p
                className={`font-semibold ${
                  result.isWashSale ? "text-red-900" : "text-green-900"
                }`}
              >
                {result.isWashSale
                  ? "Wash Sale Detected"
                  : "No Wash Sale Detected"}
              </p>
              <p className="text-sm text-zinc-700 mt-1">{result.reason}</p>
              {result.isWashSale && (
                <div className="mt-3 space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Disallowed Loss:</span>{" "}
                    {formatCurrency(result.disallowedLoss)}
                  </p>
                  <p>
                    <span className="font-medium">Adjusted Cost Basis:</span>{" "}
                    {formatCurrency(result.adjustedBasis)}
                  </p>
                </div>
              )}
              <p className="text-xs text-zinc-500 mt-2">{result.note}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
