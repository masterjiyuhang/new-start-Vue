import { toValueArgsFlat } from "@/utils/arr";
import { Ref, computed, ComputedRef } from "vue";
// import { ComputedRef } from "vue-demi";

export type MayBeIsRef<T> = T | Ref<T>;

// Maybe it's a ref, or a plain value, or a getter function
export type MaybeIsRefOrGetter<T> = MayBeIsRef<T> | (() => T);

export type MaybeComputedRefArgs<T> =
  | MaybeIsRefOrGetter<T>[]
  | [MaybeIsRefOrGetter<MaybeIsRefOrGetter<T>[]>];

export function useMin(
  array: MaybeIsRefOrGetter<MaybeIsRefOrGetter<number>[]>
): ComputedRef<number>;
export function useMin(
  ...args: MaybeIsRefOrGetter<number>[]
): ComputedRef<number>;

/**
 * Reactive `Math.min`.
 *
 * @see https://vueuse.org/useMin
 */
export function useMin(...args: MaybeComputedRefArgs<number>) {
  return computed<number>(() => {
    const array = toValueArgsFlat(args);
    return Math.min(...array);
  });
}
