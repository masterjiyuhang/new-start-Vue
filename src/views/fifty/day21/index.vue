<template>
  <div class="wrapper-page">
    <div>
      <div
        :class="['empty', dropTargetId === 0 && 'hovered']"
        @dragover="handleDragOver"
        @dragenter="handleDragEnter(0)"
        @dragleave="handleDragLeave"
        @drop="handleDrop(0)"
      >
        <div
          class="fill"
          :class="{ hold: isDragging, invisible: isDragInvisible }"
          draggable="true"
          @dragstart="dragStart"
          @dragend="dragEnd"
        ></div>
      </div>

      <div
        v-for="item in emptySlots"
        :key="item.id"
        :class="['empty', dropTargetId === item.id && 'hovered']"
        @dragover="handleDragOver"
        @dragenter="handleDragEnter(item.id)"
        @dragleave="handleDragLeave"
        @drop="handleDrop(item.id)"
      >
        <div v-if="fillSlotId === item.id" class="fill"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const isDragging = ref(false);
const isDragInvisible = ref(false);
const dropTargetId = ref<number | null>(null);
const fillSlotId = ref(0);

const emptySlots = reactive(
  Array.from({ length: 4 }, (_, k) => ({
    id: k + 1,
  })),
);

function handleDragOver(e: DragEvent) {
  e.preventDefault();
}

function handleDrop(slotId: number) {
  dropTargetId.value = null;
  fillSlotId.value = slotId;
}

function handleDragEnter(slotId: number) {
  dropTargetId.value = slotId;
}

function handleDragLeave() {
  dropTargetId.value = null;
}

function dragStart() {
  isDragging.value = true;
  setTimeout(() => {
    isDragInvisible.value = true;
  }, 0);
}

function dragEnd() {
  isDragging.value = false;
  isDragInvisible.value = false;
}
</script>

<style lang="scss" scoped>
.empty {
  width: 150px;
  height: 150px;
  margin: 10px;
  border: solid 3px black;
  background: white;
}

.fill {
  width: 145px;
  height: 145px;
  background-image: url("@/assets/images/login_bg.svg");
  cursor: pointer;
}

.hold {
  border: solid 5px #f80;
}

.hovered {
  border-style: dashed;
  border-color: white;
  background-color: #333;
}

.invisible {
  display: none;
}

@media (width <= 800px) {
  body {
    flex-direction: column;
  }
}
</style>
