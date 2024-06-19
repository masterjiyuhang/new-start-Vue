<template>
  <div class="wrapper-page">
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <span class="text-3xl text-emerald-400">Password Generator</span>
        </div>
      </template>
      <div class="flex my-4">
        <h1 class="break-all">
          <span class="text-blue-400">GeneratedPassword:</span>
          {{ generatedPassword }}
        </h1>
      </div>
      <div class="flex">
        <h1 class="mr-4 text-blue-400">password length:</h1>
        <el-input-number v-model="num" :min="1" :max="50" />
      </div>
      <div class="flex my-4">
        <h1 class="mr-4 text-blue-400">Checked All:</h1>
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          Check all
        </el-checkbox>
      </div>
      <div class="flex my-4">
        <h1 class="flex-1 mr-4 text-blue-400">Checked List:</h1>
        <el-checkbox-group
          v-model="checkedTypes"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="type in typeList"
            :key="type"
            :label="type"
            :value="type"
          >
            include {{ type }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="flex items-center">
        <el-button
          @click="generatePassword"
          type="primary"
          class="m-auto text-center"
          >generate password</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkedTypes = ref(["lower", "number"]);
const typeList = ["lower", "upper", "number", "symbol"];
const generatedPassword = ref("");
const num = ref(10);

const handleCheckAllChange = (val: boolean) => {
  checkedTypes.value = val ? typeList : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === typeList.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < typeList.length;
};

function genCharCode(num1: number, num2: number) {
  return String.fromCharCode(Math.floor(Math.random() * num1) + num2);
}

const randomFunc = {
  lower: genRandomLower,
  upper: genRandomUpper,
  number: genRandomNumber,
  symbol: genRandomSymbol,
};

function genRandomLower() {
  return genCharCode(26, 97);
}

function genRandomUpper() {
  return genCharCode(26, 65);
}

function genRandomNumber() {
  return genCharCode(10, 48);
}

function genRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
  generatedPassword.value = "";
  if (checkedTypes.value.length === 0) {
    generatedPassword.value = "";
  }

  for (let i = 0; i < num.value; i += checkedTypes.value.length) {
    checkedTypes.value.forEach((item) => {
      generatedPassword.value += randomFunc[item]();
    });
  }

  generatedPassword.value = generatedPassword.value.slice(0, num.value);
}
</script>

<style scoped></style>
