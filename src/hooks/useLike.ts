import { toggleLike } from "@/api/endpoints/like";
import { Post } from "@/entities/Post";
import { Posts } from "@/entities/Posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleLike, {
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousData = queryClient.getQueriesData({ queryKey: ["posts"] });

      queryClient.setQueriesData({ queryKey: ["posts"] }, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages?.map((page: Posts) => ({
            ...page,
            posts: page.posts.map((post: Post) =>
              post.id === postId
                ? {
                    ...post,
                    isLiked: !post.isLiked,
                    likesCount: post.isLiked
                      ? post.likesCount - 1
                      : post.likesCount + 1,
                  }
                : post,
            ),
          })),
        };
      });

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      context?.previousData?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
  });
};
