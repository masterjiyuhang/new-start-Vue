import { defineComponent, watch, h, onMounted } from "vue";
import { useImageVerify } from "./useImageVerify";

interface Props {
  code?: string;
}
const { setImgCode, getImgCode, imgCode, domRef } = useImageVerify();

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
  emits: ["update:code", "reGenCode"],
  expose: ["re"],
  setup(props: Props, { emit }) {
    watch(
      () => props.code,
      (newVal: string) => {
        setImgCode(newVal);
      }
    );

    onMounted(() => {
      getImgCode();
    });

    watch(imgCode, (newVal) => {
      emit("update:code", newVal);
    });

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
      });
  },
  methods: {
    re: getImgCode,
  },
});
