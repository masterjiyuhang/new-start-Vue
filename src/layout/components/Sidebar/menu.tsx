import { defineComponent, inject, PropType } from "vue";

const props = {
  /** 头部最左边的标题 */
  title: {
    type: String,
    default: "列表",
  },
  /** 对于树形表格，如果想启用展开和折叠功能，传入当前表格的ref即可 */
  tableRef: {
    type: Object as PropType<any>,
  },
};

export default defineComponent({
  name: "Menu",
  emits: ["click"],
  props,
  inject: ["isCollapse"],
  setup(props, { emit }) {
    const isCollapse = inject("isCollapse");
    console.log(isCollapse, props.title, "asdasdasd");

    return () => (
      <div>
        <div>menu</div>
      </div>
    );
  },
});
