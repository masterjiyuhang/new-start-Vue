<template>
  <div class="wrapper-page">
    <!-- <SeamlessScroll /> -->
    <el-space wrap>
      <el-card class="box-card" shadow="never">
        <template #header>
          <div class="card-header">
            <span>无缝滚动示例{{ classOption.direction }}</span>
            <el-button
              class="button"
              link
              type="primary"
              @click="changeDirection('top')"
            >
              <span
                :style="{ color: classOption.direction === 'top' ? 'red' : '' }"
              >
                向上滚动
              </span>
            </el-button>
          </div>
        </template>

        <SeamlessScroll ref="scroll" />
      </el-card>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from "vue";

const classOption = reactive({
  direction: "top",
});

const scroll = ref();
const changeDirection = (val) => {
  (unref(scroll) as any).reset();
  unref(classOption).direction = val;
};
</script>

<style scoped></style>
