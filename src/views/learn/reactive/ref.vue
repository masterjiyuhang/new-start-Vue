<template>
  <div class="wrapper-page">
    <div class="content-one">
      <div class="title">ref 基础使用</div>
      <div>定义一个基础ref: {{ child }}</div>
    </div>

    <div class="content-two">
      <div class="title">shallowRef 基础使用</div>
      <cch-list :col="2">
        <cch-list-item label="定义一个shallowRef">
          <div>{{ shallow }}</div>
        </cch-list-item>
        <cch-list-item label="shallowRef 里面的内容">
          <div>{{ shallow.greet }}</div>
        </cch-list-item>
        <cch-list-item label="直接修改不会触发副作用">
          <el-button
            @click="() => (shallow.greet = 'Hello, pending')"
            type="primary"
          >
            change shallowRef => Hello, pending
          </el-button>
        </cch-list-item>
        <cch-list-item label="使用triggerRef触发副作用">
          <el-button @click="changeShallowRef" type="primary">
            change shallowRef => Hello, resolve
          </el-button>
        </cch-list-item>
      </cch-list>
    </div>

    <div class="content-three">
      <div class="title">自定义ref</div>
      <cch-list>
        <cch-list-item label="customRef 使用">
          <div>{{ text }}</div>
        </cch-list-item>
        <cch-list-item label="测试修改 customRef ">
          <el-button @click="testReqFrame()"> {{ text }}</el-button>
        </cch-list-item>
      </cch-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { shallowRef, triggerRef, watchEffect, customRef, ref } from "vue";
import type { Ref } from "vue";

const child = ref<string | number>("二航");
// ref 会根据初始化时的值推导其类型：

type Obj = {
  greet: string;
};
const shallow: Ref<Obj> = shallowRef({
  greet: "Hello, world",
});

// 触发该副作用第一次应该会打印 "Hello, world"
watchEffect(() => {
  console.log("副作用", shallow.value.greet);
});

// 这次变更不应触发副作用，因为这个 ref 是浅层的
shallow.value.greet = "Hello, pending";

const changeShallowRef = () => {
  shallow.value.greet = "Hello, resolve";
  // 打印 "Hello, universe"
  triggerRef(shallow);
};

function useDebouncedRef(value: any) {
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        value = newValue;
        // clearTimeout(timeout);
        // timeout = setTimeout(() => {
        console.log(newValue, "customRef 自定义setting");
        //   value = newValue;
        trigger();
        // }, delay);
      },
    };
  });
}

const reqFrame = ref<number | null>(null);

let timer: any = null;
const testReqFrame = () => {
  reqFrame.value = requestAnimationFrame(() => {
    console.log(text.value);
    text.value += 1;
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      testReqFrame();
    }, 1000);
  });
};

const text = useDebouncedRef(1);
</script>

<style lang="scss" scoped>
$base-font-size: 28px;

@mixin base-title($height: 48px) {
  height: $height;
  color: #000c31;
  font-size: $base-font-size;
  font-weight: bold;
  line-height: 38px;
}

.title {
  @include base-title;
}
</style>
