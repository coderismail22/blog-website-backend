import { Types } from "mongoose";

export interface IPost {
  _id?: string;
  title: string; // ok
  slug: string; //ok
  content: string; // ok
  author: Types.ObjectId; //ok
  category: Types.ObjectId; //ok
  tags: string[]; //ok
  coverImage?: string; //ok
  isFeatured?: boolean; // ok
  relatedPosts?: [Types.ObjectId]; // Manual Related Posts
  sidebarPosts?: [Types.ObjectId]; // Manual Sidebar Posts
  createdAt?: Date;
  updatedAt?: Date;
}
