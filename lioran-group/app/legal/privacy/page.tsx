export default function PrivacyPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Privacy</span>
        <h1>Privacy Policy</h1>
        <p>
          Lioran Group collects only the data required to operate products,
          secure infrastructure, and respond to support requests.
        </p>
      </section>

      <section className="card-grid">
        <article className="card">
          <h2 className="card-title">Data Use</h2>
          <p className="card-copy">
            Usage data, account details, and technical logs are processed only
            for product operations, security, support, and service improvement.
          </p>
        </article>
        <article className="card">
          <h2 className="card-title">Third Parties</h2>
          <p className="card-copy">
            User data is not sold. Limited infrastructure processing may occur
            through service providers that are required to support operations.
          </p>
        </article>
      </section>
    </div>
  );
}
