<template>
  <div class="cch-layout">
    <Sidebar />
    <Body>
      <Header />
      <Content>
        <slot />
      </Content>
    </Body>
  </div>
</template>

<script lang="ts">
export default {
  name: "CchLayout",
};
</script>
<script setup lang="ts">
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";
import Content from "./components/Content.vue";
import Body from "./components/Body.vue";
</script>

<style lang="scss">
@include cch.b(layout) {

  @include cch.pseudo(after) {
    content: "";
    display: table;
    clear: both;
  }

  position: relative;
  width: 100%;
  height: 100%;
}
</style>
