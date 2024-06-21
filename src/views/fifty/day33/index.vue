<template>
  <div class="wrapper-page">
    <el-button type="success" :icon="DocumentAdd" circle @click="handleAdd" />
    <!-- <el-button type="primary" :icon="Edit" circle @click="handleEdit" /> -->

    <div v-for="item in noteList" :key="item.id">
      <div>
        {{ item.id }}
        {{ currentActiveId }}
        {{ currentActiveId === item.id }}
      </div>
      <div
        class="w-48 h-32 shadow-md cursor-pointer shadow-red-500"
        @click="handleEdit(item.id)"
        v-show="currentActiveId !== item.id"
      >
        {{ item.content }}
      </div>
      <!-- {{ item }} -->
      <el-input
        v-if="currentActiveId === item.id"
        v-model="item.content"
        style="width: 240px"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="Please input"
        @blur="handleBlur"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  DocumentAdd,
} from "@element-plus/icons-vue";

const noteList = ref([]);
const currentActiveId = ref(null);

function handleAdd(params: type) {
  noteList.value.push({
    id: Math.random(),
    title: "title",
    content: "content",
    createTime: "2022-01-01",
    updateTime: "2022-01-01",
  });
}
function handleEdit(id: string) {
  currentActiveId.value = id;
}

function handleBlur() {
  currentActiveId.value = null;
}
</script>

<style scoped></style>
