import { api } from "../client";
import { Posts, PostsResponse } from "@/entities/Posts";
import { Post, PostDetailResponse } from "@/entities/Post";

interface Params {
  cursor?: string;
  limit?: number;
}

export const getPosts = async (params?: Params): Promise<Posts> => {
  const res = await api.get<PostsResponse>("/posts", { params });
  return res.data.data;
};

export const getPostById = async (postId: string): Promise<Post> => {
  const res = await api.get<PostDetailResponse>(`/posts/${postId}`);
  return res.data.data.post;
};
