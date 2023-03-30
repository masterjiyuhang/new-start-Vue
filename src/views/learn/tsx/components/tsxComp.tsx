import { defineComponent, ref } from "vue";
import { ElButton } from "element-plus";

export function tsxComp1() {
  return <div>tsxComp1</div>;
}

export const tsxComp2 = defineComponent({
  props: {
    message: String,
  },
  components: { ElButton },
  setup(props) {
    const flag = ref(true);
    const str = "假设有一个字符串";
    return () => (
      <div>
        <el-button onClick={() => (flag.value = !flag.value)}>
          切换按钮
        </el-button>
        <div v-show={flag.value}> v-show {props.message}</div>
      </div>
    );
  },
});
