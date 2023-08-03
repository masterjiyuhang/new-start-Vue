<template>
  <wrapper-page>
    <div class="fusion-container"></div>

    <TankShaking />

    <MobiusBand />

    <LoadingEffect />

    <div class="reflect-box-container">
      <div class="btn1 text-[#f80]">来吧 展示</div>
      <div class="my-btn"></div>
    </div>
  </wrapper-page>
</template>

<script setup lang="ts">
import { WrapperPage } from "@/components/WrapperPage";
import { TankShaking } from "../TankShaking/TankShaking";
import { MobiusBand } from "../MobiusBand/index";
import { LoadingEffect } from "../LoadingEffect/index";
</script>

<style lang="scss" scoped>
.fusion-container {
  @keyframes move-to-right {
    50% {
      margin-left: 0;
    }
  }

  @keyframes move-to-left {
    50% {
      margin-right: 0;
    }
  }

  display: flex;
  position: relative;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 360px;
  background-color: #000;
  filter: contrast(10);

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 130px;
    height: 130px;
    margin-top: -65px;
    margin-left: -150px;
    animation: move-to-right 5s linear infinite;
    border-radius: 50%;
    background-color: yellow;
    filter: blur(5px);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 50%;
    width: 90px;
    height: 90px;
    margin-top: -45px;
    margin-right: -110px;
    animation: move-to-left 5s linear infinite;
    border-radius: 50%;
    background-color: red;
    filter: blur(5px);
  }
}

.reflect-box-container {
  $color: #0ebeff;

  @mixin btn {
    position: relative;
    z-index: 0;
    width: 160px;
    height: 80px;
    margin: auto;
    overflow: hidden;
    transform: translateY(-40px);
    transition: 0.3s;
    border-radius: 10px;
    color: $color;
    font-size: 24px;
    line-height: 80px;
    text-align: center;
    cursor: pointer;
    -webkit-box-reflect: below 10px
      linear-gradient(transparent, rgb(0 0 0 / 40%));

    &:hover {
      box-shadow: 0 0 5px $color, 0 0 25px $color;
      color: #fff;

      &::after,
      &::before {
        transition: 0.3s;
        background-color: $color;
      }
    }

    &::before {
      content: "";
      position: absolute;
      z-index: -2;
      top: 50%;
      left: 50%;
      box-sizing: border-box;
      width: 150%;
      height: 300%;
      transform: translate(-50%, -50%);
      animation: rotate 2s linear infinite;
      background-color: #000;
      background-image: conic-gradient($color, $color);
      background-repeat: no-repeat;
      background-position: 0 0;
      background-size: 50% 50%;
    }
  }

  @keyframes rotate {
    100% {
      transform: translate(-50%, -50%) rotate(1turn);
    }
  }

  display: flex;
  position: relative;
  flex: 1;
  justify-content: center;
  height: 500px;
  background-color: bisque;

  .btn1 {
    @include btn;

    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      top: 2px;
      left: 2px;
      box-sizing: border-box;
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      border-radius: 10px;
      background-color: #000;
    }
  }

  .btn2 {
    @include btn;

    filter: hue-rotate(90deg);
  }
}
</style>
