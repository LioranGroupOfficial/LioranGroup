import Link from "next/link";
import { Boxes, Building2 } from "lucide-react";
import CardTitle from "@/components/CardTitle";

const companies = [
  {
    name: "LDS",
    href: "/companies/lcs",
    label: "lioransolutions.com",
    summary:
      "Lioran Developer Solutions is the deep-tech infrastructure company under Lioran Group, focused on Indian-built developer systems and data sovereignty.",
  },
  {
    name: "Future Products",
    href: "/companies/future",
    label: "Pipeline under LDS",
    summary:
      "Future infrastructure products under LDS, including Lioran Bastion and Lioran Auth.",
  },
];

export default function CompaniesPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Companies</span>
        <h1>The current company structure.</h1>
        <p>
          Lioran Group is the parent organization. LDS is the company under it.
          Products like LioranDB belong under LDS rather than appearing as
          companies themselves.
        </p>
      </section>

      <section className="card-grid">
        {companies.map((company) => (
          <article key={company.name} className="card">
            <CardTitle icon={company.name === "LDS" ? Building2 : Boxes}>
              {company.name}
            </CardTitle>
            <p className="card-copy">{company.summary}</p>
            <p className="card-copy">{company.label}</p>
            <div>
              <Link href={company.href} className="button-link">
                Explore
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
