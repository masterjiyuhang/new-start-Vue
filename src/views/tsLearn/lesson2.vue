<template>
  <div class="wrapper-page">
    <div>asdas</div>

    <el-collapse accordion>
      <el-collapse-item name="1">
        <template #title>
          {{ `Awaited<Type>` }}<el-icon class="header-icon">
              <info-filled />
            </el-icon>
        </template>
        <div>
          用来取出 Promise 的返回值类型，适合用在描述then()方法和 await 命令的参数类型。
        </div>
        <div>
          <span class="text-cyan-500"> {{ `type A = Awaited<Promise<string>>;` }}</span>
          <div>
            {{ `Awaited<Type>` }}会返回 Promise 的返回值类型（string）。
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template #title>
          {{ `ConstructorParameters<Type>` }}<el-icon class="header-icon">
              <info-filled />
            </el-icon>
        </template>
        <div>
          提取构造方法Type的参数类型，组成一个元组类型返回。
        </div>
        <div>
          它可以返回一些内置构造方法的参数类型。
          如果参数类型不是构造方法，就会报错。
        </div>
        <div>
          <span class="text-cyan-500"> {{ `type T1 = ConstructorParameters< new (x: string, y: number)=> object >;
              // [x: string, y: number]`}}</span>
          <div class="text-blue-600">
            {{ `type T2 = ConstructorParameters< new (x?: string)=> object >; // [x?: string | undefined]` }}
          </div>
        </div>
        <div>
          <div>any类型和never类型是两个特殊值，分别返回unknown[]和never。</div>
          <div> {{ ` type T1 = ConstructorParameters<any>; // unknown[]` }}</div>

          <div> {{ `type T2 = ConstructorParameters<never>; // never ` }}</div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template #title>
          {{ `Exclude<UnionType, ExcludedMembers>` }}<el-icon class="header-icon">
              <info-filled />
            </el-icon>
        </template>
        <div>
          用来从联合类型UnionType里面，删除某些类型ExcludedMembers，组成一个新的类型返回。
        </div>
        <div class="text-cyan-500">
          {{ `type T1 = Exclude<'a'|'b'|'c', 'a'>; // 'b'|'c'` }}
        </div>
        <div>
          {{ `具体实现 type Exclude<T, U> = T extends U ? never : T;` }}
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template #title>
          {{ `Extract<UnionType, Union>` }}
        </template>
        <div>
          {{ `用来从联合类型UnionType之中，提取指定类型Union，组成一个新类型返回。它与Exclude<T, U>正好相反。` }}
        </div>
        <div>
          {{ `如果参数类型Union不包含在联合类型UnionType之中，则返回never类型。` }}
        </div>
        <div class="text-cyan-500">
          {{ `type T2 = Extract<'a'|'b'|'c', 'a' |'b'>; // 'a'|'b'` }}
        </div>
        <div>
          {{ `type T3 = Extract<'a'|'b'|'c', 'a' |'d'>; // 'a'` }}
        </div>
        <div>
          {{ `具体实现 type Extract<T, U> = T extends U ? T : never;` }}
        </div>
      </el-collapse-item>
      <el-collapse-item name="5">
        <template #title>
          {{ `InstanceType<Type>` }}
        </template>
        <div>
          {{ `提取构造函数的返回值的类型（即实例类型），参数Type是一个构造函数，等同于构造函数的ReturnType<Type>。` }}
        </div>
        <div class="text-cyan-500">
          {{ `type B = InstanceType<FunctionConstructor>; // Function` }}
        </div>
        <div>
          {{ `如果类型参数是any或never两个特殊值，分别返回any和never。` }}
        </div>
        <div>
          {{ `如果类型参数不是构造方法，就会报错。` }}
        </div>
      </el-collapse-item>
      <el-collapse-item name="6">
        <template #title>
          {{ `NonNullable<Type>` }}
        </template>
        <div>
          {{ `用来从联合类型Type删除null类型和undefined类型，组成一个新类型返回，也就是返回Type的非空类型版本。` }}
        </div>
        <div class="text-cyan-500">
          {{ `type T6 = NonNullable<null|undefined>; // never` }}
        </div>
        <div>
          {{ ` type T2 = NonNullable<string[]|null|undefined>;// string[]` }}
        </div>
      </el-collapse-item>
      <el-collapse-item name="7">
        <template #title>
          {{ `NonNullable<Type>` }}
        </template>
        <div>
          {{ `Omit<Type, Keys>用来从对象类型Type中，删除指定的属性Keys，组成一个新的对象类型返回。` }}
        </div>
        <div class="text-cyan-500">
          {{ `interface A {
          x: number;
          y: number;
          }` }}
        </div>
        <div>
          {{ ` type T1 = Omit<A, 'x'>; // { y: number }` }}
        </div>
        <div>指定删除的键名Keys可以是对象类型Type中不存在的属性，但必须兼容string|number|symbol。</div>
      </el-collapse-item>
      <el-collapse-item name="8">
        <template #title>
          {{ `OmitThisParameter<Type>` }}
        </template>
        <div>
          {{ `OmitThisParameter<Type>从函数类型中移除 this 参数。如果函数没有 this 参数，则返回原始函数类型。` }}
        </div>
        <div class="text-cyan-500">
          {{ `function toHex(this: Number) {
          return this.toString(16);
          }` }}
        </div>
        <div>
          {{ ` type T = OmitThisParameter<typeof toHex>; // () => string` }}
        </div>
      </el-collapse-item>
      <el-collapse-item name="9">
        <template #title>
          {{ `Parameters<Type>` }}
        </template>
        <div>
          {{ `Parameters<Type>从函数类型Type里面提取参数类型，组成一个元组返回。` }}
        </div>
        <div class="text-cyan-500">
          {{ `type T2 = Parameters<(s:string)=> void>; // [s:string]` }}
        </div>
        <div>
          {{ ` type T5 = Parameters< (a:number, b:number)=> number >; // [a:number, b:number]` }}
        </div>
        <div>如果参数类型Type不是带有参数的函数形式，会报错。</div>
        <div>由于any和never是两个特殊值，会返回unknown[]和never。</div>
      </el-collapse-item>
      <el-collapse-item name="10">
        <template #title>
          {{ `Partial<Type>` }}
        </template>
        <div>
          {{ `Partial<Type>返回一个新类型，将参数类型Type的所有属性变为可选属性。` }}
        </div>
        <div class="text-cyan-500">
          {{ `interface A { x: number; y: number; }` }}
        </div>
        <div>
          {{ ` type T = Partial<A>; // { x?: number; y?: number; }` }}
        </div>
        <div>
          具体实现 {{ `type Partial<T> = { [P in keyof T]?: T[P]; };` }}
        </div>
      </el-collapse-item>
      <el-collapse-item name="11">
        <template #title>
          {{ `Pick<Type, Keys>` }}
        </template>
        <div>
          {{ `Pick<Type, Keys>返回一个新的对象类型，第一个参数Type是一个对象类型，第二个参数Keys是Type里面被选定的键名。` }}
        </div>
        <div class="text-cyan-500">
          {{ `interface A { x: number; y: number; }` }}
        </div>
        <div>
          {{ ` type T1 = Pick<A, 'x'>; // { x: number }` }}
            <div>
              {{ `type T3 = Pick<A, 'x' |'y'>; // { x: number; y: number }` }}
            </div>
        </div>
        <div>
          具体实现 {{ `type Pick<T, K extends keyof T> = { [P in K]: T[P]; };` }}
        </div>
      </el-collapse-item>
      <el-collapse-item name="12">
        <template #title>
          {{ `Readonly<Type>` }}
        </template>
        <div>
          {{ `Readonly<Type>返回一个新类型，将参数类型Type的所有属性变为只读属性。` }}
        </div>
        <div class="text-green-500">
          {{ `interface A { x: number; y?: number; }` }}
        </div>
        <div>
          <div>{{ `y是可选属性，Readonly<Type>不会改变这一点，只会让y变成只读。` }}</div>
          {{ ` type T = Readonly<A>; // { readonly x: number; readonly y?: number; }` }}
        </div>
        <div>
          具体实现 {{ `type Readonly<T> = { readonly [P in keyof T]: T[P]; };` }}
        </div>
      </el-collapse-item>
      <el-collapse-item name="13">
        <template #title>
          {{ `Record<Keys, Type>` }}
        </template>
        <div>
          {{ `Record<Keys, Type>返回一个对象类型，参数Keys用作键名，参数Type用作键值类型。` }}
        </div>
        <div class="text-cyan-500">
          {{ `type T = Record<'a', number|string>; // { a: number|string }` }}
        </div>
        <div>
          {{ `type T = Record<'a'|'b', number>; // { a: number, b: number }` }}
        </div>
        <div>
          具体实现 {{ `type Record<K extends string|number|symbol, T>  = { [P in K]: T; }` }}
        </div>
      </el-collapse-item>
      <el-collapse-item name="14">
        <template #title>
          {{ `Required<Type>` }}
        </template>
        <div>
          {{ `Required<Type>返回一个新类型，将参数类型Type的所有属性变为必选属性。它与Partial<Type>的作用正好相反。` }}
        </div>
        <div class="text-cyan-500">
          {{ `interface A { x?: number; y: number; }` }}
        </div>
        <div>
          {{ ` type T = Required<A>; // { x: number; y: number; }` }}
        </div>
        <div>
          具体实现 {{ `type Required<T> = { [P in keyof T]-?: T[P]; };` }}
        </div>
        <div>
          符号-?表示去除可选属性的“问号”，使其变成必选属性。
            符号+?表示增加可选属性的“问号”，等同于?
        </div>
      </el-collapse-item>
      <el-collapse-item name="15">
        <template #title>
          {{ `ReadonlyArray<Type>` }}
        </template>
        <div>
          {{ `ReadonlyArray<Type>用来生成一个只读数组类型，类型参数Type表示数组成员的类型。` }}
        </div>
        <div class="text-cyan-500">
          {{ `const values: ReadonlyArray<string>  = ['a', 'b', 'c'];` }}
        </div>
        <div>
          {{ ` values[0] = 'x'; // 报错` }}
        </div>
        <div>
          具体实现 {{ `interface ReadonlyArray<T> {
  readonly length: number;

  readonly [n: number]: T;

  // ...
}` }}
        </div>
      </el-collapse-item>
      <el-collapse-item name="16">
        <template #title>
          {{ `ReturnType<Type>` }}
        </template>
        <div>
          {{ `ReturnType<Type>提取函数类型Type的返回值类型，作为一个新类型返回。` }}
        </div>
        <div class="text-cyan-500">
          {{ `type T1 = ReturnType<() => string>; // string` }}
        </div>
        <div>
          {{ ` type T5 = ReturnType<typeof Math.random>; // number` }}
        </div>
        <div>
          具体实现 {{ `type ReturnType<
  T extends (...args: any) => any
> =
  T extends (...args: any) => infer R ? R : any;` }}
        </div>
      </el-collapse-item>
      <el-collapse-item name="17">
        <template #title>
          {{ `ThisParameterType<Type>` }}
        </template>
        <div>
          {{ `ThisParameterType<Type>提取函数类型中this参数的类型。` }}
        </div>
        <div class="text-cyan-500">
          {{ `function toHex(this: Number) { return this.toString(16); }` }}
        </div>
        <div>
          {{ ` type T = ThisParameterType<typeof toHex>; // number` }}
        </div>
        <div>
          具体实现 {{ `type ThisParameterType<T> =
  T extends (
    this: infer U,
    ...args: never
  ) => any ? U : unknown；` }}
        </div>
      </el-collapse-item>
      <el-collapse-item name="18">
        <template #title>
          {{ `ThisType<Type>` }}
        </template>
        <div>
          {{ `ThisType<Type>不返回类型，只用来跟其他类型组成交叉类型，用来提示 TypeScript 其他类型里面的this的类型。` }}
        </div>

        <div>
          具体实现 {{ `interface ThisType<T> { }` }}
        </div>
      </el-collapse-item>
      <el-collapse-item name="19">
        <template #title>
          {{ `字符串类型工具` }}
        </template>
        <div>
          {{ `Uppercase<StringType>` }}将字符串类型的每个字符转为大写。
        </div>
        <div>
          {{ `Lowercase<StringType>` }}将字符串的每个字符转为小写。
        </div>
        <div>
          {{ `Capitalize<StringType>` }}将字符串的第一个字符转为大写。
        </div>
        <div>
          {{ `Uncapitalize<StringType>` }}将字符串的第一个字符转为小写。
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { InfoFilled } from "@element-plus/icons-vue";
// type GreetFunction = (a: string, b?: string) => void;
// // function greeter(fn: (a: string) => void) {
// function greeter(fn: GreetFunction) {
//   fn("Hello, World");
// }

// function printToConsole(s: string) {
//   console.log(s);
// }

// greeter(printToConsole);
</script>

<style scoped></style>
