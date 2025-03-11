/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { Admin } from "../admin/admin.model";
import { TAdmin } from "../admin/admin.interface";
import { User } from "./user.model";
import config from "../../config";
import { createToken } from "../auth/auth.utils";

const getAllUsers = async () => {
  const users = await User.find();

  if (!users) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to find users.");
  }

  return users;
};
const createUserInDB = async (payload: Partial<IUser>) => {
  const finalUserData = {
    ...payload,
    role: "user",
  };
  const newUser = await User.create(finalUserData);

  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
  }
  // ✅ Generate tokens just like in login
  const jwtPayload = {
    userId: newUser.id,
    email: newUser.email,
    role: newUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expires_in as string,
  );

  return {
    user: newUser, // Optional: If you need user details in the response
    accessToken,
    refreshToken,
  };
};

const createAdminIntoDB = async (payload: TAdmin) => {
  // create a user object
  const userData: Partial<IUser> = {};
  userData.name = payload.name;
  userData.role = "admin";
  userData.email = payload.email;
  userData.password = payload.password;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // TODO: Generate Dynamic ID
    // TODO: Upload image to Cloudinary using Multer

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    // create an admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      err.message || "Transaction failed",
    );
  }
};

const changeStatusIntoDB = async (id: string, status: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );
  return result;
};

export const UserServices = {
  getAllUsers,
  createUserInDB,
  createAdminIntoDB,
  changeStatusIntoDB,
};
