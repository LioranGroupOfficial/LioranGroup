import mongoose, { Schema, models } from "mongoose";

const CounterSchema = new Schema({
  name: { type: String, unique: true },
  count: { type: Number, default: 0 },
});

export default models.Counter ||
  mongoose.model("Counter", CounterSchema, "count");