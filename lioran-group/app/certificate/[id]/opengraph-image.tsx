import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-dynamic";

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

function formatIssueDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 3).trim()}...`;
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certificate = await getCertificate(id);

  const palette = {
    paper: "#FAF7F0",
    ink: "#26262E",
    soft: "#5C5C66",
    accent: "#AB8C52",
    accentSoft: "#CAB690",
    panel: "#F2EDE1",
    border: "#BAA67D",
    white: "#FFFDF8",
  };

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
            background: palette.paper,
            padding: "28px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: palette.panel,
              border: `3px solid ${palette.border}`,
              color: palette.ink,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "4px",
                color: palette.accent,
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              Lioran Group
            </div>

            <div
              style={{
                display: "flex",
                fontSize: "54px",
                fontWeight: 800,
              }}
            >
              Certificate Not Found
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "18px",
                fontSize: "22px",
                color: palette.soft,
              }}
            >
              The requested certificate could not be verified.
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

  const contribution = truncateText(certificate.contribution, 210);
  const organization = truncateText(certificate.organization, 70);
  const issuedBy = truncateText(certificate.issuedBy, 65);
  const role = truncateText(certificate.role, 65);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: palette.paper,
          padding: "28px",
          fontFamily: "Arial, sans-serif",
          color: palette.ink,
        }}
      >
        {/* One solid filled certificate boundary */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: palette.panel,
            border: `3px solid ${palette.border}`,
            padding: "38px 48px 34px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "3px",
                  color: palette.accent,
                  textTransform: "uppercase",
                }}
              >
                Certificate of
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "4px",
                  fontSize: "39px",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  color: palette.ink,
                }}
              >
                Achievement
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                maxWidth: "410px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  color: palette.accent,
                  textTransform: "uppercase",
                }}
              >
                Issued by
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "7px",
                  fontSize: "19px",
                  fontWeight: 700,
                  color: palette.ink,
                  textAlign: "right",
                }}
              >
                {organization}
              </div>
            </div>
          </div>

          {/* Recipient */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "17px",
                color: palette.soft,
              }}
            >
              This certificate is proudly presented to
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "9px",
                fontSize: certificate.name.length > 30 ? "43px" : "52px",
                fontWeight: 800,
                lineHeight: 1.05,
                textAlign: "center",
                color: palette.ink,
              }}
            >
              {certificate.name}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "10px",
                fontSize: "23px",
                fontStyle: "italic",
                fontWeight: 600,
                color: palette.accent,
                textAlign: "center",
              }}
            >
              {role}
            </div>

            <div
              style={{
                display: "flex",
                width: "370px",
                height: "1px",
                background: palette.border,
                marginTop: "18px",
              }}
            />
          </div>

          {/* Details containers */}
          <div
            style={{
              display: "flex",
              width: "100%",
              flex: 1,
              marginTop: "22px",
              gap: "22px",
            }}
          >
            {/* Contribution */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minHeight: "150px",
                padding: "20px 24px",
                background: palette.white,
                border: `2px solid ${palette.accentSoft}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  color: palette.accent,
                  textTransform: "uppercase",
                }}
              >
                Contribution
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  fontSize: "19px",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: palette.ink,
                }}
              >
                {contribution}
              </div>
            </div>

            {/* Certificate metadata */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "390px",
                minHeight: "150px",
                padding: "18px 22px",
                background: palette.white,
                border: `2px solid ${palette.accentSoft}`,
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
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
                  <div
                    style={{
                      display: "flex",
                      fontSize: "12px",
                      fontWeight: 800,
                      letterSpacing: "1.5px",
                      color: palette.accent,
                      textTransform: "uppercase",
                    }}
                  >
                    Certificate ID
                  </div>

                  <div
                    style={{
                      display: "flex",
                      marginTop: "6px",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: palette.ink,
                    }}
                  >
                    {certificate.certificateId}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: "12px",
                      fontWeight: 800,
                      letterSpacing: "1.5px",
                      color: palette.accent,
                      textTransform: "uppercase",
                    }}
                  >
                    Issued on
                  </div>

                  <div
                    style={{
                      display: "flex",
                      marginTop: "6px",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: palette.ink,
                    }}
                  >
                    {formatIssueDate(certificate.issueDate)}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "1px",
                  background: palette.accentSoft,
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "1.5px",
                    color: palette.accent,
                    textTransform: "uppercase",
                  }}
                >
                  Duration
                </div>

                <div
                  style={{
                    display: "flex",
                    marginTop: "6px",
                    fontSize: "17px",
                    fontWeight: 700,
                    color: palette.ink,
                  }}
                >
                  {certificate.duration}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginTop: "22px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "540px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "1.8px",
                  color: palette.accent,
                  textTransform: "uppercase",
                }}
              >
                Verification
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "5px",
                  fontSize: "15px",
                  color: palette.soft,
                }}
              >
                Verify this certificate at lioran.group
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                maxWidth: "470px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "1.8px",
                  color: palette.accent,
                  textTransform: "uppercase",
                }}
              >
                Signed by
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "5px",
                  fontSize: "18px",
                  fontWeight: 800,
                  color: palette.ink,
                  textAlign: "right",
                }}
              >
                {issuedBy}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    },
  );
}