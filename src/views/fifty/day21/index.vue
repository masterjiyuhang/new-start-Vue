<template>
  <div class="wrapper-page">
    <div>
      <div
        class="empty"
        @dragover="handleDragOver"
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
      >
        <div
          class="fill"
          ref="fillRef"
          draggable="true"
          @dragstart="dragStart"
          @dragend="dragEnd"
        ></div>
      </div>

      <div
        v-for="item in Array.from({ length: 4 }, (_v, k) => {
          return {
            id: k,
            showFill: k === 0,
            name: 'sa',
            class: 'empty',
          };
        })"
        :key="item.id"
        :class="item.class"
        class="text-teal-400"
        @dragover="handleDragOver"
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// const fill = document.querySelector(".fill");

const fillRef = ref();
function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.target.className = "empty";
  e.target.append(fillRef.value);
}

function handleDragEnter(e) {
  e.preventDefault();
  e.target.className += " hovered";
}

function handleDragLeave(e) {
  e.target.className = "empty";
}
function dragStart(e) {
  e.target.className += " hold";
  setTimeout(() => (e.target.className = "invisible"), 0);
}

function dragEnd(e) {
  e.target.className = "fill";
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

@media (max-width: 800px) {
  body {
    flex-direction: column;
  }
}
</style>
