import type { Directive, DirectiveBinding } from "vue";

interface ElType extends HTMLElement {
  copyData: string | number;
  __handleClick__: any;
}

const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
    el.addEventListener("click", handleClick);
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  },
};

function handleClick(this: any) {
  const text = this.copyData.toLocaleString();

  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Error copying text: ", err);
    });
}

export default copy;
