const entries = [
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
            <th>Date</th>
            <th>Area</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([date, area, change]) => (
            <tr key={`${date}-${area}`}>
              <td>{date}</td>
              <td>{area}</td>
              <td>{change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
