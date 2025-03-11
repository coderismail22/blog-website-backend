import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserValidations } from "./user.validation";
import { AdminValidations } from "../admin/admin.validation";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

// create student
router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin), //TODO: Add a auth role
  UserControllers.getAllUsersFromDB,
);
// create user
router.post(
  "/create-user",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin), //TODO: Add a auth role
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUserInDB,
);

// create admin
router.post(
  "/create-admin",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin), //TODO: Add a auth role
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

// change status
router.post(
  "/change-status/:id",
  auth("admin"),
  validateRequest(UserValidations.changeUserStatusValidationSchema),
  UserControllers.changeStatus,
);

export const UserRoutes = router;
