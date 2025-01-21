import { defineComponent, ref } from "vue";
import { ElDialog } from "element-plus";

export default defineComponent({
  name: "CchDialog",
  props: {
    codeLocation: {
      type: String,
      required: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Tips",
    },
  },
  components: {
    ElDialog,
  },
  emits: ["update:visible", "refresh"],

  setup(props, { slots, emit }) {
    // const count = ref(1);
    const currentVisible = ref(props.visible);
    // 同步 props 和内部状态
    watch(
      () => props.visible,
      (newVal) => {
        currentVisible.value = newVal;
      },
      { immediate: true },
    );

    // 双向绑定 visible
    watch(currentVisible, (newVal) => {
      emit("update:visible", newVal);
    });

    const close = () => {
      currentVisible.value = false;
      // emit("refresh");
    };

    return () => (
      <div code-location={props.codeLocation} v-show={props.visible}>
        <el-dialog
          v-model={currentVisible.value}
          title={props.title}
          width="500"
          onOpen={() => {
            console.log("open");
          }}
          onClose={close}
        >
          {/* <span>This is a message</span>
          cch dialog {props.codeLocation} {count.value} */}
          {slots.default && slots.default()}
        </el-dialog>
      </div>
    );
  },
});
