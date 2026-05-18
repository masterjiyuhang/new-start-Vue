import { http } from "@/utils/http";

export const getWeiboHotApi = () => {
  return http.request("get", "ten-api/v2/weibohot");
};

export const getBilibiliHotApi = () => {
  return http.request("get", "ten-api/v2/bilihot", undefined, { cacheEnabled: true });
};

export const getGithubUserApi = (username: string) => {
  return http.request("get", `https://api.github.com/users/${username}`);
};

export const getGithubUserRepoApi = (username: string) => {
  return http.request("get", `https://api.github.com/users/${username}/repos?sort=created`);
};
