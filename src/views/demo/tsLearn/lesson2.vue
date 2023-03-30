<template>
  <div></div>
</template>

<script setup lang="ts">
type GreetFunction = (a: string, b?: string) => void;
// function greeter(fn: (a: string) => void) {
function greeter(fn: GreetFunction) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);
</script>

<style scoped></style>
