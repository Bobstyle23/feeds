import { makeAutoObservable } from "mobx";
import { QueryClient } from "@tanstack/react-query";
import { authStore } from "./authStore";

export class SocketStore {
  ws?: WebSocket;

  constructor(private queryClient: QueryClient) {
    makeAutoObservable(this);
  }

  connect() {
    this.ws = new WebSocket(
      `wss://k8s.mectest.ru/test-app/ws?token=${authStore.token}`,
    );
    this.ws.onopen = () => {
      console.log("WS connected");
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WS even", data);

      this.handleEvent(data);
    };

    this.ws.onclose = () => {
      console.log("WS disconnected");
    };
  }

  disconnect() {
    this.ws?.close();
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
    this.queryClient.invalidateQueries({ queryKey: ["posts"] });
    this.queryClient.invalidateQueries({ queryKey: ["post", data.postId] });
  }

  onCommentAdded(data: any) {
    const postId = data.postId;

    this.queryClient.invalidateQueries({
      queryKey: ["comments", postId],
    });

    this.queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
  }
}
