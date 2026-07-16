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
      description: "The requested certificate does not exist or is invalid.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${certificate.name} - Certificate of ${certificate.role}`;
  const description =
    certificate.description ||
    `Official certificate issued by ${certificate.organization} for ${certificate.name}.`;
  const url = `https://lioran.group/certificate/${id}`;
  const ogImage = `https://lioran.group/Lioran-smp.png`;

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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Certificate issued to ${certificate.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CertificatePage({
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
