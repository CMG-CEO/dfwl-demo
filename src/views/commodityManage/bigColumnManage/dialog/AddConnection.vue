<!--
 * @Author: KokoTa
 * @Date: 2021-01-25 13:40:42
 * @LastEditTime: 2021-02-05 17:18:43
 * @LastEditors: KokoTa
 * @Description: 商品管理-通用关联组件，该组件包含三种列表：大专栏、专栏、会员卡
 * @FilePath: /future-bms/src/views/commodityManage/bigColumnManage/dialog/AddConnection.vue
-->

<template>
  <el-dialog
    :title="listTitle"
    :visible.sync="showFlag"
    @open="open"
    append-to-body
  >
    <!-- 表格区域 -->
    <section>
      <!-- 表格操作 -->
      <!-- 专栏页面关联大专栏和会员卡，其余页面关联专栏和会员卡 -->
      <div
        v-if="type === CommodityManageType.COLUMN_Manage"
        class="table-operation"
      >
        <el-radio-group v-model="listType">
          <el-radio :label="1">大专栏</el-radio>
          <el-radio :label="2">会员卡</el-radio>
        </el-radio-group>
      </div>
      <div
        v-else-if="type === CommodityManageType.ORDER_Manage"
        class="table-operation"
      >
        <el-radio-group v-model="listType">
          <el-radio :label="1">大专栏</el-radio>
          <el-radio :label="2">会员卡</el-radio>
          <el-radio :label="3">专栏</el-radio>
          <el-radio :label="4">商品</el-radio>
          <el-radio :label="5">视频</el-radio>
        </el-radio-group>
      </div>
      <div v-else class="table-operation">
        <el-radio-group v-model="listType">
          <el-radio :label="3">专栏</el-radio>
          <el-radio :label="2">会员卡</el-radio>
        </el-radio-group>
      </div>
      <div class="table-operation">
        <el-input
          class="w-180"
          v-model="searchData.goodsName"
          placeholder="请输入名称"
        ></el-input>
        <el-button type="primary" size="small" @click="search">搜索</el-button>
      </div>
      <!-- 表格 -->
      <el-table
        ref="table"
        class="table"
        height="400"
        :data="tableData"
        border
        @row-click="getCurrentSelect"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column
          prop="goodsName"
          :label="`${listTitle}名称`"
        ></el-table-column>
        <el-table-column
          prop="shelfStatusFormat"
          label="状态"
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination
        :page-no="page.pageNo"
        :page-size="page.pageSize"
        :total-count="page.totalCount"
        @currentChange="currentPageChange"
        @sizeChange="currentSizeChange"
      />
    </section>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import PaginationMixin from "@/mixin/pagination";
import { getListGoods } from "@/api/commodityManage";
import { formatShelfStatus } from "@/util/format";
import { requestList } from "@/util";
import { CommodityManageType } from "@/util/constant";

export default {
  mixins: [PaginationMixin],
  props: {
    currentItem: {
      // 选中的表格行的数据（这里不使用 currentSelect 命名是因为会和 mixin 的命名冲突）
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      required: true
    },
    linkSaleList: {
      type: Array
    }
  },
  data() {
    return {
      keyword: "",
      showFlag: false,
      tableData: [],
      selected: [],
      listType: 3,
      CommodityManageType
    };
  },
  watch: {
    listType() {
      this.getList();
      // this.$message.warning("注意：点击确定时只会保存当前类型的复选值");
    }
  },
  computed: {
    listTitle() {
      switch (this.listType) {
        case 1:
          return "大专栏";
        case 2:
          return "会员卡";
        case 3:
          return "专栏";
        case 4:
          return "商品";
        case 5:
          return "视频";
        default:
          return "";
      }
    }
  },

  methods: {
    selectChange(rows) {
      this.selected = rows;
    },
    submit() {
      console.log(this.type)
      if (this.type === CommodityManageType.ORDER_Manage) {
        if (this.selected.length > 1) {
          this.$message({
            message: "销售订单只能添加一条商品",
            type: "warning"
          });
        } else {
          this.$emit("getConnection", [...this.selected]);
          this.showFlag = false;
        }
      } else {
        this.$emit("getConnection", [...this.selected]);
        this.showFlag = false;
      }
    },

    async getList(params = this.searchData) {
      let goodsType = 0;
      switch (this.listType) {
        case 1:
          goodsType = "05"; // 大专栏
          break;
        case 2:
          goodsType = "03"; // 会员卡
          break;
        case 3:
          goodsType = "04"; // 专栏
          break;
        case 4:
          goodsType = "02"; // 商品
          break;
        case 5:
          goodsType = "01"; // 视频
          break;
      }
      const res = await requestList(
        getListGoods,
        { ...params, goodsType },
        this.page
      );
      this.tableData = res.content.map((item, index) => {
        item.shelfStatusFormat = formatShelfStatus(item.shelfStatus);

        return item;
      });
      if (this.linkSaleList) {
        this.linkSaleList.forEach(item2 => {
          this.tableData.forEach((item3, index3) => {
            if (item2.goodsNo == item3.goodsNo) {
              this.$nextTick(() => {
                // 注意：toggleRowSelection(item, true) 中 item 必须是行数据
                this.$refs.table.toggleRowSelection(item3, true);
              });
            }
          });
        });
      }
      this.page = res.page;
    },
    async open() {
      this.selected = [];
      this.$refs.table && this.$refs.table.clearSelection();
      // 专栏页面关联大专栏和会员卡，其余页面关联专栏和会员卡
      if (this.type === CommodityManageType.COLUMN_Manage) this.listType = 1;
      else this.listType = 3;
      this.getList();
    }
  }
};
</script>

<style></style>
