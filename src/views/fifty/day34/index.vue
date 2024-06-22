<template>
  <div class="wrapper-page">
    {{ activeIndex }}
    <div class="counter" v-show="isCounterHidden">
      <div class="nums">
        <span
          class="num"
          v-for="(item, index) in numList"
          :class="activeIndex === index ? 'in' : 'out'"
          :key="item.id"
          ref="numsRef"
        >
          {{ item.id }}
        </span>
      </div>
      <h4>Get Ready</h4>
    </div>

    <div class="final" v-show="isFinalMessageShown">
      <h1>GO</h1>
      <button class="replay-btn" @click="handleReplay">
        <span>Replay</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const numList = ref(
  Array.from({ length: 5 })
    .map((_item, index) => {
      return {
        id: index + 1,
        in: index === 0,
        out: false,
      };
    })
    .reverse(),
);
const isCounterHidden = ref(true);
const isFinalMessageShown = ref(false);
const activeIndex = ref(0);

onMounted(() => {
  runAnimation();
});

function resetDOM() {
  activeIndex.value = 0;
  isCounterHidden.value = true;
  isFinalMessageShown.value = false;
}
function runAnimation() {
  console.log(numList.value);
  numList.value.forEach((_, index) => {
    setTimeout(
      () => {
        activeIndex.value++;
        if (activeIndex.value === numList.value.length) {
          isCounterHidden.value = false;
          isFinalMessageShown.value = true;
        }
      },
      (index + 1) * 1000,
    );
  });
}

// function runAnimation() {
//   activeIndex.value = 0;

//   numsRef.value.forEach((element, idx) => {
//     const nextToLast = numsRef.value.length - 1;

//     element.addEventListener("animationend", (e) => {
//       if (e.animationName.includes("go-in") && idx !== nextToLast) {
//         element.classList.remove("in");
//         element.classList.add("out");
//       } else if (
//         e.animationName.includes("go-out") &&
//         element.nextElementSibling
//       ) {
//         element.nextElementSibling.classList.add("in");
//       } else {
//         counterRef.value.classList.add("hide");

//         console.log(
//           "🚀 ~ file: index.vue:68 ~ element.addEventListener ~ counterRef:",
//           counterRef,
//         );
//         finalRef.value.classList.add("show");
//       }
//     });
//   });
// }

// function resetDOM() {
//   counterRef.value.classList.remove("hide");
//   finalRef.value.classList.remove("show");

//   numsRef.value.forEach((num, index) => {
//     num.classList.value = "";
//   });
//   numsRef.value[0].classList.add("in");
//   console.log(numsRef.value[0].classList);
// }
function handleReplay() {
  resetDOM();
  runAnimation();
}
</script>

<style lang="scss" scoped>
.counter {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.hide {
  transform: translate(-50%, -50%) scale(0);
  animation: hide 0.2s ease-out;
}

.final {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  text-align: center;
}

.show {
  transform: translate(-50%, -50%) scale(1);
  animation: show 0.2s ease-out;
}

.nums {
  position: relative;
  width: 250px;
  height: 50px;
  overflow: hidden;
  color: #3498db;
  font-size: 50px;

  .num {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(120deg);
    transform-origin: bottom center;
  }

  .in {
    transform: translate(-50%, -50%) rotate(0deg);
    animation: go-in 0.5s ease-in-out;
  }

  .out {
    animation: go-out 0.5s ease-in-out;
  }
}

@keyframes hide {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }

  100% {
    transform: translate(-50%, -50%) scale(0);
  }
}

@keyframes go-in {
  0% {
    transform: translate(-50%, -50%) rotate(120deg);
  }

  30% {
    transform: translate(-50%, -50%) rotate(-20deg);
  }

  60% {
    transform: translate(-50%, -50%) rotate(10deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
}

@keyframes go-out {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  60% {
    transform: translate(-50%, -50%) rotate(20deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(-120deg);
  }
}

h4 {
  margin: 5px;
  font-size: 20px;
  text-transform: uppercase;
}

.replay-btn {
  display: inline-block;
  padding: 5px;
  transition: all 0.3s;
  border: none;
  border-radius: 3px;
  background-color: #3498db;
  color: aliceblue;
  text-align: center;
  cursor: pointer;

  &:hover {
    span {
      padding-right: 25px;

      &::after {
        right: 0;
        opacity: 1;
      }
    }
  }

  span {
    display: inline-block;
    position: relative;
    transition: 0.3s;
    cursor: pointer;

    &::after {
      content: "\00bb";
      position: absolute;
      top: 0;
      right: -20px;
      transition: 0.5s;
      opacity: 0;
    }
  }
}
</style>
