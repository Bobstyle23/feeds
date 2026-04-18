import axios from "axios";

import { authStore } from "@/stores/authStore";

export const api = axios.create({
  baseURL: "https://k8s.mectest.ru/test-app",
  params: {},
});

api.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${authStore.token}`;
  return config;
});
