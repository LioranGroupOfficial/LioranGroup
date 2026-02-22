import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async (dbName: string = "LioranGroup"): Promise<void> => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: dbName,
    });

    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);
    throw new Error("Database connection failed");
  }
};
