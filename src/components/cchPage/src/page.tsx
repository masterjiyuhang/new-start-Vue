import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CchPage",
  props: {
    codeLocation: {
      type: String,
      required: false,
    },
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
