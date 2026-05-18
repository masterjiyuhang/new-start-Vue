<template>
  <span :class="value ? trueClass : falseClass">
    {{ value ? trueText : falseText }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  value?: boolean;
  trueText?: string;
  falseText?: string;
  trueClass?: string;
  falseClass?: string;
}

withDefaults(defineProps<Props>(), {
  value: false,
  trueText: "true",
  falseText: "false",
  trueClass: "text-primary",
  falseClass: "text-orange-400 dark:text-orange-300",
});
</script>
