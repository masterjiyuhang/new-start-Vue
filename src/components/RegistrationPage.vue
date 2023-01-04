<template>
  <div>
    <h1>{{ t("registration.mainTitle") }}</h1>
    <!-- <h3>{{ countryList }}</h3> -->
    <!-- <h2>{{ ruleForm }}</h2> -->
    <h3>{{ t("registration.email") }} {{ getCurrentLang }}</h3>
    <h3>{{ t("registration.nameRules") }}</h3>
    <el-button @click="changeLang"> chang language</el-button>

    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
      :label-position="labelPosition"
      :size="formSize"
      status-icon
    >
      <el-form-item
        v-for="item in formInfoList"
        :key="item.code"
        :label="item.title"
        :prop="item.code"
      >
        <!-- 多选 -->
        <el-checkbox-group
          v-if="item.answerType === 'MULTI'"
          v-model="ruleForm[item.code]"
          :style="formItemStyle"
        >
          <el-checkbox
            v-for="childItem in item.answerOption"
            :key="childItem.key"
            :label="childItem.key"
          >
            {{ childItem.value }}
          </el-checkbox>
        </el-checkbox-group>

        <!-- 单选 -->
        <el-radio-group
          v-if="item.answerType === 'SINGLE'"
          v-model="ruleForm[item.code]"
          :style="formItemStyle"
        >
          <el-radio
            v-for="childItem in item.answerOption"
            :key="childItem.key"
            :label="childItem.key"
          >
            {{ childItem.value }}
          </el-radio>
        </el-radio-group>

        <!-- 输入框 -->
        <el-input
          v-model="ruleForm[item.code]"
          v-if="item.answerType === 'TEXT'"
        />
      </el-form-item>

      <label class="el-form-item__label">
        {{ t("registration.registrationTips") }}
      </label>
      <el-form-item
        :label-width="120"
        :label="t('registration.company')"
        prop="submitCompany"
        class="left-label"
      >
        <el-input v-model="ruleForm.submitCompany" :disabled="isLogin" />
      </el-form-item>
      <el-form-item
        :label-width="120"
        :label="t('registration.country')"
        prop="submitCountryId"
        class="left-label"
      >
        <el-select
          v-model="ruleForm.submitCountryId"
          placeholder=" "
          :disabled="isLogin"
        >
          <el-option
            v-for="item in countryList.data"
            :key="item.id"
            :label="item.countryNameCn"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :label-width="120"
        :label="t('registration.name')"
        prop="submitName"
        class="left-label"
      >
        <!-- <el-form-item label="姓名" prop="submitName" class="left-label"> -->
        <el-input v-model="ruleForm.submitName" />
      </el-form-item>
      <el-form-item
        :label-width="120"
        :label="t('registration.email')"
        prop="submitMail"
        class="left-label"
      >
        <el-input v-model="ruleForm.submitMail" />
      </el-form-item>

      <el-form-item class="submit-label">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          提交
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
  onMounted,
  onDeactivated,
  toRaw,
  computed,
  unref,
} from "vue";
import type { FormInstance, FormRules } from "element-plus";
// import { getCountryListApi } from "@/api/index";
import { useI18n } from "vue-i18n";
import { useLocaleStoreWithOut } from "@/stores/modules/locale";
import { useLocale } from "@/locales/useLocale";

interface answerOptionItem {
  key: string;
  value: string;
}
interface FormInfoListItem {
  code: string;
  title: string;
  answerType: string;
  answerOption?: answerOptionItem[];
  answerText?: string;
}

interface RULE_FORM {
  [key: string]: boolean | string | null | never[];
}

const localeStore = useLocaleStoreWithOut();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { changeLocale, getLocale } = useLocale();
// const lang = computed(() => {
//   return localeStore.getLocale;
// });

const getCurrentLang = computed(() => {
  let lang;

  switch (unref(getLocale)) {
    case "en":
      lang = "en";
      break;
    case "ja":
      lang = "ja_JP";
      break;
    case "ko":
      lang = "ko_KR";
      break;
    default:
      lang = "zh_CN";
  }
  return lang;
});
console.log(getCurrentLang.value);
const { t } = useI18n();
const isLogin = ref(false);
const formItemStyle = ref({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});
const labelPosition = ref("top");
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();

let ruleForm = reactive<RULE_FORM>({
  meetings: [],
  participantsNumber: null, // 预计参会人数
  isBuySponsorship: null, // 是否购买赞助的计划
  isBookHotel: null, // 是否预定酒店

  submitName: "",
  submitMobile: "",
  submitCompany: "",
  submitCountryId: "",
  submitMail: "",
  submitCityId: "提交用户城市id",
});

