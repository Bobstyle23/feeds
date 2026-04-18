import { Like } from "@/entities/Like";
import { api } from "../client";

export const toggleLike = async (postId: string) => {
  const res = await api.post<Like>(`/posts/${postId}/like`);
  return res.data;
};
