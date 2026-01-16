import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Certificate from "../../../models/Certificate";

const generateCertificateId = (): string => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

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

    const {
      name,
      role,
      contribution,
      description,
      startDate,
      endDate,
      duration,
    } = body;

    if (
      !name ||
      !role ||
      !contribution ||
      !description ||
      !startDate ||
      !endDate ||
      !duration
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    let certificateId = "";
    let exists = true;

    while (exists) {
      certificateId = generateCertificateId();
      exists = !!(await Certificate.exists({ certificateId }));
    }

    const verificationUrl = `https://lioran.group/verify/${certificateId}`;

    const certificate = await Certificate.create({
      certificateId,
      name,
      role,
      contribution,
      description,
      startDate,
      endDate,
      duration,
      verificationUrl,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Certificate created successfully",
        data: certificate,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
