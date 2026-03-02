"use client";

import { useState } from "react";

export default function PageClient() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    updates: true,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

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

      if (!res.ok) throw new Error(data.message);

      setMsg("✅ You are now registered for LDEP Beta access.");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        updates: true,
      });
    } catch (err: any) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO + FORM */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-20 items-center">

        {/* Left Content */}
        <div>
          <h1 className="text-6xl font-bold tracking-tight">
            LDEP
          </h1>

          <p className="mt-6 text-lg text-zinc-400 max-w-xl">
            Lioran Developer Environment Platform is an end-to-end
            developer infrastructure ecosystem designed to eliminate
            architectural complexity, reduce development cost, and remove
            dependency on fragmented foreign SaaS tools.
          </p>

          <p className="mt-6 text-zinc-500 leading-relaxed">
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
          className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-10"
        >
          <h3 className="text-xl font-semibold">
            Request Beta Access
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Limited to the first 100 developers.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
              className="bg-black border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20"
            />

            <input
              required
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
              className="bg-black border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>

          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="mt-4 w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20"
          />

          <label className="mt-4 flex items-center gap-3 text-sm text-zinc-400">
  <input
    type="checkbox"
    checked={form.updates}
    onChange={(e) =>
      setForm({ ...form, updates: e.target.checked })
    }
    className="w-4 h-4 accent-emerald-500 bg-zinc-900 border border-zinc-600 rounded"
  />
  Receive platform updates and early features
</label>

          <button
            disabled={loading}
            className="
    mt-6 w-full rounded-xl 
    bg-white/90 text-black font-medium py-3
    transition-all duration-150

    hover:bg-zinc-100
    active:bg-zinc-300
    focus:outline-none focus:ring-2 focus:ring-white/30

    disabled:opacity-50 disabled:cursor-not-allowed
  "
          >
            {loading ? "Registering..." : "Request Beta Access"}
          </button>

          {msg && (
            <p className="mt-4 text-sm text-center text-zinc-400">
              {msg}
            </p>
          )}
        </form>
      </section>

      {/* OVERVIEW */}
      <section className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-28 space-y-28">

          {/* Problem */}
          <div>
            <h2 className="text-4xl font-bold">
              Why LDEP Exists
            </h2>

            <p className="mt-6 text-zinc-400 leading-relaxed max-w-4xl">
              Modern software development is built on fragmented tooling.
              Developers are forced to integrate multiple SaaS platforms
              for databases, authentication, file storage, deployment,
              payments, container orchestration, and monitoring.
              Each system introduces its own operational overhead,
              billing complexity, vendor lock-in, performance limits,
              and architectural friction.
            </p>

            <p className="mt-6 text-zinc-400 leading-relaxed max-w-4xl">
              This fragmentation leads to slower development cycles,
              fragile system design, unpredictable infrastructure cost,
              and unnecessary cognitive load on engineering teams.
            </p>
          </div>

          {/* Solution */}
          <div>
            <h2 className="text-4xl font-bold">
              The LDEP Architecture
            </h2>

            <p className="mt-6 text-zinc-400 leading-relaxed max-w-4xl">
              LDEP replaces fragmented infrastructure with a single,
              deeply integrated platform. It acts as the unified
              control layer, developer interface, SDK provider,
              and infrastructure orchestrator.
            </p>

            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {[
                ["LioranDB", "Document database with built-in CQRS"],
                ["LioranAuth", "Authentication & authorization"],
                ["LioranBastion", "Cloud storage & asset management"],
                ["LioranDeployments", "Node.js & Next.js deployments"],
                ["LioranContainers", "Container registry & orchestration"],
                ["LioranPayments", "Integrated payment infrastructure"],
                ["LioranP2P", "Decentralized database & storage network"],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-5"
                >
                  <div className="font-semibold">{title}</div>
                  <div className="mt-1 text-sm text-zinc-500">
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* P2P */}
          <div>
            <h2 className="text-4xl font-bold">
              LioranP2P — Infrastructure Beyond Cloud
            </h2>

            <p className="mt-6 text-zinc-400 leading-relaxed max-w-4xl">
              LioranP2P is a peer-to-peer database and storage
              infrastructure that operates alongside traditional
              cloud systems. It allows real-world devices to act as
              live computing nodes inside a global distributed network.
            </p>

            <p className="mt-6 text-zinc-400 leading-relaxed max-w-4xl">
              By converting laptops and mobile devices into secure
              infrastructure nodes, LioranP2P enables extreme cost
              reduction, massive scalability, and unprecedented
              fault tolerance — while maintaining enterprise-grade
              reliability and performance.
            </p>

            <p className="mt-6 text-zinc-400 leading-relaxed max-w-4xl">
              This hybrid architecture unlocks a new class of
              infrastructure systems where centralized cloud and
              decentralized networks operate together, forming
              the foundation of next-generation distributed computing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
