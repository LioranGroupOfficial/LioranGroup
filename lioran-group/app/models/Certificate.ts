import mongoose, { Schema, Model } from "mongoose";
import { ICertificate } from "../types/certificate";

const CertificateSchema = new Schema<ICertificate>(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
    },

    contribution: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    organization: {
      type: String,
      default: "Lioran Group",
    },

    issuedBy: {
      type: String,
      default: "Lioran Developer Environment Platform",
    },

    issueDate: {
      type: Date,
      default: Date.now,
    },

    verificationUrl: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "suspended", "revoked"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Certificate: Model<ICertificate> =
  mongoose.models.Certificate ||
  mongoose.model<ICertificate>("Certificate", CertificateSchema);

export default Certificate;
