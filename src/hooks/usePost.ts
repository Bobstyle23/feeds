import { getPostById } from "@/api/endpoints/posts";
import { Post } from "@/entities/Post";
import { Posts } from "@/entities/Posts";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const usePost = (postId: string) => {
  const queryClient = useQueryClient();

  const cached = queryClient
    .getQueriesData(["posts"])
    .flatMap(([, data]: any) => data?.pages ?? [])
    .flatMap((post: Posts) => post.posts)
    .find((post: Post) => post.id === postId);

  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    initialData: cached,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
