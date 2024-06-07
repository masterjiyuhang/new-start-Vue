<template>
  <div class="wrapper-page">
    <button class="btn" @click="handleClick('top')">toast-top</button>
    <button class="ml-6 btn" @click="handleClick('bottom')">
      toast-bottom
    </button>
    <div class="toasts" :style="currentStyle">
      <div
        v-for="item in toastList"
        class="toast"
        :key="item"
        :style="item.style"
      >
        <span :class="item.type">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const toastList = ref<any[]>([]);
const messages = [
  "Message One",
  "Message Two",
  "Message Three",
  "Message Four",
];

const types = ["info", "success", "error"];

const currentStyle = ref<any>({});

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomType() {
  return types[Math.floor(Math.random() * types.length)];
}

function handleClick(direction: string) {
  const label = getRandomMessage();
  if (direction === "top") {
    currentStyle.value = {};
    currentStyle.value.top = "50px";
  } else {
    currentStyle.value = {};
    currentStyle.value.bottom = "50px";
  }
  toastList.value.push({
    label: label,
    type: getRandomType(),
  });

  setTimeout(() => {
    toastList.value.shift();
  }, 1500);
}
</script>

<style lang="scss" scoped>
.btn {
  padding: 10px 20px;
  border-radius: 5px;
  background: #f80;
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.9);
  }
}

.toasts {
  display: flex;
  position: fixed;
  right: 20px;
  bottom: 50px;
  flex-direction: column;
  align-items: flex-end;
}

.toast {
  margin: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  background-color: #fff;

  .info {
    color: rebeccapurple;
  }

  .success {
    color: green;
  }

  .error {
    color: red;
  }
}
</style>
