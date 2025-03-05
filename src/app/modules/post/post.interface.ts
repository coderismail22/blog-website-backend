import { Types } from "mongoose";

export interface IPost {
  _id?: string;
  title: string; // ok
  slug: string;
  content: string; // ok
  author: [Types.ObjectId]; //ok
  category: string; //ok
  tags: string[]; //ok
  coverImage?: string; //ok
  isFeatured?: boolean; // ok
  isPublished: boolean;
  publishDate?: Date;
  views?: number;
  likes?: number;
  commentsCount?: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
