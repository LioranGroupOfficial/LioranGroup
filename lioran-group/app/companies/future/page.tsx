export default function FutureVenturesPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Future Products</span>
        <h1>Reserved space for the next infrastructure products.</h1>
        <p>
          New entries appear here once product identity and technical scope are
          clear enough to publish under LDS.
        </p>
      </section>

      <section className="card-grid two-column">
        <article className="card">
          <h2 className="card-title">Lioran Bastion</h2>
          <p className="card-copy">
            Storage infrastructure in the direction of S3, planned under LDS for
            sovereign storage and reduced foreign dependency.
          </p>
        </article>
        <article className="card">
          <h2 className="card-title">Lioran Auth</h2>
          <p className="card-copy">
            Backend authentication infrastructure planned under LDS for tighter
            control, Indian data locality, and long-term platform ownership.
          </p>
        </article>
      </section>
    </div>
  );
}
