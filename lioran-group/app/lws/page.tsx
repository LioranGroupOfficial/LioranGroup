import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  Database,
  Puzzle,
  ServerCog,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Lioran Web Solutions | Lioran Group",
  description:
    "Lioran Web Solutions builds managed web infrastructure, internal systems, and SaaS products for teams that need a dependable technical partner.",
  openGraph: {
    title: "Lioran Web Solutions | Lioran Group",
    description:
      "Managed web services, product engineering, and SaaS development by Lioran Group.",
    url: "https://lioran.group/lws",
    type: "website",
  },
};

const services = [
  {
    name: "Hosted PostgreSQL",
    description:
      "Production-ready database setups for web applications, analytics layers, and internal tools.",
    icon: Database,
  },
  {
    name: "n8n Automation",
    description:
      "Workflow orchestration for repetitive ops, notifications, lead routing, and system integrations.",
    icon: Workflow,
  },
  {
    name: "MinIO Object Storage",
    description:
      "Private storage for uploads, backups, documents, and media pipelines with controlled access.",
    icon: ServerCog,
  },
  {
    name: "Supertokens Auth",
    description:
      "Sign-in and account management systems built for SaaS products, portals, and admin panels.",
    icon: ShieldCheck,
  },
  {
    name: "CRM Systems",
    description:
      "Custom CRM workflows for sales, support, onboarding, and customer operations teams.",
    icon: Puzzle,
  },
  {
    name: "Sign Systems",
    description:
      "Digital sign, approval, and internal acknowledgement systems for operational workflows.",
    icon: BadgeDollarSign,
  },
];

const deliveryTracks = [
  "Managed service stack for teams that need hosting and maintenance without hiring a platform team.",
  "Custom product development for startups and operators building a new SaaS or internal platform.",
  "System modernization for businesses replacing scattered tools with one connected workflow.",
];

const buildScopes = [
  "Client portals and admin dashboards",
  "Internal operations software",
  "B2B SaaS applications",
  "Automation-heavy workflows",
  "Authentication and onboarding systems",
  "Data, file, and approval platforms",
];

export default function LwsPage() {
  return (
    <div className="page-shell page-grid">
      {/* HERO */}
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <span className="eyebrow">
            LWS · Lioran Web Solutions
          </span>

          <div className="space-y-4">
            <h1 className="display-xl">
              Managed web systems and SaaS product builds for teams that need
              both infrastructure and execution.
            </h1>
            <p className="text-[var(--body)] text-lg leading-relaxed">
              LWS is the web solutions arm inside Lioran Group. We offer
              hosted platform services like PostgreSQL, n8n, MinIO, and
              Supertokens, while also designing and developing CRM systems,
              sign systems, and full SaaS products through our agency model.
            </p>
          </div>

          <div className="button-row pt-2">
            <Link
              href="/lws/invest"
              className="button-primary"
            >
              <span>Start investment plan</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="button-secondary"
            >
              Talk to our team
            </Link>
          </div>
        </div>

        <div className="card p-7 space-y-6 border border-[var(--hairline-strong)]">
          <span className="caption-uppercase text-[var(--muted)]">
            What we handle
          </span>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Infrastructure setup",
              "Automation orchestration",
              "Identity and access",
              "CRM workflow design",
              "SaaS product delivery",
              "Post-launch support",
            ].map((item) => (
              <div
                key={item}
                className="p-3 rounded-md border border-[var(--hairline)] bg-[var(--surface-strong)] text-sm font-medium text-[var(--ink)]"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="p-4 rounded-md border border-[var(--hairline)] bg-[var(--canvas-soft)]">
            <p className="text-sm text-[var(--body)]">
              Best fit for founders, growing teams, and businesses that want
              a single partner for product engineering and managed stack
              delivery.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-block">
        <div className="section-heading">
          <span className="caption-uppercase text-[var(--muted)]">Platform Stack</span>
          <h2 className="display-md">Managed Services</h2>
          <p>Production infrastructure and integrations maintained by our engineering team.</p>
        </div>
        <div className="card-grid three-column">
          {services.map(({ name, description, icon: Icon }) => (
            <article
              key={name}
              className="card"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-[var(--surface-strong)] text-[var(--ink)]">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="title-md">{name}</h3>
              </div>
              <p className="card-copy mt-2">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* DELIVERY MODEL & COMMON BUILDS */}
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card p-8 space-y-6">
          <span className="caption-uppercase text-[var(--muted)]">
            Delivery model
          </span>
          <h2 className="display-sm">
            We can act as your managed stack partner, product agency, or both.
          </h2>
          <div className="space-y-3">
            {deliveryTracks.map((track) => (
              <div
                key={track}
                className="p-3.5 rounded-md border border-[var(--hairline)] bg-[var(--surface-strong)] text-sm leading-relaxed text-[var(--body)]"
              >
                {track}
              </div>
            ))}
          </div>
        </div>

        <div className="card p-8 space-y-6">
          <span className="caption-uppercase text-[var(--muted)]">
            Common builds
          </span>
          <div className="grid gap-3 sm:grid-cols-2">
            {buildScopes.map((scope) => (
              <div
                key={scope}
                className="p-3.5 rounded-md border border-[var(--hairline)] bg-[var(--surface-strong)] text-sm text-[var(--ink)]"
              >
                {scope}
              </div>
            ))}
          </div>
          <div className="p-5 rounded-md border border-[var(--hairline-strong)] bg-[var(--canvas-soft)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--ink)]">
                Need a working budget before talking to us?
              </h3>
              <p className="text-xs text-[var(--body)] mt-1">
                Use our investment page to estimate services, timeline, and
                total project range.
              </p>
            </div>
            <Link
              href="/lws/invest"
              className="button-primary text-xs"
            >
              <span>Open estimator</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
