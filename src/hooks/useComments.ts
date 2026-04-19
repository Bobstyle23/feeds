import { getComments } from "@/api/endpoints/comments";
import { Comments } from "@/entities/Comments";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useComments = (postId: string) =>
  useInfiniteQuery<Comments>({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) =>
      getComments(postId, { cursor: pageParam, limit: 20 }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
  });
