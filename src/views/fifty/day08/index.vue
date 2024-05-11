<template>
  <div class="wrapper-page">
    <div class="flex items-center justify-center">
      <div class="px-8 py-4">
        <h1 class="mb-8 text-center">Please Login</h1>

        <form action="">
          <div class="form-control">
            <input type="text" required />
            <FormWareLabel label="Email" />
          </div>
          <div class="form-control">
            <input autocomplete="off" type="password" required />
            <FormWareLabel label="Password" />
          </div>

          <button class="btn">Login</button>

          <p class="mt-8">
            Don't have an account?
            <a href="#" class="text-blue-300">Register</a>
          </p>
        </form>
      </div>
    </div>
    <HasMore class="mt-10 text-center"> hasMore </HasMore>
  </div>
</template>

<script setup lang="ts">
import { FormWareLabel, HasMore } from "./comp/index";
</script>

<style lang="scss" scope>
.btn {
  display: inline-block;
  width: 100%;
  padding: 15px;
  border: 0;
  border-radius: 5px;
  background: lightblue;
  font-family: inherit;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:active {
    transform: scale(0.98);
  }
}

.form-control {
  position: relative;
  width: 300px;
  margin: 20px 0 40px;

  input {
    display: block;
    position: relative;
    z-index: 100;
    width: 100%;
    padding: 15px 0;
    border: 0;
    border-bottom: 2px #fff solid;
    background-color: transparent;
    color: #fff;
    font-size: 18px;

    &:focus {
      border-bottom-color: lightblue;
      outline: 0;
    }

    &:valid {
      border-bottom-color: lightblue;
      outline: 0;
    }
  }

  label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;

    .ss-item {
      display: inline-block;
      min-width: 5px;
      transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      font-size: 18px;
    }
  }

  input:focus + label .ss-item,
  input:valid + label .ss-item {
    transform: translateY(-30px);
    color: lightblue;
  }
}
</style>
