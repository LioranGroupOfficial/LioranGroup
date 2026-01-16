"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import QRCode from "qrcode";
import { QRCodeCanvas } from "qrcode.react";

interface Certificate {
  _id: string;
  certificateId: string;
  name: string;
  role: string;
  contribution: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: string;
  organization: string;
  issuedBy: string;
  issueDate: string;
  verificationUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  certificate: Certificate;
}

export default function CertificatePageClient({ certificate }: Props) {
  const printRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const convertSignatureToWhite = async (src: string): Promise<ArrayBuffer> => {
    const img = new window.Image();
    img.src = src;
    await new Promise((res) => (img.onload = res));

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Detect dark pixels (black signature)
      if (a > 0 && r < 80 && g < 80 && b < 80) {
        data[i] = 255;     // R
        data[i + 1] = 255; // G
        data[i + 2] = 255; // B
      }
    }

    ctx.putImageData(imageData, 0, 0);

    return await new Promise((resolve) =>
      canvas.toBlob(async (blob) => {
        resolve(await blob!.arrayBuffer());
      }, "image/png")
    );
  };


  const generatePdf = async () => {
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([842, 595]); // Landscape A4
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Background color (optional)
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: rgb(0.05, 0.05, 0.05),
    });

    // Header
    page.drawText("Certificate of Achievement", {
      x: width / 2 - 180,
      y: height - 100,
      size: 32,
      font,
      color: rgb(1, 1, 1),
    });
    page.drawText("This certificate is proudly presented to", {
      x: width / 2 - 180,
      y: height - 140,
      size: 16,
      font: fontRegular,
      color: rgb(0.8, 0.8, 0.8),
    });

    // Recipient Name & Role
    page.drawText(certificate.name, {
      x: width / 2 - 150,
      y: height - 180,
      size: 28,
      font,
      color: rgb(1, 1, 1),
    });
    page.drawText(certificate.role, {
      x: width / 2 - 150,
      y: height - 210,
      size: 20,
      font: fontRegular,
      color: rgb(0.8, 0.8, 0.8),
    });

    // Certificate details
    let detailY = height - 250;
    const lineHeight = 20;

    const details = [
      `Contribution: ${certificate.contribution}`,
      certificate.description ? `Description: ${certificate.description}` : null,
      `Organization: ${certificate.organization}`,
      `Duration: ${certificate.duration} (${certificate.startDate} - ${certificate.endDate})`,
      `Issued By: ${certificate.issuedBy} on ${certificate.issueDate}`,
    ].filter(Boolean) as string[];

    details.forEach((line) => {
      page.drawText(line, {
        x: 50,
        y: detailY,
        size: 14,
        font: fontRegular,
        color: rgb(1, 1, 1),
      });
      detailY -= lineHeight;
    });

    // Generate QR Code as data URL using 'qrcode' library
    const qrDataUrl = await QRCode.toDataURL(certificate.verificationUrl, {
      width: 150,
      margin: 1,
      color: {
        dark: "#ffffff",
        light: "#1f2937",
      },
    });

    const qrImageBytes = await fetch(qrDataUrl).then((res) => res.arrayBuffer());
    const qrImage = await pdfDoc.embedPng(qrImageBytes);

    page.drawImage(qrImage, {
      x: 50,
      y: 50,
      width: 150,
      height: 150,
    });

    // Signature Image
    const signatureBytes = await convertSignatureToWhite("/signs/cto.png");
    const signatureImage = await pdfDoc.embedPng(signatureBytes);


    // Draw signature with a white tint to make it visible on a black background
    page.drawImage(signatureImage, {
      x: width - 200,
      y: 50,
      width: 150,
      height: 50,
    });

    page.drawText("Swaraj Puppalwar", {
      x: width - 200,
      y: 40,
      size: 14,
      font: fontRegular,
      color: rgb(1, 1, 1),
    });

    page.drawText("CTO, Lioran Group", {
      x: width - 200,
      y: 25,
      size: 12,
      font: fontRegular,
      color: rgb(0.8, 0.8, 0.8),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
    saveAs(blob, `Certificate_${certificate.name}.pdf`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6 space-y-6">
      {/* Certificate Preview */}
      <div
        ref={printRef}
        className="relative max-w-3xl w-full bg-gray-900 text-white shadow-xl rounded-3xl border border-gray-700 p-10 overflow-hidden"
      >
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/logo-removebg.png"
            alt="Watermark"
            width={500}
            height={500}
            className="opacity-10"
          />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Certificate of Achievement</h1>
            <p className="text-gray-400 text-lg">
              This certificate is proudly presented to
            </p>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold">{certificate.name}</h2>
            <p className="text-xl text-gray-300">{certificate.role}</p>
          </div>

          <div className="mb-8 space-y-4">
            <p>
              <strong>Contribution:</strong> {certificate.contribution}
            </p>
            {certificate.description && (
              <p>
                <strong>Description:</strong> {certificate.description}
              </p>
            )}
            <p>
              <strong>Organization:</strong> {certificate.organization}
            </p>
            <p>
              <strong>Duration:</strong> {certificate.duration} (
              {certificate.startDate} - {certificate.endDate})
            </p>
            <p>
              <strong>Issued By:</strong> {certificate.issuedBy} on{" "}
              {certificate.issueDate}
            </p>
          </div>

          <div className="flex justify-between items-start mt-10">
            <div>
              <QRCodeCanvas
                value={certificate.verificationUrl}
                size={150}
                bgColor="#1f2937"
                fgColor="#ffffff"
                level="H"
              />
            </div>

            <div className="text-right">
              <Image
                src="/signs/cto.png"
                alt="CTO Signature"
                width={150}
                height={50}
                className="mb-2 filter invert brightness-200"
              />
              <p className="font-semibold">Swaraj Puppalwar</p>
              <p className="text-gray-400 text-sm">CTO, Lioran Group</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <button
          onClick={generatePdf}
          disabled={!mounted}
          className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download PDF
        </button>

        <a
          href={certificate.verificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Verify Certificate
        </a>
      </div>
    </div>
  );
}
