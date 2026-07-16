import type { Metadata } from "next";
import Link from "next/link";
import InvestmentPlanner from "./InvestmentPlanner";

export const metadata: Metadata = {
  title: "Invest In LWS | Lioran Group",
  description:
    "Scope your Lioran Web Solutions project, choose services, and generate a live investment estimate.",
};

export default function LwsInvestPage() {
  return (
    <section className="bg-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16">
        <div className="max-w-3xl space-y-5">
          <Link
            href="/lws"
            className="inline-flex rounded-full border border-slate-700 px-4 py-1 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            Back to LWS
          </Link>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
              Investment planner
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Estimate the cost of your managed stack, platform, or SaaS build.
            </h1>
            <p className="text-base leading-7 text-slate-300">
              Choose the services you need, describe what you want to build,
              and use the live estimator to understand likely pricing before
              formal scoping.
            </p>
          </div>
        </div>

        <InvestmentPlanner />
      </div>
    </section>
  );
}
