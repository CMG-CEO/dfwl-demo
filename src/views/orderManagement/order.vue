<template>
  <div>
    <queryModule
      :formArray="formArray"
      @moduleQuery="moduleQuery"
      @clear="clear"
    ></queryModule>
    <section class="panel">
      <div>
        <el-button style="display:none" type="primary" @click="create">新增</el-button>

        <tableCommon
          :tableColumn="tableColumn"
          @methods="methods"
          :tableData="tableData"
        ></tableCommon>
      </div>
      <Pagination
        :page-no="page.pageNo"
        :page-size="page.pageSize"
        :total-count="page.totalCount"
        @currentChange="currentPageChange"
        @sizeChange="currentSizeChange"
      />
      <Edit
        ref="Edit"
        :isCreate="isCreate"
        :type="CommodityManageType.ORDER_Manage"
        @reload="getList()"
        :view.sync="view"
        @methods="methods"
        :editForm="editForm"
      ></Edit>
      <Address
        ref="Address"
        :addressFormArray="addressFormArray"
        @addressSave="addressSave"
      ></Address>
      <RefundDetails
        @refuseSubmit="refuseSubmit"
        ref="RefundDetails"
        :currentItem="currentItem"
      ></RefundDetails>
    </section>
      <el-dialog
    width="500px"
    :visible.sync="goodShowFlag"
  >
    <el-form ref="form" label-width="100px">
      <el-form-item label="物流公司">
        <el-input
          v-model="goodsName"
          placeholder="请输入名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="物流单号">
        <el-input
          v-model="goodsName"
          placeholder="请输入名称"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" size="small" @click="goodSubmit">确认发货</el-button>
      <el-button type="default" size="small" @click="goodShowFlag = false"
        >取消</el-button
      >
    </span>
  </el-dialog>
  </div>
</template>
<script>
import queryModule from "./orderCommon/queryModule";
import tableCommon from "./orderCommon/tableCommon";

import PaginationMixin from "@/mixin/pagination";
import RefundDetails from "./orderCommon/refundDetails";
import Edit from "./orderCommon/Edit";
import { CommodityManageType } from "@/util/constant";
import {
  getOrderList,
  addressSave,
  cancelOrder,
  refuseSubmit,
  closeOrder,
  editOrder,
  paySubmit
} from "@/api/order";
import { requestList } from "@/util";
import { formatShelfStatus, formatTableTime } from "@/util/format";
import Address from "./orderCommon/address.vue";

