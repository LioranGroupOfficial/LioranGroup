"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Layers3, Network, ShieldCheck, Terminal } from "lucide-react";

export default function PageClient() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    updates: true,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch("/ldep/api/beta-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      setMsg({ type: "success", text: "You are now registered for LDEP Beta access." });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        updates: true,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Registration error";
      setMsg({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell page-grid">
      {/* HERO + FORM */}
      <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
        {/* Left Content */}
        <div className="flex flex-col gap-6">
          <span className="eyebrow">Developer Platform</span>
          <h1 className="display-xl">
            LDEP
          </h1>

          <p className="text-lg text-[var(--ink)] leading-relaxed font-medium">
            Lioran Developer Environment Platform is an end-to-end
            developer infrastructure ecosystem designed to eliminate
            architectural complexity, reduce development cost, and remove
            dependency on fragmented foreign SaaS tools.
          </p>

          <p className="text-[var(--body)] leading-relaxed">
            LDEP is not a collection of services. It is a unified
            developer operating platform providing databases,
            authentication, storage, deployments, payments,
            container management, and peer-to-peer infrastructure
            under a single architecture, SDK, and billing model.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="card p-8 border border-[var(--hairline-strong)] bg-[var(--surface-card)]"
        >
          <div className="space-y-1">
            <span className="caption-uppercase text-[var(--muted)]">Early Access</span>
            <h3 className="title-md">Request Beta Access</h3>
            <p className="text-xs text-[var(--body)]">
              Limited to the first 100 developers.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--body)] block mb-1.5">First Name</label>
              <input
                required
                placeholder="Aarav"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                className="site-input"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--body)] block mb-1.5">Last Name</label>
              <input
                required
                placeholder="Sharma"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
                className="site-input"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-[var(--body)] block mb-1.5">Email Address</label>
            <input
              required
              type="email"
              placeholder="developer@company.com"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="site-input"
            />
          </div>

          <label className="mt-5 flex items-center gap-3 text-sm text-[var(--body)] cursor-pointer">
            <input
              type="checkbox"
              checked={form.updates}
              onChange={(e) =>
                setForm({ ...form, updates: e.target.checked })
              }
              className="w-4 h-4 rounded border-[var(--hairline-strong)] text-[var(--ink)] focus:ring-[var(--ink)]"
            />
            <span>Receive platform updates and early features</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="button-primary w-full mt-6 flex items-center justify-center gap-2"
          >
            <span>{loading ? "Registering..." : "Request Beta Access"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {msg && (
            <div className={`mt-4 p-3 rounded-md text-sm text-center border ${
              msg.type === "success"
                ? "bg-[#16a34a]/10 border-[#16a34a]/30 text-[#16a34a]"
                : "bg-[#dc2626]/10 border-[#dc2626]/30 text-[#dc2626]"
            }`}>
              {msg.text}
            </div>
          )}
        </form>
      </section>

      {/* OVERVIEW */}
      <section className="section-block pt-8 border-t border-[var(--hairline)]">
        {/* Problem */}
        <div className="space-y-4 max-w-4xl">
          <span className="caption-uppercase text-[var(--muted)]">Background</span>
          <h2 className="display-md">Why LDEP Exists</h2>

          <p className="text-[var(--body)] leading-relaxed">
            Modern software development is built on fragmented tooling.
            Developers are forced to integrate multiple SaaS platforms
            for databases, authentication, file storage, deployment,
            payments, container orchestration, and monitoring.
            Each system introduces its own operational overhead,
            billing complexity, vendor lock-in, performance limits,
            and architectural friction.
          </p>

          <p className="text-[var(--body)] leading-relaxed">
            This fragmentation leads to slower development cycles,
            fragile system design, unpredictable infrastructure cost,
            and unnecessary cognitive load on engineering teams.
          </p>
        </div>

        {/* Solution */}
        <div className="space-y-6 pt-8">
          <div className="space-y-2 max-w-4xl">
            <span className="caption-uppercase text-[var(--muted)]">Platform Architecture</span>
            <h2 className="display-md">The LDEP Architecture</h2>

            <p className="text-[var(--body)] leading-relaxed">
              LDEP replaces fragmented infrastructure with a single,
              deeply integrated platform. It acts as the unified
              control layer, developer interface, SDK provider,
              and infrastructure orchestrator.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["LioranDB", "Document database with built-in CQRS", Terminal],
              ["LioranAuth", "Authentication & authorization", ShieldCheck],
              ["LioranBastion", "Cloud storage & asset management", Layers3],
              ["LioranDeployments", "Node.js & Next.js deployments", Terminal],
              ["LioranContainers", "Container registry & orchestration", Layers3],
              ["LioranPayments", "Integrated payment infrastructure", CheckCircle2],
              ["LioranP2P", "Decentralized database & storage network", Network],
            ].map(([title, desc, Icon]) => {
              const IconComponent = Icon as React.ComponentType<{ className?: string }>;
              return (
                <div
                  key={title as string}
                  className="card p-5"
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-[var(--ink)]" />
                    <div className="font-semibold text-[var(--ink)]">{title as string}</div>
                  </div>
                  <div className="mt-2 text-sm text-[var(--body)]">
                    {desc as string}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* P2P */}
        <div className="space-y-4 max-w-4xl pt-8 border-t border-[var(--hairline)]">
          <span className="caption-uppercase text-[var(--muted)]">Decentralized Mesh</span>
          <h2 className="display-md">LioranP2P — Infrastructure Beyond Cloud</h2>

          <p className="text-[var(--body)] leading-relaxed">
            LioranP2P is a peer-to-peer database and storage
            infrastructure that operates alongside traditional
            cloud systems. It allows real-world devices to act as
            live computing nodes inside a global distributed network.
          </p>

          <p className="text-[var(--body)] leading-relaxed">
            By converting laptops and mobile devices into secure
            infrastructure nodes, LioranP2P enables extreme cost
            reduction, massive scalability, and unprecedented
            fault tolerance — while maintaining enterprise-grade
            reliability and performance.
          </p>

          <p className="text-[var(--body)] leading-relaxed">
            This hybrid architecture unlocks a new class of
            infrastructure systems where centralized cloud and
            decentralized networks operate together, forming
            the foundation of next-generation distributed computing.
          </p>
        </div>
      </section>
    </div>
  );
}
