import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Database,
  ExternalLink,
  Github,
  Globe,
  HardDrive,
  Settings2,
} from "lucide-react";
import CardTitle from "@/components/CardTitle";
import { githubUrl } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Swaraj Puppalwar — Founder & CTO | Lioran Group",
  description:
    "Professional profile for Swaraj Puppalwar, Founder and CTO of Lioran Group, focused on database systems, backend infrastructure, and developer tools.",
};

const technicalFocus = [
  "Database systems and storage engines",
  "Rust and backend infrastructure",
  "Distributed systems",
  "Developer tools and cloud infrastructure",
  "Full-stack software engineering",
];

function ExternalLinkLabel({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
    </>
  );
}

export default function FounderPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro" aria-labelledby="founder-name">
        <span className="eyebrow">Founder</span>
        <div>
          <h1 id="founder-name">Swaraj Puppalwar</h1>
          <p className="mt-2 text-soft">Founder &amp; CTO, Lioran Group</p>
        </div>
        <p>
          Swaraj Puppalwar is the Founder and CTO of Lioran Group, working on
          database systems, backend infrastructure, and developer tools.
        </p>
      </section>

      <section className="section-block" aria-labelledby="current-work">
        <div className="section-heading">
          <h2 id="current-work">Current work</h2>
          <p>
            Technical responsibilities span architecture, implementation, and
            the operation of products developed under Lioran Developer
            Solutions.
          </p>
        </div>

        <article className="card">
          <CardTitle icon={BriefcaseBusiness}>Engineering responsibilities</CardTitle>
          <ul className="plain-list">
            <li>Designing database and storage systems.</li>
            <li>Building Rust services and backend infrastructure.</li>
            <li>Working on distributed systems and developer tooling.</li>
            <li>Supporting product architecture across Lioran Group and LDS.</li>
          </ul>
        </article>
      </section>

      <section className="section-block" aria-labelledby="selected-projects">
        <div className="section-heading">
          <h2 id="selected-projects">Selected projects</h2>
          <p>Current and related engineering work, described plainly.</p>
        </div>

        <div className="card-grid two-column">
          <article className="card">
            <CardTitle icon={Database}>LioranDB</CardTitle>
            <p className="card-copy">
              A Rust-powered document database developed under Lioran Developer
              Solutions, with work spanning storage, backend services, and
              product infrastructure.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/companies/lcs/products" className="button-link">
                <span>Product details</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <a
                href="https://liorandb.com"
                target="_blank"
                rel="noreferrer"
                className="button-link"
              >
                <ExternalLinkLabel>liorandb.com</ExternalLinkLabel>
              </a>
            </div>
          </article>

          <article className="card">
            <CardTitle icon={HardDrive}>LioranDB Cloud</CardTitle>
            <p className="card-copy">
              Cloud infrastructure and product work related to the LioranDB
              database platform.
            </p>
            <div className="pt-2">
              <a
                href="https://app.liorandb.com"
                target="_blank"
                rel="noreferrer"
                className="button-link"
              >
                <ExternalLinkLabel>Open dashboard</ExternalLinkLabel>
              </a>
            </div>
          </article>

          <article className="card">
            <CardTitle icon={Building2}>Developer infrastructure</CardTitle>
            <p className="card-copy">
              Related infrastructure projects covering developer environments,
              backend services, and the systems around LDS products.
            </p>
            <div className="pt-2">
              <Link href="/ldep" className="button-link">
                <span>View platform work</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block" aria-labelledby="technical-focus">
        <div className="section-heading">
          <h2 id="technical-focus">Technical focus</h2>
          <p>Areas of ongoing engineering work.</p>
        </div>

        <article className="card">
          <CardTitle icon={Settings2}>Engineering domains</CardTitle>
          <ul className="plain-list">
            {technicalFocus.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section-block" aria-labelledby="founder-links">
        <div className="section-heading">
          <h2 id="founder-links">Links</h2>
          <p>Company, product, and engineering references.</p>
        </div>

        <article className="card">
          <CardTitle icon={Globe}>Public references</CardTitle>
          <ul className="plain-list">
            <li>
              <a
                href="https://swaraj.lioransolutions.com"
                target="_blank"
                rel="noreferrer"
              >
                <Globe className="mr-2 inline-block h-4 w-4" aria-hidden="true" />
                Professional profile
              </a>
            </li>
            <li>
              <a href={githubUrl} target="_blank" rel="noreferrer">
                <Github className="mr-2 inline-block h-4 w-4" aria-hidden="true" />
                Lioran Group on GitHub
              </a>
            </li>
            <li>
              <a href="https://lioran.group" target="_blank" rel="noreferrer">
                <Globe className="mr-2 inline-block h-4 w-4" aria-hidden="true" />
                Lioran Group
              </a>
            </li>
            <li>
              <a href="https://lioransolutions.com" target="_blank" rel="noreferrer">
                <Building2 className="mr-2 inline-block h-4 w-4" aria-hidden="true" />
                Lioran Developer Solutions
              </a>
            </li>
            <li>
              <a href="https://liorandb.com" target="_blank" rel="noreferrer">
                <Database className="mr-2 inline-block h-4 w-4" aria-hidden="true" />
                LioranDB
              </a>
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
