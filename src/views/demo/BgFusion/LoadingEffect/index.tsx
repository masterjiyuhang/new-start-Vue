import { defineComponent } from "vue";
import styles from "./LoadingEffect.module.scss";

import welcome from "@/assets/system/HalloweenIllustrations3.png";
import img2 from "@/assets/system/HalloweenIllustrations4.png";
import img3 from "@/assets/system/HalloweenIllustrations5.png";
import img1 from "@/assets/system/HalloweenIllustrations6.png";

export const LoadingEffect = defineComponent({
  name: "LoadingEffect",
  setup() {
    return () => (
      <div class={styles["loading-container"]}>
        Loading effect
        <div class={styles.content}>
          <div class={styles.loadingItem1}>
            <img src={welcome} />
          </div>
          <div class={styles.loadingItem2}>
            <img src={img2} />
          </div>
          <div class={styles.loadingItem3}>
            <img src={img3} />
          </div>

          {/* <img src={result} id="mix" /> */}
          <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="mix">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <div class={styles.loadingResult}>
          <img src={img1} />
        </div>
      </div>
    );
  },
});
