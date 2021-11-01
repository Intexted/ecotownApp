import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    calendar: [
      {
        date: { type: Date },
        doctorId: { type: String },
      },
    ],

    status: {
      type: String,
    },
    notifications: [
      {
        notification: String,
      },
    ],
    medical: {
      type: String,
    },
    favouriteVideos: [
      {
        title: { type: String },
        description: { type: String },
        image: { type: String },
      },
    ],
    mobileNo: {
      type: String,
      required: true,
    },

    secret: { type: String },
    image: {
      url: { type: String },
    },
  },

  { timestamps: true }
);

export default mongoose.model("User", userSchema);
