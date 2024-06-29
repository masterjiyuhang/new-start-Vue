<template>
  <div>
    <div class="background"></div>
    <div class="p-10 text-center bg-white rounded shadow-md">
      <h1 class="text-3xl">Image Password Strength</h1>
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
        <input
          type="password"
          class="block w-full p-2 mt-2 border rounded"
          id="password"
          placeholder="Enter Password"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
