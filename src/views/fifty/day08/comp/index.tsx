import { PropType, defineComponent } from "vue";
import styles from "./index.module.scss";

export const FormWareLabel = defineComponent({
  name: "FormWare",
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    console.log(props);
    return () => (
      <label>
        {props.label.split("").map((item, idx) => {
          return (
            <span
              class={"ss-item"}
              style={{
                "transition-delay": `${idx * 50}ms`,
              }}
            >
              {item}
            </span>
          );
        })}
      </label>
    );
  },
});

export const HasMore = defineComponent({
  name: "HasMore",
  props: {
    // 你可以在这里定义组件接受的属性（props）
    // 例如：
    moreText: {
      type: String,
      default: "加载更多",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array as PropType<{ id: number; content: string }[]>,
      default: () => [],
    },
  },
  setup(props, { slots }) {
    return () => (
      <div class="flex items-center justify-center">
        <div class={[styles.container, "px-8", "py-4"]}>
          {/* 使用默认插槽 */}
          {slots.default && slots.default()}

          {/* 使用具名插槽，例如：hasMoreSlot */}
          {slots.hasMore && slots.hasMore()}

          {/* 假设有一个名为 'loading' 的插槽，用于显示加载状态 */}
          {props.isLoading ? slots.loading && slots.loading() : null}

          {/* 使用作用域插槽，传递数据给插槽 */}
          {slots.item && props.items.map((item) => slots.item?.({ item }))}
        </div>
      </div>
    );
  },
});
