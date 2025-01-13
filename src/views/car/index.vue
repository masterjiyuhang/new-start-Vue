<template>
  <div class="wrapper-page">
    <h1>car list</h1>
    <el-button @click="handleSayHi(0)" type="primary">sayHi</el-button>
    <el-button @click="handleSayHi(500)" type="danger">sayHi</el-button>
    <el-button @click="handleCreate" type="success"
      >create car {{ createVisible }}</el-button
    >
    <el-button @click="getList">get company list</el-button>
    <el-button @click="getCarList">get car list</el-button>
    <el-button @click="getCarByName">get car by name</el-button>
    <!-- <el-button @click="testGetWeiboHostListApi">get weibo list</el-button> -->

    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="title" label="车辆名称" width="150" />
      <el-table-column prop="years" label="年限" width="220" />
      <el-table-column prop="registration_date" label="登记年限" width="220" />
      <el-table-column prop="vin" label="vin码" width="220" />
      <el-table-column prop="transmission" label="驾驶方式" width="220">
        <template #default="scope">
          <el-tag type="success" class="cursor-pointer">
            {{
              scope.row.transmission == 1
                ? "自动"
                : ruleForm.transmission == 2
                  ? "手动"
                  : "未知"
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="动力类型" width="300">
        <template #default="scope">
          <el-tag type="primary" class="cursor-pointer">
            {{
              fuelTypeOptions.find((item) => item.value == scope.row.fuel_type)
                ?.label
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClick(scope.row)"
            >Detail</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
            >Edit</el-button
          >

          <el-popconfirm
            title="Are you sure to delete this?"
            @confirm="handleDel(scope.row)"
          >
            <template #reference>
              <el-button link type="danger" size="small">Del</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      :size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <cch-dialog
      v-model:visible="createVisible"
      title="创建车辆"
      @refresh="getCarList"
    >
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="车辆名称" prop="title">
          <el-input v-model="ruleForm.title" placeholder="车辆名称" />
        </el-form-item>
        <el-form-item label="所在城市" prop="city">
          <el-input v-model="ruleForm.city" placeholder="所在城市" />
        </el-form-item>
        <el-form-item label="车架号" prop="vinCode">
          <el-input v-model="ruleForm.vinCode" placeholder="车架号" />
        </el-form-item>
        <el-form-item label="驾驶方式" prop="transmission">
          <el-select v-model="ruleForm.transmission" placeholder="驾驶方式">
            <el-option label="自动" :value="1" />
            <el-option label="手动" :value="2" />
            <el-option label="未知" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="动力类型" prop="fuelType">
          <el-select v-model="ruleForm.fuelType" placeholder="动力类型">
            <el-option
              v-for="item in fuelTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆颜色" prop="color">
          <el-select v-model="ruleForm.color" placeholder="车辆颜色">
            <el-option label="黑色" value="1" />
            <el-option label="白色" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="年限" prop="years">
          <el-select-v2
            v-model="ruleForm.years"
            placeholder="请选择年限"
            :options="options"
          />
        </el-form-item>

        <el-form-item label="首次上牌时间">
          <el-date-picker
            v-model="ruleForm.date"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
        /></el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Create
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </cch-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElNotification, ElPopconfirm } from "element-plus";
import { ref, reactive } from "vue";
// import { useRouter } from "vue-router";
import {
  getWeiboHostListApi,
  getTestListApi,
  getCarListApi,
  createCarApi,
  delCarApi,
  getCarByNameApi,
  getCarDetailApi,
} from "@/api/baseTest";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";

const createVisible = ref(false);

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// const testGetWeiboHostListApi = async () => await getWeiboHostListApi();

const rr = ref([]);
const getList = async () => {
  try {
    const res = await getTestListApi();
    rr.value = res;
  } catch (error) {
    console.log(error);
  }
};
// const router = useRouter();
const handleSayHi = (duration: number) => {
  ElNotification({
    title: "Notification Title",
    message: "Hi~ ",
    duration,
  });
};

const handleClick = (e) => {
  console.log("🍉 ~ file: index.vue:180 ~ handleClick ~ e:", e);
};

/**
 * 编辑车辆
 * @param e 车辆信息
 */
const handleEdit = async (e) => {
  try {
    // 根据id获取车辆详情
    const res = await getCarDetailApi(e.id);
    console.log("🍉 ~ file: index.vue:197 ~ handleEdit ~ res:", res.data);
  } catch (error) {
    console.log(error);
  }
};

const handleDel = async (e) => {
  try {
    const res = await delCarApi({
      vin: e.vin,
    });

    if (res.code == 200) {
      ElNotification({
        title: "",
        message: "删除成功",
        duration: 1000,
      });
      getCarList();
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  pageSize.value = val;
  getCarList();
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  currentPage.value = val;
  getCarList();
};
async function getCarList() {
  try {
    const res = await getCarListApi({
      page: currentPage.value - 1,
      size: pageSize.value,
    });
    tableData.value = res.data.list;
    total.value = res.data.total;
  } catch (error) {
    console.log("🍉 ~ file: index.vue:207 ~ getCarList ~ error:", error);
    ElNotification({
      title: "",
      type: "error",
      message: "获取列表失败" + error,
      duration: 1000,
    });
  }
}

async function getCarByName() {
  const res = await getCarByNameApi({ name: "小电动" });
  console.log("🍉 ~ file: index.vue:213 ~ getCarByName ~ res:", res);
}

const tableData = ref([]);

const handleCreate = () => {
  createVisible.value = true;
};

interface RuleForm {
  title: string;
  years: number;
  city: string;
  transmission: number;
  color: string;
  vinCode: string;
  date: string;
  fuelType: string;
}

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  title: "小电动",
  city: "上海",
  years: 2,
  transmission: 1,
  color: "2",
  vinCode: "12345678901234567",
  date: "",
  fuelType: "0",
});

const rules = reactive<FormRules<RuleForm>>({
  title: [
    { required: true, message: "请输入车辆名称", trigger: "blur" },
    { min: 3, max: 10, message: "车辆名称长度应在3～10之间", trigger: "blur" },
  ],
  vinCode: [
    { required: true, message: "请输入车架号", trigger: "blur" },
    { len: 17, message: "请输入正确17位车架号", trigger: "blur" },
  ],
  city: [
    { required: true, message: "请输入城市名称", trigger: "blur" },
    { min: 2, max: 10, message: "城市名称长度应在2～10之间", trigger: "blur" },
  ],
  color: [
    {
      required: true,
      message: "请选择颜色",
      trigger: "change",
    },
  ],
  years: [
    {
      required: true,
      message: "请选择年限",
      trigger: "change",
    },
  ],
  transmission: [
    {
      required: true,
      message: "请选择行驶方式",
      trigger: "change",
    },
  ],
  date: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change",
    },
  ],
  fuelType: [
    {
      required: true,
      message: "请选择动力类型",
      trigger: "change",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!", ruleForm);
      const params = {
        ...ruleForm,
        vin: ruleForm.vinCode,
        fuel_type: ruleForm.fuelType,
        registration_date: ruleForm.date,
      };
      try {
        const res = await createCarApi(params);
        console.log(
          "🍉 ~ file: index.vue:276 ~ awaitformEl.validate ~ res:",
          res,
        );
        if (res.code === 200) {
          ElNotification({
            title: "Notification Title",
            message: "创建成功",
            duration: 1000,
          });
          createVisible.value = false;
        } else {
          ElNotification({
            title: "Notification Title",
            message: "创建失败",
            duration: 1000,
          });
        }
      } catch (error) {}
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 15 }).map((_, idx) => ({
  value: idx + 1,
  label: `${idx + 1}`,
}));

const fuelTypeOptions = [
  {
    value: "0",
    label: "未知",
  },
  {
    value: "1",
    label: "汽油",
  },
  {
    value: "2",
    label: "柴油",
  },
  {
    value: "3",
    label: "纯电动",
  },
  {
    value: "4",
    label: "油电混合",
  },
];

onMounted(() => {
  getCarList();
});
</script>

<style lang="scss" scoped></style>
