import express from "express";
import { PostControllers } from "./post.controller";
import validateRequest from "../../middlewares/validateRequest";
import { PostValidations } from "./post.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(PostValidations.createPostValidationSchema),
  PostControllers.createPost,
);

router.get("/:slug", PostControllers.getPostBySlug);
router.get(
  "/get-all-category-post/:category",
  PostControllers.getAllPostUnderCategory,
);
router.get("/:postId/similar", PostControllers.getSimilarPosts);
router.get("/", PostControllers.getAllPosts);

router.patch(
  "/:postId",
  validateRequest(PostValidations.updatePostValidationSchema),
  PostControllers.updatePost,
);

router.delete("/:postId", PostControllers.deletePost);

export const PostRoutes = router;
