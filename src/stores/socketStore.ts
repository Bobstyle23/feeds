import { makeAutoObservable } from "mobx";
import { QueryClient } from "@tanstack/react-query";
import { authStore } from "./authStore";
import { Posts } from "@/entities/Posts";
import { Post } from "@/entities/Post";
import { Comments } from "@/entities/Comments";

export class SocketStore {
  ws?: WebSocket;

  constructor(private queryClient: QueryClient) {
    makeAutoObservable(this);
  }

  connect() {
    if (this.ws) return;

    this.ws = new WebSocket(
      `wss://k8s.mectest.ru/test-app/ws?token=${authStore.token}`,
    );
    this.ws.onopen = () => {
      console.log("WS connected");
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleEvent(data);
      console.log("WS Event: ", event.data);
    };

    this.ws.onclose = () => {
      console.log("WS disconnected");
      this.ws = undefined;
    };

    this.ws.onerror = (error) => {
      console.log("WS error", error);
    };
  }

  disconnect() {
    this.ws?.close();
    this.ws = undefined;
  }

  handleEvent(data: any) {
    switch (data.type) {
      case "like_updated":
        this.onLikeUpdated(data);
        break;

      case "comment_added":
        this.onCommentAdded(data);
        break;
    }
  }

  onLikeUpdated(data: any) {
    const { postId, likesCount } = data;

    this.queryClient.setQueriesData({ queryKey: ["posts"] }, (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: Posts) => ({
          ...page,
          posts: page.posts.map((post: Post) =>
            post.id === postId ? { ...post, likesCount } : post,
          ),
        })),
      };
    });

    this.queryClient.setQueryData(["post", postId], (oldPost: Post | any) => {
      if (!oldPost) return oldPost;

      return {
        ...oldPost,
        likesCount,
      };
    });
  }

  onCommentAdded(data: any) {
    const { postId, comment } = data;

    this.queryClient.setQueryData(["comments", postId], (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: Comments, index: number) =>
          index === 0
            ? { ...page, comments: [comment, ...page.comments] }
            : page,
        ),
      };
    });

    this.queryClient.setQueryData(["post", postId], (oldData: any) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        commentsCount: oldData.commentsCount + 1,
      };
    });

    this.queryClient.setQueriesData({ queryKey: ["posts"] }, (oldData: any) => {
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
  }
}
