import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryControllers } from "./category.controller";
import { CategoryValidations } from "./category.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-category",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);

router.get("/:categoryId", CategoryControllers.getCategory);
router.get("/", CategoryControllers.getAllCategories);

router.patch(
  "/update-category/:categoryId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CategoryValidations.updateCategoryValidationSchema),
  CategoryControllers.updateCategory,
);

router.delete(
  "/:categoryId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  CategoryControllers.deleteCategory,
);

export const CategoryRoutes = router;
