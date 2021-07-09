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
        <el-form-item label="商品名称">
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
        <el-table-column label="商品名称" width="400">
          <template slot-scope="scope">
            <div class="image-wrap">
              <el-image
                class="image-content"
                :src="scope.row.coverUrl"
                :preview-src-list="[scope.row.coverUrl]"
              ></el-image>
              <div class="image-info">
                <div>{{ scope.row.goodsName }}</div>
                <div class="text-red">{{ changeStatus(scope.row) }}</div>
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
        <el-table-column label="操作" width="360">
          <template slot-scope="scope">
            <el-button type="text" @click="detail">课程表</el-button>
            <el-button type="text" @click="modify">编辑</el-button>
            <el-button type="text" @click="down(scope.row)">{{
              scope.row.shelfStatus === "02" ? "下架" : "上架"
            }}</el-button>
            <el-button type="text" @click="del">删除</el-button>
            <el-button type="text" @click="share">分享</el-button>
            <el-button type="text" @click="testPaper(scope.row)">试卷</el-button>
            <el-button type="text" @click="testFile(scope.row)">文件</el-button>
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
      :type="CommodityManageType.COMMODITY_MANAGE"
      @reload="getList()"
    ></Edit>
    <!-- 课程表 -->
    <TimeTable ref="TimeTable" :currentItem="currentSelect"></TimeTable>
    <!-- 试卷 -->
    <PaperFile ref="PaperFile" :currentItem="currentSelectVal" :type="fileType"></PaperFile>
    <!-- 获取权限功能 -->
    <jurisdiction @getJurisdiction="getJurisdiction"></jurisdiction>
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
  getTimetableList,
  getGoodsList
} from "@/api/commodityManage";
import TimeTable from "@/views/commodityManage/bigColumnManage/dialog/TimeTable";
import PaperFile from "@/views/commodityManage/bigColumnManage/dialog/PaperFile";
import jurisdiction from "@/components/Jurisdiction";
export default {
  components: { Edit, TimeTable, PaperFile, jurisdiction },
  mixins: [PaginationMixin],
  data() {
    return {
      tableData: [],
      isCreate: true,
      shelfStatusList,
      CommodityManageType,
      currentSelectVal: '',
      fileType: '',
      isShow: {}
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
      if (status === "02") {
        const res = await getTimetableList({ goodsId });
        // 判断详情数据
        const resDataList = res.data;
        const resDataArray = [];
        if (resDataList.length >= 1) {
          for (let i = 0; i < resDataList.length; i++) {
            if (resDataList[i].teacherId) {
              resDataArray.push(resDataList[i].teacherId);
            }
          }
        }
        // // 有详情数据
        if (resDataList.length >= 1) {
          if (resDataList.length == resDataArray.length) {
            await changeGoodsStatus({ shelfStatus: status, goodsId });
            this.$message.success("操作成功");
            this.getList();
          } else {
            this.$message.warning("课程表中的老师信息不能为空，请完善信息");
          }
        } else {
          // 无数据
          this.$message.warning("请先维护课程表信息，再上架");
        }
      } else {
        await changeGoodsStatus({ shelfStatus: status, goodsId });
        this.$message.success("操作成功");
        this.getList();
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
          await delGoods({ goodsId });
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(() => {});
    },
    // 试卷
    testPaper(val) {
      // 试卷类型
      this.fileType = 'testPaper'
      this.currentSelectVal = String(val.goodsId)
      this.$refs.PaperFile.showFlag = true;
    },
    // 文件
    testFile(val) {
      // 文件类型
      this.fileType = 'testFile'
      this.currentSelectVal = String(val.goodsId)
      this.$refs.PaperFile.showFlag = true;
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
