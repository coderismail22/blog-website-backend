// BlogPost Schema
import mongoose, { Schema } from "mongoose";
import { TBlogPost } from "./blog-post.interface";

const blogPostSchema = new Schema<TBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const BlogPost = mongoose.model<TBlogPost>("BlogPost", blogPostSchema);
