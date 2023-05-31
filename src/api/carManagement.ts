import Req from "@/utils/request";
import axios from "axios";
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from "axios-extensions";
import adapter from "axios/lib/adapters/xhr";
import adapter1 from "axios/lib/adapters/http";
const http = new Req({
  requestConfig: {
    isLoading: true,
  },
  axiosConfig: {
    adapter: throttleAdapterEnhancer(
      cacheAdapterEnhancer(adapter)
    ),
    // adapter: throttleAdapterEnhancer(adapter1, {
    //   threshold: 2 * 1000,
    // }),
  },
});

// ten-api/v2/bilihot
export const getWeeklyDataApi = () => {
  console.log(XMLHttpRequest, axios.defaults.adapter, adapter, adapter1);
  return http.request("get", "ten-api/v2/bilihot", {
    cacheConfig: {
      enabled: false,
    },
  });
};
