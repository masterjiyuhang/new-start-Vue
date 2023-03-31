<template>
  <!-- 下面是一个测试的弹窗 -->
  <div>
    <el-tooltip
      class="w-[110px] mt-[10px]"
      effect="dark"
      content="点一下试试"
      placement="right-end"
    >
      <input type="checkbox" v-model="value" />
    </el-tooltip>

    <div class="cch-dialog" v-if="propData.modelValue">
      <div class="header">
        标题 <span class="text-red-300 cursor-pointer" @click="close">X</span>
      </div>
      <div class="content text-cyan-400" @click="sendMsg">内容 {{ contentMsg }}</div>
      <div class="text-orange-800 footer">底部</div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * v-model 一个语法糖 props+emit实现
 * 默认情况下，v-model 在组件上都是使用 modelValue 作为 prop，并以 update:modelValue 作为对应的事件。我们可以通过给 v-model 指定一个参数来更改这些名字
 *
 * 组件内实现 v-model 的方式是使用一个可写的，同时具有getter 和 setter的computed属性。get 方法需返回 modelValue prop，而 set 方法需触发相应的事件
 *
 */
import { computed, ref } from "vue";
type PropsData = {
  modelValue: boolean;
};
const propData = defineProps<PropsData>();

const emits = defineEmits(["update:modelValue", "getMsg"]);

const contentMsg = ref<string>(" 内容文字啊");

const close = () => {
  emits("update:modelValue", false);
};

const sendMsg = () => {
  emits("getMsg", contentMsg.value);
};

const value = computed({
  get() {
    return propData.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>

<style lang="scss" scoped>
.cch-dialog {
  width: 300px;
  height: 300px;
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;

  .header,
  .footer {
    border-bottom: 1px solid #f80;
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .footer {
    border-top: 1px solid #f80;
  }

  .content {
    padding: 10px;
    flex: 1;
  }
}
</style>
