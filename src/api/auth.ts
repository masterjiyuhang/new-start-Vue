import { get, post } from "@/utils/http";

export const loginApi = (data: { username: string; password: string }) => {
  return post("/auth/login", data);
};

export const getPublicKey = () => {
  return get("/auth/publicKey");
};

export const getRouterListApi = (params?: any) => {
  return get("/system/getRouterList", { params });
};

export const getAuthButtonListApi = (params?: any) => {
  return get("/system/authButtonList", { params });
};

export const logoutApi = () => {
  return post("/auth/logout");
};
