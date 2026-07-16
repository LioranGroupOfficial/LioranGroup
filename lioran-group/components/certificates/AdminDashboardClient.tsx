"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Stats = {
  total: number;
  active: number;
  suspended: number;
  revoked: number;
};

export default function AdminDashboardClient() {
  const [adminKey, setAdminKey] = useState("");
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const [ready, setReady] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("ADMIN_KEY") || "";
    setAdminKey(stored);
    setHasStoredKey(!!stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!hasStoredKey || !adminKey) {
      return;
    }

    let active = true;

    async function loadStats() {
      try {
        setError(null);
        const res = await fetch("/api/certificates", {
          headers: { "x-admin-key": adminKey },
          cache: "no-store",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Unable to load dashboard");
        }

        if (active) {
          setStats(data.stats);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load dashboard",
          );
        }
      }
    }

    void loadStats();

    return () => {
      active = false;
    };
  }, [adminKey, hasStoredKey]);

  function saveKey() {
    window.localStorage.setItem("ADMIN_KEY", adminKey);
    setHasStoredKey(true);
  }

  if (!ready) {
    return null;
  }

  if (!hasStoredKey) {
    return (
      <section className="card" style={{ maxWidth: 560 }}>
        <div className="section-heading">
          <h2>Admin Authentication</h2>
          <p>Save your admin key once to unlock the certificate dashboard.</p>
        </div>
        <input
          type="password"
          className="site-input"
          value={adminKey}
          onChange={(event) => setAdminKey(event.target.value)}
          placeholder="Enter admin key"
        />
        <div className="button-row">
          <button type="button" className="button-primary" onClick={saveKey}>
            Save Admin Key
          </button>
        </div>
      </section>
    );
  }

  const summary = stats ?? {
    total: 0,
    active: 0,
    suspended: 0,
    revoked: 0,
  };

  return (
    <div className="page-grid">
      <section className="card-grid two-column">
        {[
          ["Total certificates", summary.total],
          ["Active", summary.active],
          ["Suspended", summary.suspended],
          ["Revoked", summary.revoked],
        ].map(([label, value]) => (
          <article key={label} className="card">
            <p className="eyebrow">{label}</p>
            <h2 style={{ margin: 0, fontSize: "2rem" }}>{value}</h2>
          </article>
        ))}
      </section>

      <section className="card">
        <div className="section-heading">
          <h2>Certificate Management</h2>
          <p>
            Move between issuing, editing, suspending, deleting, and public view
            flows from one admin workspace.
          </p>
        </div>
        {error ? <p style={{ color: "#fca5a5", margin: 0 }}>{error}</p> : null}
        <div className="button-row">
          <Link href="/admin/certificates" className="button-primary">
            Open Manager
          </Link>
          <Link href="/admin/certificates/generate" className="button-secondary">
            Create New
          </Link>
        </div>
      </section>
    </div>
  );
}
