<template>
  <div v-show="propsData.modelValue">
    <!-- 接受更多的参数 -->
    <div class="text-orange-300">{{ title }}</div>

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
  titleModifiers?: {
    capitalize: false;
  };
  modelModifiers?: { default: () => {} };
};

const propsData = defineProps<PropsType>();
console.log(propsData.titleModifiers, "看看title的修饰符");
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
  let newTitle = "jiyuhang 我要改变 注意看 我的首字母大写了！！";
  if (propsData?.titleModifiers?.capitalize) {
    newTitle = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
  }
  emits("update:title", newTitle);
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
