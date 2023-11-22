import { defineComponent } from "vue";
import styles from "./index.module.scss";

export default defineComponent({
  name: "ShakeButton",
  props: ["msg"],
  setup(props) {
    return () => (
      <>
        <button type="button" class={styles["shake-btn"]}>
          {" "}
          {props.msg}{" "}
        </button>
      </>
    );
  },
});
