import Link from "next/link";

export default function LioranTechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Archive</span>
        <h1>Lioran Tech</h1>
        <p>
          This branch is no longer part of the active public product catalog.
          Current public work now centers on LDS and LioranDB.
        </p>
        <div className="button-row">
          <Link href="/companies/lcs" className="button-secondary">
            Open LDS
          </Link>
          <Link href="/products" className="button-secondary">
            View Current Products
          </Link>
        </div>
      </section>

      {children}
    </div>
  );
}
