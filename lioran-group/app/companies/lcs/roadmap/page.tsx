const milestones = [
  ["Phase 1", "Unify public brand, navigation, and product positioning."],
  ["Phase 2", "Expand LioranDB documentation, installation flows, and release notes."],
  ["Phase 3", "Publish broader ecosystem tooling and support surfaces under LDS."],
];

export default function LcsRoadmapPage() {
  return (
    <section className="section-block">
      <div className="section-heading">
        <h2>Roadmap</h2>
        <p>Each phase expands documentation and operational readiness.</p>
      </div>
      <div className="card-grid">
        {milestones.map(([phase, detail]) => (
          <article key={phase} className="card">
            <h3 className="card-title">{phase}</h3>
            <p className="card-copy">{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
