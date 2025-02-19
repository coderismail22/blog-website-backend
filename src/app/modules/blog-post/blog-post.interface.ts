// Blog Post
export type TBlogPost = {
  title: string;
  author: string;
  image: string;
  body: string;
  comments: string[]; 
  category: string[];
  isDeleted: boolean;
};
