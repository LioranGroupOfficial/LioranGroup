import Link from "next/link";

export default function LioranTechProductsPage() {
  return (
    <section className="card-grid">
      <article className="card">
        <h2 className="card-title">Retired Product Pages</h2>
        <p className="card-copy">
          Hostel Buddy and Hushar Spreadsheet have been removed from the active
          public product catalog.
        </p>
        <div>
          <Link href="/products" className="button-link">
            View current public products
          </Link>
        </div>
      </article>
    </section>
  );
}
