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
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { onMounted, reactive } from "vue";
const { isSupported, useCchLocal } = useGeoLocation();

console.log(isSupported.value, "支不支持呢");

const { coords } = useCchLocal();
console.log(coords.value);

const state = reactive<{ locationInfo: GeolocationPosition | null }>({
  locationInfo: null,
});
const getCurrentLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        state.locationInfo = position;
        console.log(position);
        console.log(
          `Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`
        );
      },
      (error) => {
        console.error(
          `Error Code: ${error.code} Error Message: ${error.message}`
        );
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

onMounted(() => {
  getCurrentLocation();
});
</script>

<style scoped></style>
