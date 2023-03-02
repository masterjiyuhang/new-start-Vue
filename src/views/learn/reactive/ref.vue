<template>
  <div>
    <h1>{{ shallow }}</h1>
    <el-button @click="changeShallowRef" type="primary">
      change shallowRef
    </el-button>
    <hr />
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { shallowRef, triggerRef, watchEffect, customRef, ref, Ref } from "vue";

const child = ref<string>("二航");
console.log(child);

type Obj = {
  greet: string;
};
const shallow: Ref<Obj> = shallowRef({
  greet: "Hello, world",
});

// 触发该副作用第一次应该会打印 "Hello, world"
watchEffect(() => {
  console.log(shallow.value.greet);
});

// 这次变更不应触发副作用，因为这个 ref 是浅层的
shallow.value.greet = "Hello, pending";

const changeShallowRef = () => {
  shallow.value.greet = "Hello, resolve";
  // 打印 "Hello, universe"
  triggerRef(shallow);

  console.log(shallow.value);
};

function useDebouncedRef(value, delay = 200) {
  let timeout;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          console.log(newValue, "customRef 自定义setting");
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}

const text = useDebouncedRef("hello");
text.value = "cch";
</script>

<style lang="scss" scoped></style>
