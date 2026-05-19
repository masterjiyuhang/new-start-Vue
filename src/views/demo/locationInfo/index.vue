<template>
  <div class="wrapper-page">
    <h1>currentLocationInfo</h1>

    <p>accuracy: {{ state.locationInfo?.coords.accuracy }}</p>
    <p>latitude: {{ state.locationInfo?.coords.latitude }}</p>
    <p>longitude: {{ state.locationInfo?.coords.longitude }}</p>
    <p>altitude: {{ state.locationInfo?.coords.altitude }}</p>
    <p>altitudeAccuracy: {{ state.locationInfo?.coords.altitudeAccuracy }}</p>
    <p>heading: {{ state.locationInfo?.coords.heading }}</p>
    <p>speed: {{ state.locationInfo?.coords.speed }}</p>
  </div>
</template>

<script setup lang="ts">
import { useGeolocation } from "@vueuse/core";
import { onMounted, reactive } from "vue";

const { isSupported } = useGeolocation();

const state = reactive<{ locationInfo: GeolocationPosition | null }>({
  locationInfo: null,
});
const getCurrentLocation = () => {
  if (!isSupported.value) return;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      state.locationInfo = position;
    },
    (error) => {
      console.error(
        `Error Code: ${error.code} Error Message: ${error.message}`
      );
    }
  );
};

onMounted(() => {
  getCurrentLocation();
});
</script>

<style scoped></style>
