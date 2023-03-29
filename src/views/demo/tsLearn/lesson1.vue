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

    <!-- <el-input v-model="myName" class="mt-5"></el-input> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect, watch, nextTick } from "vue";
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
    {
      id: 4,
      name: "非常大的整数",
      type: "bigint",
      example: "Bigint(1000)",
    },
    {
      id: 5,
      name: "symbol",
      type: "Symbol",
      example: "Symbol('name')",
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
  ElMessage.success(`哈哈 你输入了，${name.toLocaleLowerCase()}!!`);
};
watchEffect(async () => {
  /**
   * watchEffect 的回调函数会运行两次。
   * 这是因为在该响应式变量创建时，它还没有下一帧可监控的变化，所以打印初始值并调用 greet 成功，随后在set value的过程中它会再次运行 watchEffect 回调函数。
   * 这些行为在测试 RxJS 等库时很常见。常见的解决方法是使用 watch 函数，将 immediate 选项设置为 true。这样不仅可以解决这个问题，还可以处理在第一个监测到的变化时调用回调的情况。
   * 所以，如果希望每次响应式变量的值更新时只运行一次回调函数，可以尝试使用 watch 函数，并设置 immediate 选项为 true。
   */

  //  通过使用 nextTick 方法可以确保在组件完成初始渲染后再执行 greet 函数，避免在组件挂载时的多余调用。
  await nextTick()
  console.log(myName.value, "watchEffect 是否有变化");
  greet(myName.value);
});

watch(
  () => myName.value,
  (newValue) => {
    console.log(newValue, "watch  是否有变化");

    greet(myName.value);
  },
  { immediate: true } // 设置 immediate 选项为 true
);

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

const getBear = (item: Bear): Bear => {
  return item;
};
const bear: Bear = getBear({ name: "小蜜蜂", honey: true, hobby: "采蜜" });

/**
 * 类型断言
 * 你知道一个值的类型，typescript不知道
 * 使用as作为类型断言指定一个更具体的内容
 * 就像类型注解一样，类型断言也会被编译器移除，并且不会影响任何运行时的行为。
 * 你也可以使用尖括号语法（注意不能在 .tsx 文件内使用），是等价的。
 * 因为类型断言会在编译的时候被移除，所以运行时并不会有类型断言的检查，即使类型断言是错误的，也不会有异常或者 null 产生。
 */
const myCanvas = document.getElementById("main-canvas") as HTMLCanvasElement;
const myCanvas1 = <HTMLCanvasElement>document.getElementById("main_canvas");

/**
 * 字面量类型 Literal Types
 * 这种方式声明的变量则不能被修改，如果结合联合类型，就显得有用多了。
 *
 * 使用 as const 转为一个类型字面量
 */

let x: "hello" | "left" = "hello";
// as const 效果跟 const 类似，但是对类型系统而言，它可以确保所有的属性都被赋予一个字面量类型，而不是一个更通用的类型比如 string 或者 number 。
let y = "asd" as const;

/**
 * 非空断言操作符 （后缀 !）(Non-null Assertion Operator)
 * TypeScript 提供了一个特殊的语法，可以在不做任何检查的情况下，从类型中移除 null 和 undefined，
 * 这就是在任意表达式后面写上 ! ，这是一个有效的类型断言，表示它的值不可能是 null 或者 undefined。
 */
function liveDangerously(x?: number | null) {
  // No error
  // 只有当你明确的知道这个值不可能是 null 或者 undefined 时才使用 ! 。
  console.log(x!.toFixed());
}

// 页面垃圾桶
const trashCans = reactive([
  liveDangerously,
  y,
  x,
  myCanvas1,
  myCanvas,
  bear,
  printCoord,
]);
console.log("这是一个当前页面的垃圾桶~", trashCans);
</script>

<style scoped></style>
