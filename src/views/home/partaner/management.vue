<template>
  <div class="rc-car-management">
    <rc-table
      v-if="checkPermissions('PartnerSystem_CarManagement_CarLIst_View')"
      ref="carTable"
      :columns="COLUMNS"
      :page="{ layout: 'total, sizes, prev, pager, next, jumper' }"
      :attr="{ size: 'mini' }"
      @load="load"
    >
      <div slot="toolbar">
        <div class="rc-panel rc-panel__car-layout">
          <el-form
            ref="idForm"
            :model="idForm"
            :inline="true"
            :rules="idRules"
            size="mini"
            class="rc-panel__car-filter rc-panel__car-filter-border"
          >
            <el-form-item prop="car_id_type">
              <el-select v-model="idForm.car_id_type" class="formclass">
                <el-option
                  v-for="item in carTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="car_id">
              <el-input
                v-model.trim="idForm.car_id"
                clearable
                class="formmax"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="searchById"
                >搜索</el-button
              >
            </el-form-item>
          </el-form>
          <div class="rc-panel__car-time-selector">
            <time-selector
              ref="timeSelector"
              :type-options="typeOptions"
              :layout-type="layoutType"
              :button-types="buttonTypes"
              :defind-range="defindRange"
              :default-time-type="defaultTimeType"
              @selectTime="timeHandler"
              @selectTimeType="timeType = $event"
            />
          </div>
          <el-form
            ref="filterForm"
            :inline="true"
            :rules="rules"
            :model="form"
            class="rc-panel__car-filter rc-panel__car-filter-top"
            size="mini"
          >
            <el-form-item label="交易状态" prop="transaction_status">
              <el-select v-model="form.transaction_status" class="formmiddle">
                <el-option
                  v-for="item in tradeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="标签" prop="tags">
              <el-select v-model="form.tags" multiple class="formmax">
                <el-option
                  v-for="item in tagOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="user_role" class="formleft">
              <el-select v-model="form.user_role" class="formmiddle">
                <el-option
                  v-for="item in affiliationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="user_ids">
              <el-cascader
                v-model="form.user_ids"
                :options="usersOptions"
                :props="{
                  expandTrigger: 'click',
                  emitPath: true,
                  value: 'user_id',
                  label: 'user_name',
                  children: 'belong_subordinate',
                }"
                filterable
                class="formlong"
              />
            </el-form-item>
            <el-form-item label="来源" prop="source" class="formleft">
              <el-select v-model="form.source" class="formlong">
                <el-option
                  v-for="item in sourceOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="展示状态" prop="show_status">
              <el-select v-model="form.show_status" class="formmiddle">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="品牌" prop="brand_id">
              <el-select
                v-model="form.brand_id"
                filterable
                class="formmiddle"
                @change="brandChange"
              >
                <el-option
                  v-for="item in brandOptions"
                  :key="item.brand_id"
                  :label="item.brand_name"
                  :value="item.brand_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="车系" prop="series_id">
              <el-select v-model="form.series_id" filterable class="formmiddle">
                <el-option
                  v-for="item in seriersList"
                  :key="item.series_id"
                  :label="item.series_name"
                  :value="item.series_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="price_type" class="formleft">
              <el-select v-model="form.price_type" class="formmiddle">
                <el-option
                  v-for="item in priceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="price">
              <el-select v-model="form.price" class="formmin">
                <el-option
                  v-for="item in priceOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="form.price === '-1'"
              ref="price"
              label-width="60px"
              prop="definePrice"
              class="error-info"
            >
              <el-form-item>
                <el-input
                  v-model="form.low_price"
                  placeholder="下限"
                  class="formmiddle"
                  @input="priceChange"
                >
                  <template slot="append">万</template>
                </el-input>
              </el-form-item>
              <span class="underline">-</span>
              <el-form-item>
                <el-input
                  v-model="form.high_price"
                  placeholder="上限"
                  class="formmiddle"
                  @input="priceChange"
                >
                  <template slot="append">万</template>
                </el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item class="rc-panel__buttons">
              <el-button type="primary" @click.native="search">搜索</el-button>
              <el-button type="danger" @click.native="resetFilter"
                >重置</el-button
              >
              <el-button
                v-if="
                  checkPermissions('PartnerSystem_CarManagement_CarList_export')
                "
                type="success"
                @click.native="download"
                >导出</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="rc-panel__asc-desc-info">
          <rc-toolbar class="toolbar">
            <span
              v-for="item in ascDescInfo"
              :key="item.value"
              :class="{
                'el-icon-arrow-up':
                  item.value === form.index_filed && form.index_type === 1,
                'el-icon-arrow-down':
                  (item.value === form.index_filed && form.index_type === 2) ||
                  item.value !== form.index_filed,
                filtrate: item.value === form.index_filed,
                other: true,
              }"
              @click="handleFiltrate(item.value)"
            >
              {{ item.label }}
            </span>
            <template slot="button">
              <span>
                总车辆数
                <strong>{{ total }}</strong>
                台
              </span>
            </template>
          </rc-toolbar>
        </div>
      </div>
    </rc-table>
    <price-label-dialog
      v-if="priceVisible"
      :visible.sync="priceVisible"
      :car-id="carId"
    />
    <reallocate-dialog
      :visible.sync="reallocateVisible"
      :row="reallocateBaseInfo"
      @refresh="refresh"
    />
    <change-price-dialog
      :visible.sync="changePriceVisible"
      :row="row"
      @refresh="refresh"
    />
    <online-auction-dialog
      :visible.sync="onlineAuctionVisible"
      :row="row"
      @refresh="refresh"
    />
    <nb-nc-change-price-dialog
      :visible.sync="NbNcChangePriceVisible"
      :row="row"
      @refresh="refresh"
    />
    <change-wholesale-price-dialog
      :visible.sync="changeWholesalePriceVisible"
      :row="row"
      @refresh="refresh"
    />
  </div>
