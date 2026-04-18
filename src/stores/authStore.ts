import { makeAutoObservable } from "mobx";
import { v4 as uuid } from "uuid";
import "react-native-get-random-values";

class AuthStore {
  token = uuid();
  constructor() {
    makeAutoObservable(this);
  }
}

export const authStore = new AuthStore();
