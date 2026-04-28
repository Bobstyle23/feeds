import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

class CommentLikeStore {
  likes = new Map<string, { isLiked: boolean; count: number }>();

  constructor() {
    makeAutoObservable(this);
  }

  toggle(commentId: string, initialCount: number) {
    const current = this.likes.get(commentId);

    if (!current) {
      this.likes.set(commentId, {
        isLiked: true,
        count: initialCount + 1,
      });
      return;
    }

    if (current.isLiked) {
      this.likes.set(commentId, {
        isLiked: false,
        count: current.count - 1,
      });
    } else {
      this.likes.set(commentId, {
        isLiked: true,
        count: current.count + 1,
      });
    }
  }

  getState(commentId: string, fallbackCount: number) {
    const state = this.likes.get(commentId);

    if (!state) {
      return {
        isLiked: false,
        count: fallbackCount,
      };
    }
    return state;
  }

  async save() {
    const data = JSON.stringify([...this.likes]);
    await AsyncStorage.setItem("commentLikes", data);
  }

  async load() {
    const data = await AsyncStorage.getItem("commentLikes");
    if (data) {
      this.likes = new Map(JSON.parse(data));
    }
  }
}

export const commentLikeStore = new CommentLikeStore();
