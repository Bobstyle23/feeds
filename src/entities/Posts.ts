import { Post } from "./Post";

export interface Posts {
  data: {
    hasMore: boolean;
    nextCursor: string;
    posts: Post[];
  };
}
