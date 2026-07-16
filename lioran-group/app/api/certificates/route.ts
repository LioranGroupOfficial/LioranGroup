import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import {
  createCertificate,
  serializeCertificate,
} from "../../lib/certificates";
import Certificate from "../../models/Certificate";

function ensureAdmin(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  return !!adminKey && adminKey === process.env.ADMIN_KEY;
}

export async function GET(req: NextRequest) {
  try {
    if (!ensureAdmin(req)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    await connectDB();

    const certificates = await Certificate.find({})
      .sort({ createdAt: -1 })
      .lean();

    const stats = certificates.reduce(
      (acc, certificate) => {
        acc.total += 1;
        acc[certificate.status] += 1;
        return acc;
      },
      { total: 0, active: 0, suspended: 0, revoked: 0 },
    );

    return NextResponse.json(
      {
        success: true,
        data: certificates.map(serializeCertificate),
        stats,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!ensureAdmin(req)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    await connectDB();

    const body = await req.json();
    const certificate = await createCertificate(body);

    return NextResponse.json(
      {
        success: true,
        message: "Certificate created successfully",
        data: certificate,
      },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json(
      { success: false, message },
      { status: message === "Internal Server Error" ? 500 : 400 },
    );
  }
}
