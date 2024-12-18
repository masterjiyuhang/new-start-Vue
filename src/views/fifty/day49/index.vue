<template>
  <div class="relative wrapper-page">
    <div class="grid grid-cols-4 gap-4">
      <div class="p-10 card-1">
        <div class="m2">
          <div class="bg"></div>
          <div class="logo">
            <span>M9</span>
          </div>
        </div>
      </div>
      <div class="card-2">
        <button class="delete-button">␡</button>
      </div>
      <div class="flex items-center justify-center card-3">
        <input type="checkbox" />
      </div>

      <div class="card-4">
        <label class="relative inline-flex items-center cursor-pointer">
          <input class="sr-only peer" value="" type="checkbox" />
          <div
            class="peer ring-2 ring-gray-900 bg-gradient-to-r from-rose-400 to-red-900 rounded-full outline-none duration-300 after:duration-500 w-20 h-8 shadow-inner peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900 shadow-gray-900 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-900 after:content-[''] after:rounded-full after:absolute after:outline-none after:h-12 after:w-12 after:bg-gray-50 after:-top-2 after:-left-2 after:flex after:justify-center after:items-center after:border-4 after:border-gray-900 peer-checked:after:translate-x-14"
          ></div>
        </label>
      </div>

      <div class="flex items-center justify-center card-5">
        <button class="btn">Now</button>
      </div>

      <div class="flex items-center justify-center card-6">
        <button class="button">
          <span
            class="bg-[#f1f5f8] block px-4 py-4 rounded-md border-2 border-solid border-red-950"
            >Submit</span
          >
        </button>
      </div>

      <div class="flex flex-col items-center justify-center p-10 card-7">
        <button
          class="relative py-2 px-8 text-black text-base font-bold overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
        >
          HOVER ME!
        </button>
        <div class="my-5"></div>
        <button
          :class="[
            'px-6 py-3',
            'rounded-full shadow-lg',
            'font-bold text-white',
            'transition-all duration-500 ease-in-out',
            'transform bg-gradient-to-r from-purple-400 to-blue-500',
            'hover:from-pink-500 hover:to-purple-600 hover:scale-110 hover:brightness-110 hover:animate-pulse',
            'active:animate-bounce',
          ]"
        >
          Keep holding
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.card-1 {
  /* Faster blur animation */
  @keyframes blur-animation {
    to {
      filter: blur(3vmin);
      transform: scale(1.05);
    }
  }

  /* Faster gradient animation */
  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  .m2 {
    display: flex;
    position: relative;
    z-index: 10;
    align-items: center;
    justify-content: center;
    width: 20vmin; /* Reduced size */
    height: 20vmin; /* Reduced size */
    user-select: none;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 20vmin; /* Reduced size */
      height: 20vmin; /* Reduced size */
      animation: gradient-shift 5s ease-in-out infinite; /* Faster animation */
      opacity: 1;
      background: linear-gradient(135deg, #343434 10%, #050505 60%);
      background-size: 200% 200%; /* Gradient shift */
      user-select: none;
    }

    .logo {
      display: inline-block;
      z-index: 10;
      background-clip: text;
      background-image: linear-gradient(to right, #626262, #fff);
      color: white;
      font-size: 5vmin; /* Smaller font size */
      font-weight: bold;
      vertical-align: baseline;
      user-select: none;
      -webkit-text-fill-color: transparent;
    }

    &::before,
    &::after {
      --size: 5px; /* Reduced glow size */

      content: "";
      position: absolute;
      top: calc(var(--size) / -2);
      left: calc(var(--size) / -2);
      width: calc(100% + var(--size));
      height: calc(100% + var(--size));
      background: radial-gradient(
          circle at 0 0,
          hsl(27deg 93% 60%),
          transparent
        ),
        radial-gradient(circle at 100% 0, #00a6ff, transparent),
        radial-gradient(circle at 0 100%, #ff0056, transparent),
        radial-gradient(circle at 100% 100%, #6500ff, transparent);
    }

    &::before {
      --size: 10px; /* Reduced outer glow size */

      z-index: -2;
      filter: blur(1vmin); /* Reduced blur */
      animation: blur-animation 3s ease-in-out alternate infinite; /* Faster blur animation */
    }

    &::after {
      --size: 2px; /* Reduced inner glow size */

      z-index: -1;
    }
  }
}

.card-2 {
  @keyframes overlay {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  /* From Uiverse.io by dylanharriscameron */
  .delete-button {
    position: relative;
    width: 60px;
    height: 65px;
    padding-bottom: 8px;
    transform: perspective(70px) rotateX(5deg) rotateY(0deg);
    transition: all 0.1s ease-in-out 0s;
    border: 0.5px solid rgb(0 0 0 / 10%);
    border-radius: 15px 15px 12px 12px;
    background-color: #000;

    /* Add gradient shading to each side */
    background-image: linear-gradient(
        to right,
        rgb(0 0 0 / 80%),
        rgb(0 0 0 / 0%)
      ),
      linear-gradient(to bottom, rgb(0 0 0 / 80%), rgb(0 0 0 / 0%));
    background-repeat: no-repeat;
    background-position:
      bottom right,
      bottom right;
    background-size:
      100% 100%,
      100% 100%;
    box-shadow:
      inset -4px -10px 0 rgb(255 255 255 / 40%),
      inset -4px -8px 0 rgb(0 0 0 / 30%),
      0 2px 1px rgb(0 0 0 / 30%),
      0 2px 1px rgb(255 255 255 / 10%);
    color: #fff;
    font-size: 44px;
    cursor: pointer;
    user-select: none;
    will-change: transform;
  }

  .delete-button::after {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    transition: all 0.1s ease-in-out 0s;
    border-radius: 15px;
    background-image: linear-gradient(
      to bottom,
      rgb(255 255 255 / 20%),
      rgb(0 0 0 / 50%)
    );
    box-shadow:
      inset 4px 0 0 rgb(255 255 255 / 10%),
      inset 4px -8px 0 rgb(0 0 0 / 30%);
  }

  .delete-button::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    transition: all 0.1s ease-in-out 0s;
    border-radius: 15px;
    background-image: linear-gradient(
        to right,
        rgb(0 0 0 / 80%),
        rgb(0 0 0 / 0%)
      ),
      linear-gradient(to bottom, rgb(0 0 0 / 80%), rgb(0 0 0 / 0%));
    background-repeat: no-repeat;
    background-position:
      bottom right,
      bottom right;
    background-size:
      100% 100%,
      100% 100%;
  }

  .delete-button:active {
    height: 64px;
    transform: perspective(80px) rotateX(5deg) rotateY(1deg) translateY(3px)
      scale(0.96);
    transition: all 0.1s ease-in-out 0s;
    border: 0.25px solid rgb(0 0 0 / 20%);
    box-shadow:
      inset -4px -8px 0 rgb(255 255 255 / 20%),
      inset -4px -6px 0 rgb(0 0 0 / 80%),
      0 1px 0 rgb(0 0 0 / 90%),
      0 1px 0 rgb(255 255 255 / 20%);
    will-change: transform;
  }

  .delete-button::after:active {
    background-image: linear-gradient(
      to bottom,
      rgb(0 0 0 / 50%),
      rgb(255 255 255 / 20%)
    );
  }

  .delete-button:active::before {
    content: "";
    display: block;
    position: absolute;
    top: 5%;
    left: 20%;
    width: 50%;
    height: 80%;
    animation: overlay 0.1s ease-in-out 0s;
    background-color: rgb(255 255 255 / 10%);
    pointer-events: none;
  }

  .delete-button:focus {
    outline: none;
  }
}

.card-3 {
  input[type="checkbox"] {
    position: relative;
    width: 96px;
    height: 48px;
    transition: all 0.5s;
    border: 3px solid #222;
    border-radius: 30px 100px 100px;
    outline: none;
    background-color: #fff;
    box-shadow: 0 10px 20px rgb(0 0 0 / 20%);
    cursor: pointer;
    appearance: none;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      box-sizing: border-box;
      width: 48px;
      height: 48px;
      transform: translateY(-50%) scale(0.7);
      transition: all 0.5s;
      border: 3px solid #222;
      border-radius: 30px 100px 100px;
      background-color: #fde881;
    }

    &:checked {
      border-radius: 100px 100px 30px;
      background-color: #fde881;

      &::before {
        left: 50%;
        border-radius: 100px 100px 30px;
        background-color: #fff;
      }
    }
  }
}

.card-5 {
  .btn {
    position: relative;
    padding: 1.1em 2em;
    overflow: hidden;
    transition: all 0.3s;
    border: 2px solid #fff;
    border-radius: 12px;
    background: none;
    background-color: #ecd448;
    box-shadow: 0 2px 0 2px #000;
    color: #131313;
    font-size: 15px;
    font-weight: bolder;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      width: 100px;
      height: 120%;
      transform: skewX(30deg) translate(-150%, -50%);
      transition: all 0.5s;
      background-color: #ff6700;
    }

    &:hover {
      background-color: #4cc9f0;
      box-shadow: 0 2px 0 2px #0d3b66;
      color: #fff;

      &::before {
        transform: skewX(30deg) translate(150%, -50%);
        transition-delay: 0.1s;
      }
    }

    &:active {
      transform: scale(0.9);
    }
  }
}

.card-6 {
  .button {
    width: 150px;
    padding: 0;
    padding-bottom: 3px;
    transform: rotate(5deg);
    transform-origin: center;
    border: none;
    border-radius: 5px;
    background-color: #f80;
    box-shadow: 0 2px 0 #494a4b;
    font-family: "Gochi Hand", cursive;
    font-size: 15px;
    text-decoration: none;
    cursor: pointer;

    &:active {
      padding-bottom: 0;
      transform: translateY(5px);
      outline: 0;
    }
  }
}
</style>
