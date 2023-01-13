<script setup lang="ts">
import { RouterView } from "vue-router";
// import LogoSvg from "@/assets/logo.svg?component";
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    /* place-items: center; */
    /* padding-right: calc(var(--section-gap) / 2); */
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    background-color: #fab;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
