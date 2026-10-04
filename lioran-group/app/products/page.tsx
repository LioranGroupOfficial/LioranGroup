import Link from "next/link";
import { ArrowRight, Database, ExternalLink, HardDrive, ShieldCheck } from "lucide-react";
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
          developed under LDS, including LioranDB and Lioran Bastion (Lioran S3)
          in active distribution, and Lioran Auth in the pipeline.
        </p>
      </section>

      <section className="card-grid two-column">
        {products.map((product) => {
          const isExternal = product.href.startsWith("http");

          return (
            <article key={product.name} className="card flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="badge-pill">{product.status}</span>
                  <span className="text-xs font-mono text-[var(--muted)]">{product.domain}</span>
                </div>
                <CardTitle
                  icon={
                    product.name.includes("LioranDB")
                      ? Database
                      : product.name.includes("Bastion") || product.name.includes("S3")
                        ? HardDrive
                        : ShieldCheck
                  }
                >
                  {product.name}
                </CardTitle>
                <p className="card-copy">{product.summary}</p>
                <p className="text-xs text-[var(--muted)] font-mono">
                  {product.owner} · {product.domain}
                </p>
              </div>
              <div className="pt-4 border-t border-[var(--hairline)] mt-2">
                {isExternal ? (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noreferrer"
                    className="button-link"
                  >
                    <span>Open {product.domain}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link href={product.href} className="button-link">
                    <span>Open product page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
