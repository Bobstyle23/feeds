import { toggleLike } from "@/api/endpoints/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => toggleLike(postId),

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousData = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: any) =>
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
      if (context?.previousData) {
        queryClient.setQueryData(["posts"], context.previousData);
      }
    },
  });
};
