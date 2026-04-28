import { makeAutoObservable } from "mobx";

class CommentDraftStore {
  drafts = new Map<string, string>();

  constructor() {
    makeAutoObservable(this);
  }

  setDraft(postId: string, text: string) {
    this.drafts.set(postId, text);
  }

  getDraft(postId: string) {
    return this.drafts.get(postId) ?? "";
  }

  clearDraft(postId: string) {
    this.drafts.delete(postId);
  }
}

export const commentDraftStore = new CommentDraftStore();
