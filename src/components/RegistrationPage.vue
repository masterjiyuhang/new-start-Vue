<template>
  <div>
    <h1>我要参会</h1>
    <!-- <h2>{{ ruleForm }}</h2> -->

    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :label-position="labelPosition"
      :size="formSize"
      status-icon
    >
      <el-form-item label="请选择您要参加的会议（可多选）" prop="meetings">
        <el-checkbox-group v-model="ruleForm.meetings" :style="formItemStyle">
          <el-checkbox label="2023 泰国芭提雅峰会" name="type" />
          <el-checkbox label="2023 中国香港展会" name="type" />
          <el-checkbox label="2023 中国天津峰会" name="type" />
          <el-checkbox label="2023 土耳其峰会" name="type" />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="预计参会人数" prop="participantsNumber">
        <el-radio-group
          v-model="ruleForm.participantsNumber"
          :style="formItemStyle"
        >
          <el-radio label="1">1人</el-radio>
          <el-radio label="2">2人</el-radio>
          <el-radio label="3">3人</el-radio>
          <el-radio label="4">4人及以上</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否有购买赞助的计划" prop="isBuySponsorship">
        <el-radio-group
          v-model="ruleForm.isBuySponsorship"
          :style="formItemStyle"
        >
          <el-radio label="1">是</el-radio>
          <el-radio label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否预定酒店" prop="isBookHotel">
        <el-radio-group v-model="ruleForm.isBookHotel" :style="formItemStyle">
          <el-radio label="1">是</el-radio>
          <el-radio label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <label class="el-form-item__label"
        >请留下联系方式，我们会尽快为您安排后续事宜
      </label>
      <el-form-item label="公司" prop="company" class="left-label">
        <el-input v-model="ruleForm.company" />
      </el-form-item>
      <el-form-item label="国家" prop="country" class="left-label">
        <el-select
          v-model="ruleForm.country"
          placeholder="please select your country"
        >
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name" class="left-label">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email" class="left-label">
        <el-input v-model="ruleForm.email" />
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
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const formItemStyle = ref({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});
const labelPosition = ref("top");
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  meetings: [],
  participantsNumber: null, // 预计参会人数
  isBuySponsorship: null, // 是否购买赞助的计划
  isBookHotel: null, // 是否预定酒店

  name: "",
  company: "",
  country: "",
  email: "",
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  company: [
    {
      required: true,
      message: "请输入公司名称",
      trigger: "blur",
    },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  country: [
    {
      required: true,
      message: "请选择国家",
      trigger: "change",
    },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ],

  meetings: [
    {
      type: "array",
      required: true,
      message: "请选择至少一项会议",
      trigger: "change",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
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

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
</script>

<style lang="scss">
.demo-ruleForm {
  .left-label {
    display: flex;
    justify-content: center;
    align-items: center;

    .el-form-item__label {
      margin-bottom: 0 !important;
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
