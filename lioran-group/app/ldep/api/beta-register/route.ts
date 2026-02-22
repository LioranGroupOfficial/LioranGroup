import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import BetaUser from "../../../models/BetaUser";
import Counter from "../../../models/Counter";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, updates } = await req.json();

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await BetaUser.findOne({ email });

    if (existing) {
      await BetaUser.updateOne(
        { email },
        { firstName, lastName, updates }
      );

      return NextResponse.json({
        success: true,
        updated: true,
        message: "Registration updated",
      });
    }

    const counter = await Counter.findOneAndUpdate(
      { name: "ldep" },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );

    if (counter.count > 100) {
      await Counter.updateOne(
        { name: "ldep" },
        { $inc: { count: -1 } }
      );

      return NextResponse.json(
        {
          success: false,
          message: "Beta access limit reached (100 users)",
        },
        { status: 403 }
      );
    }

    await BetaUser.create({
      firstName,
      lastName,
      email,
      updates,
    });

    return NextResponse.json({
      success: true,
      registered: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}