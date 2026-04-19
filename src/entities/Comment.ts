import { Author } from "./Author";

export interface Comment {
  id: string;
  postId: string;
  author: Author;
  text: string;
  createdAt: string;
}

export interface CommentResponse {
  data: {
    comment: Comment;
  };
}
