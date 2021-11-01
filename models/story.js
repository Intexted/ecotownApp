import mongoose from "mongoose";

const { Schema } = mongoose;

const storySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Story", storySchema);
