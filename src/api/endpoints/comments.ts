import { CommentsResponse } from "@/entities/Comments";
import { api } from "../client";
import { CommentResponse } from "@/entities/Comment";

export const getComments = async (
  postId: string,
  params?: { cursor?: string; limit?: number },
) => {
  const res = await api.get<CommentsResponse>(`/posts/${postId}/comments`, {
    params,
  });
  return res.data.data;
};

export const postComment = async (postId: string, params: { text: string }) => {
  const res = await api.post<CommentResponse>(`/posts/${postId}/comments`, {
    params,
  });
  return res.data.data;
};
