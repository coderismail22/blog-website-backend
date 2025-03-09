import { Schema, model } from "mongoose";
import { IPost } from "./post.interface";

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    tags: { type: [String] },
    coverImage: { type: String },
    isFeatured: { type: Boolean, default: false },
    relatedPosts: { type: [Schema.Types.ObjectId], ref: "Post", default: [] },
    sidebarPosts: { type: [Schema.Types.ObjectId], ref: "Post", default: [] },
  },
  { timestamps: true },
);

export const Post = model<IPost>("Post", PostSchema);
