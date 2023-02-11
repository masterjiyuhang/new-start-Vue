<template>
  <div class="cch-header">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="/">promotion management</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        class="mx-1"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        class="w-20 ml-1"
        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button
        v-else
        class="ml-1 button-new-tag"
        size="small"
        @click="showInput"
      >
        + New Tag
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeMount, ref } from "vue";
import { ElInput } from "element-plus";
import { emitter } from "@/utils/mitt";

const inputValue = ref("");
const dynamicTags = ref(["Tag 1", "Tag 2", "Tag 3"]);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};

// 页面挂载之前执行
onBeforeMount(() => {
  //  接收侧边栏切换传递过来的参数
  emitter.on("changeCurrentRoute", (routeInfo: any) => {
    console.log("接收侧边栏切换传递过来的参数", routeInfo);
  });
});
</script>

<style lang="scss" scoped>
.cch-header {
  background-color: #bfa;
}
</style>
