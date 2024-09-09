<script setup lang="ts">
import { reactive, shallowRef } from "vue";
import { useAnimate } from "@vueuse/core";
import type { MaybeElement } from "@vueuse/core";

const el = shallowRef<MaybeElement>();

const {
  play,
  pause,
  reverse,
  finish,
  cancel,
  startTime,
  currentTime,
  playbackRate,
  playState,
  replaceState,
  pending,
} = useAnimate(
  el,
  [
    {
      clipPath: "circle(20% at 0% 30%)",
    },
    {
      clipPath: "circle(20% at 50% 80%)",
    },
    {
      clipPath: "circle(20% at 100% 30%)",
    },
  ],
  {
    duration: 3000,
    // iterations: 5,
    direction: "alternate",
    easing: "cubic-bezier(0.46, 0.03, 0.52, 0.96)",
  },
);

const text = reactive({
  startTime,
  currentTime,
  playbackRate,
  playState,
  replaceState,
  pending,
});
</script>

<template>
  <div>
    <div class="flex items-center justify-center w-full h-60">
      <p ref="el" class="text-5xl! text-$vp-c-brand font-800 bg-yellow-200">
        VueUse useAnimate
      </p>
    </div>
    <div>
      <el-button v-if="playState === 'running'" @click="pause">pause</el-button>
      <el-button v-else @click="play">play</el-button>
      <el-button @click="reverse">reverse</el-button>
      <el-button @click="finish">finish</el-button>
      <el-button @click="cancel">cancel</el-button>
    </div>
    <pre class="code-block">{{ text }}</pre>
  </div>
</template>
