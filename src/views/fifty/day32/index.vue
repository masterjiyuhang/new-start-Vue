<template>
  <div>
    <h2>How do you want your project to be?</h2>
    <div class="toggle-container">
      <input
        type="checkbox"
        id="good"
        class="toggle"
        v-model="goodValue"
        @change="changeValue($event)"
      />
      <label for="good" class="label">
        <div class="ball"></div>
      </label>
      <span>Good</span>
    </div>
    <div class="toggle-container">
      <input
        type="checkbox"
        id="cheap"
        class="toggle"
        v-model="cheapValue"
        @change="changeValue"
      />
      <label for="cheap" class="label">
        <div class="ball"></div>
      </label>
      <span>Cheap</span>
    </div>

    <div class="toggle-container">
      <input
        type="checkbox"
        id="fast"
        class="toggle"
        v-model="fastValue"
        @change="changeValue"
      />
      <label for="fast" class="label">
        <div class="ball"></div>
      </label>
      <span>Fast</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const goodValue = ref(false);
const cheapValue = ref(false);
const fastValue = ref(false);

function changeValue(theClickedOne: any) {
  console.log(
    "🚀 ~ file: index.vue:53 ~ changeValue ~ theClickedOne:",
    theClickedOne.target.checked,
  );
}

watchEffect(() => {
  cheapValue.value = !goodValue.value;
});
</script>

<style lang="scss" scoped>
.toggle-container {
  display: flex;
  align-items: center;
  width: 200px;
  margin: 10px 0;
}

.toggle {
  visibility: hidden;
}

.label {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 40px;
  margin: 0 15px;
  border-radius: 50px;
  background-color: #d0d0d0;
  cursor: pointer;
}

.toggle:checked + .label {
  background-color: #8e44ad;
}

.ball {
  position: absolute;
  top: 3px;
  left: 3px;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  animation: slide-off 0.3s linear forwards;
  border-radius: 50%;
  background: #fff;
}

.toggle:checked + .label .ball {
  animation: slide-on 0.3s linear forwards;
}

@keyframes slide-on {
  0% {
    transform: translateX(0) scale(1);
  }

  50% {
    transform: translateX(20px) scale(1.2);
  }

  100% {
    transform: translateX(40px) scale(1);
  }
}

@keyframes slide-off {
  0% {
    transform: translateX(40px) scale(1);
  }

  50% {
    transform: translateX(20px) scale(1.2);
  }

  100% {
    transform: translateX(0) scale(1);
  }
}
</style>
