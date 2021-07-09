<!--
 * @Author: KokoTa
 * @Date: 2021-01-22 09:38:16
 * @LastEditTime: 2021-02-05 16:32:32
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/commodityManage/videoManage/index.vue
-->

<template>
  <div class="wrap">
    <!-- 搜索区域 -->
    <section class="panel">
      <el-form ref="form" :model="searchData" :inline="true">
        <el-form-item label="会员卡名称">
          <el-input
            v-model="searchData.goodsName"
            placeholder="输入会员卡名称"
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
          <el-button type="primary" :disabled="isShow.urlQuery" @click="search">查询</el-button>
          <el-button type="primary" :disabled="isShow.urlQuery" @click="resetSearch">重置</el-button>
          <el-button type="primary" :disabled="isShow.urlQuery" @click="resetSearch">导出</el-button>
        </el-form-item>
      </el-form>
    </section>
    <!-- 表格区域 -->
    <section class="panel">
      <!-- 表格操作 -->
      <div class="table-operation">
        <el-button type="primary" :disabled="isShow.urlCreate" size="small" @click="create">新增</el-button>
      </div>
      <!-- 表格 -->
      <el-table
        class="table"
        :data="tableData"
        border
        @row-click="getCurrentSelect"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="会员卡名称" width="400">
          <template slot-scope="scope">
            <div class="image-wrap">
              <el-image
                class="image-content"
                :src="scope.row.coverUrl"
                :preview-src-list="[scope.row.coverUrl]"
              ></el-image>
              <div class="image-info">
                <div>{{ scope.row.goodsName }}</div>
                <div class="text-red">
                  {{ changeStatus(scope.row) }}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="soldQuantity" label="已售数量"></el-table-column>
        <el-table-column
          prop="shelfStatusName"
          label="上架状态"
        ></el-table-column>
        <el-table-column
          prop="createTimeFormat"
          label="上架时间"
        ></el-table-column>
        <el-table-column
          prop="relationQuantity"
          label="被关联商品/关联商品"
        ></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="text" @click="detail">详情</el-button>
            <el-button type="text" :disabled="isShow.urlUpdate" @click="modify">编辑</el-button>
            <el-button type="text" @click="down(scope.row)">{{
              scope.row.shelfStatus | shelfStatusFilter
            }}</el-button>
            <el-button type="text" :disabled="isShow.urlDelete" @click="del">删除</el-button>
            <el-button type="text" @click="share">分享</el-button>
          </template>
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
      :type="CommodityManageType.VIP_MANAGE"
      @reload="getList()"
    ></Edit>
    <!-- 详情 -->
    <Detail
      ref="Detail"
      :currentItem="currentSelect"
      :type="CommodityManageType.VIP_MANAGE"
    ></Detail>
    <!-- 获取权限功能 -->
    <jurisdiction @getJurisdiction="getJurisdiction"></jurisdiction>
  </div>
</template>

<script>
import PaginationMixin from "@/mixin/pagination";
import { mockTableData } from "@/util/mock";
import { shelfStatusList } from "@/util/option";
import Edit from "@/views/commodityManage/bigColumnManage/dialog/Edit";
import { CommodityManageType } from "@/util/constant";
import Detail from "@/views/commodityManage/bigColumnManage/dialog/Detail";
import { requestList } from "@/util";

import {
  delSmallColumn
} from "@/api/smallColumnManage";
import { getSmallColumnmembershipCard, changeSmallColumnStatus, getVipmange } from "@/api/smallColumnmembershipCard";
import { formatShelfStatus, formatTableTime } from "@/util/format";
import jurisdiction from "@/components/Jurisdiction";
export default {
  components: { Edit, Detail, jurisdiction },
  mixins: [PaginationMixin],
  data() {
    return {
      tableData: mockTableData(),
      isCreate: true,
      shelfStatusList,
      CommodityManageType,
      isShow: {}
    };
  },
  filters: {
    shelfStatusFilter(val) {
      if (+val === 2) {
        return "下架";
      } else {
        return "上架";
      }
    }
  },
  methods: {
    changeStatus({ singleSaleType, price }) {
      switch (singleSaleType) {
        case "1":
          return `${price}元`;
          break;
        case "2":
          return "免费";
          break;
        case "3 ":
          return "加密";
          break;
      }
    },
    create() {
      this.isCreate = true;
      this.$refs.Edit.showFlag = true;
    },
    modify() {
      this.isCreate = false;
      this.$refs.Edit.showFlag = true;
    },
    detail() {
      this.$refs.Detail.showFlag = true;
    },
    // async down(row) {
    //   const { shelfStatus: status, goodsId } = row;
    //   let shelfStatus = "";
    //   let shelfType = "";
    //   if (status === "02") {
    //     shelfStatus = "03";
    //     shelfType = "3";
    //   } else {
    //     shelfStatus = "02";
    //     shelfType = "1";
    //   }

    //   await changeSmallColumnStatus({ shelfStatus, shelfType, goodsId });
    //   this.$message.success("操作成功");
    //   this.getList();
    // },
     async down(row) {
      const { shelfStatus: status, goodsId } = row;
      console.log('11111111111')
      console.log(status)
      if (status === "02") {
        let shelfStatus = "";
        let shelfType = "";
        // 改变 status，type 要跟着改变
        // shelfStatus 02 表示上架，03 表示下架
        // shelfType 3 表示暂不上架，1 表示立即上架，这个值是在编辑弹框中显示的
        if (status === "02") {
          shelfStatus = "03";
          shelfType = "3";
        } else {
          shelfStatus = "02";
          shelfType = "1";
        }
        await changeSmallColumnStatus({ shelfStatus, shelfType, goodsId });
        this.$message.success("操作成功");
        this.getList();
      } else {
        const res = await getVipmange({ goodsId });
        // 判断详情数据
        const resDataList = res.data.childColumnList;
        const resDataListTwo = res.data.childSingleGoodsList;
        // 有详情数据
        if (resDataList.length >= 1 || resDataListTwo.length >= 1) {
          let shelfStatus = "";
          let shelfType = "";
          if (status === "02") {
            shelfStatus = "03";
            shelfType = "3";
          } else {
            shelfStatus = "02";
            shelfType = "1";
          }
          await changeSmallColumnStatus({ shelfStatus, shelfType, goodsId });
          this.$message.success("操作成功");
          this.getList();
        } else {
          // 无数据
          this.$message.warning("请先维护会员卡详情信息，再上架");
        }
      }
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
          await delSmallColumn({ goodsId });
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(() => {});
    },

    async getList(params = this.searchData) {
      const data = await requestList(
        getSmallColumnmembershipCard,
        params,
        this.page
      );
      this.tableData = data.content.map(item => {
        item.shelfStatusName = formatShelfStatus(item.shelfStatus);
        item.createTimeFormat = item.shelfDate
          ? formatTableTime(item.shelfDate)
          : formatTableTime(item.createTime);
        return item;
      });
      this.page = data.page;
    },
    // 获取权限功能
    getJurisdiction(val) {
      this.isShow = val
    },
  },
  mounted() {
    this.getList();
  }
};
</script>

<style></style>
