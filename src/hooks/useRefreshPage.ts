import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { emitter } from "@/utils/mitt";
import { nextTick } from "vue";
import { useRoute } from "vue-router";

export const useRefreshPage = () => {
  const route = useRoute();
  const { removeKeepAliveName, addKeepAliveName } = useGlobalSettingStore();

  const refresh = () => {
    setTimeout(() => {
      removeKeepAliveName(route.name as string);
      emitter.emit("refreshCurrentPage", false);

      nextTick(() => {
        addKeepAliveName(route.name as string);
        emitter.emit("refreshCurrentPage", true);
      });
    }, 0);
  };

  return {
    refresh,
  };
};
