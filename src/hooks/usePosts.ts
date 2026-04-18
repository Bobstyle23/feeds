import { getPosts } from "@/api/endpoints/posts";
import { FetchResponse } from "@/entities/FetchResponse";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePosts = () =>
  useInfiniteQuery<FetchResponse, Error>({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts({ cursor: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
  });
