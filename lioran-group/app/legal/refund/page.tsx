export default function RefundPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Refunds</span>
        <h1>Refund Policy</h1>
        <p>
          Refunds are limited and evaluated according to product type, usage
          level, and the service terms presented at purchase.
        </p>
      </section>

      <section className="card-grid">
        <article className="card">
          <h2 className="card-title">Eligibility</h2>
          <p className="card-copy">
            Requests must be made promptly and are evaluated against actual
            product consumption and service delivery.
          </p>
        </article>
        <article className="card">
          <h2 className="card-title">Exclusions</h2>
          <p className="card-copy">
            Custom services, early-access products, and heavily consumed plans
            may not qualify for refund.
          </p>
        </article>
      </section>
    </div>
  );
}
