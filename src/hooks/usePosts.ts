import { getPosts } from "@/api/endpoints/posts";
import { Posts } from "@/entities/Posts";
import { useInfiniteQuery } from "@tanstack/react-query";

type Tier = "all" | "free" | "paid";

export const usePosts = (tier: Tier) =>
  useInfiniteQuery<Posts>({
    queryKey: ["posts", tier],
    queryFn: ({ pageParam }) =>
      getPosts({
        cursor: pageParam,
        limit: 10,
        simulateError: false,
        ...(tier !== "all" && { tier }),
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
    staleTime: 1000 * 60 * 2,
  });
