"use client";

import Image from "next/image";
import Link from "next/link";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
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
  });
}

export default function CertificateViewer({ certificate }: Props) {
  function formatStatus(status: string) {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  function getStatusMessage(status: string) {
    if (status === "active") {
      return "This certificate is active and can be verified as a valid issued record.";
    }

    if (status === "suspended") {
      return "This certificate record is still viewable, but it is currently suspended and not considered valid for active verification.";
    }

    return "This certificate record remains available for audit purposes, but it has been revoked and is no longer valid.";
  }

  async function convertSignatureToWhite(src: string): Promise<ArrayBuffer> {
    const img = new window.Image();
    img.src = src;
    await new Promise((resolve) => {
      img.onload = () => resolve(null);
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Canvas is not supported");
    }

    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let index = 0; index < data.length; index += 4) {
      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];
      const alpha = data[index + 3];

      if (alpha > 0 && red < 80 && green < 80 && blue < 80) {
        data[index] = 255;
        data[index + 1] = 255;
        data[index + 2] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        resolve(await blob!.arrayBuffer());
      }, "image/png");
    });
  }

  async function generatePdf() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]);
    const { width, height } = page.getSize();
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    const palette = {
      background: rgb(0.08, 0.09, 0.11),
      panel: rgb(0.14, 0.16, 0.2),
      panelSoft: rgb(0.18, 0.2, 0.25),
      border: rgb(0.61, 0.56, 0.46),
      text: rgb(0.98, 0.98, 0.97),
      textSoft: rgb(0.82, 0.83, 0.85),
      accent: rgb(0.85, 0.76, 0.56),
      accentSoft: rgb(0.73, 0.68, 0.59),
      active: rgb(0.59, 0.84, 0.65),
      suspended: rgb(0.94, 0.76, 0.34),
      revoked: rgb(0.91, 0.51, 0.51),
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
      font: typeof fontRegular,
      color: ReturnType<typeof rgb>,
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
    }: {
      text: string;
      x: number;
      y: number;
      maxWidth: number;
      size: number;
      font: typeof fontRegular;
      color: ReturnType<typeof rgb>;
      lineHeight: number;
    }) => {
      const words = text.split(/\s+/);
      const lines: string[] = [];
      let line = "";

      for (const word of words) {
        const candidate = line ? `${line} ${word}` : word;
        const candidateWidth = font.widthOfTextAtSize(candidate, size);

        if (candidateWidth <= maxWidth) {
          line = candidate;
        } else {
          if (line) {
            lines.push(line);
          }
          line = word;
        }
      }

      if (line) {
        lines.push(line);
      }

      let cursorY = y;

      for (const currentLine of lines) {
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
      size = 12,
      lineHeight = 16,
    }: {
      label: string;
      value: string;
      x: number;
      y: number;
      width: number;
      size?: number;
      lineHeight?: number;
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
        y: y - 20,
        maxWidth: blockWidth,
        size,
        font: fontRegular,
        color: palette.text,
        lineHeight,
      });
    };

    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: palette.background,
    });

    page.drawRectangle({
      x: 18,
      y: 18,
      width: width - 36,
      height: height - 36,
      borderWidth: 1.2,
      borderColor: palette.border,
      color: palette.background,
    });

    page.drawRectangle({
      x: 32,
      y: 32,
      width: width - 64,
      height: height - 64,
      borderWidth: 0.6,
      borderColor: palette.accentSoft,
    });

    const contentX = 54;
    const contentY = 52;
    const contentWidth = width - 108;
    const contentHeight = height - 104;

    page.drawRectangle({
      x: contentX,
      y: contentY,
      width: contentWidth,
      height: contentHeight,
      color: palette.panel,
      borderWidth: 1,
      borderColor: rgb(0.24, 0.26, 0.31),
    });

    centerText("Certificate of Achievement", height - 90, 29, fontBold, palette.text);
    centerText(
      "This certificate is proudly presented to",
      height - 126,
      15,
      fontRegular,
      palette.textSoft,
    );
    centerText(certificate.name, height - 188, 31, fontBold, palette.text);
    centerText(certificate.role, height - 228, 16, fontOblique, palette.accent);

    page.drawLine({
      start: { x: 230, y: height - 254 },
      end: { x: width - 230, y: height - 254 },
      thickness: 1,
      color: palette.border,
    });

    const detailsTop = height - 308;
    const detailsBottom = 182;
    const panelHeight = detailsTop - detailsBottom;
    const leftX = 82;
    const leftWidth = 392;
    const rightX = 508;
    const rightWidth = 212;

    page.drawRectangle({
      x: leftX - 14,
      y: detailsBottom,
      width: leftWidth + 28,
      height: panelHeight,
      color: palette.panelSoft,
      borderWidth: 0.8,
      borderColor: rgb(0.27, 0.29, 0.34),
    });

    page.drawRectangle({
      x: rightX - 14,
      y: detailsBottom,
      width: rightWidth + 28,
      height: panelHeight,
      color: palette.panelSoft,
      borderWidth: 0.8,
      borderColor: rgb(0.27, 0.29, 0.34),
    });

    let leftCursorY = drawLabelValue({
      label: "Contribution",
      value: certificate.contribution,
      x: leftX,
      y: detailsTop - 8,
      width: leftWidth,
      size: 11,
      lineHeight: 15,
    });

    leftCursorY -= 10;

    drawLabelValue({
      label: "Description",
      value: certificate.description,
      x: leftX,
      y: leftCursorY,
      width: leftWidth,
      size: 11,
      lineHeight: 14,
    });

    let rightCursorY = drawLabelValue({
      label: "Certificate ID",
      value: certificate.certificateId,
      x: rightX,
      y: detailsTop - 8,
      width: rightWidth,
      size: 11,
      lineHeight: 15,
    });

    rightCursorY -= 8;

    rightCursorY = drawLabelValue({
      label: "Duration",
      value: `${certificate.duration} | ${formatDate(certificate.startDate)} to ${formatDate(certificate.endDate)}`,
      x: rightX,
      y: rightCursorY,
      width: rightWidth,
      size: 10.5,
      lineHeight: 14,
    });

    rightCursorY -= 8;

    rightCursorY = drawLabelValue({
      label: "Issued by",
      value: certificate.issuedBy,
      x: rightX,
      y: rightCursorY,
      width: rightWidth,
      size: 10.5,
      lineHeight: 14,
    });

    rightCursorY -= 8;

    page.drawText("STATUS", {
      x: rightX,
      y: rightCursorY,
      size: 9,
      font: fontBold,
      color: palette.accent,
    });

    page.drawRectangle({
      x: rightX,
      y: rightCursorY - 22,
      width: 118,
      height: 20,
      color: statusColor,
    });

    page.drawText(formatStatus(certificate.status).toUpperCase(), {
      x: rightX + 12,
      y: rightCursorY - 16,
      size: 10,
      font: fontBold,
      color: palette.background,
    });

    const footerY = 34;
    const qrBoxX = 96;
    const qrBoxWidth = 246;
    const qrBoxHeight = 92;
    const signatureBoxWidth = 248;
    const signatureBoxHeight = 92;
    const signatureBoxX = width - 96 - signatureBoxWidth;

    const qrDataUrl = await QRCode.toDataURL(certificate.verificationUrl, {
      width: 160,
      margin: 1,
      color: { dark: "#ffffff", light: "#1f2937" },
    });

    const qrImageBytes = await fetch(qrDataUrl).then((res) => res.arrayBuffer());
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    const signatureBytes = await convertSignatureToWhite("/signs/cto.png");
    const signatureImage = await pdfDoc.embedPng(signatureBytes);

    page.drawRectangle({
      x: qrBoxX,
      y: footerY,
      width: qrBoxWidth,
      height: qrBoxHeight,
      color: palette.panelSoft,
      borderWidth: 0.8,
      borderColor: rgb(0.27, 0.29, 0.34),
    });

    page.drawRectangle({
      x: signatureBoxX,
      y: footerY,
      width: signatureBoxWidth,
      height: signatureBoxHeight,
      color: palette.panelSoft,
      borderWidth: 0.8,
      borderColor: rgb(0.27, 0.29, 0.34),
    });

    page.drawImage(qrImage, {
      x: qrBoxX + 14,
      y: footerY + 12,
      width: 68,
      height: 68,
    });

    page.drawText("Verify authenticity", {
      x: qrBoxX + 96,
      y: footerY + 58,
      size: 11,
      font: fontBold,
      color: palette.accent,
    });

    page.drawText("Scan to open the official", {
      x: qrBoxX + 96,
      y: footerY + 39,
      size: 10,
      font: fontRegular,
      color: palette.textSoft,
    });

    page.drawText("verification page on Lioran Group.", {
      x: qrBoxX + 96,
      y: footerY + 24,
      size: 10,
      font: fontRegular,
      color: palette.textSoft,
    });

    page.drawImage(signatureImage, {
      x: signatureBoxX + 20,
      y: footerY + 50,
      width: 132,
      height: 34,
    });

    page.drawText("Swaraj Puppalwar", {
      x: signatureBoxX + 20,
      y: footerY + 34,
      size: 11.5,
      font: fontBold,
      color: palette.text,
    });

    page.drawText("CTO, Lioran Group", {
      x: signatureBoxX + 20,
      y: footerY + 18,
      size: 10.5,
      font: fontRegular,
      color: palette.textSoft,
    });

    page.drawText(`Issued on ${formatDate(certificate.issueDate)}`, {
      x: signatureBoxX + 20,
      y: footerY + 5,
      size: 9.5,
      font: fontRegular,
      color: palette.accentSoft,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], {
      type: "application/pdf",
    });

    saveAs(blob, `certificate-${certificate.certificateId}.pdf`);
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
      <div className="page-shell page-grid" style={{ padding: 0 }}>
        <section className="page-intro">
          <span className="eyebrow">
            {isVerified ? "Verified Certificate" : "Certificate Status"}
          </span>
          <h1>{certificate.name}</h1>
          <p>
            {certificate.role} for {certificate.organization}. Certificate ID{" "}
            {certificate.certificateId} is currently{" "}
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
            <Link href={certificate.verificationUrl} className="button-secondary">
              Verify Link
            </Link>
          </div>
        </section>

        <section
          className="card"
          style={{
            padding: 0,
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(34,40,49,0.96), rgba(57,62,70,0.92))",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "48px 40px",
              overflow: "hidden",
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
                style={{ opacity: 0.08 }}
              />
            </div>

            <div style={{ position: "relative", display: "grid", gap: 32 }}>
              <div style={{ textAlign: "center", display: "grid", gap: 10 }}>
                <h2 style={{ margin: 0, fontSize: "clamp(2rem, 5vw, 3rem)" }}>
                  Certificate of Achievement
                </h2>
                <p className="text-soft">
                  This certificate is proudly presented to
                </p>
              </div>

              <div style={{ textAlign: "center", display: "grid", gap: 8 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    fontWeight: 800,
                  }}
                >
                  {certificate.name}
                </p>
                <p style={{ margin: 0, color: "var(--text-soft)", fontSize: "1.1rem" }}>
                  {certificate.role}
                </p>
              </div>

              <div className="card-grid two-column">
                <article className="card">
                  <p style={{ margin: 0 }}>
                    <strong>Contribution</strong>
                  </p>
                  <p style={{ margin: 0 }}>{certificate.contribution}</p>
                </article>
                <article className="card">
                  <p style={{ margin: 0 }}>
                    <strong>Description</strong>
                  </p>
                  <p style={{ margin: 0 }}>{certificate.description}</p>
                </article>
                <article className="card">
                  <p style={{ margin: 0 }}>
                    <strong>Duration</strong>
                  </p>
                  <p style={{ margin: 0 }}>
                    {certificate.duration} from {formatDate(certificate.startDate)} to{" "}
                    {formatDate(certificate.endDate)}
                  </p>
                </article>
                <article className="card">
                  <p style={{ margin: 0 }}>
                    <strong>Issued</strong>
                  </p>
                  <p style={{ margin: 0 }}>
                    {certificate.issuedBy} on {formatDate(certificate.issueDate)}
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
                <div className="card" style={{ gap: 14 }}>
                  <p style={{ margin: 0 }}>
                    <strong>Verification QR</strong>
                  </p>
                  <QRCodeCanvas
                    value={certificate.verificationUrl}
                    size={160}
                    bgColor="#222831"
                    fgColor="#f9fafb"
                    level="H"
                  />
                </div>

                <div style={{ textAlign: "right" }}>
                  <Image
                    src="/signs/cto.png"
                    alt="CTO signature"
                    width={160}
                    height={56}
                    style={{ filter: "invert(1) brightness(1.5)" }}
                  />
                  <p style={{ margin: 0, fontWeight: 700 }}>Swaraj Puppalwar</p>
                  <p style={{ margin: 0, color: "var(--text-muted)" }}>
                    CTO, Lioran Group
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
