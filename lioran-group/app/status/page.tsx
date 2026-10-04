const services = [
  ["lioran.group", "Operational", "Public group website and ecosystem index."],
  ["liorans3.sbs", "Operational", "Lioran S3 (Bastion) v1 Pre-Alpha object storage surface."],
  ["docs.liorans3.sbs", "Operational", "Official documentation and developer guides for Lioran S3."],
  ["liorandb.com", "Planned", "Public product domain for LioranDB."],
  ["lioransolutions.com", "Planned", "LDS domain and public engineering surface."],
];

export default function StatusPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Status</span>
        <h1>Public service status</h1>
        <p>
          Status pages should remain plain and operational. This page shows the
          intended public surfaces in the ecosystem.
        </p>
      </section>

      <table className="data-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {services.map(([service, status, notes]) => (
            <tr key={service}>
              <td className="font-mono text-sm">{service}</td>
              <td className="font-medium text-[var(--ink)]">{status}</td>
              <td>{notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
