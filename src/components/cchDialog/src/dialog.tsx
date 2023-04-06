import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CchDialog",
  props: {
    codeLocation: {
      type: String,
      required: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const count = ref(1);
    return () => (
      <div code-location={props.codeLocation} v-show={props.visible}>
        cch dialog {props.codeLocation} {count.value}
      </div>
    );
  },
});
