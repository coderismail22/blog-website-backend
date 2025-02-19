import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogPostServices } from "./blog-post.service";

const createBlogPost = catchAsync(async (req, res) => {
  const result = await BlogPostServices.createBlogPost(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Blog post created successfully.",
    data: result,
  });
});

const getAllBlogPosts = catchAsync(async (req, res) => {
  const result = await BlogPostServices.getAllBlogPosts();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Blog posts retrieved successfully.",
    data: result,
  });
});

const getBlogPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogPostServices.getBlogPost(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Blog post retrieved successfully.",
    data: result,
  });
});

const updateBlogPost = catchAsync(async (req, res) => {
  // TODO: Handle Non-Primitive Fields
  const { id } = req.params;
  const result = await BlogPostServices.updateBlogPost(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Blog post updated successfully.",
    data: result,
  });
});

const deleteBlogPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogPostServices.deleteBlogPost(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Blog post deleted successfully.",
    data: result,
  });
});

export const BlogPostControllers = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
