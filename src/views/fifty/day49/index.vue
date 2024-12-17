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
</style>
