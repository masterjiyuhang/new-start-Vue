<script setup lang="ts">
const reset = () => {
  console.log("reset");
};

defineExpose({
  reset
})
</script>

<script lang="ts">
export default {
  name: "SeamlessScroll",
};
</script>

<template>
  <div class="seamless-scroll" @click="reset">seamless-scroll</div>
</template>
