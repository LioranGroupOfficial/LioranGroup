"use client";

interface Certificate {
  _id: string;
  certificateId: string;
  name: string;
  role: string;
  contribution: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: string;
  organization: string;
  issuedBy: string;
  issueDate: string;
  verificationUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function CertificatePageClient({
  certificate,
}: {
  certificate: Certificate;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-10">
      <div className="max-w-3xl w-full bg-[var(--card)] p-10 rounded-xl border border-[var(--border)]">
        <h1 className="text-3xl font-bold text-center mb-2">
          Certificate of Contribution
        </h1>

        <p className="text-center text-[var(--muted)] mb-8">
          Issued by {certificate.organization}
        </p>

        <p className="text-lg text-center">This certifies that</p>

        <h2 className="text-2xl font-semibold text-center mt-2">
          {certificate.name}
        </h2>

        <p className="text-center mt-4">
          served as <strong>{certificate.role}</strong>
        </p>

        <p className="mt-6 text-center text-[var(--muted)]">
          {certificate.description}
        </p>

        <div className="mt-8 flex justify-between text-sm text-[var(--muted)]">
          <span>ID: {certificate.certificateId}</span>
          <span>Status: {certificate.status.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}
