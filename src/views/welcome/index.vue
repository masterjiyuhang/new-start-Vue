<template>
  <div class="w-full h-full">
    <van-form @submit="onSubmit">
      <van-tabs v-model:active="active" type="card" class="mt-2">
        <van-tab
          v-for="item in state.typeList"
          :key="item.value"
          :name="item.value"
          :title="item.title"
          :title-style="{
            color: 'red',
            fontSize: '10px',
          }"
        >
          <div v-if="item.value === '1'">
            <van-cell-group inset>
              <van-field
                v-model="state.ruleForm.countries"
                name="location-country"
                :readonly="true"
                label=""
                placeholder="select country"
                @click="handleSelectCountry"
              />
              <van-field
                v-model="state.ruleForm.cities"
                name="location-city"
                :readonly="true"
                label=""
                placeholder="select city"
              />
            </van-cell-group>
          </div>
        </van-tab>
      </van-tabs>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

    <van-popup v-model:show="visibleList.countryVisible" position="bottom">
      <van-picker
        :columns="columns"
        @confirm="onConfirm"
        @cancel="visibleList.countryVisible = false"
      >
        <template #columns-top>
          <van-search
            autofocus
            v-model="state.searchCountryValue"
            placeholder="请输入搜索关键词"
            @search="onSearchCountry"
          />
        </template>
      </van-picker>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { faker } from "@faker-js/faker";

const state = reactive({
  ruleForm: {
    countries: "",
    cities: "",
  },
  searchCountryValue: "",
  typeList: [
    {
      title: "Location",
      value: "1",
    },
    {
      title: "Company Name",
      value: "2",
    },
    {
      title: "Member ID",
      value: "3",
    },
    {
      title: "Port",
      value: "4",
    },
  ],
});

const active = ref<number>(0);

const onSubmit = (values) => {
  console.log("submit", values);
};

const visibleList = reactive({
  countryVisible: false,
});

const columns = ref([]);

const handleSelectCountry = () => {
  visibleList.countryVisible = true;
};
const onSearchCountry = () => {
  getCountryList();
};
const getCountryList = () => {
  const res: any = [];
  for (const _ of Array.from({ length: 10 })) {
    res.push({
      text: faker.company.name(),
      value: faker.company.name(),
    });
  }
  columns.value = res;
};
const onConfirm = ({ selectedOptions }) => {
  state.ruleForm.countries = selectedOptions[0]?.text;
  visibleList.countryVisible = false;
  state.searchCountryValue = "";
  columns.value = [];
};
</script>

<style scoped lang="scss"></style>
