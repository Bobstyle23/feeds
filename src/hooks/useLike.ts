import { toggleLike } from "@/api/endpoints/like";
import { Post } from "@/entities/Post";
import { Posts } from "@/entities/Posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleLike, {
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      await queryClient.cancelQueries({ queryKey: ["post", postId] });

      const previousPosts = queryClient.getQueriesData({ queryKey: ["posts"] });
      const previousPost = queryClient.getQueryData(["post", postId]);

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

      queryClient.setQueryData(["post", postId], (oldPost: Post | any) => {
        if (!oldPost) return oldPost;
        return {
          ...oldPost,
          isLiked: !oldPost.isLiked,
          likesCount: oldPost.isLiked
            ? oldPost.likesCount - 1
            : oldPost.likesCount + 1,
        };
      });

      return { previousPosts, previousPost };
    },

    onError: (_err, _vars, context) => {
      context?.previousPosts?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
  });
};
