<template>
  <div>
    <button @click="shuffle">Shuffle</button>
    <transition-group class="wraps" name="mmm" tag="ul">
      <li
        class="cell"
        v-for="item in items"
        :key="item.id"
        @click="clickItem(item)"
        :class="item.clicked ? 'bg-orange-300' : ''"
      >
        {{ item.number }}
      </li>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { ref } from "vue";
let items = ref(
  Array.apply(null, { length: 80 } as number[]).map((_, index) => {
    return {
      id: index,
      number: (index % 9) + 1,
      clicked: false,
    };
  })
);
const shuffle = () => {
  items.value = _.shuffle(items.value);
};

const clickItem = (item: any) => {
  item.clicked = !item.clicked
};
</script>

<style scoped lang="scss">
.wraps {
  display: flex;
  flex-wrap: wrap;
  width: calc(25px * 10 + 9px);
  .cell {
    width: 25px;
    height: 25px;
    border: 1px solid #ccc;
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}

.mmm-move {
  transition: transform 0.8s ease;
}
</style>
