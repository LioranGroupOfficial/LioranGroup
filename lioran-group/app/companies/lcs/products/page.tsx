import { Building2, Database, Layers3, ShieldCheck } from "lucide-react";
import CardTitle from "@/components/CardTitle";

export default function LcsProductsPage() {
  return (
    <section className="card-grid">
      <article className="card">
        <p className="eyebrow">Current Product</p>
        <CardTitle icon={Database}>LioranDB</CardTitle>
        <p className="card-copy">
          LioranDB is the primary product under LDS. It is positioned as an
          infrastructure-grade database system with a strong focus on
          reliability, operational transparency, and long-term maintainability.
        </p>
        <p className="card-copy">
          Public domain: <span className="inline-code">liorandb.com</span>
        </p>
        <div>
          <a
            href="https://liorandb.com"
            target="_blank"
            rel="noreferrer"
            className="button-link"
          >
            Open liorandb.com
          </a>
        </div>
      </article>

      <article className="card">
        <p className="eyebrow">Future Product</p>
        <CardTitle icon={Layers3}>Lioran Bastion</CardTitle>
        <p className="card-copy">
          Storage infrastructure similar in direction to S3, planned under LDS
          for sovereign storage and reduced foreign dependency.
        </p>
      </article>

      <article className="card">
        <p className="eyebrow">Future Product</p>
        <CardTitle icon={ShieldCheck}>Lioran Auth</CardTitle>
        <p className="card-copy">
          Backend authentication infrastructure planned under LDS for tighter
          control, Indian data locality, and long-term platform ownership.
        </p>
      </article>

      <article className="card">
        <p className="eyebrow">Company</p>
        <CardTitle icon={Building2}>LDS</CardTitle>
        <p className="card-copy">
          These products are built under Lioran Developer Solutions.
        </p>
        <div>
          <a
            href="https://lioransolutions.com"
            target="_blank"
            rel="noreferrer"
            className="button-link"
          >
            Open lioransolutions.com
          </a>
        </div>
      </article>
    </section>
  );
}
