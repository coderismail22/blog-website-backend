import { BlogPost } from "./blog-post.model";

import { TBlogPost } from "./blog-post.interface";

const createBlogPost = async (payload: TBlogPost) => {
  const result = await BlogPost.create(payload);
  return result; // Return the populated booking result
};

const getAllBlogPosts = async () => {
  const result = await BlogPost.find();
  return result;
};

const getBlogPost = async (id: string) => {
  const result = await BlogPost.findById(id);
  return result;
};

const updateBlogPost = async (id: string, payload: Partial<TBlogPost>) => {
  const result = await BlogPost.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBlogPost = async (id: string) => {
  const result = await BlogPost.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  return result;
};

export const BlogPostServices = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