</template>

<script>
import {
  COLUMNS,
  TYPEOPTIONS,
  AFFILIATION,
  PRICETYPE,
  CARTYPE,
  PRICEOPTIONS,
  BUTTONS,
} from "./constant";
// eslint-disable-next-line no-unused-vars
import {
  userList,
  brands,
  series,
  showStatusEnum,
  tradeStatusEnum,
  sourceEnum,
  tagEnum,
  carList,
  exportCarList,
  getInfoNeedForPricing,
  getCanChangeRrcPrice,
} from "@/services/carSource.service.js";
const reg = /^\d+(\.\d{0,})?$/;
export default {
  name: "CarsManagement",
  components: {
    PriceLabelDialog: () => import("./components/priceLabelDialog"),
    NbNcChangePriceDialog: () => import("./components/NBNCChangePriceDialog"),
    ChangeWholesalePriceDialog: () =>
      import("./components/ChangeWholesalePriceDialog"),
    ReallocateDialog: () => import("./components/reallocateDialog"),
    changePriceDialog: () => import("./components/changePriceDialog"),
    addInfoDialog: () => import("./components/addInfoDialog"),
    onlineAuctionDialog: () => import("./components/onlineAuctionDialog.vue"),
  },
  data() {
    const priceValidate = (rule, value, callback) => {
      if (!reg.test(this.form.high_price) || !reg.test(this.form.low_price)) {
        callback(new Error("请输入数字"));
      } else if (
        this.form.high_price !== "" &&
        this.form.low_price !== "" &&
        parseFloat(this.form.low_price) > parseFloat(this.form.high_price)
      ) {
        callback(new Error("预算下限需小于或等于预算上限"));
      } else {
        callback();
      }
    };
    return {
      carList: null, // 车源列表数据
      typeOptions: TYPEOPTIONS, // 时间选择器时间类型
      buttonTypes: BUTTONS, // 时间选择器的按钮配置列表
      defindRange: 93, // 自定义时间 范围处理 最大3个月
      layoutType: "oneline", // 水平布局
      affiliationOptions: AFFILIATION, // 归属类型
      priceTypeOptions: PRICETYPE, // 价格类型
      priceOptions: PRICEOPTIONS, // 价格枚举
      carTypeOptions: CARTYPE, // 车源类型
      usersOptions: null, // 归属
      userIds: [], // 通过处理后选择的归属
      usersOptionsLevel: 0, // 归属层级
      brandOptions: null, // 品牌
      seriersList: [], // 车系
      sourceOptions: [], // 来源
      tagOptions: null, // 标签
      tradeOptions: null, // 交易状态
      statusOptions: null, // 展示状态
      total: null, // 车辆总数
      idRules: {
        car_id: [{ required: true, message: "请输入编号", trigger: "change" }],
      },
      rules: {
        definePrice: [{ validator: priceValidate, trigger: "change" }],
      },
      COLUMNS: COLUMNS.call(this),
      timeStart: null, // 开始时间
      timeEnd: null, // 结束时间
      timeType: 2, // 时间类型
      defaultTimeType: 2, // 默认选中的时间类型
      status: null, // 车源状态
      carId: null, // 操作的某一行的对象引用
      priceVisible: false, // 控制价签窗口开关
      reallocateVisible: false, // 控制改派窗口开关变量
      changePriceVisible: false, // 控制修改价格窗口开关
      NbNcChangePriceVisible: false, // 控制NBNC修改价格窗口开关
      changeWholesalePriceVisible: false, // 控制录入B端价窗口开关
      addInfoVisible: false, // 控制车辆补充信息窗口开关
      pricingDialogVisible: false, // 控制定价工具窗口开关
      onlineAuctionVisible: false, // 控制上架收车帮窗口开关
      row: {}, // 要操作的行对象
      reallocateBaseInfo: {}, // 改派窗口要操作的对象
      oldIndexFiled: 1, // 记录上一次点击的排序字段
      ascDescInfo: [
        {
          label: "最新创建",
          value: 1,
        },
        {
          label: "最新上架",
          value: 2,
        },
      ],
      formType: null, // 搜索的表单类型
      idForm: {
        car_id_type: 1, // id类型
        car_id: "", // 车源编号
        index_filed: 1, // 排序字段 默认为 最新创建 1 在架天数 2
        index_type: 2, // 排序方式 默认倒序 1：asc（升序），2：desc（降序）
      }, // 编号表单
      form: {
        brand_id: null,
        series_id: null,
        user_ids: [-1], // 归属销售选中的销售ID，默认选中全部是-1
        user_role: 1, // 归属
        price_type: 1, // 价格类型
        price: "-2", // 价格
        low_price: null, // 价格下限
        high_price: null, // 价格上限
        definePrice: null,
        source: "", // 来源
        tags: null, // 标签
        show_status: "", // 展示状态
        transaction_status: "SELLING", // 交易状态
        index_filed: 1, // 排序字段 默认为 最新创建 1 在架天数 2
        index_type: 2, // 排序方式 默认倒序 1：asc（升序），2：desc（降序）
      },
      pricingData: null, // 调用H5定价工具所需参数
    };
  },
  watch: {
    "form.user_role"() {
      this.getAndFormatUserList();
    },
    "form.price_type"() {
      // 当价格类型变化时 清除自定义价格
      if (this.form.price === "-1") {
        // 自定义价格
        this.form.low_price = null;
        this.form.high_price = null;
      }
    },
    "form.price"() {
      // 当价格选择项变动时 清除自定义价格
      if (this.form.price !== "-1") {
        // 自定义价格
        this.form.low_price = null;
        this.form.high_price = null;
      }
    },
    $route: {
      handler: function () {
        // 路由变化时关闭当前定价报告窗口
        this.pricingDialogVisible = false;
      },
      deep: true,
    },
  },
  created() {
    // 获取默认的归属评估师回填
    this.getAndFormatUserList();
    // 获取品牌回填
    this.getBrandList();
    // 获取来源回填
    this.getSourceEnum();
    // 获取标签回填
    this.getTagEnum();
    // 交易状态回填
    this.getTradeStatusEnum();
    // 展示状态回填
    this.getShowStatusEnum();
  },
  activated() {
    // console.log('activated')
  },
  deactivated() {
    try {
      this.$msgbox.close();
    } catch (e) {}
  },
  methods: {
    // 表格加载事件的回调函数
    load(table) {
      this.$nextTick(async () => {
        // 页面第一次加载时table回调load时，时间选择器还没有将时间初始化，需要等待时间选择器初始化后才能获取默认时间
        const { currentPage, size } = table;
        let params = this.formatListRequest();
        params = {
          page_num: currentPage,
          page_size: size,
          ...params,
        };
        // 获取车辆列表数据
        /* eslint-disable */
        const {
          data: { car_list, total },
        } = await carList(params);
        this.total = total ? total : 0;
        table.list = car_list ? car_list : [];
        table.total = total ? total : 0;
      });
    },
    search() {
      this.formType = "other";
      if (this.form.price === "-1") {
        // 价格为自选时进行表单验证
        this.$refs.filterForm.validate(async (valid) => {
          if (valid) {
            this.$refs.carTable.onSearch();
          }
        });
      } else {
        this.$refs.carTable.onSearch();
      }
    },
    // 通过id进行查询
    searchById() {
      this.formType = "id";
      this.$refs.idForm.validate(async (valid) => {
        if (valid) {
          this.$refs.carTable.onSearch();
        }
      });
    },
    // 刷新时回调函数
    refresh() {
      const table = this.$refs.carTable;
      this.load(table);
    },
    // 获取 归属评估师列表 并格式化
    async getAndFormatUserList() {
      const params = [this.form.user_role];
      const { data } = await userList(params); // 通过角色 获取列表 1:评估师，2.销售
      this.getUsersOptiosLevel(data, 1); // 获取层级数
      this.usersOptions = this.formatUserList(data); // 将获取的数据格式化
    },
    // 遍历处理评估师和销售分组数据
    formatUserList(data) {
      data.user_name = `${data.user_name}(${data.user_status_desc})`;
      if (data.belong_subordinate && data.belong_subordinate.length > 0) {
        for (let i = 0; i < data.belong_subordinate.length; i++) {
          this.formatUserList(data.belong_subordinate[i]);
        }
        const ALL = { user_name: "不限", user_id: -1 };
        data.belong_subordinate.unshift(ALL);
      } else {
        data.belong_subordinate = undefined;
      }
      return data.belong_subordinate;
    },
    // 获取最深的层级 是几级
    getUsersOptiosLevel(obj, l) {
      const self = this;
      this.usersOptionsLevel = Math.max(this.usersOptionsLevel, l);
      if (obj.belong_subordinate)
        obj.belong_subordinate.forEach(function (v) {
          self.getUsersOptiosLevel(v, l + 1);
        });
    },
    // 获取最后一层的
    getLastLevelUsers(arr) {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i].belong_subordinate) {
          this.getLastLevelUsers(arr[i].belong_subordinate);
        } else if (
          arr[i].belong_subordinate === undefined &&
          arr[i].user_id !== -1
        ) {
          this.userIds.push(arr[i].user_id);
        }
      }
    },
    // 获取品牌 车系
    async getBrandList() {
      const {
        data: { brands: brandList },
      } = await brands();
      const ALL = { brand_name: "不限品牌", brand_id: -1 };
      brandList.unshift(ALL);
      this.brandOptions = brandList;
    },
    // 品牌 车系 级联 动态加载
    async brandChange(brandId) {
      this.form.series_id = -1;
      const data = await this.getSeries(brandId);
      this.seriersList = data;
    },
    // 通过品牌id 获取车系列表
    async getSeries(brandId) {
      const ALL = [{ series_name: "不限车系", series_id: -1 }];
      if (brandId === -1 || brandId === undefined) {
        return ALL;
      }
      const {
        data: { seriers: seriersList },
      } = await series({ brand_id: brandId });
      seriersList.unshift(...ALL);
      return seriersList;
    },
    // 获取来源信息
    async getSourceEnum() {
      const { data } = await sourceEnum();
      const ALL = { id: "", name: "不限" };
      data.unshift(ALL);
      this.sourceOptions = data;
    },
    // 获取标签
    async getTagEnum() {
      const { data } = await tagEnum();
      this.tagOptions = data;
    },
    // 获取交易状态枚举
    async getTradeStatusEnum() {
      const ALL = { id: "", name: "不限" };
      const { data } = await tradeStatusEnum();
      data.unshift(ALL);
      this.tradeOptions = data;
    },
    // 获取展示状态枚举
    async getShowStatusEnum() {
      const ALL = { id: "", name: "不限" };
      const { data } = await showStatusEnum();
      data.unshift(ALL);
      this.statusOptions = data;
    },
    // 处理筛选 升降序
    handleFiltrate(data) {
      if (this.oldIndexFiled === data) {
        // 如果 排序字段与上一次相同 则 更改升降顺序 1：asc（升序），2：desc（降序）
        this.form.index_type = this.form.index_type === 2 ? 1 : 2;
      } else {
        // 如果 排序字段与上一次不相同 则 重置
        this.oldIndexFiled = data;
        this.form.index_type = 2;
      }
      this.form.index_filed = data;
      this.$refs.carTable.onSearch();
    },
    // 整合列表请求参数处理
    formatListRequest() {
      if (this.formType === "id") return this.idForm;
      const form = this.form;
      const params = {};
      for (const key in form) {
        const item = form[key];
        if (item !== null && item !== "") {
          // 需要对 user_ids 单独处理
          if (
            Object.prototype.toString.call(item) === "[object Array]" &&
            key === "user_ids"
          ) {
            if (item[0] !== -1) {
              // 当form.user_ids第一项是-1说明选择的是不限，不做处理，不等于-1才会处理
              if (item[item.length - 1] !== -1) {
                // 最后一项 选择的不是不限 -1 代表选择了指定组长下的评估师/销售
                params["user_ids"] = [item[item.length - 1]];
              } else {
                let usersList = JSON.parse(JSON.stringify(this.usersOptions));
                for (let i = 0; i < item.length - 1; i++) {
                  usersList = usersList.find(
                    (option) => option.user_id === item[i],
                  ).belong_subordinate;
                }
                if (item.length === this.usersOptionsLevel) {
                  // 层级相同 代表最后一项选择的是 -1 不限
                  params["user_ids"] = usersList
                    .map((option) => {
                      // eslint-disable-line
                      if (option.user_id !== -1) return option.user_id;
                    })
                    .filter((userId) => !!userId);
                } else {
                  // 层级不同 中间层级选择了 -1 不限
                  this.getLastLevelUsers(usersList);
                  params["user_ids"] = [].concat(this.userIds);
                  this.userIds.splice(0, this.userIds.length);
                }
              }
            }
          } else if (key === "brand_id") {
            // 处理 品牌 车系
            if (item !== -1) {
              // 当品牌 车系选项不是 不限 时
              params["brand_id"] = item;
            }
          } else if (key === "series_id") {
            // 处理 品牌 车系
            if (item !== -1) {
              // 当品牌 车系选项不是 不限 时
              params["series_id"] = item;
            }
          } else if (key === "price") {
            // 处理 价格
            if (item !== "-1" && item !== "-2") {
              // 当价格不是 自定义 及 不限
              params["price_start"] = item.split("-")[0];
              params["price_end"] = item.split("-")[1];
            } else if (item === "-1") {
              // 当价格是 自定义
              params["price_start"] = form.low_price;
              params["price_end"] = form.high_price;
            }
          } else if (key === "tags") {
            // 处理 标签
            if (item.length !== 0) {
              params["tags"] = item;
              // .join(',')
            }
          } else if (key === "source") {
            // 处理来源 中的 闪卖 如果是闪卖 就 多加一个参数 是否是闪卖
            if (item === "flashSale") {
              params["well_chosen"] = true;
            } else {
              params["well_chosen"] = false;
              params[key] = item;
            }
          } else if (key !== "low_price" && key !== "high_price") {
            params[key] = item;
          }
        }
      }
      this.status && (params.status = this.status);
      if (this.timeStart && this.timeEnd) {
        params["time_start"] = new Date(
          this.timeStart.replace(/-/g, "/"),
        ).getTime();
        params["time_end"] = new Date(
          this.timeEnd.replace(/-/g, "/"),
        ).getTime();
        params["time_type"] = this.timeType;
      }
      return params;
    },
    // 价格修改出发change
    priceChange() {
      if (
        reg.test(this.form.high_price) &&
        this.form.high_price.split(".")[1] &&
        this.form.high_price.split(".")[1].length > 2
      ) {
        this.form.high_price = `${this.form.high_price.split(".")[0]}.${this.form.high_price.split(".")[1].substr(0, 2)}`;
      }
      if (
        reg.test(this.form.low_price) &&
        this.form.low_price.split(".")[1] &&
        this.form.low_price.split(".")[1].length > 2
      ) {
        this.form.low_price = `${this.form.low_price.split(".")[0]}.${this.form.low_price.split(".")[1].substr(0, 2)}`;
      }
      this.$refs.filterForm.validate(() => {});
    },
    // 获取开始时间和结束时间
    timeHandler(time) {
      [this.timeStart, this.timeEnd] = time || [null, null];
    },
    // 重置筛选信息
    resetFilter() {
      this.$refs.filterForm.resetFields();
      this.$refs.timeSelector.init();
    },
    // 导出
    async download() {
      let params = this.formatListRequest();
      await exportCarList(params);
    },
    // 定价工具
    async pricingDialogMethods(row) {
      const height = window.screen.height * 0.7;
      const width = (height / 16) * 9;
      const left = window.innerWidth / 2 - width / 2;
      this.newOpen && this.newOpen.close();
      this.newOpen = window.open(
        "",
        "定价工具",
        `height=${height}, innerHeight=${height}, width=${width}, innerWidth=${width}, top=85, left=${left}, toolbar=no, directories=no, resizable=no,location=no, menubar=no, fullscreen=false, scrollbars,status=no`,
      );
      const { data } = await getInfoNeedForPricing({
        car_id: row.base_info.car_id,
      });
      this.pricingData = data;
      this.pricingData.model_name = row.base_info.title;
      this.pricingData.mile = row.configuration_info.mileage;
      this.pricingData.reg_date = row.configuration_info.register_date.slice(
        0,
        7,
      );
      this.pricingData.source = "ka-web";
      this.pricingData.car_id = row.base_info.car_id;
      this.pricingData.user_id = this.$store.state.user.userInfo.id;
      if (row.other_info.rrc_price || row.other_info.show_price) {
        this.pricingData.expected_selling_price =
          row.other_info.rrc_price || row.other_info.show_price;
      }
      let webURL;
      if (Object.is(process.env.ANNE_APP_MODE, "qiniu")) {
        webURL = "//pricingtool.renrenaiche.cn/h5/pricingtool/pricing/report?";
      } else {
        webURL =
          "http://pricingtool-testing.renrenaiche.cn/h5/pricingtool/pricing/report?";
      }
      Object.keys(this.pricingData).forEach((item) => {
        webURL += `${item}=${this.pricingData[item]}&`;
      });
      this.newOpen.location.href = webURL.substring(0, webURL.length - 1);
    },
    reviewDialogMethods(id) {
      if (!id) {
        this.$notify.warning({ message: "缺少必要参数id", title: "警告" });
        return;
      }
      const height = window.screen.height * 0.7;
      const width = (height / 16) * 9;
      const left = window.screen.width / 2 - width / 2;
      this.newOpen && this.newOpen.close();
      this.newOpen = window.open(
        "",
        "复检报告",
        `height=${height}, innerHeight=${height}, width=${width}, innerWidth=${width}, top=85, left=${left}, toolbar=no, directories=no, resizable=no,location=no, menubar=no, fullscreen=false, scrollbars,status=no`,
      );
      let webURL = `//appgate.renrenaiche.cn/inspector_m/shareCheckReport/?id=${id}`;
      this.newOpen.location.href = webURL;
    },
    async getCanChangeRrcPrice(car_id) {
      const { data } = await getCanChangeRrcPrice({ car_id });
      if (data.result) {
        this.NbNcChangePriceVisible = true;
      } else {
        this.$alert(data.reason || "不允许修改展示价格", "提示", {
          type: "info",
          center: true,
        });
      }
    },
  },
};
</script>

