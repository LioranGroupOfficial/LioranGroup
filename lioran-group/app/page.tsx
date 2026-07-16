import Link from "next/link";
import {
  Building2,
  CircleHelp,
  Compass,
  Database,
  FileCode2,
  Flag,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import { products, siteVersion } from "@/app/lib/site";
import CardTitle from "@/components/CardTitle";

const architectureRows = [
  [
    "Parent layer",
    "Lioran Group",
    "Parent organization holding LDS and maintaining ecosystem identity and governance.",
  ],
  [
    "Company layer",
    "LDS",
    "Deep-tech infrastructure company focused on Indian-built developer systems and data sovereignty.",
  ],
  [
    "Product layer",
    "LioranDB",
    "Database product under LDS focused on predictable infrastructure behavior.",
  ],
];

const faqRows = [
  [
    "What does Lioran Group do?",
    "Lioran Group is the parent organization. LDS is the company under it that builds the products and jobs.",
  ],
  [
    "What is LDS?",
    "Lioran Developer Solutions is a deep-tech infra company focused on reducing dependency on foreign dev infra and supporting data staying in India.",
  ],
  [
    "Why only one theme?",
    "The brand is intentionally dark, stable, and consistent across every product surface.",
  ],
  [
    "Where do I start?",
    "Start with LDS, then inspect LioranDB and the future product pipeline under it.",
  ],
];

export default function HomePage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Engineering First</span>
        <h1
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)", lineHeight: 1.05 }}
        >
          Lioran Group builds infrastructure.
        </h1>
        <p style={{ maxWidth: 760 }}>
          Lioran Group is the parent organization behind LDS. The ecosystem is
          built to support Indian-developed infrastructure products, reduce
          dependency on foreign developer infra, and keep sensitive data closer
          to where it belongs.
        </p>
        <div className="button-row">
          <Link href="/companies/lcs" className="button-primary">
            Explore LDS
          </Link>
          <Link href="/products" className="button-secondary">
            View Products
          </Link>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="nav-link">
            <FileCode2 className="nav-icon" />
            <span>Code Example</span>
          </h2>
          <p>
            Code replaces decorative imagery. The homepage should explain the
            ecosystem in the same language the products are built with.
          </p>
        </div>
        <pre className="code-panel">{`group Lioran {
  version: "${siteVersion}";
  parent_org: "Lioran Group";
  companies: [
    {
      name: "LDS",
      domain: "lioransolutions.com",
      focus: ["deep tech", "developer infra", "data sovereignty"],
      products: ["LioranDB", "Lioran Bastion", "Lioran Auth"]
    }
  ];
  principles: [
    "minimal interfaces",
    "predictable systems",
    "indian-built infrastructure first"
  ];
}`}</pre>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>Products</h2>
          <p>
            Product direction under LDS, including the current database product
            and the next infrastructure surfaces in the pipeline.
          </p>
        </div>
        <div className="card-grid two-column">
          {products.map((product) => (
            <article key={product.name} className="card">
              <p className="eyebrow">{product.status}</p>
              <CardTitle
                as="h3"
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
                {product.owner} · {product.domain}
              </p>
              <div>
                <Link href={product.href} className="button-link">
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="nav-link">
            <Layers3 className="nav-icon" />
            <span>Architecture</span>
          </h2>
          <p>
            The ecosystem is intentionally small and explicit. Each layer has a
            clear responsibility.
          </p>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Surface</th>
              <th>Responsibility</th>
            </tr>
          </thead>
          <tbody>
            {architectureRows.map(([layer, surface, responsibility]) => (
              <tr key={layer}>
                <td>{layer}</td>
                <td>{surface}</td>
                <td>{responsibility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card-grid three-column">
        <article className="card">
          <CardTitle as="h3" icon={Building2}>
            Parent Organization
          </CardTitle>
          <ul className="plain-list">
            <li>Lioran Group holds LDS as the infrastructure company.</li>
            <li>The group site explains hierarchy, identity, and ecosystem direction.</li>
            <li>Jobs and products are presented under LDS, not under LG directly.</li>
          </ul>
        </article>
        <article className="card">
          <CardTitle as="h3" icon={Flag}>
            LDS Focus
          </CardTitle>
          <ul className="plain-list">
            <li>Reduce dependency on foreign developer infrastructure.</li>
            <li>Support Indian data residency and government-aligned data locality goals.</li>
            <li>Build 100 percent Indian-developed infrastructure products.</li>
          </ul>
        </article>
        <article className="card">
          <CardTitle as="h3" icon={Compass}>
            Current Direction
          </CardTitle>
          <ul className="plain-list">
            <li>LioranDB is the current flagship product under LDS.</li>
            <li>Lioran Bastion is planned as storage infrastructure similar to S3.</li>
            <li>Lioran Auth is planned as backend authentication infrastructure.</li>
          </ul>
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="nav-link">
            <CircleHelp className="nav-icon" />
            <span>FAQ</span>
          </h2>
          <p>Short answers for engineers evaluating the ecosystem.</p>
        </div>
        <div className="card-grid">
          {faqRows.map(([question, answer]) => (
            <article key={question} className="card">
              <CardTitle as="h3" icon={CircleHelp}>
                {question}
              </CardTitle>
              <p className="card-copy">{answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
