<template>
  <div>
    <el-table :data="tableData" border style="width: 100%; margin-top: 20px">
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        v-for="(item, index) in tableColumn"
        :key="item.prop + index"
        align="center"
        :width="item.width ? item.width : ''"
      >
        <template slot-scope="scope">
          <div
            v-if="item.label == '题目'"
            style="
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              width: 200px;
            "
          >
            {{ scope.row.content }}
          </div>
          <div v-else>{{ scope.row[item.prop] }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope" class="buttonGroup">
          <div v-if="content">
            <span
              v-for="(item2, index2) in content"
              :key="item2.name + index2"
              @click="trigger(item2.name, scope.row)"
            >
              <el-button type="text">{{ item2.name }}</el-button>
            </span>
          </div>
          <div v-else>
            <span>
              <el-button type="text" @click="trigger('查看', scope.row)"
                >查看</el-button
              >
            </span>
            <span
              v-show="
                scope.row.orderStatus !== '待付款' &&
                scope.row.payStatus !== '未支付'
              "
            >
              <el-button type="text" @click="trigger('编辑', scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="trigger('取消', scope.row)"
                >取消</el-button
              >
            </span>
            <span>
              <el-button
                type="text"
                @click="trigger('退款', scope.row)"
                v-show="scope.row.payStatus == '已支付'"
                >退款</el-button
              >
            </span>
            <span>
              <el-button
                type="text"
                @click="trigger('关闭', scope.row)"
                v-show="scope.row.payStatus == '部分退款'"
                >关闭</el-button
              >
            </span>
            <span
              v-show="
                scope.row.logisticsStatus == '待发货' &&
                scope.row.orderStatus == '交易成功'
              "
            >
              <el-button type="text" @click="trigger('发货', scope.row)"
                >发货
              </el-button>
              <el-button type="text" @click="trigger('地址', scope.row)"
                >地址</el-button
              >
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["tableColumn", "tableData", "content"],
  methods: {
    trigger(name, data) {
      if (name == "取消" || name == "关闭") {
        this.$confirm(`确认${name}订单号${data.orderNo}的订单?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$emit("methods", { name, data });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      } else {
        this.$emit("methods", { name, data });
      }
    },
  },
  watch: {
    tableData(newValue, oldValue) {
      this.tableData = newValue;
    },
  },
  mounted() {},
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss">
@import "orderCommon";

.el-table .cell {
  display: flex !important;
}
span {
  padding: 5px;
}
</style>
