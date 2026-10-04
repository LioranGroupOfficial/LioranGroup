const entries = [
  ["2026-10-01", "Product Launch", "Lioran Bastion (Lioran S3) launched in v1 Pre-Alpha on liorans3.sbs with docs.liorans3.sbs, Rust engine, RocksDB metadata, signed URLs, and FFmpeg media processing. Next Alpha scheduled for 2026-10-29."],
  ["2026-07-16", "Brand system", "Unified the public site under the Lioran design system and removed retired product references."],
  ["2026-07-16", "Product catalog", "Added LDS and LioranDB as the primary public ecosystem entries."],
  ["2026-07-16", "Community", "Updated the Discord community link across the site."],
];

export default function ChangelogPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Changelog</span>
        <h1>Public product and site changes</h1>
        <p>
          The changelog keeps modifications concrete. Dates use exact calendar
          values and entries describe what actually changed.
        </p>
      </section>

      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: "18%" }}>Date</th>
            <th style={{ width: "22%" }}>Area</th>
            <th style={{ width: "60%" }}>Change</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([date, area, change]) => (
            <tr key={`${date}-${area}`}>
              <td className="font-mono text-xs">{date}</td>
              <td className="font-medium text-[var(--ink)]">{area}</td>
              <td>{change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
