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
    const res = await fetch(
      `https://lioran.group/api/certificates/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return null;
    }

    const json = await res.json();

    return json.data ?? null;
  } catch (error) {
    console.error("Failed to fetch certificate:", error);
    return null;
  }
}

function getNameFontSize(name: string) {
  if (name.length > 32) return 38;
  if (name.length > 24) return 44;
  if (name.length > 18) return 50;

  return 56;
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
            background:
              "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              width: "1120px",
              height: "550px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#0f172a",
              border: "2px solid #334155",
            }}
          >
            <span
              style={{
                fontSize: 50,
                fontWeight: 800,
              }}
            >
              Certificate Not Found
            </span>

            <span
              style={{
                marginTop: "14px",
                fontSize: 20,
                color: "#94a3b8",
              }}
            >
              The certificate may be invalid or unavailable.
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  }

  const nameFontSize = getNameFontSize(certificate.name);

  /* ---------- MAIN OG IMAGE ---------- */

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/*
         * SINGLE FILLED OUTER BOUNDARY
         *
         * This is the only main certificate boundary.
         * The complete rectangle is filled with the original dark theme.
         */}
        <div
          style={{
            width: "1120px",
            height: "550px",
            display: "flex",
            flexDirection: "column",
            background: "#0f172a",
            border: "2px solid #334155",
            padding: "34px 42px",
          }}
        >
          {/* Header */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  color: "#93c5fd",
                  letterSpacing: "2px",
                  fontWeight: 700,
                }}
              >
                CERTIFICATE OF
              </span>

              <span
                style={{
                  marginTop: "2px",
                  fontSize: 34,
                  fontWeight: 900,
                  color: "#ffffff",
                }}
              >
                ACHIEVEMENT
              </span>
            </div>

            <div
              style={{
                maxWidth: "400px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                textAlign: "right",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  color: "#94a3b8",
                }}
              >
                Issued by
              </span>

              <span
                style={{
                  marginTop: "5px",
                  fontSize: 19,
                  lineHeight: 1.2,
                  fontWeight: 700,
                  color: "#3b82f6",
                }}
              >
                {certificate.organization}
              </span>
            </div>
          </div>

          {/* Recipient */}
          <div
            style={{
              width: "100%",
              marginTop: "22px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: 17,
                color: "#94a3b8",
              }}
            >
              This certificate is proudly presented to
            </span>

            <span
              style={{
                maxWidth: "950px",
                marginTop: "7px",
                fontSize: nameFontSize,
                lineHeight: 1.05,
                fontWeight: 900,
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              {certificate.name}
            </span>

            <span
              style={{
                marginTop: "8px",
                fontSize: 23,
                fontWeight: 600,
                color: "#93c5fd",
              }}
            >
              {certificate.role}
            </span>
          </div>

          {/*
           * LARGE DETAILS CONTAINER
           *
           * Increased height so contribution, duration and issuer details
           * have enough breathing room.
           */}
          <div
            style={{
              width: "100%",
              height: "178px",
              marginTop: "24px",
              display: "flex",
              gap: "18px",
            }}
          >
            {/* Contribution */}
            <div
              style={{
                flex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                background: "#111c31",
                border: "1px solid #334155",
                padding: "18px 20px",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#3b82f6",
                  letterSpacing: "1.4px",
                }}
              >
                CONTRIBUTION
              </span>

              <span
                style={{
                  marginTop: "9px",
                  fontSize: 19,
                  lineHeight: 1.35,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                {certificate.contribution}
              </span>

              <span
                style={{
                  marginTop: "18px",
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#3b82f6",
                  letterSpacing: "1.4px",
                }}
              >
                RECOGNITION
              </span>

              <span
                style={{
                  marginTop: "8px",
                  fontSize: 14,
                  lineHeight: 1.4,
                  color: "#cbd5e1",
                }}
              >
                Awarded for valuable contributions, dedication, and impact
                within the Lioran Group open-source community.
              </span>
            </div>

            {/* Certificate metadata */}
            <div
              style={{
                width: "390px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "#111c31",
                border: "1px solid #334155",
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: "#3b82f6",
                      letterSpacing: "1.2px",
                    }}
                  >
                    CERTIFICATE ID
                  </span>

                  <span
                    style={{
                      marginTop: "7px",
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    {certificate.certificateId}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    textAlign: "right",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: "#3b82f6",
                      letterSpacing: "1.2px",
                    }}
                  >
                    ISSUE DATE
                  </span>

                  <span
                    style={{
                      marginTop: "7px",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    {certificate.issueDate}
                  </span>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "1px",
                  marginTop: "17px",
                  display: "flex",
                  background: "#334155",
                }}
              />

              <div
                style={{
                  width: "100%",
                  marginTop: "14px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: "#3b82f6",
                    letterSpacing: "1.2px",
                  }}
                >
                  DURATION
                </span>

                <span
                  style={{
                    marginTop: "7px",
                    fontSize: 16,
                    lineHeight: 1.3,
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  {certificate.duration}
                </span>
              </div>

              <div
                style={{
                  width: "100%",
                  marginTop: "14px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: "#3b82f6",
                    letterSpacing: "1.2px",
                  }}
                >
                  SIGNED BY
                </span>

                <span
                  style={{
                    marginTop: "7px",
                    fontSize: 16,
                    lineHeight: 1.25,
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  {certificate.issuedBy}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom verification strip */}
          <div
            style={{
              width: "100%",
              marginTop: "18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: "#64748b",
              }}
            >
              Official certificate issued by Lioran Group
            </span>

            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#93c5fd",
              }}
            >
              lioran.group/verify/{certificate.certificateId}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}