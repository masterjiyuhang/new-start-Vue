<template>
  <div class="wrapper-page">
    <div class="m-auto overflow-scroll bg-orange-300 size-full" ref="el">
      <div class="relative h-screen translate-x-0 bg-slate-50">
        <nav
          ref="nav"
          class="sticky top-0 left-0 right-0 w-full h-10 bg-orange-500 nav-container"
        >
          CCH
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const el = ref<HTMLElement | null>(null);
const nav = ref<HTMLElement | null>(null);

onMounted(() => {
  if (el.value && nav.value) {
    console.log(el.value);
    el.value.addEventListener(
      "scroll",
      (e) => {
        const el: Element = ((e.target as Window)?.document?.documentElement ||
          (e.target as Document)?.documentElement ||
          (e.target as HTMLElement | SVGElement)) as Element;

        console.log(el.scrollTop, nav.value!.offsetHeight);
        if (el.scrollTop > nav.value!.offsetHeight + 20) {
          nav.value?.classList.add("active");
        } else {
          nav.value?.classList.remove("active");
        }
      },
      {
        capture: false,
        passive: true,
      },
    );
  }
});
</script>

<style lang="scss" scoped>
.nav-container {
  transition: all 0.3s ease-in-out;
}

.active {
  height: 20px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgb(0 0 0 / 30%);
  color: #808080;
  text-align: center;
}
</style>
