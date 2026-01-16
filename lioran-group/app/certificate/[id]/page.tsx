import { notFound } from "next/navigation";
import CertificatePageClient from "./pageClient";

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

async function getCertificate(id: string): Promise<Certificate> {
  // ✅ Use relative path for server-side fetch
  const res = await fetch(`/api/certificates/${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Certificate not found");
  }

  const data = await res.json();
  return data.data; // returns the certificate object
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let certificate: Certificate;

  try {
    certificate = await getCertificate(id);
  } catch (error) {
    // If API fails, show 404
    notFound();
  }

  return <CertificatePageClient certificate={certificate} />;
}
