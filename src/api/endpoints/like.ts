import { LikeResponse } from "@/entities/Like";
import { api } from "../client";

export const toggleLike = async (postId: string) => {
  const res = await api.post<LikeResponse>(`/posts/${postId}/like`);
  return res.data.data;
};
