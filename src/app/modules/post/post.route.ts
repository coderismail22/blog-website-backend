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

router.get("/:slug", PostControllers.getPostById);
router.get("/", PostControllers.getAllPosts);

router.patch(
  "/:postId",
  validateRequest(PostValidations.updatePostValidationSchema),
  PostControllers.updatePost,
);

router.delete("/:postId", PostControllers.deletePost);

export const PostRoutes = router;
