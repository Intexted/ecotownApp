import mongoose from "mongoose";

const { Schema } = mongoose;

const mediaSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    doctorName: { type: String, required: true },
    doctorDepartment: { type: String, required: true },
    tags: [{ tag: { type: String } }],
    date: { type: Date, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);
