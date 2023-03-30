/*
 * @Author: erHangdaDevil
 * @Date: 2023-03-30 09:08:20
 * @LastEditors: erHangdaDevil jiyuhang@jctrans.net
 * @LastEditTime: 2023-03-30 23:28:02
 */

import { defineComponent, ref } from "vue";

/**
 * ref template 自动解包.value tsx并不会自动解包
 * v-show 支持
 * v-if 不支持
 * v-bind {}替代
 * props
 * emit
 * slot
 */

interface Props {
  name?: string;
}

const A = (_, { slots }) => (
  <div>
    <div>{slots.default ? slots.default() : "默认值"}</div>
    <div>{slots.title?.()}</div>
  </div>
);

export default defineComponent({
  props: {
    name: String,
  },
  emits: ["onClick"],
  setup(props: Props, { emit }) {
    const data = [{ name: "cch" }, { name: "erhang" }];

    const handleClick = (e: any) => {
      console.log("点击了", e);
      emit("onClick", e);
    };

    const pig = ref<string>("pig");
    return () => (
      <div>
        testDefineComponent:{props.name}
        <hr />
        <input type="text" v-model={pig.value} />
        <h2>{pig.value}</h2>
        <hr />
        <A
          v-slots={{
            default: () => <div> 插槽 默认 default slots</div>,
            title: () => <div>插槽 默认 title</div>,
          }}
        />
        <ul>
          {data.map((item) => {
            return (
              <li onClick={() => handleClick(item)} name={item.name}>
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
});
