<template>
  <div class="wrapper-page">
    <div class="flex flex-col gap-4 w-52">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full skeleton shrink-0"></div>
        <div class="flex flex-col gap-4">
          <div class="w-20 h-4 skeleton"></div>
          <div class="h-4 skeleton w-28"></div>
        </div>
      </div>
      <div class="w-full h-32 skeleton"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.skeleton {
  @apply bg-gray-200 rounded-lg;

  animation: skeleton 1.8s ease-in-out infinite;
  background-image: linear-gradient(
    105deg,
    transparent 0%,
    transparent 40%,
    #fff 50%,
    transparent 60%,
    transparent 100%
  );
  background-repeat: no-repeat;
  background-size: 200% auto;
  will-change: background-position;
  background-position-x: -50%;
}

@media (prefers-reduced-motion) {
  .skeleton {
    animation-duration: 15s;
  }
}

@keyframes skeleton {
  from {
    background-position: 150%;
  }

  to {
    background-position: -50%;
  }
}
</style>
