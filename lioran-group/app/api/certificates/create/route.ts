import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import { createCertificate } from "../../../lib/certificates";

export async function POST(req: NextRequest) {
  try {
    const adminKey = req.headers.get("x-admin-key");

    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    await connectDB();
    const certificate = await createCertificate(body);

    return NextResponse.json(
      {
        success: true,
        message: "Certificate created successfully",
        data: certificate,
      },
      { status: 201 }
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
