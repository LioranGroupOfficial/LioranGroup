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
          background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
          color: "#ffffff",
          padding: "0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative top border */}
        <div
          style={{
            height: "8px",
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b)",
            width: "100%",
          }}
        />

        {/* Main Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "50px 60px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Top Section - Title & Organization */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 16, color: "#93c5fd", margin: "0 0 5px 0", letterSpacing: "2px" }}>
                CERTIFICATE OF
              </p>
              <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0", letterSpacing: "-1px" }}>
                ACHIEVEMENT
              </h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 14, color: "#64748b", margin: "0", marginBottom: "4px" }}>
                Issued by
              </p>
              <p style={{ fontSize: 18, fontWeight: 700, margin: "0", color: "#3b82f6" }}>
                {certificate.organization}
              </p>
            </div>
          </div>

          {/* Middle Section - Recipient Name & Role */}
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <p style={{ fontSize: 16, color: "#94a3b8", margin: "0 0 15px 0", letterSpacing: "1px" }}>
              This certificate is proudly presented to
            </p>
            <h2
              style={{
                fontSize: 52,
                fontWeight: 900,
                margin: "0 0 12px 0",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {certificate.name}
            </h2>
            <p style={{ fontSize: 24, color: "#cbd5f5", fontWeight: 600, margin: "0" }}>
              {certificate.role}
            </p>
          </div>

          {/* Details Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "20px",
              padding: "20px 0",
              borderTop: "1px solid rgba(148, 163, 184, 0.2)",
              borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
            }}
          >
            <div style={{ flex: 1, textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 6px 0", textTransform: "uppercase" }}>
                Contribution
              </p>
              <p style={{ fontSize: 14, color: "#e2e8f0", margin: "0", fontWeight: 600 }}>
                {certificate.contribution}
              </p>
            </div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 6px 0", textTransform: "uppercase" }}>
                Duration
              </p>
              <p style={{ fontSize: 14, color: "#e2e8f0", margin: "0", fontWeight: 600 }}>
                {certificate.duration}
              </p>
            </div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 6px 0", textTransform: "uppercase" }}>
                Issued Date
              </p>
              <p style={{ fontSize: 14, color: "#e2e8f0", margin: "0", fontWeight: 600 }}>
                {certificate.issueDate}
              </p>
            </div>
          </div>

          {/* Bottom Section - Verification Badge */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "15px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  border: "3px solid #3b82f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#3b82f6",
                }}
              >
                ✓
              </div>
              <div>
                <p style={{ fontSize: 12, color: "#64748b", margin: "0", textTransform: "uppercase" }}>
                  Verified Certificate
                </p>
                <p style={{ fontSize: 13, color: "#3b82f6", margin: "2px 0 0 0", fontWeight: 700 }}>
                  ID: {certificate.certificateId}
                </p>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 12, color: "#64748b", margin: "0", textTransform: "uppercase" }}>
                Signed By
              </p>
              <p style={{ fontSize: 16, fontWeight: 700, margin: "2px 0 0 0", color: "#e2e8f0" }}>
                {certificate.issuedBy}
              </p>
              <p style={{ fontSize: 12, color: "#93c5fd", margin: "2px 0 0 0" }}>
                Lioran Group
              </p>
            </div>
          </div>
        </div>

        {/* Decorative bottom corner accent */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
