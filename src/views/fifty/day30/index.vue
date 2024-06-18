<template>
  <div class="wrapper-page effect-page">
    <h1 id="text">{{ text }}</h1>
    <div class="speed-content">
      <label for="speed">Speed:</label>
      <input
        class="my-input"
        type="number"
        name="speed"
        id="speed"
        v-model="currentValue"
        @input="currentValue = $event.target.value"
        min="1"
        max="10"
        step="1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const defaultText = `We Love Programming !!`;
const text = ref("Starting...");
const currentValue = ref(1);

let idx = 1;

const speed = computed(() => {
  return 300 / currentValue.value;
});

function writeText() {
  text.value = defaultText.slice(0, idx);

  idx++;

  if (idx > defaultText.length) {
    idx = 1;
  }

  setTimeout(writeText, speed.value);
}
onMounted(() => {
  writeText();
});
</script>

<style lang="scss" scoped>
.effect-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  background-color: darksalmon;
  font-family: Roboto, sans-serif;

  .speed-content {
    position: absolute;
    bottom: 190px;
    padding: 10px 20px;
    background: rgb(0 0 0 / 10%);
    font-size: 18px;
  }
}

.my-input {
  width: 50px;
  padding: 5px;
  border: none;
  background-color: darksalmon;
  font-size: 18px;
  text-align: center;

  &:focus {
    outline: none;
  }
}
</style>
