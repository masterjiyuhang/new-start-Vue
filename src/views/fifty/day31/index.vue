<template>
  <div class="flex items-center wrapper-page">
    <el-card style="max-width: 580px" class="m-auto">
      <template #header>
        <div class="card-header">
          <span class="text-3xl text-emerald-400">Password Generator</span>
        </div>
      </template>
      <div class="flex items-center my-4">
        <h1 class="break-all">
          <span class="mr-4 text-blue-400">GeneratedPassword:</span>
          <span v-copy="generatedPassword">
            {{ generatedPassword }}
          </span>
        </h1>
        <svg
          v-copy="generatedPassword"
          t="1718803752536"
          class="ml-3 cursor-pointer icon size-6"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2908"
          width="200"
          height="200"
        >
          <path
            d="M672 832 224 832c-52.928 0-96-43.072-96-96L128 160c0-52.928 43.072-96 96-96l448 0c52.928 0 96 43.072 96 96l0 576C768 788.928 724.928 832 672 832zM224 128C206.368 128 192 142.368 192 160l0 576c0 17.664 14.368 32 32 32l448 0c17.664 0 32-14.336 32-32L704 160c0-17.632-14.336-32-32-32L224 128z"
            fill="#5E6570"
            p-id="2909"
          ></path>
          <path
            d="M800 960 320 960c-17.664 0-32-14.304-32-32s14.336-32 32-32l480 0c17.664 0 32-14.336 32-32L832 256c0-17.664 14.304-32 32-32s32 14.336 32 32l0 608C896 916.928 852.928 960 800 960z"
            fill="#5E6570"
            p-id="2910"
          ></path>
          <path
            d="M544 320 288 320c-17.664 0-32-14.336-32-32s14.336-32 32-32l256 0c17.696 0 32 14.336 32 32S561.696 320 544 320z"
            fill="#5E6570"
            p-id="2911"
          ></path>
          <path
            d="M608 480 288.032 480c-17.664 0-32-14.336-32-32s14.336-32 32-32L608 416c17.696 0 32 14.336 32 32S625.696 480 608 480z"
            fill="#5E6570"
            p-id="2912"
          ></path>
          <path
            d="M608 640 288 640c-17.664 0-32-14.304-32-32s14.336-32 32-32l320 0c17.696 0 32 14.304 32 32S625.696 640 608 640z"
            fill="#5E6570"
            p-id="2913"
          ></path>
        </svg>
      </div>
      <div class="flex">
        <h1 class="flex-1 mr-4 text-blue-400">password length:</h1>
        <el-input-number class="w-2/3" v-model="num" :min="1" :max="50" />
      </div>
      <div class="flex my-4">
        <h1 class="flex-1 mr-4 text-blue-400">Checked All:</h1>
        <el-checkbox
          class="w-2/3"
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
          class="w-2/3"
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
