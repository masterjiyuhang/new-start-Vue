import Req from "@/utils/request";

const http = new Req({
  requestConfig: {
    isLoading: true,
  },
});

// ten-api/v2/bilihot
export const getWeeklyDataApi = () => {
  return http.request("get", "ten-api/v2/bilihot", {
    cacheConfig: {
      enabled: true,
    },
  });
};
