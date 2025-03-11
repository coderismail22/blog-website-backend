import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const getAllUsersFromDB = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});
const createUserInDB = catchAsync(async (req, res) => {
  const result = await UserServices.createUserInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is created successfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const result = await UserServices.changeStatusIntoDB(id, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Status changed successfully",
    data: result,
  });
});

export const UserControllers = {
  getAllUsersFromDB,
  createUserInDB,
  createAdmin,
  changeStatus,
};
