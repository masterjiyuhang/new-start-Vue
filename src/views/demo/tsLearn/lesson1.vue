<template>
  <div class="wrapper-page">
    <div class="text-2xl">基础类型</div>
    <div class="ts-demo-card flex-ac">
      <div class="text-">原始类型</div>
      <div v-for="item in state.primitives" :key="item.id">
        <div>类型名称: {{ item.name }}</div>
        <div>类型展示: {{ item.type }}</div>
        <div>例子: {{ item.example }}</div>
      </div>
    </div>
    <div class="mt-5 ts-demo-card flex-ac">
      <div class="text-">数组</div>
      <div v-for="item in state.arr" :key="item.id">
        <div>类型名称: {{ item.name }}</div>
        <div>类型展示: {{ item.type }}</div>
        <div>例子: {{ item.example }}</div>
      </div>
    </div>
    <div class="mt-5 ts-demo-card flex-ac">
      <div class="text-">特殊类型</div>
      <div v-for="item in state.special" :key="item.id">
        <div>类型名称: {{ item.name }}</div>
        <div>类型展示: {{ item.type }}</div>
        <div>例子: {{ item.example }}</div>
        <div class="desc" v-if="item.type === 'any'">
          当你不想写一个长长的类型代码，仅仅想让 TypeScript
          知道某段特定的代码是没有问题的，any 类型是很有用的。
        </div>
      </div>
    </div>
    <div class="mt-5 ts-demo-card flex-ac">
      <div class="text-">对象类型</div>
      <div v-for="item in state.ObjectTypes" :key="item.id">
        <div>类型名称: {{ item.name }}</div>
        <div>类型展示: {{ item.type }}</div>
        <div>例子: {{ item.example }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
    <div class="mt-5 ts-demo-card flex-ac">
      <div class="text-">联合类型</div>
      <div v-for="item in state.UnionTypes" :key="item.id">
        <div>类型名称: {{ item.name }}</div>
        <div>类型展示: {{ item.type }}</div>
        <div>例子: {{ item.example }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>

    <el-input v-model="myName" class="mt-5"></el-input>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from "vue";
import { ElMessage } from "element-plus";

const state = reactive({
  primitives: [
    {
      id: 1,
      name: "字符串",
      type: "string",
      example: "Hello, world!",
    },
    {
      id: 2,
      name: "数字",
      type: "number",
      example: 11111,
    },
    {
      id: 3,
      name: "布尔值",
      type: "boolean",
      example: true,
    },
  ], // 原始类型
  arr: [
    {
      id: 1,
      name: "数组",
      type: "number[]/string[]/Array<number>",
      example: "let arr: number[] = [1, 2, 3, 4]",
    },
  ],
  special: [
    {
      id: 1,
      name: "特殊类型",
      type: "any",
      example: "let obj: any = { x: 0 };",
    },
  ],
  // 对象类型
  ObjectTypes: [
    {
      id: 1,
      name: "对象类型",
      type: "{xx?: string}",
      example: "obj: { first: string; last?: string }",
      desc: "简单的列出它的属性和对应的类型，支持?指定一些属性为可选的",
    },
  ],
  // 联合类型
  UnionTypes: [
    {
      id: 1,
      name: "联合类型",
      type: "x: number[] | string",
      example: "id: number | string",
      desc: `一个联合类型是由两个或者更多类型组成的类型，表示值可能是这些类型中的任意一个。`,
      // 如果联合类型里的每个成员都有一个属性，举个例子，数组和字符串都有 slice 方法，你就可以直接使用这个属性，而不用做类型收窄
    },
  ],
});

// 变量上的注解 （Type Annotations on Variables）
const myName = ref<string>("erhang");

// 函数 TypeScript 允许你指定函数的输入值和输出值的类型。
const greet = (name: string): void => {
  ElMessage.error(`哈哈 你输入了，${name.toLocaleLowerCase()}!!`);
};
watchEffect(() => {
  /**
   * watchEffect 的回调函数会运行两次。
   * 这是因为在该响应式变量创建时，它还没有下一帧可监控的变化，所以打印初始值并调用 greet 成功，随后在set value的过程中它会再次运行 watchEffect 回调函数。
   * 这些行为在测试 RxJS 等库时很常见。常见的解决方法是使用 watch 函数，将 immediate 选项设置为 true。这样不仅可以解决这个问题，还可以处理在第一个监测到的变化时调用回调的情况。
   * 所以，如果希望每次响应式变量的值更新时只运行一次回调函数，可以尝试使用 watch 函数，并设置 immediate 选项为 true。
   */
  console.log(myName.value, "是否有变化");
  greet(myName.value);
});

// 类型别名
type Point = {
  x: number;
  y: number;
};

// 接口
interface Animal {
  name: string;
}
// 通过继承扩展类型
interface Bear extends Animal {
  honey: boolean;
}
// 对一个已经存在的接口添加新的字段
interface Animal {
  hobby?: string;
}

// 类型别名和接口，两者最关键的差别在于类型别名本身无法添加新的属性，而接口是可以扩展的。
const printCoord = (pt: Point) => {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
};
printCoord({ x: 2, y: 3 });

const getBear = (item: Bear): Bear => {
  return item;
};
const bear: Bear = getBear({ name: "小蜜蜂", honey: true, hobby: "采蜜" });
console.log(bear, "看看小蜜蜂吧");
</script>

<style scoped></style>
