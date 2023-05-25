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
import "./spinner.scss";

export const TestSpinner = defineComponent({
  name: "TestSpinner",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: "",
    },

    // 是否全屏展示
    isFullScreen: {
      type: Boolean,
      default: false,
    },

    // 自定义类名
    customClassName: String,
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
              createVNode(
                "div",
                {
                  style: { backgroundColor: props.background || "" },
                  class: [
                    "spinner-mask",
                    props.customClassName,
                    props.isFullScreen ? "is-fullscreen" : "",
                  ],
                },
                [h("div", {}, [spinner, spinnerText])]
              ),
              [[vShow, props.visible]]
            ),
          ]),
        }
      );
    };
  },
});
