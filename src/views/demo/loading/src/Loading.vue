<template>
  <section
    class="full-loading"
    :class="{ absolute, [theme]: !!theme }"
    :style="[background ? `background-color: ${background}` : '']"
    v-show="loading"
  >
    <TestSpinner visible />
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="tips">
        {{ tips }}
      </slot>
    </footer>
  </section>
</template>

<script setup lang="ts">
import {
  Transition,
  createVNode,
  defineComponent,
  h,
  ref,
  vShow,
  withCtx,
  withDirectives,
} from "vue";
import { SizeEnum } from "./constant";

defineOptions({
  name: "Loading",
});

interface LoadingProps {
  tips?: string;

  size?: SizeEnum;

  absolute?: boolean;

  loading?: boolean;

  background?: string;

  theme?: "dark" | "light";
}

withDefaults(defineProps<LoadingProps>(), {
  size: SizeEnum.DEFAULT,

  loading: false,

  theme: "dark",

  absolute: false,

  tips: "Loading...",
});

const TestSpinner = defineComponent({
  name: "TestSpinner",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const afterLeave = ref(false);

    const handleAfterLeave = () => {
      if (!afterLeave.value) return;

      const target = document.body;

      afterLeave.value = false;

      console.log(target);
    };
    return () => {
      const spinner = h("svg", {
        class: "circular",
        viewBox: "0 0 50 50",
        ...{},
      });

      const spinnerText = h("p", { class: "text" }, "巴啦啦啦～");

      return h(
        Transition,
        {
          name: "fade",
          onAfterLeave: handleAfterLeave,
        },
        {
          default: withCtx(() => [
            withDirectives(
              createVNode("div", {}, [h("div", {}, [spinner, spinnerText])]),
              [[vShow, props.visible]]
            ),
          ]),
        }
      );
    };
  },
});
</script>

<style scoped></style>
