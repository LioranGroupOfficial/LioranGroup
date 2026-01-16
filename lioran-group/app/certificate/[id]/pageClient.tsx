"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import { useReactToPrint } from "react-to-print";

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

  // Ensure component is mounted (avoids react-to-print errors)
  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrint = useReactToPrint({
    content: () => printRef.current || null, // return null if ref not ready
    documentTitle: `Certificate_${certificate.name}`,
    removeAfterPrint: true,
  });

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
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Certificate of Achievement</h1>
            <p className="text-gray-400 text-lg">
              This certificate is proudly presented to
            </p>
          </div>

          {/* Recipient */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold">{certificate.name}</h2>
            <p className="text-xl text-gray-300">{certificate.role}</p>
          </div>

          {/* Certificate Details */}
          <div className="mb-8 space-y-4">
            <p><strong>Contribution:</strong> {certificate.contribution}</p>
            {certificate.description && <p><strong>Description:</strong> {certificate.description}</p>}
            <p><strong>Organization:</strong> {certificate.organization}</p>
            <p><strong>Duration:</strong> {certificate.duration} ({certificate.startDate} - {certificate.endDate})</p>
            <p><strong>Issued By:</strong> {certificate.issuedBy} on {certificate.issueDate}</p>
          </div>

          {/* QR + Signature aligned left/right */}
          <div className="flex justify-between items-start mt-10">
            {/* QR Code on left */}
            <div>
              <QRCodeCanvas
                value={certificate.verificationUrl}
                size={150}
                bgColor="#1f2937"
                fgColor="#ffffff"
                level="H"
              />
            </div>

            {/* Signature on right */}
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
          onClick={() => mounted && handlePrint?.()}
          disabled={!mounted || !printRef.current}
          className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Print Certificate
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
