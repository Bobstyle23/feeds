import { FetchResponse } from "@/entities/FetchResponse";
import { api } from "../client";
import { Post } from "@/entities/Post";
import { Posts } from "@/entities/Posts";

interface Params {
  cursor?: string;
  limit?: number;
}

export const getPosts = async (params?: Params) => {
  const res = await api.get<Posts>("/posts", { params });
  return res.data.data;
};

export const getPostById = async (postId: string) => {
  const res = await api.get<Post>(`/posts/${postId}`);
  return res.data;
};
