import { ref, watch, defineProps, defineEmits } from "vue";

export const useDialog = () => {
  const props = defineProps<{
    visible?: boolean;
    list?: any[];
  }>();

  const currentVisible = ref(props.visible);

  const emits = defineEmits<{
    (e: "update:visible", value: boolean): void;
  }>();

  watch(
    () => props.visible,
    (newVal) => {
      currentVisible.value = newVal;
    }
  );

  watch(
    () => currentVisible.value,
    (newVal) => {
      emits("update:visible", newVal);
    }
  );

  return {
    props,
    currentVisible,
    emits,
  };
};
