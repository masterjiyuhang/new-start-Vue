import { onUnmounted } from "vue";

let callbackCounter = 0;

export function useScript(url: string) {
  let script: HTMLScriptElement | null = null;
  let callbackName = "";

  const fetchDataByScript = () => {
    callbackCounter++;
    callbackName = `jsonp_callback_${callbackCounter}`;

    return new Promise((resolve, reject) => {
      script = document.createElement("script");
      script.id = `json_script_${callbackCounter}`;

      const jsonpUrl = `${url}?callback=${callbackName}`;
      script.src = jsonpUrl;
      script.type = "text/javascript";
      script.async = true;

      script.onerror = () => {
        cleanup();
        reject(new Error(`Failed to load JSONP from ${jsonpUrl}`));
      };

      (window as Record<string, any>)[callbackName] = (responseData: any) => {
        cleanup();
        resolve(responseData);
      };

      document.body.appendChild(script);
    });
  };

  const cleanup = () => {
    if (callbackName && (window as any)[callbackName]) {
      delete (window as any)[callbackName];
    }
    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
      script = null;
    }
  };

  onUnmounted(() => {
    cleanup();
  });

  return { fetchDataByScript };
}
