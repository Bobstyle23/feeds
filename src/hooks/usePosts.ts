import { getPosts } from "@/api/endpoints/posts";
import { Posts } from "@/entities/Posts";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePosts = () =>
  useInfiniteQuery<Posts>({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) =>
      getPosts({ cursor: pageParam, limit: 10, simulateError: false }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
  });
