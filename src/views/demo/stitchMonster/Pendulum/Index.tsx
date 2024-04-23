import { defineComponent } from "vue";
import styles from "./Pendulum.module.scss";

export const Pendulum = defineComponent({
  name: "Pendulum",
  setup() {
    return () => (
      <div class={styles.container}>
        <div class={styles.dot}></div>
        <div class={styles.dot}></div>
        <div class={styles.dot}></div>
        <div class={styles.dot}></div>
      </div>
    );
  },
});
