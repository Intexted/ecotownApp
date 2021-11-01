import mongoose from "mongoose";

const { Schema } = mongoose;

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    subtitle: {
      type: String,
      trim: true,
      required: true,
    },
    ratings: [
      {
        rating: Number,
      },
    ],
    departement: {
      type: String,
      required: true,
    },

    review: [
      {
        name: { type: String },
        image: { type: String },
        rating: { type: Number },
        comment: { type: String },
      },
    ],

    details: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    calendar: [
      {
        date: { type: Date },
        userId: { type: String },
      },
    ],
    slots: [
      {
        startTime: { type: Date },
        endTime: { type: Date },
        status: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