export default {
  components: {
    queryModule,
    tableCommon,
    Edit,
    RefundDetails,

    Address
  },
  mixins: [PaginationMixin],
  mounted() {},
  created() {
    this.getList();
  },

  methods: {
    counterDefinition() {
      let a = { ...this.currentItem };
      a.payStatus = this.payChangeStatus(a.payStatus);
      a.orderStatus = this.orderChangeStatus(a.orderStatus);
      a.logisticsStatus = this.logisticsStatusChangeStatus(a.logisticsStatus);
      a.orderType = this.orderResourceChangeStatus(a.orderType);
      a.orderSource = this.resourceTypeChange(a.orderSource);
      return a;
    },
    //关闭订单
    async close() {
      let b = this.counterDefinition();
      await closeOrder({ ...b });

      this.$message.success("关闭订单成功");
      this.getList();
    },
    //取消订单
    async cancelOrder() {
      let b = this.isCreate ? this.counterDefinition() : this.currentItem;
      // 待付款...值改为数值
      b.payStatus = this.payChangeStatus(b.payStatus)
      b.orderType = this.orderResourceChangeStatus(b.orderType)
      b.orderStatus = this.orderChangeStatus(b.orderStatus)
      await cancelOrder({ ...b });
      this.$refs.Edit.showFlag = false;
      this.$message.success("取消订单成功");

      this.getList();
    },
    //支付确认
    async paySubmit() {
      let b = this.currentItem;
      await paySubmit({ ...b });
      this.$refs.Edit.showFlag = false;
      this.$message.success("支付确认成功");

      this.getList();
    },
    //退款
    refund() {
      this.$refs.RefundDetails.showFlag = true;
    },
    //退款提交
    async refuseSubmit(formData) {
      let b = this.counterDefinition();
      let { orderNo, orderId } = b;
      await refuseSubmit({
        orderRefundNo: orderNo,
        orderId: orderId,
        ...formData
      });
      this.$message.success("退款提交成功");
      this.getList();
    },
    //编辑地址
    async addressSave(addressForm) {
      const {
        receiverAddress,
        receiverMobile,
        receiverName,
        receiver_wechat
      } = addressForm;

      let b = this.counterDefinition();
      await addressSave({
        receiverAddress,
        receiverMobile,
        receiverName,
        receiver_wechat,
        ...b
      });
      this.$message.success("地址保存成功");
      this.getList();
    },
    clear() {
      this.resetSearch();
    },
    moduleQuery(ruleForm) {
      this.searchData = ruleForm;
      this.search();
    },
    payChangeStatus(type) {
      switch (type) {
        case "1":
        case "未支付":
          return type == 1 ? "未支付" : "1";
          break;
        case "2":
        case "已支付":
          return type == 2 ? "已支付" : "2";
          break;
        case "3":
        case "全额退款":
          return type == 3 ? "全额退款" : "3";
          break;
        case "4":
        case "部分退款":
          return type == 4 ? "部分退款" : "4";
          break;
      }
    },
    orderResourceChangeStatus(type) {
      switch (type) {
        case "1":
        case "普通订单":
          return type == 1 ? "普通订单" : "1";
          break;
        case "2":
        case "免费":
          return type == 2 ? "免费" : "2";
          break;
        case "3":
        case "密码领取":
          return type == 3 ? "密码领取" : "3";
          break;
        case "4":
        case "限时折扣":
          return type == 4 ? "限时折扣" : "4";
          break;
        case "5":
        case "兑换码":
          return type == 5 ? "兑换码" : "5";
          break;
        case "6":
        case "拼团":
          return type == 6 ? "拼团" : "6";
          break;
      }
    },
    orderChangeStatus(type) {
      switch (type) {
        case "1":
        case "待付款":
          return type == 1 ? "待付款" : "1";
          break;
        case "2":
        case "交易成功":
          return type == 2 ? "交易成功" : "2";
          break;
        case "3":
        case "交易关闭":
          return type == 3 ? "交易关闭" : "3";
          break;
      }
    },
    logisticsStatusChangeStatus(type) {
      switch (type) {
        case "1":
        case "待发货":
          return type == 1 ? "待发货" : "1";
          break;
        case "2":
        case "已发货":
          return type == 2 ? "已发货" : "2";
          break;
      }
    },
    resourceTypeChange(type) {
      switch (type) {
        case "1":
        case "App学员端":
          return type == 1 ? "App学员端" : "1";
          break;
        case "2":
        case "公社网站":
          return type == 2 ? "公社网站" : "2";
          break;
        case "3":
        case "H5网站":
          return type == 3 ? "H5网站" : "3";
          break;
        case "4":
        case "后台录入":
          return type == 4 ? "后台录入" : "4";
          break;
      }
    },
    async getList(params = this.searchData) {
      const data = await requestList(getOrderList, params, this.page);
      const actions = new Map([
        ["payStatus", "payChangeStatus"],
        ["orderStatus", "orderChangeStatus"],
        ["logisticsStatus", "logisticsStatusChangeStatus"],
        ["orderSource", "orderResourceChangeStatus"]
      ]);
      //   this.tableDataOriginal = [...data.content];
      this.tableData = data.content.map(item => {
        item.shelfStatusName = formatShelfStatus(item.shelfStatus);
        // ["payStatus", "orderStatus", "logisticsStatus", "orderSource"].forEach(
        //   item2 => {
        //     let action = actions.get(item[item2]);
        //     console.log(action);
        //   }
        // );
        item.payStatus = this.payChangeStatus(item.payStatus);
        item.orderStatus = this.orderChangeStatus(item.orderStatus);
        item.logisticsStatus = this.logisticsStatusChangeStatus(
          item.logisticsStatus
        );
        item.orderType = this.orderResourceChangeStatus(item.orderType);
        item.orderSource = this.resourceTypeChange(item.orderSource);
        item.orderTime = item.orderTime
          ? formatTableTime(item.orderTime)
          : formatTableTime(item.createTime);
        return item;
      });
      this.page = data.page;
    },
    create() {
      this.isCreate = true;
      this.$refs.Edit.showFlag = true;
    },
    openAddress() {
      this.$refs.Address.showFlag = true;
    },
    //编辑订单
    async edit() {
      let { orderId } = this.currentItem;
      this.isCreate = false;
      this.$refs.Edit.showFlag = true;
      let data = await editOrder({
        orderId
      });
      this.editForm = data.data;
    },
    // 发货
    deliverGoods() {
      console.log('dianjifahuole')
      this.goodShowFlag = true
    },
    // 确认发货
    goodSubmit() {
      console.log('querenfah')
      this.goodShowFlag = false
    },
    methods(val) {
      this.currentItem = val.data;
      switch (val.name) {
        case "编辑":
          this.view = false;
          this.edit();
          break;
        case "查看":
          this.view = true;
          this.edit();
          break;
        case "地址":
          this.openAddress();
          break;
        case "取消":
          this.cancelOrder();
          break;
        case "退款":
          this.refund();
          break;
        case "关闭":
          this.close();
          break;
        case "支付确认":
          this.paySubmit();
          break;
        case "发货":
          this.deliverGoods();
          break;
      }
    }
  },
  data() {
    return {
      //   tableDataOriginal: [], //原列表数据
      currentItem: {},
      isCreate: false,
      editForm: {},
      CommodityManageType,
      tableData: [],
      view: false,
      goodShowFlag: false,
      addressFormArray: [
        { label: "收货人姓名", prop: "receiverName", type: "text" },
        { label: "手机号码", prop: "receiverMobile", type: "text" },
        { label: "微信号", prop: "receiver_wechat", type: "text" },
        { label: "收货地址", prop: "receiverAddress", type: "textarea" }
      ],
      //   successfulTransactioncontent: [{ name: "退款" }],
      //   successfulTransactioncontent: [{ name: "地址" }],
      formArray: [
        { label: "订单号", prop: "orderNo", type: "input" },
        {
          label: "支付状态",
          prop: "payStatus",
          type: "select",
          content: [
            { value: 1, label: "未支付" },
            { value: 2, label: "已支付" },
            { value: 3, label: "全额退款" },
            { value: 4, label: "部分退款" }
          ]
        },
        {
          label: "订单状态",
          prop: "orderStatus",
          type: "select",
          content: [
            { value: 1, label: "待付款" },
            { value: 2, label: "交易成功" },
            { value: 3, label: "交易关闭" }
          ]
        },
        {
          label: "订单来源",
          prop: "orderSource",
          type: "select",
          content: [
            { value: 1, label: "APP学员端" },
            { value: 2, label: "公社网站" },
            { value: 3, label: "H5网站" },
            { value: 4, label: "后台录入" }
          ]
        },
        // { label: "客户账号", prop: "ddh", type: "input" },
        { label: "手机号码", prop: "receiverMobile", type: "input" },
        {
          label: "物流状态",
          prop: "logisticsStatus",
          type: "select",
          content: [
            { value: 1, label: "待发货" },
            { value: 2, label: "已发货" }
          ]
        },
        {
          label: "订单类型",
          prop: "orderType",
          type: "select",
          content: [
            { value: 1, label: "普通订单" },
            { value: 2, label: "免费" },
            { value: 3, label: "密码领取" },
            { value: 4, label: "限时折扣" },
            { value: 5, label: "兑换码" },
            { value: 6, label: "拼团" }
          ]
        }
      ],
      tableColumn: [
        { label: "订单号", prop: "orderNo", width: 200 },
        { label: "订单来源", prop: "orderSource" },
        { label: "订单日期", prop: "orderTime", width: 200 },
        { label: "订单类型", prop: "orderType" },

        // { label: "商品名称", prop: "ddh" },
        { label: "支付金额", prop: "payAmount" },
        // { label: "客户账号", prop: "ddh" },
        { label: "手机号码", prop: "receiverMobile" },
        { label: "支付状态", prop: "payStatus" },
        { label: "订单状态", prop: "orderStatus" },
        { label: "物流状态", prop: "logisticsStatus" }
        // { label: "备注", prop: "ddh" },
        // { label: "收货地址", prop: "ddh" },
        // {
        //   label: "操作",
        //   prop: "ddh",
        //   content: [{ name: "编辑" }, { name: "查看" }, { name: "删除" }]
        // }
      ]
    };
  }
};
</script>
