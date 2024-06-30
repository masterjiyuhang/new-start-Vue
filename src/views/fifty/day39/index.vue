<template>
  <div
    class="relative flex flex-col items-center justify-center h-full m-0 overflow-hidden wrapper-page"
  >
    <div
      class="background"
      ref="bgRef"
      :style="{
        filter: `blur(${blur}px)`,
      }"
    ></div>
    <div class="z-10 p-10 text-center bg-white rounded shadow-md">
      <h1 class="text-3xl text-black">Image Password Strength</h1>
      <p class="text-sm text-gray-700">Change the password to see the effect</p>
      <div class="my-4 text-left">
        <label for="email" class="text-gray-900">Email:</label>
        <input
          type="text"
          class="block w-full p-2 mt-2 border rounded"
          id="email"
          placeholder="Enter Email"
        />
      </div>
      <div class="my-4 text-left">
        <label for="email" class="text-gray-900">Password:</label>
        <el-input
          v-model="password"
          type="password"
          class="block w-full p-2 mt-2 border rounded"
          placeholder="Enter Password"
          @input="handlePwdInput"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const bgRef = ref();
const blur = ref(20);
const password = ref("");
function handlePwdInput(input: string) {
  // if (e.target) {
  //   const input = (e.target as HTMLInputElement).value;
  const length = input.length;
  const blurValue = 20 - length * 2;
  blur.value = blurValue > 0 ? blurValue : 0;
  // }
}
</script>

<style scoped lang="scss">
.background {
  position: absolute;
  z-index: 0;
  inset: -20px;
  background: url("@/assets/images/login_left4.png") no-repeat center
    center/cover;
  filter: blur(20px);
}
</style>
