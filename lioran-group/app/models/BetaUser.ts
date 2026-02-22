import mongoose, { Schema, models } from "mongoose";

const BetaUserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    updates: Boolean,
  },
  { timestamps: true }
);

export default models.BetaUser ||
  mongoose.model("BetaUser", BetaUserSchema, "ldep");