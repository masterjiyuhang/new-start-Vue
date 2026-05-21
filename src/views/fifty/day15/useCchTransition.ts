import type { MaybeRefOrGetter } from "@vueuse/shared";
import { tryOnScopeDispose } from "@vueuse/shared";
// import { isNumber } from "lodash";
import { toValue, type MaybeRef, ref, watch, Ref, computed } from "vue";

interface CchTransOptions {
  /**
   * 持续时间
   * @default 1000
   */
  duration?: number;
  /**
   * 延迟时间
   * @default 0
   */
  delay?: number;
  /**
   * 缓动函数
   * @default ease-in-out
   */
  easing?: string;

  /**
   * Easing function or cubic bezier points for calculating transition values
   */
  transition?: MaybeRef<EasingFunction | CubicBezierPoints>;
  /**
   * Manually abort a transition
   */
  abort?: () => any;
  /**
   * Disables the transition
   */
  disabled?: MaybeRef<boolean>;

  /**
   * Callback to execute after transition finishes
   */
  onFinished?: () => void;

  /**
   * Callback to execute after transition starts
   */
  onStarted?: () => void;
}

function toVec(t: number | number[] | undefined) {
  return (typeof t === "number" ? [t] : t) || [];
}
/**
 * Cubic bezier points
 */
export type CubicBezierPoints = [number, number, number, number];

/**
 * Easing function
 */
export type EasingFunction = (n: number) => number;
/**
 * Create an easing function from cubic bezier points.
 */
export function createEasingFunction([
  p0,
  p1,
  p2,
  p3,
]: CubicBezierPoints): EasingFunction {
  const a = (a1: number, a2: number) => 1 - 3 * a2 + 3 * a1;
  const b = (a1: number, a2: number) => 3 * a2 - 6 * a1;
  const c = (a1: number) => 3 * a1;

  const calcBezier = (t: number, a1: number, a2: number) =>
    ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;

  const getSlope = (t: number, a1: number, a2: number) =>
    3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);

  const getTforX = (x: number) => {
    let aGuessT = x;

    for (let i = 0; i < 4; ++i) {
      const currentSlope = getSlope(aGuessT, p0, p2);
      if (currentSlope === 0) return aGuessT;
      const currentX = calcBezier(aGuessT, p0, p2) - x;
      aGuessT -= currentX / currentSlope;
    }

    return aGuessT;
  };

  return (x: number) =>
    p0 === p1 && p2 === p3 ? x : calcBezier(getTforX(x), p1, p3);
}

/**
 * 线性插值函数。
 * 此函数计算两个已知值（a 和 b）之间按给定百分比（alpha）的距离上的插值。
 *
 * @param a 起始值。
 * @param b 结束值。
 * @param alpha 从 a 到 b 的距离中所占的百分比，其中 0 表示 a，1 表示 b。
 * @returns 根据给定的百分比 alpha，在 a 和 b 之间的插值。
 */
function lerp(a: number, b: number, alpha: number) {
  // 计算插值。
  return a + alpha * (b - a);
}

/**
 * 执行过渡动画。
 * @param source 要过渡的源值。
 * @param from 要过渡到的起始值。
 * @param to 要过渡到的目标值。
 * @param options 过渡选项。
 * @returns Promise，表示过渡动画的完成。
 */
export function executeTransition<T extends number | number[]>(
  source: Ref<T>,
  from: MaybeRefOrGetter<T>,
  to: MaybeRefOrGetter<T>,
  options: CchTransOptions = {},
) {
  const fromVal = toValue(from);
  const toVal = toValue(to);
  const v1 = toVec(fromVal);
  const v2 = toVec(toVal);
  const duration = toValue(options.duration) ?? 1000;
  const startedAt = Date.now();
  const endAt = Date.now() + duration;
  const trans =
    typeof options.transition === "function"
      ? options.transition
      : toValue(options.transition) ??
        function identity<T>(arg: T) {
          return arg;
        };
  const ease =
    typeof trans === "function" ? trans : createEasingFunction(trans);
  return new Promise<void>((resolve) => {
    source.value = fromVal;

    const tick = () => {
      if (options.abort?.()) {
        resolve();
        return;
      }

      const now = Date.now();
      const alpha = ease((now - startedAt) / duration);
      const arr = toVec(source.value).map((_n, i) => lerp(v1[i], v2[i], alpha));

      if (Array.isArray(source.value))
        (source.value as number[]) = arr.map((_n, i) =>
          lerp(v1[i] ?? 0, v2[i] ?? 0, alpha),
        );
      else if (typeof source.value === "number")
        (source.value as number) = arr[0];

      if (now < endAt) {
        requestAnimationFrame(tick);
      } else {
        source.value = toVal;
        resolve();
      }
    };

    tick();
  });
}

export function useCchTransition(
  source: MaybeRefOrGetter<number | number[]> | MaybeRefOrGetter<number>[],
  options: CchTransOptions = {},
): Ref<any> {
  let currentId = 0; // 用于标识当前动画的ID，用于在动画更新或取消时做判断。

  // 获取source的实际值，如果是数组则会转换每个元素为数值。
  const sourceVal = () => {
    const v = toValue(source);
    // return typeof v === "number" ? v : v.map(toValue<number>);
    return typeof v === "number" ? v : v.map(toValue<number>);
  };

  // 初始化输出ref为源数据的初始值。
  const outputRef = ref(sourceVal());

  // 监听source的变化以触发动画。
  watch(
    sourceVal,
    async (newVal) => {
      if (toValue(options.disabled)) {
        return;
      }

      // 更新当前动画ID。
      const id = ++currentId;

      // 将新值转换为数值数组，准备过渡。
      const toVal = Array.isArray(newVal)
        ? newVal.map(toValue<number>)
        : toValue(newVal);

      // 动画开始时的回调。
      options.onStarted?.();

      // 执行过渡动画。
      await executeTransition(outputRef, outputRef.value, toVal, {
        ...options,
        abort: () => id !== currentId || options.abort?.(),
      });

      // 动画结束时的回调。
      options.onFinished?.();
    },
    {
      deep: true,
    },
  );

  // 监听动画是否被禁用，如果是，则重置动画状态。
  watch(
    () => toValue(options.disabled),
    (disabled) => {
      if (disabled) {
        currentId++;
        outputRef.value = sourceVal();
      }
    },
  );

  // 在作用域销毁时取消当前动画。
  tryOnScopeDispose(() => {
    currentId++;
  });

  // 返回一个计算属性，根据动画是否被禁用来决定返回输出ref的值还是源数据的当前值。
  return computed(() =>
    toValue(options.disabled) ? sourceVal() : outputRef.value,
  );
}
