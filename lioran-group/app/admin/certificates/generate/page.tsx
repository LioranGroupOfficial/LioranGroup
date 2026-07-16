"use client";

import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import AdminCertificateForm from "@/components/certificates/AdminCertificateForm";

export default function GenerateCertificatePage() {
  const [adminKey, setAdminKey] = useState("");
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem("ADMIN_KEY");
    if (storedKey) {
      startTransition(() => {
        setAdminKey(storedKey);
        setHasKey(true);
      });
    }
  }, []);

  function saveAdminKey() {
    if (!adminKey) {
      return;
    }

    localStorage.setItem("ADMIN_KEY", adminKey);
    setHasKey(true);
  }

  if (!hasKey) {
    return (
      <div className="page-shell page-grid">
        <section className="card" style={{ maxWidth: 560 }}>
          <div className="section-heading">
            <h1>Admin Authentication</h1>
            <p>Save the admin key once to unlock certificate management.</p>
          </div>
          <input
            type="password"
            placeholder="Enter admin key"
            className="site-input"
            value={adminKey}
            onChange={(event) => setAdminKey(event.target.value)}
          />
          <div className="button-row">
            <button onClick={saveAdminKey} className="button-primary">
              Save Key
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Issue Certificate</span>
        <h1>Create a new certificate.</h1>
        <p>
          New certificates are issued from the managed admin flow and appear in
          the certificate dashboard automatically.
        </p>
        <div className="button-row">
          <Link href="/admin" className="button-secondary">
            Dashboard
          </Link>
          <Link href="/admin/certificates" className="button-secondary">
            Certificate Manager
          </Link>
        </div>
      </section>

      <AdminCertificateForm mode="create" adminKey={adminKey} />
    </div>
  );
}
