import mongoose from "mongoose";

const { Schema } = mongoose;

const departmentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    services: [{ title: { type: String }, description: { type: String } }],
    posts: [
      {
        title: String,
        description: String,
        created: { type: Date, default: Date.now },
      },
    ],
    photos: {
      url: { type: String },
    },
  },

  { timestamps: true }
);

export default mongoose.model("Department", departmentSchema);
