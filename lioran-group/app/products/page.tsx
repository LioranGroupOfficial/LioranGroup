import Link from "next/link";
import { Database, Layers3, ShieldCheck } from "lucide-react";
import { products } from "@/app/lib/site";
import CardTitle from "@/components/CardTitle";

export default function ProductsPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Products</span>
        <h1>Products under LDS.</h1>
        <p>
          Lioran Group is the parent organization. The products listed here are
          under LDS, with LioranDB active and Bastion/Auth in the future
          pipeline.
        </p>
      </section>

      <section className="card-grid two-column">
        {products.map((product) => (
          <article key={product.name} className="card">
            <p className="eyebrow">{product.status}</p>
            <CardTitle
              icon={
                product.name === "LioranDB"
                  ? Database
                  : product.name === "Lioran Bastion"
                    ? Layers3
                    : ShieldCheck
              }
            >
              {product.name}
            </CardTitle>
            <p className="card-copy">{product.summary}</p>
            <p className="card-copy">
              Owner: {product.owner} · Domain: {product.domain}
            </p>
            <div>
              {product.name === "LioranDB" ? (
                <a
                  href="https://liorandb.com"
                  target="_blank"
                  rel="noreferrer"
                  className="button-link"
                >
                  Open liorandb.com
                </a>
              ) : (
                <Link href={product.href} className="button-link">
                  Open product page
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