<style lang="scss">
@include b(panel) {
  @include e(car-layout) {
    flex-wrap: wrap;
  }

  @include e(car-time-selector) {
    // flex-shrink: 0;
    margin-top: 11px;
  }

  @include e(car-filter) {
    width: 1110px;

    .formclass {
      width: 94px;
    }

    .underline {
      margin: 0 6px 0 -4px;
    }

    .formmin {
      width: 98px;
    }

    .formmax {
      width: 156px;
    }

    .formmiddle {
      width: 110px;
    }

    .formlong {
      width: 170px;
    }

    .formleft {
      margin-left: 10px;
    }
  }

  @include e(car-filter-top) {
    padding-top: 10px;
  }

  @include e(car-filter-border) {
    border-bottom: 1px solid #d7d7d7;
  }

  @include e(buttons) {
    margin-bottom: 0;
    float: right;
  }

  @include e(asc-desc-info) {
    padding: 0 10px;
    background-color: white;

    .toolbar {
      height: 40px;
    }

    .filtrate {
      color: #fd521d;
    }

    .other {
      padding-right: 20px;
      border-right: 1px solid #d7d7d7;
      cursor: pointer;

      &:last-child {
        padding-left: 20px;
      }
    }

    span {
      font-size: 14px;

      strong {
        font-weight: bold;
      }
    }
  }

  @include e(baseinfo) {
    display: flex;
    margin: 10px 0 4px;

    .left {
      position: relative;
      width: 120px;
      margin-right: 14px;

      .audit {
        position: absolute;
        top: 0;
        width: 114px;
        height: 76px;
        background-color: rgb(204 195 195 / 40%);
        color: #fff;

        span {
          display: inline-block;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 70px;
          height: 70px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background-color: rgb(14 14 14 / 50%);
          font-size: 12px;
          line-height: 70px;
          text-align: center;
        }
      }

      .car-img {
        width: 114px;
        height: 76px;
      }
    }

    .car-tags {
      display: flex;
      flex-wrap: wrap;

      span {
        display: inline-block;
        height: 18px;
        margin: 0 5px 5px 0;
        padding: 0 4px;
        line-height: 18px;
        text-align: center;
      }

      .other-tag {
        background-color: #efd28b;
        color: #743804;
      }

      .retail-quality-control {
        background-color: #e9f5df;
        color: #2c9a23;
      }

      .retail-access {
        background-color: #dcf3f0;
        color: #129e8f;
      }
    }

    .car-source {
      margin-right: 4px;
      padding: 1px 10px;
      border-radius: 3px;
      background-color: #38b361;
      color: #fff;
    }

    .car-title {
      color: #333;
      font-size: 16px;
      font-weight: bold;
      white-space: normal;
    }

    .car-info {
      margin-top: 6px;

      p,
      span {
        color: #333;
        font-size: 13px;
      }
    }
  }

  @include e(common) {
    height: 142px;
    text-align: left;

    p {
      color: #333;
      font-size: 13px;
    }

    strong {
      font-weight: bold;
    }
  }

  @include e(operate) {
    .car-button {
      display: block;
      margin-bottom: 8px;
      margin-left: 0;
    }
  }

  display: flex;
}

.el-form-item--mini.el-form-item {
  margin-bottom: 11px;
}
</style>
