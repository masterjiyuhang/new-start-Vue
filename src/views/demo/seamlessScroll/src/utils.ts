export const arrayIsEqual = (arr1: unknown[], arr2: unknown[]) => {
  if (arr1 === arr2) return true;
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

export function copyObj(
  deep: boolean | object,
  ...args: object[]
): Record<string, unknown> {
  let isDeep = false;
  let target: Record<string, unknown>;

  if (typeof deep === "boolean") {
    isDeep = deep;
    target = {} as Record<string, unknown>;
  } else {
    target = (deep ?? {}) as Record<string, unknown>;
    args.unshift(deep as object);
  }

  const sources = args;

  for (const source of sources) {
    if (source !== null && typeof source === "object") {
      for (const name in source) {
        if (Object.prototype.hasOwnProperty.call(source, name)) {
          const src = target[name];
          const copy = (source as Record<string, unknown>)[name];

          if (
            isDeep &&
            copy &&
            (typeof copy === "object" || Array.isArray(copy))
          ) {
            target[name] = copyObj(true, src as object, copy as object);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
  }

  return target;
}
