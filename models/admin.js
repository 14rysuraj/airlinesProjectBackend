import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
        select: false,
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", schema);
