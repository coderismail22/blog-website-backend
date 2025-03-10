export type TAdmin = {
  name: string;
  password: string;
  profileImg?: string;
  email: string;
  role: "superAdmin" | "admin";
  isVerified?: boolean;
  status?: "in-progress" | "blocked";
  isDeleted?: boolean;
};
