import {
  noop,
  notNullish,
  tryOnScopeDispose,
  unrefElement,
} from "@vueuse/core";

export const useIntersectionObserver = (
  target: Ref<HTMLElement | null>,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {},
) => {
  const { root, rootMargin = "0px", threshold = 0 } = options;
  const immediate = true;
  let cleanup = () => {};
  const isActive = ref(immediate);

  const targets = computed(() => {
    const _target = toValue(target);
    return (Array.isArray(_target) ? _target : [_target])
      .map(unrefElement)
      .filter(notNullish);
  });

  const stopWatch = watch(
    () => [targets.value, unrefElement(root as any), isActive.value] as const,
    ([targets, root]) => {
      cleanup();
      if (!isActive.value) return;

      if (!targets.length) return;

      const observer = new IntersectionObserver(callback, {
        root: unrefElement(root),
        rootMargin: rootMargin,
        threshold: threshold,
      });

      targets.forEach((el) => {
        el && observer.observe(el);
      });

      cleanup = () => {
        observer.disconnect();
        cleanup = noop;
      };
    },
    {
      immediate: immediate,
      flush: "post",
    },
  );

  const stop = () => {
    cleanup();
    stopWatch();
    isActive.value = false;
  };

  tryOnScopeDispose(stop);

  return {
    isActive,
    pause() {
      cleanup();
      isActive.value = false;
    },
    resume() {
      isActive.value = true;
    },
    stop,
  };
};
