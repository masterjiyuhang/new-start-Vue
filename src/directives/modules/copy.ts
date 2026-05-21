import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";

interface ElType extends HTMLElement {
  copyData: string | number;
  __handleClick__: (this: HTMLElement) => void;
}

function handleClick(this: HTMLElement) {
  const text = (this as ElType).copyData.toLocaleString();

  navigator.clipboard
    .writeText(text)
    .then(() => {
      ElMessage({
        type: "success",
        message: "复制成功",
      });
    })
    .catch((err) => {
      console.error("Error copying text: ", err);
      ElMessage({
        type: "error",
        message: "复制失败",
      });
    });
}

const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
    el.__handleClick__ = handleClick.bind(el);
    el.addEventListener("click", el.__handleClick__);
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  },
};

export default copy;
