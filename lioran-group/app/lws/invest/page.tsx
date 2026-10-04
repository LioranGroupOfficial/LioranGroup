import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import InvestmentPlanner from "./InvestmentPlanner";

export const metadata: Metadata = {
  title: "Invest In LWS | Lioran Group",
  description:
    "Scope your Lioran Web Solutions project, choose services, and generate a live investment estimate.",
};

export default function LwsInvestPage() {
  return (
    <div className="page-shell page-grid">
      <div className="max-w-3xl space-y-4">
        <Link
          href="/lws"
          className="button-link"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to LWS</span>
        </Link>
        <div className="space-y-3">
          <span className="eyebrow">
            Investment planner
          </span>
          <h1 className="display-lg">
            Estimate the cost of your managed stack, platform, or SaaS build.
          </h1>
          <p className="text-base leading-relaxed text-[var(--body)]">
            Choose the services you need, describe what you want to build,
            and use the live estimator to understand likely pricing before
            formal scoping.
          </p>
        </div>
      </div>

      <InvestmentPlanner />
    </div>
  );
}
