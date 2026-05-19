<template>
  <div class="footer flex-c">
    <a href="https://github.com/masterjiyuhang" target="_blank">
      {{ LAYOUT_CONFIG.footerStartYear }}-{{ new Date().getFullYear() }} © Cch-Admin By ErHang Technology.
    </a>
  </div>
</template>

<script setup lang="ts">
import { LAYOUT_CONFIG } from "../../config";
</script>

<style lang="scss" scoped>
.footer {
  height: 30px;
  border-top: 1px solid #e4e7ed;
  background: #fff;

  a {
    color: #858585;
    font-size: 14px;
    letter-spacing: 0.5px;
    text-decoration: none;
  }
}
</style>
