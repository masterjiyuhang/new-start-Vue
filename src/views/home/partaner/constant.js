import { dateFormat } from "@rrc/utils";

function getTagName(code) {
  let name = "";
  switch (code) {
    case "零售准入":
      name = "retail-access";
      break;
    case "零售品控2.0":
      name = "retail-quality-control";
      break;
    default:
      name = "other-tag";
  }
  return name;
}

export const COLUMNS = function () {
  const self = this;
  return [
    {
      type: "index",
      width: "30",
    },
    {
      label: "基本信息",
      prop: "base_info",
      width: "440px",
      render(h, scope) {
        const data = scope.row.base_info;
        const statusInfo = scope.row.status_info;
        let style;
        let sourceLabel;
        if (data.source) {
          switch (
            data.source // @owner自建 @dispatch:派单
          ) {
            case "owner":
              sourceLabel = "自建";
              style = {
                "background-color": "#0091ff",
              };
              break;
            case "dispatch":
              sourceLabel = "派单";
              style = {
                "background-color": "#ff6b23",
              };
              break;
            default:
              break;
          }
        }
        return (
          <div class="rc-panel__baseinfo">
            <div class="left">
              <img
                src={
                  data.search_image
                    ? data.search_image
                    : require("@/assets/img/default.png")
                }
                class="car-img"
              />
              {data.audit_status === "AUDITING" ? (
                <div class="audit">
                  <span>审核中</span>
                </div>
              ) : (
                ""
              )}
              {data.audit_status === "RETURNED" ? (
                <div class="audit">
                  <span>审核未通过</span>
                </div>
              ) : (
                ""
              )}
              {data.tag_list && data.tag_list.length > 0 ? (
                <div class="car-tags">
                  {data.tag_list.map((item) => {
                    return <span class={getTagName(item)}>{item}</span>;
                  })}
                </div>
              ) : null}
            </div>
            <div>
              <div>
                {data.source ? (
                  <span class="car-source" style={style}>
                    {sourceLabel}
                  </span>
                ) : null}
                {data.well_chosen ? <span class="car-source">闪卖</span> : null}
                {data.main_url ? (
                  <a href={data.main_url} class="car-title" target="_blank">
                    {data.title}
                  </a>
                ) : (
                  <span class="car-title">{data.title}</span>
                )}
              </div>
              <div class="car-info">
                <p>车车号：{data.dt_id}</p>
                {data.rrc_id ? <p>车源编号：{data.rrc_id}</p> : null}
                <p>
                  创建时间：
                  {data.create_time
                    ? dateFormat(data.create_time, "yyyy-MM-dd hh:mm")
                    : null}
                </p>
                <p>
                  <span>归属评估师：{data.inspector_name}</span>
                  <rc-divider type="vertical" />
                  {statusInfo.show_status_code === "PUT_ON" ? (
                    <span>绑定销售：{data.sale_name}</span>
                  ) : null}
                </p>
                <p>城市：{data.city}</p>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      label: "配置参数",
      prop: "configuration_info",
      render(h, scope) {
        const data = scope.row.configuration_info;
        return (
          <div class="rc-panel__common">
            <p>
              排量：<strong>{data.displacement}</strong>
            </p>
            <p>
              上牌地：<strong>{data.licensed_city}</strong>
            </p>
            <p>
              表显里程：<strong>{data.mileage}万公里</strong>
            </p>
            <p>
              过户次数：<strong>{data.transfer_times}次</strong>
            </p>
            <p>
              上牌时间：
              <strong>
                {data.register_date
                  ? dateFormat(data.register_date, "yyyy-MM")
                  : null}
                上牌
              </strong>
            </p>
          </div>
        );
      },
    },
    {
      label: "状态信息",
      prop: "status_info",
      render(h, scope) {
        const data = scope.row.status_info;
        return (
          <div class="rc-panel__common">
            <p>
              交易状态：<strong>{data.transaction_status}</strong>
            </p>
            <p>
              展示状态：<strong>{data.show_status}</strong>
            </p>
          </div>
        );
      },
    },
    {
      label: "其他信息",
      prop: "other_info",
      render(h, scope) {
        const data = scope.row.other_info;
        const baseInfo = scope.row.base_info;
        const statusInfo = scope.row.status_info;
        return (
          <div class="rc-panel__common">
            {!(
              statusInfo.show_status_code === "NOT_ON" &&
              baseInfo.source === "owner"
            ) ? (
              <p>
                标价：<strong>{data.rrc_price}万元</strong>
              </p>
            ) : null}
            {baseInfo.source === "owner" ? (
              <p>
                展厅标价：<strong>{data.show_price}万元</strong>
              </p>
            ) : null}
            {data.first_publish_time ? (
              <p>
                上架时间：
                <strong>
                  {dateFormat(data.first_publish_time, "yyyy-MM-dd hh:mm")}
                </strong>
              </p>
            ) : null}
            {statusInfo.show_status_code !== "NOT_ON" ? (
              <p>
                带看订单量：<strong>{data.order_num}</strong>
              </p>
            ) : null}
          </div>
        );
      },
    },
    {
      label: "操作",
      width: "120px",
      render(h, scope, methods) {
        const {
          publish_status: publishStatus,
          source: sourceType,
          publish_online_auction_status: isOnlineAuction,
          recheck_status: recheckStatus,
          sign_id: id,
        } = scope.row.base_info;
        const { transaction_status: transactionState } = scope.row.status_info;
        const {
          can_modify_wholesale_price: canModifyWholesalePrice,
          reserve_price: reservePrice,
        } = scope.row.other_info;
        let priceLabel,
          reallocate,
          changePrice,
          onlineAuction,
          inputWholesalePrice,
          reviewRep;
        const isOwnerAndCanSale =
          sourceType === "owner" && transactionState !== "放弃销售"; // 是否属于自有车源 并且状态不能为放弃销售
        const haveReservePrice = reservePrice === null; // null 说明没有保留价，还未上架收车帮，展示「上架收车帮」按钮
        const details = (
          <el-button
            on-click={methods.openDetails.bind(self, scope)}
            type="text"
            size="small"
            class="car-button"
          >
            车辆详情
          </el-button>
        );
        const pricing = (
          <el-button
            on-click={methods.pricingDialog.bind(self, scope)}
            type="text"
            size="small"
            class="car-button"
          >
            定价工具
          </el-button>
        );
        if (recheckStatus) {
          reviewRep = (
            <el-button
              on-click={methods.reviewDialog.bind(self, id)}
              type="text"
              size="small"
              class="car-button"
            >
              复检报告
            </el-button>
          );
        }
        // 改价、价签和改派是状态为在架，补充信息条件为tag=36（会给前端返回是否是自建的标记）
        if (
          self.checkPermissions(
            "PartnerSystem_CarManagement_CarList_PriceChange",
          ) &&
          ((publishStatus && sourceType !== "owner") || isOwnerAndCanSale)
        ) {
          changePrice = (
            <el-button
              on-click={methods.changePriceDialog.bind(self, scope)}
              type="text"
              size="small"
              class="car-button"
            >
              改价
            </el-button>
          );
        }
        if (publishStatus && (sourceType !== "owner" || isOwnerAndCanSale)) {
          if (
            self.checkPermissions(
              "PartnerSystem_CarManagement_CarList_PriceTag",
            )
          ) {
            priceLabel = (
              <el-button
                on-click={methods.priceLabelDialog.bind(self, scope)}
                type="text"
                size="small"
                class="car-button"
              >
                价签
              </el-button>
            );
          }
          if (
            self.checkPermissions(
              "PartnerSystem_CarManagement_CarList_CarReallocate",
            )
          ) {
            reallocate = (
              <el-button
                on-click={methods.reallocateDialog.bind(self, scope)}
                type="text"
                size="small"
                class="car-button"
              >
                改派销售
              </el-button>
            );
          }
          // if (self.checkPermissions('PartnerSystem_CarManagement_ExtraInformantion_maintain')) {
          //   addInfo = <el-button on-click={methods.addInfoDialog.bind(self, scope)} type="text" size="small" class="car-button">补充信息</el-button>
          // }
        }
        if (
          canModifyWholesalePrice &&
          self.checkPermissions(
            "PartnerSystem_CarManagement_CarDetails_ToBWholesaleprice",
          )
        ) {
          inputWholesalePrice = (
            <el-button
              on-click={methods.inputWholesalePrice.bind(self, scope)}
              type="text"
              size="small"
              class="car-button"
            >
              录入B端价
            </el-button>
          );
        }
        // TODO: 展示【上架在线拍】按钮 ，这块还需要处理用户角色，以及是否有按钮权限吗？？ 内部叫 在线拍，外部叫收车帮
        console.log(
          "!!!!",
          self.checkPermissions(
            "PartnerSystem_CarManagement_CarList_PublishOnlineAuction",
          ),
          isOnlineAuction,
        );
        if (
          self.checkPermissions(
            "PartnerSystem_CarManagement_CarList_PublishOnlineAuction",
          ) &&
          isOnlineAuction
        ) {
          onlineAuction = (
            <el-button
              on-click={methods.onlineAuctionDialog.bind(self, scope)}
              type="text"
              size="small"
              class="car-button"
            >
              上架收车帮
            </el-button>
          );
        } else if (
          self.checkPermissions(
            "PartnerSystem_CarManagement_CarList_PublishOnlineAuction",
          ) &&
          !isOnlineAuction &&
          !haveReservePrice
        ) {
          onlineAuction = (
            <el-button
              on-click={methods.onlineAuctionDialog.bind(self, scope)}
              type="text"
              size="small"
              class="car-button"
            >
              修改保留价
            </el-button>
          );
        }
        return (
          <div class="rc-panel__operate">
            {details}
            {priceLabel}
            {reallocate}
            {changePrice}
            {pricing}
            {reviewRep}
            {onlineAuction}
            {inputWholesalePrice}
          </div>
        );
      },
      methods: {
        openDetails(scope) {
          const {
            car_id: carId,
            rrc_id: rrcId,
            source,
            transfer_rrc: transferRrc,
          } = scope.row.base_info;
          self.$router.push({
            name: "carDetailsNew",
            params: { rrcId: rrcId || "null", carId, source, transferRrc },
          });
        },
        priceLabelDialog(scope) {
          this.priceVisible = true;
          this.carId = scope.row.base_info.car_id;
        },
        reallocateDialog(scope) {
          this.reallocateVisible = true;
          this.reallocateBaseInfo = scope.row.base_info;
        },
        changePriceDialog(scope) {
          this.row = scope.row;
          if (this.row.other_info.can_modify_rrcprice) {
            // 该字段表示是走NBNC改价流程还是普通流程
            this.getCanChangeRrcPrice(scope.row.base_info.car_id);
          } else {
            this.changePriceVisible = true;
          }
        },
        inputWholesalePrice(scope) {
          // 录入B端价格
          this.row = scope.row;
          this.changeWholesalePriceVisible = true;
        },
        addInfoDialog(scope) {
          this.addInfoVisible = true;
          this.carId = scope.row.base_info.car_id;
        },
        pricingDialog(scope) {
          this.pricingDialogMethods(scope.row);
        },
        reviewDialog(id) {
          this.reviewDialogMethods(id);
        },
        onlineAuctionDialog(scope) {
          this.onlineAuctionVisible = true;
          this.row = scope.row;
        },
      },
    },
  ];
};

export const OPERATECOLUMNS = [
  {
    label: "时间",
    prop: "create_time",
    width: "150px",
  },
  {
    label: "事件",
    prop: "event",
    width: "150px",
  },
  {
    label: "操作人",
    prop: "operator",
    width: "100px",
  },
  {
    label: "备注",
    prop: "remark",
    "show-overflow-tooltip": true,
  },
];

export const RECORDCOLUMNS = [
  {
    label: "时间",
    prop: "create_time",
    width: "150px",
  },
  {
    label: "操作人",
    prop: "operator_name",
    width: "100px",
  },
  {
    label: "操作",
    prop: "operator",
    width: "100px",
  },
  {
    label: "备注",
    prop: "remark",
    "show-overflow-tooltip": true,
  },
];

export const ORDERCOLUMNS = function () {
  const self = this;
  return [
    {
      label: "订单编号",
      prop: "order_id",
      width: "150px",
      render(h, scope) {
        const { order_id: id } = scope.row;
        return (
          <el-button
            type="text"
            size="mini"
            nativeOnClick={() => {
              self.$router.push({
                name: "orderDetails",
                params: { orderId: id },
              });
            }}
          >
            {id}
          </el-button>
        );
      },
    },
    {
      label: "客户",
      prop: "buyer_name",
      width: "100px",
    },
    {
      label: "带看时间",
      prop: "appointment_time",
      width: "150px",
      render(h, scope) {
        return (
          <div>
            {dateFormat(scope.row.appointment_time, "yyyy-MM-dd hh:mm:ss")}
          </div>
        );
      },
    },
    {
      label: "带看地点",
      prop: "appointment_address",
      "show-overflow-tooltip": true,
    },
    {
      label: "销售",
      prop: "sale_name",
      width: "100px",
    },
    {
      label: "状态",
      prop: "status_desc",
      width: "120px",
    },
    {
      label: "备注",
      prop: "remark",
      "show-overflow-tooltip": true,
    },
  ];
};

export const PRICECHANGECOLUMNS = function (type) {
  const self = this;
  const common = [
    {
      label: "改价类型",
      prop: "type",
      width: "120px",
    },
    {
      label: "改价人",
      prop: "operator",
      width: "100px",
    },
    {
      label: "原展示价格（万）",
      prop: "old_price",
      width: "120px",
    },
    {
      label: "调整展示售价（万）",
      prop: "new_price",
      width: "130px",
    },
  ];
  const remark = {
    label: "改价原因",
    prop: "remark",
    "show-overflow-tooltip": true,
  };
  const operatorTime = {
    label: "修改时间",
    prop: "operator_time",
    width: "150px",
    formatter(row, column, cellValue) {
      return cellValue && dateFormat(cellValue, "yyyy-MM-dd hh:mm:ss");
    },
  };
  if (type === "owner_leader") {
    const applyTime = {
      label: "申请时间",
      prop: "apply_time",
      width: "150px",
      formatter(row, column, cellValue) {
        return cellValue ? dateFormat(cellValue, "yyyy-MM-dd hh:mm:ss") : "/";
      },
    };
    const ownerLeader = [
      {
        label: "审核状态",
        prop: "audit_status",
        width: "100px",
        render(h, scope, methods) {
          return (
            <div
              style="color: #2384e8;cursor: pointer;"
              on-click={methods.lookApprovalProcess.bind(self, scope)}
            >
              {scope.row.audit_status || "/"}
            </div>
          );
        },
        methods: {
          lookApprovalProcess(scope) {
            this.approvalProcess = scope.row.detail || [];
            if (this.approvalProcess && this.approvalProcess.length) {
              this.approvalProcessVisible = true;
            }
          },
        },
      },
    ];
    return common.concat(applyTime, remark, ownerLeader);
  }
  return common.concat(remark, operatorTime);
};

// 状态的映射
export const STATUSMAP = {
  total: "总车辆数",
  for_sale: "在售",
  in_sale: "待售",
  sold: "已售",
  close: "关闭",
  un_publish: "已上架",
  publish: "未上架",
  withdraw: "已下架",
};

// 时间选择器时间类型
export const TYPEOPTIONS = [
  {
    label: "创建时间",
    value: 1,
  },
  {
    label: "上架时间",
    value: 2,
  },
];

// 归属类型
export const AFFILIATION = [
  {
    label: "归属评估师",
    value: 1,
  },
  {
    label: "归属销售",
    value: 2,
  },
];

// 价格类型
export const PRICETYPE = [
  {
    label: "标价",
    value: 1,
  },
  {
    label: "展厅价",
    value: 2,
  },
];

// 车源类型
export const CARTYPE = [
  {
    label: "车源编号",
    value: 1,
  },
  {
    label: "车车号",
    value: 2,
  },
];

// 价格枚举
export const PRICEOPTIONS = [
  {
    label: "0-3万",
    value: "0-3",
  },
  {
    label: "3-5万",
    value: "3-5",
  },
  {
    label: "5-8万",
    value: "5-8",
  },
  {
    label: "8-10万",
    value: "8-10",
  },
  {
    label: "10-15万",
    value: "10-15",
  },
  {
    label: "15-20万",
    value: "15-20",
  },
  {
    label: "20-30万",
    value: "20-30",
  },
  {
    label: "30-60万",
    value: "30-60",
  },
  {
    label: "60万以上",
    value: "60-9999.99",
  },
  {
    label: "自定义",
    value: "-1",
  },
  {
    label: "不限",
    value: "-2",
  },
];

// 时间中的选择项
export const BUTTONS = () => [
  {
    label: "今天",
    value: "today",
    active: false,
  },
  {
    label: "近三日",
    value: "threeDays",
    active: false,
  },
  {
    label: "本周",
    value: "thisWeek",
    active: false,
  },
  {
    label: "本月",
    value: "thisMonth",
    active: false,
  },
  {
    label: "上月",
    value: "lastMonth",
    active: false,
  },
  {
    label: "三个月内",
    value: "threeMonths",
    active: true,
  },
];

export const CHANNELSMAP = {
  B端在线拍: "收车帮小程序",
  B端带看拍: "人人快卖app",
  主站: "官网",
};
