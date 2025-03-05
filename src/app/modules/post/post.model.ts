import { Schema, model } from "mongoose";
import { IPost } from "./post.interface";

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: [Schema.Types.ObjectId], ref: "User", required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    coverImage: { type: String },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, required: true },
    publishDate: { type: Date },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true },
);

export const Post = model<IPost>("Post", PostSchema);
