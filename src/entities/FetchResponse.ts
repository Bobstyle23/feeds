import { Posts } from "./Posts";

export interface FetchResponse {
  hasMore: boolean;
  nextCursor: string;
  posts: Posts;
}
