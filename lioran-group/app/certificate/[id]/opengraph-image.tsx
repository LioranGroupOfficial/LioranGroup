import { ImageResponse } from "next/og";

export const runtime = "edge";

async function getCertificate(id: string) {
  const res = await fetch(`https://lioran.group/api/certificates/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Certificate not found");
  }

  const data = await res.json();
  return data.data;
}

/* -----------------------------------------
   ✅ DEFAULT EXPORT IS REQUIRED
------------------------------------------ */
export default async function OpenGraphImage({
  params,
}: {
  params: { id: string };
}) {
  const certificate = await getCertificate(params.id);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#020617",
          color: "#ffffff",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 48, marginBottom: 10 }}>
            Certificate of Achievement
          </h1>
          <p style={{ fontSize: 22, color: "#94a3b8" }}>
            This certificate is proudly presented to
          </p>
        </div>

        {/* Name */}
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 42, fontWeight: 800 }}>
            {certificate.name}
          </h2>
          <p style={{ fontSize: 26, color: "#cbd5f5" }}>
            {certificate.role}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#e5e7eb",
          }}
        >
          <span>{certificate.organization}</span>
          <span>{certificate.issueDate}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
