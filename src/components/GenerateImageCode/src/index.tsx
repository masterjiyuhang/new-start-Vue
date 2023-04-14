import { defineComponent, watch, h } from "vue";
// import { defineComponent, watch, defineEmits, defineExpose, h } from "vue";

import { useImageVerify } from "./useImageVerify";

interface Props {
  code?: string;
}

// interface Emits {
//   (e: "update:code", code: string): void;
// }

// 生成图片验证码
export default defineComponent({
  name: "GenerateImageCode",
  props: {
    code: {
      type: String,
      default: "",
    },
    verifyCodeIsRight: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:code", "genCode"],
  expose: ["getImgCode"],
  setup(props: Props, { emit }) {
    const { setImgCode, getImgCode, imgCode, domRef } = useImageVerify();

    watch(
      () => props.code,
      (newVal: string) => {
        setImgCode(newVal);
      }
    );

    watch(imgCode, (newVal) => {
      emit("update:code", newVal);
    });

    // defineExpose({ getImgCode });

    return () =>
      h("canvas", {
        ref: domRef,
        onClick: getImgCode,
        class: "cursor-pointer",
        width: 120,
        height: 40,
        style: {
          width: "120px",
          height: "40px",
        },
        // style: {
        //   width: 120,
        //   height: 40,
        // },
      });
    // <canvas
    //   ref={domRef}
    //   width={120}
    //   height={40}
    //   class={"cursor-pointer"}
    //   onClick={getImgCode}
    // ></canvas>
  },
});
