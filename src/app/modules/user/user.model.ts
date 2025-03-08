import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import { STATUS } from "./user.constant";
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0, // makes invisible while finding
    },

    role: {
      type: String,
      enum: ["superAdmin", "student", "user"],
    },
    status: {
      type: String,
      enum: STATUS,
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    // OTP Related Fields
    // verificationCode: String,
    // otpExpiresAt: Date,
    // lastOtpSentAt: Date, // To handle resend delay
    // isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>("User", userSchema);
