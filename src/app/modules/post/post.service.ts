import { Post } from "./post.model";
import { IPost } from "./post.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import slugify from "slugify";

const createPostInDB = async (postData: IPost): Promise<IPost> => {
  const baseSlug = slugify(postData.title, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;
  // Check if slug exists and increment the number if needed
  while (await Post.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }
  postData.slug = slug;
  return await Post.create(postData);
};

const getPostFromDB = async (slug: string): Promise<IPost> => {
  const result = await Post.findOne({ slug: slug }).populate(
    "relatedPosts sidebarPosts",
  );
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  return result;
};

const getAllPostsFromDB = async (): Promise<IPost[]> => {
  return await Post.find()
    .sort({ createdAt: -1 })
    .populate("relatedPosts sidebarPosts");
};

const getAllPostUnderCategory = async (category: string): Promise<IPost[]> => {
  return await Post.find({ category: category })
    .sort({ createdAt: -1 })
    .populate("relatedPosts sidebarPosts");
};

const getSimilarPostsFromDB = async (postId: string): Promise<IPost[]> => {
  // Find the current post
  const currentPost = await Post.findById(postId);

  if (!currentPost) throw new AppError(httpStatus.NOT_FOUND, "Post not found");

  // Find similar posts based on the same category OR matching tags
  const similarPosts = await Post.find({
    _id: { $ne: postId }, // Exclude the current post
    $or: [
      { category: currentPost.category }, // Same category
      { tags: { $in: currentPost.tags } }, // At least one matching tag
    ],
  })
    .sort({ createdAt: -1 }) // Sort by most viewed & recent posts
    .limit(3); // Limit to 5 similar posts

  return similarPosts;
};

const updatePostInDB = async (
  postId: string,
  updateData: Partial<IPost>,
): Promise<IPost | null> => {
  const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updatedPost) throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  return updatedPost;
};

const deletePostFromDB = async (postId: string): Promise<void> => {
  const deletedPost = await Post.findByIdAndDelete(postId);
  if (!deletedPost) throw new AppError(httpStatus.NOT_FOUND, "Post not found");
};

export const PostServices = {
  createPostInDB,
  getPostFromDB,
  getAllPostsFromDB,
  getAllPostUnderCategory,
  getSimilarPostsFromDB,
  updatePostInDB,
  deletePostFromDB,
};
