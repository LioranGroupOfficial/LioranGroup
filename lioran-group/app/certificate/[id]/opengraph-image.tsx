import { ImageResponse } from "next/og";

export const runtime = "edge";

type Certificate = {
  certificateId: string;
  name: string;
  role: string;
  contribution: string;
  duration: string;
  issueDate: string;
  organization: string;
  issuedBy: string;
};

async function getCertificate(id: string): Promise<Certificate | null> {
  try {
    const res = await fetch(`https://lioran.group/api/certificates/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certificate = await getCertificate(id);

  /* ---------- FALLBACK ---------- */
  if (!certificate) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "1200px",
            height: "630px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#020617",
            color: "#fff",
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          Certificate Not Found
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  /* ---------- MAIN OG IMAGE ---------- */
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            height: "8px",
            width: "100%",
            // background:
            //   "linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899,#f59e0b)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "50px 60px",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 16, color: "#93c5fd", letterSpacing: 2 }}>
                CERTIFICATE OF
              </span>
              <span style={{ fontSize: 36, fontWeight: 900 }}>
                ACHIEVEMENT
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <span style={{ fontSize: 14, color: "#94a3b8" }}>
                Issued by
              </span>
              <span
                style={{ fontSize: 20, fontWeight: 700, color: "#3b82f6" }}
              >
                {certificate.organization}
              </span>
            </div>
          </div>

          {/* Name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 18, color: "#94a3b8" }}>
              This certificate is proudly presented to
            </span>

            <span
              style={{
                fontSize: 56,
                fontWeight: 900,
                // background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {certificate.name}
            </span>

            <span style={{ fontSize: 26, fontWeight: 600 }}>
              {certificate.role}
            </span>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 14, color: "#94a3b8" }}>
                Certificate ID
              </span>
              <span style={{ fontSize: 18, fontWeight: 700 }}>
                {certificate.certificateId}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <span style={{ fontSize: 14, color: "#94a3b8" }}>
                Signed By
              </span>
              <span style={{ fontSize: 18, fontWeight: 700 }}>
                {certificate.issuedBy}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
