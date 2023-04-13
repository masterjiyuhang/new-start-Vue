import { defineComponent, h } from "vue";
import TypeIt from "typeit";

export default defineComponent({
  name: "CchTypeCode",
  props: {
    className: {
      type: String,
      default: "type-it",
    },
    values: {
      type: Array,
      default: () => [],
    },
    speed: {
      type: Number,
      default: 250,
    },
    cursor: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    new TypeIt(`.${this.className}`, {
      strings: this.values as string[] | string,
      speed: this.speed,
      cursor: this.cursor,
    }).go();
  },
  render() {
    return h(
      "span",
      {
        class: this.className,
      },
      {
        default: () => [],
      }
    );
  },
});
