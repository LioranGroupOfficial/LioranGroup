import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { connectDB } from "@/app/lib/mongodb";
import { getCertificateById } from "@/app/lib/certificates";
import CertificateViewer from "@/components/certificates/CertificateViewer";

async function loadCertificate(id: string) {
  await connectDB();
  return getCertificateById(id);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const certificate = await loadCertificate(id);

  if (!certificate) {
    return {
      title: "Certificate Not Found | Lioran Group",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${certificate.name} | Certificate View`,
    description: certificate.description,
    alternates: {
      canonical: `https://lioran.group/certificate/view/${id}`,
    },
    openGraph: {
      title: `${certificate.name} | Certificate View`,
      description: certificate.description,
      url: `https://lioran.group/certificate/view/${id}`,
      images: ["/Lioran-smp.png"],
    },
  };
}

export default async function CertificateViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certificate = await loadCertificate(id);

  if (!certificate) {
    notFound();
  }

  return <CertificateViewer certificate={certificate} />;
}
