import { notFound } from "next/navigation";
import { connectDB } from "@/app/lib/mongodb";
import { getCertificateById } from "@/app/lib/certificates";
import AdminEditCertificateClient from "@/components/certificates/AdminEditCertificateClient";

export default async function AdminEditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();
  const certificate = await getCertificateById(id);

  if (!certificate) {
    notFound();
  }

  return (
    <div className="page-shell page-grid">
      <AdminEditCertificateClient certificate={certificate} />
    </div>
  );
}
