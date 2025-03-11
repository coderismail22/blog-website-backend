import express from "express";
import { PostControllers } from "./post.controller";
import validateRequest from "../../middlewares/validateRequest";
import { PostValidations } from "./post.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(PostValidations.createPostValidationSchema),
  PostControllers.createPost,
);

router.get("/:slug", PostControllers.getPostBySlug);
router.get(
  "/get-all-category-post/:category(*)",
  PostControllers.getAllPostUnderCategory,
);
router.get("/:postId/similar", PostControllers.getSimilarPosts);
router.get("/", PostControllers.getAllPosts);

router.patch(
  "/:postId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(PostValidations.updatePostValidationSchema),
  PostControllers.updatePost,
);

router.delete(
  "/:postId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  PostControllers.deletePost,
);

export const PostRoutes = router;
