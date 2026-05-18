<template>
  <canvas
    ref="domRef"
    class="cursor-pointer"
    width="120"
    height="40"
    style="width: 120px; height: 40px"
    @click="getImgCode"
  />
</template>

<script setup lang="ts">
import { useImageVerify } from "./useImageVerify";

interface Props {
  code?: string;
}

const props = withDefaults(defineProps<Props>(), {
  code: "",
});

const emit = defineEmits<{
  "update:code": [value: string];
}>();

const { setImgCode, getImgCode, imgCode, domRef } = useImageVerify();

watch(
  () => props.code,
  (newVal) => {
    setImgCode(newVal);
  },
);

onMounted(() => {
  getImgCode();
});

watch(imgCode, (newVal) => {
  emit("update:code", newVal);
});

defineExpose({ re: getImgCode });
</script>
