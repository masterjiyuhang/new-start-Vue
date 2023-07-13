import { defineComponent } from "vue";
import styles from "./stitch.module.scss";

export const Stitch = defineComponent({
  name: "Stitch",
  setup() {
    return () => <div class={styles["container"]}></div>;
  },
});
