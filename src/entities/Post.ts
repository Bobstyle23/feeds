import { Author } from "./Author";

export interface Post {
  id: string;
  author: Author;
  title: string;
  body: string;
  preview: string;
  coverUrl: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tier: string;
  createdAt: string;
}

export interface PostDetailResponse {
  data: {
    post: Post;
  };
}
