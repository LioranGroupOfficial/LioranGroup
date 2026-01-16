import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
  const res = await fetch(
    `https://lioran.group/api/certificates/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Certificate not found");
  }

  const data = await res.json();
  return data.data;
}

/* -----------------------------------------
   ✅ FIXED: generateMetadata
------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params; // ✅ unwrap params

  try {
    const certificate = await getCertificate(id);

    const title = `${certificate.name} – Certificate of ${certificate.role}`;
    const description =
      certificate.description ||
      `Official certificate issued by ${certificate.organization} for ${certificate.name}.`;

    const url = `https://lioran.group/certificate/${id}`;

    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        siteName: "Lioran Group",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      title: "Certificate Not Found | Lioran Group",
      description: "The requested certificate does not exist or is invalid.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

/* -----------------------------------------
   ✅ Page Component
------------------------------------------ */
export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ unwrap params

  let certificate: Certificate;

  try {
    certificate = await getCertificate(id);
  } catch {
    notFound();
  }

  return <CertificatePageClient certificate={certificate} />;
}
