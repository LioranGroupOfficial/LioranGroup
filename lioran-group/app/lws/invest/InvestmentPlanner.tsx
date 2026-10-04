"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type ProjectType = "landing" | "portal" | "saas" | "internal" | "automation";
type Timeline = "standard" | "fast" | "urgent";
type Support = "starter" | "growth" | "dedicated";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  region: string;
  projectType: ProjectType;
  buildSummary: string;
  users: string;
  services: string[];
  timeline: Timeline;
  support: Support;
  budgetBand: string;
};

const serviceCatalog = [
  { id: "postgres", label: "Hosted PostgreSQL", price: 18000 },
  { id: "n8n", label: "n8n Automation", price: 22000 },
  { id: "minio", label: "MinIO Storage", price: 14000 },
  { id: "supertokens", label: "Supertokens Auth", price: 24000 },
  { id: "crm", label: "Custom CRM", price: 70000 },
  { id: "sign", label: "Sign System", price: 46000 },
] as const;

const projectPricing: Record<ProjectType, number> = {
  landing: 30000,
  portal: 90000,
  saas: 180000,
  internal: 85000,
  automation: 65000,
};

const timelineMultipliers: Record<Timeline, number> = {
  standard: 1,
  fast: 1.18,
  urgent: 1.35,
};

const supportPricing: Record<Support, number> = {
  starter: 12000,
  growth: 28000,
  dedicated: 60000,
};

