import Link from "next/link";
import { connectDB } from "@/app/lib/mongodb";
import { getCertificateById } from "@/app/lib/certificates";

interface Certificate {
  certificateId: string;
  name: string;
  role: string;
  status: string;
}

function formatStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function getStatusMessage(status: string) {
  if (status === "active") {
    return "This certificate is valid and currently verified.";
  }

  if (status === "suspended") {
    return "This certificate record exists, but it is currently suspended and should not be treated as active.";
  }

  return "This certificate record exists for reference, but it has been revoked and is not valid.";
}

async function getCertificate(id: string): Promise<Certificate | null> {
  await connectDB();
  return getCertificateById(id);
}

export default async function VerifyCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const certificate = await getCertificate(id);

  return (
    <div
      className="page-shell page-grid"
      style={{ minHeight: "70vh", alignContent: "center" }}
    >
      <div className="card" style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
        {certificate ? (
          <>
            <h1 style={{ margin: 0, fontSize: "2rem" }}>
              {certificate.status === "active"
                ? "Certificate Verified"
                : "Certificate Found"}
            </h1>
            <p style={{ margin: 0 }}>
              <strong>ID:</strong> {certificate.certificateId}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Name:</strong> {certificate.name}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Role:</strong> {certificate.role}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Status:</strong> {formatStatus(certificate.status)}
            </p>
            <p style={{ margin: 0 }}>{getStatusMessage(certificate.status)}</p>
            <div className="button-row" style={{ justifyContent: "center" }}>
              <Link
                href={`/certificate/view/${certificate.certificateId}`}
                className="button-primary"
              >
                Open Certificate
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ margin: 0, fontSize: "2rem" }}>Certificate Not Found</h1>
            <p style={{ margin: 0 }}>
              The certificate with ID <strong>{id}</strong> is invalid or does not exist.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
