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

      <el-collapse-item title="in 运算符" name="2">
        <div>用来取出（遍历）联合类型的每一个成员类型。</div>
        <div class="text-cyan-500">
          type U = 'a'|'b'|'c'; type Foo = { [Prop in U]: number; };
        </div>
        <div>[Prop in U]表示依次取出联合类型U的每一个成员。</div>
      </el-collapse-item>

      <el-collapse-item title="[] 方括号运算符" name="3">
        <div>[] 用于去除对象的键值类型 比如 T[k]会返回对象T属性K的类型</div>
        <div>如果访问了不存在的属性，会报错</div>
        <div>
          参数也可以是属性名的索引类型 type Obj = { [key:string]: number } ,
          type T = Obj[string]
        </div>
        <div>方括号里面不能有值的运算。</div>
      </el-collapse-item>

      <el-collapse-item title="extends...?: 条件运算符" name="4">
        <div>
          T extends U ? X : Y; T是否为U的子类型，这里的T和U可以是任意类型。
        </div>
        <div>
          <span> (A|B) extends U ? X : Y;</span>
          <span> 等同于 (A extends U ? X : Y) | (B extends U ? X : Y)</span>
        </div>
        <div>
          如果不希望联合类型被条件运算符展开，可以把extends两侧的操作数都放在方括号里面。
          [Type] extends [any] ? Type[] : never;
        </div>
      </el-collapse-item>

      <el-collapse-item title="infer 关键字" name="5">
        <div>
          infer 用来定义泛型里面推断出来的类型参数，而不是外部传入的类型参数。
        </div>
      </el-collapse-item>

      <el-collapse-item title="is 运算符" name="6">
        <div>
          函数返回布尔值的时候，可以使用is运算符，限定返回值与参数之间的关系。
          is 运算符用来描述返回值属于true还是false。
        </div>
      </el-collapse-item>

      <el-collapse-item title="模板字符串" name="7">
        <div>
          TypeScript 允许使用模板字符串，构建类型。
          模板字符串的最大特点，就是内部可以引用其他类型。
        </div>
        <div>
          模板字符串可以引用的类型一共6种，分别是
          string、number、bigint、boolean、null、undefined。引用这6种以外的类型会报错。
        </div>
        <div>type Num = 123; type T1 = `${Num} received`; // 正确</div>
        <div class="text-cyan-500">
          type Obj = { n : 123 }; type T2 = `${Obj} received`; // 报错
        </div>

        <div>
          模板字符串里面引用的类型，如果是一个联合类型，那么它返回的也是一个联合类型，即模板字符串可以展开联合类型。
          <div class="text-cyan-500">type T = 'A'|'B';</div>
          <div class="text-cyan-500">type U = `${T}_id`; // "A_id"|"B_id"</div>
        </div>

        <div>
          如果模板字符串引用两个联合类型，它会交叉展开这两个类型。
          注意是交叉展开！
          <div>type T = 'A'|'B'; type U = '1'|'2';</div>
          <div class="text-cyan-500">
            type V = `${T}${U}`; // 'A1'|'A2'|'B1'|'B2'
          </div>
        </div>
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
console.log("测试keyof关键字", str);

/**
 * 如果对象属性名采用索引形式，keyof 会返回属性名的索引类型。
 */
interface T {
  [prop: string]: string;
}

// keyof T返回的类型是string|number，原因是 JavaScript 属性名为字符串时，包含了属性名为数值的情况，因为数值属性名会自动转为字符串。
export type KeyT = keyof T; // string | number

/**
 * [] 运算符
 */
type Child = {
  name: string;
  age: number;
};

type Age = Child["age"];

const age: Age = 111;
console.log("测试方括号运算符的使用", age);

/**
 * 条件运算符
 * extends...? :
 */

type ETC<T> = 1 extends number ? T : number;

const ETC: ETC<string> = " this is a string ";

/**
 * infer 关键字
 * infer Item表示Item这个参数是 TypeScript 自己推断出来的，不用显式传入，
 * 而Flatten<Type>则表示Type这个类型参数是外部传入的
 *
 * Type extends Array<infer item> 表示
 * 如果参数Type是一个数组，那么就将该数组的成员类型推断为item，后面代码可以直接调用item。
 * 如果不是一个数组，直接返回它本身。
 */

type Flatten<Type> = Type extends Array<infer item> ? item : Type;
// type Flatten<Type, Item> = Type extends Array<Item> ? Item : Type;
type Str = Flatten<string[]>;
const strF: Str = "str";
console.log("测试infer关键字", strF);

type Num = Flatten<number>;
const num: Num = 2;
console.log("测试infer关键字", num);

/**
 * is 运算符
 */
type Animal = {
  name: string;
  eat: () => void;
};
type Fish = {
  name: string;
  eat?: () => void;
};
type Bird = {
  name: string;
  sing?: () => void;
};
function isAnimal(pet: Fish | Bird): pet is Animal {
  if ((pet as Animal).eat !== undefined) {
    console.log("测试is运算符", pet.name + "是小动物");
  }
  return (pet as Animal).eat !== undefined;
}
isAnimal({
  name: "小金鱼",
  eat: () => {
    console.log("吃大虾");
  },
});
</script>

<style scoped></style>
