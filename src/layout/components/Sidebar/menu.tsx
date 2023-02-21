import { defineComponent, inject, PropType, ref, renderList } from "vue";
import { ElMenu, ElSubMenu, ElMenuItem, ElIcon } from "element-plus";
import { useRouter } from "vue-router";
import { Apple, Menu } from "@element-plus/icons-vue";

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
  name: "CchMenu",
  components: { ElMenu, ElSubMenu, ElMenuItem, ElIcon },
  emits: ["click"],
  props,
  inject: ["isCollapse"],

  setup(props, { emit }) {
    const isCollapse = inject("isCollapse");
    console.log(isCollapse, props.title, "asdasdasd");

    const menuList = [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          icon: (
            <el-icon>
              <Apple />
            </el-icon>
          ),
        },
      },
      {
        path: "/welcome",
        name: "welcome",
        meta: {
          icon: (
            <el-icon>
              <Apple />
            </el-icon>
          ),
        },
      },
      {
        path: "/asd",
        name: "welcomasde",
        meta: {
          icon: (
            <el-icon>
              <Apple />
            </el-icon>
          ),
        },
      },
      {
        path: "/car",
        name: "车辆管理",
        weight: -2,
        meta: {
          icon: (
            <el-icon>
              <Menu />
            </el-icon>
          ),
        },
        children: [
          {
            path: "/car/list",
            name: "列表",
            meta: {
              icon: (
                <el-icon>
                  <Apple />
                </el-icon>
              ),
            },
          },
          {
            path: "/car/detail",
            name: "详情",
            meta: {
              icon: (
                <el-icon>
                  <Apple />
                </el-icon>
              ),
            },
          },
        ],
      },
    ];

    const selected = ref("");
    const router = useRouter();

    const handleOpen = () => {
      console.log("打开");
    };
    const handleClose = () => {
      console.log("关闭");
    };

    const onSelect = (index) => {
      console.log(index, "打开");
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

    const renderMenuItem = (menu, index) => {
      const { path, meta, name } = menu;
      return (
        <el-menu-item index={path} key={`__cch_m_i_${index}_${path}`}>
          {meta && meta.icon}
          {name}
        </el-menu-item>
      );
    };

    const renderChildItem = (menu, index) => {
      const { meta, path, name, children } = menu;
      return (
        <el-sub-menu
          index={path}
          key={`__cch_sub_m_i_${index}_${path}`}
          v-slots={{
            title: () => {
              return (
                <>
                  {meta.icon}
                  {name}
                </>
              );
            },
          }}
        >
          {renderList(children, (childMenu, childIndex) => {
            if (childMenu.children) {
              return renderChildItem(childMenu, childIndex);
            }
            return renderMenuItem(childMenu, childIndex);
          })}
        </el-sub-menu>
      );
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
          {menuList.map((item, index) => {
            console.log(item, index);

            if (item.children) {
              return renderChildItem(item, index);
            }

            // 没有子菜单
            return renderMenuItem(item, index);
            // return (
            //   <el-menu-item
            //     index={item.path}
            //     v-slots={{
            //       title: () => (
            //         <>
            //           {item.meta.icon}
            //           {item.name}
            //         </>
            //       ),
            //     }}
            //   ></el-menu-item>
            // );
          })}
        </el-menu>
      </div>
    );
  },
});
