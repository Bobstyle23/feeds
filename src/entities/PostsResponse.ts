import { Post } from "./Post";

export interface PostsResponse {
  ok: boolean;
  data: {
    hasMore: boolean;
    nextCursor: string | null;
    posts: Post[];
  };
}

export interface PostDetailResponse {
  data: {
    post: Post;
  };
}
