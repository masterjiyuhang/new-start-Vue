import Req from "@/utils/request";
import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer,
} from "axios-extensions";
import adapter from "axios/lib/adapters/xhr";
import adapter1 from "axios/lib/adapters/http";
import axios from "axios";

if (typeof XMLHttpRequest !== "undefined") {
  // For browsers use XHR adapter
  axios.defaults.adapter = adapter;
} else if (typeof process !== "undefined") {
  // For node use HTTP adapter
  axios.defaults.adapter = adapter1;
}

const http = new Req({
  requestConfig: {
    isLoading: true,
  },
  axiosConfig: {
    adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(adapter)),
    // adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter)),
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
