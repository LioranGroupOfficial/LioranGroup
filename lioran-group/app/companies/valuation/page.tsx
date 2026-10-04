import type { Metadata } from "next";
import { Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Company Valuation | Lioran Group",
  description:
    "Pre-revenue valuation, total shares, per-share value, and founder equity distribution of Lioran Group.",
};

const valuationData = {
  totalValuation: 3_000_000,
  valuationStage: "Pre-Revenue",
  totalShares: 3_000_000,
  founders: [
    {
      name: "Swaraj Puppalwar",
      role: "Founder & CTO",
      equity: 100,
    },
  ],
};

function formatINR(value: number): string {
  if (value >= 1e7) return `Rs ${(value / 1e7).toFixed(2)} Cr`;
  if (value >= 1e5) return `Rs ${(value / 1e5).toFixed(2)} Lakh`;
  if (value >= 1e3) return `Rs ${(value / 1e3).toFixed(2)} K`;
  return `Rs ${value.toFixed(2)}`;
}

export default function ValuationPage() {
  const valuePerShare =
    valuationData.totalValuation / valuationData.totalShares;

  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Valuation</span>
        <h1>Company valuation snapshot</h1>
        <p>
          Internal reference view for pre-revenue valuation, share count, and
          founder equity distribution.
        </p>
      </section>

      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Metric</th>
            <th style={{ width: "50%" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Company Valuation</td>
            <td className="font-semibold text-[var(--ink)]">
              {formatINR(valuationData.totalValuation)} (Pre-Revenue)
            </td>
          </tr>
          <tr>
            <td>Valuation Stage</td>
            <td>{valuationData.valuationStage}</td>
          </tr>
          <tr>
            <td>Total Shares</td>
            <td className="font-mono">{valuationData.totalShares.toLocaleString()} shares</td>
          </tr>
          <tr>
            <td>Value per Share</td>
            <td className="font-mono">{formatINR(valuePerShare)}</td>
          </tr>
        </tbody>
      </table>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Equity</th>
            <th>Shares</th>
            <th>Share Value</th>
          </tr>
        </thead>
        <tbody>
          {valuationData.founders.map((founder) => {
            const sharesOwned =
              (valuationData.totalShares * founder.equity) / 100;
            const shareValue =
              (valuationData.totalValuation * founder.equity) / 100;

            return (
              <tr key={founder.name}>
                <td className="font-semibold text-[var(--ink)]">{founder.name}</td>
                <td>{founder.role}</td>
                <td className="font-mono">{founder.equity}%</td>
                <td className="font-mono">{sharesOwned.toLocaleString()}</td>
                <td className="font-mono text-[var(--ink)]">{formatINR(shareValue)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <aside className="card p-6 border border-[var(--hairline-strong)] bg-[var(--surface-strong)]">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[var(--ink)] flex-shrink-0" />
          <span className="caption-uppercase text-[var(--ink)] font-semibold">
            Valuation Disclaimer
          </span>
        </div>
        <p className="card-copy text-sm leading-relaxed text-[var(--body)] pt-1">
          ₹30 lakh represents an internal, non-independent estimate based primarily on
          developed technology, intellectual property, digital assets, and current product
          maturity. Lioran Group is presently pre-revenue and pre-traction. This estimate does
          not represent a financing transaction, independent valuation, fair market value, or
          guaranteed sale price.
        </p>
      </aside>
    </div>
  );
}
