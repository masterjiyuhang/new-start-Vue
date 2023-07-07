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
  width: 100%;
  height: 360px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;
  position: relative;
  filter: contrast(10);

  &::before {
    content: "";
    position: absolute;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    margin-top: -65px;
    margin-left: -150px;
    background-color: yellow;
    animation: moveToRight 5s linear infinite;
    filter: blur(5px);
  }

  &::after {
    content: "";
    position: absolute;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    right: 50%;
    top: 50%;
    margin-top: -45px;
    margin-right: -110px;
    background-color: red;
    animation: moveToLeft 5s linear infinite;
    filter: blur(5px);
  }

  @keyframes moveToRight {
    50% {
      margin-left: 0px;
    }
  }
  @keyframes moveToLeft {
    50% {
      margin-right: 0px;
    }
  }
}

.reflect-box-container {
  display: flex;
  flex: 1;
  height: 500px;
  justify-content: center;
  background-color: bisque;
  position: relative;

  $color: #0ebeff;

  @mixin btn {
    z-index: 0;
    width: 160px;
    height: 80px;
    line-height: 80px;
    color: $color;
    font-size: 24px;
    border-radius: 10px;
    text-align: center;
    margin: auto;
    transform: translateY(-40px);
    overflow: hidden;
    cursor: pointer;
    transition: 0.3s;
    position: relative;
    -webkit-box-reflect: below 10px
      linear-gradient(transparent, rgba(0, 0, 0, 0.4));

    &:hover {
      color: #fff;
      box-shadow: 0 0 5px $color, 0 0 25px $color;

      &::after,
      &::before {
        transition: 0.3s;
        background-color: $color;
      }
    }

    &::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      z-index: -2;
      left: 50%;
      top: 50%;
      width: 150%;
      height: 300%;
      transform: translate(-50%, -50%);
      background-color: #000;
      background-repeat: no-repeat;
      background-size: 50% 50%;
      background-position: 0 0;
      background-image: conic-gradient($color, $color);
      animation: rotate 2s linear infinite;
    }
  }

  .btn1 {
    @include btn;
    &::after {
      content: "";
      box-sizing: border-box;
      position: absolute;
      z-index: -1;
      left: 2px;
      top: 2px;
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      background-color: #000;
      border-radius: 10px;
    }
  }

  .btn2 {
    @include btn;
    filter: hue-rotate(90deg);
  }

  @keyframes rotate {
    100% {
      transform: translate(-50%, -50%) rotate(1turn);
    }
  }
}
</style>
