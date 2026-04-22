import { api } from "../client";
import { Posts, PostsResponse } from "@/entities/Posts";
import { Post, PostDetailResponse } from "@/entities/Post";

interface Params {
  cursor?: string;
  limit?: number;
  simulateError?: boolean;
  tier?: string;
}

export const getPosts = async (params?: Params): Promise<Posts> => {
  const res = await api.get<PostsResponse>("/posts", {
    params: {
      ...params,
      simulate_error: params?.simulateError,
      tier: params?.tier,
    },
  });
  return res.data.data;
};

export const getPostById = async (postId: string): Promise<Post> => {
  const res = await api.get<PostDetailResponse>(`/posts/${postId}`);
  return res.data.data.post;
};
