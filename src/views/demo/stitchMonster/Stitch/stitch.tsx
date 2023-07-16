import { defineComponent } from "vue";
import styles from "./stitch.module.scss";

// 纠结缝合怪
export const Stitch = defineComponent({
  name: "Stitch",
  setup() {
    return () => (
      <div>
        <AudioLoading />
        <AnnulusLoading />
      </div>
    );
  },
});

// 媒体loading
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

// 环状loading
export const AnnulusLoading = defineComponent({
  name: "AnnulusLoading",
  setup() {
    return () => (
      <div class={styles.container}>
        <div class={styles["annulus-content"]}>
          <div class={styles.item1} />
          <div class={styles.item2} />
          <div class={styles.item3} />
          <div class={styles.item4} />
          <div class={styles.item5} />
          <div class={styles.item6} />
          <div class={styles.item7} />
        </div>
      </div>
    );
  },
});
