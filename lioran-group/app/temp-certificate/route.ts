import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";

function formatDate(value: Date) {
  return value.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function randomId() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

async function createTempCertificatePdf() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const { width, height } = page.getSize();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const certificateId = randomId();
  const issueDate = new Date("2026-07-16T00:00:00.000Z");
  const startDate = new Date("2025-12-15T00:00:00.000Z");
  const endDate = new Date("2026-01-16T00:00:00.000Z");
  const verifyUrl = `https://lioran.group/verify/${certificateId}`;

  const palette = {
    paper: rgb(0.98, 0.97, 0.94),
    ink: rgb(0.15, 0.15, 0.18),
    soft: rgb(0.36, 0.36, 0.4),
    accent: rgb(0.67, 0.55, 0.32),
    accentSoft: rgb(0.79, 0.71, 0.56),
    panel: rgb(0.95, 0.93, 0.88),
    border: rgb(0.73, 0.65, 0.49),
  };

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
  }: {
    label: string;
    value: string;
    x: number;
    y: number;
    width: number;
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
      size: 11,
      font: fontRegular,
      color: palette.ink,
      lineHeight: 14,
    });
  };

  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: palette.paper,
  });

  page.drawRectangle({
    x: 22,
    y: 22,
    width: width - 44,
    height: height - 44,
    borderWidth: 1.4,
    borderColor: palette.border,
  });

  page.drawRectangle({
    x: 38,
    y: 38,
    width: width - 76,
    height: height - 76,
    borderWidth: 0.8,
    borderColor: palette.accentSoft,
  });

  page.drawRectangle({
    x: 58,
    y: 56,
    width: width - 116,
    height: height - 112,
    color: palette.panel,
    borderWidth: 0.8,
    borderColor: palette.accentSoft,
  });

  centerText("Certificate of Achievement", height - 88, 30, fontBold, palette.ink);
  centerText(
    "This certificate is proudly presented to",
    height - 124,
    15,
    fontRegular,
    palette.soft,
  );
  centerText("Demo Recipient", height - 186, 30, fontBold, palette.ink);
  centerText("Open Source Contributor", height - 226, 16, fontOblique, palette.accent);

  page.drawLine({
    start: { x: 228, y: height - 250 },
    end: { x: width - 228, y: height - 250 },
    thickness: 1,
    color: palette.border,
  });

  const detailsTop = height - 302;
  const detailsBottom = 184;
  const panelHeight = detailsTop - detailsBottom;
  const leftX = 88;
  const leftWidth = 390;
  const rightX = 510;
  const rightWidth = 196;

  page.drawRectangle({
    x: leftX - 14,
    y: detailsBottom,
    width: leftWidth + 28,
    height: panelHeight,
    borderWidth: 0.8,
    borderColor: palette.accentSoft,
  });

  page.drawRectangle({
    x: rightX - 14,
    y: detailsBottom,
    width: rightWidth + 28,
    height: panelHeight,
    borderWidth: 0.8,
    borderColor: palette.accentSoft,
  });

  let leftCursorY = drawLabelValue({
    label: "Contribution",
    value: "Participated in Lioran Group open-source project",
    x: leftX,
    y: detailsTop - 8,
    width: leftWidth,
  });

  leftCursorY -= 10;

  drawLabelValue({
    label: "Description",
    value:
      "This certificate is awarded for valuable contributions to the open-source community under Lioran Group. Your efforts and dedication have made a significant impact.",
    x: leftX,
    y: leftCursorY,
    width: leftWidth,
  });

  let rightCursorY = drawLabelValue({
    label: "Certificate ID",
    value: certificateId,
    x: rightX,
    y: detailsTop - 8,
    width: rightWidth,
  });

  rightCursorY -= 10;

  rightCursorY = drawLabelValue({
    label: "Duration",
    value: `1 month | ${formatDate(startDate)} to ${formatDate(endDate)}`,
    x: rightX,
    y: rightCursorY,
    width: rightWidth,
  });

  rightCursorY -= 10;

  drawLabelValue({
    label: "Issued by",
    value: "Lioran Developer Environment Platform",
    x: rightX,
    y: rightCursorY,
    width: rightWidth,
  });

  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    width: 160,
    margin: 1,
    color: { dark: "#111111", light: "#f7f4ee" },
  });

  const qrBytes = await fetch(qrDataUrl).then((res) => res.arrayBuffer());
  const qrImage = await pdfDoc.embedPng(qrBytes);
  const signaturePath = path.join(process.cwd(), "public", "signs", "cto.png");
  const signatureBytes = await readFile(signaturePath);
  const signatureImage = await pdfDoc.embedPng(signatureBytes);

  const footerY = 34;
  const qrBoxX = 102;
  const qrBoxWidth = 250;
  const qrBoxHeight = 92;
  const signatureBoxWidth = 256;
  const signatureBoxX = width - 102 - signatureBoxWidth;

  page.drawRectangle({
    x: qrBoxX,
    y: footerY,
    width: qrBoxWidth,
    height: qrBoxHeight,
    borderWidth: 0.8,
    borderColor: palette.accentSoft,
  });

  page.drawRectangle({
    x: signatureBoxX,
    y: footerY,
    width: signatureBoxWidth,
    height: qrBoxHeight,
    borderWidth: 0.8,
    borderColor: palette.accentSoft,
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
    color: palette.soft,
  });

  page.drawText("verification page on Lioran Group.", {
    x: qrBoxX + 96,
    y: footerY + 24,
    size: 10,
    font: fontRegular,
    color: palette.soft,
  });

  page.drawImage(signatureImage, {
    x: signatureBoxX + 16,
    y: footerY + 50,
    width: 134,
    height: 34,
  });

  page.drawText("Swaraj Puppalwar", {
    x: signatureBoxX + 16,
    y: footerY + 34,
    size: 11.5,
    font: fontBold,
    color: palette.ink,
  });

  page.drawText("CTO, Lioran Group", {
    x: signatureBoxX + 16,
    y: footerY + 18,
    size: 10.5,
    font: fontRegular,
    color: palette.soft,
  });

  page.drawText(`Issued on ${formatDate(issueDate)}`, {
    x: signatureBoxX + 16,
    y: footerY + 5,
    size: 9.5,
    font: fontRegular,
    color: palette.accent,
  });

  return pdfDoc.save();
}

export async function GET() {
  const pdfBytes = await createTempCertificatePdf();

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="temp-certificate.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
