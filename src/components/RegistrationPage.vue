<template>
  <div>
    <h1 :style="{ textAlign: 'center' }">
      {{ t("registration.mainTitle") }}
    </h1>
    <!-- <h3>{{ countryList }}</h3> -->
    <!-- <h2>{{ ruleForm }}</h2> -->
    <!-- <h3>{{ t("registration.email") }} {{ getCurrentLang }}</h3> -->

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
          :placeholder="t('registration.selectPlaceholder')"
          :disabled="isLogin"
        >
          <el-option
            v-for="item in countryList.data"
            :key="item.id"
            :label="
              getCurrentLang === 'zh_CN'
                ? item.countryNameCn
                : item.countryNameEn
            "
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
        prop="submitEmail"
        class="left-label"
      >
        <el-input v-model="ruleForm.submitEmail" />
      </el-form-item>

      <el-form-item class="submit-label">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          {{ t("registration.submitBtn") }}
        </el-button>
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
  toRefs,
} from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { getCountryListApi, submitRegistrationAPi } from "@/api/index";
import { useI18n } from "vue-i18n";
import { useLocaleStoreWithOut } from "@/stores/modules/locale";
import { useLocale } from "@/locales/useLocale";
import { defaultFormInfoList } from "./constant";

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
  [key: string]: boolean | string | null | any[];
}

const localeStore = useLocaleStoreWithOut();

const { changeLocale, getLocale } = useLocale();

const getCurrentLang = computed(() => {
  let lang;

  switch (unref(getLocale)) {
    case "en":
      lang = "en_US";
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
  submitEmail: "",
  formInfoList: [],
});

const rules = computed(() => {
  return reactive<FormRules>({
    submitName: [
      {
        required: true,
        message: () => t("registration.nameRules"),
        trigger: "blur",
      },
    ],
    submitCompany: [
      {
        required: true,
        message: () => t("registration.companyRules"),
        trigger: "blur",
      },
    ],
    submitCountryId: [
      {
        required: true,
        message: () => t("registration.countryRules"),
        trigger: "change",
      },
    ],
    submitEmail: [
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
        trigger: "change",
      },
    ],
  });
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
        answerText: "",
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
        answerText: "",
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
        answerText: "",
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
        answerText: "",
      },
      // {
      //   code: "Q5",
      //   title: "公司",
      //   answerType: "TEXT",
      //   answerText: "",
      // },
      // {
      //   code: "Q6",
      //   title: "国家",
      //   answerType: "TEXT",
      //   answerText: "",
      // },
      // {
      //   code: "Q7",
      //   title: "姓名",
      //   answerType: "TEXT",
      //   answerText: "",
      // },
      // {
      //   code: "Q8",
      //   title: "邮箱",
      //   answerType: "TEXT",
      //   answerText: "",
      // },
    ] as FormInfoListItem[]
);

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    postMessage("submit", toRaw(ruleForm));
    if (valid) {
      postMessage("getCode");
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const postMessage = (type: any, data?: any) => {
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
  const res = await getCountryListApi();
  countryList.data = res.data.records;
  // });
};

const handleSubmitFormData = async (data: any) => {
  const res = defaultFormInfoList.map((item) => {
    const r = item.answerOption.filter((answer) =>
      Array.isArray(data[item.code])
        ? data[item.code].indexOf(answer.key) > -1
        : answer.key === data[item.code]
    );
    item.answerOption = r;
    return item;
  });
  ruleForm.formInfoList = res;

  const submitRes = await submitRegistrationAPi(ruleForm);
  console.log(submitRes, "submitRes");
  postMessage("success", true);
};

const {
  participantsNumber, // 预计参会人数
  isBuySponsorship, // 是否购买赞助的计划
  isBookHotel,
  meetings,
} = toRefs(ruleForm);

onMounted(() => {
  window.addEventListener("message", function (event) {
    const obj = event.data;
    console.log(obj.parentData, "父组件传递进来的数据");
    switch (obj.cmd) {
      //初始化
      case "reset":
        console.log("重置 子页面里面 接收到的参数", obj.parentData);
        break;
      case "setCode":
        ruleForm = Object.assign(ruleForm, {
          uuid: obj.parentData.uuid,
          code: obj.parentData.code,
        });

        handleSubmitFormData({
          participantsNumber: participantsNumber.value,
          isBuySponsorship: isBuySponsorship.value,
          isBookHotel: isBookHotel.value,
          meetings: meetings.value,
        });
        console.log(ruleForm, "最后要提交的表单数据");
        break;
      case "init":
        console.log(
          "初始化 子页面里面 接收到的参数",
          obj.parentData,
          obj.parentData.formData.lang
        );

        isLogin.value = obj.parentData.isLogin;
        localeStore.setLocaleInfo({ locale: obj.parentData.formData.lang });
        changeLocale(obj.parentData.formData.lang === "zh-CN" ? "zh_CN" : "en");
        resetForm(ruleFormRef.value);
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
    justify-content: center;
    align-items: center;

    .el-form-item__label {
      margin-bottom: 0 !important;
      min-width: 120px;
    }

    .el-form-item__content {
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
