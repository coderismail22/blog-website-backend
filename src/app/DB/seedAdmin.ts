import mongoose from "mongoose";
import config from "../config";
import { TAdmin } from "../modules/admin/admin.interface";
import { Admin } from "../modules/admin/admin.model";
import { USER_ROLE } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";

// For Admin Model
const adminData: TAdmin = {
  name: "admin",
  email: config.admin_email as string,
  password: config.admin_password as string,
  role: USER_ROLE.admin,
  phone: "",
};

// For User Model
const adminUserData: TAdmin = {
  name: "admin",
  email: config.admin_email as string,
  password: config.admin_password as string,
  role: USER_ROLE.admin,
  isVerified: true,
  status: "in-progress",
  phone: "",
  isDeleted: false,
};

const seedAdmin = async () => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Check if there is any existing admin user
    const adminUser = await User.findOne({
      role: USER_ROLE.admin,
    }).session(session);
    if (!adminUser) {
      await User.create([adminUserData], { session });
    }

    // Check if there is any existing admin in Admin collection
    const admin = await Admin.findOne({
      role: USER_ROLE.admin,
    }).session(session);
    if (!admin) {
      await Admin.create([adminData], { session });
    }

    // Commit the transaction if all operations are successful
    await session.commitTransaction();
    // console.log("Admin seeded successfully.");
  } catch (error) {
    // Rollback the transaction in case of an error
    await session.abortTransaction();
    // console.error("Error seeding admin:", error);
  } finally {
    // End the session
    session.endSession();
  }
};

export default seedAdmin;
