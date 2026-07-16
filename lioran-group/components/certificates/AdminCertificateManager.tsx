"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CertificateRecord, CertificateStatus } from "@/app/types/certificate";

type ApiResponse = {
  data: CertificateRecord[];
  stats: {
    total: number;
    active: number;
    suspended: number;
    revoked: number;
  };
  message?: string;
};

const statusTone: Record<CertificateStatus, string> = {
  active: "#86efac",
  suspended: "#fcd34d",
  revoked: "#fca5a5",
};

export default function AdminCertificateManager() {
  const [adminKey, setAdminKey] = useState("");
  const [ready, setReady] = useState(false);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | CertificateStatus>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("ADMIN_KEY") || "";
    setAdminKey(stored);
    setReady(true);
  }, []);

  async function loadCertificates(key: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/certificates", {
        headers: { "x-admin-key": key },
        cache: "no-store",
      });
      const data = (await res.json()) as ApiResponse;

      if (!res.ok) {
        throw new Error(data.message || "Unable to load certificates");
      }

      setCertificates(data.data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load certificates",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!adminKey) {
      setLoading(false);
      return;
    }

    void loadCertificates(adminKey);
  }, [adminKey]);

  async function updateStatus(certificateId: string, status: CertificateStatus) {
    try {
      const res = await fetch(`/api/certificates/${certificateId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to update status");
      }

      setCertificates((current) =>
        current.map((certificate) =>
          certificate.certificateId === certificateId ? data.data : certificate,
        ),
      );
    } catch (statusError) {
      setError(
        statusError instanceof Error
          ? statusError.message
          : "Unable to update status",
      );
    }
  }

  async function deleteCertificate(certificateId: string) {
    const confirmed = window.confirm(
      `Delete certificate ${certificateId}? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(`/api/certificates/${certificateId}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to delete certificate");
      }

      setCertificates((current) =>
        current.filter((certificate) => certificate.certificateId !== certificateId),
      );
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete certificate",
      );
    }
  }

  const filteredCertificates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return certificates.filter((certificate) => {
      const matchesQuery =
        !normalizedQuery ||
        certificate.name.toLowerCase().includes(normalizedQuery) ||
        certificate.role.toLowerCase().includes(normalizedQuery) ||
        certificate.certificateId.includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "all" || certificate.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [certificates, query, statusFilter]);

  if (!ready) {
    return null;
  }

  if (!adminKey) {
    return (
      <section className="card">
        <div className="section-heading">
          <h2>Admin key required</h2>
          <p>
            Save your `ADMIN_KEY` from `/admin`, then come back here to manage
            certificates.
          </p>
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
      <section className="card">
        <div className="section-heading">
          <h1 style={{ margin: 0 }}>Certificate Manager</h1>
          <p>
            Search, view, edit, suspend, revoke, or delete any certificate from
            one place.
          </p>
        </div>

        <div className="card-grid two-column">
          <input
            className="site-input"
            placeholder="Search by name, role, or certificate ID"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            className="site-input"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as "all" | CertificateStatus)
            }
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="revoked">Revoked</option>
          </select>
        </div>

        <div className="button-row">
          <Link href="/admin/certificates/generate" className="button-primary">
            Create Certificate
          </Link>
          <Link href="/admin" className="button-secondary">
            Back to Dashboard
          </Link>
        </div>

        {error ? <p style={{ color: "#fca5a5", margin: 0 }}>{error}</p> : null}
      </section>

      <section className="card">
        {loading ? (
          <p style={{ margin: 0 }}>Loading certificates...</p>
        ) : filteredCertificates.length === 0 ? (
          <p style={{ margin: 0 }}>No certificates matched your filters.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Issued</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.map((certificate) => (
                  <tr key={certificate.certificateId}>
                    <td>{certificate.certificateId}</td>
                    <td>{certificate.name}</td>
                    <td>{certificate.role}</td>
                    <td>
                      <span
                        style={{
                          color: statusTone[certificate.status],
                          textTransform: "capitalize",
                          fontWeight: 600,
                        }}
                      >
                        {certificate.status}
                      </span>
                    </td>
                    <td>
                      {new Date(certificate.issueDate).toLocaleDateString("en-IN")}
                    </td>
                    <td>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                        <Link
                          href={`/certificate/view/${certificate.certificateId}`}
                          className="button-link"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/certificates/${certificate.certificateId}/edit`}
                          className="button-link"
                        >
                          Edit
                        </Link>
                        {certificate.status !== "suspended" ? (
                          <button
                            type="button"
                            className="button-link"
                            onClick={() =>
                              updateStatus(certificate.certificateId, "suspended")
                            }
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="button-link"
                            onClick={() =>
                              updateStatus(certificate.certificateId, "active")
                            }
                          >
                            Activate
                          </button>
                        )}
                        {certificate.status !== "revoked" ? (
                          <button
                            type="button"
                            className="button-link"
                            onClick={() =>
                              updateStatus(certificate.certificateId, "revoked")
                            }
                          >
                            Revoke
                          </button>
                        ) : null}
                        <button
                          type="button"
                          className="button-link"
                          onClick={() => deleteCertificate(certificate.certificateId)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
