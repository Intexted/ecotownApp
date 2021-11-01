import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      url: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
