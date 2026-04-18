import { Post } from "./Post";

export interface FetchResponse {
  ok: boolean;
  data: {
    hasMore: boolean;
    nextCursor: string | null;
    posts: Post[];
  };
}