const rules = reactive<FormRules>({
  submitName: [
    {
      required: true,
      message: () => t("registration.nameRules"),
      trigger: "blur",
    },
    // { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  submitCompany: [
    {
      required: true,
      message: () => t("registration.companyRules"),
      trigger: "blur",
    },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  submitCountryId: [
    {
      required: true,
      message: () => t("registration.countryRules"),
      trigger: "change",
    },
  ],
  submitMail: [
    {
      required: true,
      message: () => t("registration.emailRules1"),
      trigger: "blur",
    },
    {
      type: "email",
      message: () => t("registration.emailRules2"),
      trigger: ["blur", "change"],
    },
  ],

  meetings: [
    {
      type: "array",
      required: true,
      message: () => t("registration.meetingsRules"),
      // message: "请选择至少一项会议",
      trigger: "change",
    },
  ],
});

let countryList = reactive<any>({
  data: [],
});
const formInfoList = computed(
  () =>
    [
      {
        code: "meetings",
        title: t("registration.meetingsTitle"),
        answerType: "MULTI",
        answerOption: [
          {
            key: "1",
            value: t("registration.meetingsOption1"),
          },
          {
            key: "2",
            value: t("registration.meetingsOption2"),
          },
          {
            key: "3",
            value: t("registration.meetingsOption3"),
          },
          {
            key: "4",
            value: t("registration.meetingsOption4"),
          },
        ],
        answerText: "answerType为Text时输入",
      },
      {
        code: "participantsNumber",
        title: t("registration.participantsNumberTitle"),
        answerType: "SINGLE",
        answerOption: [
          {
            key: "1",
            value: t("registration.participantsNumberOption1"),
          },
          {
            key: "2",
            value: t("registration.participantsNumberOption2"),
          },
          {
            key: "3",
            value: t("registration.participantsNumberOption3"),
          },
          {
            key: "4",
            value: t("registration.participantsNumberOption4"),
          },
        ],
        answerText: "answerType为Text时输入",
      },
      {
        code: "isBuySponsorship",
        title: t("registration.isBuySponsorshipTitle"),
        answerType: "SINGLE",
        answerOption: [
          {
            key: "1",
            value: t("registration.isBuySponsorshipOption1"),
          },
          {
            key: "2",
            value: t("registration.isBuySponsorshipOption2"),
          },
        ],
        answerText: "answerType为Text时输入",
      },
      {
        code: "isBookHotel",
        title: t("registration.isBookHotelTitle"),
        answerType: "SINGLE",
        answerOption: [
          {
            key: "1",
            value: t("registration.isBookHotelOption1"),
          },
          {
            key: "2",
            value: t("registration.isBookHotelOption2"),
          },
        ],
        answerText: "answerType为Text时输入",
      },
      // {
      //   code: "Q5",
      //   title: "公司",
      //   answerType: "TEXT",
      //   answerText: "answerType为Text时输入",
      // },
      // {
      //   code: "Q6",
      //   title: "国家",
      //   answerType: "TEXT",
      //   answerText: "answerType为Text时输入",
      // },
      // {
      //   code: "Q7",
      //   title: "姓名",
      //   answerType: "TEXT",
      //   answerText: "answerType为Text时输入",
      // },
      // {
      //   code: "Q8",
      //   title: "邮箱",
      //   answerType: "TEXT",
      //   answerText: "answerType为Text时输入",
      // },
    ] as FormInfoListItem[]
);

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    postMessage("submit", toRaw(ruleForm));
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  console.log(!formEl, formEl);
  if (!formEl) return;
  formEl.resetFields();
};

const postMessage = (type: any, data: any) => {
  window.parent.postMessage(
    {
      cmd: type,
      iframeData: data,
    },
    "*"
  );
};

const getCountryList = async () => {
  // nextTick(async () => {
  // const res = await getCountryListApi();
  // console.log(res.data.records, "res");
  // countryList.data = res.data.records;
  // });
};

const changeLang = () => {
  // locale.value = locale.value === "zh_CN" ? "en" : "zh_CN";
  changeLocale(getCurrentLang.value === "zh_CN" ? "en" : "zh_CN");
  resetForm(ruleFormRef.value);
};
onMounted(() => {
  console.log(t, t("home.title"));
  window.addEventListener("message", function (event) {
    const obj = event.data;
    console.log(obj.parentData, "父组件传递进来的数据");
    switch (obj.cmd) {
      //初始化
      case "reset":
        console.log("重置 子页面里面 接收到的参数", obj.parentData);
        break;
      case "init":
        console.log(
          "初始化 子页面里面 接收到的参数",
          obj.parentData,
          obj.parentData.formData.lang
        );

        isLogin.value = obj.parentData.isLogin;
        localeStore.setLocaleInfo({ locale: obj.parentData.formData.lang });
        changeLocale(obj.parentData.formData.lang);
        ruleForm = Object.assign(ruleForm, obj.parentData.formData);
        break;
    }
  });

  // 获取国家列表
  getCountryList();
});

onDeactivated(() => {
  window.removeEventListener("message", () => {});
});
</script>

<style lang="scss">
.demo-ruleForm {
  .el-form-item {
    margin-bottom: 18px;
  }

  .left-label {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .el-form-item__label {
      margin-bottom: 0 !important;
      min-width: 120px;
    }

    .el-form-item__content {
      max-width: 236px;
      min-width: 236px;

      .el-select {
        width: 100%;
      }
    }
  }

  .submit-label {
    .el-form-item__content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
