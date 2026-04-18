import { getPostById } from "@/api/endpoints/posts";
import { useQuery } from "@tanstack/react-query";

export const usePost = (postId: string) =>
  useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    staleTime: 1000 * 60 * 60 * 24,
  });
