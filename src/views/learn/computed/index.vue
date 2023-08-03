<template>
  <div class="test-computed">
    {{ name }}
    <table style="width: 800px" class="base-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>数量</th>
          <th>单价</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td align="center">{{ item.name }}</td>
          <td>{{ item.num }}</td>
          <td>{{ item.price }}</td>
          <td align="center">
            <el-button @click="del(index)">删除</el-button>
          </td>
        </tr>
      </tbody>

      <tfoot>
        <td></td>
        <td></td>
        <td></td>
        <td align="center">总价 {{ totalPrice }}</td>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";

const a = ref("aaa");
const b = ref("bbb");

const name = computed(() => a.value + b.value);

type dataList = {
  name: string;
  num: number;
  price: number;
};

const del = (index: number) => {
  data.splice(index, 1);
};
const data = reactive<dataList[]>([
  {
    name: "大鹅",
    num: 199,
    price: 66,
  },
  {
    name: "小狗",
    num: 399,
    price: 166,
  },
  {
    name: "鸭子",
    num: 299,
    price: 32,
  },
]);

const totalPrice = computed({
  get() {
    return data.reduce((item, next) => {
      return item + next.num * next.price;
    }, 0);
  },
  set() {},
});
</script>

<style lang="scss" scoped>
.test-computed {
  .base-table > * > * > * {
    border-width: 1px;
    border-style: solid;
    border-color: #333;
  }
}
</style>
