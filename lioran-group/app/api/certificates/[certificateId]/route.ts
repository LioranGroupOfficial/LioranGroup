import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import {
  serializeCertificate,
  updateCertificateRecord,
} from "../../../lib/certificates";
import Certificate from "../../../models/Certificate";

interface Params {
  params: Promise<{
    certificateId: string;
  }>;
}

function ensureAdmin(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  return !!adminKey && adminKey === process.env.ADMIN_KEY;
}

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { certificateId } = await params; // ✅ FIX

    if (!certificateId) {
      return NextResponse.json(
        { success: false, message: "Certificate ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const certificate = await Certificate.findOne({ certificateId }).lean();

    if (!certificate) {
      return NextResponse.json(
        { success: false, message: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        verified: certificate.status === "active",
        data: serializeCertificate(certificate),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  try {
    if (!ensureAdmin(req)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { certificateId } = await params;

    if (!certificateId) {
      return NextResponse.json(
        { success: false, message: "Certificate ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const body = await req.json();
    const certificate = await updateCertificateRecord(certificateId, body);

    if (!certificate) {
      return NextResponse.json(
        { success: false, message: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Certificate updated successfully",
        data: certificate,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json(
      { success: false, message },
      { status: message === "Internal Server Error" ? 500 : 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    if (!ensureAdmin(req)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { certificateId } = await params;

    if (!certificateId) {
      return NextResponse.json(
        { success: false, message: "Certificate ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const deleted = await Certificate.findOneAndDelete({ certificateId });

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Certificate deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
