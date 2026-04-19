import { Post } from "./Post";

export interface Posts {
  hasMore: boolean;
  nextCursor: string | null;
  posts: Post[];
}

export interface PostsResponse {
  data: {
    hasMore: boolean;
    nextCursor: string | null;
    posts: Post[];
  };
}
