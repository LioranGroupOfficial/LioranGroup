import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CircleHelp,
  Compass,
  Database,
  FileCode2,
  Flag,
  Layers3,
  ShieldCheck,
  Terminal,
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
      {/* HERO SECTION */}
      <section className="page-intro relative overflow-hidden">
        <div className="flex flex-col gap-6 max-w-3xl">
          <span className="eyebrow">Engineering First</span>
          <h1 className="display-mega">
            Lioran Group builds infrastructure.
          </h1>
          <p className="text-lg text-[var(--body)] leading-relaxed">
            Lioran Group is the parent organization behind LDS. The ecosystem is
            built to support Indian-developed infrastructure products, reduce
            dependency on foreign developer infra, and keep sensitive data closer
            to where it belongs.
          </p>
          <div className="button-row pt-2">
            <Link href="/companies/lcs" className="button-primary">
              <span>Explore LDS</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link href="/products" className="button-secondary">
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* CODE / DEVELOPER SURFACE */}
      <section className="section-block">
        <div className="section-heading">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-[var(--ink)]" />
            <span className="caption-uppercase text-[var(--muted)]">Declaration</span>
          </div>
          <h2 className="display-md">Ecosystem Specification</h2>
          <p>
            Code replaces decorative imagery. The homepage explains the
            ecosystem in the same language the products are built with.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--hairline-strong)] bg-[#171717] overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#2c2c2e] bg-[#121212]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3c3c40]" />
              <span className="w-3 h-3 rounded-full bg-[#3c3c40]" />
              <span className="w-3 h-3 rounded-full bg-[#3c3c40]" />
              <span className="ml-2 text-xs font-mono text-[#8a8d94]">ecosystem.lg</span>
            </div>
            <span className="text-xs font-mono text-[#8a8d94] flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" /> schema: verified
            </span>
          </div>
          <pre className="p-6 overflow-x-auto text-[13.5px] leading-relaxed font-mono text-[#f4f4f6]">
            <code>
              <span className="text-[#a78bfa]">group</span> <span className="text-[#60a5fa]">Lioran</span> &#123;{"\n"}
              {"  "}version: <span className="text-[#34d399]">&quot;{siteVersion}&quot;</span>;{"\n"}
              {"  "}parent_org: <span className="text-[#34d399]">&quot;Lioran Group&quot;</span>;{"\n"}
              {"  "}companies: [&#123;{"\n"}
              {"    "}name: <span className="text-[#34d399]">&quot;LDS&quot;</span>,{"\n"}
              {"    "}domain: <span className="text-[#38bdf8]">&quot;lioransolutions.com&quot;</span>,{"\n"}
              {"    "}focus: [<span className="text-[#34d399]">&quot;deep tech&quot;</span>, <span className="text-[#34d399]">&quot;developer infra&quot;</span>, <span className="text-[#34d399]">&quot;data sovereignty&quot;</span>],{"\n"}
              {"    "}products: [<span className="text-[#34d399]">&quot;LioranDB&quot;</span>, <span className="text-[#34d399]">&quot;Lioran Bastion&quot;</span>, <span className="text-[#34d399]">&quot;Lioran Auth&quot;</span>]{"\n"}
              {"  "}&#125;];{"\n"}
              {"  "}principles: [&#123;{"\n"}
              {"    "}<span className="text-[#34d399]">&quot;minimal interfaces&quot;</span>,{"\n"}
              {"    "}<span className="text-[#34d399]">&quot;predictable systems&quot;</span>,{"\n"}
              {"    "}<span className="text-[#34d399]">&quot;indian-built infrastructure first&quot;</span>{"\n"}
              {"  "}&#125;];{"\n"}
              &#125;
            </code>
          </pre>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="section-block">
        <div className="section-heading">
          <span className="caption-uppercase text-[var(--muted)]">Portfolio</span>
          <h2 className="display-md">Products</h2>
          <p>
            Product direction under LDS, including the current database product
            and the next infrastructure surfaces in the pipeline.
          </p>
        </div>
        <div className="card-grid two-column">
          {products.map((product) => (
            <article key={product.name} className="card flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="badge-pill">{product.status}</span>
                  <span className="text-xs font-mono text-[var(--muted)]">{product.domain}</span>
                </div>
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
                <p className="text-xs text-[var(--muted)] font-mono">
                  {product.owner}
                </p>
              </div>
              <div className="pt-4 border-t border-[var(--hairline)] mt-2">
                <Link href={product.href} className="button-link font-medium">
                  <span>View details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ARCHITECTURE SECTION */}
      <section className="section-block">
        <div className="section-heading">
          <span className="caption-uppercase text-[var(--muted)]">Hierarchy</span>
          <h2 className="display-md">Architecture</h2>
          <p>
            The ecosystem is intentionally small and explicit. Each layer has a
            clear responsibility.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: "25%" }}>Layer</th>
                <th style={{ width: "25%" }}>Surface</th>
                <th style={{ width: "50%" }}>Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {architectureRows.map(([layer, surface, responsibility]) => (
                <tr key={layer}>
                  <td className="font-semibold text-[var(--ink)]">{layer}</td>
                  <td className="font-mono text-sm text-[var(--ink)]">{surface}</td>
                  <td>{responsibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PRINCIPLES 3-COLUMN GRID */}
      <section className="card-grid three-column">
        <article className="card">
          <CardTitle as="h3" icon={Building2}>
            Parent Organization
          </CardTitle>
          <ul className="plain-list space-y-3 pt-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] mt-2 flex-shrink-0" />
              <span>Lioran Group holds LDS as the infrastructure company.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] mt-2 flex-shrink-0" />
              <span>The group site explains hierarchy, identity, and ecosystem direction.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] mt-2 flex-shrink-0" />
              <span>Jobs and products are presented under LDS, not under LG directly.</span>
            </li>
          </ul>
        </article>
        <article className="card">
          <CardTitle as="h3" icon={Flag}>
            LDS Focus
          </CardTitle>
          <ul className="plain-list space-y-3 pt-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] mt-2 flex-shrink-0" />
              <span>Reduce dependency on foreign developer infrastructure.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] mt-2 flex-shrink-0" />
              <span>Support Indian data residency and government-aligned data locality goals.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] mt-2 flex-shrink-0" />
              <span>Build 100 percent Indian-developed infrastructure products.</span>
            </li>
          </ul>
        </article>
        <article className="card">
          <CardTitle as="h3" icon={Compass}>
            Current Direction
          </CardTitle>
          <ul className="plain-list space-y-3 pt-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] mt-2 flex-shrink-0" />
              <span>LioranDB is the current flagship product under LDS.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] mt-2 flex-shrink-0" />
              <span>Lioran Bastion is planned as storage infrastructure similar to S3.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] mt-2 flex-shrink-0" />
              <span>Lioran Auth is planned as backend authentication infrastructure.</span>
            </li>
          </ul>
        </article>
      </section>

      {/* FAQ SECTION */}
      <section className="section-block">
        <div className="section-heading">
          <span className="caption-uppercase text-[var(--muted)]">Support</span>
          <h2 className="display-md">Frequently Asked Questions</h2>
          <p>Short answers for engineers evaluating the ecosystem.</p>
        </div>
        <div className="card-grid two-column">
          {faqRows.map(([question, answer]) => (
            <article key={question} className="card">
              <CardTitle as="h3" icon={CircleHelp}>
                {question}
              </CardTitle>
              <p className="card-copy pt-1">{answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
