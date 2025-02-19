import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BlogPostControllers } from "./blog-post.controller";
import { BlogPostValidations } from "./blog-post.validation";
const router = express.Router();

// Create a blog post
router.post(
  "/",
  validateRequest(BlogPostValidations.createBlogPostValidationSchema),
  BlogPostControllers.createBlogPost,
);
router.get("/", BlogPostControllers.getAllBlogPosts);
router.get("/:id", BlogPostControllers.getBlogPost);
router.patch(
  "/:id",
  validateRequest(BlogPostValidations.updateBlogPostValidationSchema),
  BlogPostControllers.updateBlogPost,
);
router.delete("/:id", BlogPostControllers.deleteBlogPost);

export const BlogPostRoutes = router;
