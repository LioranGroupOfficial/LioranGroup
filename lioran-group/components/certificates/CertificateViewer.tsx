"use client";

import Image from "next/image";
import Link from "next/link";
import {
  PDFDocument,
  rgb,
  StandardFonts,
  type PDFFont,
  type RGB,
} from "pdf-lib";
import { saveAs } from "file-saver";
import QRCode from "qrcode";
import { QRCodeCanvas } from "qrcode.react";
import type { CertificateRecord } from "@/app/types/certificate";

type Props = {
  certificate: CertificateRecord;
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function getStatusMessage(status: string) {
  if (status === "active") {
    return "This certificate is active and can be verified as a valid issued record.";
  }

  if (status === "suspended") {
    return "This certificate record is still viewable, but it is currently suspended and is not considered valid for active verification.";
  }

  return "This certificate record remains available for audit purposes, but it has been revoked and is no longer valid.";
}

function dataUrlToArrayBuffer(dataUrl: string): ArrayBuffer {
  const base64 = dataUrl.split(",")[1];

  if (!base64) {
    throw new Error("Invalid image data URL.");
  }

  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer;
}

async function loadImageAsArrayBuffer(src: string): Promise<ArrayBuffer> {
  const response = await fetch(src, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load image: ${src}`);
  }

  return response.arrayBuffer();
}

export default function CertificateViewer({ certificate }: Props) {
  async function generatePdf() {
    try {
      const pdfDoc = await PDFDocument.create();

      /*
       * A4-style landscape certificate.
       */
      const page = pdfDoc.addPage([842, 595]);
      const { width, height } = page.getSize();

      const fontBold = await pdfDoc.embedFont(
        StandardFonts.HelveticaBold,
      );

      const fontRegular = await pdfDoc.embedFont(
        StandardFonts.Helvetica,
      );

      const fontOblique = await pdfDoc.embedFont(
        StandardFonts.HelveticaOblique,
      );

      /*
       * Light premium palette.
       */
      const palette = {
        paper: rgb(0.98, 0.97, 0.94),
        ink: rgb(0.15, 0.15, 0.18),
        soft: rgb(0.36, 0.36, 0.4),
        accent: rgb(0.67, 0.55, 0.32),
        accentSoft: rgb(0.79, 0.71, 0.56),
        panel: rgb(0.95, 0.93, 0.88),
        panelSoft: rgb(0.975, 0.965, 0.935),
        border: rgb(0.73, 0.65, 0.49),
        active: rgb(0.34, 0.56, 0.37),
        suspended: rgb(0.73, 0.52, 0.16),
        revoked: rgb(0.68, 0.25, 0.25),
      };

      const statusColor =
        certificate.status === "active"
          ? palette.active
          : certificate.status === "suspended"
            ? palette.suspended
            : palette.revoked;

      const centerText = (
        text: string,
        y: number,
        size: number,
        font: PDFFont,
        color: RGB,
      ) => {
        const textWidth = font.widthOfTextAtSize(text, size);

        page.drawText(text, {
          x: (width - textWidth) / 2,
          y,
          size,
          font,
          color,
        });
      };

      const drawWrappedText = ({
        text,
        x,
        y,
        maxWidth,
        size,
        font,
        color,
        lineHeight,
        maxLines,
      }: {
        text: string;
        x: number;
        y: number;
        maxWidth: number;
        size: number;
        font: PDFFont;
        color: RGB;
        lineHeight: number;
        maxLines?: number;
      }) => {
        const words = text.trim().split(/\s+/);
        const lines: string[] = [];

        let line = "";

        for (const word of words) {
          const candidate = line ? `${line} ${word}` : word;
          const candidateWidth = font.widthOfTextAtSize(
            candidate,
            size,
          );

          if (candidateWidth <= maxWidth) {
            line = candidate;
            continue;
          }

          if (line) {
            lines.push(line);
          }

          line = word;
        }

        if (line) {
          lines.push(line);
        }

        let visibleLines = lines;

        if (maxLines && lines.length > maxLines) {
          visibleLines = lines.slice(0, maxLines);

          const lastLineIndex = visibleLines.length - 1;
          let lastLine = visibleLines[lastLineIndex];

          while (
            font.widthOfTextAtSize(`${lastLine}...`, size) >
              maxWidth &&
            lastLine.length > 0
          ) {
            lastLine = lastLine.slice(0, -1);
          }

          visibleLines[lastLineIndex] = `${lastLine.trim()}...`;
        }

        let cursorY = y;

        for (const currentLine of visibleLines) {
          page.drawText(currentLine, {
            x,
            y: cursorY,
            size,
            font,
            color,
          });

          cursorY -= lineHeight;
        }

        return cursorY;
      };

      const drawLabelValue = ({
        label,
        value,
        x,
        y,
        width: blockWidth,
        size = 11,
        lineHeight = 14,
        maxLines,
      }: {
        label: string;
        value: string;
        x: number;
        y: number;
        width: number;
        size?: number;
        lineHeight?: number;
        maxLines?: number;
      }) => {
        page.drawText(label.toUpperCase(), {
          x,
          y,
          size: 9,
          font: fontBold,
          color: palette.accent,
        });

        return drawWrappedText({
          text: value,
          x,
          y: y - 19,
          maxWidth: blockWidth,
          size,
          font: fontRegular,
          color: palette.ink,
          lineHeight,
          maxLines,
        });
      };

      /*
       * ONE FILLED OUTER BOUNDARY
       *
       * No extra nested page borders.
       */
      const boundaryMargin = 20;

      page.drawRectangle({
        x: boundaryMargin,
        y: boundaryMargin,
        width: width - boundaryMargin * 2,
        height: height - boundaryMargin * 2,
        color: palette.panel,
        borderWidth: 1.5,
        borderColor: palette.border,
      });

      /*
       * Certificate heading.
       */
      centerText(
        "Certificate of Achievement",
        height - 66,
        29,
        fontBold,
        palette.ink,
      );

      centerText(
        "This certificate is proudly presented to",
        height - 99,
        14,
        fontRegular,
        palette.soft,
      );

      centerText(
        certificate.name,
        height - 147,
        29,
        fontBold,
        palette.ink,
      );

      centerText(
        certificate.role,
        height - 181,
        15.5,
        fontOblique,
        palette.accent,
      );

      page.drawLine({
        start: {
          x: 228,
          y: height - 203,
        },
        end: {
          x: width - 228,
          y: height - 203,
        },
        thickness: 1,
        color: palette.border,
      });

      /*
       * LARGE DETAILS SECTION
       *
       * Height:
       * 352 - 183 = 169 points
       *
       * This is significantly taller than the previous version.
       */
      const detailsTop = 352;
      const detailsBottom = 183;
      const detailsHeight = detailsTop - detailsBottom;

      const leftX = 72;
      const leftWidth = 410;

      const rightX = 518;
      const rightWidth = 220;

      page.drawRectangle({
        x: leftX - 12,
        y: detailsBottom,
        width: leftWidth + 24,
        height: detailsHeight + 60,
        color: palette.panelSoft,
        borderWidth: 0.8,
        borderColor: palette.accentSoft,
      });

      page.drawRectangle({
        x: rightX - 12,
        y: detailsBottom,
        width: rightWidth + 24,
        height: detailsHeight + 60,
        color: palette.panelSoft,
        borderWidth: 0.8,
        borderColor: palette.accentSoft,
      });

      /*
       * Left details.
       */
      let leftCursorY = drawLabelValue({
        label: "Contribution",
        value: certificate.contribution,
        x: leftX,
        y: detailsTop - 19,
        width: leftWidth,
        size: 11,
        lineHeight: 14,
        maxLines: 2,
      });

      leftCursorY -= 13;

      drawLabelValue({
        label: "Description",
        value: certificate.description,
        x: leftX,
        y: leftCursorY,
        width: leftWidth,
        size: 10.5,
        lineHeight: 13.5,
        maxLines: 5,
      });

      /*
       * Right details.
       */
      let rightCursorY = drawLabelValue({
        label: "Certificate ID",
        value: certificate.certificateId,
        x: rightX,
        y: detailsTop - 19,
        width: rightWidth,
        size: 10.5,
        lineHeight: 14,
        maxLines: 1,
      });

      rightCursorY -= 10;

      rightCursorY = drawLabelValue({
        label: "Duration",
        value: `${certificate.duration} | ${formatDate(
          certificate.startDate,
        )} to ${formatDate(certificate.endDate)}`,
        x: rightX,
        y: rightCursorY,
        width: rightWidth,
        size: 10,
        lineHeight: 13,
        maxLines: 3,
      });

      rightCursorY -= 10;

      rightCursorY = drawLabelValue({
        label: "Issued by",
        value: certificate.issuedBy,
        x: rightX,
        y: rightCursorY,
        width: rightWidth,
        size: 10,
        lineHeight: 13,
        maxLines: 2,
      });

      rightCursorY -= 9;

      /*
       * Status label and badge.
       */
      page.drawText("STATUS", {
        x: rightX,
        y: rightCursorY,
        size: 9,
        font: fontBold,
        color: palette.accent,
      });

      const statusText = formatStatus(
        certificate.status,
      ).toUpperCase();

      const statusTextWidth = fontBold.widthOfTextAtSize(
        statusText,
        9.5,
      );

      const statusBadgeWidth = Math.max(
        94,
        statusTextWidth + 24,
      );
      const statusBadgeHeight = 23;

      page.drawRectangle({
        x: rightX,
        y: rightCursorY - 27,
        width: statusBadgeWidth,
        height: statusBadgeHeight,
        color: statusColor,
      });

      page.drawText(statusText, {
        x:
          rightX +
          (statusBadgeWidth - statusTextWidth) / 2,
        y: rightCursorY - 19.5,
        size: 9.5,
        font: fontBold,
        color: palette.paper,
      });

      /*
       * Generate QR from real verification URL.
       */
      const qrDataUrl = await QRCode.toDataURL(
        certificate.verificationUrl,
        {
          width: 180,
          margin: 1,
          errorCorrectionLevel: "H",
          color: {
            dark: "#26262e",
            light: "#f8f5ed",
          },
        },
      );

      const qrImageBytes = dataUrlToArrayBuffer(qrDataUrl);
      const qrImage = await pdfDoc.embedPng(qrImageBytes);

      /*
       * Load original dark signature.
       */
      const signatureBytes = await loadImageAsArrayBuffer(
        "/signs/cto.png",
      );

      const signatureImage = await pdfDoc.embedPng(
        signatureBytes,
      );

      /*
       * Footer boxes.
       */
      const footerY = 43;
      const footerHeight = 103;

      const qrBoxX = 88;
      const qrBoxWidth = 272;

      const signatureBoxWidth = 264;
      const signatureBoxX =
        width - 88 - signatureBoxWidth;

      page.drawRectangle({
        x: qrBoxX,
        y: footerY,
        width: qrBoxWidth,
        height: footerHeight,
        color: palette.panelSoft,
        borderWidth: 0.8,
        borderColor: palette.accentSoft,
      });

      page.drawRectangle({
        x: signatureBoxX,
        y: footerY,
        width: signatureBoxWidth,
        height: footerHeight,
        color: palette.panelSoft,
        borderWidth: 0.8,
        borderColor: palette.accentSoft,
      });

      /*
       * QR section.
       */
      page.drawImage(qrImage, {
        x: qrBoxX + 14,
        y: footerY + 16,
        width: 72,
        height: 72,
      });

      page.drawText("Verify authenticity", {
        x: qrBoxX + 100,
        y: footerY + 67,
        size: 11,
        font: fontBold,
        color: palette.accent,
      });

      page.drawText("Scan to open the official", {
        x: qrBoxX + 100,
        y: footerY + 47,
        size: 9.7,
        font: fontRegular,
        color: palette.soft,
      });

      page.drawText("certificate verification page", {
        x: qrBoxX + 100,
        y: footerY + 32,
        size: 9.7,
        font: fontRegular,
        color: palette.soft,
      });

      page.drawText("on Lioran Group.", {
        x: qrBoxX + 100,
        y: footerY + 17,
        size: 9.7,
        font: fontRegular,
        color: palette.soft,
      });

      /*
       * Signature section.
       */
      page.drawImage(signatureImage, {
        x: signatureBoxX + 18,
        y: footerY + 58,
        width: 138,
        height: 34,
      });

      page.drawText("Swaraj Puppalwar", {
        x: signatureBoxX + 18,
        y: footerY + 42,
        size: 11.5,
        font: fontBold,
        color: palette.ink,
      });

      page.drawText("CTO, Lioran Group", {
        x: signatureBoxX + 18,
        y: footerY + 26,
        size: 10.2,
        font: fontRegular,
        color: palette.soft,
      });

      page.drawText(
        `Issued on ${formatDate(certificate.issueDate)}`,
        {
          x: signatureBoxX + 18,
          y: footerY + 11,
          size: 9.3,
          font: fontRegular,
          color: palette.accent,
        },
      );

      /*
       * PDF metadata.
       */
      pdfDoc.setTitle(
        `Certificate of Achievement - ${certificate.name}`,
      );

      pdfDoc.setSubject(
        `Certificate ${certificate.certificateId} issued by ${certificate.issuedBy}`,
      );

      pdfDoc.setAuthor("Lioran Group");
      pdfDoc.setCreator("Lioran Group Certificate System");
      pdfDoc.setProducer("Lioran Group");

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });

      saveAs(
        blob,
        `certificate-${certificate.certificateId}.pdf`,
      );
    } catch (error) {
      console.error("Failed to generate certificate PDF:", error);

      window.alert(
        "The certificate PDF could not be generated. Please try again.",
      );
    }
  }

  const isVerified = certificate.status === "active";
  const statusMessage = getStatusMessage(certificate.status);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(148,137,121,0.22), transparent 40%), var(--bg)",
        padding: "48px 16px 80px",
      }}
    >
      <div
        className="page-shell page-grid"
        style={{ padding: 0 }}
      >
        <section className="page-intro">
          <span className="eyebrow">
            {isVerified
              ? "Verified Certificate"
              : "Certificate Status"}
          </span>

          <h1>{certificate.name}</h1>

          <p>
            {certificate.role} for {certificate.organization}.
            Certificate ID {certificate.certificateId} is
            currently{" "}
            <strong style={{ textTransform: "capitalize" }}>
              {formatStatus(certificate.status)}
            </strong>
            .
          </p>

          <p style={{ marginTop: 0 }}>{statusMessage}</p>

          <div className="button-row">
            <button
              type="button"
              className="button-primary"
              onClick={generatePdf}
            >
              Download PDF
            </button>

            <Link
              href={certificate.verificationUrl}
              className="button-secondary"
            >
              Verify Link
            </Link>
          </div>
        </section>

        <section
          className="card"
          style={{
            padding: 0,
            overflow: "hidden",
            background: "#222831",
            border: "1px solid #948979",
            borderRadius: 4,
            color: "#f8f5ed",
            boxShadow: "0 24px 70px rgba(0, 0, 0, 0.28)",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "52px 42px",
              overflow: "hidden",
              background:
                "linear-gradient(135deg, #222831 0%, #2b313a 52%, #393e46 100%)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <Image
                src="/logo-removebg.png"
                alt="Lioran watermark"
                width={420}
                height={420}
                style={{
                  opacity: 0.055,
                  filter: "grayscale(1) brightness(2)",
                }}
              />
            </div>

            <div
              style={{
                position: "relative",
                display: "grid",
                gap: 32,
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  display: "grid",
                  gap: 10,
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    color: "#f8f5ed",
                  }}
                >
                  Certificate of Achievement
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#c7c4bd",
                  }}
                >
                  This certificate is proudly presented to
                </p>
              </div>

              <div
                style={{
                  textAlign: "center",
                  display: "grid",
                  gap: 8,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    fontWeight: 800,
                    color: "#f8f5ed",
                  }}
                >
                  {certificate.name}
                </p>

                <p
                  style={{
                    margin: 0,
                    color: "#dfd0b8",
                    fontSize: "1.1rem",
                    fontStyle: "italic",
                  }}
                >
                  {certificate.role}
                </p>
              </div>

              <div
                style={{
                  width: "min(360px, 75%)",
                  height: 1,
                  margin: "0 auto",
                  background: "#948979",
                  opacity: 0.85,
                }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 16,
                }}
              >
                <article
                  style={{
                    minHeight: 140,
                    padding: 22,
                    background: "rgba(57, 62, 70, 0.78)",
                    border: "1px solid rgba(148, 137, 121, 0.62)",
                    borderRadius: 4,
                    display: "grid",
                    alignContent: "start",
                    gap: 10,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#dfd0b8",
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Contribution
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color: "#f1eee8",
                      lineHeight: 1.65,
                    }}
                  >
                    {certificate.contribution}
                  </p>
                </article>

                <article
                  style={{
                    minHeight: 140,
                    padding: 22,
                    background: "rgba(57, 62, 70, 0.78)",
                    border: "1px solid rgba(148, 137, 121, 0.62)",
                    borderRadius: 4,
                    display: "grid",
                    alignContent: "start",
                    gap: 10,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#dfd0b8",
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Description
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color: "#f1eee8",
                      lineHeight: 1.65,
                    }}
                  >
                    {certificate.description}
                  </p>
                </article>

                <article
                  style={{
                    minHeight: 120,
                    padding: 22,
                    background: "rgba(57, 62, 70, 0.78)",
                    border: "1px solid rgba(148, 137, 121, 0.62)",
                    borderRadius: 4,
                    display: "grid",
                    alignContent: "start",
                    gap: 10,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#dfd0b8",
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Duration
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color: "#f1eee8",
                      lineHeight: 1.65,
                    }}
                  >
                    {certificate.duration} from{" "}
                    {formatDate(certificate.startDate)} to{" "}
                    {formatDate(certificate.endDate)}
                  </p>
                </article>

                <article
                  style={{
                    minHeight: 120,
                    padding: 22,
                    background: "rgba(57, 62, 70, 0.78)",
                    border: "1px solid rgba(148, 137, 121, 0.62)",
                    borderRadius: 4,
                    display: "grid",
                    alignContent: "start",
                    gap: 10,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#dfd0b8",
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Issued
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color: "#f1eee8",
                      lineHeight: 1.65,
                    }}
                  >
                    {certificate.issuedBy} on{" "}
                    {formatDate(certificate.issueDate)}
                  </p>
                </article>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  gap: 24,
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    padding: 20,
                    background: "rgba(57, 62, 70, 0.78)",
                    border: "1px solid rgba(148, 137, 121, 0.62)",
                    borderRadius: 4,
                    display: "grid",
                    gap: 14,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      color: "#f8f5ed",
                    }}
                  >
                    Verification QR
                  </p>

                  <QRCodeCanvas
                    value={certificate.verificationUrl}
                    size={160}
                    bgColor="#393e46"
                    fgColor="#f8f5ed"
                    level="H"
                  />
                </div>

                <div
                  style={{
                    textAlign: "right",
                    padding: "12px 0",
                  }}
                >
                  <Image
                    src="/signs/cto.png"
                    alt="CTO signature"
                    width={160}
                    height={56}
                    style={{
                      objectFit: "contain",
                      filter: "invert(1) brightness(1.45)",
                    }}
                  />

                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      color: "#f8f5ed",
                    }}
                  >
                    Swaraj Puppalwar
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color: "#c7c4bd",
                    }}
                  >
                    CTO, Lioran Group
                  </p>

                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "#dfd0b8",
                      fontSize: "0.9rem",
                    }}
                  >
                    Issued on{" "}
                    {formatDate(certificate.issueDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
