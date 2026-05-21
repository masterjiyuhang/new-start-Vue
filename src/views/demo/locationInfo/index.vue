<template>
  <div class="wrapper-page">
    <h1>currentLocationInfo</h1>

    <template v-if="coords">
      <p>accuracy: {{ coords.accuracy }}</p>
      <p>latitude: {{ coords.latitude }}</p>
      <p>longitude: {{ coords.longitude }}</p>
      <p>altitude: {{ coords.altitude }}</p>
      <p>altitudeAccuracy: {{ coords.altitudeAccuracy }}</p>
      <p>heading: {{ coords.heading }}</p>
      <p>speed: {{ coords.speed }}</p>
    </template>
    <p v-else-if="error">Error: {{ error.message }}</p>
    <p v-else-if="!isSupported">Geolocation is not supported</p>
    <p v-else>Locating...</p>
  </div>
</template>

<script setup lang="ts">
import { useGeolocation } from "@vueuse/core";

const { coords, isSupported, error } = useGeolocation();
</script>
