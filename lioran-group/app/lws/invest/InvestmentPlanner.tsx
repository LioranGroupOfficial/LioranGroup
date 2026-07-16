"use client";

import { useState } from "react";

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
        className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-6 sm:p-8"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-slate-300">First name</span>
            <input
              required
              value={form.firstName}
              onChange={(event) => handleChange("firstName", event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="Aarav"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">Last name</span>
            <input
              required
              value={form.lastName}
              onChange={(event) => handleChange("lastName", event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="Sharma"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="team@company.com"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">Company</span>
            <input
              value={form.company}
              onChange={(event) => handleChange("company", event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="Northwind Labs"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">Role</span>
            <input
              value={form.role}
              onChange={(event) => handleChange("role", event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="Founder / Ops / Product"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">Region</span>
            <input
              value={form.region}
              onChange={(event) => handleChange("region", event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="India, UAE, Europe..."
            />
          </label>
        </div>

        <div className="mt-8 grid gap-6">
          <label className="space-y-2">
            <span className="text-sm text-slate-300">What do you want to build?</span>
            <select
              value={form.projectType}
              onChange={(event) =>
                handleChange("projectType", event.target.value as ProjectType)
              }
              className="w-full rounded-2xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              <option value="landing">Marketing site or landing funnel</option>
              <option value="portal">Portal, dashboard, or client workspace</option>
              <option value="saas">Full SaaS product</option>
              <option value="internal">Internal operations platform</option>
              <option value="automation">Automation-led workflow system</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">Project summary</span>
            <textarea
              required
              rows={5}
              value={form.buildSummary}
              onChange={(event) => handleChange("buildSummary", event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              placeholder="Tell us what the product should do, who it serves, and which workflow is most critical."
            />
          </label>

          <div className="space-y-3">
            <span className="text-sm text-slate-300">
              Choose managed services and systems
            </span>
            <div className="grid gap-3 md:grid-cols-2">
              {serviceCatalog.map((service) => {
                const active = form.services.includes(service.id);

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                      active
                        ? "border-cyan-400 bg-cyan-500/10 text-white"
                        : "border-slate-700 bg-black text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    <div className="font-medium">{service.label}</div>
                    <div className="mt-1 text-sm text-slate-400">
                      {formatCurrency(service.price)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-slate-300">Expected users or seats</span>
              <input
                value={form.users}
                onChange={(event) => handleChange("users", event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                placeholder="250 staff, 5k customers..."
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm text-slate-300">Budget comfort zone</span>
              <select
                value={form.budgetBand}
                onChange={(event) => handleChange("budgetBand", event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              >
                <option>Below INR 2L</option>
                <option>INR 2L - 5L</option>
                <option>INR 5L - 10L</option>
                <option>INR 10L - 20L</option>
                <option>Above INR 20L</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm text-slate-300">Timeline</span>
              <select
                value={form.timeline}
                onChange={(event) =>
                  handleChange("timeline", event.target.value as Timeline)
                }
                className="w-full rounded-2xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              >
                <option value="standard">Standard delivery</option>
                <option value="fast">Fast-track</option>
                <option value="urgent">Urgent launch</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm text-slate-300">Support model</span>
              <select
                value={form.support}
                onChange={(event) =>
                  handleChange("support", event.target.value as Support)
                }
                className="w-full rounded-2xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              >
                <option value="starter">Starter maintenance</option>
                <option value="growth">Growth support</option>
                <option value="dedicated">Dedicated retained team</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-slate-400">
            This submission creates a scoped estimate and lead brief. A final
            commercial proposal would still depend on exact requirements.
          </p>
          <button
            type="submit"
            className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Submit investment brief
          </button>
        </div>
      </form>

      <aside className="space-y-6">
        <div className="rounded-[2rem] border border-cyan-500/20 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_48%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.98))] p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">
            Live estimate
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">
            {formatCurrency(estimatedTotal)}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Indicative total based on build type, selected services, support
            model, and launch urgency.
          </p>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
              <span>Base build</span>
              <span>{formatCurrency(baseProjectPrice)}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
              <span>Selected services</span>
              <span>{formatCurrency(servicePrice)}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
              <span>Support</span>
              <span>{formatCurrency(supportPrice)}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 font-medium text-white">
              <span>Estimated deposit</span>
              <span>{formatCurrency(estimatedDeposit)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-white">Current scope</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedServices.length > 0 ? (
              selectedServices.map((service) => (
                <span
                  key={service.id}
                  className="rounded-full border border-slate-700 bg-black px-3 py-1 text-sm text-slate-300"
                >
                  {service.label}
                </span>
              ))
            ) : (
              <span className="text-sm text-slate-500">
                Select services to improve your estimate.
              </span>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-black/40 p-4">
            <p className="text-sm text-slate-400">Budget band</p>
            <p className="mt-1 text-white">{form.budgetBand}</p>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-800 bg-black/40 p-4">
            <p className="text-sm text-slate-400">Contact summary</p>
            <p className="mt-1 text-white">
              {[form.firstName, form.lastName].filter(Boolean).join(" ") || "Your name"}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {form.email || "email@example.com"}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="rounded-[2rem] border border-emerald-500/30 bg-emerald-500/10 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white">
              Investment brief prepared
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-200">
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
