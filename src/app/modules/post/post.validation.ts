import { z } from "zod";

const createPostValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().optional(),
    author: z.string().min(1, "Author is required"),
    category: z.string().min(1, "Category is required"),
    relatedPosts: z.array(z.string()).optional(),
    sidebarPosts: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string().url().optional(),
    isFeatured: z.boolean().optional(),
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    relatedPosts: z.array(z.string()).optional(),
    sidebarPosts: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string().url().optional(),
    isFeatured: z.boolean().optional(),
  }),
});

export const PostValidations = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
