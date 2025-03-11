import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PostServices } from "./post.service";
import AppError from "../../errors/AppError";

const createPost = catchAsync(async (req: Request, res: Response) => {
  const result = await PostServices.createPostInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Post created successfully",
    data: result,
  });
});

const getPostBySlug = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await PostServices.getPostFromDB(slug);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getPostsByQuery = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query.q as string;
  if (!query) {
    new AppError(httpStatus.BAD_REQUEST, "Please provide a search query");
  }
  const result = await PostServices.getPostsByQueryFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});
const getAllPostUnderCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { category } = req.params;
    const result = await PostServices.getAllPostUnderCategory(category);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  },
);

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await PostServices.getAllPostsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const getSimilarPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await PostServices.getSimilarPostsFromDB(req.params.postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const result = await PostServices.updatePostInDB(req.params.postId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post updated successfully",
    data: result,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  await PostServices.deletePostFromDB(req.params.postId);
  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: "Post deleted successfully",
  });
});

export const PostControllers = {
  createPost,
  getPostBySlug,
  getPostsByQuery,
  getAllPostUnderCategory,
  getAllPosts,
  getSimilarPosts,
  updatePost,
  deletePost,
};
