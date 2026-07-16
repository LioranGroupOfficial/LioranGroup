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
    <section className="overflow-hidden bg-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-200">
              LWS · Lioran Web Solutions
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Managed web systems and SaaS product builds for teams that need
                both infrastructure and execution.
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                LWS is the web solutions arm inside Lioran Group. We offer
                hosted platform services like PostgreSQL, n8n, MinIO, and
                Supertokens, while also designing and developing CRM systems,
                sign systems, and full SaaS products through our agency model.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/lws/invest"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Start investment plan
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900"
              >
                Talk to our team
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.24),_transparent_42%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.98))] p-7 shadow-[0_30px_120px_rgba(6,182,212,0.12)]">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">
              What we handle
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
              <p className="text-sm text-cyan-100">
                Best fit for founders, growing teams, and businesses that want
                a single partner for product engineering and managed stack
                delivery.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map(({ name, description, icon: Icon }) => (
            <article
              key={name}
              className="rounded-[1.75rem] border border-slate-800 bg-slate-950/70 p-6 transition hover:border-cyan-500/40 hover:bg-slate-950"
            >
              <div className="mb-5 inline-flex rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-cyan-300">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">{name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
              Delivery model
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              We can act as your managed stack partner, product agency, or both.
            </h2>
            <div className="mt-6 space-y-4">
              {deliveryTracks.map((track) => (
                <div
                  key={track}
                  className="rounded-2xl border border-slate-800 bg-black/40 px-4 py-4 text-sm leading-6 text-slate-300"
                >
                  {track}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-[linear-gradient(180deg,_rgba(15,23,42,0.84),_rgba(3,7,18,0.95))] p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
              Common builds
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {buildScopes.map((scope) => (
                <div
                  key={scope}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200"
                >
                  {scope}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">
                  Need a working budget before talking to us?
                </h3>
                <p className="mt-1 text-sm text-slate-300">
                  Use our investment page to estimate services, timeline, and
                  total project range.
                </p>
              </div>
              <Link
                href="/lws/invest"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-white"
              >
                Open estimator
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
