import { Comment } from "./Comment";

export interface Comments {
  comments: Comment[];
  hasMore: boolean;
  nextCursor: string;
}

export interface CommentsResponse {
  data: {
    comments: Comment[];
    hasMore: boolean;
    nextCursor: string;
  };
}
