<template>
  <el-dialog width="1000px" :visible.sync="showFlag">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="退款金额" prop="refundAmount">
        <div class="refundAmount">
          <el-input
            v-model="form.refundAmount"
            :placeholder="`请输入退款金额`"
            type="number"
          ></el-input>
          <div class="money">
            <span>支付金额：</span>
            <span style="color:red">{{ currentItem.payAmount }}</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="退款原因" prop="refundReason">
        <el-input
          v-model="form.refundReason"
          :placeholder="`请输入退款原因`"
          type="textarea"
          :rows="2"
        ></el-input>
      </el-form-item>
      <el-form-item label="退款类型" prop="refundReasonType">
        <el-select v-model="form.refundReasonType" placeholder="请选择">
          <el-option
            v-for="item in refundReasonType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="buttonArray">
      <el-button type="primary" @click="submit">确定退款</el-button>

      <el-button type="primary" @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    currentItem: {
      type: Object
    }
  },
  data() {
    var valiData = (rule, value, callback) => {
      if (this.currentItem.payAmount < this.form.refundAmount) {
        callback(new Error("退款金额不能大于支付金额"));
      } else if(this.form.refundAmount <= 0) {
        callback(new Error("退款金额不能小于0"));
      } else {
        callback();
      }
    };
    return {
      showFlag: false,
      form: {},

      rules: {
        refundAmount: [
          { validator: valiData, trigger: "blur" },
          {
            required: true,
            message: "退款金额不能为空",
            trigger: "blur"
            // type: "number"
          }
        ],
        refundReasonType: [
          //   { validator: validatePass2, trigger: "blur" },
          { required: true, message: "退款类型不能为空", trigger: "blur" }
        ]
      },
      refundReasonType: [
        {
          value: "1",
          label: "转其他机构"
        },
        {
          value: "2",
          label: "对服务不满"
        },
        {
          value: "3",
          label: "退换商品"
        },
        {
          value: "4",
          label: "个人原因"
        }
      ]
    };
  },
  methods: {
    cancel() {
      this.showFlag = false;
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("refuseSubmit", this.form);
          this.showFlag = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      //   if (currentItem.payAmount < this.form.refundAmount) {
      //     this.$message({
      //       message: "退款金额不能大于支付金额",
      //       type: "warning"
      //     });
      //   } else {
      //     this.$emit("refuseSubmit", this.form);
      //     this.showFlag = false;
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
.refundAmount {
  @include displayFlex(row, flex-start, center);
  .money {
    margin-left: 10px;
  }
}
</style>
