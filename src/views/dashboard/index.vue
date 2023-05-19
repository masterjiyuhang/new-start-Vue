<template>
  <div class="cch-dashboard">
    <div class="base-card top">
      <h1>{{ $t("dashboard.title") }}</h1>

      <el-tabs v-model="tabActive1" @tab-change="changeTabs">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>

      <div class="top-content">
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="dashboard-card-left flex-c flex-col min-h-[550px]">
              <div class="flex-1 left-title">访问总数</div>
              <div class="left-number">666.666w</div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="dashboard-card-center">
              <div class="gitee-traffic traffic-box">
                <div class="traffic-img">
                  <img src="@/assets/system/ProjectManager11.png" alt="" />
                </div>
                <span class="item-value">{{
                  state.dashboardData.newUsers
                }}</span>
                <span class="traffic-name sle">新增用户数</span>
              </div>
              <div class="gitHub-traffic traffic-box">
                <div class="traffic-img">
                  <img src="@/assets/system/ProjectManager12.png" alt="" />
                </div>
                <span class="item-value">{{
                  state.dashboardData.activeUsers
                }}</span>
                <span class="traffic-name sle">活跃用户数</span>
              </div>
              <div class="today-traffic traffic-box">
                <div class="traffic-img">
                  <img src="@/assets/system/ProjectManager13.png" alt="" />
                </div>
                <span class="item-value">
                  {{ state.dashboardData.todayVisits }}
                </span>
                <span class="traffic-name sle">今日访问量</span>
              </div>
              <div class="yesterday-traffic traffic-box">
                <div class="traffic-img">
                  <img src="@/assets/system/ProjectManager14.png" alt="" />
                </div>
                <span class="item-value">
                  {{ state.dashboardData.yesterdayVisits }}
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
      <div class="bottom-title">数据来源</div>
      <el-tabs v-model="tabActive2" @tab-change="changeTabs">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
      <div v-for="item in accountList" :key="item.id">
        <span>account: {{ item.account }}</span>
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

const state = reactive({
  dashboardData: {
    todayVisits: 0,
    yesterdayVisits: 0,
    newUsers: 0,
    activeUsers: 0,
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
    padding: 20px;
    margin-bottom: 20px;

    .top-content {
      // height: 200px;
      .dashboard-card-left {
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
        box-sizing: border-box;
        height: 100%;
        padding: 40px 0 30px 30px;
        overflow: hidden;
        color: #ffffff;
        background: url("../../assets/system/HalloweenIllustrations5.png");
        background-position: 50%;
        background-size: cover;
        border-radius: 20px;

        .left-title {
          font-size: 24px;
          color: antiquewhite;
        }

        .left-number {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          font-size: 58px;
          color: antiquewhite;
          text-align: center;
        }
      }

      .dashboard-card-center {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        justify-content: space-between;
        height: 100%;

        .traffic-box {
          box-sizing: border-box;
          display: flex;
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
            background-color: #ffffff;
            border-radius: 19px;
          }
        }
        img {
          width: 33px;
          height: 33px;
        }
        .item-value {
          margin-bottom: 4px;
          font-family: DIN;
          font-size: 28px;
          font-weight: bold;
          color: #1a1a37;
        }
        .traffic-name {
          overflow: hidden;
          font-family: DIN;
          font-size: 15px;
          color: #1a1a37;
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
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 430px;
        border: 1px solid #e5e7eb;
        border-radius: 25px;
        .echarts-title {
          padding: 15px 20px;
          font-family: DIN;
          font-size: 18px;
          font-weight: bold;
          border-bottom: 1px solid #e5e7eb;
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
