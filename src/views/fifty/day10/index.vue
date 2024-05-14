<template>
  <div class="wrapper-page !bg-[#686de0] flex justify-center items-center">
    <div
      class="max-w-full bg-slate-100 rounded-xl w-[800px] py-16 px-5 text-center base-shadow"
    >
      <h3 class="m-0 leading-tight text-red-300 opacity-50">
        Don't Laugh Challenge
      </h3>
      <div class="joke">{{ joke }}</div>
      <button class="btn" @click="handleGetAnother">Get Another Joke</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const joke = ref("Enjoy Yourself~");
handleGetAnother();
async function handleGetAnother() {
  const res = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await res.json();
  joke.value = data.joke;
}
</script>

<style lang="scss" scoped>
.joke {
  max-width: 600px;
  margin: 50px auto;
  color: #333;
  font-size: 30px;
  letter-spacing: 1px;
  line-height: 40px;
}

.btn {
  padding: 14px 40px;
  border: 0;
  border-radius: 4px;
  background-color: #9f68e0;
  box-shadow:
    0 5px 15px rgb(0 0 0 / 20%),
    0 6px 6px rgb(0 0 0 / 10%);
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.88);
  }
}
</style>
