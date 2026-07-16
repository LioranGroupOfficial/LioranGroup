import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Lioran Group Certificate of Achievement";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

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
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

function formatIssueDate(value: string) {
  if (!value) {
    return "Not specified";
  }

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
  if (!value) {
    return "Not specified";
  }

  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trim()}…`;
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certificate = await getCertificate(id);

  const palette = {
    dark: "#222831",
    slate: "#393E46",
    accent: "#948979",
    cream: "#DFD0B8",
    creamSoft: "#EEE7DC",
    muted: "#B8AEA0",
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
            padding: "32px",
            background: palette.dark,
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
              border: `3px solid ${palette.accent}`,
              background: palette.slate,
              color: palette.cream,
            }}
          >
            <span
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "4px",
                color: palette.accent,
                marginBottom: "18px",
              }}
            >
              LIORAN GROUP
            </span>

            <span
              style={{
                display: "flex",
                fontSize: 52,
                fontWeight: 800,
              }}
            >
              Certificate Not Found
            </span>

            <span
              style={{
                display: "flex",
                marginTop: "18px",
                fontSize: 20,
                color: palette.muted,
              }}
            >
              The certificate ID could not be verified.
            </span>
          </div>
        </div>
      ),
      size,
    );
  }

  const issueDate = formatIssueDate(certificate.issueDate);
  const contribution = truncateText(certificate.contribution, 165);
  const organization =
    certificate.organization || "Lioran Group";
  const issuedBy =
    certificate.issuedBy || "Lioran Group";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          padding: "26px",
          background: palette.dark,
          color: palette.cream,
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Single filled certificate boundary */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "38px 46px",
            background: palette.slate,
            border: `3px solid ${palette.accent}`,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
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
              <span
                style={{
                  display: "flex",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "4px",
                  color: palette.accent,
                }}
              >
                CERTIFICATE OF
              </span>

              <span
                style={{
                  display: "flex",
                  marginTop: "5px",
                  fontSize: 35,
                  fontWeight: 900,
                  letterSpacing: "1px",
                  color: palette.cream,
                }}
              >
                ACHIEVEMENT
              </span>
            </div>

            <div
              style={{
                maxWidth: "420px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                textAlign: "right",
              }}
            >
              <span
                style={{
                  display: "flex",
                  fontSize: 14,
                  color: palette.muted,
                  marginBottom: "6px",
                }}
              >
                Issued by
              </span>

              <span
                style={{
                  display: "flex",
                  fontSize: 20,
                  fontWeight: 700,
                  color: palette.cream,
                }}
              >
                {organization}
              </span>
            </div>
          </div>

          {/* Recipient */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "27px",
            }}
          >
            <span
              style={{
                display: "flex",
                fontSize: 17,
                color: palette.muted,
              }}
            >
              This certificate is proudly presented to
            </span>

            <span
              style={{
                display: "flex",
                maxWidth: "1000px",
                marginTop: "8px",
                fontSize: certificate.name.length > 24 ? 47 : 56,
                lineHeight: 1.05,
                fontWeight: 900,
                textAlign: "center",
                color: palette.cream,
              }}
            >
              {certificate.name}
            </span>

            <span
              style={{
                display: "flex",
                marginTop: "9px",
                fontSize: 23,
                fontWeight: 600,
                color: palette.accent,
              }}
            >
              {certificate.role}
            </span>
          </div>

          {/* Large details container */}
          <div
            style={{
              display: "flex",
              width: "100%",
              minHeight: "180px",
              marginTop: "27px",
              padding: "24px 26px",
              background: palette.dark,
              border: `1px solid ${palette.accent}`,
            }}
          >
            {/* Contribution */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                paddingRight: "28px",
                borderRight: `1px solid ${palette.accent}`,
              }}
            >
              <span
                style={{
                  display: "flex",
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: "2px",
                  color: palette.accent,
                }}
              >
                CONTRIBUTION
              </span>

              <span
                style={{
                  display: "flex",
                  marginTop: "11px",
                  fontSize: 20,
                  lineHeight: 1.3,
                  fontWeight: 700,
                  color: palette.cream,
                }}
              >
                {contribution}
              </span>
            </div>

            {/* Certificate metadata */}
            <div
              style={{
                width: "390px",
                display: "flex",
                flexDirection: "column",
                paddingLeft: "28px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
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
                      display: "flex",
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: "1.5px",
                      color: palette.accent,
                    }}
                  >
                    CERTIFICATE ID
                  </span>

                  <span
                    style={{
                      display: "flex",
                      marginTop: "7px",
                      fontSize: 18,
                      fontWeight: 700,
                      color: palette.cream,
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
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: "1.5px",
                      color: palette.accent,
                    }}
                  >
                    ISSUE DATE
                  </span>

                  <span
                    style={{
                      display: "flex",
                      marginTop: "7px",
                      fontSize: 17,
                      fontWeight: 700,
                      color: palette.cream,
                    }}
                  >
                    {issueDate}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "1.5px",
                    color: palette.accent,
                  }}
                >
                  DURATION
                </span>

                <span
                  style={{
                    display: "flex",
                    marginTop: "7px",
                    fontSize: 17,
                    fontWeight: 700,
                    color: palette.cream,
                  }}
                >
                  {certificate.duration || "Not specified"}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "1.5px",
                    color: palette.accent,
                  }}
                >
                  SIGNED BY
                </span>

                <span
                  style={{
                    display: "flex",
                    marginTop: "7px",
                    fontSize: 17,
                    fontWeight: 700,
                    color: palette.cream,
                  }}
                >
                  {issuedBy}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom verification strip */}
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "auto",
              paddingTop: "17px",
            }}
          >
            <span
              style={{
                display: "flex",
                fontSize: 14,
                color: palette.muted,
              }}
            >
              Officially issued and verifiable through Lioran Group
            </span>

            <span
              style={{
                display: "flex",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "1px",
                color: palette.accent,
              }}
            >
              LIORAN.GROUP/VERIFY/{certificate.certificateId}
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}