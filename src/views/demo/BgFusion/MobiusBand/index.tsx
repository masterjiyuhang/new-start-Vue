import { computed, defineComponent } from "vue";
import styles from "./MobiusBand.module.scss";

export const MobiusBand = defineComponent({
  name: "MobiusBand",
  props: {
    list: {
      type: Object,
      default: () => new Array<number>(20).fill(0),
    },
  },
  setup(props) {
    const list = computed(() => props.list);
    return () => (
      <div class={styles["mobius-container"]}>
        <div class={styles.content}>
          <div class={styles.circle}>
            {props.list.map((item: number, index: number) => {
              return <span key={index} class={styles[`span${index}`]}></span>;
            })}
          </div>
          <div class={styles.circle}>
            {list.value.map((item: number, index: number) => {
              return <span key={index} class={styles[`span${index}`]}></span>;
            })}
          </div>
          <div class={styles.circle}>
            {list.value.map((item: number, index: number) => {
              return <span key={index} class={styles[`span${index}`]}></span>;
            })}
          </div>
        </div>
      </div>
    );
  },
});
