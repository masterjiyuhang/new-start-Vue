import http from "@/utils/request";

// ten-api/v2/bilihot
export const getWeeklyDataApi = () => {
  return http.request("get", "ten-api/v2/bilihot", {
    cacheConfig: {
      enabled: true,
    },
  });
};
