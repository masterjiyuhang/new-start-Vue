import { defineComponent } from "vue";
import styles from "./TankShaking.module.scss";

export const TankShaking = defineComponent({
  name: "TankShaking",
  setup() {
    return () => (
      <div class={styles["tank-shaking-container"]}>
        <div class={styles.content}>
          <div class={styles.bottle}>
            <div class={styles.water} />
          </div>
          <div class={styles.bottleBottom} />
        </div>
      </div>
    );
  },
});
