import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CchTable",
  props: {
    codeLocation: {
      type: String,
      required: false,
    },
    showTooltip: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const count = ref(1);
    return () => (
      <div code-location={props.codeLocation}>
        cch table {props.codeLocation} {count.value}
      </div>
    );
  },
});
