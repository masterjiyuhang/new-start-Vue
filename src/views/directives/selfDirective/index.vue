<template>
  <div class="wrapper-page directive-page">
    {{ bindText }}
    <input v-focus.cchInput="{ text: bindText }" />
    <!-- 图片懒加载 -->
    <div v-for="(item, index) in arr" :key="index" class="lazy-load-box">
      <img :data-index="item" v-lazy="item" alt="" class="lazy-image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DirectiveBinding, Directive } from "vue";
import { ref } from "vue";

const bindText = ref("哈哈 我是二航");

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const images: Record<string, { default: string }> = import.meta.globEager(
  "@/assets/shopping/*.png"
);
let arr = Object.values(images).map((v) => v.default);

setTimeout(() => {
  bindText.value = "二航跑路了";
}, 2000);
/**
 * 自定义指令
 *
 * 指令钩子
 *
 * 指令的钩子会传递以下几种参数：
 *
 * el：指令绑定到的元素。这可以用于直接操作 DOM。
 * binding：一个对象，包含以下属性。
 *      value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
 *      oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
 *      arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。、
 *      modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
 *      instance：使用该指令的组件实例。
 *      dir：指令的定义对象。
 * vnode：代表绑定元素的底层 VNode。
 * prevNode：之前的渲染中代表指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。
 */

interface ElType extends HTMLElement {
  text: string | number;
  __handleClick__?: any;
}

// 在模板中启用 v-focus
const vFocus = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
    console.log("created", el, binding, vnode, prevVnode);
  },

  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {
    console.log("beforeMount", el, binding, vnode, prevVnode);
  },

  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted: (el: ElType, binding: DirectiveBinding) => {
    const bindingData = binding.value;
    const { modifiers } = binding;
    console.log("指令绑定的内容", bindingData);
    console.log("指令绑定的修饰符", modifiers);
    el.focus();
    el.innerText = bindingData.text;
  },

  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding: DirectiveBinding, vnode, prevVnode) {
    console.log(
      "before update 钩子中查看oldValue",
      binding.oldValue,
      binding.value,
      el,
      vnode,
      prevVnode
    );
  },

  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {
    console.log("updated", el, binding, vnode, prevVnode);
  },

  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {
    console.log("beforeUnmount", el, binding, vnode, prevVnode);
  },

  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {
    console.log("unmounted", el, binding, vnode, prevVnode);
  },
};

/**
 * IntersectionObserver 接口（从属于 Intersection Observer API）提供了一种异步观察目标元素与其祖先元素或顶级文档视口（viewport）交叉状态的方法。其祖先元素或视口被称为根（root）。
 * 当一个 IntersectionObserver 对象被创建时，其被配置为监听根中一段给定比例的可见区域。
 * 一旦 IntersectionObserver 被创建，则无法更改其配置，所以一个给定的观察者对象只能用来监听可见区域的特定变化值；
 * 然而，你可以在同一个观察者对象中配置监听多个目标元素。
 * @param el
 * @param binding
 */
let vLazy: Directive<HTMLImageElement, string> = async (el, binding) => {
  let url = await import("@/assets/logo.png");
  el.src = url.default;
  let observer = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio > 0 && entries[0].isIntersecting) {
      setTimeout(() => {
        el.src = binding.value;
        observer.unobserve(el);
      }, 2000);
    }
  });
  observer.observe(el);
};
</script>

<style lang="scss" scoped>
.directive-page {
  .lazy-load-box {
    .lazy-image {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
