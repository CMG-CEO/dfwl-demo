<template>
  <el-dialog
    :title="title"
    width="1000px"
    :visible.sync="showFlag"
    @open="open"
  >
    <el-form ref="form" :model="form" label-width="100px">
      <div v-for="(item, index) in formArray" :key="item.title + index">
        <h3>{{ item.title }}</h3>
        <div v-if="item.title.indexOf('商品') !== -1">
          <el-button type="default" size="mini" @click="openAddConnection"
            >+选择商品</el-button
          >
          <el-table class="table" height="250" border :data="form.linkSaleList">
            <el-table-column label="名称">
              <template slot-scope="scope">
                <div class="image-wrap">
                  <el-image
                    class="image-content"
                    :src="scope.row.coverUrl"
                    :preview-src-list="[scope.row.coverUrl]"
                  ></el-image>
                  <div class="image-info">
                    <div>名称：{{ scope.row.goodsName }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="类型" width="200" >
              <template slot-scope="scope">
                {{ listTitle(scope.row.goodsType) }}</template
              >
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" @click="delConnection(scope)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-form-item
          :label="item2.label"
          :prop="item2.prop"
          v-for="(item2, index2) in item.content"
          :key="item2.label + index2"
        >
          <el-input
            v-model="form[item2.prop]"
            :placeholder="`请输入${item2.label}`"
            v-if="item2.type == 'text' || item2.type == 'textarea'"
            :type="item2.type"
            :disabled="item2.label == '订单号'"
          ></el-input>

          <el-radio-group
            v-model="form[item2.prop]"
            v-else-if="item2.type == 'radio'"
          >
            <el-radio :label="1">微信支付</el-radio>
            <el-radio :label="2">支付宝支付</el-radio>
          </el-radio-group>
          <el-date-picker
            v-else-if="item2.type == 'date'"
            v-model="form[item2.prop]"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </div>
    </el-form>
    <section>
      <AddConnection
        ref="AddConnection"
        :type="type"
        @getConnection="getConnection"
        :linkSaleList="form.linkSaleList"
      ></AddConnection>
    </section>
    <div class="buttonArray" v-if="!view">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="paySubmit" v-if="!isCreate"
        >确定支付</el-button
      >
      <el-button type="primary" @click="cancel" v-if="!isCreate"
        >取消订单</el-button
      >
      <el-button type="primary" @click="back">返回</el-button>
    </div>
  </el-dialog>
</template>
<script>
import AddConnection from "@/views/commodityManage/bigColumnManage/dialog/AddConnection";
import { addOrder, saveOrder } from "@/api/order";
export default {
  components: {
    AddConnection
  },
  props: {
    view: { type: Boolean },
    editForm: {},
    isCreate: {
      // 类型: true 新建 false 编辑
      type: Boolean,
      required: true
    },
    type: {
      // 该组件是从哪个页面调用的，值为 CommodityManageType 枚举中的一个
      type: String,
      required: true
    }
  },
  watch: {
    editForm(newVal, oldVal) {
      this.form = newVal;
      this.form.payType = parseInt(this.form.payType);
      this.form.linkSaleList = this.form.gsmGoodsList;
    },
    showFlag(newVal, oldVal) {
      if (newVal == false) {
        this.$emit("update:view", false);
      }
    }
  },
  data() {
    return {
      showFlag: false,
      form: {},
      linkSaleList: [],
      formArray: [
        {
          title: "订单信息",
          content: [
            { label: "订单号", prop: "orderNo", type: "text" },
            { label: "订单日期", prop: "orderTime", type: "date" },
            { label: "订单金额", prop: "amount", type: "text" },
            { label: "备注信息", prop: "remark", type: "textarea" }
          ]
        },
        {
          title: "商品信息"
        },
        {
          title: "收货人信息",
          content: [
            { label: "收货人姓名", prop: "receiverName", type: "text" },
            { label: "手机号码", prop: "receiverMobile", type: "text" },
            { label: "微信号", prop: "receiverWechat", type: "text" },
            { label: "收货地址", prop: "receiverAddress", type: "textarea" }
          ]
        },
        {
          title: "物流信息",
          content: [
            { label: "物流公司", prop: "logisticsCompany", type: "text" },
            { label: "物流单号", prop: "logisticsNo", type: "date" }
          ]
        },
        {
          title: "支付信息",
          content: [
            { label: "支付方式", prop: "payType", type: "radio" },
            { label: "交易单号", prop: "payBillNo", type: "text" },
            { label: "商户单号", prop: "merchantBillNo", type: "text" },
            { label: "交易金额", prop: "payAmount", type: "text" }
          ]
        }
      ]
    };
  },
  computed: {
    title() {
      return this.isCreate ? "新建" : this.view ? "查看" : "编辑";
    }
  },
  methods: {
    listTitle(val) {
      switch (val) {
        case "01":
          return "视频";
        case "02":
          return "课程";
        case "03":
          return "会员卡";
        case "04":
          return "专栏";
        case "05":
          return "大专栏";
        default:
          return "";
      }
    },
    back() {
      this.showFlag = false;
    },
    async save() {
      if (this.isCreate) {
        await addOrder({ ...this.form });
        this.$message.success("新增销售订单成功");
      } else {
        await saveOrder({ ...this.form });
        this.$message.success("编辑销售订单成功");
      }
      this.showFlag = false;
      this.$emit("reload");
    },
    openAddConnection() {
      this.$refs.AddConnection.showFlag = true;
    },
    delConnection(scope) {
      console.log(scope);
      const { $index } = scope;
      this.form.linkSaleList.splice($index, 1);
      this.form.goodsId = "";
      //   this.form.linkSaleIds.forEach((item, index2) => {
      //     if (item == scope.row.goodsId) {
      //       this.form.linkSaleIds.splice(index2, 1);
      //     }
      //   });
    },
    getConnection(items) {
      //   const { linkSaleList } = this.form;
      //   this.linkSaleList = items;
      this.form.goodsId = items[0].goodsId;
      //   this.linkSaleIds = [];
      // this.linkSaleList = linkSaleList;
      //   items.forEach(item => this.linkSaleIds.push(item.goodsId));

      this.form = {
        ...this.form,
        linkSaleList: items

        //   linkSaleIds: this.linkSaleIds
      };
    },
    cancel() {
      this.$emit("methods", { name: "取消", data: this.form });
    },
    paySubmit() {
      this.$emit("methods", { name: "支付确认", data: this.form });
    },
    async open() {
      this.form = {};
      this.$refs.form && this.$refs.form.resetFields();
      this.$refs.selectMaterial && (this.$refs.selectMaterial.form = {});
      if (this.editForm && !this.isCreate) {
        this.form = this.editForm;
      }
      //   this.commodityGroup = await getGoodsGroupListOption();

      //   if (!this.isCreate) {
      //     // 根据类型获取对应详情
      //     const { goodsId } = this.currentSelect;
      //     switch (this.type) {
      //       case CommodityManageType.COMMODITY_MANAGE:
      //         this.form = (await getGoods({ goodsId })).data;
      //         break;
      //       case CommodityManageType.COLUMN_Manage:
      //         this.form = (await getSmallColumn({ goodsId })).data;
      //         break;
      //       case CommodityManageType.VIDEO_MANAGE:
      //         this.form = (await getGoodsVideo({ goodsId })).data;
      //         break;
      //       case CommodityManageType.VIP_MANAGE:
      //         this.form = (await getVipmange({ goodsId })).data;
      //         break;
      //     }
      //   }
    }
  }
};
</script>
<style scoped lang="scss">
@import "orderCommon";
.buttonArray {
  @include displayFlex(row, center, center);
}
.el-input,
.el-select {
  width: 300px;
}
.el-textarea {
  width: 55%;
}
</style>
