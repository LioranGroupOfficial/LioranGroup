import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Valuation | Lioran Group",
  description:
    "Current valuation, total shares, per-share value, and founder equity distribution of Lioran Group.",
};

const valuationData = {
  totalValuation: 7_337,
  totalShares: 3_000_000,
  founders: [
    {
      name: "Swaraj Puppalwar",
      role: "Co-Founder & CTO",
      equity: 34,
    },
    {
      name: "Shreyash Raipure",
      role: "Co-Founder, CEO & CFO",
      equity: 33,
    },
    {
      name: "Pranay Kumeriya",
      role: "Co-Founder & COO",
      equity: 33,
    },
  ],
};

function formatINR(value: number): string {
  if (value >= 1e7) return `Rs ${(value / 1e7).toFixed(2)}C`;
  if (value >= 1e5) return `Rs ${(value / 1e5).toFixed(2)}L`;
  if (value >= 1e3) return `Rs ${(value / 1e3).toFixed(2)}K`;
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
          Internal reference view for current valuation, share count, and
          founder equity distribution.
        </p>
      </section>

      <table className="data-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Company Valuation</td>
            <td>{formatINR(valuationData.totalValuation)}</td>
          </tr>
          <tr>
            <td>Total Shares</td>
            <td>{valuationData.totalShares.toLocaleString()} shares</td>
          </tr>
          <tr>
            <td>Value per Share</td>
            <td>{formatINR(valuePerShare)}</td>
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
                <td>{founder.name}</td>
                <td>{founder.role}</td>
                <td>{founder.equity}%</td>
                <td>{sharesOwned.toLocaleString()}</td>
                <td>{formatINR(shareValue)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
