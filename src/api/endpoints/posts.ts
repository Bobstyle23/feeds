import { api } from "../client";
import { Post } from "@/entities/Post";

interface Params {
  cursor?: string;
  limit?: number;
}

export const getPosts = async (params?: Params) => {
  const res = await api.get<Post[]>("/posts", { params });
  return res.data;
};

export const getPostById = async (postId: string) => {
  const res = await api.get<Post>(`/posts/${postId}`);
  return res.data;
};
