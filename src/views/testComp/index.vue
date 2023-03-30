<template>
  <div>
    <p>{{ word }}</p>
    <p>
      interval:
      <input v-model="interval" type="number" placeholder="interval" />
    </p>
    <button v-if="isActive" class="orange" @click="pause">Pause</button>
    <button v-if="!isActive" @click="resume">Resume</button>
  </div>
</template>

<script setup lang="ts">
import { useState } from "@/hooks/useState";
import { rand } from "@/utils/is";
import { ref } from "vue";
const { useIntervalCchFn } = useState();

const greetings = [
  "Hello",
  "Hi",
  "Yo!",
  "Hey",
  "Hola",
  "こんにちは",
  "Bonjour",
  "Salut!",
  "你好",
  "Привет",
];
const word = ref("Hello");
const interval = ref(500);

const { pause, resume, isActive } = useIntervalCchFn(() => {
  word.value = greetings[rand(0, greetings.length - 1)];
}, interval);
</script>

<style scoped></style>
