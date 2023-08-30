import { defineComponent, ref } from "vue";
import styles from "./index.module.scss";

export default defineComponent({
  name: "demo1",
  props: {
    codeLocation: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const count = ref<string>("count");
    return () => (
      <div code-location={props.codeLocation} class={styles.container}>
        <div class={styles.left}></div>
        <div class={styles.middle}>{count.value}</div>
        <div class={styles.right}></div>
      </div>
    );
  },
});
