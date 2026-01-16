import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Certificate from "../../../models/Certificate";

interface Params {
  params: Promise<{
    certificateId: string;
  }>;
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
        data: certificate,
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
