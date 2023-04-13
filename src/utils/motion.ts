import { defineComponent, h, resolveDirective, withDirectives } from "vue";
export default defineComponent({
  name: "Motion",
  props: {
    delay: {
      type: Number,
      default: 50,
    },
  },
  render() {
    const { delay } = this;
    const motion = resolveDirective("motion");
    return withDirectives(
      h(
        "div",
        {},
        {
          default: () => [this.$slots],
        }
      ),
      [
        [
          motion,
          {
            initial: { opacity: 0, y: 100 },
            enter: {
              opacity: 1,
              y: 0,
              transition: {
                delay,
              },
            },
          },
        ],
      ]
    );
  },
});