const defaultState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  role: "",
  region: "",
  projectType: "saas",
  buildSummary: "",
  users: "",
  services: ["postgres", "supertokens"],
  timeline: "standard",
  support: "growth",
  budgetBand: "INR 2L - 5L",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function InvestmentPlanner() {
  const [form, setForm] = useState<FormState>(defaultState);
  const [submitted, setSubmitted] = useState(false);

  const selectedServices = serviceCatalog.filter((service) =>
    form.services.includes(service.id),
  );

  const baseProjectPrice = projectPricing[form.projectType];
  const servicePrice = selectedServices.reduce(
    (total, service) => total + service.price,
    0,
  );
  const supportPrice = supportPricing[form.support];
  const subtotal = baseProjectPrice + servicePrice + supportPrice;
  const estimatedTotal = Math.round(subtotal * timelineMultipliers[form.timeline]);
  const estimatedDeposit = Math.round(estimatedTotal * 0.3);

  const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const toggleService = (serviceId: string) => {
    setForm((current) => {
      const exists = current.services.includes(serviceId);

      return {
        ...current,
        services: exists
          ? current.services.filter((id) => id !== serviceId)
          : [...current.services, serviceId],
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
      <form
        onSubmit={handleSubmit}
        className="card p-6 sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-xs font-medium text-[var(--body)]">First name</span>
            <input
              required
              value={form.firstName}
              onChange={(event) => handleChange("firstName", event.target.value)}
              className="site-input"
              placeholder="Aarav"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium text-[var(--body)]">Last name</span>
            <input
              required
              value={form.lastName}
              onChange={(event) => handleChange("lastName", event.target.value)}
              className="site-input"
              placeholder="Sharma"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium text-[var(--body)]">Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
              className="site-input"
              placeholder="team@company.com"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium text-[var(--body)]">Company</span>
            <input
              value={form.company}
              onChange={(event) => handleChange("company", event.target.value)}
              className="site-input"
              placeholder="Northwind Labs"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium text-[var(--body)]">Role</span>
            <input
              value={form.role}
              onChange={(event) => handleChange("role", event.target.value)}
              className="site-input"
              placeholder="Founder / Ops / Product"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium text-[var(--body)]">Region</span>
            <input
              value={form.region}
              onChange={(event) => handleChange("region", event.target.value)}
              className="site-input"
              placeholder="India, UAE, Europe..."
            />
          </label>
        </div>

        <div className="mt-6 grid gap-5">
          <label className="space-y-1.5">
            <span className="text-xs font-medium text-[var(--body)]">What do you want to build?</span>
            <select
              value={form.projectType}
              onChange={(event) =>
                handleChange("projectType", event.target.value as ProjectType)
              }
              className="site-input site-select"
            >
              <option value="landing">Marketing site or landing funnel</option>
              <option value="portal">Portal, dashboard, or client workspace</option>
              <option value="saas">Full SaaS product</option>
              <option value="internal">Internal operations platform</option>
              <option value="automation">Automation-led workflow system</option>
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium text-[var(--body)]">Project summary</span>
            <textarea
              required
              rows={4}
              value={form.buildSummary}
              onChange={(event) => handleChange("buildSummary", event.target.value)}
              className="site-textarea"
              placeholder="Tell us what the product should do, who it serves, and which workflow is most critical."
            />
          </label>

          <div className="space-y-2">
            <span className="text-xs font-medium text-[var(--body)]">
              Choose managed services and systems
            </span>
            <div className="grid gap-2 sm:grid-cols-2">
              {serviceCatalog.map((service) => {
                const active = form.services.includes(service.id);

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`p-3 rounded-md border text-left transition ${
                      active
                        ? "border-[var(--ink)] bg-[var(--surface-strong)] text-[var(--ink)] font-medium"
                        : "border-[var(--hairline-strong)] bg-[var(--surface-card)] text-[var(--body)] hover:border-[var(--muted)]"
                    }`}
                  >
                    <div className="text-sm font-medium">{service.label}</div>
                    <div className="mt-0.5 text-xs text-[var(--muted)] font-mono">
                      {formatCurrency(service.price)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5">
              <span className="text-xs font-medium text-[var(--body)]">Expected users or seats</span>
              <input
                value={form.users}
                onChange={(event) => handleChange("users", event.target.value)}
                className="site-input"
                placeholder="250 staff, 5k customers..."
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium text-[var(--body)]">Budget comfort zone</span>
              <select
                value={form.budgetBand}
                onChange={(event) => handleChange("budgetBand", event.target.value)}
                className="site-input site-select"
              >
                <option>Below INR 2L</option>
                <option>INR 2L - 5L</option>
                <option>INR 5L - 10L</option>
                <option>INR 10L - 20L</option>
                <option>Above INR 20L</option>
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium text-[var(--body)]">Timeline</span>
              <select
                value={form.timeline}
                onChange={(event) =>
                  handleChange("timeline", event.target.value as Timeline)
                }
                className="site-input site-select"
              >
                <option value="standard">Standard delivery</option>
                <option value="fast">Fast-track</option>
                <option value="urgent">Urgent launch</option>
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium text-[var(--body)]">Support model</span>
              <select
                value={form.support}
                onChange={(event) =>
                  handleChange("support", event.target.value as Support)
                }
                className="site-input site-select"
              >
                <option value="starter">Starter maintenance</option>
                <option value="growth">Growth support</option>
                <option value="dedicated">Dedicated retained team</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[var(--hairline)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--body)] max-w-sm">
            This submission creates a scoped estimate and lead brief. A final
            commercial proposal would still depend on exact requirements.
          </p>
          <button
            type="submit"
            className="button-primary"
          >
            <span>Submit investment brief</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      <aside className="space-y-6">
        <div className="card p-6 border border-[var(--hairline-strong)] bg-[var(--surface-card)]">
          <span className="caption-uppercase text-[var(--muted)]">
            Live estimate
          </span>
          <h2 className="display-sm mt-2 text-[var(--ink)] font-mono">
            {formatCurrency(estimatedTotal)}
          </h2>
          <p className="text-xs text-[var(--body)] mt-1">
            Indicative total based on build type, selected services, support
            model, and launch urgency.
          </p>

          <div className="mt-5 space-y-2 text-sm">
            <div className="flex items-center justify-between p-2.5 rounded-md bg-[var(--surface-strong)] text-[var(--body)]">
              <span>Base build</span>
              <span className="font-mono text-[var(--ink)]">{formatCurrency(baseProjectPrice)}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-md bg-[var(--surface-strong)] text-[var(--body)]">
              <span>Selected services</span>
              <span className="font-mono text-[var(--ink)]">{formatCurrency(servicePrice)}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-md bg-[var(--surface-strong)] text-[var(--body)]">
              <span>Support</span>
              <span className="font-mono text-[var(--ink)]">{formatCurrency(supportPrice)}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-md border border-[var(--hairline-strong)] bg-[var(--canvas-soft)] font-medium text-[var(--ink)]">
              <span>Estimated deposit</span>
              <span className="font-mono">{formatCurrency(estimatedDeposit)}</span>
            </div>
          </div>
        </div>

        <div className="card p-6 border border-[var(--hairline-strong)]">
          <h3 className="title-sm">Current scope</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {selectedServices.length > 0 ? (
              selectedServices.map((service) => (
                <span
                  key={service.id}
                  className="badge-pill"
                >
                  {service.label}
                </span>
              ))
            ) : (
              <span className="text-xs text-[var(--muted)]">
                Select services to improve your estimate.
              </span>
            )}
          </div>

          <div className="mt-4 p-3 rounded-md bg-[var(--surface-strong)] border border-[var(--hairline)]">
            <p className="text-xs text-[var(--muted)]">Budget band</p>
            <p className="mt-0.5 text-sm font-medium text-[var(--ink)]">{form.budgetBand}</p>
          </div>

          <div className="mt-2 p-3 rounded-md bg-[var(--surface-strong)] border border-[var(--hairline)]">
            <p className="text-xs text-[var(--muted)]">Contact summary</p>
            <p className="mt-0.5 text-sm font-medium text-[var(--ink)]">
              {[form.firstName, form.lastName].filter(Boolean).join(" ") || "Your name"}
            </p>
            <p className="text-xs text-[var(--muted)] font-mono">
              {form.email || "email@example.com"}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="card p-6 border border-[#16a34a]/30 bg-[#16a34a]/10">
            <div className="flex items-center gap-2 text-[#16a34a]">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <h3 className="title-sm text-[#16a34a]">
                Investment brief prepared
              </h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[var(--body)]">
              Thanks {form.firstName || "there"}, your project details and
              estimate are now structured for a follow-up proposal. Connect this
              form to your preferred API or CRM later if you want actual lead
              capture.
            </p>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
