<template>
  <div :code-location="codeLocation">
    <el-dialog v-model="dialogVisible" :title="title" width="500" @close="onClose">
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
interface Props {
  codeLocation?: string;
  visible?: boolean;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: "Tips",
});

const emit = defineEmits<{
  "update:visible": [value: boolean];
}>();

const dialogVisible = computed({
  get: () => props.visible,
  set: (val: boolean) => emit("update:visible", val),
});

const onClose = () => {
  emit("update:visible", false);
};
</script>
