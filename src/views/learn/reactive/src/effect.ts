// 依赖发生变化的时候执行fn函数 实现依赖收集和依赖的更新
let activeEffect: any;
export const effect = (fn: Function) => {
  const _effect = function () {
    activeEffect = _effect;
    fn();
  };

  _effect();
};

const targetMap = new WeakMap();
export const track = (target: any, key: any) => {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let deps = depsMap.get(key);

  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }

  deps.add(activeEffect);
};

export const trigger = (target: any, key: any) => {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    track(target, key);
    depsMap = targetMap.get(target);
  }
  const deps = depsMap.get(key);

  deps.forEach((effect: any) => effect());
};
