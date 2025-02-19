import { z } from "zod";
// Create blog post validation
const createBlogPostValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    author: z.string().trim().min(1, "Author is required"),
    image: z.string().url("Image must be a valid URL"),
    body: z.string().min(1, "Body is required"),
    category: z.array(z.string()).optional(),
    comments: z.array(z.string()).optional(),
    isDeleted: z.boolean().default(false),
  }),
});

// Update blog post validation
const updateBlogPostValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required").optional(),
    author: z.string().trim().min(1, "Author is required").optional(),
    image: z.string().url("Image must be a valid URL").optional(),
    body: z.string().min(1, "Body is required").optional(),
    category: z.array(z.string()).optional(),
    comments: z.array(z.string()).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const BlogPostValidations = {
  createBlogPostValidationSchema,
  updateBlogPostValidationSchema,
};
