import { defineComponent, ref } from "vue";
import { ElButton } from "element-plus";

export function tsxComp1() {
  return <div>tsxComp1</div>;
}

export const tsxComp2 = defineComponent({
  components: { ElButton },
  props: {
    message: String,
  },
  setup(props) {
    const flag = ref(true);
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
