import { z } from "zod";

const createPostValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    content: z.string().min(1, "Content is required"),
    author: z.string().min(1, "Author ID is required"),
    category: z.string().min(1, "Category ID is required"),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    coverImage: z.string().url().optional(),
    isFeatured: z.boolean().optional(),
    isPublished: z.boolean(),
    publishDate: z.date().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    coverImage: z.string().url().optional(),
    isFeatured: z.boolean().optional(),
    isPublished: z.boolean().optional(),
    publishDate: z.date().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

export const PostValidations = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
