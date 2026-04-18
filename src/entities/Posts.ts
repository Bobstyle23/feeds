import { Post } from "./Post";

export interface Posts {
  hasMore: boolean;
  nextCursor: string | null;
  posts: Post[];
}
