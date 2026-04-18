import { Post } from "./Post";

export interface FetchResponse {
  hasMore: boolean;
  nextCursor: string;
  posts: Post[];
}
