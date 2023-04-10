import { isClient } from "@/utils/is";
import { tryOnScopeDispose } from "@vueuse/core";
import { UseGeolocationOptions } from "@vueuse/core";
import { computed, getCurrentInstance, onMounted, ref, shallowRef } from "vue";
import type { Ref } from "vue";

export const useGeoLocation = () => {
  const useMounted = () => {
    const isMounted = ref(false);

    if (getCurrentInstance()) {
      onMounted(() => {
        isMounted.value = true;
      });
    }

    return isMounted;
  };

  const useSupported = (callback: () => unknown) => {
    const isMounted = useMounted();

    return computed(() => {
      isMounted.value;
      return Boolean(callback());
    });
  };

  const isSupported = useSupported(
    () => navigator && "geolocation" in navigator
  );

  const useCchLocal = (options: UseGeolocationOptions = {}) => {
    const defaultNavigator = /* #__PURE__ */ isClient
      ? window.navigator
      : undefined;

    const {
      enableHighAccuracy = true,
      maximumAge = 30000,
      timeout = 27000,
      navigator = defaultNavigator,
      immediate = true,
    } = options;

    const locatedAt: Ref<number | null> = ref(null);
    const error = shallowRef<GeolocationPositionError | null>(null);
    const coords: Ref<GeolocationPosition["coords"]> = ref({
      accuracy: 0,
      latitude: Infinity,
      longitude: Infinity,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    });

    function updatePosition(position: GeolocationPosition) {
      locatedAt.value = position.timestamp;
      coords.value = position.coords;
      error.value = null;
      console.log("这里面呢", coords.value);
    }

    let watcher: number;

    function resume() {
      console.log("立即执行了吗");
      if (isSupported.value) {
        watcher = navigator!.geolocation.watchPosition(
          updatePosition,
          (err) => (error.value = err),
          {
            enableHighAccuracy,
            maximumAge,
            timeout,
          }
        );
      }
    }

    if (immediate) resume();

    function pause() {
      if (watcher && navigator) navigator.geolocation.clearWatch(watcher);
    }

    tryOnScopeDispose(() => {
      pause();
    });

    return {
      coords,
      locatedAt,
      error,
      resume,
      pause,
    };
  };

  return {
    useMounted,
    useSupported,
    isSupported,
    useCchLocal,
  };
};
