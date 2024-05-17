// import { ElButton } from "element-plus";
import { defineComponent, ref } from "vue";
import styles from "./navigation.module.scss";

export const Navigation = defineComponent({
  setup() {
    const list = ["Home", "Works", "About", "Contact"];
    const active = ref(false);
    return () => (
      <div>
        <h1>Navigation-{active.value ? "open" : "close"}</h1>
        <nav class={[styles.content, active.value ? styles.active : ""]}>
          <ul class={["flex justify-center", styles.list]}>
            {list.map((item) => (
              <li
                class={[
                  "flex justify-center items-center p-5 w-20 rounded",
                  styles["li-item"],
                ]}
              >
                <a href="">{item}</a>
              </li>
            ))}
          </ul>
          <button
            class={styles.icon}
            onClick={() => {
              active.value = !active.value;
            }}
          >
            <div class={[styles.line, styles.line1]}></div>
            <div class={[styles.line, styles.line2]}></div>
          </button>
        </nav>
      </div>
    );
  },
});
