import { computed } from "vue";
import { useRoute } from "vue-router";

export function useActiveMenu() {
  const route = useRoute();
  return computed(() =>
    route.meta.activeMenu ? (route.meta.activeMenu as string) : route.path,
  );
}
