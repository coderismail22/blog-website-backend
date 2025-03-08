import { USER_ROLE } from "./user.constant";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "superAdmin" | "admin" | "user";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
  // OTP Related Fields
  // verificationCode: string | null;
  // otpExpiresAt: Date | null;
  // lastOtpSentAt: Date; // To handle resend delay
  // isVerified: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
