import { defineComponent, inject, ref, renderList, unref, watch } from "vue";
import type { PropType } from "vue";
import { ElMenu, ElSubMenu, ElMenuItem, ElIcon, ElTooltip } from "element-plus";
import { useRoute, useRouter } from "vue-router";
// import { Apple, Menu } from "@element-plus/icons-vue";
import { useRenderElementIcon } from "@/hooks/useRenderElementIcon";

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
  components: { ElMenu, ElSubMenu, ElMenuItem, ElIcon, ElTooltip },
  inject: ["isCollapse", "menuList"],
  props,
  emits: ["click"],

  // setup(props, { emit }) {
  setup() {
    const isCollapse: any = inject("isCollapse");
    const provideMenuList: any = inject("menuList");
    const menuList = unref(provideMenuList.value);
    // console.log(isCollapse, menuList);

    const { renderIcon } = useRenderElementIcon();

    // // 渲染图标
    // const renderIcon = (icon?: string) => {
    //   if (!icon) {
    //     return null;
    //   }
    //   const IconComp = (
    //     ElementPlusIconsVue as { [key: string]: DefineComponent }
    //   )[icon];
    //   return (
    //     <el-icon>
    //       <IconComp />
    //     </el-icon>
    //   );
    // };

    // const menuLists = [
    //   {
    //     path: "/dashboard",
    //     name: "dashboard",
    //     meta: {
    //       icon: "Apple",
    //     },
    //   },
    //   {
    //     path: "/welcome",
    //     name: "welcome",
    //     meta: {
    //       icon: "Apple",
    //     },
    //   },
    //   {
    //     path: "/car",
    //     name: "车辆管理",
    //     weight: -2,
    //     meta: {
    //       icon: "Menu",
    //     },
    //     children: [
    //       {
    //         path: "/car/list",
    //         name: "列表",
    //         meta: {
    //           icon: "Menu",
    //         },
    //       },
    //       {
    //         path: "/car/detail",
    //         name: "详情",
    //         children: [
    //           {
    //             path: "/car/detail/asdasd",
    //             name: "详情列表",
    //             meta: {
    //               icon: "Apple",
    //             },
    //           },
    //         ],
    //         meta: {
    //           icon: "Apple",
    //         },
    //       },
    //     ],
    //   },
    // ];

    const selected = ref("");
    const route = useRoute();
    const router = useRouter();

    // const handleOpen = () => {
    //   console.log("打开");
    // };
    // const handleClose = () => {
    //   console.log("关闭");
    // };

    // 菜单选择时赋值
    const onSelect = (index: any) => {
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

    // 渲染menu
    const renderMenuItem = (menu: any, index: any, isSubMenuItem = false) => {
      const { url, path, meta, name } = menu;

      return (
        <el-menu-item index={url} key={`__cch_m_i_${index}_${path}`}>
          {isCollapse.value ? (
            // 是不是子菜单
            isSubMenuItem ? (
              <>
                {meta && meta.icon && renderIcon(meta.icon)}
                <span>{name}</span>
              </>
            ) : (
              <>
                <el-tooltip placement="right" effect="light" content={name}>
                  {/* <span>{name}</span> */}
                  {meta && meta.icon && renderIcon(meta.icon)}
                  <span>{name}????</span>
                </el-tooltip>
              </>
            )
          ) : (
            // )
            // 展开时
            <>
              {meta && meta.icon && renderIcon(meta.icon)}
              <span>{name}</span>
            </>
          )}
        </el-menu-item>
      );
    };

    // 渲染有children的menu
    const renderChildItem = (menu: any, index: any) => {
      const { url, meta, path, name, children } = menu;
      return (
        <el-sub-menu
          index={url}
          key={`__cch_sub_m_i_${index}_${path}`}
          v-slots={{
            title: () => {
              return (
                <>
                  {meta && meta.icon && renderIcon(meta.icon)}
                  <span>{name}</span>
                </>
              );
            },
          }}
        >
          {renderList(children, (childMenu, childIndex) => {
            if (childMenu.children) {
              return renderChildItem(childMenu, childIndex);
            }
            return renderMenuItem(childMenu, childIndex, true);
          })}
        </el-sub-menu>
      );
    };

    // 初始化时给menu默认打开的菜单赋值
    selected.value = route.path;

    // 监听路由变化，赋值menu展开项
    watch(
      () => route.path,
      (newVal) => {
        // console.log(newVal, "监听到的吧");
        selected.value = newVal;
      }
    );

    return () => (
      <div>
        {/* <a href="">{selected.value}</a> */}
        <el-menu
          ref="menu"
          default-active={selected.value}
          class="el-menu-vertical-demo"
          collapse={isCollapse.value}
          // onOpen={handleOpen}
          // onClose={handleClose}
          onSelect={onSelect}
        >
          {menuList.map((item: any, index: any) => {
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
