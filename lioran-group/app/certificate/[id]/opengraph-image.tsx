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
            background: "#171717",
            color: "#ffffff",
            fontSize: 48,
            fontWeight: 700,
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
          background: "#171717",
          color: "#ffffff",
          fontFamily: "sans-serif",
          border: "16px solid #232328",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            height: "4px",
            width: "100%",
            background: "#34343c",
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
              <span style={{ fontSize: 14, color: "#9ea3ae", letterSpacing: 2, textTransform: "uppercase" }}>
                CERTIFICATE OF
              </span>
              <span style={{ fontSize: 32, fontWeight: 700, color: "#ffffff" }}>
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
              <span style={{ fontSize: 13, color: "#9ea3ae" }}>
                Issued by
              </span>
              <span
                style={{ fontSize: 18, fontWeight: 600, color: "#ffffff" }}
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
            <span style={{ fontSize: 16, color: "#9ea3ae" }}>
              This certificate is proudly presented to
            </span>

            <span
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: "#ffffff",
                margin: "12px 0 6px",
              }}
            >
              {certificate.name}
            </span>

            <span style={{ fontSize: 22, fontWeight: 500, color: "#38bdf8" }}>
              {certificate.role}
            </span>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #34343c",
              paddingTop: "24px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 13, color: "#9ea3ae" }}>
                Certificate ID
              </span>
              <span style={{ fontSize: 16, fontWeight: 600, color: "#ffffff" }}>
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
              <span style={{ fontSize: 13, color: "#9ea3ae" }}>
                Signed By
              </span>
              <span style={{ fontSize: 16, fontWeight: 600, color: "#ffffff" }}>
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
