import { defineComponent } from "vue";
import styles from "./HoneyComb.module.scss";
import scenery1 from "@/assets/system/ProjectManager10.png";

export const HoneyComb = defineComponent({
  name: "HoneyComb",
  setup() {
    return () => (
      <div class={styles["container"]}>
        <div class={styles.content}>
          <img src={scenery1} alt="" />
          <img src={scenery1} alt="" />
          <img src={scenery1} alt="" />
          <img src={scenery1} alt="" />
          <img src={scenery1} alt="" />
          <img src={scenery1} alt="" />
          <img src={scenery1} alt="" />
        </div>
      </div>
    );
  },
});
