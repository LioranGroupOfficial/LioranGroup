"use client";

import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import type { CertificateRecord } from "@/app/types/certificate";
import AdminCertificateForm from "./AdminCertificateForm";

type Props = {
  certificate: CertificateRecord;
};

export default function AdminEditCertificateClient({ certificate }: Props) {
  const [adminKey, setAdminKey] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setAdminKey(window.localStorage.getItem("ADMIN_KEY") || "");
      setReady(true);
    });
  }, []);

  if (!ready) {
    return null;
  }

  if (!adminKey) {
    return (
      <section className="card">
        <div className="section-heading">
          <h2>Admin key required</h2>
          <p>Save your key from the admin dashboard before editing certificates.</p>
        </div>
        <div className="button-row">
          <Link href="/admin" className="button-primary">
            Open Admin Dashboard
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="page-grid">
      <section className="page-intro">
        <span className="eyebrow">Certificate Editor</span>
        <h1>Edit certificate {certificate.certificateId}</h1>
        <p>
          Update the public record, change certificate status, or correct
          details without issuing a new ID.
        </p>
        <div className="button-row">
          <Link href="/admin/certificates" className="button-secondary">
            Back to Manager
          </Link>
          <Link
            href={`/certificate/view/${certificate.certificateId}`}
            className="button-primary"
          >
            Open Public View
          </Link>
        </div>
      </section>

      <AdminCertificateForm
        mode="edit"
        initialData={certificate}
        adminKey={adminKey}
      />
    </div>
  );
}
