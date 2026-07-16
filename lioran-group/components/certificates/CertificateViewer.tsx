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

    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: rgb(0.05, 0.05, 0.05),
    });

    page.drawText("Certificate of Achievement", {
      x: width / 2 - 200,
      y: height - 100,
      size: 30,
      font: fontBold,
      color: rgb(1, 1, 1),
    });

    page.drawText("This certificate is proudly presented to", {
      x: width / 2 - 180,
      y: height - 136,
      size: 16,
      font: fontRegular,
      color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText(certificate.name, {
      x: 120,
      y: height - 182,
      size: 28,
      font: fontBold,
      color: rgb(1, 1, 1),
    });

    page.drawText(certificate.role, {
      x: 120,
      y: height - 214,
      size: 18,
      font: fontRegular,
      color: rgb(0.85, 0.85, 0.85),
    });

    const contentLines = [
      `Contribution: ${certificate.contribution}`,
      `Description: ${certificate.description}`,
      `Duration: ${certificate.duration} (${formatDate(certificate.startDate)} - ${formatDate(certificate.endDate)})`,
      `Issued by: ${certificate.issuedBy}`,
      `Issue date: ${formatDate(certificate.issueDate)}`,
      `Status: ${certificate.status.toUpperCase()}`,
    ];

    let cursorY = height - 270;

    for (const line of contentLines) {
      page.drawText(line, {
        x: 60,
        y: cursorY,
        size: 14,
        font: fontRegular,
        color: rgb(1, 1, 1),
        maxWidth: width - 120,
      });
      cursorY -= 26;
    }

    const qrDataUrl = await QRCode.toDataURL(certificate.verificationUrl, {
      width: 150,
      margin: 1,
      color: { dark: "#ffffff", light: "#1f2937" },
    });

    const qrImageBytes = await fetch(qrDataUrl).then((res) => res.arrayBuffer());
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    const signatureBytes = await convertSignatureToWhite("/signs/cto.png");
    const signatureImage = await pdfDoc.embedPng(signatureBytes);

    page.drawImage(qrImage, {
      x: 60,
      y: 60,
      width: 120,
      height: 120,
    });

    page.drawImage(signatureImage, {
      x: width - 210,
      y: 76,
      width: 160,
      height: 52,
    });

    page.drawText("Swaraj Puppalwar", {
      x: width - 210,
      y: 58,
      size: 14,
      font: fontRegular,
      color: rgb(1, 1, 1),
    });

    page.drawText("CTO, Lioran Group", {
      x: width - 210,
      y: 42,
      size: 12,
      font: fontRegular,
      color: rgb(0.8, 0.8, 0.8),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], {
      type: "application/pdf",
    });

    saveAs(blob, `certificate-${certificate.certificateId}.pdf`);
  }

  const isVerified = certificate.status === "active";

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
              {certificate.status}
            </strong>
            .
          </p>
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
