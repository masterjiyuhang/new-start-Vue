<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>
  </WelcomeItem>

  <WelcomeItem>
    <template #heading>Community</template>
  </WelcomeItem>
</template>
