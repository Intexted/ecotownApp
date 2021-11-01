import mongoose from "mongoose";

const { Schema } = mongoose;

const campainSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    conditions: [{ type: String }],
    deadline: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Campain", campainSchema);
