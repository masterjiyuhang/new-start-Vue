import { onMounted, onUnmounted, ref } from "vue";

export function useScript(opts: any) {
  const JsonpData = ref(null);
  const JsonpError = ref<any>(null);
  const isLoading = ref(false);

  let script;

  const getJsonpData = () => {
    isLoading.value = true;

    return new Promise((resolve, reject) => {
      const callBackName = `jsonp_callback_${Date.now()}`;

      // 创建全局回掉函数
      window[callBackName] = (responseData) => {
        isLoading.value = false;
        JsonpData.value = responseData;
        cleanup();
        resolve(responseData);
      };

      // 创建 script 函数
      script = document.createElement("script");
      script.id = "json_script";

      // 设置回调函数名和 URL
      const jsonpUrl = `${opts.url}?callback=${callBackName}`;
      script.src = jsonpUrl;
      script.type = "text/javascript";
      script.async = true;

      console.log(script, "script");

      script.onerror = (err) => {
        isLoading.value = false;
        JsonpError.value = new Error(
          `Failed to load JSONP from ${jsonpUrl} ${err}`
        );
        console.log(err, "err,,,");
        cleanup();
        reject(JsonpError.value);
      };

      // 将 script 函数添加到页面中
      document.body.appendChild(script);

      // 清理函数，移除 script 元素和全局回调函数
      function cleanup() {
        delete window[callBackName];
        if (script) {
          console.log(1111);
          document.body.removeChild(script);
        }
      }
    });
  };

  onMounted(() => {
    // getJsonpData();
  });

  onUnmounted(() => {
    console.log(
      "卸载了呗？",
      script,
      document.body,
      document.getElementById("json_script")
    );
    if (script && document.getElementById("json_script")) {
      document.body.removeChild(script);
    }
  });

  return { JsonpData, JsonpError, isLoading, getJsonpData };
}
