<template>
  <el-dropdown trigger="click" @command="handleSetLanguage">
    <IconChangeLanguage class="toolBar-icon" :style="{'--color': 'red'}" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :disabled="language && language === 'zh-CN'"
          command="zh-CN"
        >
          简体中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import IconChangeLanguage from "@/components/icons/IconChangeLanguage.vue";
import { useGlobalSettingStore } from "@/stores/modules/globalSetting";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { getBrowserLang } from "@/utils/system";
import { useI18n } from "vue-i18n";

const { changeLanguage } = useGlobalSettingStore();
const { language } = storeToRefs(useGlobalSettingStore());
const i18n = useI18n();

const handleSetLanguage = (lang: string) => {
  // console.log(lang, "当前语言");
  i18n.locale.value = lang;
  changeLanguage(lang);
};

onMounted(() => {
  handleSetLanguage(language.value || getBrowserLang());
});
</script>

<style scoped></style>
