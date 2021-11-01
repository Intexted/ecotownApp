import mongoose from "mongoose";

const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    date: { type: Date, required: true },
    userId: { type: String, required: true },
    doctorId: { type: String, required: true },
    username: { type: String },
    doctorName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
