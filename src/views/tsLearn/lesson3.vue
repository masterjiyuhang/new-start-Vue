<template>
  <div class="wrapper-page">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="keyof 运算符" name="1">
        <div>
          keyof
          是一个单目运算符，接受一个对象类型作为参数，返回该对象的所有键名组成的联合类型。
        </div>
        <div class="text-cyan-500">
          {{
            `type MyObj = {
  foo: number,
  bar: string,
};`
          }}
          {{ `type Keys = keyof MyObj; // 'foo'|'bar'` }}
        </div>
        <div></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeNames = ref(["1"]);
const handleChange = (val: string[]) => {
  console.log(val);
};

/**
 * 采用交叉类型的写法 创建一种专门的类型
 */
type Capital<T extends string> = Capitalize<T>;

// 下面的写法会报错 类型“keyof Obj”不满足约束“string”。
// type MyKeys<Obj extends object> = Capital<keyof Obj>;

// 改成这样写就对了 string & keyof Obj等同于string & string|number|symbol进行交集运算，最后返回string，因此Capital<T extends string>就不会报错了。
export type MyKeys<Obj extends object> = Capital<string & keyof Obj>;

const str: Capital<"hello"> = "Hello";
console.log(str);

interface T {
  [prop: string]: string;
}

// keyof T返回的类型是string|number，原因是 JavaScript 属性名为字符串时，包含了属性名为数值的情况，因为数值属性名会自动转为字符串。
export type KeyT = keyof T; // string | number
</script>

<style scoped></style>
