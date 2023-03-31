<template>
  <div v-show="propsData.modelValue">
    <!-- 接受更多的参数 -->
    <div>{{ title }}</div>

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
import Sortable from "sortablejs";
import _ from "lodash";
import { onMounted, ref, watch } from "vue";

type PropsType = {
  modelValue: boolean;
  cellNumber: number;
  title: string;
};

const propsData = defineProps<PropsType>();

const emits = defineEmits([
  "update:modelValue",
  "update:cellNumber",
  "update:title",
]);

let items = ref(
  Array.apply(null, { length: propsData.cellNumber } as number[]).map(
    (_, index) => {
      return {
        id: index,
        number: (index % 9) + 1,
        clicked: false,
      };
    }
  )
);
const shuffle = () => {
  emits("update:title", "我要改变");
  emits("update:cellNumber", Math.floor(Math.random() * 100));
  // items.value = _.shuffle(items.value);
};

const clickItem = (item: any) => {
  item.clicked = !item.clicked;
};

// 标签拖拽排序
const cowItemDrop = () => {
  Sortable.create(document.querySelector(".wraps") as HTMLElement, {
    draggable: ".cell",
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      console.log(newIndex, oldIndex);
    },
  });
};

onMounted(() => {
  cowItemDrop();
});

watch(
  () => propsData.cellNumber,
  () => {
    console.log(propsData.cellNumber, "监听cell数量的变化");
    items.value = _.shuffle(
      Array.apply(null, {
        length: propsData.cellNumber,
      } as number[]).map((_, index) => {
        return {
          id: index,
          number: (index % 9) + 1,
          clicked: false,
        };
      })
    );
  },
  {
    immediate: true,
  }
);
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
