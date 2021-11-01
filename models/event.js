import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: Date, default: Date.now, required: true },
    image: {
      url: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
