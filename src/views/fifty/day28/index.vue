<template>
  <div>
    {{ formInline }}
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.user" placeholder="用户"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" @keyup.enter="onSubmit">
          查询
        </el-button>
      </el-form-item>
    </el-form>

    <div class="card" v-if="currentUserInfo">
      <div>
        <img :src="currentUserInfo.avatar_url" alt="" class="avatar size-12" />
      </div>
      <div class="user-info">
        <h2>{{ currentUserInfo.useId ?? currentUserInfo.login }}</h2>
        <h2>{{ currentUserInfo.bio }}</h2>
        <ul>
          <li>{{ currentUserInfo.followers }}<strong>Followers</strong></li>
          <li>{{ currentUserInfo.following }}<strong>Following</strong></li>
          <li>{{ currentUserInfo.public_repos }}<strong>Repos</strong></li>
        </ul>

        <div class="repos">
          <el-tag
            effect="dark"
            v-for="item in currentUserRepoList"
            :key="item.id"
            class="mr-4"
          >
            {{ item.name }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getGithubUserApi, getGithubUserRepoApi } from "@/api/index";
import { ElMessage } from "element-plus";

const formInline = ref({
  user: "masterjiyuhang",
});

const currentUserInfo = ref(null);
const currentUserRepoList = ref([]);
async function onSubmit() {
  console.log("submit!");
  if (!formInline.value.user) {
    ElMessage({
      type: "error",
      message: "提交失败，不能为空！",
    });
    return;
  }
  const res = await getGithubUserApi(formInline.value.user);
  console.log("🚀 ~ file: index.vue:27 ~ onSubmit ~ res:", res);
  currentUserInfo.value = res;
  const res1 = await getGithubUserRepoApi(formInline.value.user);
  console.log("🚀 ~ file: index.vue:40 ~ onSubmit ~ res1:", res1);
  currentUserRepoList.value = res1.slice(0, 5);
}
</script>

<style scoped></style>
