import {
  AnyFn,
  Fn,
  isClient,
  isFunction,
  MaybeComputedRef,
  Pausable,
} from "@vueuse/core";
import { getCurrentScope, isRef, onScopeDispose, ref, unref, watch } from "vue";
interface UseIntervalFnOptions {
  /**
   * Start the timer immediately
   *
   * @default true
   */
  immediate?: boolean;

  /**
   * Execute the callback immediate after calling this function
   *
   * @default false
   */
  immediateCallback?: boolean;
}
export function resolveUnref<T>(r: MaybeComputedRef<T>): T {
  return typeof r === "function" ? (r as AnyFn)() : unref(r);
}

export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}

export function useState() {
  function useIntervalCchFn(
    cb: Fn,
    interval: MaybeComputedRef<number> = 1000,
    options: UseIntervalFnOptions = {}
  ): Pausable {
    const { immediate = true, immediateCallback = false } = options;

    let timer: ReturnType<typeof setInterval> | null = null;

    const isActive = ref(false);

    function clean() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function pause() {
      isActive.value = false;
      clean();
    }

    function resume() {
      const intervalValue = resolveUnref(interval);

      if (intervalValue <= 0) {
        return;
      }

      isActive.value = true;

      if (immediateCallback) cb();
      clean();
      timer = setInterval(cb, intervalValue);
    }

    if (immediate && isClient) resume();

    if (isRef(interval) || isFunction(interval)) {
      const stopWatch = watch(interval, () => {
        if (isActive.value && isClient) {
          resume();
        }
      });

      tryOnScopeDispose(stopWatch);
    }

    tryOnScopeDispose(pause);

    return {
      isActive,
      pause,
      resume,
    };
  }

  return {
    useIntervalCchFn,
  };
}
