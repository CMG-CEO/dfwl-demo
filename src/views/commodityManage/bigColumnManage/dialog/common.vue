<!--
 * @Author: KokoTa
 * @Date: 2021-01-22 09:38:11
 * @LastEditTime: 2021-02-03 09:35:48
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/commodityManage/commodityManage/index.vue
-->

<template>
  <div class="wrap">
    <!-- 搜索区域 -->
    <section class="panel">
      <el-form ref="form" :model="searchData" :inline="true">
        <el-form-item :label="`${title}名称`">
          <el-input
            v-model="searchData.goodsName"
            placeholder="输入商品名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="searchData.shelfStatus"
            placeholder="选择状态"
            clearable
            filterable
          >
            <el-option
              v-for="item in shelfStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
    <!-- 表格区域 -->
    <section class="panel">
      <!-- 表格操作 -->
      <div class="table-operation">
        <el-button type="primary" size="small" @click="create">新增</el-button>
      </div>
      <!-- 表格 -->
      <el-table
        class="table"
        :data="tableData"
        border
        @row-click="getCurrentSelect"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column
          v-for="(item, index) in colomnData"
          :key="index"
          :label="item.label"
          :prop="iem.prop"
        >
          <template slot-scope="scope" v-if="item.label.search("名称") != -1">
            <div class="image-wrap">
              <el-image
                class="image-content"
                :src="scope.row.coverUrl"
                :preview-src-list="[scope.row.coverUrl]"
              ></el-image>
              <div class="image-info">
                <div>{{ scope.row.goodsName }}</div>
                <div class="text-red">¥{{ scope.row.price }}</div>
              </div>
            </div>
         
        </el-table-column>

       
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
    <!-- 新建或编辑 -->
    <Edit
      ref="Edit"
      :isCreate="isCreate"
      :currentSelect="currentSelect"
      :type="CommodityManageType.COMMODITY_MANAGE"
      @reload="getList()"
    ></Edit>
    <!-- 课程表 -->
    <TimeTable ref="TimeTable" :currentItem="currentSelect"></TimeTable>
  </div>
</template>

<script>
import PaginationMixin from "@/mixin/pagination";
import { shelfStatusList } from "@/util/option";
import Edit from "@/views/commodityManage/bigColumnManage/dialog/Edit";
import { CommodityManageType } from "@/util/constant";
import { requestList } from "@/util";
import { formatShelfStatus, formatTableTime } from "@/util/format";
import {
  changeGoodsStatus,
  delGoods,
  getGoodsList
} from "@/api/commodityManage";
import TimeTable from "@/views/commodityManage/bigColumnManage/dialog/TimeTable";

export default {
  components: { Edit, TimeTable },
  mixins: [PaginationMixin],
  props: ["title", "colomnData"],
  data() {
    return {
      tableData: [],
      isCreate: true,
      shelfStatusList,
      CommodityManageType
    };
  },
  methods: {
    create() {
      this.isCreate = true;
      this.$refs.Edit.showFlag = true;
    },
    modify() {
      this.isCreate = false;
      this.$refs.Edit.showFlag = true;
    },
    detail() {
      this.$refs.TimeTable.showFlag = true;
    },
    async down(row) {
      const { shelfStatus, goodsId } = row;
      let status = "";
      if (shelfStatus === "02") status = "03";
      else status = "02";
      await changeGoodsStatus({ shelfStatus: status, goodsId });
      this.$message.success("操作成功");
      this.getList();
    },
    share() {
      this.$message.info("待开发");
    },
    del() {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { goodsId } = this.currentSelect;
          await delGoods({ goodsId });
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(() => {});
    },

    async getList(params = this.searchData) {
      const data = await requestList(getGoodsList, params, this.page);
      this.tableData = data.content.map(item => {
        item.shelfStatusName = formatShelfStatus(item.shelfStatus);
        item.createTimeFormat = item.shelfDate
          ? formatTableTime(item.shelfDate)
          : formatTableTime(item.createTime);
        return item;
      });
      this.page = data.page;
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style></style>
