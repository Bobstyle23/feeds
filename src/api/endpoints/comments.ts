import { Comments } from "@/entities/Comments";
import { api } from "../client";

export const getComments = async (postId: string) => {
  const res = await api.get<Comments>(`/posts/${postId}/comments`);
  return res.data;
};
