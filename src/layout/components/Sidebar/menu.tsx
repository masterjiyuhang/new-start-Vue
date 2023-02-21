import { defineComponent, inject, PropType, ref } from "vue";
import { ElMenu, ElSubMenu, ElMenuItem } from "element-plus";
import { useRouter } from "vue-router";

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
  components: { ElMenu, ElSubMenu, ElMenuItem },
  emits: ["click"],
  props,
  inject: ["isCollapse"],

  setup(props, { emit }) {
    const isCollapse = inject("isCollapse");
    console.log(isCollapse, props.title, "asdasdasd");

    const selected = ref("");
    const router = useRouter();

    const handleOpen = () => {
      console.log("打开");
    };
    const handleClose = () => {
      console.log("关闭");
    };

    const onSelect = (index) => {
      // 在新标签打开
      if (index.indexOf("target=_blank") !== -1) {
        const link = document.createElement("a");
        link.setAttribute("href", index);
        link.setAttribute("target", "_blank");
        link.click();
        return;
      }
      selected.value = index;
      router.push(index);
    };
    return () => (
      <div>
        <el-menu
          ref="menu"
          default-active="/dashboard"
          class="el-menu-vertical-demo"
          collapse={isCollapse}
          onOpen={handleOpen}
          onSelect={onSelect}
          onClose={handleClose}
        >
          <el-menu-item index="/dashboard">
            <slot name="title"> dashboard </slot>
          </el-menu-item>
          <el-menu-item index="/welcome">
            <slot name="title"> welcome </slot>
          </el-menu-item>
        </el-menu>
      </div>
    );
  },
});
