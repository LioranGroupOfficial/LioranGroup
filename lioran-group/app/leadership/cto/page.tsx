const expertise = [
  "Systems design and backend architecture",
  "TypeScript and Rust product engineering",
  "Platform planning, developer tooling, and operations",
  "Long-term technical direction for LDS and LioranDB",
];

export default function CTOPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Founder</span>
        <h1>Swaraj Puppalwar</h1>
        <p>
          Founder and CTO of Lioran Group. Responsible for architecture,
          technical standards, and the engineering direction of the ecosystem.
        </p>
      </section>

      <section className="card-grid two-column">
        <article className="card">
          <h2 className="card-title">Role</h2>
          <p className="card-copy">
            Leads system design, engineering standards, and product structure
            across LDS and LioranDB.
          </p>
        </article>
        <article className="card">
          <h2 className="card-title">Focus</h2>
          <ul className="plain-list">
            {expertise.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
