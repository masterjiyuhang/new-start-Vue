import { defineComponent } from "vue";
import styles from "./stitch.module.scss";

export const Stitch = defineComponent({
  name: "Stitch",
  setup() {
    return () => (
      <div>
        <AudioLoading />
      </div>
    );
  },
});

export const AudioLoading = defineComponent({
  name: "AudioLoading",
  setup() {
    const list = new Array(15).fill(0);
    return () => (
      <div class={styles.container}>
        <div class={styles["auto-loading-content"]}>
          {list.map((item: number, index: number) => (
            <span class={styles[`span${index}`]} key={index} />
          ))}
        </div>
      </div>
    );
  },
});
