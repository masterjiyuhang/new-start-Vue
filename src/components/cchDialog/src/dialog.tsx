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
  },
  components: {
    ElDialog,
  },
  emits: ["update:visible"],

  setup(props, { slots, emit }) {
    const count = ref(1);
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
    };

    return () => (
      <div code-location={props.codeLocation} v-show={props.visible}>
        <el-dialog
          v-model={currentVisible.value}
          title="Tips"
          width="500"
          onOpen={() => {
            console.log("open");
          }}
          onClose={close}
        >
          <span>This is a message</span>
          cch dialog {props.codeLocation} {count.value}
          {slots.default && slots.default()}
        </el-dialog>
      </div>
    );
  },
});
