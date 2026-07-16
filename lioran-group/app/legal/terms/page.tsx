export default function TermsPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Terms</span>
        <h1>Terms of Use</h1>
        <p>
          Access to Lioran Group products and websites requires lawful and
          responsible use. Experimental systems may change without notice.
        </p>
      </section>

      <section className="card-grid">
        <article className="card">
          <h2 className="card-title">Acceptable Use</h2>
          <p className="card-copy">
            Do not misuse, disrupt, exploit, or reverse-engineer public systems
            beyond permitted interfaces and applicable law.
          </p>
        </article>
        <article className="card">
          <h2 className="card-title">Service Changes</h2>
          <p className="card-copy">
            Features, pricing, and availability can change as products mature.
            Continued use implies acceptance of updated terms.
          </p>
        </article>
      </section>
    </div>
  );
}
