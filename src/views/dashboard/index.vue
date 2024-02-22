<template>
  <div class="cch-dashboard">
    <div class="base-card top">
      <h1 class="my-2 font-bold text-yellow-500">
        {{ $t("dashboard.title") }}
      </h1>
      <el-tabs v-model="tabActive1" @tab-change="changeTabs">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        />
      </el-tabs>

      <div class="top-content">
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="dashboard-card-left flex-c flex-col min-h-[550px]">
              <div class="flex-1 left-title">
                {{ $t("dashboard.viewCount") }}
              </div>
              <div class="relative left-number">
                {{ `${formatNum(state.dashboardData.totalNumbers)}k` }}
                <span class="absolute -top-5">+</span>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="dashboard-card-center">
              <div class="gitee-traffic traffic-box">
                <div class="traffic-img">
                  <img src="@/assets/system/ProjectManager11.png" alt="" />
                </div>
                <span class="item-value">{{
                  formatNum(state.dashboardData.newUsers)
                }}</span>
                <span class="traffic-name sle">新增用户数</span>
              </div>
              <div class="gitHub-traffic traffic-box">
                <div class="traffic-img">
                  <img src="@/assets/system/ProjectManager12.png" alt="" />
                </div>
                <span class="item-value">{{
                  formatNum(state.dashboardData.activeUsers)
                }}</span>
                <span class="traffic-name sle">活跃用户数</span>
              </div>
              <div class="today-traffic traffic-box">
                <div class="traffic-img">
                  <img src="@/assets/system/ProjectManager13.png" alt="" />
                </div>
                <span class="item-value">
                  {{ formatNum(state.dashboardData.todayVisits) }}
                </span>
                <span class="traffic-name sle">今日访问量</span>
              </div>
              <div class="yesterday-traffic traffic-box">
                <div class="traffic-img">
                  <img src="@/assets/system/ProjectManager14.png" alt="" />
                </div>
                <span class="item-value">
                  {{ formatNum(state.dashboardData.yesterdayVisits) }}
                </span>
                <span class="traffic-name sle">昨日访问量</span>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
            <div class="dashboard-card-right flex-c flex-col min-h-[550px]">
              <div class="echarts-title">Gitee / GitHub 访问量占比</div>
              <div class="book-echarts">
                <Pie ref="pieRef" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="base-card bottom">
      <div class="bottom-title">{{ $t("dashboard.dataSource") }}</div>
      <el-tabs v-model="tabActive2" @tab-change="changeTabs">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        />
      </el-tabs>
      <div v-for="item in accountList" :key="item.id">
        <span>{{ $t("dashboard.account") }}: {{ item.account }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="Dashboard">
import { getAccountListApi } from "@/api/index";
import { getDashboardListApi } from "@/api/dashboard";
import { onMounted, ref, reactive } from "vue";
import Pie from "@/components/echartsComp/Pie.vue";
import { TabPaneName } from "element-plus";
import { formatNum } from "@/utils/number";

const state = reactive({
  dashboardData: {
    todayVisits: 0,
    yesterdayVisits: 0,
    newUsers: 0,
    activeUsers: 0,
    totalNumbers: 0,
    pieData: [],
  },
});
const accountList = ref<any[]>([]);

const tabActive1 = ref(1);
const tabActive2 = ref(1);
const pieRef = ref();

const tabList = [
  { label: "未来7日", name: 1 },
  { label: "近七日", name: 2 },
  { label: "近一月", name: 3 },
  { label: "近三月", name: 4 },
  { label: "近半年", name: 5 },
  { label: "近一年", name: 6 },
];
// const pieData = [
//   { value: 5000, name: "Gitee 访问量" },
//   { value: 5000, name: "GitHub 访问量" },
// ];

const getAccountList = async () => {
  const { data } = await getAccountListApi();
  accountList.value = data.items;
};

const getDashboardList = async (params?: any) => {
  const { data } = await getDashboardListApi(params);
  state.dashboardData = data;
  pieRef.value.initChart(state.dashboardData.pieData);
};

// 修改tab
const changeTabs = (name: TabPaneName) => {
  getDashboardList({ tabName: name });
};

onMounted(() => {
  getAccountList();

  // 获取分析页数据
  getDashboardList();
});
</script>

<style lang="scss" scoped>
@include cch.b(dashboard) {
  // background-color: #ffa;
  // min-height: 80vh;

  .top {
    box-sizing: border-box;
    margin-bottom: 20px;
    padding: 20px;

    .top-content {
      // height: 200px;
      .dashboard-card-left {
        box-sizing: border-box;
        height: 100%;
        padding: 40px 0 30px 30px;
        overflow: hidden;
        border-radius: 20px;
        background: url("../../assets/system/HalloweenIllustrations5.png");
        background-position: 50%;
        background-size: cover;
        box-shadow: 0 2px 8px 0 rgb(0 0 0 / 15%);
        color: #fff;

        .left-title {
          color: antiquewhite;
          font-size: 24px;
        }

        .left-number {
          width: 100%;
          margin: auto;
          overflow: hidden;
          color: rgb(38 162 83);
          font-size: 58px;
          line-height: 58px;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .dashboard-card-center {
        display: flex;
        flex-wrap: wrap;
        place-content: space-between space-between;
        height: 100%;

        .traffic-box {
          display: flex;
          box-sizing: border-box;
          flex-direction: column;
          width: 47%;
          height: 48%;
          padding: 25px;
          border-radius: 30px;

          .traffic-img {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70px;
            height: 70px;
            margin-bottom: 10px;
            border-radius: 19px;
            background-color: #fff;
          }
        }

        img {
          width: 33px;
          height: 33px;
        }

        .item-value {
          margin-bottom: 4px;
          color: #1a1a37;
          font-size: 28px;
          font-weight: bold;
        }

        .traffic-name {
          overflow: hidden;
          color: #1a1a37;
          font-size: 15px;
          white-space: nowrap;
        }

        .gitee-traffic {
          background: url("../../assets/system/HalloweenIllustrations11.png");
          background-color: #e8faea;
          background-size: 100% 100%;
        }

        .gitHub-traffic {
          background: url("../../assets/system/HalloweenIllustrations10.png");
          background-color: #e7e1fb;
          background-size: 100% 100%;
        }

        .today-traffic {
          background: url("../../assets/system/HalloweenIllustrations3.png");
          background-color: #fdf3e9;
          background-size: 100% 100%;
        }

        .yesterday-traffic {
          background: url("../../assets/system/HalloweenIllustrations9.png");
          background-color: #f0f5fb;
          background-size: 100% 100%;
        }
      }

      .dashboard-card-right {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        width: 100%;
        height: 430px;
        border: 1px solid #e5e7eb;
        border-radius: 25px;

        .echarts-title {
          padding: 15px 20px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 18px;
          font-weight: bold;
        }

        .book-echarts {
          flex: 1;
          width: 100%;
        }
      }
    }
  }

  .bottom {
    position: relative;
  }

  // .top {

  // }
}
</style>
