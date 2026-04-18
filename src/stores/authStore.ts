import { makeAutoObservable } from "mobx";
import { v4 as uuid } from "uuid";

class AuthStore {
  token = uuid();
  constructor() {
    makeAutoObservable(this);
  }
}

export const authStore = new AuthStore();
