import { onUnmounted, ref } from "vue";
// import { onUnmounted, ref } from "vue";

export function useScript(url: string) {
  const JsonpData = ref(null);
  const JsonpError = ref<any>(null);
  const isLoading = ref(false);

  let script;

  const fetchDataByScript = () => {
    console.log("jsonp executing");
    isLoading.value = true;

    return new Promise((resolve, reject) => {
      const callBackName = "jsonp_callback";

      // 创建 script 函数
      script = document.createElement("script");
      script.id = "json_script";

      // 设置回调函数名和 URL
      const jsonpUrl = `${url}?callback=${callBackName}`;
      script.src = jsonpUrl;
      script.type = "text/javascript";
      script.async = true;

      script.onerror = (err) => {
        isLoading.value = false;
        JsonpError.value = new Error(
          `Failed to load JSONP from ${jsonpUrl}: ${err.message}`
        );
        cleanup(callBackName);
        reject(JsonpError.value);
      };

      // 创建全局回掉函数
      window[callBackName] = (responseData) => {
        console.log(responseData);
        isLoading.value = false;
        JsonpData.value = responseData;
        // cleanup(callBackName);
        resolve(responseData);
      };

      // 将 script 函数添加到页面中
      document.body.appendChild(script);
    });
  };

  const cleanup = (callBackName: string) => {
    delete window[callBackName];
    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
    }
  };

  onUnmounted(() => {
    cleanup("jsonp_callback");
  });

  return { fetchDataByScript };
}
