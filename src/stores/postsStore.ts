import { makeAutoObservable } from "mobx";

export type Tier = "all" | "free" | "paid";

class PostsStore {
  tier: Tier = "all";

  constructor() {
    makeAutoObservable(this);
  }

  setTier(tier: Tier) {
    this.tier = tier;
  }
}

export const postsStore = new PostsStore();
