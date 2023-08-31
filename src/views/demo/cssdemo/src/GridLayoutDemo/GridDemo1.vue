<template>
  <div class="grid-container">
    <div class="A"><span>A</span></div>
    <div class="B"><span>B</span></div>
    <div class="D"><span>D</span></div>
    <div class="F"><span>F</span></div>
    <div class="E"><span>E</span></div>
    <div class="C"><span>C</span></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* stylelint-disable no-duplicate-selectors */

.grid-container {
  display: grid;
  grid-template: "A A A B E" 1fr "C C C B E" 1fr "F F D D D" 1fr / 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  height: 100%;
  gap: 10px 10px;
}

.A {
  grid-area: A;
}

.B {
  grid-area: B;
}

.D {
  grid-area: D;
}

.F {
  grid-area: F;
}

.E {
  grid-area: E;
}

.C {
  grid-area: C;
}

.grid-container > div {
  display: grid;
  color: #fff;
  font-size: 24px;
  text-align: center;

  span {
    margin: auto;
  }
}

.A {
  background: deeppink;
}

.B {
  background: #56bcf9;
}

.C {
  background: #ae63e4;
}

.D {
  background: #ffdd40;
}

.E {
  background: #ff3c41;
}

.F {
  background: #6b79b3;
}
</style>
