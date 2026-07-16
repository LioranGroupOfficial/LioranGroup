"use client";

import { useState } from "react";
import type {
  CertificateInput,
  CertificateRecord,
  CertificateStatus,
} from "@/app/types/certificate";

type Props = {
  mode: "create" | "edit";
  initialData?: CertificateRecord;
  adminKey: string;
  onSuccess?: (certificate: CertificateRecord) => void;
};

const today = new Date();
const endDateDefault = today.toISOString().split("T")[0];
const startDateDefault = new Date(
  today.getFullYear(),
  today.getMonth() - 1,
  today.getDate(),
)
  .toISOString()
  .split("T")[0];

const defaultForm: CertificateInput = {
  name: "",
  role: "",
  contribution: "",
  description: "",
  startDate: startDateDefault,
  endDate: endDateDefault,
  duration: "1 month",
  organization: "Lioran Group",
  issuedBy: "Lioran Developer Environment Platform",
  status: "active",
};

function toFormValues(initialData?: CertificateRecord): CertificateInput {
  if (!initialData) {
    return defaultForm;
  }

  return {
    name: initialData.name,
    role: initialData.role,
    contribution: initialData.contribution,
    description: initialData.description,
    startDate: initialData.startDate.split("T")[0],
    endDate: initialData.endDate.split("T")[0],
    duration: initialData.duration,
    organization: initialData.organization,
    issuedBy: initialData.issuedBy,
    status: initialData.status,
  };
}

export default function AdminCertificateForm({
  mode,
  initialData,
  adminKey,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<CertificateInput>(toFormValues(initialData));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function updateField<K extends keyof CertificateInput>(
    key: K,
    value: CertificateInput[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const endpoint =
        mode === "create"
          ? "/api/certificates"
          : `/api/certificates/${initialData?.certificateId}`;

      const res = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to save certificate");
      }

      const certificate = data.data as CertificateRecord;
      setSuccess(
        mode === "create"
          ? `Certificate ${certificate.certificateId} created successfully.`
          : `Certificate ${certificate.certificateId} updated successfully.`,
      );
      onSuccess?.(certificate);

      if (mode === "create") {
        setForm(defaultForm);
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save certificate",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const statusOptions: CertificateStatus[] = ["active", "suspended", "revoked"];

  return (
    <section className="card" style={{ gap: 20 }}>
      <div className="section-heading">
        <h2>{mode === "create" ? "Create Certificate" : "Edit Certificate"}</h2>
        <p>
          {mode === "create"
            ? "Issue a new certificate and make it instantly available for verification."
            : "Update certificate details, adjust status, and keep the public view in sync."}
        </p>
      </div>

      <div className="card-grid two-column">
        <label style={{ display: "grid", gap: 8 }}>
          <span className="text-soft">Recipient name</span>
          <input
            className="site-input"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </label>
        <label style={{ display: "grid", gap: 8 }}>
          <span className="text-soft">Role</span>
          <input
            className="site-input"
            value={form.role}
            onChange={(event) => updateField("role", event.target.value)}
          />
        </label>
        <label style={{ display: "grid", gap: 8 }}>
          <span className="text-soft">Contribution</span>
          <input
            className="site-input"
            value={form.contribution}
            onChange={(event) => updateField("contribution", event.target.value)}
          />
        </label>
        <label style={{ display: "grid", gap: 8 }}>
          <span className="text-soft">Duration label</span>
          <input
            className="site-input"
            value={form.duration}
            onChange={(event) => updateField("duration", event.target.value)}
          />
        </label>
        <label style={{ display: "grid", gap: 8 }}>
          <span className="text-soft">Start date</span>
          <input
            className="site-input"
            type="date"
            value={form.startDate}
            onChange={(event) => updateField("startDate", event.target.value)}
          />
        </label>
        <label style={{ display: "grid", gap: 8 }}>
          <span className="text-soft">End date</span>
          <input
            className="site-input"
            type="date"
            value={form.endDate}
            onChange={(event) => updateField("endDate", event.target.value)}
          />
        </label>
        <label style={{ display: "grid", gap: 8 }}>
          <span className="text-soft">Organization</span>
          <input
            className="site-input"
            value={form.organization}
            onChange={(event) => updateField("organization", event.target.value)}
          />
        </label>
        <label style={{ display: "grid", gap: 8 }}>
          <span className="text-soft">Issued by</span>
          <input
            className="site-input"
            value={form.issuedBy}
            onChange={(event) => updateField("issuedBy", event.target.value)}
          />
        </label>
        <label style={{ display: "grid", gap: 8 }}>
          <span className="text-soft">Status</span>
          <select
            className="site-input"
            value={form.status}
            onChange={(event) =>
              updateField("status", event.target.value as CertificateStatus)
            }
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label style={{ display: "grid", gap: 8 }}>
        <span className="text-soft">Description</span>
        <textarea
          className="site-textarea"
          rows={5}
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
        />
      </label>

      {error ? <p style={{ color: "#fca5a5", margin: 0 }}>{error}</p> : null}
      {success ? <p style={{ color: "#86efac", margin: 0 }}>{success}</p> : null}

      <div className="button-row">
        <button
          type="button"
          className="button-primary"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
              ? "Create Certificate"
              : "Save Changes"}
        </button>
      </div>
    </section>
  );
}
