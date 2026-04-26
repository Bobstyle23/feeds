import { getComments, postComment } from "@/api/endpoints/comments";
import { Comment } from "@/entities/Comment";
import { Comments } from "@/entities/Comments";
import { Post } from "@/entities/Post";
import { Posts } from "@/entities/Posts";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useComments = (postId: string) =>
  useInfiniteQuery<Comments>({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) =>
      getComments(postId, { cursor: pageParam, limit: 20 }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
  });

type Variables = {
  postId: string;
  text: string;
};

export const useSendComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, text }: Variables) => postComment(postId, text),

    onMutate: async ({ postId, text }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

      const previousComments = queryClient.getQueryData(["comments", postId]);

      const previousPosts = queryClient.getQueriesData({
        queryKey: ["posts"],
      });

      const previousPost = queryClient.getQueryData(["post", postId]);

      const tempId = `temp-${Date.now()}`;

      const tempComment: Comment = {
        id: tempId,
        postId,
        text,
        createdAt: new Date().toISOString(),
        author: {
          id: "me",
          username: "you",
          displayName: "You",
          avatarUrl: "",
        },
      } as Comment;

      queryClient.setQueryData(["comments", postId], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) =>
            index === 0
              ? {
                  ...page,
                  comments: [tempComment, ...page.comments],
                }
              : page,
          ),
        };
      });

      queryClient.setQueriesData({ queryKey: ["posts"] }, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: Posts) => ({
            ...page,
            posts: page.posts.map((post: Post) =>
              post.id === postId
                ? {
                    ...post,
                    commentsCount: post.commentsCount + 1,
                  }
                : post,
            ),
          })),
        };
      });

      queryClient.setQueryData(["post", postId], (oldPost: any) => {
        if (!oldPost) return oldPost;

        return {
          ...oldPost,
          commentsCount: oldPost.commentsCount + 1,
        };
      });

      return {
        previousComments,
        previousPosts,
        previousPost,
        tempId,
      };
    },

    onError: (_err, { postId }, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", postId],
          context.previousComments,
        );
      }

      context?.previousPosts?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });

      if (context?.previousPost) {
        queryClient.setQueryData(["post", postId], context.previousPost);
      }
    },

    onSuccess: (data, { postId }, context) => {
      const { comment: newComment } = data;

      queryClient.setQueryData(["comments", postId], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) =>
            index === 0
              ? {
                  ...page,
                  comments: page.comments.map((comment: Comment) =>
                    comment.id === context?.tempId ? newComment : comment,
                  ),
                }
              : page,
          ),
        };
      });
    },
  });
};
