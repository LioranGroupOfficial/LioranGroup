import { use } from "react";

interface Certificate {
  certificateId: string;
  name: string;
}

async function getCertificate(id: string): Promise<Certificate | null> {
  try {
    const res = await fetch(`https://lioran.group/api/certificates/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

export default async function VerifyCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const certificate = await getCertificate(id);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="bg-gray-800 p-10 rounded-3xl shadow-lg text-center max-w-md">
        {certificate ? (
          <>
            <h1 className="text-3xl font-bold mb-4">Certificate Verified ✅</h1>
            <p className="text-gray-300 mb-2">
              <strong>ID:</strong> {certificate.certificateId}
            </p>
            <p className="text-gray-300">
              <strong>Name:</strong> {certificate.name}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Certificate Not Found ❌</h1>
            <p className="text-gray-400">
              The certificate with ID <strong>{id}</strong> is invalid or does not exist.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
