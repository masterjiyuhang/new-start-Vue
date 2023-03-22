<template>
  <div class="cch-dashboard page-card">
    <div class="w-full h-full base-card">
      <div class="top">
        <h1>{{ $t("dashboard.title") }}</h1>

        <el-tabs v-model="tabActive">
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
                  <span class="item-value">2222</span>
                  <span class="traffic-name sle">Gitee 访问量</span>
                </div>
                <div class="gitHub-traffic traffic-box">
                  <div class="traffic-img">
                    <img src="@/assets/system/ProjectManager12.png" alt="" />
                  </div>
                  <span class="item-value">2222</span>
                  <span class="traffic-name sle">GitHub 访问量</span>
                </div>
                <div class="today-traffic traffic-box">
                  <div class="traffic-img">
                    <img src="@/assets/system/ProjectManager13.png" alt="" />
                  </div>
                  <span class="item-value">4567</span>
                  <span class="traffic-name sle">今日访问量</span>
                </div>
                <div class="yesterday-traffic traffic-box">
                  <div class="traffic-img">
                    <img src="@/assets/system/ProjectManager14.png" alt="" />
                  </div>
                  <span class="item-value">1234</span>
                  <span class="traffic-name sle">昨日访问量</span>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
              <div class="dashboard-card flex-c flex-col min-h-[550px]">
                <div class="flex-1 left-title">访问总数</div>
                <div class="left-number">666.666w</div>
              </div></el-col
            >
          </el-row>
        </div>
      </div>

      <div class="bottom">
        <!-- <div v-for="item in accountList" :key="item.id">
          <span>account: {{ item.account }}</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Dashboard",
};
</script>

<script lang="ts" setup>
import { getAccountListApi } from "@/api/index";
import { getDashboardListApi } from "@/api/dashboard";
import { onMounted, ref, reactive } from "vue";

const state = reactive({
  dashboardData: {
    todayVisits: 0,
    yesterdayVisits: 0,
  },
});
const accountList = ref<any[]>([]);

const getAccountList = async () => {
  const { data } = await getAccountListApi();
  accountList.value = data.items;
};

const getDashboardList = async () => {
  const { data } = await getDashboardListApi();
  state.dashboardData.todayVisits = data.todayVisits;
  state.dashboardData.yesterdayVisits = data.yesterdayVisits;
};
onMounted(() => {
  getAccountList();

  // 获取分析页数据
  getDashboardList();
});

const tabActive = ref(1);
const tabList = [
  { label: "未来7日", name: 1 },
  { label: "近七日", name: 2 },
  { label: "近一月", name: 3 },
  { label: "近三月", name: 4 },
  { label: "近半年", name: 5 },
  { label: "近一年", name: 6 },
];
</script>

<style lang="scss" scoped>
@include cch.b(dashboard) {
  // background-color: #ffa;
  // min-height: 80vh;

  .top {
    .top-content {
      height: 200px;
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
        }

        .img-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 90px;
          margin: 40px 0 20px;
          background: #ffffff;
          background-color: #ffffff;
          border-radius: 20px;
          box-shadow: 0 10px 20px rgb(0 0 0 / 14%);

          img {
            width: 60px;
            height: 65px;
          }
        }
        .left-number {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          font-size: 58px;
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
    }
  }
}
</style>
